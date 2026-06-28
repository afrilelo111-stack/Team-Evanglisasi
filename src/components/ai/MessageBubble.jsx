// src/components/ai/MessageBubble.jsx
import { motion } from "framer-motion";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-[80%] px-4 py-3 text-sm leading-relaxed font-medium
          relative
          ${isUser 
            ? /* ─── USER BUBBLE (Telegraf / Formulir Coklat) ─── */
              "bg-[#4A2F1D] text-[#FCF9F6] rounded-2xl rounded-tr-none shadow-[4px_4px_0_0_#E8D5C4] border-2 border-[#D4AF37]"
            : /* ─── AI BUBBLE (Kartu Kertas Vintage) ─── */
              "bg-white text-[#4A2F1D] rounded-2xl rounded-tl-none shadow-[4px_4px_0_0_#E8D5C4] border-2 border-[#E8D5C4]"
          }
        `}
      >
        {/* ─── DEKORASI KARTU ─── */}
        {!isUser && (
          <>
            {/* Selotip Kertas di pojok kiri atas */}
            <div className="absolute -top-1 -left-1 w-6 h-6 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-sm rotate-[-12deg] pointer-events-none" />
            
            {/* Cap / Stempel kecil */}
            <div className="absolute -bottom-1 -right-1 flex items-center gap-0.5 text-[6px] font-mono font-bold text-[#D4AF37]/30 tracking-widest uppercase pointer-events-none">
              <span className="border border-[#D4AF37]/20 px-1 py-0.5 rounded rotate-12">ARSIP</span>
            </div>
          </>
        )}

        {isUser && (
          <>
            {/* Garis aksen emas di user bubble */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37] rounded-l-2xl" />
            
            {/* Ikon kecil pengirim */}
            <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#D4AF37] border-2 border-[#4A2F1D] flex items-center justify-center text-[6px] font-black text-[#4A2F1D] shadow-[2px_2px_0_0_#3D2616]">
              U
            </div>
          </>
        )}

        {/* ─── ISI PESAN ─── */}
        <p className={`whitespace-pre-wrap ${isUser ? "font-sans" : "font-serif italic"}`}>
          {message.text}
        </p>

        {/* ─── TIMESTAMP ─── */}
        {message.timestamp && (
          <span className={`
            text-[8px] font-mono font-bold block mt-1.5 tracking-wider
            ${isUser ? "text-[#D4AF37]/70" : "text-[#8B5A33]/50"}
          `}>
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        )}

        {/* ─── GARIS BAWAH DEKORATIF ─── */}
        {isUser && (
          <div className="absolute bottom-0 right-0 w-1/3 h-[2px] bg-[#D4AF37]/30 rounded-b-full" />
        )}
        {!isUser && (
          <div className="absolute bottom-0 left-0 w-1/4 h-[1px] bg-[#D4AF37]/20" />
        )}
      </div>
    </motion.div>
  );
}