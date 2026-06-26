// app/anggota/page.jsx
import { createClient } from '@/lib/supabase/server';
import AnggotaClientSection from './AnggotaClientSection';
import Navbar from './components/Navbar'; // <-- Mengambil Nav dari folder components
import { Sparkles } from 'lucide-react';

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
    /* Basis Dominan 60%: Latar belakang putih bersih hangat dengan grid bertekstur kertas sketsa halus */
    <div className="min-h-screen bg-[#FCFAF7] text-[#3D2616] pb-28 font-sans relative overflow-hidden select-none"
         style={{ backgroundImage: 'radial-gradient(#E8DFD5 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      
      {/* ─── COMPONENT NAVBAR ─── */}
      <Navbar />
      
      {/* ─── ELEMEN DEKORASI KRITIKAL ─── */}
      <div className="absolute top-24 left-10 text-[#5C3A21]/5 font-serif text-8xl select-none pointer-events-none tracking-tighter">I</div>
      <div className="absolute top-52 right-16 text-[#D4AF37]/10 font-mono text-6xl select-none pointer-events-none">✦</div>
      <div className="absolute bottom-1/3 left-12 text-[#5C3A21]/5 font-sans text-5xl rotate-45 select-none pointer-events-none">✕</div>
      <div className="absolute bottom-10 right-20 text-[#D4AF37]/10 font-serif text-9xl select-none pointer-events-none">V</div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 relative z-10">
        
        {/* ─── HEADER HALAMAN EDITORIAL HIGH-END ─── */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          
          {/* Badge Aksen Emas (10% Gold Accent) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#FFFDF4] border border-[#F5E6C4] text-[#B8860B] text-[10px] font-bold tracking-widest uppercase shadow-[0_2px_10px_rgba(212,175,55,0.05)]">
            <Sparkles size={10} className="text-[#D4AF37] fill-[#D4AF37]" />
            Keluarga Besar Pelayan Altar
          </div>
          
          {/* Judul Struktur Kontras Cokelat (30% Struktur) */}
          <h1 className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-[#3D2616]">
            Anggota <span className="italic font-normal text-[#5C3A21] relative inline-block">
              TE
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-[#D4AF37]/40"></span>
            </span>
          </h1>
          
          {/* Pembatas Garis Halus */}
          <div className="w-12 h-[1px] bg-[#E8DFD5] mx-auto my-2"></div>
          
          {/* Sub-Deskripsi Hangat & Berwibawa */}
          <p className="text-xs font-normal text-[#A38A75] max-w-md mx-auto leading-relaxed tracking-wide">
            Sinergi dedikasi tinggi dalam kesatuan divisi, bergerak bersama melayani demi keindahan pekerjaan rumah Tuhan.
          </p>
        </div>

        {/* ─── KONTEN UTAMA ─── */}
        <AnggotaClientSection initialMembers={members || []} />

      </div>
    </div>
  );
}