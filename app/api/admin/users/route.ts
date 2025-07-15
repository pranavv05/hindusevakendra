import { type NextRequest, NextResponse } from "next/server"
import { countDocuments, getCollection } from "@/lib/db"

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
}
export async function GET(request: NextRequest) {
  try {
    // Get all users with their vendor details using aggregation
    const usersCollection = await getCollection("users")

    const users = await usersCollection
      .aggregate([
        {
          $lookup: {
            from: "vendors",
            localField: "_id",
            foreignField: "userId",
            as: "vendorInfo",
          },
        },
        {
          $addFields: {
            serviceType: { $arrayElemAt: ["$vendorInfo.serviceType", 0] },
            verificationStatus: { $arrayElemAt: ["$vendorInfo.verificationStatus", 0] },
            vendorAppliedDate: { $arrayElemAt: ["$vendorInfo.createdAt", 0] },
          },
        },
        {
          $project: {
            vendorInfo: 0,
            password: 0,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray()

    // Get statistics
    const totalRegistrations = await countDocuments("users")
    const totalUsers = await countDocuments("users", { userType: "user" })
    const totalVendors = await countDocuments("users", { userType: "vendor" })

    const vendorsCollection = await getCollection("vendors")
    const approvedVendors = await vendorsCollection.countDocuments({ verificationStatus: "approved" })
    const pendingVendors = await vendorsCollection.countDocuments({ verificationStatus: "pending" })
    const rejectedVendors = await vendorsCollection.countDocuments({ verificationStatus: "rejected" })
    interface Vendor {
  id: number
  vendor_id: number
  name: string
  email: string
  phone: string
  address: string
  category: string
  registered_date: string
  service_type: string
  verification_status: string
  application_date: string
  photo?: string
  id_proof?: string
  address_proof?: string
}

    const stats = {
      total_registrations: totalRegistrations,
      total_users: totalUsers,
      total_vendors: totalVendors,
      approved_vendors: approvedVendors,
      pending_vendors: pendingVendors,
      rejected_vendors: rejectedVendors,
    }

    return NextResponse.json({
      success: true,
      users: users.map((user) => ({
        ...user,
        id: user._id.toString(),
        created_at: user.createdAt,
        user_type: user.userType,
        service_type: user.serviceType,
        verification_status: user.verificationStatus,
        vendor_applied_date: user.vendorAppliedDate,
      })),
      stats: stats,
    })
  } catch (error) {
    console.error("Admin users fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
