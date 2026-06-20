"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Kegiatan from "@/components/kegiatan";
import WhyJoin from "@/components/WhyJoin";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Beranda");
  const [showMobileNav, setShowMobileNav] = useState(true);

  // 1. Auto-Hide Mobile Navbar (Optimized Performance)
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

  // 2. Precision Intersection Observer
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
      rootMargin: "-30% 0px -45% 0px", // Akurasi tinggi untuk deteksi viewport desktop & mobile
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

  // Efek Cinematic Ultra-Smooth Reveal Animation dengan Easing Bezier Custom
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <main className="relative min-h-screen bg-[#FFFDFB] text-stone-800 antialiased selection:bg-[#D4AF37]/20 selection:text-[#6F4E37] overflow-x-hidden scroll-smooth">
      
      {/* Navbar Adaptif Premium */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        showMobileNav={showMobileNav} 
      />

      {/* SECTION 1: HERO (Latar Belakang Utama) */}
      <div id="beranda" className="w-full scroll-mt-0">
        <Hero />
      </div>

      {/* RANGKAIAN KONTEN UTAMA DENGAN WARNA MENGALIR (SEAMLESS) */}
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

        {/* SECTION 3: KEGIATAN (Menggunakan warna yang selaras namun bergradasi lembut) */}
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

        {/* SECTION 4: WHY JOIN (Pemberhentian Terakhir Menuju Soft Pearl Cream) */}
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

      {/* FOOTER */}
      <Footer />
    </main>
  );
}