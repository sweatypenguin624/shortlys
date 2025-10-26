// app/[shorturl]/page.js
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

async function getVisitorInfo() {
  const h = headers();
  const userAgent = h.get("user-agent") || "Unknown";
  const device = /mobile/i.test(userAgent)
    ? "Mobile"
    : /tablet/i.test(userAgent)
    ? "Tablet"
    : "Desktop";

  let os = "Unknown";
  if (/windows/i.test(userAgent)) os = "Windows";
  else if (/mac/i.test(userAgent)) os = "MacOS";
  else if (/linux/i.test(userAgent)) os = "Linux";
  else if (/android/i.test(userAgent)) os = "Android";
  else if (/ios|iphone|ipad/i.test(userAgent)) os = "iOS";

  const ip =
    h.get("x-forwarded-for") ||
    h.get("x-real-ip") ||
    "Unknown";

  const referrer = h.get("referer") || "Direct";

  // Simple IP lookup (optional)
  let location = "Unknown";
  try {
    const r = await fetch(`https://ipapi.co/${ip}/json/`);
    if (r.ok) {
      const d = await r.json();
      location = `${d.city || "Unknown"}, ${d.country_name || "Unknown"}`;
    }
  } catch {}

  return { device, os, ip, location, referrer };
}

export default async function Page({ params }) {
  const { shorturl } = params;
  const clean = shorturl?.trim();
  if (!clean) redirect("/");

  const doc = await prisma.url.findUnique({
    where: { shorturl: clean },
  });

  if (!doc) redirect("/");

  const { device, os, ip, location, referrer } = await getVisitorInfo();

  // 🔥 Fire-and-forget (don’t await)
  fetch(`${process.env.NEXT_PUBLIC_HOST}/api/track-visit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      urlId: doc.id,
      device,
      os,
      location,
      referrer,
    }),
  }).catch(console.error);

  let target = doc.url.trim();
  if (!/^https?:\/\//i.test(target)) target = "https://" + target;
  redirect(target);
}
