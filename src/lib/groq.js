import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function askGroq(message, settings) {
  try {
    // 1. Ganti 'llama3-8b-8192' ke model baru 'llama-3.1-8b-instant' atau 'llama-3.3-70b-versatile'
    let targetModel = settings?.model || "llama-3.1-8b-instant";
    
    // Proteksi jika database Anda masih mengirim string model lama
    if (targetModel === "llama3-8b-8192" || targetModel.includes("gemini")) {
      targetModel = "llama-3.1-8b-instant"; 
    }

    const systemPrompt = settings?.system_prompt || "Kamu adalah Asisten AI.";
    const temp = settings?.temperature ? parseFloat(settings.temperature) : 0.7;
    const maxTokens = settings?.max_output_tokens ? parseInt(settings.max_output_tokens, 10) : 1000;

    // 2. Eksekusi request ke Groq menggunakan model yang baru
    const chatCompletion = await groq.chat.completions.create({
      model: targetModel,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: temp,
      max_tokens: maxTokens,
    });

    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Groq API Error:", error);
    throw error;
  }
}