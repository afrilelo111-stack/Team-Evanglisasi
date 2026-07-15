"use client";

import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section 
      id="/about"
      className="min-h-[90vh] bg-[#121212] flex items-start justify-center px-4 pt-44 pb-20 relative overflow-hidden font-sans select-none text-white"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(212, 175, 55, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(212, 175, 55, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px'
      }}
    >
      {/* Efek Pendaran Cahaya Emas Sinematik */}
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl w-full text-center relative z-10 flex flex-col items-center">
        
        {/* LOGO UTAMA BESAR */}
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-7xl md:text-8xl font-black tracking-tighter text-[#FFF5D6] drop-shadow-[0_0_30px_rgba(214,175,85,0.2)] flex items-center"
        >
          TE<span className="text-[#D4AF37]">.</span>
        </motion.h1>

        {/* SUBTITLE KONTRASTING */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-sm md:text-base font-black tracking-[0.25em] text-[#D4AF37] uppercase mt-4 mb-8"
        >
          TEAM EVANGELISASI SMKN 3 MANADO
        </motion.p>

        {/* KOTAK KONTEN UTAMA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-3xl bg-[#1A1A1A]/70 backdrop-blur-md border border-stone-800 rounded-[2rem] p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.5)] mb-10"
        >
          <p className="text-sm md:text-base font-semibold text-stone-300 leading-relaxed">
            Wadah ekosistem pelayanan masa depan yang mengintegrasikan pembentukan karakter Kristen, 
            persekutuan pengurus, dan aksi nyata pelayanan kasih dalam satu tempat.
          </p>
        </motion.div>

        {/* TOMBOL AKSI */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          {/* Tombol Kiri: Guru Agama */}
          <Link 
            href="pembina"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-[#D4AF37] hover:bg-[#D4AF37]/5 text-[#D4AF37] font-black text-xs tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Users size={16} strokeWidth={2.5} />
            GURU AGAMA
          </Link>

          {/* Tombol Kanan: Anggota (Prefetch diaktifkan agar instan) */}
          <Link 
            href="/anggota"
            prefetch={true}
            className="w-full sm:w-auto px-8 py-4 bg-[#6F4E37] hover:bg-[#855e43] text-white font-black text-xs tracking-widest rounded-xl transition-all shadow-lg shadow-[#6F4E37]/10 flex items-center justify-center gap-2 group"
          >
            ANGGOTA
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}