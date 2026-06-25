"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    Calendar,
    Sparkles,
    Users,
    Compass,
    ArrowUpRight,
    Flame,
    ImageIcon
} from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function Kegiatan() {
    const [images, setImages] = useState({
        natal: [],
        paskah: [],
        bc: []
    });
    const [loading, setLoading] = useState(true);

    const [currentIndex, setCurrentIndex] = useState({
        natal: 0,
        paskah: 0,
        bc: 0
    });

    useEffect(() => {
        async function fetchImages() {
            try {
                setLoading(true);
                
                const { data, error } = await supabase
                    .from("gallery") 
                    .select("image_url, category")
                    .in("category", ["Natal", "Paskah", "BC"]);

                if (error) throw error;

                const separatedImages = {
                    natal: data.filter(img => img.category === "Natal"),
                    paskah: data.filter(img => img.category === "Paskah"),
                    bc: data.filter(img => img.category === "BC")
                };

                setImages(separatedImages);
            } catch (error) {
                console.error("Gagal mengambil data gambar dari database:", error.message);
                
                const dummyFallbacks = {
                    natal: [{ image_url: "/kegiatan/natal/natal.webp" }],
                    paskah: [{ image_url: "/kegiatan/paskah/paskah.webp" }],
                    bc: [{ image_url: "/kegiatan/bc/bc.webp" }]
                };
                setImages(dummyFallbacks);
            } finally {
                setLoading(false);
            }
        }

        fetchImages();
    }, []);

    useEffect(() => {
        if (loading) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => ({
                natal: images.natal.length > 0 ? (prev.natal + 1) % images.natal.length : 0,
                paskah: images.paskah.length > 0 ? (prev.paskah + 1) % images.paskah.length : 0,
                bc: images.bc.length > 0 ? (prev.bc + 1) % images.bc.length : 0,
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, [images, loading]);

    const renderImageSlot = (categoryKey, fallbackAlt) => {
        if (loading) {
            return (
                <div className="w-full h-full flex items-center justify-center bg-stone-900 text-stone-700 animate-pulse">
                    <ImageIcon size={28} className="animate-bounce" />
                </div>
            );
        }

        const categoryImages = images[categoryKey] || [];
        
        if (categoryImages.length === 0) {
            return (
                <Image
                    src={`/kegiatan/${categoryKey}.webp`}
                    alt={fallbackAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 85vw, 50vw"
                    className="object-cover object-center opacity-65 transition-transform duration-700 group-hover:scale-105"
                />
            );
        }

        return (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <AnimatePresence mode="popLayout">
                    {categoryImages.map((img, index) => {
                        const isActive = index === currentIndex[categoryKey];
                        if (!isActive) return null;

                        return (
                            <motion.div
                                key={img.image_url + index}
                                className="absolute inset-0 w-full h-full"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 0.65, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                            >
                                <Image
                                    src={img.image_url}
                                    alt={fallbackAlt}
                                    fill
                                    unoptimized
                                    sizes="(max-width: 768px) 85vw, 50vw"
                                    className="object-cover object-center transition-transform duration-700"
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        );
    };

    const renderIndicators = (categoryKey) => {
        const total = images[categoryKey]?.length || 0;
        if (total <= 1) return null;

        return (
            <div className="flex gap-1 mt-2.5">
                {images[categoryKey].map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-500 ${
                            index === currentIndex[categoryKey]
                                ? "w-4 bg-[#D4AF37]"
                                : "w-1 bg-white/30"
                        }`}
                    />
                ))}
            </div>
        );
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.02 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 16 }
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
            deskripsi: "Persekutuan dari rumah ke rumah untuk kenal dekat dengan keluarga teman seimanmu.",
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
            className="relative py-12 md:py-32 bg-[#FDFBF7] text-[#2C2520] overflow-hidden selection:bg-[#6F4E37] selection:text-white"
        >
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#6f4e37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-[#6F4E37]/5 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
                
                {/* Header: Dibuat lebih rapat di mobile */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#6F4E37]/10 pb-6 md:pb-12 mb-8 md:mb-16 gap-3">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 mb-1.5 bg-[#6F4E37]/5 px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                            <span className="text-[9px] font-black tracking-[0.2em] text-[#B38F24] uppercase">
                                WHATS ON TE?
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-6xl font-black text-[#3D2A1C] tracking-tight leading-[1.2] md:leading-[1.15]">
                            Aktivitas &{" "}
                            <span className="font-serif italic font-normal text-[#8B6347]">
                                Pelayanan Kami
                            </span>
                        </h2>
                    </div>
                    <p className="text-stone-600 max-w-sm text-xs md:text-base leading-relaxed font-medium opacity-90">
                        Rangkaian kegiatan rutin mingguan dan perayaan besar seru di Team Evangelisasi SMKN 3 Manado.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="grid lg:grid-cols-12 gap-10 lg:gap-16"
                >
                    {/* Agenda Rutin: List card dioptimalkan touch target-nya */}
                    <div className="lg:col-span-5 space-y-5">
                        <div>
                            <h3 className="text-base md:text-lg font-black text-[#3D2A1C] tracking-tight mb-0.5">
                                Agenda Rutin Komunitas
                            </h3>
                            <p className="text-xs text-stone-500 font-medium">
                                Langkah konsisten yang kita bangun bareng sepanjang tahun sekolah.
                            </p>
                        </div>

                        <div className="relative pl-3.5 border-l-2 md:border-l-[3px] border-[#6F4E37]/10 space-y-3.5 pt-1">
                            {rutinAgenda.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="relative p-4 rounded-xl bg-white border border-stone-100 shadow-[0_4px_16px_rgba(111,78,55,0.01)] active:scale-[0.99] transition-all duration-200 group"
                                >
                                    <div className="absolute -left-[22px] md:-left-[23px] top-[25px] w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white border-[2.5px] md:border-[3px] border-[#6F4E37] group-hover:border-[#D4AF37]" />

                                    <div className="flex justify-between items-start gap-3">
                                        <div className="flex gap-3">
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.accent}`}>
                                                {item.icon}
                                            </div>
                                            <div className="space-y-0.5">
                                                <span className="text-[9px] font-bold text-[#B38F24] tracking-wide uppercase block">
                                                    {item.periode}
                                                </span>
                                                <h4 className="text-sm md:text-base font-black text-[#3D2A1C] transition-colors duration-200">
                                                    {item.judul}
                                                </h4>
                                                <p className="text-xs text-stone-600 leading-relaxed max-w-md pt-0.5 opacity-90">
                                                    {item.deskripsi}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-lg md:text-xl font-serif italic text-stone-200 select-none font-bold">
                                            {item.no}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Perayaan Besar Tahunan: Horizontal Scroll di Mobile dipercantik */}
                    <div className="lg:col-span-7 space-y-4 overflow-hidden relative">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-base md:text-lg font-black text-[#3D2A1C] tracking-tight mb-0.5 flex items-center gap-1.5">
                                    <Flame size={16} className="text-[#D4AF37] fill-[#D4AF37]/20" /> 
                                    Perayaan Besar Tahunan
                                </h3>
                                <p className="text-[11px] text-[#B38F24] font-semibold block md:hidden animate-pulse">
                                    Geser lanskap untuk melihat kartu lainnya ➔
                                </p>
                            </div>
                        </div>

                        {/* Slider Mobile (Menggunakan snap-x, -mx-4 & px-4 agar swipe bisa full-screen edge-to-edge) */}
                        <div className="-mx-4 px-4 md:mx-0 md:px-0 flex md:grid md:grid-cols-2 gap-4 md:gap-5 overflow-x-auto md:overflow-x-visible scrollbar-none snap-x snap-mandatory pb-5">
                            
                            {/* Card 1: Natal */}
                            <motion.div
                                variants={itemVariants}
                                className="w-[85vw] sm:w-[50vw] md:w-auto shrink-0 snap-align-center md:col-span-2 group relative overflow-hidden rounded-2xl bg-stone-950 aspect-[1.1/1] sm:aspect-[21/10] shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-[#6F4E37]/10"
                            >
                                {renderImageSlot("natal", "KKR Natal TE")}
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none z-10" />
                                <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 flex justify-between items-end z-20">
                                    <div className="max-w-md">
                                        <span className="text-[8px] font-black tracking-widest text-[#D4AF37] uppercase border border-[#D4AF37]/40 px-1.5 py-0.5 rounded mb-1.5 inline-block">
                                            Annual Mega Event
                                        </span>
                                        <h4 className="text-base md:text-xl font-black text-white tracking-tight">
                                            KKR Natal Sekolah
                                        </h4>
                                        <p className="text-xs md:text-[11px] text-stone-300 opacity-90 mt-0.5 line-clamp-1">
                                            Ibadah agung kreatif memperingati kelahiran Tuhan Yesus Kristus.
                                        </p>
                                        {renderIndicators("natal")}
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hidden md:flex shrink-0 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 2: Paskah */}
                            <motion.div
                                variants={itemVariants}
                                className="w-[85vw] sm:w-[50vw] md:w-auto shrink-0 snap-align-center group relative overflow-hidden rounded-2xl bg-stone-950 aspect-[1.1/1] sm:aspect-[4/3] shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-white/5"
                            >
                                {renderImageSlot("paskah", "KKR Paskah TE")}
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent pointer-events-none z-10" />
                                <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 z-20">
                                    <span className="text-[8px] font-black tracking-widest text-[#D4AF37] uppercase bg-white/10 px-1.5 py-0.5 rounded mb-1.5 inline-block">
                                        Sacred Celebration
                                    </span>
                                    <h4 className="text-sm md:text-lg font-black text-white tracking-tight">
                                        KKR Paskah
                                    </h4>
                                    <p className="text-xs md:text-[11px] text-stone-300 opacity-90 mt-0.5 line-clamp-2">
                                        Merenungkan penebusan di salib kemurahan serta kemenangan kebangkitan-Nya.
                                    </p>
                                    {renderIndicators("paskah")}
                                </div>
                            </motion.div>

                            {/* Card 3: Bible Camp */}
                            <motion.div
                                variants={itemVariants}
                                className="w-[85vw] sm:w-[50vw] md:w-auto shrink-0 snap-align-center group relative overflow-hidden rounded-2xl bg-stone-950 aspect-[1.1/1] sm:aspect-[4/3] shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-stone-100/5"
                            >
                                {renderImageSlot("bc", "Bible Camp TE")}
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent pointer-events-none z-10" />
                                <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 z-20">
                                    <span className="text-[8px] font-black tracking-widest text-stone-200 uppercase bg-[#6F4E37]/80 px-1.5 py-0.5 rounded mb-1.5 inline-block">
                                        Discipleship Camp
                                    </span>
                                    <h4 className="text-sm md:text-lg font-black text-white tracking-tight">
                                        Bible Camp
                                    </h4>
                                    <p className="text-xs md:text-[11px] text-stone-300 opacity-90 mt-0.5 line-clamp-2">
                                        Retret seru di alam terbuka demi membangun kedekatan dan iman karakter Kristen.
                                    </p>
                                    {renderIndicators("bc")}
                                </div>
                            </motion.div>
                            
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}