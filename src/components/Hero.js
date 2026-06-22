"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";

// Variasi animasi untuk efek transisi teks yang mengalir (Staggered)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Membekukan nilai acak partikel agar tidak memicu re-render berkali-kali
  const particleData = useMemo(() => {
    return Array.from({ length: 15 }).map(() => {
      const size = Math.random() * 4 + 2;
      return {
        size,
        left: Math.random() * 100,
        drift: Math.random() * 24 - 12,
        delay: Math.random() * 4,
        duration: Math.random() * 6 + 8,
        blur: size > 4 ? "blur(1px)" : "blur(0.2px)"
      };
    });
  }, []);

  return (
    <section 
      id="beranda" 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#0A0604] select-none"
    >
      {/* ─── VISUAL BACKGROUND LAYER (ULTRA OPTIMIZED) ─── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0604] via-[#140D08] to-[#1F140E] z-0" />
      
      {/* Grid pattern yang diperhalus opacity-nya */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff005_1px,transparent_1px),linear-gradient(to_bottom,#ffffff005_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 z-0" />

      {/* Pendaran Cahaya Utama - Memakai CSS Pulse murni (Sangat Ringan dibanding JS animation) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[280px] md:w-[600px] h-[280px] md:h-[600px] bg-gradient-to-tr from-[#D4AF37]/15 via-[#AA7C11]/5 to-transparent blur-[100px] md:blur-[140px] rounded-full pointer-events-none z-0 animate-pulse duration-[7000ms]" />

      {/* Partikel Emas Melayang Bebas dengan Akselerasi GPU */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {mounted && particleData.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-b from-[#FFF5D6] via-[#D4AF37] to-transparent will-change-transform"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              bottom: "-10%",
              filter: p.blur,
            }}
            animate={{
              y: ["0vh", "-115vh"],
              x: ["0px", `${p.drift}px`],
              opacity: [0, 0.8, 0.4, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ─── KONTEN UTAMA (STAGGERED MULTI-ELEMENT) ─── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center text-white px-5 max-w-4xl mx-auto flex flex-col items-center pt-20 pb-12"
      >
        
        {/* LOGO CONTAINER DENGAN HALO GLOW */}
        <motion.div
          variants={itemVariants}
          className="mb-6 relative group cursor-pointer"
        >
          <div className="absolute inset-0 bg-[#D4AF37]/15 blur-xl rounded-full scale-90 group-hover:scale-110 transition-transform duration-500" />
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-stone-950/40 rounded-full border border-white/5 backdrop-blur-xs">
            <Image 
              src="/logo/logo1.png" 
              alt="Logo TE SMKN 3" 
              fill 
              sizes="(max-width: 768px) 96px, 128px"
              className="object-contain p-2 filter drop-shadow-[0_8px_16px_rgba(212,175,55,0.25)] transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </motion.div>

        {/* SUB-HEADER SEKOLAH */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5"
        >
          <Sparkles size={11} className="text-[#D4AF37] animate-pulse" />
          <span className="text-[9px] md:text-[11px] font-black tracking-[0.3em] text-[#D4AF37] uppercase">
            SMK Negeri 3 Manado
          </span>
        </motion.div>

        {/* JUDUL UTAMA */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-5 text-white"
        >
          TEAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8E7] to-[#D4AF37] drop-shadow-[0_2px_8px_rgba(212,175,55,0.15)]">EVANGELISASI</span>
        </motion.h1>

        {/* TAGLINE VISI */}
        <motion.p 
          variants={itemVariants}
          className="text-base md:text-xl font-serif italic text-stone-200/90 max-w-2xl px-2 tracking-wide"
        >
          &ldquo;Beri Yang Terbaik Untuk Kemuliaan Tuhan&rdquo;
        </motion.p>

        {/* DESKRIPSI RINGKAS */}
        <motion.p 
          variants={itemVariants}
          className="mt-4 text-xs md:text-sm max-w-md text-stone-400/80 leading-relaxed font-medium px-4"
        >
          Komunitas asyik siswa Kristen untuk saling bertumbuh iman, mengasah talenta, dan membawa dampak positif yang nyata di lingkungan sekolah.
        </motion.p>

        {/* TOMBOL CALL TO ACTION */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center w-full max-w-[250px] sm:max-w-none px-2 relative z-20"
        >
          <motion.a
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="https://forms.gle/your-form-link"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-7 py-3.5 rounded-full font-black text-xs tracking-widest uppercase bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-white shadow-[0_8px_24px_rgba(212,175,55,0.2)] hover:shadow-[0_12px_32px_rgba(212,175,55,0.3)] transition-all duration-200 flex items-center justify-center gap-2"
          >
            Gabung Sekarang
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="#about" 
            className="px-7 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase border border-white/10 bg-white/[0.01] text-white hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center"
          >
            Tentang TE
          </motion.a>
        </motion.div>
      </motion.div>

      {/* INDIKATOR SCROLL DOWN DESKTOP */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5 text-stone-500/40">
        <span className="text-[7px] font-bold tracking-[0.25em] uppercase">Scroll Down</span>
        <ChevronDown size={12} className="text-[#D4AF37] animate-bounce" />
      </div>
    </section>
  );
}