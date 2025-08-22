import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

function getSupabase(request: NextRequest, response?: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            if (response) response.cookies.set(name, value, options)
          })
        },
      },
    }
  )
}

export async function checkIfLoggedIn(request: NextRequest) {
  const supabase = getSupabase(request)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/dashboard"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export async function redirectIfNotLoggedIn(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = getSupabase(request, response)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  return response
}
