'use client';

import Image from 'next/image';
import { useTransition, useState } from 'react';
import { Edit3, Trash2, Calendar, Film, Image as ImageIcon, X, Maximize2, Sparkles, Clock, Filter, Layers } from 'lucide-react';

// Menyesuaikan dengan opsi kategori yang ada di database Anda (Natal, Paskah, BC, dll)
const KEGIATAN_OPTIONS = ['Semua', 'Natal', 'Paskah', 'BC', 'Umum'];

// ─── KOMPONEN 1: BAR FILTER UTAMA ───
export function ItemCategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white/70 backdrop-blur-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-stone-50 text-stone-700 border border-stone-200/60">
          <Layers size={16} />
        </div>
        <div>
          <h4 className="text-xs font-black text-stone-900 tracking-tight uppercase">Arsip Kegiatan</h4>
          <p className="text-[10px] text-stone-400 font-semibold mt-0.5">Saring dokumentasi berdasarkan kategori pelayanan.</p>
        </div>
      </div>

      <div className="relative flex items-center gap-2 bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-2.5 group/select min-w-[160px]">
        <Filter size={12} className="text-stone-400 group-hover/select:text-stone-600 transition-colors" />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="bg-transparent text-xs font-bold text-stone-600 focus:outline-none cursor-pointer w-full appearance-none pr-4 uppercase tracking-wider"
        >
          {KEGIATAN_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-white text-stone-700 font-semibold normal-case">
              {opt === 'Semua' ? '✨ Semua Kategori' : opt}
            </option>
          ))}
        </select>
        <span className="text-[8px] text-stone-400 pointer-events-none absolute right-4">▼</span>
      </div>
    </div>
  );
}

// ─── KOMPONEN UTAMA 2: KARTU ITEM (SINKRON DATABASE & MOBILE FRIENDLY) ───
export default function ItemCard({ item, onEdit, onDelete }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  // Deteksi file video atau gambar dari string image_url database
  const isVideo = item.type === 'video' || item.image_url?.endsWith('.mp4') || item.image_url?.includes('/videos/');

  return (
    <>
      {/* ─── KARTU UTAMA ─── */}
      <div className="group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
        
        {/* AREA VISUAL MEDIA (Aspek Rasio dioptimalkan untuk Mobile & Desktop) */}
        <div 
          onClick={() => setIsOpen(true)}
          className="relative w-full aspect-[4/3] sm:h-52 overflow-hidden bg-stone-50 flex-shrink-0 cursor-zoom-in border-b border-stone-100"
        >
          {isVideo ? (
            <video
              src={item.image_url}
              className="w-full h-full object-cover"
              preload="metadata"
              muted
              loop
              autoPlay
              playsInline
            />
          ) : (
            <Image
              src={item.image_url}
              alt={item.description || 'Gallery Media'}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-103"
            />
          )}
          
          <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          {/* BADGE KATEGORI (Menggunakan item.category dari database) */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none z-10">
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-stone-800 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-lg uppercase border border-stone-200 shadow-xs">
              <Sparkles size={9} className="text-[#D4AF37]" />
              {item.category || 'Umum'} 
            </span>
            <span className={`inline-flex items-center gap-1 text-[8px] font-black px-2 py-0.5 rounded-md text-white self-start shadow-xs ${
              isVideo ? 'bg-rose-600' : 'bg-[#6F4E37]'
            }`}>
              {isVideo ? <Film size={8} /> : <ImageIcon size={8} />}
              {isVideo ? 'VIDEO' : 'GAMBAR'}
            </span>
          </div>

          {/* Overlay petunjuk klik di desktop */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 bg-stone-950/10 hidden md:flex">
            <div className="p-2.5 rounded-xl bg-white text-stone-900 shadow-md border border-stone-100 flex items-center gap-1.5 font-bold text-[10px] tracking-wider uppercase">
              <Maximize2 size={12} className="text-[#6F4E37]" />
              <span>Lihat Detail</span>
            </div>
          </div>
        </div>

        {/* AREA KONTEN INFORMASI */}
        <div className="p-4 md:p-5 flex flex-col justify-between flex-grow gap-4 bg-white">
          <div className="space-y-2">
            {item.created_at && (
              <div className="flex items-center gap-1 text-[10px] font-bold text-stone-400 tracking-wider uppercase">
                <Calendar size={10} className="text-stone-400" />
                <span>
                  {new Date(item.created_at).toLocaleDateString('id-ID', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
            <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-medium line-clamp-3">
              {item.description || 'Tidak ada keterangan tertulis.'}
            </p>
          </div>

          {/* TOMBOL MANAJEMEN DATA */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100">
            <button
              onClick={() => onEdit(item)}
              className="inline-flex items-center justify-center gap-1.5 bg-stone-50 hover:bg-stone-100 text-stone-600 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors border border-stone-200/60 active:scale-95 cursor-pointer"
            >
              <Edit3 size={12} />
              <span>Ubah</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin menghapus data dokumentasi ini?')) {
                  startTransition(() => onDelete(item.id));
                }
              }}
              disabled={isPending}
              className="inline-flex items-center justify-center gap-1.5 bg-stone-50 hover:bg-rose-50 text-stone-500 hover:text-rose-600 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors border border-stone-200/60 disabled:opacity-40 active:scale-95 cursor-pointer"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-rose-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Proses</span>
                </>
              ) : (
                <>
                  <Trash2 size={12} />
                  <span>Hapus</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ─── MODAL PANEL DETAIL (RESPONSIF MOBILE-FIRST) ─── */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-md p-0 md:p-6 transition-all"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full md:max-w-4xl max-h-[92vh] md:max-h-[85vh] flex flex-col md:flex-row bg-white rounded-t-3xl md:rounded-2xl overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* PANEL MEDIA VISUAL */}
            <div className="relative flex-grow bg-stone-950 flex items-center justify-center aspect-[4/3] md:aspect-auto md:h-auto md:w-7/12 border-b md:border-b-0 md:border-r border-stone-100">
              {isVideo ? (
                <video src={item.image_url} className="w-full h-full object-contain" controls preload="auto" playsInline />
              ) : (
                <div className="relative w-full h-full min-h-[250px] md:min-h-[400px]">
                  <Image src={item.image_url} alt="Full View" fill unoptimized className="object-contain" />
                </div>
              )}
              
              {/* Tombol Tutup Khusus Layar Ponsel di Sudut Atas Media */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md text-white md:hidden"
              >
                <X size={16} />
              </button>
            </div>

            {/* PANEL INFORMASI KANAN */}
            <div className="p-5 md:p-6 bg-white md:w-5/12 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="hidden md:flex items-center justify-between gap-4">
                  <span className="bg-stone-100 text-stone-800 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {item.category || 'Umum'}
                  </span>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-400 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex md:hidden items-center gap-2">
                  <span className="bg-stone-100 text-stone-800 text-[9px] font-black px-2 py-0.5 rounded uppercase">
                    {item.category || 'Umum'}
                  </span>
                </div>

                {item.created_at && (
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-semibold">
                    <Clock size={12} />
                    <span>
                      Diarsipkan: {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase block">Keterangan</span>
                  <p className="text-xs md:text-sm text-stone-600 font-medium leading-relaxed max-h-[160px] md:max-h-[240px] overflow-y-auto pr-1">
                    {item.description || 'Tidak ada deskripsi tambahan.'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 mt-5">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-[#6F4E37] text-white font-bold text-xs rounded-xl active:scale-[0.99] transition-transform text-center"
                >
                  Tutup Pratinjau
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}