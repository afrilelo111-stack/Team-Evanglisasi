"use client";

import { useState } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";
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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Gagal mengambil respons AI");
      }

      const aiMessage = {
        role: "assistant",
        text: data.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error interaksi AI:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: error.message || "Maaf, jaringan sedang terganggu. Coba kirim ulang?",
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
        bottom-[90px]
        md:bottom-[80px]
        right-4
        md:right-6
        z-50

        w-[340px]
        max-w-[calc(100vw-2rem)]
        h-[420px]
        max-h-[70vh]

        overflow-hidden
        rounded-2xl

        bg-white
        border-2
        border-[#D4AF37]

        shadow-[7px_7px_0_0_#E8D5C4]

        flex
        flex-col

        animate-in
        fade-in
        zoom-in-95
        duration-200
      "
    >
      {/* ─── HEADER ─── */}
      <div className="bg-[#4A2F1D] px-3.5 py-2.5 shrink-0 flex items-center justify-between border-b-2 border-[#D4AF37]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#D4AF37] flex items-center justify-center border-2 border-[#FCF9F6] flex-shrink-0">
            <Bot size={14} className="text-[#4A2F1D]" />
          </div>
          <div className="min-w-0">
            <h2 className="font-serif font-bold text-sm text-[#FCF9F6] truncate leading-tight">
              TE Assistant
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[8px] font-mono font-medium text-[#D4AF37] tracking-wider">
                Online
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 transition-all flex items-center justify-center flex-shrink-0 border border-[#D4AF37]/30"
        >
          <X size={13} className="text-[#FCF9F6]" />
        </button>
      </div>

      {/* ─── CHAT MESSAGES ─── */}
      <div className="flex-1 overflow-y-auto bg-[#FCF9F6] p-3">
        <ChatMessages messages={messages} isLoading={isLoading} />

        {/* Quick Actions (hanya jika chat kosong) */}
        {messages.length === 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-[8px] font-mono font-bold text-[#8B5A33] uppercase tracking-widest">
              <Sparkles size={9} className="text-[#D4AF37]" />
              <span>Pertanyaan Cepat</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleSendMessage("Bagaimana cara bergabung dengan Team Evangelisasi?")}
                className="px-2.5 py-1 text-[9px] font-bold text-[#4A2F1D] bg-white border border-[#E8D5C4] rounded-lg shadow-[2px_2px_0_0_#E8D5C4] hover:border-[#D4AF37] hover:shadow-[3px_3px_0_0_#D4AF37] transition-all active:scale-95"
              >
                Cara Bergabung
              </button>
              <button
                onClick={() => handleSendMessage("Apa saja seksi pelayanan atau divisi yang ada di Team Evangelisasi?")}
                className="px-2.5 py-1 text-[9px] font-bold text-[#4A2F1D] bg-white border border-[#E8D5C4] rounded-lg shadow-[2px_2px_0_0_#E8D5C4] hover:border-[#D4AF37] hover:shadow-[3px_3px_0_0_#D4AF37] transition-all active:scale-95"
              >
                Seksi Pelayanan
              </button>
              <button
                onClick={() => handleSendMessage("Kapan jadwal kumpul rutin Team Evangelisasi?")}
                className="px-2.5 py-1 text-[9px] font-bold text-[#4A2F1D] bg-white border border-[#E8D5C4] rounded-lg shadow-[2px_2px_0_0_#E8D5C4] hover:border-[#D4AF37] hover:shadow-[3px_3px_0_0_#D4AF37] transition-all active:scale-95"
              >
                Jadwal Rutin
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─── INPUT ─── */}
      <div className="shrink-0 bg-white border-t-2 border-[#E8D5C4] p-2.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.querySelector("input");
            if (input?.value.trim()) {
              handleSendMessage(input.value);
              input.value = "";
            }
          }}
          className="flex items-center gap-1.5"
        >
          <input
            type="text"
            placeholder="Ketik pesan..."
            disabled={isLoading}
            className="flex-1 bg-[#FAF8F5] border-2 border-[#D1C0B0] rounded-lg px-3 py-2 text-xs font-medium text-[#4A2F1D] placeholder-[#B5A392] focus:border-[#D4AF37] focus:shadow-[2px_2px_0_0_#E8D5C4] outline-none transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-8 h-8 rounded-lg bg-[#D4AF37] border-2 border-[#4A2F1D] text-[#4A2F1D] flex items-center justify-center shadow-[2px_2px_0_0_#4A2F1D] hover:shadow-[1px_1px_0_0_#4A2F1D] hover:bg-[#C5A059] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={13} />
          </button>
        </form>
      </div>
    </div>
  );
}