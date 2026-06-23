"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import DetailsSection from "@/app/about/components/Hero"; 
import VisiMisiSection from "@/app/about/components/MIsi";
import SeksiPelayananSection from "@/app/about/components/Seksi"; 

export default function HomePage() {
  // Gunakan huruf kecil sebagai standardisasi state agar minim kesalahan typo
  const [activeTab, setActiveTab] = useState("beranda");

  useEffect(() => {
    const sections = ["beranda", "about", "sections", "kegiatan", "whyjoin"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px", // Diperlebar areanya agar lebih sensitif saat di-scroll
      threshold: 0.1, // Memicu aktif ketika 10% bagian seksi sudah terlihat di layar
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          
          if (id === "/about") {
            setActiveTab("/about");
          } 
          // Jika masuk ke wilayah Visi Misi atau Seksi Pelayanan, set ke "detail"
          else if (id === "about" || id === "sections") {
            setActiveTab("detail"); 
          } 
          else if (id === "kegiatan") {
            setActiveTab("kegiatan");
          } 
          else if (id === "whyjoin") {
            setActiveTab("gabung");
          }
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

  return (
    <main className="bg-[#121212] min-h-screen antialiased selection:bg-[#D4AF37]/10 selection:text-[#D4AF37]">
      
      {/* Navbar menerima state activeTab */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} showMobileNav={true} />
      
      <div id="/about" className="scroll-mt-16">
        <DetailsSection activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div id="visi-misi" className="scroll-mt-16">
        <VisiMisiSection />
      </div>

      <div id="sections" className="scroll-mt-16">
        <SeksiPelayananSection />
      </div>

      <div id="kegiatan" className="scroll-mt-16">
        {/* <KegiatanSection /> */}
      </div>

      <div id="whyjoin" className="scroll-mt-16">
        {/* <WhyJoinSection /> */}
      </div>
      
      <footer className="bg-[#121212] py-12 border-t border-stone-900 text-center select-none relative z-10">
        <p className="text-[10px] font-black tracking-widest text-stone-600 uppercase">
          &copy; {new Date().getFullYear()} TEAM EVANGELISASI SMKN 3 MANADO. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </main>
  );
}