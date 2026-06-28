"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/beranda";
import Kegiatan from "@/components/kegiatan";
import WhyJoin from "@/components/WhyJoin";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Beranda");
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [particles, setParticles] = useState([]);
  const [mounted, setMounted] = useState(false);

  // ─── GENERATE PARTICLES ONLY ON CLIENT ───
  useEffect(() => {
    setMounted(true);
    const newParticles = Array.from({ length: 20 }).map(() => {
      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 8;
      const delay = Math.random() * 5;
      const driftX = Math.random() * 30 - 15;
      const opacity = Math.random() * 0.3 + 0.1;
      const blur = size > 2.5 ? 1.2 : 0.3;
      return { size, left, duration, delay, driftX, opacity, blur };
    });
    setParticles(newParticles);
  }, []);

  // ─── LOADING SCREEN ───
  useEffect(() => {
    let startTime = Date.now();
    const duration = 3000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setLoadingProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 500);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // ─── AUTO-HIDE MOBILE NAV ───
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

  // ─── INTERSECTION OBSERVER ───
  useEffect(() => {
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
  }, []);

  // ─── ANIMASI ───
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // ─── LOADING SCREEN ───
  if (isLoading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-[#050302] flex items-center justify-center overflow-hidden"
        >
          {/* ─── LAPISAN TEKSTUR ─── */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          {/* ─── GLOW SINEMATIK ─── */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/8 blur-[150px] rounded-full pointer-events-none"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#D4AF37]/4 blur-[120px] rounded-full pointer-events-none"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2.5, delay: 0.8, ease: "easeOut" }}
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#D4AF37]/4 blur-[100px] rounded-full pointer-events-none"
          />

          {/* ─── LINGKARAN KONSENTRIS ─── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border-2 border-[#D4AF37]/4 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-[1px] border-[#D4AF37]/6 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-[1px] border-[#D4AF37]/8 rounded-full pointer-events-none" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border-[1px] border-[#D4AF37]/5 rounded-full pointer-events-none border-dashed"
          />

          {/* ─── PARTIKEL EMAS (HANYA RENDER SETELAH MOUNT) ─── */}
          {mounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-b from-[#FFF5D6] via-[#D4AF37] to-transparent"
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    left: `${p.left}%`,
                    bottom: "5%",
                    filter: `blur(${p.blur}px)`,
                    opacity: p.opacity,
                  }}
                  animate={{
                    y: ["0vh", "-120vh"],
                    x: [`${p.driftX}px`, `${p.driftX * 1.5}px`],
                    opacity: [0, 0.6, 0.3, 0],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: p.delay,
                  }}
                />
              ))}
            </div>
          )}

          {/* ─── DEKORASI SUDUT ─── */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-10 left-10 w-20 h-20 border-t-4 border-l-4 border-[#D4AF37]/25"
          />
          <motion.div
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute top-10 right-10 w-20 h-20 border-t-4 border-r-4 border-[#D4AF37]/15"
          />
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute bottom-10 left-10 w-20 h-20 border-b-4 border-l-4 border-[#D4AF37]/15"
          />
          <motion.div
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute bottom-10 right-10 w-20 h-20 border-b-4 border-r-4 border-[#D4AF37]/25"
          />

          {/* ─── KONTEN UTAMA ─── */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm"
          >
            {/* Polaroid Frame */}
            <motion.div
              animate={{
                rotate: [0, 2, -1.5, 1.5, 0],
                y: [0, -3, 0, -2, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative mb-8 p-5 bg-gradient-to-br from-[#1A1410] to-[#0F0B09] border-2 border-[#D4AF37]/20 shadow-[12px_12px_0_0_rgba(212,175,55,0.05)] rounded-sm"
            >
              <div className="absolute -top-2 -left-1 w-9 h-4 bg-[#D4AF37]/10 border border-[#D4AF37]/15 rounded-sm rotate-[-10deg] backdrop-blur-sm" />
              <div className="absolute -bottom-2 -right-1 w-8 h-4 bg-[#D4AF37]/10 border border-[#D4AF37]/15 rounded-sm rotate-[8deg] backdrop-blur-sm" />
              <div className="absolute top-1/2 -left-2 w-3 h-8 bg-[#D4AF37]/8 border border-[#D4AF37]/10 rounded-sm rotate-[15deg] backdrop-blur-sm" />

              <div className="relative w-28 h-28 md:w-32 md:h-32">
                <Image
                  src="/logo/logo1.png"
                  alt="Logo TE"
                  fill
                  className="object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                  priority
                />
                <div className="absolute inset-0 rounded-full bg-[#D4AF37]/5 blur-xl scale-110" />
              </div>

              <div className="absolute -bottom-3 -right-3 text-[6px] font-mono font-black text-[#D4AF37]/30 uppercase tracking-[0.2em] rotate-12 bg-[#0F0B09]/90 px-2 py-0.5 border border-[#D4AF37]/10 rounded">
                ARSIP
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="space-y-1"
            >
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">
                Team{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF5D6] to-[#D4AF37] relative inline-block">
                  Evangelisasi
                  <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded" />
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-[10px] font-mono font-medium text-[#D4AF37]/50 tracking-[0.3em] uppercase"
              >
                SMK Negeri 3 Manado
              </motion.p>
            </motion.div>

            {/* Garis */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4 rounded"
            />

            {/* Motto */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-[11px] font-serif italic text-[#D4AF37]/60 font-medium"
            >
              &quot;Beri yang terbaik untuk kemuliaan Tuhan&quot;
            </motion.p>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="mt-7 w-52 space-y-1.5"
            >
              <div className="flex justify-between text-[7px] font-mono font-bold text-[#D4AF37]/40 uppercase tracking-[0.2em]">
                <span>Memuat Arsip</span>
                <span className="font-mono tracking-normal">
                  {String(Math.round(loadingProgress)).padStart(3, "0")}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#1A1410] rounded-full overflow-hidden border border-[#D4AF37]/8">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF5D6] to-[#D4AF37] rounded-full"
                  style={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>

            {/* Dot animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
              className="mt-4 flex items-center gap-2"
            >
              {[0, 120, 240].map((delay, i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-full"
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: delay / 1000,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            {/* Since 2024 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-4 text-[8px] font-mono text-[#D4AF37]/20 tracking-[0.3em] uppercase"
            >
              Since 2024
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // ─── KONTEN UTAMA ───
  return (
    <main className="relative min-h-screen bg-[#FFFDFB] text-stone-800 antialiased selection:bg-[#D4AF37]/20 selection:text-[#6F4E37] overflow-x-hidden scroll-smooth">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showMobileNav={showMobileNav}
      />

      <div id="beranda" className="w-full scroll-mt-0">
        <Hero />
      </div>

      <div className="relative z-10">
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
  );
}