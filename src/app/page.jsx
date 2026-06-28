"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/beranda";
import Kegiatan from "@/components/kegiatan";
import WhyJoin from "@/components/WhyJoin";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Beranda");
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  // Auto-Hide Mobile Navbar
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY && currentScrollY > 150) {
            setShowMobileNav(false);
          } else if (currentScrollY < lastScrollY) {
            setShowMobileNav(true);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Precision Intersection Observer
  useEffect(() => {
    if (isLoading) return;

    const sections = ["beranda", "about", "kegiatan", "whyjoin"];
    
    const tabMapping = {
      beranda: "Beranda",
      about: "Tentang",
      kegiatan: "Kegiatan",
      whyjoin: "Mengapa Bergabung",
    };

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -45% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tabName = tabMapping[entry.target.id];
          if (tabName) setActiveTab(tabName);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [isLoading]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const mainWrapperVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1
      }
    }
  };

  // Membagi kata menjadi array huruf untuk teks loading kinetik
  const titleWords = "TEAM EVANGELISASI".split("");
  const containerVariants = {
    animate: { transition: { staggerChildren: 0.03 } }
  };
  const letterVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050302] select-none overflow-hidden font-sans antialiased"
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 } 
            }}
          >
            {/* Tirai Arsitektural Gelap Membelah Kiri & Kanan */}
            <motion.div 
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
              className="absolute inset-y-0 left-0 w-1/2 bg-[#050302] border-r border-stone-900/30"
            />
            <motion.div 
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
              className="absolute inset-y-0 right-0 w-1/2 bg-[#050302] border-l border-stone-900/30"
            />

            {/* KONTEN UTAMA LOADING SCREEN */}
            <div className="relative z-10 flex flex-col items-center">
              
              {/* Frame Logo Premium dengan Efek Menyala/Neon Core */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8 p-5 border border-stone-800/80 bg-stone-950/60 backdrop-blur-md shadow-[0_0_50px_rgba(214,175,55,0.15)] rounded-2xl relative"
              >
                {/* Layer Pendaran Emas Lembut di Belakang Logo */}
                <div className="absolute inset-0 bg-[#D4AF37] blur-[35px] rounded-full opacity-20 animate-pulse duration-[4000ms]" />

                {/* Aksen Dekoratif Pojok */}
                <span className="absolute -top-1 -left-1 text-[8px] text-[#D4AF37]/50 font-mono">+</span>
                <span className="absolute -top-1 -right-1 text-[8px] text-[#D4AF37]/50 font-mono">+</span>
                <span className="absolute -bottom-2 -left-1 text-[8px] text-[#D4AF37]/50 font-mono">+</span>
                <span className="absolute -bottom-2 -right-1 text-[8px] text-[#D4AF37]/50 font-mono">+</span>
                
                <Image 
                  src="/logo/logo1.png" 
                  alt="Logo TE" 
                  width={65} 
                  height={65} 
                  className="object-contain relative z-10 filter drop-shadow-[0_0_15px_rgba(214,175,55,0.65)] drop-shadow-[0_0_30px_rgba(214,175,55,0.3)]"
                  priority 
                />
              </motion.div>

              {/* Teks Loading Bergradasi seperti di Gambar */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="flex justify-center items-center overflow-hidden mb-3"
              >
                {titleWords.map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className={`font-sans tracking-tight text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#FFF3D1] to-[#D4AF37] drop-shadow-[0_2px_12px_rgba(214,175,55,0.25)] ${letter === " " ? "mx-1.5" : ""}`}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>

              {/* Sub-judul Instansi */}
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, letterSpacing: "0.25em" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="text-[9px] font-mono font-bold text-[#D4AF37] uppercase flex items-center gap-3"
              >
                <span className="w-1.5 h-[1px] bg-[#D4AF37]/40" />
                SMKN 3 MANADO
                <span className="w-1.5 h-[1px] bg-[#D4AF37]/40" />
              </motion.div>

              {/* Garis Progress */}
              <div className="w-40 h-[1px] bg-stone-800 mt-10 relative overflow-hidden">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.6, 
                    ease: [0.4, 0, 0.2, 1] 
                  }}
                  className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                />
              </div>

              {/* Footer Loading */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
                <span className="text-[8px] font-mono text-stone-500 tracking-[0.25em] uppercase block">
                  SOLI DEO GLORIA
                </span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MAIN CONTENT REVEAL FROM BELOW ─── */}
      {!isLoading && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={mainWrapperVariants}
          className="will-change-transform"
        >
          <main className="relative min-h-screen bg-[#FFFDFB] text-stone-800 antialiased selection:bg-[#D4AF37]/20 selection:text-[#6F4E37] overflow-x-hidden scroll-smooth">
            
            <Navbar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              showMobileNav={showMobileNav} 
            />

            {/* SECTION 1: HERO */}
            <div id="beranda" className="w-full scroll-mt-0">
              <Hero />
            </div>

            <div className="relative z-10">
              
              {/* SECTION 2: ABOUT */}
              <motion.div 
                id="about" 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-12%" }}
                variants={fadeInUp}
                className="scroll-mt-20 bg-[#FFFDFB]"
              >
                <About />
              </motion.div>

              {/* SECTION 3: KEGIATAN */}
              <motion.div 
                id="kegiatan" 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-12%" }}
                variants={fadeInUp}
                className="scroll-mt-20"
              >
                <Kegiatan />
              </motion.div>

              {/* SECTION 4: WHY JOIN */}
              <motion.div 
                id="whyjoin" 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-12%" }}
                variants={fadeInUp}
                className="scroll-mt-20 bg-[#FAF8F5]"
              >
                <WhyJoin />
              </motion.div>

            </div>

            <Footer />
          </main>
        </motion.div>
      )}
    </>
  );
}