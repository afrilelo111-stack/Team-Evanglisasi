"use server";

import { createClient } from "@/lib/supabase/server"; // Sesuaikan path menuju fungsi createClient-mu
import { redirect } from "next/navigation";

export async function loginWithEmail(formData) {
  const supabase = await createClient();

  const email = formData.get("email");
  const password = formData.get("password");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Mengembalikan pesan error jika gagal login
    return redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  // Jika sukses, arahkan ke halaman utama atau dashboard
  return redirect("/beranda");
}