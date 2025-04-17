import { type NextRequest, NextResponse } from "next/server"

// This is a simple API route that can be used to bypass the middleware checks
// for testing purposes or for specific authenticated users
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    // In a real application, you would validate the token
    // For demo purposes, we'll just check if it exists
    if (token) {
      // Set a cookie that the middleware can check to bypass restrictions
      const response = NextResponse.json({ success: true })
      response.cookies.set("stc-bypass-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      })
      return response
    }

    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
