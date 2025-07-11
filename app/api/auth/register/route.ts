import { type NextRequest, NextResponse } from "next/server"
import { insertOne, findOne } from "@/lib/db"
import { hashPassword } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, password, address, category, userType, serviceType } = body

    // Validate required fields
    if (!name || !email || !phone || !password || !address || !userType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await findOne("users", { email })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Insert user (with createdAt)
    const userResult = await insertOne("users", {
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      category: category || "individual-user",
      userType,
      status: "active",
      createdAt: new Date(), // <-- ✅ Important field for admin sorting
    })

    const userId = userResult.insertedId

    // If vendor, insert vendor details
    if (userType === "vendor" && serviceType) {
      await insertOne("vendors", {
        userId: userId,
        serviceType,
        verificationStatus: "pending",
        createdAt: new Date(), // <-- ✅ Also helpful for vendor stats
      })
    }

    return NextResponse.json({
      success: true,
      message: "Registration successful! Your account has been created.",
      userId: userId.toString(),
      userType: userType,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
