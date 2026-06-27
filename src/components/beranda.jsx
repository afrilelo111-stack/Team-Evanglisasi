"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Cross, Sparkles, Users, Flame } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const SAFE_FALLBACK_IMAGES = [
  { image_url: "/kegiatan/jumat.png" },
  { image_url: "/kegiatan/doa.jpeg" },
  { image_url: "/kegiatan/paskah.jpeg" },
  { image_url: "/kegiatan/jumat.png" }
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function AboutEvangelisasi() {
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [brokenImages, setBrokenImages] = useState({});

  useEffect(() => {
    let isMounted = true;

    async function fetchImages() {
      try {
        if (isMounted) setLoading(true);
        
        const { data, error } = await supabase
          .from("gallery")
          .select("image_url")
          .eq("category", "TE");
          
        if (error) throw error;

        if (isMounted) {
          const validData = (data || []).filter(item => item && typeof item.image_url === 'string');
          const finalData = validData.length > 0 ? validData : SAFE_FALLBACK_IMAGES;
          setAllImages(shuffleArray(finalData));
        }
      } catch (error) {
        console.error("Gagal mengambil data dari Supabase (Menggunakan Fallback Aman):", error.message);
        if (isMounted) setAllImages(shuffleArray(SAFE_FALLBACK_IMAGES));
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchImages();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [allImages.length]);

  const { img1, img2, img3 } = useMemo(() => {
    const len = allImages.length;
    if (len === 0) return { img1: null, img2: null, img3: null };
    
    return {
      img1: allImages[currentIndex % len],
      img2: allImages[(currentIndex + 1) % len] || allImages[0],
      img3: allImages[(currentIndex + 2) % len] || allImages[0],
    };
  }, [allImages, currentIndex]);

  const handleImageError = (src) => {
    setBrokenImages((prev) => ({ ...prev, [src]: true }));
  };

  // ─── HANDLER DOWNLOAD (KLIK KANAN) ───
  const handleContextMenu = (e, imageUrl) => {
    e.preventDefault();
    const fallback = "/kegiatan/jumat.png";
    const url = imageUrl && !brokenImages[imageUrl] ? imageUrl : fallback;
    
    const link = document.createElement("a");
    link.href = url;
    const fileName = url.split("/").pop() || `gambar-te-${Date.now()}.jpg`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ─── VARIANTS ───
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 70, damping: 20 } 
    }
  };

  const slideInVariants = (direction) => ({
    initial: { 
      opacity: 0, 
      scale: 0.97,
      x: direction === "left" ? -15 : direction === "right" ? 15 : 0,
      y: direction === "bottom" ? 15 : 0,
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" } 
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3 }
    }
  });

  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#FDFBF7] text-[#2C2520] overflow-hidden selection:bg-[#6F4E37] selection:text-white">
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#6f4e37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 px-6 md:px-12 items-center relative z-10"
      >
        {/* KOLOM KIRI: COLLAGE */}
        <motion.div variants={itemVariants} className="lg:col-span-5 relative w-full h-[500px] sm:h-[560px] flex items-center justify-center select-none">
          {loading ? (
            <div className="w-full h-full relative animate-pulse" aria-hidden="true">
              <div className="absolute top-[15%] left-0 w-[72%] h-[50%] bg-stone-200 rounded-2xl" />
              <div className="absolute top-0 right-0 w-[46%] h-[34%] bg-stone-200 rounded-2xl" />
              <div className="absolute bottom-4 right-[4%] w-[58%] h-[40%] bg-stone-200 rounded-2xl" />
            </div>
          ) : (
            <>
              {/* Slot Gambar 1 */}
              <AnimatePresence mode="popLayout">
                {img1 && (
                  <motion.div 
                    key={`slot1-${img1.image_url}`}
                    variants={slideInVariants("left")}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute top-[15%] left-0 w-[72%] h-[50%] rounded-2xl overflow-hidden shadow-xl border-2 border-white z-20 cursor-pointer select-none"
                    onContextMenu={(e) => handleContextMenu(e, img1.image_url)}
                    draggable={false}
                  >
                    <Image
                      src={brokenImages[img1.image_url] ? "/kegiatan/jumat.png" : img1.image_url} 
                      alt="Gallery Asset 1"
                      fill
                      unoptimized
                      className="object-cover object-center pointer-events-none"
                      sizes="(max-w-1024px) 50vw, 30vw"
                      onError={() => handleImageError(img1.image_url)}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Slot Gambar 2 */}
              <AnimatePresence mode="popLayout">
                {img2 && (
                  <motion.div 
                    key={`slot2-${img2.image_url}`}
                    variants={slideInVariants("right")}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute top-0 right-0 w-[46%] h-[34%] rounded-2xl overflow-hidden shadow-lg border-2 border-white z-30 cursor-pointer select-none"
                    onContextMenu={(e) => handleContextMenu(e, img2.image_url)}
                    draggable={false}
                  >
                    <Image
                      src={brokenImages[img2.image_url] ? "/kegiatan/doa.jpeg" : img2.image_url} 
                      alt="Gallery Asset 2"
                      fill
                      unoptimized
                      className="object-cover object-center pointer-events-none"
                      sizes="(max-w-1024px) 30vw, 20vw"
                      onError={() => handleImageError(img2.image_url)}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Slot Gambar 3 */}
              <AnimatePresence mode="popLayout">
                {img3 && (
                  <motion.div 
                    key={`slot3-${img3.image_url}`}
                    variants={slideInVariants("bottom")}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute bottom-4 right-[4%] w-[58%] h-[40%] rounded-2xl overflow-hidden shadow-xl border-2 border-white z-10 cursor-pointer select-none"
                    onContextMenu={(e) => handleContextMenu(e, img3.image_url)}
                    draggable={false}
                  >
                    <Image
                      src={brokenImages[img3.image_url] ? "/kegiatan/paskah.jpeg" : img3.image_url} 
                      alt="Gallery Asset 3"
                      fill
                      unoptimized
                      className="object-cover object-center pointer-events-none"
                      sizes="(max-w-1024px) 35vw, 22vw"
                      onError={() => handleImageError(img3.image_url)}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* Badge */}
          <div className="absolute bottom-8 left-[-4%] px-6 py-4 bg-white border border-[#6F4E37]/10 rounded-2xl shadow-md flex items-center gap-4 z-35">
            <div className="w-10 h-10 rounded-xl bg-[#6F4E37] flex items-center justify-center text-white shrink-0">
              <Cross size={18} className="text-[#D4AF37]" />
            </div>
            <div className="leading-tight">
              <p className="text-[10px] font-black tracking-[0.25em] text-[#B38F24] uppercase">Soli Deo Gloria</p>
              <p className="text-sm font-black text-[#3D2A1C] mt-0.5">Bertumbuh & Bersinar</p>
            </div>
          </div>        
        </motion.div>

        {/* KOLOM KANAN: TEXT CONTENT */}
        <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#B38F24] uppercase">
              Welcome to the Family
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-[#3D2A1C] tracking-tight leading-[1.15] mb-6">
            Mengenal <span className="font-serif italic font-normal text-[#8B6347] relative inline-block">Team Evangelisasi<span className="absolute bottom-1 left-0 w-full h-[4px] bg-[#D4AF37]/20 rounded" /></span>
          </h2>

          <div className="space-y-6 text-stone-600 text-sm md:text-base leading-relaxed font-medium mb-10">
            <p>
              <strong className="text-[#3D2A1C]">Team Evangelisasi (TE)</strong> adalah komunitas dan wadah persekutuan resmi bagi siswa-siswi Kristen di SMKN 3 Manado. Di sini, kami bukan cuma sekadar berorganisasi, tapi membangun sebuah <span className="text-[#8B6347] font-bold bg-[#8B6347]/5 px-1.5 py-0.5 rounded">circle pertemanan yang sehat, suportif, dan penuh rasa kekeluargaan</span>.
            </p>
            <p>
              Lewat berbagai kegiatan seru—mulai dari ibadah, pengembangan bakat (Musik, Banners, Rebana), tim multimedia, hingga aksi sosial nyata—TE hadir sebagai tempat terbaik buat kamu yang ingin mengasah talenta sekaligus memperdalam iman rohani selama masa sekolah.
            </p>

            <div className="bg-[#6F4E37]/5 border-l-4 border-[#D4AF37] p-5 rounded-r-2xl flex items-start gap-4 mt-6">
              <Sparkles size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-[#6F4E37] font-semibold font-serif italic leading-relaxed">
                &ldquo;Gak perlu nunggu sempurna buat melayani. Di sini kita belajar bareng dari nol, seru-seruan bareng, dan sama-sama jadi dampak positif di sekolah!&rdquo;
              </p>
            </div>
          </div>

          {/* HIGHLIGHTS */}
          <div className="grid grid-cols-2 gap-6 border-t border-[#6F4E37]/10 pt-8">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#6F4E37]/5 flex items-center justify-center text-[#6F4E37]">
                <Users size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#3D2A1C]">Positive Environment</span>
                <span className="text-xs text-stone-400">Kekeluargaan yang erat</span>
              </div>
            </div>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#6F4E37]/5 flex items-center justify-center text-[#6F4E37]">
                <Flame size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#3D2A1C]">Skill & Talent Growth</span>
                <span className="text-xs text-stone-400">Musik, Seni & Multimedia</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}