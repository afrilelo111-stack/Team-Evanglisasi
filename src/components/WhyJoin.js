"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Award, Sparkles, ArrowUpRight } from "lucide-react";

const reasons = [
  {
    no: "01",
    title: "Bertumbuh Dalam Iman",
    desc: "Bukan sekadar rutinitas rohani biasa. Ini wadah nyata buat kamu memperdalam pengenalan akan Tuhan lewat firman dan kelompok doa yang saling menguatkan.",
    icon: ShieldCheck,
  },
  {
    no: "02",
    title: "Circle Pertemanan Positif",
    desc: "Temukan lingkungan sehat yang suportif. Tempat di mana kita bisa saling jaga dari pergaulan negatif, saling mendukung, dan membawa dampak baik buat masa depan.",
    icon: HeartHandshake,
  },
  {
    no: "03",
    title: "Asah Bakat & Leadership",
    desc: "Kembangkan potensi terbaikmu di sini. Belajar jadi Worship Leader, pemain musik, tim multimedia kreatif, hingga belajar manajemen organisasi asli.",
    icon: Award,
  },
  {
    no: "04",
    title: "Menjadi Berkat Nyata",
    desc: "Ambil peran langsung jadi terang di sekolah melalui pelayanan altar ibadah rutin dan aksi sosial kunjungan kasih (anjangsana) yang berdampak luas.",
    icon: Sparkles,
  },
];

export default function WhyJoin() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 80, damping: 16 } 
    }
  };

  return (
    <section id="/whyjoin" className="relative py-24 md:py-36 bg-[#FDFBF7] text-[#2C2520] overflow-hidden selection:bg-[#6F4E37] selection:text-white">
      
      {/* ─── GRID ACCENT BACKGROUND ─── */}
      <div className="absolute inset-0 opacity-[0.012] bg-[radial-gradient(#6f4e37_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-[#6F4E37]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ─── HEADER SECTION ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#6F4E37]/10 pb-12 mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[11px] font-black tracking-[0.25em] text-[#B38F24] uppercase">
                Join Our Movement
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#3D2A1C] tracking-tight leading-[1.1]">
              Kenapa Kamu Harus <br />
              <span className="font-serif italic font-normal text-[#8B6347]">Join Team Evangelisasi?</span>
            </h2>
          </div>
          <p className="text-stone-600 max-w-sm text-sm md:text-base leading-relaxed font-medium">
            Masa SMK adalah waktu terbaik buat nemuin jati diri. Di sini, kamu gak bakal jalan sendirian—kita berproses bareng buat hidup yang lebih berdampak.
          </p>
        </div>

        {/* ─── PREMIUM ASYMMETRIC GRID ─── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#6F4E37]/10 rounded-3xl overflow-hidden bg-white shadow-[0_15px_40px_rgba(61,42,28,0.02)]"
        >
          {reasons.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="group relative p-8 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-[#6F4E37]/10 last:border-r-0 last:border-b-0 md:even:border-b-0 sm:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r border-[#6F4E37]/10 transition-all duration-300 hover:bg-[#6F4E37]/[0.02]"
              >
                <div>
                  {/* Card Badge Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-10 h-10 rounded-xl bg-[#6F4E37]/5 text-[#6F4E37] flex items-center justify-center group-hover:bg-[#6F4E37] group-hover:text-white transition-all duration-300">
                      <IconComponent size={20} />
                    </div>
                    <span className="text-3xl font-serif italic font-bold text-stone-200 select-none group-hover:text-[#D4AF37]/40 transition-colors duration-300">
                      {item.no}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-black text-[#3D2A1C] tracking-tight group-hover:text-[#8B6347] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 text-xs md:text-sm mt-3 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* Micro-interaction Line */}
                <div className="w-full h-[2px] bg-[#D4AF37] absolute bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ─── HERO CALL TO ACTION (INTERAKTIF & Mahal) ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#3D2A1C] to-[#23170E] text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(35,23,14,0.15)]"
        >
          {/* Aksen Latar Belakang */}
          <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-[#D4AF37]/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="text-center md:text-left space-y-2 relative z-10">
            <h4 className="text-xl md:text-2xl font-black tracking-tight">
              Siap mengambil langkah awal untuk berdampak?
            </h4>
            <p className="text-xs md:text-sm text-stone-300 font-medium">
              Jangan lewatkan kesempatan berproses bareng keluarga besar Team Evangelisasi SMKN 3 Manado.
            </p>
          </div>
          
          <button 
            onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLScjK2aENHr5ihdNb-xYpDyGmDENefEszcWXc0uni4SkWH9KLA/viewform", "_blank")}
            className="group shrink-0 relative inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-stone-900 font-black text-sm rounded-xl shadow-lg hover:bg-white transition-all duration-300 w-full md:w-auto justify-center"
          >
            Isi Formulir Pendaftaran
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
