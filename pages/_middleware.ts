import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname == "/") {
    return NextResponse.redirect(new URL("/about", request.url))
  }
  return NextResponse.next()
}
