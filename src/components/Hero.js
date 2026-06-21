"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section 
      id="beranda" 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[url('/hero.jpg')] bg-cover bg-center select-none"
    >
      {/* ─── OVERLAY GRADASI & VIGNETTE KONTRAST TINGGI ─── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#2A1D15] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85))] z-0" />

      {/* ─── KONTEN UTAMA ─── */}
      <div className="relative z-10 text-center text-white px-5 max-w-3xl mx-auto flex flex-col items-center pt-24 pb-8">
        
        {/* LOGO CONTAINER WITH SPRING EFFECT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.15 }}
          whileTap={{ scale: 0.95 }}
          className="mb-4 relative cursor-pointer"
        >
          <div className="absolute inset-0 bg-[#D4AF37]/20 blur-2xl rounded-full scale-110" />
          <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
            <Image 
              src="/logo/logo.png" 
              alt="Logo TE SMKN 3" 
              fill 
              sizes="(max-width: 768px) 96px, 112px"
              className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>
        </motion.div>

        {/* SUB-HEADER */}
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-[10px] md:text-xs font-black tracking-[0.35em] text-[#D4AF37] uppercase mb-2 drop-shadow-md"
        >
          SMK Negeri 3 Manado
        </motion.p>

        {/* JUDUL UTAMA DENGAN TRUNCATION BERSIH */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] mb-4 text-white"
        >
          TEAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF5D6] to-[#D4AF37]">EVANGELISASI</span>
        </motion.h1>

        {/* TAGLINE VISI */}
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm md:text-xl font-serif italic text-stone-200/90 max-w-xl px-2"
        >
          &ldquo;Beri Yang Terbaik Untuk Kemuliaan Tuhan&rdquo;
        </motion.p>

        {/* DESKRIPSI RINGKAS */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-4 text-xs md:text-sm max-w-md text-stone-300/80 leading-relaxed font-medium px-4"
        >
          Komunitas asyik siswa Kristen untuk saling bertumbuh iman, mengasah talenta, dan bawa dampak positif di sekolah.
        </motion.p>

        {/* ─── TOMBOL CALL TO ACTION (MOBILE-FIRST DRIVEN) ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center w-full max-w-[280px] sm:max-w-none px-2"
        >
          {/* Main Action (Gabung): Ditaruh paling atas/kiri untuk akses jempol instan */}
          <motion.a
            whileTap={{ scale: 0.97 }}
            href="https://forms.gle/your-form-link"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-6 py-3.5 rounded-full font-black text-xs tracking-widest uppercase bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-white shadow-[0_8px_25px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2 border border-[#D4AF37]/20 transition-transform duration-150"
          >
            Gabung Sekarang
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.a>

          {/* Secondary Action (Tentang) */}
          <motion.a 
            whileTap={{ scale: 0.97 }}
            href="#about" 
            className="px-6 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase border border-white/20 bg-white/[0.06] backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center"
          >
            Tentang TE
          </motion.a>
        </motion.div>
      </div>

      {/* INDIKATOR SCROLL DOWN (HANYA MUNCUL DI DESKTOP AGAR HP TETAP BERSIH) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0], y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1.2 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 text-stone-400/50"
      >
        <span className="text-[8px] font-bold tracking-[0.25em] uppercase">Scroll Down</span>
        <ChevronDown size={12} className="text-[#D4AF37]" />
      </motion.div>
    </section>
  );
}