import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

async function getVisitorInfo() {
  const h = await headers();
  const ua = h.get("user-agent") || "";

  const device = /mobile/i.test(ua)
    ? "Mobile"
    : /tablet/i.test(ua)
    ? "Tablet"
    : "Desktop";

  const os =
    /windows/i.test(ua) ? "Windows" :
    /mac/i.test(ua) ? "MacOS" :
    /linux/i.test(ua) ? "Linux" :
    /android/i.test(ua) ? "Android" :
    /ios|iphone|ipad/i.test(ua) ? "iOS" :
    "Unknown";

  const browser =
    /chrome|crios/i.test(ua) ? "Chrome" :
    /firefox|fxios/i.test(ua) ? "Firefox" :
    /safari/i.test(ua) ? "Safari" :
    /edg/i.test(ua) ? "Edge" :
    /opr/i.test(ua) ? "Opera" :
    "Unknown";

  const ip =
    h.get("x-forwarded-for")?.split(",")[0] ||
    h.get("x-real-ip") ||
    "Unknown";

  console.log("🔍 IP Detection:", {
    "x-forwarded-for": h.get("x-forwarded-for"),
    "x-real-ip": h.get("x-real-ip"),
    "detected-ip": ip
  });

  let location = "Unknown";
  
  if (ip === "Unknown" || ip === "::1" || ip === "127.0.0.1") {
    console.warn("⚠️ Cannot lookup location: IP is localhost or unknown");
  } else {
    try {
      const apiUrl = `http://api.ipapi.com/api/${ip}?access_key=${process.env.IPAPI_KEY}&fields=country_name`;
      console.log("📡 Calling IP API:", apiUrl.replace(process.env.IPAPI_KEY, "***KEY***"));

      const res = await fetch(apiUrl, { cache: "no-store" });
      
      console.log("📥 API Response Status:", res.status, res.statusText);

      if (res.ok) {
        const data = await res.json();
        console.log("📦 API Response Data:", data);
        
        location = data.country_name || "Unknown";
        console.log("✅ Location set to:", location);
      } else {
        const errorText = await res.text();
        console.error("❌ API Error Response:", errorText);
      }
    } catch (err) {
      console.error("❌ Location lookup failed:", err.message);
      console.error("Stack trace:", err.stack);
    }
  }

  return { 
    device, 
    os, 
    browser, 
    location, 
    referrer: h.get("referer") || "Direct" 
  };
}

export default async function Page({ params }) {
  const { shorturl } = await params;
  const clean = shorturl.replace(/\//g, "");

  const urlEntry = await prisma.url.findUnique({
    where: { shorturl: clean }
  });

  if (!urlEntry) redirect("/404");

  const visitor = await getVisitorInfo();
  
  console.log("👤 Visitor Info:", visitor);

  await prisma.visit.create({
    data: {
      urlId: urlEntry.id,
      device: visitor.device,
      browser: visitor.browser,
      os: visitor.os,
      location: visitor.location,
      referrer: visitor.referrer
    }
  });

  let target = urlEntry.url;
  if (!target.startsWith("http")) target = "https://" + target;

  redirect(target);
}