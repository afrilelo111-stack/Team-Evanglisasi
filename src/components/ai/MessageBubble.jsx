// src/components/ai/MessageBubble.jsx
import { motion } from "framer-motion";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm font-medium ${
          isUser
            ? "bg-[#6F4E37] text-white rounded-tr-none"
            : "bg-white border border-stone-100 text-[#2C2520] rounded-tl-none"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        
        {/* Indikator Waktu/Jam Kecil (Opsional) */}
        {message.timestamp && (
          <span className={`text-[9px] block mt-1 text-right ${isUser ? "text-stone-300" : "text-stone-400"}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </motion.div>
  );
}