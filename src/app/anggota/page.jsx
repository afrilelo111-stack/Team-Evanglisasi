// app/anggota/page.jsx
import { createClient } from '@/lib/supabase/server';
import AnggotaClientSection from './AnggotaClientSection';
import Navbar from './components/Navbar';
import { Sparkles, Users, Cross, Award } from 'lucide-react';

export const revalidate = 0;

export default async function AnggotaPage() {
  const supabase = await createClient();

  const { data: members, error } = await supabase
    .from('gallery')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching members:', error.message);
  }

  return (
    <main className="min-h-screen bg-[#FCF9F6] text-[#4A2F1D] selection:bg-[#D4AF37] selection:text-[#4A2F1D] font-sans antialiased overflow-hidden relative">
      
      {/* ─── TEKSTUR KERTAS TUA ─── */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#4A2F1D_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      
      {/* ─── ELEMEN DEKORATIF ARSIP ─── */}
      <div className="absolute top-12 left-8 text-[#D4AF37]/5 font-serif text-9xl select-none pointer-events-none tracking-tighter rotate-[-8deg]">I</div>
      <div className="absolute top-1/3 right-12 text-[#D4AF37]/8 font-mono text-7xl select-none pointer-events-none">✦</div>
      <div className="absolute bottom-1/4 left-8 text-[#5C3A21]/4 font-sans text-6xl rotate-12 select-none pointer-events-none">✕</div>
      <div className="absolute bottom-8 right-12 text-[#D4AF37]/6 font-serif text-9xl select-none pointer-events-none">V</div>
      
      {/* Lingkaran dekoratif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#D4AF37]/[0.04] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-4 w-24 h-24 border border-[#D4AF37]/[0.05] rotate-45 pointer-events-none" />
      
      {/* Garis horizontal dekoratif */}
      <div className="absolute top-1/3 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/10 pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-1/3 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/10 pointer-events-none" />

      {/* ─── COMPONENT NAVBAR ─── */}
      <Navbar />

      {/* ─── KONTEN UTAMA ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-20">
        
        {/* ─── HEADER HALAMAN ─── */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          
          {/* Badge Aksen Emas */}
          <div className="inline-flex items-center gap-2.5 px-5 py-1.5 border-2 border-[#D4AF37] bg-[#FCF9F6] shadow-[3px_3px_0_0_#E8D5C4] mb-6">
            <Users size={12} className="text-[#D4AF37]" />
            <span className="text-[9px] font-mono font-black text-[#4A2F1D] tracking-[0.25em] uppercase">
              Keluarga Besar Pelayan
            </span>
          </div>
          
          {/* Judul Utama */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A2F1D] tracking-tight leading-[1.1]">
            Anggota <br />
            <span className="text-[#D4AF37] relative inline-block">
              Team Evangelisasi
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-[#D4AF37]/40 rounded-full" />
            </span>
          </h1>
          
          
          {/* Deskripsi */}
          <p className="text-sm md:text-base text-[#8B5A33] font-medium max-w-lg mx-auto leading-relaxed mt-4">
            Sinergi dedikasi tinggi dalam kesatuan divisi, bergerak bersama melayani demi keindahan pekerjaan rumah Tuhan.
          </p>
          
          {/* Garis Dekoratif */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-[1px] bg-[#D4AF37]/30" />
            <Sparkles size={14} className="text-[#D4AF37]" />
            <div className="w-12 h-[1px] bg-[#D4AF37]/30" />
          </div>
          
          {/* Jumlah Anggota (dinamis) */}

        </div>

        {/* ─── KONTEN UTAMA ─── */}
          <AnggotaClientSection initialMembers={members || []} />
        

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
  );
}