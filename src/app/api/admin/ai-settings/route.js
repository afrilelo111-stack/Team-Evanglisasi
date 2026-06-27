// app/api/admin/ai-settings/route.js
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase menggunakan Service Role / Admin Key agar bisa bypass RLS jika diperlukan
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 1. GET: Untuk mengambil pengaturan AI saat ini saat halaman admin dibuka
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("ai_settings")
      .select("*")
      .single(); // Karena kita hanya punya 1 baris pengaturan

    if (error) throw error;

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("[ADMIN AI GET]", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 2. POST/PUT: Untuk memperbarui pengaturan AI dari form admin
export async function PUT(request) {
  try {
    const body = await request.json();
    
    // Ambil data id pengaturan saat ini (biasanya ID: 1)
    const { data: currentSettings } = await supabase.from("ai_settings").select("id").single();
    
    if (!currentSettings) {
      return Response.json({ success: false, message: "Data pengaturan belum ada." }, { status: 404 });
    }

    const { data, error } = await supabase
      .from("ai_settings")
      .update({
        enabled: body.enabled,
        model: body.model,
        system_prompt: body.system_prompt,
        temperature: parseFloat(body.temperature),
        max_output_tokens: parseInt(body.max_output_tokens),
        updated_at: new Date()
      })
      .eq("id", currentSettings.id)
      .select()
      .single();

    if (error) throw error;

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("[ADMIN AI PUT]", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}