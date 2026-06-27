import { askGemini } from "@/lib/gemini";
import { getAISettings } from "@/lib/ai";

export async function POST(request) {
  try {
    const body = await request.json();
    const message = body?.message?.trim();

    // Validasi input
    if (!message) {
      return Response.json(
        {
          success: false,
          message: "Pesan tidak boleh kosong.",
        },
        { status: 400 }
      );
    }

    // Batasi panjang pesan
    if (message.length > 2000) {
      return Response.json(
        {
          success: false,
          message: "Pesan terlalu panjang. Maksimal 2000 karakter.",
        },
        { status: 400 }
      );
    }

    // Ambil pengaturan AI
    const settings = await getAISettings();

    if (!settings) {
      return Response.json(
        {
          success: false,
          message: "Pengaturan AI tidak ditemukan.",
        },
        { status: 500 }
      );
    }

    // AI dimatikan
    if (!settings.enabled) {
      return Response.json(
        {
          success: false,
          message: "AI sedang dinonaktifkan oleh administrator.",
        },
        { status: 503 }
      );
    }

    // Minta jawaban dari Gemini
    const answer = await askGemini(message, settings);

    return Response.json(
      {
        success: true,
        answer,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[AI API]", error);

    return Response.json(
      {
        success: false,
        message: "Terjadi kesalahan saat memproses permintaan.",
      },
      { status: 500 }
    );
  }
}