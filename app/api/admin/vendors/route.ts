import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Get all vendors with user details using aggregation
    const vendorsCollection = await getCollection("vendors")

    const vendors = await vendorsCollection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $unwind: "$userInfo",
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            serviceType: 1,
            verificationStatus: 1,
            createdAt: 1,
            "userInfo.name": 1,
            "userInfo.email": 1,
            "userInfo.phone": 1,
            "userInfo.address": 1,
            "userInfo.category": 1,
            "userInfo.createdAt": 1,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray()

    return NextResponse.json({
      success: true,
      vendors: vendors.map((vendor) => ({
        id: vendor.userInfo._id ? vendor.userInfo._id.toString() : vendor.userId.toString(),
        vendor_id: vendor._id.toString(),
        name: vendor.userInfo.name,
        email: vendor.userInfo.email,
        phone: vendor.userInfo.phone,
        address: vendor.userInfo.address,
        category: vendor.userInfo.category,
        registered_date: vendor.userInfo.createdAt,
        service_type: vendor.serviceType,
        verification_status: vendor.verificationStatus,
        application_date: vendor.createdAt,
      })),
    })
  } catch (error) {
    console.error("Admin vendors fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
