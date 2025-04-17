import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname
  const { pathname } = request.nextUrl

  // Skip middleware for login page and API routes to avoid redirect loops
  if (pathname.startsWith("/login") || pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  // Check if user is in Kuwait based on country code in headers
  const country = request.geo?.country || ""
  const isInKuwait = country === "KW"

  // Check if user is coming from Google Ads
  const referer = request.headers.get("referer") || ""
  const isFromGoogleAds = referer.includes("google") && referer.includes("ads")

  // Check if user is on a mobile device
  const userAgent = request.headers.get("user-agent") || ""
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  // If any condition fails, redirect to login
  //if (!isInKuwait || !isFromGoogleAds || !isMobileDevice) {
    if (isInKuwait || isFromGoogleAds || isMobileDevice) {
    // Store the original URL to redirect back after login
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("from", request.nextUrl.pathname)

    // Add reasons for debugging
    const reasons = []
    if (!isInKuwait) reasons.push("location")
    if (!isFromGoogleAds) reasons.push("source")
    if (!isMobileDevice) reasons.push("device")

    url.searchParams.set("reasons", reasons.join(","))

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|fonts|images).*)"],
}
