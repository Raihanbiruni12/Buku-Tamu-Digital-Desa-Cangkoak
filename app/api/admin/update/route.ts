import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/admin"

export async function POST(request: Request) {
  const supabase = createClient()
  const { name, email, newPassword } = await request.json()

  try {
    const { data: users, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) throw listError
    const user = users.users.find(u => u.email === email)
    if (!user) throw new Error("Pengguna tidak ditemukan")

    const userId = user.id
    const updates = { email, user_metadata: { name } }
    if (newPassword) await supabase.auth.admin.updateUserById(userId, { password: newPassword })
    await supabase.auth.admin.updateUserById(userId, updates)

    return NextResponse.json({ message: "Data admin berhasil diperbarui" })
  } catch (error) {
    return NextResponse.json({ error: "Gagal memperbarui data admin" }, { status: 500 })
  }
}