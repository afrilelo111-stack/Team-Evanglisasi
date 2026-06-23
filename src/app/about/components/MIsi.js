"use client";

import { motion } from "framer-motion";
import { Target, Compass, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

export default function VisiMisiSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 90, damping: 18 } 
    }
  };

  const misiList = [
    {
      icon: ShieldCheck,
      title: "Membangun Integritas Karakter",
      desc: "Membina dan menuntun pengurus serta anggota untuk memiliki karakter Kristiani yang jujur, takut akan Tuhan, dan menjadi teladan."
    },
    {
      icon: HeartHandshake,
      title: "Persekutuan yang Inklusif",
      desc: "Menciptakan ruang persekutuan yang hangat dan suportif bagi seluruh siswa untuk saling mendukung dan bertumbuh dalam iman."
    },
    {
      icon: Compass,
      title: "Aksi Pelayanan Nyata",
      desc: "Menyalurkan talenta dan kepedulian melalui kegiatan sosial, retret rohani, serta pelayanan kasih di dalam maupun luar sekolah."
    }
  ];

  return (
    <section 
      id="about" 
      className="bg-[#FAF6F0] py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans select-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(111, 78, 55, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(111, 78, 55, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px'
      }}
    >
      {/* Pendaran Cahaya Halus di Latar Belakang */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-[#D4AF37]/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#6F4E37]/3 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6F4E37]/5 text-[#6F4E37] text-[10px] font-black tracking-widest uppercase mb-4 border border-[#6F4E37]/10 shadow-xs">
            <Sparkles size={11} className="text-[#D4AF37] animate-pulse" />
            Fokus & Tujuan Pelayanan
          </span>
          <h2 className="text-4xl font-black text-stone-800 tracking-tight sm:text-5xl">
            Visi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F4E37] to-[#D4AF37]">& Misi.</span>
          </h2>
          <p className="text-xs font-bold text-stone-400 mt-3 max-w-md mx-auto leading-relaxed">
            Prinsip pergerakan rohani kami dalam membentuk generasi muda yang berdampak dan berintegritas.
          </p>
        </div>

        {/* BENTO GRID VISI MISI CRUISE STYLE */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-12 gap-6 items-stretch"
        >
          
          {/* KARTU UTAMA: VISI (KIRI) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="col-span-12 lg:col-span-5 p-8 md:p-10 bg-white border border-stone-200/70 rounded-[2.8rem] shadow-[0_10px_30px_rgba(111,78,55,0.02)] flex flex-col justify-between relative overflow-hidden group transition-shadow hover:shadow-[0_20px_50px_rgba(111,78,55,0.06)]"
          >
            {/* Ambient Card Glow saat di-hover */}
            <div className="absolute inset-0 bg-radial from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Watermark Ikon Besar */}
            <div className="absolute -right-10 -bottom-10 text-stone-100/70 group-hover:text-stone-200/50 group-hover:scale-105 transition-all duration-700 pointer-events-none">
              <Target size={220} strokeWidth={0.8} />
            </div>

            <div className="z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FAF6F0] to-[#6F4E37]/5 flex items-center justify-center text-[#6F4E37] mb-8 border border-[#6F4E37]/10 shadow-xs">
                <Target size={26} strokeWidth={2} />
              </div>
              <span className="text-[9px] font-black text-[#D4AF37] tracking-[0.25em] uppercase block mb-1">Arah Masa Depan</span>
              <h3 className="text-3xl font-black text-stone-800 tracking-tight">Visi Kami</h3>
              <p className="text-stone-500 text-sm md:text-base font-medium mt-5 leading-relaxed">
                Menjadi wadah pertumbuhan rohani yang inklusif, membentuk generasi muda Kristen di SMKN 3 Manado yang berintegritas tinggi, takut akan Tuhan, serta siap membawa dampak positif yang nyata bagi lingkungan sekitar.
              </p>
            </div>
            
            <div className="mt-12 text-[11px] font-black tracking-widest text-stone-300 uppercase group-hover:text-[#6F4E37] transition-colors z-10">
              CORE PURPOSE
            </div>
          </motion.div>

          {/* KARTU DAFTAR: MISI (KANAN) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="col-span-12 lg:col-span-7 bg-[#6F4E37] text-white p-8 md:p-10 rounded-[2.8rem] shadow-[0_10px_30px_rgba(111,78,55,0.05)] flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-black/10 via-transparent to-white/5 pointer-events-none" />
            
            <div className="z-10">
              <span className="text-[9px] font-black text-[#FFF5D6] tracking-[0.25em] uppercase block mb-1">Langkah Nyata</span>
              <h3 className="text-3xl font-black tracking-tight mb-10 text-[#FFF5D6]">Misi Kami</h3>

              <div className="space-y-8">
                {misiList.map((misi, index) => {
                  const MisiIcon = misi.icon;
                  return (
                    <div key={index} className="flex gap-5 items-start group/item">
                      {/* Kontainer Ikon & Nomor Urut */}
                      <div className="relative shrink-0 mt-0.5">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#D4AF37] border border-white/10 group-hover/item:scale-105 transition-transform duration-300">
                          <MisiIcon size={20} strokeWidth={2} />
                        </div>
                        <span className="absolute -top-2.5 -left-2.5 w-5 h-5 bg-[#FAF6F0] text-[#6F4E37] text-[9px] font-black rounded-full flex items-center justify-center shadow-xs border border-[#6F4E37]/10">
                          0{index + 1}
                        </span>
                      </div>
                      
                      {/* Deskripsi Teks */}
                      <div className="space-y-1">
                        <h4 className="text-base font-black text-[#FFF5D6] tracking-wide transition-colors group-hover/item:text-white">
                          {misi.title}
                        </h4>
                        <p className="text-stone-300/90 text-xs md:text-sm font-medium leading-relaxed max-w-xl">
                          {misi.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}