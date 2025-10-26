// app/api/track-visit/route.js
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const data = await req.json();
    await prisma.visit.create({ data });
    return Response.json({ success: true });
  } catch (error) {
    console.error("❌ Tracking error:", error);
    return Response.json({ success: false });
  }
}
