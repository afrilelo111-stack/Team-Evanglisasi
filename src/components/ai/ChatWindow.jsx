"use client";

import { useState } from "react";
import { Bot, X } from "lucide-react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      text: textToSend,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 🛠️ 1. Pastikan URL endpoint ini mengarah ke lokasi file route.js kamu
      const response = await fetch("/api/chat", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: textToSend }), // Mengirim key 'message' (Sudah Benar!)
      });

      const data = await response.json();

      // Jika API route mengembalikan error status (400, 500, 503)
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Gagal mengambil respons AI");
      }

      const aiMessage = {
        role: "assistant",
        // 🛠️ 2. PERBAIKAN DI SINI: route.js kamu mengirim 'answer', bukan 'reply'
        text: data.answer, 
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error interaksi AI:", error);
      
      // Menampilkan pesan error asli dari backend (Misal: "AI sedang dinonaktifkan...")
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: error.message || "Waduh, sepertinya jaringan saya sedang terganggu. Boleh coba kirim ulang?",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        bottom-24
        right-8
        z-50

        /* 🛠️ ADJUSTMENT UKURAN PROPORSIONAL */
        w-[380px]               /* Pas, tidak terlalu lebar */
        max-w-[calc(100vw-2rem)]
        h-[420px]               /* Pendek, kompak, tidak terlalu tinggi */

        overflow-hidden
        rounded-3xl
        border
        border-[#E8D7B8]

        bg-white/95
        backdrop-blur-xl

        shadow-[0_20px_60px_rgba(0,0,0,0.15)]

        flex
        flex-col

        animate-in
        fade-in
        zoom-in-95
        duration-300
      "
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B68A28] via-[#C9A227] to-[#D7B64A] px-5 py-3.5 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="text-white" size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-white">Team Evangelisasi AI</h2>
              <div className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-xs text-white/90">Online</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Jendela Daftar Pesan Berjalan */}
      <ChatMessages messages={messages} isLoading={isLoading} />

      {/* Bagian Quick Action (Hanya muncul jika room chat masih kosong) */}
      {messages.length === 0 && (
        <div className="bg-[#FCFBF8] px-5 pb-4 shrink-0">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Pertanyaan Populer
          </p>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleSendMessage("Bagaimana cara bergabung dengan Team Evangelisasi?")}
              className="rounded-full border border-[#E5D5B5] bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-[#F6F1E8] transition active:scale-95"
            >
              Cara Bergabung
            </button>
            <button 
              onClick={() => handleSendMessage("Kapan jadwal kumpul rutin Team Evangelisasi?")}
              className="rounded-full border border-[#E5D5B5] bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-[#F6F1E8] transition active:scale-95"
            >
              Jadwal Rutin
            </button>
            <button 
              onClick={() => handleSendMessage("Apa saja jenis kegiatan pelayanan di Team Evangelisasi?")}
              className="rounded-full border border-[#E5D5B5] bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-[#F6F1E8] transition active:scale-95"
            >
              Kegiatan
            </button>
          </div>
        </div>
      )}

      {/* Bagian Form Input Pesan */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}