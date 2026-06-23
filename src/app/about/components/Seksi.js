"use client";

import { motion } from "framer-motion";
import { 
  Palette, 
  Wrench, 
  HeartHandshake, 
  Megaphone, 
  Flame, 
  Camera, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function SeksiPelayananSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 130, damping: 20 } 
    }
  };

  const seksiList = [
    {
      icon: Flame,
      title: "Seksi Ibadah",
      tagline: "Jantung persekutuan kita",
      tasks: [
        "Menyusun tema & tata ibadah persekutuan",
        "Memilih lagu pujian & penyembahan",
        "Mengoordinasikan WL, Singer, & Pemusik"
      ],
      theme: "hover:border-stone-400 hover:shadow-amber-500/[0.04]",
      iconColor: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      icon: HeartHandshake,
      title: "Seksi Doa & Sharing",
      tagline: "Menjaga kehangatan iman",
      tasks: [
        "Menjadi menara doa bagi seluruh tim",
        "Membuat ruang curhat & diskusi hangat",
        "Saling mendukung pertumbuhan rohani"
      ],
      theme: "hover:border-stone-400 hover:shadow-rose-500/[0.04]",
      iconColor: "text-rose-600 bg-rose-50 border-rose-100"
    },
    {
      icon: Palette,
      title: "Seksi Kreativitas",
      tagline: "Pusat ide & dekorasi",
      tasks: [
        "Merancang dekorasi panggung & ruang",
        "Membuat konsep acara seru & baksos",
        "Mengembangkan ide merchandise kreatif"
      ],
      theme: "hover:border-stone-400 hover:shadow-purple-500/[0.04]",
      iconColor: "text-purple-600 bg-purple-50 border-purple-100"
    },
    {
      icon: Camera,
      title: "Seksi Dokumentasi",
      tagline: "Wajah digital pelayanan",
      tasks: [
        "Mengabadikan momen lewat foto & video",
        "Mengelola media sosial komunitas resmi",
        "Membuat desain konten rohani kreatif"
      ],
      theme: "hover:border-stone-400 hover:shadow-emerald-500/[0.04]",
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      icon: Megaphone,
      title: "Seksi Hubmas",
      tagline: "Jembatan relasi tim",
      tasks: [
        "Menghubungkan tim dengan sekolah & guru",
        "Menyebarkan info & undangan ibadah",
        "Merangkul siswa Kristen untuk bergabung"
      ],
      theme: "hover:border-stone-400 hover:shadow-blue-500/[0.04]",
      iconColor: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      icon: Wrench,
      title: "Seksi Perlengkapan",
      tagline: "Tulang punggung teknis",
      tasks: [
        "Menyiapkan ruang ibadah & tempat duduk",
        "Mengatur sound system, kabel, & musik",
        "Menyediakan logistik fisik setiap acara"
      ],
      theme: "hover:border-stone-400 hover:shadow-stone-500/[0.04]",
      iconColor: "text-stone-700 bg-stone-100 border-stone-200"
    }
  ];

  return (
    <section 
      id="sections" 
      className="bg-[#FAF6F0] py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans select-none text-stone-800"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(111, 78, 55, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(111, 78, 55, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px'
      }}
    >
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full border-x border-stone-200/40 pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER UTAMA */}
        <div className="text-left md:text-center max-w-2xl mx-auto mb-14 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6F4E37]/5 text-[#6F4E37] text-[10px] font-black tracking-widest uppercase mb-3 md:mb-4 border border-[#6F4E37]/10">
            <Sparkles size={11} className="text-[#D4AF37]" />
            STRUKTUR ORGANISASI
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-900 leading-tight">
            Seksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F4E37] to-[#D4AF37] drop-shadow-xs">Team Evangelisasi.</span>
          </h2>
          <p className="text-xs font-bold text-stone-400 mt-2 md:mt-4 max-w-sm md:mx-auto leading-relaxed">
            Kenali peran dan tanggung jawab dari setiap divisi kerja pelayanan untuk mendukung pekerjaan Tuhan.
          </p>
        </div>

        {/* SIMETRIS GRID (3 Kolom Rata) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch"
        >
          {seksiList.map((seksi, index) => {
            const IconComponent = seksi.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative bg-white border border-stone-200/70 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${seksi.theme}`}
              >
                <div>
                  {/* Baris Atas: Ikon & Judul */}
                  <div className="flex items-center gap-3.5 mb-5 md:mb-6">
                    <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 shrink-0 shadow-xs ${seksi.iconColor}`}>
                      <IconComponent size={20} strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-black text-stone-900 tracking-tight group-hover:text-[#6F4E37] transition-colors">
                        {seksi.title}
                      </h3>
                      <p className="text-[10px] md:text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mt-0.5">
                        {seksi.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Baris Tengah: Tugas Utama */}
                  <ul className="space-y-2.5 my-1 border-t border-stone-100 pt-4">
                    {seksi.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-stone-500 text-xs md:text-[13px] font-medium leading-normal">
                        <CheckCircle2 size={13} className="text-stone-300 shrink-0 mt-0.5 group-hover:text-[#6F4E37] transition-colors" strokeWidth={2.5} />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Baris Bawah: Info Footer Kartu */}
                <div className="mt-6 md:mt-8 pt-3 border-t border-stone-100 flex items-center justify-between text-[9px] font-black tracking-widest text-stone-300 group-hover:text-stone-400 transition-colors uppercase">
                  <span>Sektor 0{index + 1}</span>
                  <span className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#6F4E37] tracking-wider font-extrabold">
                    GABUNG &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}