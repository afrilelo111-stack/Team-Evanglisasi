/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Image from 'next/image';
import { useTransition, useState, useRef, useEffect } from 'react';
import { 
  Edit3, 
  Trash2, 
  Calendar, 
  Film, 
  Image as ImageIcon, 
  X, 
  Maximize2, 
  ChevronDown,
  Clock, 
  Eye,
  Tag
} from 'lucide-react';

const KEGIATAN_OPTIONS = ['Semua', 'Natal', 'Paskah', 'BC', 'Umum'];

// ─── KOMPONEN 1: FILTER KATEGORI ───
export function ItemCategoryFilter({ selectedCategory, onCategoryChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full py-4 md:py-5 border-b-4 border-[#D4AF37] flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4" ref={dropdownRef}>
      <div className="space-y-0.5">
        <h4 className="text-[9px] md:text-[10px] font-mono font-black tracking-[0.2em] md:tracking-[0.25em] text-[#4A2F1D] uppercase">
          Kurasi Koleksi
        </h4>
        <p className="text-[10px] md:text-[11px] font-sans text-[#8B5A33] font-medium">
          Filter berdasarkan klasifikasi
        </p>
      </div>

      {/* Dropdown dengan sentuhan "arsip" */}
      <div className="relative w-full sm:min-w-[200px] sm:self-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white border-2 border-[#C5B5A5] px-3 md:px-4 py-2.5 md:py-3 text-[10px] md:text-xs font-bold text-[#4A2F1D] uppercase tracking-widest shadow-[2px_2px_0_0_#E8D5C4] md:shadow-[3px_3px_0_0_#E8D5C4] hover:shadow-[2px_2px_0_0_#D4AF37] hover:border-[#D4AF37] transition-all duration-200"
        >
          <span>{selectedCategory === 'Semua' ? 'Seluruh Arsip' : selectedCategory}</span>
          <ChevronDown size={14} className={`text-[#8B5A33] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-full bg-white border-2 border-[#C5B5A5] shadow-[4px_4px_0_0_#E8D5C4] md:shadow-[6px_6px_0_0_#E8D5C4] z-30 py-1 font-sans animate-in fade-in slide-in-from-top-1 duration-150">
            {KEGIATAN_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onCategoryChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 md:px-4 py-2.5 md:py-2.5 text-[9px] md:text-[10px] tracking-wider uppercase font-bold transition-all flex items-center justify-between ${
                  selectedCategory === opt 
                    ? 'bg-[#4A2F1D] text-white' 
                    : 'text-[#4A2F1D] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>{opt}</span>
                {selectedCategory === opt && <span className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── KOMPONEN 2: KARTU GALERI ───
export default function ItemCard({ item, onEdit, onDelete }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const isVideo = item.type === 'video' || item.image_url?.endsWith('.mp4') || item.image_url?.includes('/videos/');

  return (
    <>
      {/* ─── KARTU BERGAYA "BINGKAI KAYU" ─── */}
      <div className="group bg-white border-2 border-[#C5B5A5] shadow-[4px_4px_0_0_#E8D5C4] md:shadow-[8px_8px_0_0_#E8D5C4] p-2 md:p-3 flex flex-col h-full transition-all duration-300 hover:shadow-[2px_2px_0_0_#D4AF37] md:hover:shadow-[4px_4px_0_0_#D4AF37] hover:border-[#D4AF37]">
        
        {/* ─── AREA MEDIA ─── */}
        <div 
          onClick={() => setIsOpen(true)}
          className="relative w-full aspect-[4/3] overflow-hidden border-2 border-[#E8D5C4] bg-[#FAF8F5] cursor-zoom-in"
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
              alt={item.description || 'Dokumen Visual'}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          {/* ─── BADGE KATEGORI ─── */}
          <div className="absolute top-2 md:top-3 left-2 md:left-3 flex flex-col gap-1 pointer-events-none z-10">
            <span className="bg-[#4A2F1D] text-white text-[7px] md:text-[8px] font-mono font-black tracking-[0.15em] md:tracking-[0.2em] px-2 md:px-2.5 py-0.5 md:py-1 uppercase border border-[#D4AF37]">
              {item.category || 'Umum'}
            </span>
          </div>

          {/* ─── IKON TIPE MEDIA ─── */}
          <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 p-1 md:p-1.5 bg-white border-2 border-[#C5B5A5] text-[#4A2F1D] pointer-events-none z-10">
            {isVideo ? <Film size={10} className="md:size-[12]" /> : <ImageIcon size={10} className="md:size-[12]" />}
          </div>

          {/* ─── OVERLAY "Pratinjau" ─── */}
          <div className="absolute inset-0 bg-[#4A2F1D]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white border-2 border-[#D4AF37] px-2 md:px-3 py-1 md:py-1.5 shadow-[2px_2px_0_0_#4A2F1D] md:shadow-[4px_4px_0_0_#4A2F1D] flex items-center gap-1 md:gap-1.5 text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-[#4A2F1D]">
              <Maximize2 size={10} className="md:size-[11]" />
              <span>Buka</span>
            </div>
          </div>
        </div>

        {/* ─── METADATA ─── */}
        <div className="pt-2 md:pt-3 flex flex-col justify-between flex-grow gap-2 md:gap-3">
          <div className="space-y-1 md:space-y-1.5">
            {item.created_at && (
              <div className="flex items-center gap-1 md:gap-1.5 text-[8px] md:text-[9px] font-mono font-bold text-[#8B5A33] tracking-wider uppercase">
                <Calendar size={9} className="md:size-[10] text-[#D4AF37]" />
                <span>
                  {new Date(item.created_at).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
            <p className="text-[#4A2F1D] text-[10px] md:text-xs font-medium leading-relaxed line-clamp-2">
              {item.description || 'Tanpa keterangan tambahan.'}
            </p>
          </div>

          {/* ─── TOMBOL AKSI ─── */}
          <div className="grid grid-cols-2 gap-1.5 md:gap-2 pt-1.5 md:pt-2 border-t-2 border-[#E8D5C4]">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="flex items-center justify-center gap-1 md:gap-1.5 bg-white border-2 border-[#C5B5A5] shadow-[2px_2px_0_0_#E8D5C4] md:shadow-[3px_3px_0_0_#E8D5C4] hover:shadow-[2px_2px_0_0_#D4AF37] hover:border-[#D4AF37] text-[#4A2F1D] px-2 md:px-3 py-1.5 md:py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Edit3 size={10} className="md:size-[12]" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (confirm('Hapus arsip ini secara permanen?')) {
                  startTransition(() => onDelete(item.id));
                }
              }}
              disabled={isPending}
              className="flex items-center justify-center gap-1 md:gap-1.5 bg-white border-2 border-[#C5B5A5] shadow-[2px_2px_0_0_#E8D5C4] md:shadow-[3px_3px_0_0_#E8D5C4] hover:shadow-[2px_2px_0_0_#D4AF37] hover:border-rose-300 text-[#4A2F1D] hover:text-rose-600 px-2 md:px-3 py-1.5 md:py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-30 cursor-pointer"
            >
              {isPending ? (
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 border-2 border-[#4A2F1D] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Trash2 size={10} className="md:size-[12]" />
                  <span>Hapus</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ─── MODAL "RUANG PAMER" ─── (Mobile: fullscreen, Desktop: popup) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#4A2F1D]/60 p-2 md:p-8 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl bg-white border-4 border-[#C5B5A5] shadow-[8px_8px_0_0_#E8D5C4] md:shadow-[16px_16px_0_0_#E8D5C4] flex flex-col md:flex-row max-h-[98vh] md:max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* ─── SISI KIRI: MEDIA ─── (di mobile: di atas) */}
            <div className="relative bg-[#FAF8F5] flex items-center justify-center aspect-video md:aspect-auto md:w-7/12 border-b-4 md:border-b-0 md:border-r-4 border-[#E8D5C4]">
              {isVideo ? (
                <video src={item.image_url} className="w-full h-full object-contain" controls preload="auto" playsInline autoPlay />
              ) : (
                <div className="relative w-full h-full min-h-[200px] md:min-h-[450px]">
                  <Image src={item.image_url} alt="Tampilan penuh" fill unoptimized className="object-contain" />
                </div>
              )}
            </div>

            {/* ─── SISI KANAN: DESKRIPSI ─── (di mobile: di bawah) */}
            <div className="p-4 md:p-8 bg-white md:w-5/12 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
              <div className="space-y-4 md:space-y-5">
                
                {/* Header Modal */}
                <div className="flex items-center justify-between pb-2 md:pb-3 border-b-2 border-[#D4AF37]">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Eye size={12} className="md:size-[14] text-[#D4AF37]" />
                    <span className="text-[9px] md:text-[10px] font-mono font-black text-[#4A2F1D] uppercase tracking-[0.15em] md:tracking-[0.2em]">
                      Detail Arsip
                    </span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 border-2 border-[#C5B5A5] hover:border-[#D4AF37] text-[#4A2F1D] hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <X size={14} className="md:size-[14]" />
                  </button>
                </div>

                {/* Field Kategori */}
                <div className="space-y-0.5 md:space-y-1">
                  <span className="text-[8px] md:text-[9px] font-mono font-bold text-[#8B5A33] uppercase tracking-wider flex items-center gap-1 md:gap-1.5">
                    <Tag size={10} className="md:size-[12] text-[#D4AF37]" /> Kategori
                  </span>
                  <span className="inline-block bg-[#FAF8F5] border-2 border-[#C5B5A5] text-[#4A2F1D] text-[9px] md:text-[10px] font-bold px-2 md:px-3 py-0.5 md:py-1 uppercase shadow-[2px_2px_0_0_#E8D5C4]">
                    {item.category || 'Umum'}
                  </span>
                </div>
                
                {/* Field Tanggal */}
                {item.created_at && (
                  <div className="space-y-0.5 md:space-y-1">
                    <span className="text-[8px] md:text-[9px] font-mono font-bold text-[#8B5A33] uppercase tracking-wider flex items-center gap-1 md:gap-1.5">
                      <Clock size={10} className="md:size-[12] text-[#D4AF37]" /> Tanggal Entri
                    </span>
                    <div className="flex items-center gap-1 md:gap-1.5 text-[11px] md:text-xs text-[#4A2F1D] font-medium">
                      <span>{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>
                )}

                {/* Deskripsi */}
                <div className="space-y-1 md:space-y-1.5">
                  <span className="text-[8px] md:text-[9px] font-mono font-bold text-[#8B5A33] uppercase tracking-wider">Catatan Kuratorial</span>
                  <p className="text-[#4A2F1D] text-[12px] md:text-sm font-normal leading-relaxed max-h-[120px] md:max-h-[180px] overflow-y-auto pr-1">
                    {item.description || 'Tidak ada keterangan yang disertakan.'}
                  </p>
                </div>

              </div>

              {/* Tombol Tutup */}
              <div className="pt-3 md:pt-4 border-t-2 border-[#E8D5C4] mt-3 md:mt-4">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 md:py-3 bg-[#D4AF37] border-2 border-[#4A2F1D] shadow-[3px_3px_0_0_#4A2F1D] md:shadow-[4px_4px_0_0_#4A2F1D] hover:shadow-[2px_2px_0_0_#4A2F1D] text-[#4A2F1D] font-black text-[10px] md:text-xs tracking-widest uppercase transition-all"
                >
                  Tutup
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}