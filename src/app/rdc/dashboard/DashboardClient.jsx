/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState, useMemo, transition } from 'react';
import { createClient } from '@/lib/supabase/client';
import ItemForm from '../components/ItemForm';
import ItemCard, { ItemCategoryFilter } from '../components/ItemCard'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileImage,
  Plus, 
  X, 
  AlertTriangle, 
  Film,
  SlidersHorizontal,
  FolderOpen,
  Sparkles
} from 'lucide-react';

export default function DashboardClient() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Semua'); 
  const [brokenImages, setBrokenImages] = useState({}); 
  const supabase = createClient();

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery') 
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setItems(data);
      }
    } catch (err) {
      console.error("Gagal sinkronisasi data arsip:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      await fetchItems();
    };
    if (isMounted) loadData();
    return () => { isMounted = false; };
  }, []);

  const handleDelete = async (itemId) => {
    if (!confirm("Konfirmasi: Hapus dokumentasi ini secara permanen dari basis data?")) return;
    const { error } = await supabase.from('gallery').delete().eq('id', itemId); 
    if (!error) fetchItems();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
    document.getElementById('konsol-evangelisasi')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setIsFormOpen(false);
  };

  const handleImageError = (src) => {
    setBrokenImages((prev) => ({ ...prev, [src]: true }));
  };

  const { totalGambar, totalVideo } = useMemo(() => {
    const gambar = items.filter(item => !(/\.(mp4|mkv|mov)$/i.test(item.image_url)) && !item.image_url?.includes('/videos/')).length;
    const video = items.filter(item => (/\.(mp4|mkv|mov)$/i.test(item.image_url)) || item.image_url?.includes('/videos/')).length;
    return { totalGambar: gambar, totalVideo: video };
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'Semua') return items;
    return items.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase());
  }, [items, selectedCategory]);

  if (loading) {
    return (
      <div className="space-y-8 py-6">
        <div className="h-[74px] bg-stone-200/40 rounded-xl border border-stone-200/60 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="space-y-4 border border-stone-200/60 rounded-xl p-4 bg-white">
              <div className="aspect-[4/3] bg-stone-200/40 rounded-lg animate-pulse" />
              <div className="h-4 bg-stone-200/50 rounded w-2/3 animate-pulse" />
              <div className="h-3 bg-stone-200/40 rounded w-1/2 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12" id="konsol-evangelisasi">
      
      {/* ─── 1. HUB WORKSPACE & SUB-HEADER (Asimetris & High-Contrast) ─── */}
      <div className="bg-white border border-[#3D2A1C]/10 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:border-[#3D2A1C]/20">
        
        {/* Sektor Metrik Internal */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em] block">Segmentasi Berkas</span>
            <div className="flex items-center gap-1.5 text-xs text-[#3D2A1C] font-semibold">
              <Sparkles size={12} className="text-[#D4AF37]" />
              <span>Katalog Aktif Team</span>
            </div>
          </div>
          
          <div className="h-6 w-[1px] bg-stone-200 hidden sm:block" />

          <div className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-center transition-colors group-hover:bg-[#6F4E37]/5">
              <FileImage size={14} className="text-[#6F4E37]" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-stone-400 uppercase tracking-wider">Foto Terdata</p>
              <p className="font-serif font-bold text-sm text-[#3D2A1C]">{totalGambar}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-center transition-colors group-hover:bg-[#D4AF37]/5">
              <Film size={14} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-stone-400 uppercase tracking-wider">Motion Video</p>
              <p className="font-serif font-bold text-sm text-[#3D2A1C]">{totalVideo}</p>
            </div>
          </div>

          {editingItem && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-mono rounded-md tracking-tight flex items-center gap-1.5"
            >
              <span className="w-1 h-1 rounded-full bg-amber-500 animate-ping" />
              Mode Revisi: #{editingItem.id.toString().substring(0, 5).toUpperCase()}
            </motion.div>
          )}
        </div>

        {/* Tombol Trigger Form (Gaya Minimalis Bold) */}
        <button
          onClick={() => isFormOpen ? handleCancelEdit() : setIsFormOpen(true)}
          className={`px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm ${
            isFormOpen 
              ? 'bg-stone-100 hover:bg-stone-200 text-[#3D2A1C] border border-stone-300' 
              : 'bg-[#3D2A1C] hover:bg-[#1C130D] text-white'
          }`}
        >
          {isFormOpen ? (
            <>
              <X size={14} /> Tutup Penel
            </>
          ) : (
            <>
              <Plus size={14} className="text-[#D4AF37]" /> Registrasi Media
            </>
          )}
        </button>
      </div>

      {/* ─── 2. FORM KONSOL UTAMA (Clean & Spasial) ─── */}
      <AnimatePresence mode="wait">
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border-2 border-[#3D2A1C] rounded-2xl p-8 shadow-md"
          >
            <div className="flex items-center gap-2.5 mb-8 pb-4 border-b border-stone-100">
              <span className="w-2 h-2 bg-[#6F4E37] rounded-full" />
              <h3 className="text-xs uppercase tracking-[0.2em] font-black text-[#3D2A1C]">
                {editingItem ? "Spesifikasi Pembaruan Data" : "Penyimpanan Khidmat Berkas Baru"}
              </h3>
            </div>
            
            <ItemForm
              itemToEdit={editingItem}
              onCancelEdit={handleCancelEdit}
              onSuccess={() => {
                fetchItems();
                handleCancelEdit();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 3. KOMPARASI FILTER & GRID UTAMA ─── */}
      <div className="space-y-8">
        
        {/* Bar Filter yang Menyatu */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-stone-200/60 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-100 rounded-lg text-stone-500">
              <SlidersHorizontal size={14} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">Penyaringan Lintasan</span>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-bold">
                <FolderOpen size={12} className="text-[#6F4E37]" />
                <span>Arsip Terpilih: <span className="text-[#3D2A1C] font-serif italic lowercase font-normal">{selectedCategory}</span></span>
              </div>
            </div>
          </div>
          
          <ItemCategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />
        </div>

        {/* Counter Status Ringkas */}
        <div className="flex justify-end">
          <span className="text-[10px] font-mono font-bold bg-stone-100 text-stone-500 px-2.5 py-1 rounded-md border border-stone-200/40">
            {filteredItems.length} Records Terbaca
          </span>
        </div>

        {/* INTEGRASI DISPLAY GRID */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-28 border border-dashed border-stone-200 rounded-2xl bg-stone-50/50"
            >
              <AlertTriangle size={24} className="mx-auto text-stone-300 mb-3" />
              <p className="text-xs font-serif italic text-stone-400 max-w-xs mx-auto leading-relaxed">
                Katalog kosong. Tidak ditemukan data dokumentasi pelayanan untuk parameter &quot;{selectedCategory}&quot;.
              </p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:shadow-md hover:border-[#6F4E37]/30 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex-grow">
                    <ItemCard
                      item={{
                        ...item,
                        image_url: brokenImages[item.image_url] ? "/kegiatan/jumat.png" : item.image_url
                      }}
                      onEdit={handleEdit}
                      onDelete={() => handleDelete(item.id)}
                      onError={() => handleImageError(item.image_url)}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}