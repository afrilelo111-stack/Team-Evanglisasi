"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section id="#beranda" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[url('/hero.jpg')] bg-cover bg-center">
      
      {/* Overlay Gradasi Premium */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-[#432e20]/40 z-0" />
      
      {/* Efek Vignette/Pojok Gelap Sinematik */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85))] z-0" />

      {/* Pendaran Ambient Cahaya Emas Lembut di Latar Belakang */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* KONTEN UTAMA: Diberi padding atas (pt-28) agar kebal dari tabrakan navbar melayang */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto flex flex-col items-center pt-28 md:pt-20 pb-12">
        
        {/* Kontainer Logo - Glow Diperhalus & Lebih Organik */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.2 }}
          className="mb-6 relative group cursor-pointer"
        >
          {/* Lapisan Glow Emas 1: Inti Terang */}
          <div className="absolute inset-0 bg-[#D4AF37]/35 blur-xl rounded-full scale-90 animate-pulse duration-1000" />
          
          {/* Lapisan Glow Emas 2: Pendaran Luar Luas */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/15 to-[#AA7C11]/25 blur-3xl rounded-full scale-150 group-hover:scale-165 transition-transform duration-700 mix-blend-screen" />
          
        `  <div className="relative w-[120px] h-[120px] p-2 flex items-center justify-center">
            <Image 
              src="/logo/logo.png" 
              alt="Logo TE SMKN 3" 
              fill 
              sizes="120px"
              className="object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.5)] drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-all duration-500"
              priority
            />
          </div>`
        </motion.div>

        {/* Sub-header Sekolah */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#D4AF37] uppercase mb-4 drop-shadow-md"
        >
          SMK Negeri 3 Manado
        </motion.p>

        {/* Judul Utama dengan Gradasi Sinematik Premium */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] mb-5 drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
        >
          TEAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF3CC] to-[#D4AF37] filter drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">EVANGELISASI</span>
        </motion.h1>

        {/* Tagline Visi */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-base md:text-2xl font-medium tracking-wide text-stone-200/95 italic max-w-2xl drop-shadow-sm"
        >
          &ldquo;Beri Yang Terbaik Untuk Kemuliaan Tuhan&rdquo;
        </motion.p>

        {/* Deskripsi Komunitas */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-5 text-xs md:text-sm max-w-xl text-stone-300/80 leading-relaxed font-normal tracking-wide px-4"
        >
          Komunitas siswa Kristen yang bertumbuh dalam iman, melayani dengan kasih, dan siap menjadi terang di lingkungan sekolah.
        </motion.p>

        {/* Kontainer Tombol / Call To Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-6 sm:px-0"
        >
          <a 
            href="#about" 
            className="group px-7 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase border border-white/10 bg-white/[0.04] backdrop-blur-md text-white hover:bg-white hover:text-black hover:border-white shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            Tentang TE
          </a>

          <a
            href="https://forms.gle/your-form-link"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-3.5 rounded-full font-black text-xs tracking-widest uppercase bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:brightness-110 text-white shadow-[0_15px_30px_rgba(212,175,55,0.2)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 border border-[#D4AF37]/30"
          >
            Gabung Sekarang
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>

      {/* Indikator Scroll Down */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0], y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 text-stone-400/60 selection:bg-transparent"
      >
        <span className="text-[8px] font-bold tracking-[0.3em] uppercase">Scroll Down</span>
        <ChevronDown size={14} className="text-[#D4AF37]" />
      </motion.div>
    </section>
  );
}