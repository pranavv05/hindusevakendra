import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: any): string {
  return jwt.sign(payload, process.env.JWT_SECRET || "fallback-secret", {
    expiresIn: "7d",
  })
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")
  } catch (error) {
    throw new Error("Invalid token")
  }
}
