export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registrations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession(req);
    if (!session || session.role !== "member" || !session.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = parseInt(session.sub);
    const member = await db.query.registrations.findFirst({
      where: eq(registrations.id, id),
    });

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: member.id,
      applicationType: member.applicationType,
      name: member.name,
      gender: member.gender,
      registrationNo: member.registrationNo,
      course: member.course,
      age: member.age,
      mobileNo: member.mobileNo,
      whatsappNo: member.whatsappNo,
      emailId: member.emailId,
      religion: member.religion,
      address: member.address,
      status: member.status,
      createdAt: member.createdAt,
    });
  } catch (error) {
    console.error("Member me error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}