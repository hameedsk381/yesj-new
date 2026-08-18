import { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { donors, donations, budgets, expenses, volunteers, volunteerActivities, assets, inventoryItems, staff, attendance, leaveRequests, beneficiaries, beneficiaryServices } from "@/lib/db/schema"
import { sql, desc, eq, lt } from "drizzle-orm"
import { requireAdmin, adminJsonResponse } from "@/lib/admin-api-helpers"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { errorResponse } = await requireAdmin(req)
  if (errorResponse) return errorResponse

  try {
    const [donorCountRes] = await db.select({ count: sql<number>`count(*)` }).from(donors)
    const donorCount = Number(donorCountRes?.count || 0)

    const [donationSumRes] = await db
      .select({ sum: sql<string>`coalesce(sum(${donations.amount}),0)` })
      .from(donations)
    const totalDonations = Number(donationSumRes?.sum || 0)

    const [donationCountRes] = await db.select({ count: sql<number>`count(*)` }).from(donations)
    const donationCount = Number(donationCountRes?.count || 0)

    const [budgetSumRes] = await db
      .select({ sum: sql<string>`coalesce(sum(${budgets.allocated}),0)` })
      .from(budgets)
    const totalBudget = Number(budgetSumRes?.sum || 0)

    const [expenseSumRes] = await db
      .select({ sum: sql<string>`coalesce(sum(${expenses.amount}),0)` })
      .from(expenses)
    const totalExpenses = Number(expenseSumRes?.sum || 0)

    // Donations by fund
    const byFund = await db
      .select({ fund: donations.fund, total: sql<string>`coalesce(sum(${donations.amount}),0)` })
      .from(donations)
      .groupBy(donations.fund)
      .orderBy(desc(sql`sum(${donations.amount})`))

    // Recent donations
    const recentDonations = await db
      .select({
        id: donations.id,
        donorName: donors.fullName,
        amount: donations.amount,
        donationDate: donations.donationDate,
        fund: donations.fund,
        mode: donations.mode,
      })
      .from(donations)
      .leftJoin(donors, sql`${donations.donorId} = ${donors.id}`)
      .orderBy(desc(donations.createdAt))
      .limit(8)

    // Recent expenses
    const recentExpenses = await db
      .select()
      .from(expenses)
      .orderBy(desc(expenses.createdAt))
      .limit(8)

    // Volunteer aggregates
    const [volunteerCountRes] = await db
      .select({ count: sql<number>`count(*)` })
      .from(volunteers)
      .where(eq(volunteers.status, "active"))
    const activeVolunteers = Number(volunteerCountRes?.count || 0)

    const [volunteerHoursRes] = await db
      .select({ sum: sql<string>`coalesce(sum(${volunteerActivities.hours}),0)` })
      .from(volunteerActivities)
    const totalVolunteerHours = Number(volunteerHoursRes?.sum || 0)

    const recentActivities = await db
      .select({
        id: volunteerActivities.id,
        volunteerName: volunteers.fullName,
        program: volunteerActivities.program,
        activityType: volunteerActivities.activityType,
        hours: volunteerActivities.hours,
        activityDate: volunteerActivities.activityDate,
      })
      .from(volunteerActivities)
      .leftJoin(volunteers, eq(volunteerActivities.volunteerId, volunteers.id))
      .orderBy(desc(volunteerActivities.createdAt))
      .limit(8)

    // Asset & inventory aggregates
    const [assetCountRes] = await db.select({ count: sql<number>`count(*)` }).from(assets)
    const assetCount = Number(assetCountRes?.count || 0)

    const [assetValueRes] = await db
      .select({ sum: sql<string>`coalesce(sum(${assets.purchaseCost}),0)` })
      .from(assets)
    const totalAssetValue = Number(assetValueRes?.sum || 0)

    const [inventoryValueRes] = await db
      .select({ sum: sql<string>`coalesce(sum(${inventoryItems.quantity} * ${inventoryItems.unitCost}),0)` })
      .from(inventoryItems)
    const totalInventoryValue = Number(inventoryValueRes?.sum || 0)

    const [lowStockRes] = await db
      .select({ count: sql<number>`count(*)` })
      .from(inventoryItems)
      .where(lt(inventoryItems.quantity, inventoryItems.minQuantity))
    const lowStockCount = Number(lowStockRes?.count || 0)

    // HR aggregates
    const [staffCountRes] = await db
      .select({ count: sql<number>`count(*)` })
      .from(staff)
      .where(eq(staff.status, "active"))
    const activeStaff = Number(staffCountRes?.count || 0)

    const [staffSalaryRes] = await db
      .select({ sum: sql<string>`coalesce(sum(${staff.salary}),0)` })
      .from(staff)
    const totalStaffSalary = Number(staffSalaryRes?.sum || 0)

    const [leavePendingRes] = await db
      .select({ count: sql<number>`count(*)` })
      .from(leaveRequests)
      .where(eq(leaveRequests.status, "pending"))
    const pendingLeaveRequests = Number(leavePendingRes?.count || 0)

    const recentLeave = await db
      .select({
        id: leaveRequests.id,
        staffName: staff.fullName,
        leaveType: leaveRequests.leaveType,
        startDate: leaveRequests.startDate,
        endDate: leaveRequests.endDate,
        status: leaveRequests.status,
      })
      .from(leaveRequests)
      .leftJoin(staff, eq(leaveRequests.staffId, staff.id))
      .orderBy(desc(leaveRequests.createdAt))
      .limit(8)

    // Beneficiary aggregates
    const [beneficiaryCountRes] = await db.select({ count: sql<number>`count(*)` }).from(beneficiaries)
    const beneficiaryCount = Number(beneficiaryCountRes?.count || 0)

    const [activeBeneficiaryRes] = await db
      .select({ count: sql<number>`count(*)` })
      .from(beneficiaries)
      .where(eq(beneficiaries.status, "active"))
    const activeBeneficiaries = Number(activeBeneficiaryRes?.count || 0)

    const [serviceSumRes] = await db
      .select({ sum: sql<string>`coalesce(sum(${beneficiaryServices.amount}),0)` })
      .from(beneficiaryServices)
    const totalServiceValue = Number(serviceSumRes?.sum || 0)

    const [serviceCountRes] = await db.select({ count: sql<number>`count(*)` }).from(beneficiaryServices)
    const serviceCount = Number(serviceCountRes?.count || 0)

    const recentBeneficiaries = await db
      .select()
      .from(beneficiaries)
      .orderBy(desc(beneficiaries.createdAt))
      .limit(8)

    const recentServices = await db
      .select({
        id: beneficiaryServices.id,
        beneficiaryName: beneficiaries.fullName,
        serviceType: beneficiaryServices.serviceType,
        description: beneficiaryServices.description,
        amount: beneficiaryServices.amount,
        serviceDate: beneficiaryServices.serviceDate,
      })
      .from(beneficiaryServices)
      .leftJoin(beneficiaries, eq(beneficiaryServices.beneficiaryId, beneficiaries.id))
      .orderBy(desc(beneficiaryServices.createdAt))
      .limit(8)

    return adminJsonResponse({
      donorCount,
      donationCount,
      totalDonations,
      totalBudget,
      totalExpenses,
      netBalance: totalDonations - totalExpenses,
      utilizationRate: totalBudget > 0 ? Math.round((totalExpenses / totalBudget) * 100) : 0,
      byFund: byFund.map((f) => ({ fund: f.fund, total: Number(f.total) })),
      recentDonations: recentDonations.map((d) => ({ ...d, amount: Number(d.amount) })),
      recentExpenses: recentExpenses.map((e) => ({ ...e, amount: Number(e.amount) })),
      activeVolunteers,
      totalVolunteerHours,
      recentActivities: recentActivities.map((a) => ({ ...a, hours: Number(a.hours) })),
      assetCount,
      totalAssetValue,
      totalInventoryValue,
      lowStockCount,
      activeStaff,
      totalStaffSalary,
      pendingLeaveRequests,
      recentLeave: recentLeave.map((l) => ({ ...l, status: l.status })),
      beneficiaryCount,
      activeBeneficiaries,
      totalServiceValue,
      serviceCount,
      recentBeneficiaries,
      recentServices: recentServices.map((s) => ({ ...s, amount: Number(s.amount) })),
    })
  } catch (error) {
    console.error("ERP stats error:", error)
    return adminJsonResponse({ error: "Internal server error" }, { status: 500 })
  }
}