"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cross, Sparkles, Users, Flame } from "lucide-react";

export default function AboutEvangelisasi() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 70, damping: 18 } 
    }
  };

  return (
    <section id="tentang" className="relative py-20 md:py-28 bg-[#FDFBF7] text-[#2C2520] overflow-hidden selection:bg-[#6F4E37] selection:text-white">
      
      {/* ─── PREMIUM BACKGROUND TEXTURE & GRID ─── */}
      <div className="absolute inset-0 opacity-[0.012] bg-[radial-gradient(#6f4e37_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-[#6F4E37]/5 pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 px-6 md:px-12 items-center relative z-10"
      >
        
        {/* ─── KOLOM KIRI: EDITORIAL PHOTOGRAPHY COLLAGE ─── */}
        <motion.div variants={itemVariants} className="lg:col-span-5 relative w-full h-[480px] sm:h-[540px] flex items-center justify-center select-none">
          <div className="absolute top-6 left-6 right-2 bottom-12 border border-[#6F4E37]/10 rounded-2xl pointer-events-none z-0" />
          
          <div className="absolute top-[15%] left-0 w-[72%] h-[50%] rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(61,42,28,0.08)] border border-white z-20 group transition-all duration-500 hover:scale-[1.02]">
            <Image
              src="/kegiatan/jumat.png" 
              alt="Persekutuan TE Utama"
              fill
              className="object-cover object-center"
              sizes="(max-w-1024px) 50vw, 30vw"
              priority
            />
          </div>

          <div className="absolute top-0 right-0 w-[46%] h-[34%] rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.05)] border border-white z-30 group transition-all duration-500 hover:scale-[1.03]">
            <Image
              src="/kegiatan/doa.jpeg" 
              alt="Aktivitas Pendalaman Alkitab TE"
              fill
              className="object-cover object-center"
              sizes="(max-w-1024px) 30vw, 20vw"
            />
          </div>

          <div className="absolute bottom-4 right-[4%] w-[58%] h-[40%] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(61,42,28,0.1)] border border-white z-10 group transition-all duration-500 hover:scale-[1.02]">
            <Image
              src="/kegiatan/paskah.jpeg" 
              alt="Pelayanan Sosial Komunitas TE"
              fill
              className="object-cover object-center"
              sizes="(max-w-1024px) 35vw, 22vw"
            />
          </div>

          <div className="absolute bottom-10 left-[-4%] px-5 py-4 bg-white border border-[#6F4E37]/10 rounded-xl shadow-[0_15px_35px_rgba(61,42,28,0.06)] flex items-center gap-3.5 z-45">
            <div className="w-9 h-9 rounded-lg bg-[#6F4E37] flex items-center justify-center text-white shrink-0">
              <Cross size={16} className="text-[#D4AF37]" />
            </div>
            <div className="leading-tight">
              <p className="text-[10px] font-black tracking-[0.2em] text-[#B38F24] uppercase">Soli Deo Gloria</p>
              <p className="text-xs font-black text-[#3D2A1C] mt-0.5">Bertumbuh & Bersinar</p>
            </div>
          </div>        
        </motion.div>

        {/* ─── KOLOM KANAN: PENJELASAN RINGKAS & MENARIK ─── */}
        <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col justify-center">
          
          <div className="flex items-center gap-2 mb-3 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[11px] font-black tracking-[0.25em] text-[#B38F24] uppercase">
              Welcome to the Family
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-[#3D2A1C] tracking-tight leading-[1.1] mb-6">
            Mengenal <span className="font-serif italic font-normal text-[#8B6347]">Team Evangelisasi</span>
          </h2>

          <div className="space-y-5 text-stone-700 text-sm md:text-base leading-relaxed font-medium mb-8">
            <p>
              <strong className="text-[#3D2A1C]">Team Evangelisasi (TE)</strong> adalah komunitas dan wadah persekutuan resmi bagi siswa-siswi Kristen di SMKN 3 Manado. Di sini, kami bukan cuma sekadar berorganisasi, tapi membangun sebuah <span className="text-[#8B6347] font-bold">circle pertemanan yang sehat, suportif, dan penuh rasa kekeluargaan</span>.
            </p>
            
            <p>
              Lewat berbagai kegiatan seru—mulai dari ibadah kreatif, pengembangan bakat musik, tim multimedia, hingga aksi sosial nyata—TE hadir sebagai tempat terbaik buat kamu yang ingin mengasah talenta sekaligus memperdalam iman rohani selama masa sekolah.
            </p>

            <div className="bg-[#6F4E37]/5 border-l-2 border-[#D4AF37] p-4 rounded-r-xl flex items-start gap-3 mt-4">
              <Sparkles size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-[#6F4E37] font-semibold font-serif italic">
                &ldquo;Gak perlu nunggu sempurna buat melayani. Di sini kita belajar bareng dari nol, seru-seruan bareng, dan sama-sama jadi dampak positif di sekolah!&rdquo;
              </p>
            </div>
          </div>

          {/* QUICK HIGHLIGHTS */}
          <div className="grid grid-cols-2 gap-4 border-t border-[#6F4E37]/10 pt-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#6F4E37]/5 flex items-center justify-center text-[#6F4E37]">
                <Users size={14} />
              </div>
              <span className="text-xs font-bold text-stone-600">Positive Environment</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#6F4E37]/5 flex items-center justify-center text-[#6F4E37]">
                <Flame size={14} />
              </div>
              <span className="text-xs font-bold text-stone-600">Skill & Talent Growth</span>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
}