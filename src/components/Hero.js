"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section 
      id="beranda" 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[url('/hero.webp')] bg-cover bg-center select-none"
    >
      {/* ─── OVERLAY GRADASI & VIGNETTE KONTRAST TINGGI ─── */}
      {/* Overlay Hitam Komprehensif */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-[#2A1D15] z-0" />
      
      {/* Efek Vignette Sinematik (Radial Glow) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85))] z-0" />

      {/* Pendaran Ambient Emas Halus */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* ─── KONTEN UTAMA ─── */}
      <div className="relative z-10 text-center text-white px-5 max-w-3xl mx-auto flex flex-col items-center pt-24 pb-12">
        
        {/* LOGO CONTAINER DENGAN PREMIUM GLOW */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.2 }}
          whileTap={{ scale: 0.95 }}
          className="mb-5 relative group cursor-pointer"
        >
          {/* Lapisan Glow Emas 1: Inti */}
          <div className="absolute inset-0 bg-[#D4AF37]/30 blur-2xl rounded-full scale-100 animate-pulse duration-[3000ms]" />
          
          {/* Lapisan Glow Emas 2: Pendaran Luas (Mix Blend Mode) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/15 to-[#AA7C11]/25 blur-3xl rounded-full scale-160 group-hover:scale-175 transition-transform duration-700 mix-blend-screen" />
          
          <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
            <Image 
              src="/logo/logo1.png" 
              alt="Logo TE SMKN 3" 
              fill 
              sizes="(max-width: 768px) 112px, 128px"
              className="object-contain filter drop-shadow-[0_8px_20px_rgba(212,175,55,0.4)] drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-all duration-500"
              priority
            />
          </div>
        </motion.div>

        {/* SUB-HEADER SEKOLAH */}
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#D4AF37] uppercase mb-2 drop-shadow-md"
        >
          SMK Negeri 3 Manado
        </motion.p>

        {/* JUDUL UTAMA DENGAN GRADASI SINEMATIK PREMIUM */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] mb-5 Text-white"
        >
          TEAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF5D6] to-[#D4AF37] filter drop-shadow-[0_4px_15px_rgba(212,175,55,0.2)]">EVANGELISASI</span>
        </motion.h1>

        {/* TAGLINE VISI (FONT SERIF UNTUK KESAN LUXURY) */}
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-sm md:text-xl font-serif italic text-stone-200/95 max-w-xl px-2 drop-shadow-sm"
        >
          &ldquo;Beri Yang Terbaik Untuk Kemuliaan Tuhan&rdquo;
        </motion.p>

        {/* DESKRIPSI RINGKAS */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-5 text-xs md:text-sm max-w-md text-stone-300/80 leading-relaxed font-medium px-4"
        >
          Komunitas asyik siswa Kristen untuk saling bertumbuh iman, mengasah talenta, dan bawa dampak positif di sekolah.
        </motion.p>

        {/* ─── TOMBOL CALL TO ACTION (MOBILE-FIRST DRIVEN) ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-[280px] sm:max-w-none px-2"
        >
          {/* Tombol Utama (Gabung) */}
          <motion.a
            whileTap={{ scale: 0.96 }}
            href="https://forms.gle/your-form-link"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-7 py-3.5 rounded-full font-black text-xs tracking-widest uppercase bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:brightness-110 text-white shadow-[0_12px_30px_rgba(212,175,55,0.25)] transition-all duration-200 flex items-center justify-center gap-2 border border-[#D4AF37]/30"
          >
            Gabung Sekarang
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.a>

          {/* Tombol Kedua (Tentang) */}
          <motion.a 
            whileTap={{ scale: 0.96 }}
            href="#about" 
            className="px-7 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase border border-white/20 bg-white/[0.05] backdrop-blur-md text-white hover:bg-white hover:text-black hover:border-white shadow-xl transition-all duration-300 flex items-center justify-center"
          >
            Tentang TE
          </motion.a>
        </motion.div>
      </div>

      {/* INDIKATOR SCROLL DOWN (HANYA MUNCUL DI DESKTOP) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0], y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5 text-stone-400/50 selection:bg-transparent"
      >
        <span className="text-[8px] font-bold tracking-[0.3em] uppercase">Scroll Down</span>
        <ChevronDown size={14} className="text-[#D4AF37]" />
      </motion.div>
    </section>
  );
}