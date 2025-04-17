import { type NextRequest, NextResponse } from "next/server"

// This API route can be used to get more detailed location information
// beyond what's available in the middleware
export async function GET(request: NextRequest) {
  try {
    // Get country from request geo data
    const country = request.geo?.country || "Unknown"
    const city = request.geo?.city || "Unknown"
    const region = request.geo?.region || "Unknown"

    // Get IP address (this would be more reliable with a third-party service in production)
    const forwardedFor = request.headers.get("x-forwarded-for")
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "Unknown"

    // Get user agent
    const userAgent = request.headers.get("user-agent") || "Unknown"

    // Determine if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

    // Get referrer
    const referer = request.headers.get("referer") || "Unknown"
    const isFromGoogleAds = referer.includes("google") && referer.includes("ads")

    return NextResponse.json({
      location: {
        country,
        city,
        region,
        ip,
      },
      device: {
        userAgent,
        isMobile,
      },
      referrer: {
        referer,
        isFromGoogleAds,
      },
      restrictions: {
        isInKuwait: country === "KW",
        isFromGoogleAds,
        isMobile,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
