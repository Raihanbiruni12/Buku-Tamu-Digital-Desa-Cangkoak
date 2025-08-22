import {
  checkIfLoggedIn,
  redirectIfNotLoggedIn,
} from "@/lib/supabase/middleware"
import { type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === "/login") {
    return await checkIfLoggedIn(request)
  }

  if (pathname.startsWith("/admin/dashboard")) {
    return await redirectIfNotLoggedIn(request)
  }

  return new Response(null, { status: 404 })
}

export const config = {
  matcher: ["/login", "/admin/dashboard"],
}
