import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"

export async function GET() {
  try {
    const usersCollection = await getCollection("users")
    const vendorsCollection = await getCollection("vendors")
    const servicesCollection = await getCollection("services") // if you have a services collection

    const totalUsers = await usersCollection.countDocuments({ userType: "user" })
    const totalVendors = await usersCollection.countDocuments({ userType: "vendor" })
    const activeServices = await servicesCollection.countDocuments({ status: "in-progress" })
    const totalRevenue = 125000 // TODO: Replace with aggregation if needed

    const pendingVendors = await vendorsCollection
      .find({ verificationStatus: "pending" })
      .project({
        _id: 1,
        fullName: 1,
        serviceType: 1,
        phone: 1,
        location: 1,
        createdAt: 1,
        idProof: 1,
        experience: 1,
      })
      .toArray()

    return NextResponse.json({
      stats: {
        totalUsers,
        totalVendors,
        activeServices,
        totalRevenue,
      },
      pendingVendors,
    })
  } catch (err) {
    console.error("Dashboard data fetch error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
