// app/rdc/login/page.jsx
"use client";

import { motion } from "framer-motion";
import { loginWithEmail } from "./actions";
import { useSearchParams } from "next/navigation";
import { useState, useTransition, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  LogIn, 
  Mail, 
  Lock, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Loader2, 
  CheckCircle2,
  Sparkles,
  Cross,
  Users,
  BookOpen,
  ArrowLeft // 👈 tambahkan ArrowLeft
} from "lucide-react";

// ─── 1. KOMPONEN ISI ───
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
    <div className="min-h-screen bg-[#FCF9F6] flex overflow-hidden selection:bg-[#D4AF37] selection:text-[#4A2F1D] font-sans antialiased">
      
      {/* ─── SISI KIRI: PANEL ARSIP KLASIK ─── */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-[#4A2F1D] p-12 flex-col justify-between overflow-hidden">
        {/* Texture Kertas Tua */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
        
        {/* Gradasi Hangat */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A2F1D] via-[#5C3A21] to-[#3D2616] z-0" />
        
        {/* Dekorasi Emas Abstrak */}
        <div className="absolute top-[-15%] right-[-15%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Garis Dekoratif */}
        <div className="absolute top-0 left-0 w-20 h-1 bg-[#D4AF37] opacity-60" />
        <div className="absolute bottom-0 right-0 w-20 h-1 bg-[#D4AF37] opacity-60" />

        {/* Header Kiri */}
        <div className="z-10 flex items-center gap-4 select-none">
          <div className="p-3 border-2 border-[#D4AF37] bg-[#FCF9F6] shadow-[4px_4px_0_0_#D4AF37]">
            <Image
              src="/logo/logo.png"
              alt="Logo TE"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold text-[#FCF9F6] tracking-tight leading-none">
              TE SMKN 3
            </span>
            <span className="text-[10px] font-mono font-black tracking-[0.2em] text-[#D4AF37] uppercase mt-1">
              Manado
            </span>
          </div>
        </div>

        {/* Konten Utama Kiri */}
        <div className="z-10 max-w-xl my-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-black tracking-[0.25em] uppercase mb-6">
              <Sparkles size={12} className="fill-[#D4AF37]" />
              Portal Pengurus
            </div>

            <h2 className="text-4xl xl:text-5xl font-serif font-bold text-[#FCF9F6] leading-[1.15] tracking-tight">
              Melayani dengan
              <br />
              <span className="text-[#D4AF37] relative inline-block">
                Integritas & Hati
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#D4AF37]/40 rounded" />
              </span>
            </h2>

            <p className="text-[#C5B5A5] text-sm font-medium mt-5 leading-relaxed max-w-md">
              Akses penuh ke sistem kurasi, manajemen anggota, dan arsip kegiatan Team Evangelisasi SMK Negeri 3 Manado.
            </p>
          </motion.div>

          {/* Fitur Poin */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t-2 border-[#D4AF37]/20 pt-8">
            <div className="flex items-center gap-2.5 text-[#C5B5A5] text-xs font-bold uppercase tracking-wider">
              <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
              <span>Sistem Terenkripsi</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#C5B5A5] text-xs font-bold uppercase tracking-wider">
              <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
              <span>Supabase Realtime</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#C5B5A5] text-xs font-bold uppercase tracking-wider">
              <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
              <span>Arsip Visual</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#C5B5A5] text-xs font-bold uppercase tracking-wider">
              <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
              <span>Multi-User Role</span>
            </div>
          </div>
        </div>

        {/* Footer Kiri */}
        <div className="z-10 flex items-center justify-between text-[10px] font-mono text-[#8B6A50] font-medium select-none">
          <span>&copy; 2026 TE SMKN 3 Manado</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 bg-[#D4AF37] rotate-45" />
            Soli Deo Gloria
            <span className="w-1 h-1 bg-[#D4AF37] rotate-45" />
          </span>
        </div>
      </div>

      {/* ─── SISI KANAN: FORM LOGIN ─── */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-6 sm:p-12 md:p-16 bg-[#FCF9F6] relative">
        
        {/* Elemen Dekoratif */}
        <div className="absolute top-8 right-8 w-12 h-12 border-2 border-[#D4AF37]/10 rotate-12 hidden sm:block" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-2 border-[#D4AF37]/10 -rotate-12 hidden sm:block" />

        {/* ─── TOMBOL KEMBALI KE BERANDA ─── */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 border-2 border-[#D1C0B0] bg-white hover:border-[#D4AF37] hover:shadow-[3px_3px_0_0_#E8D5C4] text-[#4A2F1D] text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Kembali ke Beranda</span>
            <span className="sm:hidden">Beranda</span>
          </Link>
        </div>

        {/* Logo Mobile */}
        <div className="flex lg:hidden justify-center items-center mb-8 select-none mt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 border-2 border-[#D4AF37] bg-[#FCF9F6] shadow-[3px_3px_0_0_#D4AF37]">
              <Image src="/logo/logo.png" alt="Logo" width={28} height={28} />
            </div>
            <span className="font-serif font-bold text-lg text-[#4A2F1D] tracking-tight">TE SMKN 3</span>
          </div>
        </div>

        {/* Container Form */}
        <div className="my-auto w-full max-w-[380px] mx-auto">
          {/* Header Form */}
          <div className="mb-8 border-l-4 border-[#D4AF37] pl-4">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A2F1D] tracking-tight">
              Selamat Datang
            </h3>
            <p className="text-xs font-mono text-[#8B5A33] tracking-wider uppercase mt-1">
              Masuk ke dashboard administrasi
            </p>
          </div>

          {/* Error Notification */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 border-2 border-rose-300 bg-rose-50/80 rounded-xl flex items-start gap-3 text-rose-800 text-xs font-semibold shadow-[3px_3px_0_0_#FECDD3]"
            >
              <AlertCircle size={18} className="shrink-0 text-rose-500 mt-0.5" />
              <div>
                <span className="block font-bold text-rose-900">Otentikasi Gagal</span>
                <span className="text-rose-700">Email atau kata sandi tidak sesuai. Silakan coba lagi.</span>
              </div>
            </motion.div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-black text-[#4A2F1D] uppercase tracking-widest flex items-center gap-1.5">
                <Mail size={13} className="text-[#D4AF37]" /> Alamat Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8B5A33] group-focus-within:text-[#D4AF37] transition-colors">
                  <Mail size={17} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isPending}
                  placeholder="nama@email.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-[#D1C0B0] rounded-xl text-sm font-medium text-[#4A2F1D] placeholder-[#B5A392] focus:border-[#D4AF37] focus:shadow-[4px_4px_0_0_#E8D5C4] outline-none transition-all disabled:opacity-50 shadow-[2px_2px_0_0_#E8D5C4]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-0.5">
                <label className="text-[10px] font-mono font-black text-[#4A2F1D] uppercase tracking-widest flex items-center gap-1.5">
                  <Lock size={13} className="text-[#D4AF37]" /> Kata Sandi
                </label>
                <Link
                  href="#forgot-password"
                  className="text-[10px] font-bold text-[#8B5A33] hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
                >
                  Lupa?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8B5A33] group-focus-within:text-[#D4AF37] transition-colors">
                  <Lock size={17} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  disabled={isPending}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-white border-2 border-[#D1C0B0] rounded-xl text-sm font-medium text-[#4A2F1D] placeholder-[#B5A392] focus:border-[#D4AF37] focus:shadow-[4px_4px_0_0_#E8D5C4] outline-none transition-all disabled:opacity-50 shadow-[2px_2px_0_0_#E8D5C4]"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  disabled={isPending}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#8B5A33] hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#C5A059] border-2 border-[#4A2F1D] text-[#4A2F1D] font-black text-xs tracking-[0.15em] rounded-xl shadow-[5px_5px_0_0_#4A2F1D] hover:shadow-[3px_3px_0_0_#4A2F1D] transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>MEMVERIFIKASI...</span>
                  </>
                ) : (
                  <>
                    <span>MASUK SEKARANG</span>
                    <LogIn size={15} strokeWidth={3} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center text-[10px] font-mono text-[#8B5A33] font-medium tracking-wider">
            Belum terdaftar?{" "}
            <Link href="#register" className="font-bold text-[#D4AF37] hover:text-[#C5A059] transition-colors">
              Hubungi Admin
            </Link>
          </div>
        </div>

        {/* Footer Mobile */}
        <div className="lg:hidden text-[9px] font-mono text-[#8B5A33]/50 text-center mt-8 select-none tracking-widest">
          &copy; 2026 TE SMKN 3 Manado
        </div>
      </div>
    </div>
  );
}

// ─── 2. KOMPONEN UTAMA ───
export default function LoginPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-[#FCF9F6] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] font-mono font-bold text-[#8B5A33] tracking-widest uppercase animate-pulse">
              Memuat Portal...
            </span>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}