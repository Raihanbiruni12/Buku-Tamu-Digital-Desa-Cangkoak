import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Schema validasi input tamu
const guestBookSchema = z.object({
  fullName: z.string().min(2, { message: "Nama lengkap minimal 2 karakter." }),
  address: z.string().min(5, { message: "Alamat minimal 5 karakter." }),
  phone: z
    .string()
    .regex(/^[0-9]*$/, { message: "Nomor HP hanya boleh berisi angka." })
    .min(10, { message: "Nomor HP minimal 10 digit." })
    .max(15, { message: "Nomor HP maksimal 15 digit." })
    .optional()
    .or(z.literal('')),
  purpose: z.string().min(5, { message: "Tujuan kunjungan minimal 5 karakter." }),
  visitDate: z.string().nonempty({ message: "Tanggal kunjungan wajib diisi." }), // format: 'YYYY-MM-DD'
});

// Schema validasi untuk update (id wajib)
const updateGuestSchema = guestBookSchema.extend({
  id: z.string().uuid({ message: "ID harus berupa UUID yang valid." }),
});

// POST handler
export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  // Validasi data dari client
  const validation = guestBookSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Data tidak valid",
        details: validation.error.format(),
      },
      { status: 400 }
    );
  }

  const { fullName, address, phone, purpose, visitDate } = validation.data;

  // Simpan ke Supabase
  const { error } = await supabase
    .from('guests')
    .insert({
      full_name: fullName,
      address,
      phone: phone || null,
      purpose,
      visit_date: visitDate,
    });

  if (error) {
    console.error('Supabase insert error:', error);
    return NextResponse.json(
      { error: "Gagal menyimpan data", details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Data berhasil disimpan" });
}

// PUT handler (Edit)
export async function PUT(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  // Validasi data dari client
  const validation = updateGuestSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Data tidak valid",
        details: validation.error.format(),
      },
      { status: 400 }
    );
  }

  const { id, fullName, address, phone, purpose, visitDate } = validation.data;

  // Update di Supabase
  const { error } = await supabase
    .from('guests')
    .update({
      full_name: fullName,
      address,
      phone: phone || null,
      purpose,
      visit_date: visitDate,
    })
    .eq('id', id);

  if (error) {
    console.error('Supabase update error:', error);
    return NextResponse.json(
      { error: "Gagal memperbarui data", details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Data berhasil diperbarui" });
}

// DELETE handler
export async function DELETE(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  // Validasi ID
  const idValidation = z.object({ id: z.string().uuid() }).safeParse(body);
  if (!idValidation.success) {
    return NextResponse.json(
      {
        error: "ID tidak valid",
        details: idValidation.error.format(),
      },
      { status: 400 }
    );
  }

  const { id } = idValidation.data;

  // Hapus dari Supabase
  const { error } = await supabase.from('guests').delete().eq('id', id);

  if (error) {
    console.error('Supabase delete error:', error);
    return NextResponse.json(
      { error: "Gagal menghapus data", details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Data berhasil dihapus" });
}