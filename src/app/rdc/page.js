"use client";

import { motion } from "framer-motion";
import { loginWithEmail } from "./actions";
import { useSearchParams } from "next/navigation";
import { useState, useTransition, Suspense } from "react"; // Tambahkan Suspense
import Image from "next/image";
import Link from "next/link";
import { LogIn, Mail, Lock, AlertCircle, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

// ─── 1. KOMPONEN ISI: MENANGANI FORM & SEARCH PARAMS ───
function LoginContent() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");
  
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await loginWithEmail(formData);
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex overflow-hidden selection:bg-[#6F4E37]/10 font-sans">
      
      {/* ─── SISI KIRI: PANEL VISUAL/SINEMATIK (HIDDEN DI MOBILE) ─── */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-[#6F4E37] p-16 flex-col justify-between overflow-hidden">
        {/* Background Overlay & Efek Gradasi Estetik */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#4A3324] via-[#6F4E37] to-[#8B6347] opacity-95 z-0" />
        
        {/* Dekorasi Cahaya Abstrak */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Header Kiri: Logo & Nama Sekolah */}
        <div className="z-10 flex items-center gap-4 select-none">
          <div className="p-2.5 bg-white rounded-2xl shadow-md">
            <Image
              src="/logo/logo.png"
              alt="Logo TE"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col text-white">
            <span className="font-black text-lg tracking-tight leading-none">TEAM EVANGELISASI</span>
            <span className="text-[10px] font-bold tracking-[0.15em] text-stone-300/80 mt-1 uppercase">SMKN 3 Manado</span>
          </div>
        </div>

        {/* Konten Utama Kiri: Kutipan / Value */}
        <div className="z-10 max-w-xl my-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#FFF5D6] text-xs font-bold tracking-wider mb-6 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              PORTAL RESMI PENGURUS
            </span>
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-[1.15] tracking-tight">
              Satu Hati, Satu Visi, Melayani dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D6] to-[#D4AF37]">Integritas.</span>
            </h2>
            <p className="text-stone-200/80 text-sm font-medium mt-4 leading-relaxed max-w-md">
              Silakan masuk untuk mengelola data keanggotaan, jadwal kegiatan, dan memantau perkembangan pelayanan tim evangelisasi sekolah.
            </p>
          </motion.div>

          {/* Fitur Poin Singkat */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
            <div className="flex items-center gap-2.5 text-stone-200 text-xs font-semibold">
              <CheckCircle2 size={16} className="text-[#D4AF37]" />
              <span>Sistem Terenkripsi</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-200 text-xs font-semibold">
              <CheckCircle2 size={16} className="text-[#D4AF37]" />
              <span>Integrasi Supabase Realtime</span>
            </div>
          </div>
        </div>

        {/* Footer Kiri */}
        <div className="z-10 text-[11px] text-stone-300/60 font-medium select-none">
          &copy; 2026 Team Evangelisasi SMKN 3 Manado. All rights reserved.
        </div>
      </div>

      {/* ─── SISI KANAN: FORM LOGIN (RESPONSIVE) ─── */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 sm:p-12 md:p-20 relative bg-white">
        
        {/* Logo Tambahan untuk Tampilan Mobile (Akan sembunyi di Desktop) */}
        <div className="flex lg:hidden justify-between items-center mb-12 select-none">
          <div className="flex items-center gap-3">
            <Image src="/logo/logo.png" alt="Logo" width={36} height={36} />
            <span className="font-black text-sm text-[#6F4E37] tracking-tight">TE SMKN 3</span>
          </div>
        </div>

        {/* Container Form Utama */}
        <div className="my-auto w-full max-w-[380px] mx-auto">
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Selamat Datang Kembali
            </h3>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-2">
              Masukkan akun resmi Anda untuk melanjutkan ke dashboard.
            </p>
          </div>

          {/* NOTIFIKASI ERROR PREMIUM */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-700 text-xs font-semibold leading-relaxed"
            >
              <AlertCircle size={18} className="shrink-0 text-rose-500 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-rose-900">Gagal Melakukan Otentikasi</span>
                <span>Email atau kata sandi salah. Silakan periksa kembali detail login Anda.</span>
              </div>
            </motion.div>
          )}

          {/* FORM LOGIN */}
          <form onSubmit={handleSubmit} className="space-y-4.5">
            {/* INPUT EMAIL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide block ml-0.5">
                Alamat Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#6F4E37] transition-colors">
                  <Mail size={18} strokeWidth={2.2} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isPending}
                  placeholder="nama@email.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#6F4E37] focus:ring-4 focus:ring-[#6F4E37]/5 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* INPUT PASSWORD */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-0.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide block">
                  Kata Sandi
                </label>
                <Link
                  href="#forgot-password"
                  className="text-[11px] font-bold text-[#6F4E37] hover:text-[#543b29] transition-colors"
                >
                  Lupa Sandi?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#6F4E37] transition-colors">
                  <Lock size={18} strokeWidth={2.2} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  disabled={isPending}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200/70 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#6F4E37] focus:ring-4 focus:ring-[#6F4E37]/5 outline-none transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  disabled={isPending}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#6F4E37] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* TOMBOL SIGN IN */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 bg-[#6F4E37] hover:bg-[#543b29] disabled:bg-slate-300 text-white font-bold text-xs tracking-widest rounded-2xl shadow-md shadow-[#6F4E37]/5 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>MENCOCOKKAN DATA...</span>
                  </>
                ) : (
                  <>
                    <span>MASUK SEKARANG</span>
                    <LogIn size={15} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* REGISTER LINK FOOTER */}
          <div className="mt-8 text-center text-xs text-slate-500 font-medium">
            Belum terdaftar sebagai pengurus?{" "}
            <Link href="#register" className="font-bold text-[#6F4E37] hover:underline">
              Hubungi Admin
            </Link>
          </div>
        </div>

        {/* Footer Kecil Mobile Only */}
        <div className="lg:hidden text-[11px] text-slate-400 font-medium text-center mt-12 select-none">
          &copy; 2026 TE SMKN 3 Manado.
        </div>
      </div>
    </div>
  );
}

{/* ─── 2. KOMPONEN UTAMA (DIEXPORT): DIBUNGKUS SUSPENSE BOUNDARY ─── */}
export default function LoginPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center font-sans">
          <div className="flex flex-col items-center gap-3 text-slate-500">
            <Loader2 size={28} className="animate-spin text-[#6F4E37]" />
            <span className="text-xs font-bold tracking-widest text-[#6F4E37]/80 uppercase">Menyiapkan Portal...</span>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}