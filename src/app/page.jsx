"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/beranda";
import Kegiatan from "@/components/kegiatan";
import WhyJoin from "@/components/WhyJoin";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Beranda");
  const [showMobileNav, setShowMobileNav] = useState(true);

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

  // ─── ANIMASI KONTEN ───
  const premiumEase = [0.25, 1, 0.5, 1];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: premiumEase },
    },
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: premiumEase }}
      className="relative min-h-screen bg-[#FFFDFB] text-stone-800 antialiased selection:bg-[#D4AF37]/20 selection:text-[#6F4E37] overflow-x-hidden scroll-smooth"
    >
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
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeInUp}
          className="scroll-mt-20 bg-[#FFFDFB]"
        >
          <About />
        </motion.div>

        <motion.div
          id="kegiatan"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeInUp}
          className="scroll-mt-24"
        >
          <Kegiatan />
        </motion.div>

        <motion.div
          id="whyjoin"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeInUp}
          className="scroll-mt-20 bg-[#FAF8F5]"
        >
          <WhyJoin />
        </motion.div>
      </div>

      <Footer />
    </motion.main>
  );
}