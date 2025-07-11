import { type NextRequest, NextResponse } from "next/server"
import { findOne } from "@/lib/db"
import { verifyPassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, userType } = body

    // Validate required fields
    if (!email || !password || !userType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Find user
    const user = await findOne("users", {
      email,
      userType,
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check if vendor and get verification status
    let vendorStatus = null
    if (userType === "vendor") {
      const vendor = await findOne("vendors", { userId: user._id })
      if (vendor) {
        vendorStatus = vendor.verificationStatus
      }
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      userType: user.userType,
    })

    return NextResponse.json({
      success: true,
      message: "Login successful!",
      token: token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        userType: user.userType,
        vendorStatus: vendorStatus,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
