"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    Calendar,
    Sparkles,
    Users,
    Compass,
    ArrowUpRight,
    Flame
} from "lucide-react";

export default function Kegiatan() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.02 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 90, damping: 14 }
        }
    };

    const rutinAgenda = [
        {
            no: "01",
            periode: "Setiap Hari Sekolah",
            judul: "Doa Pagi & Pulang",
            deskripsi: "Mengawali dan mengakhiri kelas di SMKN 3 Manado dengan menyerahkan seluruh aktivitas ke dalam tangan Tuhan.",
            icon: <Calendar size={16} />,
            accent: "bg-amber-500/10 text-amber-700"
        },
        {
            no: "02",
            periode: "Awal Minggu",
            judul: "Kreatifitas Seni Rohani",
            deskripsi: "Wadah kembangkan bakat musik, banners, multimedia, hingga asah mental kamu jadi Worship Leader hebat.",
            icon: <Sparkles size={16} />,
            accent: "bg-orange-500/10 text-orange-700"
        },
        {
            no: "03",
            periode: "Awal Bulan",
            judul: "Kunjungan Kasih (Hubmas)",
            deskripsi: "Persekutuan dan main bareng dari rumah ke rumah untuk kenal dekat dengan keluarga teman seimanmu.",
            icon: <Users size={16} />,
            accent: "bg-amber-600/10 text-amber-800"
        },
        {
            no: "04",
            periode: "Akhir Bulan",
            judul: "Doa & Sharing Santai",
            deskripsi: "Ruang hangat buat curhat bebas, lepas penat, cari solusi pergumulan, dan saling menguatkan.",
            icon: <Compass size={16} />,
            accent: "bg-yellow-600/10 text-yellow-800"
        }
    ];

    return (
        <section
            id="/kegiatan"
            className="relative py-16 md:py-32 bg-[#FDFBF7] text-[#2C2520] overflow-hidden selection:bg-[#6F4E37] selection:text-white"
        >
            {/* ─── PREMIUM BACKGROUND TEXTURE ─── */}
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#6f4e37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-[#6F4E37]/5 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
                
                {/* ─── HEADER SECTION ─── */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#6F4E37]/10 pb-8 md:pb-12 mb-12 md:mb-16 gap-4">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 mb-2 bg-[#6F4E37]/5 px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                            <span className="text-[10px] font-black tracking-[0.2em] text-[#B38F24] uppercase">
                                WHATS ON TE?
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-black text-[#3D2A1C] tracking-tight leading-[1.15]">
                            Aktivitas &{" "}
                            <span className="font-serif italic font-normal text-[#8B6347]">
                                Pelayanan Kami
                            </span>
                        </h2>
                    </div>
                    <p className="text-stone-600 max-w-sm text-xs md:text-base leading-relaxed font-medium">
                        Rangkaian kegiatan rutin mingguan dan perayaan besar seru di Team Evangelisasi SMKN 3 Manado.
                    </p>
                </div>

                {/* ─── MAIN RESPONSIVE INTERFACE ─── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid lg:grid-cols-12 gap-12 lg:gap-16"
                >
                    {/* ─── INTERACTIVE TIMELINE CARDS (LEFT) ─── */}
                    <div className="lg:col-span-5 space-y-6">
                        <div>
                            <h3 className="text-base md:text-lg font-black text-[#3D2A1C] tracking-tight mb-1">
                                Agenda Rutin Komunitas
                            </h3>
                            <p className="text-[11px] md:text-xs text-stone-500 font-medium">
                                Langkah konsisten yang kita bangun bareng sepanjang tahun sekolah.
                            </p>
                        </div>

                        {/* Modern Card List Layer */}
                        <div className="relative pl-4 border-l-[3px] border-[#6F4E37]/10 space-y-4 pt-1">
                            {rutinAgenda.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="relative p-4 rounded-2xl bg-white border border-stone-100 shadow-[0_4px_20px_rgba(111,78,55,0.01)] active:scale-[0.98] transition-transform duration-200 group"
                                >
                                    {/* Glowing Bullet on Hover/Active */}
                                    <div className="absolute -left-[23px] top-[26px] w-2.5 h-2.5 rounded-full bg-white border-[3px] border-[#6F4E37] group-hover:border-[#D4AF37] transition-colors duration-300" />

                                    <div className="flex justify-between items-start gap-3">
                                        <div className="flex gap-3">
                                            {/* Beautiful Minimalist Icon Container */}
                                            <div className={`w-9 h-9 rounded-xl ${item.accent} flex items-center justify-center shrink-0`}>
                                                {item.icon}
                                            </div>
                                            <div className="space-y-0.5">
                                                <span className="text-[9px] font-bold text-[#B38F24] tracking-wide uppercase">
                                                    {item.periode}
                                                </span>
                                                <h4 className="text-base font-black text-[#3D2A1C] group-hover:text-[#8B6347] transition-colors duration-200">
                                                    {item.judul}
                                                </h4>
                                                <p className="text-xs text-stone-600 leading-relaxed max-w-md pt-0.5">
                                                    {item.deskripsi}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-xl font-serif italic text-stone-200 select-none font-bold">
                                            {item.no}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ─── SMOOTH HORIZONTAL SWIPE GADGET (RIGHT) ─── */}
                    <div className="lg:col-span-7 space-y-4 overflow-hidden relative">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-base md:text-lg font-black text-[#3D2A1C] tracking-tight mb-1 flex items-center gap-1.5">
                                    <Flame size={16} className="text-[#D4AF37] fill-[#D4AF37]/20" /> 
                                    Perayaan Besar Tahunan
                                </h3>
                                <p className="text-[11px] text-[#B38F24] font-medium block md:hidden animate-pulse">
                                    Geser ke samping untuk lihat keseruan ➔
                                </p>
                            </div>
                        </div>

                        {/* CAROUSEL DENGAN SNAP EFFECT */}
                        <div className="-mx-5 px-5 md:mx-0 md:px-0 flex md:grid md:grid-cols-2 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible scrollbar-none snap-x snap-mandatory pb-4">
                            
                            {/* Card 1: Natal */}
                            <motion.div
                                variants={itemVariants}
                                className="w-[82vw] sm:w-[55vw] md:w-auto shrink-0 snap-align-start md:col-span-2 group relative overflow-hidden rounded-3xl bg-stone-900 aspect-[11/10] sm:aspect-[21/10] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#6F4E37]/10"
                            >
                                <Image
                                    src="/kegiatan/natal/natal.webp"
                                    alt="KKR Natal TE"
                                    fill
                                    sizes="(max-width: 768px) 82vw, 50vw"
                                    className="object-cover object-center opacity-70 transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/30 to-transparent" />

                                <div className="absolute bottom-0 inset-x-0 p-5 flex justify-between items-end">
                                    <div className="max-w-md">
                                        <span className="text-[8px] font-black tracking-widest text-[#D4AF37] uppercase border border-[#D4AF37]/40 px-2 py-0.5 rounded mb-1.5 inline-block">
                                            Annual Mega Event
                                        </span>
                                        <h4 className="text-lg md:text-xl font-black text-white tracking-tight">
                                            KKR Natal Sekolah
                                        </h4>
                                        <p className="text-[11px] text-stone-300 opacity-90 mt-0.5 line-clamp-1">
                                            Ibadah agung kreatif memperingati kelahiran Tuhan Yesus Kristus.
                                        </p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hidden md:flex shrink-0">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 2: Paskah */}
                            <motion.div
                                variants={itemVariants}
                                className="w-[82vw] sm:w-[55vw] md:w-auto shrink-0 snap-align-start group relative overflow-hidden rounded-3xl bg-stone-900 aspect-[11/10] sm:aspect-[4/3] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#6F4E37]/10"
                            >
                                <Image
                                    src="/kegiatan/paskah/paskah.webp"
                                    alt="KKR Paskah TE"
                                    fill
                                    sizes="(max-width: 768px) 82vw, 25vw"
                                    className="object-cover object-center opacity-60 transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent" />

                                <div className="absolute bottom-0 inset-x-0 p-5">
                                    <span className="text-[8px] font-black tracking-widest text-[#D4AF37] uppercase bg-white/10 px-2 py-0.5 rounded mb-1.5 inline-block">
                                        Sacred Celebration
                                    </span>
                                    <h4 className="text-base md:text-lg font-black text-white tracking-tight">
                                        KKR Paskah
                                    </h4>
                                    <p className="text-[11px] text-stone-300 opacity-90 mt-0.5 line-clamp-2">
                                        Merenungkan penebusan di salib kemurahan serta kemenangan kebangkitan-Nya.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 3: Bible Camp */}
                            <motion.div
                                variants={itemVariants}
                                className="w-[82vw] sm:w-[55vw] md:w-auto shrink-0 snap-align-start group relative overflow-hidden rounded-3xl bg-stone-900 aspect-[11/10] sm:aspect-[4/3] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#6F4E37]/10"
                            >
                                <Image
                                    src="/kegiatan/bc/bc.webp"
                                    alt="Bible Camp TE"
                                    fill
                                    sizes="(max-width: 768px) 82vw, 25vw"
                                    className="object-cover object-center opacity-60 transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent" />

                                <div className="absolute bottom-0 inset-x-0 p-5">
                                    <span className="text-[8px] font-black tracking-widest text-stone-200 uppercase bg-[#6F4E37]/60 px-2 py-0.5 rounded mb-1.5 inline-block">
                                        Discipleship Camp
                                    </span>
                                    <h4 className="text-base md:text-lg font-black text-white tracking-tight">
                                        Bible Camp
                                    </h4>
                                    <p className="text-[11px] text-stone-300 opacity-90 mt-0.5 line-clamp-2">
                                        Retret seru di alam terbuka demi membangun kedekatan dan iman karakter Kristen.
                                    </p>
                                </div>
                            </motion.div>
                            
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}