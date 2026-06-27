// src/components/ai/ChatMessages.jsx
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    // Otomatis scroll ke bawah dengan mulus saat isi chat berubah
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 scrollbar-none bg-[#FDFBF7]/50">
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-center px-6 opacity-60">
          <p className="text-sm font-serif italic text-[#8B6347]">Halo! Ada yang bisa Team Evangelisasi AI bantu hari ini?</p>
        </div>
      )}

      {messages.map((msg, index) => (
        <MessageBubble key={msg.id || index} message={msg} />
      ))}

      {isLoading && (
        <div className="flex justify-start w-full mb-3">
          <TypingIndicator />
        </div>
      )}
      
      {/* Element penanda jangkar untuk auto-scroll */}
      <div ref={bottomRef} />
    </div>
  );
}