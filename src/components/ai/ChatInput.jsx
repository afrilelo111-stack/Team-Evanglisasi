// src/components/ai/ChatInput.jsx
import { useState } from "react";
import { SendHorizontal } from "lucide-react";

export default function ChatInput({ onSendMessage, isLoading }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    onSendMessage(text.trim());
    setText(""); // Kosongkan form input setelah terkirim
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="p-3 border-t border-[#6F4E37]/10 bg-white flex items-center gap-2"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
        placeholder="Ketik pesan di sini..."
        className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-medium text-[#2C2520] placeholder-stone-400 focus:outline-none focus:border-[#6F4E37] disabled:opacity-60 transition-colors"
      />
      <button
        type="submit"
        disabled={!text.trim() || isLoading}
        className="w-10 h-10 rounded-xl bg-[#6F4E37] text-white flex items-center justify-center hover:bg-[#593E2B] disabled:bg-stone-200 disabled:text-stone-400 transition-all active:scale-95 shrink-0"
      >
        <SendHorizontal size={16} />
      </button>
    </form>
  );
}