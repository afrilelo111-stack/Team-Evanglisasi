"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Heart, Cross, CalendarDays, Award, ShieldCheck, Flame, Bookmark } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 70, damping: 18 } 
    }
  };

  const misiData = [
    {
      label: "Hubungan Pribadi",
      deskripsi: "Membina setiap anggota untuk membangun hubungan pribadi dengan Tuhan melalui pengajaran rohani mendalam dan pemuridan rutin.",
      icon: <Bookmark size={18} />
    },
    {
      label: "Pelayanan Kasih",
      deskripsi: "Menggerakkan setiap pribadi untuk menjadi saluran berkat dan menyebarkan pelayanan kasih yang nyata di lingkungan sekitar.",
      icon: <Heart size={18} />
    },
    {
      label: "Integritas Organisasi",
      deskripsi: "Membangun jiwa kepemimpinan yang tertib, andal, luhur, dan bertanggung jawab penuh di hadapan Tuhan serta sesama.",
      icon: <ShieldCheck size={18} />
    }
  ];

  return (
    <section id="about" className="relative py-24 md:py-36 bg-[#FDFBF7] text-[#2C2520] overflow-hidden selection:bg-[#6F4E37] selection:text-white">
      
      {/* ─── PREMIUM BACKGROUND TEXTURE & GRID (BUKAN GRADIENT AI) ─── */}
      <div className="absolute inset-0 opacity-[0.012] bg-[radial-gradient(#6f4e37_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-[#6F4E37]/5 pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 lg:gap-24 px-6 md:px-12 items-center relative z-10"
      >
        
        {/* ─── KOLOM KIRI: EDITORIAL PHOTOGRAPHY COLLAGE (PREMIUM) ─── */}
        <motion.div variants={itemVariants} className="lg:col-span-5 relative w-full h-[520px] sm:h-[600px] flex items-center justify-center select-none">
          
          {/* Garis Frame Abstrak Belakang */}
          <div className="absolute top-6 left-6 right-2 bottom-12 border border-[#6F4E37]/10 rounded-2xl pointer-events-none z-0" />
          
          {/* FOTO 1: JANGKAR UTAMA (LANSKAP TENGAH) */}
          <div className="absolute top-[15%] left-0 w-[72%] h-[50%] rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(61,42,28,0.08)] border border-white z-20 group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(61,42,28,0.15)]">
            <Image
              src="/kegiatan/jumat.png" 
              alt="Persekutuan TE Utama"
              fill
              className="object-cover object-center"
              sizes="(max-w-1024px) 50vw, 30vw"
              priority
            />
            <div className="absolute inset-0 bg-[#3D2A1C]/10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
          </div>

          {/* FOTO 2: SATELLIT ATAS KANAN (KOTAK MINI) */}
          <div className="absolute top-0 right-0 w-[46%] h-[34%] rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.05)] border border-white z-30 group transition-all duration-500 hover:scale-[1.03]">
            <Image
              src="/kegiatan/doa.jpeg" 
              alt="Aktivitas Pendalaman Alkitab TE"
              fill
              className="object-cover object-center"
              sizes="(max-w-1024px) 30vw, 20vw"
            />
          </div>

          {/* FOTO 3: FONDASI BAWAH KANAN (VERTIKAL PANJANG) */}
          <div className="absolute bottom-4 right-[4%] w-[58%] h-[40%] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(61,42,28,0.1)] border border-white z-10 group transition-all duration-500 hover:scale-[1.02]">
            <Image
              src="/kegiatan/paskah.jpeg" 
              alt="Pelayanan Sosial Komunitas TE"
              fill
              className="object-cover object-center"
              sizes="(max-w-1024px) 35vw, 22vw"
            />
            <div className="absolute inset-0 bg-[#3D2A1C]/5 mix-blend-multiply" />
          </div>

          {/* FLOATING DESIGNER INSIGNIA */}
          <div className="absolute bottom-10 left-[-4%] px-5 py-4 bg-white border border-[#6F4E37]/10 rounded-xl shadow-[0_15px_35px_rgba(61,42,28,0.06)] flex items-center gap-3.5 z-45 transform hover:scale-103 transition-transform duration-300">
            <div className="w-9 h-9 rounded-lg bg-[#6F4E37] flex items-center justify-center text-white shrink-0">
              <Cross size={16} className="text-[#D4AF37]" />
            </div>
            <div className="leading-tight">
              <p className="text-[10px] font-black tracking-[0.2em] text-[#B38F24] uppercase">Soli Deo Gloria</p>
              <p className="text-xs font-black text-[#3D2A1C] mt-0.5">Bertumbuh & Bersinar</p>
            </div>
          </div>        
        </motion.div>

        {/* ─── KOLOM KANAN: PANEL VISI & MISI EDITORIAL ─── */}
        <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col justify-center">
          
          <div className="flex items-center gap-2 mb-4 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[11px] font-black tracking-[0.25em] text-[#B38F24] uppercase">
              Arah & Komitmen
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-[#3D2A1C] tracking-tight leading-[1.1] mb-10">
            Visi & Misi <span className="font-serif italic font-normal text-[#8B6347]">Organisasi</span>
          </h2>

          {/* ── VISI SECTION (MAGAZINE STYLE QUOTE) ── */}
          <div className="relative border-l-4 border-[#6F4E37] pl-6 md:pl-8 py-2 mb-14 group">
            <div className="absolute -top-6 left-4 text-6xl font-serif text-[#6F4E37]/5 select-none font-black">“</div>
            <h3 className="text-[10px] font-black tracking-widest text-[#B38F24] uppercase mb-2 flex items-center gap-1.5">
              <Flame size={12} className="fill-[#D4AF37]/10 text-[#D4AF37]" /> Visi Utama
            </h3>
            <p className="text-xl md:text-2xl font-serif italic text-[#3D2A1C] leading-relaxed">
              &ldquo;Membina karakter setiap siswa Kristen melalui persekutuan dan pelayanan untuk menjadi saksi-saksi Kristus sebagai penggenapan amanat agung.&rdquo;
            </p>
          </div>

          {/* ── MISI SECTION (CLEAN VERTICAL INDEX LIST) ── */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black tracking-widest text-[#B38F24] uppercase border-b border-[#6F4E37]/10 pb-2">
              Misi Operasional
            </h3>

            <div className="divide-y divide-[#6F4E37]/10">
              {misiData.map((misi, index) => (
                <div 
                  key={index} 
                  className="flex gap-5 pt-5 pb-5 first:pt-0 last:pb-0 group/misi transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#6F4E37]/5 text-[#6F4E37] flex items-center justify-center shrink-0 group-hover/misi:bg-[#6F4E37] group-hover/misi:text-white transition-colors duration-300">
                    {misi.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-[#3D2A1C] group-hover/misi:text-[#8B6347] transition-colors duration-200">
                      {misi.label}
                    </h4>
                    <p className="text-xs md:text-sm text-stone-600 leading-relaxed max-w-xl">
                      {misi.deskripsi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* METADATA BAR BAWAH */}
          <div className="border-t border-[#6F4E37]/10 mt-12 pt-6 flex flex-wrap items-center gap-6 md:gap-10">
            <div className="flex items-center gap-2">
              <CalendarDays size={14} className="text-[#B38F24]" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-stone-500">Program Terjadwal</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={14} className="text-[#B38F24]" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-stone-500">Resmi SMKN 3 Manado</span>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
}
