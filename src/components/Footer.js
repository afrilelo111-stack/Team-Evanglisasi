"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="relative bg-[#6F4E37] text-stone-200 overflow-hidden border-t border-[#8B6347] mt-20">
      
      {/* Efek Ambient Latar Belakang yang Kalem */}
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-12 pt-16 pb-8 relative z-10">
        
        {/* ─── MAIN GRID LAYOUT ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* KOLOM 1: BRANDING & DESKRIPSI */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3 select-none">
              <div className="relative w-10 h-10 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center shadow-sm">
                <Image 
                  src="/logo/logo1.png" 
                  alt="Logo TE Footer" 
                  fill
                  sizes="40px"
                  className="object-contain p-1.5"
                />
              </div>
              <div className="flex flex-col justify-center leading-none">
                <span className="font-black text-xl tracking-tight text-white">
                  TE<span className="text-[#D4AF37]">.</span>
                </span>
                <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-stone-300 mt-1">
                  Team Evangelisasi
                </span>
              </div>
            </div>
            <p className="text-stone-300/80 text-xs md:text-sm leading-relaxed max-w-sm font-medium">
              Wadah persekutuan siswa Kristen SMK Negeri 3 Manado untuk saling membangun iman, mengasah potensi pelayanan, dan menjadi berkat nyata di lingkungan sekolah.
            </p>
          </div>

          {/* KOLOM 2: QUICK LINKS */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-[10px] font-black tracking-wider text-[#D4AF37] uppercase">
              Tautan Pintas
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs md:text-sm font-medium">
              <li>
                <Link href="#beranda" className="text-stone-300 hover:text-white transition-colors duration-200">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-stone-300 hover:text-white transition-colors duration-200">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#kegiatan" className="text-stone-300 hover:text-white transition-colors duration-200">
                  Kegiatan
                </Link>
              </li>
              <li>
                <Link href="#whyjoin" className="text-stone-300 hover:text-white transition-colors duration-200">
                  Mengapa Bergabung
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: CONTACT & SOCIALS */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-[10px] font-black tracking-wider text-[#D4AF37] uppercase">
              Sekretariat & Kontak
            </h4>
            <ul className="flex flex-col gap-3 text-xs md:text-sm text-stone-300 font-medium">
              {/* Bagian yang tadi error, sekarang sudah rapi menggunakan pembuka dan penutup <li> */}
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  SMK Negeri 3 Manado, Jl. Kleak, Kota Manado, Sulawesi Utara
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#D4AF37] shrink-0" />
                <a href="mailto:te.smkn3manado@gmail.com" className="hover:text-white transition-colors duration-200">
                  te.smkn3manado@gmail.com
                </a>
              </li>
            </ul>

            {/* Media Sosial Minimalis */}
            <div className="flex items-center gap-2 mt-2">
              <a 
                href="https://instagram.com/pelsis_smk3mdo" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:bg-white hover:text-[#6F4E37] transition-all duration-200"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              <a 
                href="https://tiktok.com/@tim.evanglisasi" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:bg-white hover:text-[#6F4E37] transition-all duration-200"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a8 8 0 0 0 8 8" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* ─── BOTTOM COPYRIGHT & BACK TO TOP ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px] font-semibold text-stone-400">
          <p className="text-center sm:text-left">
            © 2026 Team Evangelisasi SMKN 3 Manado. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white text-stone-300 hover:text-[#6F4E37] transition-all duration-200"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
}