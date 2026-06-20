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

    const rutinAgenda = [
        {
            no: "01",
            periode: "Setiap Hari Sekolah",
            judul: "Doa Pagi & Pulang",
            deskripsi:
                "Mengawali dan mengakhiri aktivitas belajar mengajar di SMKN 3 Manado dengan menyerahkan seluruh kehidupan ke dalam tangan Tuhan.",
            icon: <Calendar size={18} className="text-[#6F4E37]" />
        },
        {
            no: "02",
            periode: "Awal Minggu",
            judul: "Kreatifitas Seni Rohani",
            deskripsi:
                "Wadah pengembangan bakat musik, banners, rebana, qwayers, hingga pembentukan karakter Worship Leader agar siap memimpin jalannya pujian.",
            icon: <Sparkles size={18} className="text-[#6F4E37]" />
        },
        {
            no: "03",
            periode: "Awal Bulan",
            judul: "Hubungan Masyarakat (Hubmas)",
            deskripsi:
                "Aksi kunjungan kasih dan persekutuan dari rumah ke rumah untuk mengenal lebih dekat keluarga dari teman seiman.",
            icon: <Users size={18} className="text-[#6F4E37]" />
        },
        {
            no: "04",
            periode: "Akhir Bulan",
            judul: "Doa & Sharing Kebersamaan",
            deskripsi:
                "Ruang hangat untuk mencurahkan isi hati, bertukar solusi atas pergumulan, dan saling menguatkan di dalam doa syafaat.",
            icon: <Compass size={18} className="text-[#6F4E37]" />
        }
    ];

    return (
        <section
            id="kegiatan"
            className="relative py-24 md:py-32 bg-[#FDFBF7] text-[#2C2520] overflow-hidden selection:bg-[#6F4E37] selection:text-white"
        >
            {/* ─── LATAR BELAKANG EDITORIAL (BUKAN GRADIENT STANDAR AI) ─── */}
            <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#6f4e37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-[#6F4E37]/5 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* ─── HEADER SECTION (SANGAT MANUSIAWI & PREMIUM) ─── */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#6F4E37]/10 pb-12 mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                            <span className="text-[11px] font-black tracking-[0.25em] text-[#B38F24] uppercase">
                                Aktivitas Gerakan
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-[#3D2A1C] tracking-tight leading-[1.1]">
                            Aktivitas &{" "}
                            <span className="font-serif italic font-normal text-[#8B6347]">
                                Pelayanan Kami
                            </span>
                        </h2>
                    </div>
                    <p className="text-stone-600 max-w-sm text-sm md:text-base leading-relaxed font-medium">
                        Rangkaian kegiatan rutin dan perayaan besar Team
                        Evangelisasi SMKN 3
                        Manado.
                    </p>
                </div>

                {/* ─── GRID KONTEN ─── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid lg:grid-cols-12 gap-16"
                >
                    {/* ─── TIMELINE AGENDA RUTIN (KIRI - 5 COLS) ─── */}
                    <div className="lg:col-span-5 space-y-10">
                        <div>
                            <h3 className="text-lg font-black text-[#3D2A1C] tracking-tight mb-2">
                                Agenda Rutin Organisasi
                            </h3>
                            <p className="text-xs text-stone-500 font-medium">
                                Langkah konisten yang kami bangun sepanjang
                                waktu sekolah.
                            </p>
                        </div>

                        <div className="relative pl-4 border-l-2 border-[#6F4E37]/10 space-y-8">
                            {rutinAgenda.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="relative group pt-1"
                                >
                                    {/* Indikator Titik Sumbu */}
                                    <div className="absolute -left-[21px] top-2.5 w-2 h-2 rounded-full bg-[#FDFBF7] border-2 border-[#6F4E37] transition-all duration-300 group-hover:bg-[#D4AF37] group-hover:scale-125" />

                                    <div className="flex justify-between items-start gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-[#B38F24] tracking-wider uppercase bg-[#6F4E37]/5 px-2 py-0.5 rounded">
                                                    {item.periode}
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-black text-[#3D2A1C] group-hover:text-[#8B6347] transition-colors duration-200">
                                                {item.judul}
                                            </h4>
                                            <p className="text-xs md:text-sm text-stone-600 leading-relaxed max-w-md pt-1">
                                                {item.deskripsi}
                                            </p>
                                        </div>
                                        <span className="text-3xl font-serif italic text-stone-200 select-none font-bold group-hover:text-[#D4AF37]/30 transition-colors duration-300">
                                            {item.no}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ─── ASYMMETRIC BENTO GRID EVENTS (KANAN - 7 COLS) ─── */}
                    <div className="lg:col-span-7 space-y-6">
                        <div>
                            <h3 className="text-lg font-black text-[#3D2A1C] tracking-tight mb-2 flex items-center gap-2">
                                <Flame
                                    size={18}
                                    className="text-[#D4AF37] fill-[#D4AF37]/20"
                                />{" "}
                                Perayaan Besar Tahunan
                            </h3>
                            <p className="text-xs text-stone-500 font-medium">
                                Momen puncak persekutuan dan kebangkitan rohani
                                bersama.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Card 1: Natal (Lebih Besar/Utuh Lebar Lewat Col-Span) */}
                            <motion.div
                                variants={itemVariants}
                                className="sm:col-span-2 group relative overflow-hidden rounded-2xl bg-stone-900 aspect-[21/10] shadow-sm border border-[#6F4E37]/10"
                            >
                                <Image
                                    src="/kegiatan/natal/natal.webp"
                                    alt="KKR Natal TE"
                                    fill
                                    sizes="(max-width: 1200px) 100vw, 50vw"
                                    className="object-cover object-center opacity-70 group-hover:scale-[1.03] transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/30 to-transparent" />

                                <div className="absolute bottom-0 inset-x-0 p-6 flex justify-between items-end">
                                    <div className="max-w-md">
                                        <span className="text-[9px] font-black tracking-widest text-[#D4AF37] uppercase border border-[#D4AF37]/40 px-2 py-0.5 rounded mb-2 inline-block backdrop-blur-xs">
                                            Annual Mega Event
                                        </span>
                                        <h4 className="text-xl font-black text-white tracking-tight">
                                            KKR Natal Sekolah
                                        </h4>
                                        <p className="text-xs text-stone-300 opacity-90 mt-1 line-clamp-1">
                                            Ibadah agung dan perayaan sakral
                                            memperingati kelahiran Juru Selamat
                                            Yesus Kristus.
                                        </p>
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300 hidden md:flex">
                                        <ArrowUpRight size={16} />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 2: Paskah */}
                            <motion.div
                                variants={itemVariants}
                                className="group relative overflow-hidden rounded-2xl bg-stone-900 aspect-[4/3] shadow-sm border border-[#6F4E37]/10"
                            >
                                <Image
                                    src="/kegiatan/paskah/paskah.webp"
                                    alt="KKR Paskah TE"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    className="object-cover object-center opacity-60 group-hover:scale-[1.03] transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent" />

                                <div className="absolute bottom-0 inset-x-0 p-6">
                                    <span className="text-[9px] font-black tracking-widest text-[#D4AF37] uppercase bg-white/10 px-2 py-0.5 rounded mb-2 inline-block backdrop-blur-xs">
                                        Sacred Celebration
                                    </span>
                                    <h4 className="text-lg font-black text-white tracking-tight">
                                        KKR Paskah
                                    </h4>
                                    <p className="text-xs text-stone-300 opacity-90 mt-1 line-clamp-2">
                                        Merenungkan penebusan di salib kemurahan
                                        serta kebangkitan Kristus.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 3: Bible Camp */}
                            <motion.div
                                variants={itemVariants}
                                className="group relative overflow-hidden rounded-2xl bg-stone-900 aspect-[4/3] shadow-sm border border-[#6F4E37]/10"
                            >
                                <Image
                                    src="/kegiatan/bc/bc.webp"
                                    alt="Bible Camp TE"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    className="object-cover object-center opacity-60 group-hover:scale-[1.03] transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent" />

                                <div className="absolute bottom-0 inset-x-0 p-6">
                                    <span className="text-[9px] font-black tracking-widest text-stone-200 uppercase bg-[#6F4E37]/60 px-2 py-0.5 rounded mb-2 inline-block backdrop-blur-xs">
                                        Discipleship Camp
                                    </span>
                                    <h4 className="text-lg font-black text-white tracking-tight">
                                        Bible Camp
                                    </h4>
                                    <p className="text-xs text-stone-300 opacity-90 mt-1 line-clamp-2">
                                        Retret alam terbuka intensif demi
                                        membangun kematangan karakter murid
                                        kristen.
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
