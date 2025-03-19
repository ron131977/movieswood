import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simple in-memory rate limiting (for demo purposes)
// In production, use Redis or another distributed store
const RATE_LIMIT_DURATION = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_IP = 100 // 100 requests per minute
const ipRequestMap = new Map<string, { count: number; timestamp: number }>()

// Clean up the map every 5 minutes
setInterval(
  () => {
    const now = Date.now()
    for (const [ip, data] of ipRequestMap.entries()) {
      if (now - data.timestamp > RATE_LIMIT_DURATION) {
        ipRequestMap.delete(ip)
      }
    }
  },
  5 * 60 * 1000,
)

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add common security headers
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Add cache control headers for static assets
  const url = request.nextUrl.pathname
  if (url.includes("/images/") || url.includes("/_next/static/")) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable")
  }

  // Implement basic rate limiting
  const ip = request.ip || "unknown"

  // Skip rate limiting for static assets
  if (!url.includes("/_next/") && !url.includes("/images/")) {
    const now = Date.now()
    const ipData = ipRequestMap.get(ip)

    if (ipData) {
      // Reset count if the time window has passed
      if (now - ipData.timestamp > RATE_LIMIT_DURATION) {
        ipRequestMap.set(ip, { count: 1, timestamp: now })
      } else {
        // Increment count
        ipData.count++

        // Check if rate limit exceeded
        if (ipData.count > MAX_REQUESTS_PER_IP) {
          return new NextResponse("Too Many Requests", {
            status: 429,
            headers: {
              "Retry-After": "60",
              "Content-Type": "text/plain",
            },
          })
        }
      }
    } else {
      // First request from this IP
      ipRequestMap.set(ip, { count: 1, timestamp: now })
    }
  }

  return response
}

export const config = {
  matcher: [
    // Apply to all paths except API routes that handle their own rate limiting
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}

