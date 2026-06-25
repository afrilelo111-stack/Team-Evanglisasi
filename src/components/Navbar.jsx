"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ArrowRight, 
  House, 
  CalendarDays, 
  HelpCircle, 
  ClipboardList 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image"; 
import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Navbar({ 
  activeTab, 
  setActiveTab 
}) {
  const [show, setShow] = useState(false); 
  const [isReady, setIsReady] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();
  
  // Menggunakan useRef untuk melacak posisi scroll sebelumnya tanpa memicu siklus render ulang ekstra
  const lastScrollY = useRef(0);

  // Memastikan inisialisasi awal berjalan mulus setelah komponen terpasang
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      setShow(true);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  // Memisahkan fungsi penanganan scroll menggunakan useCallback untuk optimasi performa
  const handleScroll = useCallback(() => {
    if (!isReady) return;
    const currentScroll = window.scrollY;

    // 1. LOGIKA VISIBILITAS NAVBAR
    if (currentScroll <= 30) {
      setIsAtTop(true);
      setShow(true);
    } else {
      setIsAtTop(false);
      if (currentScroll > 150) {
        const delta = currentScroll - lastScrollY.current;
        if (delta > 10) setShow(false); // Gulir ke bawah: Sembunyikan
        if (delta < -10) setShow(true); // Gulir ke atas: Tampilkan
      }
    }
    lastScrollY.current = currentScroll;

    // 2. SINKRONISASI AKTIFNYA MENU (Seksi Halaman vs Route URL)
    if (pathname === "/about") {
      setActiveTab("detail");
      return;
    }

    // Jika di halaman utama, pantau elemen bento id untuk perpindahan lampu aktif
    const sections = ["beranda", "about", "sections", "kegiatan", "whyjoin"];
    const scrollPosition = currentScroll + (window.innerHeight / 3);

    for (const id of sections) {
      const element = document.getElementById(id);
      if (element) {
        const top = element.offsetTop;
        const height = element.offsetHeight;
        
        if (scrollPosition >= top && scrollPosition < top + height) {
          // Jika melewati seksi bento 'about' atau 'sections' di halaman Home,
          // status navigasi tetap menyala di "Beranda", tidak lompat ke "Detail"
          if (id === "about" || id === "sections") {
            setActiveTab("beranda");
          } else {
            setActiveTab(id);
          }
          break; 
        }
      }
    }
  }, [isReady, pathname, setActiveTab]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // SOLUSI ERROR MERAH: Menunda eksekusi pemeriksaan awal menggunakan macrotask (setTimeout) 
    // agar sinkronisasi state berjalan aman setelah siklus render utama React selesai.
    const initialSync = setTimeout(() => {
      handleScroll();
    }, 0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(initialSync);
    };
  }, [handleScroll]);

  const menuItems = [
    { id: "beranda", label: "Beranda", href: "/", icon: House },
    { id: "kegiatan", label: "Kegiatan", href: "/#kegiatan", icon: CalendarDays },
    { id: "whyjoin", label: "Mengapa", href: "/#whyjoin", icon: HelpCircle },
    { id: "detail", label: "Detail", href: "/about", icon: ClipboardList },
  ];

  if (!isReady) return null;

  return (
    <>
      {/* ─── TOMBOL INSTAN PEMICU NAVIGASI (MOBILE) ─── */}
      <AnimatePresence>
        {!show && !isAtTop && (
          <motion.button
            initial={{ opacity: 0, y: 30, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 30, x: "-50%" }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            onClick={() => setShow(true)}
            className="fixed bottom-6 left-1/2 z-[9999] md:hidden bg-white/95 text-[#6F4E37] border border-stone-200/80 px-6 py-3 rounded-full shadow-2xl font-black text-xs flex items-center gap-2 cursor-pointer select-none backdrop-blur-md"
          >
            <span>Tampilkan Menu</span>
            <ChevronDown size={14} className="rotate-180 text-[#D4AF37] animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── 1. NAVBAR UTAMA VERSI DESKTOP ─── */}
      <div 
        className={`hidden md:flex inset-x-0 z-[9999] justify-center items-center px-6 pointer-events-none transition-all duration-500 ${
          isAtTop ? "absolute top-2 w-full" : "fixed top-4"
        }`}
      >
        <AnimatePresence>
          {show && (
            <motion.nav 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 120, damping: 22, mass: 1.1 }}
              className={`pointer-events-auto w-full grid grid-cols-3 items-center rounded-[2.5rem] transition-all duration-500 ${
                isAtTop 
                  ? "max-w-7xl px-10 py-3 bg-transparent text-white" 
                  : "max-w-5xl px-8 py-2.5 bg-white/95 backdrop-blur-3xl border border-white/60 shadow-lg text-slate-800"
              }`}
            >
              {/* LOGO DESKTOP */}
              <div className="flex justify-start select-none group/logo">
                <Link href="/" className="flex items-center gap-3">
                  <div className={`transition-all duration-300 group-hover/logo:scale-105 ${
                    isAtTop ? "p-0 bg-transparent" : "p-1.5 border border-white/10 bg-white rounded-xl shadow-sm"
                  }`}>
                    <Image 
                      src="/logo/logo.png" 
                      alt="Logo TE" 
                      width={36} 
                      height={36} 
                      className="object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" 
                      priority 
                    />
                  </div>
                  <div className="flex flex-col justify-center leading-none">
                    <span className={`font-black text-2xl tracking-tight transition-colors duration-500 ${
                      isAtTop ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF5D6] to-[#D4AF37]" : "text-[#6F4E37]"
                    }`}>
                      TE<span className="text-[#D4AF37]">•</span>
                    </span>
                    <span className={`text-[9px] font-bold tracking-[0.18em] uppercase mt-0.5 transition-colors duration-500 ${
                      isAtTop ? "text-stone-300/90" : "text-slate-500"
                    }`}>
                      SMKN 3 Manado
                    </span>
                  </div>
                </Link>
              </div>

              {/* MENU DESKTOP */}
              <div className="flex justify-center">
                <ul className={`flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 ${
                  isAtTop ? "bg-white/[0.04]" : "bg-[#6F4E37]/5 border border-[#6F4E37]/10"
                }`}>
                  {menuItems.map((item) => {
                    const isActive = activeTab?.toLowerCase() === item.id;
                    return (
                      <li key={item.id} className="relative">
                        <Link
                          href={item.href}
                          onClick={() => setActiveTab(item.id)}
                          className={`relative z-10 block px-4 py-2 text-xs font-bold tracking-[0.12em] transition-colors duration-300 rounded-full ${
                            isActive 
                              ? isAtTop ? "text-[#6F4E37]" : "text-white"
                              : isAtTop ? "text-stone-300 hover:text-white" : "text-slate-500 hover:text-[#6F4E37]"
                          }`}
                        >
                          {item.label.toUpperCase()}
                        </Link>
                        {isActive && (
                          <motion.span
                            layoutId="activeDesktopTab"
                            className="absolute inset-0 rounded-full -z-10 shadow-sm"
                            style={{
                              background: isAtTop 
                                ? "linear-gradient(to right, #ffffff, #FFF5D6)" 
                                : "linear-gradient(to right, #6F4E37, #8B6347)"
                            }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* TOMBOL AKSI DESKTOP */}
              <div className="flex justify-end items-center">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link 
                    href="https://docs.google.com/forms/d/e/1FAIpQLScjK2aENHr5ihdNb-xYpDyGmDENefEszcWXc0uni4SkWH9KLA/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-2.5 rounded-full text-xs font-black tracking-[0.1em] flex items-center gap-2 transition-all duration-300 ${
                      isAtTop 
                        ? "bg-white text-black hover:bg-stone-100" 
                        : "bg-[#6F4E37] border border-[#6F4E37] text-white hover:bg-[#543b29]"
                    }`}
                  >
                    GABUNG
                    <ArrowRight size={13} className="opacity-80" />
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* ─── 2. BOTTOM FLOATING DOCK (MOBILE) ─── */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 100, x: "-50%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="md:hidden fixed left-1/2 bottom-5 z-[9999] w-[92vw] max-w-md bg-white/95 backdrop-blur-2xl border border-stone-200/70 shadow-[0_20px_50px_rgba(111,78,55,0.15)] rounded-[2rem] p-2 flex justify-between items-center gap-1 select-none"
          >
            {menuItems.map((item) => {
              const isActive = activeTab?.toLowerCase() === item.id;
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveTab(item.id)}
                  className="flex-1 flex flex-col items-center justify-center relative py-2.5 min-w-[55px] text-center transition-all duration-200"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-[#6F4E37] to-[#8B6347] rounded-[1.5rem] -z-10 shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div className={`transition-all duration-300 ${isActive ? "text-white scale-110" : "text-stone-400"}`}>
                    <IconComponent size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </div>

                  <span className={`text-[10px] font-bold tracking-wide mt-1 transition-colors duration-300 ${
                    isActive ? "text-white font-extrabold" : "text-stone-500"
                  }`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}