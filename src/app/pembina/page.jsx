import { createClient } from '@/lib/supabase/server';
import GuruAgamaSection from './GuruAgamaSection';
import Navbar from '../../components/anggota/Navbar'; 
import { BookOpen, Cross, Sparkles, Users } from 'lucide-react';

// ─── REVALIDASI ───
export const revalidate = 3600;

// ─── METADATA ───
export const metadata = {
  title: 'Guru Pembina & Penasihat - Team Evangelisasi SMKN 3 Manado',
  description: 'Daftar guru pembimbing rohani, penasihat, dan mentor pelayanan Team Evangelisasi SMKN 3 Manado.',
};

export default async function GuruPembinaPage() {
  const supabase = await createClient();

  const { data: teachers, error } = await supabase
    .from('gallery')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Terjadi kesalahan saat memuat data pembina:', error.message);
  }

  return (
    <>
      {/* ─── NAVBAR / NAVIGASI ─── */}
      <Navbar />

      {/* MENAMBAHKAN pt-24 DI MOBILE DAN md:pt-32 DI DESKTOP 
        Langkah ini memberikan ruang bernapas agar konten terdorong sedikit ke bawah dari area Navbar 
      */}
      <main className="min-h-screen pt-24 md:pt-32 bg-[#FCF9F6] text-[#4A2F1D] selection:bg-[#D4AF37] selection:text-[#4A2F1D] font-sans antialiased overflow-hidden relative">
        
        {/* ─── TEKSTUR DASAR ─── */}
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#4A2F1D_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        {/* ─── ELEMEN DEKORATIF ─── */}
        <div className="absolute top-20 right-10 text-[#D4AF37]/5 font-serif text-8xl select-none pointer-events-none tracking-tighter">P</div>
        <div className="absolute bottom-20 left-10 text-[#D4AF37]/5 font-serif text-7xl select-none pointer-events-none">V</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-[#D4AF37]/[0.04] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-20 w-32 h-32 border-[1px] border-[#D4AF37]/[0.06] rotate-45 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          
          {/* ─── HEADER HALAMAN ─── */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-[#D4AF37] bg-[#FCF9F6] shadow-[4px_4px_0_0_#E8D5C4] mb-5">
              <Cross size={12} className="text-[#D4AF37]" />
              <span className="text-[9px] font-mono font-black text-[#4A2F1D] tracking-[0.25em] uppercase">
                Struktur Kehormatan
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A2F1D] tracking-tight leading-[1.1]">
              Pembina  <br />
              <span className="text-[#D4AF37] relative inline-block">
                Team Evangelisasi
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#D4AF37]/30 rounded" />
              </span>
            </h1>

            <p className="text-sm md:text-base text-[#8B5A33] font-medium max-w-lg mx-auto leading-relaxed mt-5">
              Mereka adalah fondasi rohani dan teladan bagi setiap pelayan. Dengan pengabdian dan kasih, mereka membimbing langkah generasi pelayan.
            </p>

            {/* Garis dekoratif */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="w-12 h-[1px] bg-[#D4AF37]/30" />
              <Sparkles size={14} className="text-[#D4AF37]" />
              <div className="w-12 h-[1px] bg-[#D4AF37]/30" />
            </div>
          </div>

          {/* ─── KONTEN UTAMA ─── */}
          <div className="bg-white/60 backdrop-blur-[2px] border border-[#E8D5C4] rounded-3xl shadow-[0_20px_60px_rgba(74,47,29,0.02)] p-4 sm:p-8 md:p-12">
            <GuruAgamaSection initialTeachers={teachers || []} />
          </div>

          {/* ─── FOOTER ─── */}
          <div className="mt-16 text-center text-[9px] font-mono text-[#8B5A33]/40 tracking-[0.2em] uppercase border-t border-[#E8D5C4]/20 pt-8">
            <span className="flex items-center justify-center gap-2">
              <span className="w-1 h-1 bg-[#D4AF37]/30 rotate-45" />
              Soli Deo Gloria
              <span className="w-1 h-1 bg-[#D4AF37]/30 rotate-45" />
            </span>
            <span className="block mt-1 opacity-60">Arsip Kuratorial • Team Evangelisasi SMKN 3 Manado</span>
          </div>
        </div>
      </main>
    </>
  );
}