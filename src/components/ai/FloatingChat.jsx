"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import ChatWindow from "./ChatWindow";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [bounce, setBounce] = useState(false);

  // Efek "getar" ringan untuk menarik perhatian (hanya saat pertama kali)
  useEffect(() => {
    const timer = setTimeout(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setOpen((prev) => !prev);
    setBounce(false);
  };

  return (
    <>
      {/* Chat Window */}
      {open && <ChatWindow onClose={() => setOpen(false)} />}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label={open ? "Tutup Chat" : "Buka Chat"}
        className={`
          fixed z-[999] flex items-center justify-center
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          hover:scale-110 active:scale-95
          group
          ${bounce ? "animate-bounce" : ""}
          /* 📱 POSISI MOBILE - Lebih tinggi agar tidak tertutup navbar bottom */
          ${open ? "bottom-6" : "bottom-24"} right-4
          /* 💻 POSISI DESKTOP */
          md:right-6 ${open ? "md:bottom-8" : "md:bottom-6"}
        `}
      >
        {/* ─── BADGE "ASSISTANT" ─── */}
        {!open && (
          <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#D4AF37] border border-[#4A2F1D] text-[#4A2F1D] text-[7px] font-black uppercase tracking-[0.15em] rotate-12 shadow-[2px_2px_0_0_#4A2F1D] z-10">
            AI
          </span>
        )}

        {/* ─── RING DEKORATIF ─── */}
        <span className={`
          absolute inset-[-4px] rounded-full border-2 border-[#D4AF37]/20
          transition-all duration-500
          ${isHovering ? "scale-110 opacity-100" : "scale-100 opacity-0"}
          ${open ? "scale-90 opacity-0" : ""}
        `} />

        <span className={`
          absolute inset-[-10px] rounded-full border border-[#D4AF37]/10
          transition-all duration-700
          ${isHovering && !open ? "scale-125 opacity-100" : "scale-100 opacity-0"}
        `} />

        {/* ─── BODY BUTTON ─── */}
        <div className={`
          relative w-14 h-14 rounded-full border-2 border-[#4A2F1D]
          shadow-[6px_6px_0_0_#E8D5C4] transition-all duration-300
          flex items-center justify-center
          ${open 
            ? "bg-[#FCF9F6] hover:bg-[#F5F0E8]" 
            : "bg-[#D4AF37] hover:bg-[#C5A059]"
          }
          ${isHovering && !open ? "shadow-[8px_8px_0_0_#D1C0B0]" : ""}
        `}>
          {/* Tekstur Kertas Halus */}
          <div className="absolute inset-0 rounded-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-multiply pointer-events-none" />

          {/* Icon Close */}
          <span className={`
            absolute transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${open 
              ? "rotate-0 scale-100 opacity-100" 
              : "rotate-90 scale-0 opacity-0"
            }
          `}>
            <X size={22} strokeWidth={2.8} className="text-[#4A2F1D]" />
          </span>

          {/* Icon Chat */}
          <span className={`
            absolute transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${open 
              ? "-rotate-90 scale-0 opacity-0" 
              : "rotate-0 scale-100 opacity-100"
            }
          `}>
            <MessageCircle size={22} strokeWidth={2.5} className="text-[#4A2F1D]" />
          </span>

          {/* Efek Kilap (hanya saat tidak open) */}
          {!open && (
            <span className="absolute top-1 left-3 w-3 h-3 bg-white/20 rounded-full blur-sm rotate-45" />
          )}
        </div>

        {/* ─── LABEL TOOLTIP ─── */}
        {!open && !isHovering && (
          <span className="absolute -top-10 right-0 px-3 py-1 bg-[#4A2F1D] border-2 border-[#D4AF37] text-[#FCF9F6] text-[8px] font-black uppercase tracking-[0.2em] whitespace-nowrap shadow-[3px_3px_0_0_#D4AF37] animate-pulse">
            Tanya AI
          </span>
        )}

        {!open && isHovering && (
          <span className="absolute -top-10 right-0 px-3 py-1 bg-[#D4AF37] border-2 border-[#4A2F1D] text-[#4A2F1D] text-[8px] font-black uppercase tracking-[0.2em] whitespace-nowrap shadow-[3px_3px_0_0_#4A2F1D]">
            Klik untuk Chat
          </span>
        )}
      </button>
    </>
  );
}