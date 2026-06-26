/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
// app/admin/dashboard/DashboardClient.jsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import ItemForm from '../components/ItemForm';
import ItemCard, { ItemCategoryFilter } from '../components/ItemCard'; // Impor filter dari ItemCard
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileImage,
  Layers, 
  PlusCircle, 
  Edit3, 
  Box, 
  AlertCircle,
  Film
} from 'lucide-react';

export default function DashboardClient() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Semua'); // State untuk kontrol filter
  const supabase = createClient();

  // Fetch data disesuaikan dengan nama tabel database anda yaitu 'gallery'
  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery') // SINKRON DB: Nama tabel diganti dari 'items' menjadi 'gallery'
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    const { error } = await supabase.from('gallery').delete().eq('id', itemId); // SINKRON DB: Target tabel 'gallery'
    if (!error) fetchItems();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  // Menghitung statistik media berdasarkan ekstensi berkas di kolom `image_url` database
  const totalGambar = items.filter(item => !item.image_url?.endsWith('.mp4') && !item.image_url?.includes('/videos/')).length;
  const totalVideo = items.filter(item => item.image_url?.endsWith('.mp4') || item.image_url?.includes('/videos/')).length;

  // Memfilter item yang tampil di client-side berdasarkan kategori pilihan user
  const filteredItems = selectedCategory === 'Semua' 
    ? items 
    : items.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase());

  // Kontainer Induk untuk Efek Staggered Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } }
  };

  // ─── STYLISH STONE SKELETON LOADING STATE ───
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] p-4 sm:p-6 lg:p-8 space-y-8 animate-pulse">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-12 bg-stone-200 rounded-2xl w-1/4 border border-stone-200/40" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="h-28 bg-stone-200 rounded-2xl border border-stone-200/40" />
            <div className="h-28 bg-stone-200 rounded-2xl border border-stone-200/40" />
            <div className="h-28 bg-stone-200 rounded-2xl border border-stone-200/40" />
          </div>
          <div className="h-96 bg-stone-200 rounded-3xl border border-stone-200/40" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-stone-800 pb-24 select-none relative overflow-hidden">
      
      {/* PENDARAN CAHAYA DEKORATIF (Menyesuaikan Tema Warna Bumi Team Evangelisasi) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#6F4E37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10 relative z-10"
      >
        
        {/* ─── 1. DYNAMIC WELCOME HEADER ─── */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200/80 pb-6"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[#6F4E37] text-white rounded-xl shadow-md ring-4 ring-[#6F4E37]/10">
              <Layers size={22} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-stone-900">
                Studio Manajemen Inventaris
              </h1>
              <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5 font-bold">
                Pusat kontrol arsip visual, dokumentasi kegiatan, dan sorotan sinematik Evangelisasi Team
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── 2. ANALYTICS STATS CARDS ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card Total Gambar */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="bg-white border border-stone-200/80 p-5 rounded-2xl flex items-center justify-between group hover:border-[#6F4E37]/40 transition-all duration-300 shadow-xs"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 block">Arsip Foto</span>
              <h3 className="text-2xl font-black text-stone-900 tracking-tight">
                {totalGambar} <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-0.5">Katalog</span>
              </h3>
            </div>
            <div className="w-12 h-12 bg-stone-50 text-stone-600 rounded-xl flex items-center justify-center border border-stone-200/60 group-hover:bg-[#6F4E37] group-hover:text-white transition-all duration-300">
              <FileImage size={20} />
            </div>
          </motion.div>

          {/* Card Total Video */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="bg-white border border-stone-200/80 p-5 rounded-2xl flex items-center justify-between group hover:border-[#6F4E37]/40 transition-all duration-300 shadow-xs"
          >
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 block">Sorotan Video</span>
              <h3 className="text-2xl font-black text-stone-900 tracking-tight">
                {totalVideo} <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-0.5">Katalog</span>
              </h3>
            </div>
            <div className="w-12 h-12 bg-stone-50 text-stone-600 rounded-xl flex items-center justify-center border border-stone-200/60 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
              <Film size={20} />
            </div>
          </motion.div>

          {/* Card Status Form Tindakan */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="bg-white border border-stone-200/80 p-5 rounded-2xl flex items-center justify-between group transition-all duration-300 sm:col-span-2 lg:col-span-1 shadow-xs"
          >
            <div className="space-y-1.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 block">Status Operasional</span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${editingItem ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                <h4 className="text-[11px] font-black text-stone-700 max-w-[150px] truncate tracking-wide uppercase">
                  {editingItem ? `Penyuntingan Aktif` : 'Siap Menerima Media'}
                </h4>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
              editingItem 
                ? 'bg-amber-50 text-amber-600 border-amber-200 group-hover:bg-amber-500 group-hover:text-white' 
                : 'bg-emerald-50 text-emerald-600 border-emerald-200 group-hover:bg-emerald-500 group-hover:text-white'
            }`}>
              {editingItem ? <Edit3 size={18} /> : <PlusCircle size={18} />}
            </div>
          </motion.div>
        </div>

        {/* ─── 3. FORM SECTION CONTAINER ─── */}
        <motion.section variants={itemVariants} id="form-section" className="scroll-mt-24">
          <div className={`p-[1px] rounded-[1.8rem] bg-gradient-to-tr transition-all duration-500 ${
            editingItem 
              ? 'from-amber-400 via-orange-400 to-[#6F4E37]' 
              : 'from-stone-200 to-transparent'
          }`}>
            <div className="bg-white rounded-[1.75rem] p-2">
              <ItemForm
                itemToEdit={editingItem}
                onCancelEdit={handleCancelEdit}
                onSuccess={fetchItems}
              />
            </div>
          </div>
        </motion.section>

        {/* ─── 4. GRID DAFTAR ITEM SECTION + FILTER ─── */}
        <motion.section variants={itemVariants} className="space-y-6">
          
          {/* BARIS UTAMA FILTER KATALOG */}
          <ItemCategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />

          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <Box size={16} className="text-[#6F4E37]" />
              <h2 className="text-[11px] font-black text-stone-800 uppercase tracking-widest">Katalog Berkas Multimedia</h2>
            </div>
            <span className="text-[9px] font-mono font-bold bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200 text-stone-500">
              {filteredItems.length} Terfilter
            </span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white border border-stone-200/60 rounded-2xl p-6 max-w-sm mx-auto shadow-xs">
              <div className="w-12 h-12 bg-stone-50 text-stone-400 rounded-xl flex items-center justify-center mx-auto mb-3 border border-stone-200/60">
                <AlertCircle size={20} />
              </div>
              <p className="text-xs text-stone-700 font-black uppercase tracking-wide">Katalog Kosong</p>
              <p className="text-[11px] text-stone-400 mt-1 max-w-[240px] mx-auto leading-relaxed font-medium">
                Tidak ada data dokumentasi dalam kategori &quot;{selectedCategory}&quot;. Coba ganti opsi saringan atau unggah media baru.
              </p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, y: 12 }}
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                    className="h-full"
                  >
                    <ItemCard
                      item={item}
                      onEdit={handleEdit}
                      onDelete={() => handleDelete(item.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.section>

      </motion.div>
    </div>
  );
}