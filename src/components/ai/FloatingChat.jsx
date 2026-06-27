"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from "./ChatWindow";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  const toggleChat = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      {/* Chat Window */}
      {open && <ChatWindow onClose={() => setOpen(false)} />}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        aria-label={open ? "Tutup Chat" : "Buka Chat"}
        className={`
          fixed
          ${open ? "bottom-8" : "bottom-6"}
          right-6
          z-[999]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#C9A227]
          text-white
          shadow-xl
          transition-all
          duration-300
          hover:scale-110
          hover:bg-[#B8931F]
          hover:shadow-2xl
          active:scale-95
        `}
      >
        {/* Icon Close */}
        <span
          className={`
            absolute
            transition-all
            duration-300
            ${
              open
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-90 scale-0 opacity-0"
            }
          `}
        >
          <X size={24} strokeWidth={2.8} />
        </span>

        {/* Icon Chat */}
        <span
          className={`
            absolute
            transition-all
            duration-300
            ${
              open
                ? "-rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }
          `}
        >
          <MessageCircle size={24} strokeWidth={2.5} />
        </span>
      </button>
    </>
  );
}