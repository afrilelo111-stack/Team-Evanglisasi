/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { uploadMedia } from '@/lib/uploadMedia';
import { addItem, updateItem } from '@/app/rdc/dashboard/actions';
import {
  UploadCloud,
  Image as ImageIcon,
  FileText,
  Check,
  X,
  AlertCircle,
  Sparkles,
  Film,
  Layers,
} from 'lucide-react';

const category_OPTIONS = ['Project', 'TE', 'Natal', 'Paskah', 'BC','Inti TE','seksie umum', 'seksie ibadah', 'seksie kreatif', 'seksie dokum', 'seksie perlengkapan', 'seksie doa & sharing', 'seksie humas'];

export default function ItemForm({
  itemToEdit = null,
  onCancelEdit = () => {},
  onSuccess = () => {},
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [description, setDescription] = useState('');
  const [category, setcategory] = useState('Project');
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState('gambar'); 

  const isEditing = !!itemToEdit;

  // ─── SINKRONISASI PROP KE STATE ───
  useEffect(() => {
    if (isEditing && itemToEdit) {
      setDescription(itemToEdit.description || '');
      setcategory(itemToEdit.category || 'Project');
      setMediaPreview(itemToEdit.image_url || null);
      
      const tipeAsli = itemToEdit.image_url?.endsWith('.mp4') || itemToEdit.image_url?.includes('/videos/') ? 'video' : 'gambar';
      setMediaType(tipeAsli);
    } else {
      resetFormLokal();
    }
  }, [itemToEdit, isEditing]);

  function handleMediaChange(e) {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      
      const isVideoFile = file.type.startsWith('video/');
      setMediaType(isVideoFile ? 'video' : 'gambar');

      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function resetFormLokal() {
    setDescription('');
    setcategory('Project');
    setMediaPreview(null);
    setMediaFile(null);
    setMediaType('gambar');
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    let finalImageUrl = isEditing ? itemToEdit.image_url : null;
    let finalType = mediaType;

    if (mediaFile) {
      try {
        const uploadResult = await uploadMedia(mediaFile);
        finalImageUrl = uploadResult.publicUrl;
        finalType = uploadResult.type;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        return;
      }
    }

    if (!finalImageUrl) {
      setError('Berkas gambar atau video wajib ditentukan.');
      setIsLoading(false);
      return;
    }

    const submitFormData = new FormData();
    submitFormData.set('imageUrl', finalImageUrl);
    submitFormData.set('description', description);
    submitFormData.set('category', category);
    submitFormData.set('type', finalType); 

    let result;
    try {
      if (isEditing) {
        result = await updateItem(itemToEdit.id, submitFormData);
      } else {
        result = await addItem(submitFormData);
      }
    } catch (err) {
      setError('Terjadi kendala pada API Server: ' + err.message);
      setIsLoading(false);
      return;
    }

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      if (onSuccess) onSuccess();

      if (!isEditing) {
        resetFormLokal();
      } else {
        onCancelEdit();
      }
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-6xl mx-auto bg-[#FCF9F6] border-2 border-[#E8D5C4] shadow-[8px_8px_0_0_#D1C0B0] md:shadow-[12px_12px_0_0_#D1C0B0] p-4 md:p-10 space-y-6 md:space-y-8 transition-all"
    >
      {/* ─── DEKORASI KARTU (hanya tampil di layar sedang ke atas) ─── */}
      <div className="absolute -top-3 -left-3 w-12 h-12 bg-[#D4AF37] border-2 border-[#4A2F1D] rotate-12 hidden md:block" />
      <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#4A2F1D] border-2 border-[#D4AF37] -rotate-6 hidden md:block" />

      {/* ─── HEADER ─── */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 md:pb-6 border-b-4 border-[#D4AF37]">
        <div className="flex items-center gap-3 md:gap-5">
          <div className="p-2 md:p-3 border-2 border-[#4A2F1D] bg-[#FCF9F6] shadow-[3px_3px_0_0_#D4AF37] md:shadow-[4px_4px_0_0_#D4AF37]">
            {isEditing ? (
              <ImageIcon size={18} className="md:size-[22] text-[#4A2F1D]" />
            ) : (
              <UploadCloud size={18} className="md:size-[22] text-[#4A2F1D]" />
            )}
          </div>

          <div>
            <h3 className="text-lg md:text-2xl font-serif font-bold text-[#4A2F1D] tracking-tight leading-tight">
              {isEditing ? 'Modifikasi Karya' : 'Publikasikan Media'}
            </h3>
            <p className="text-[9px] md:text-xs font-mono font-semibold text-[#8B5A33] tracking-widest mt-0.5 md:mt-1.5 uppercase">
              {isEditing ? 'Perbaharui arsip visual' : 'Tambahkan arsip visual baru'}
            </p>
          </div>
        </div>

        {isEditing && (
          <div className="self-start sm:self-center inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 border-2 border-[#D4AF37] bg-[#FCF9F6] text-[#4A2F1D] text-[9px] md:text-[10px] font-bold tracking-widest uppercase shadow-[2px_2px_0_0_#E8D5C4] md:shadow-[3px_3px_0_0_#E8D5C4]">
            <Sparkles size={10} className="md:size-[12] text-[#D4AF37]" />
            <span>Mode Edit</span>
          </div>
        )}
      </div>

      {/* ─── ERROR ─── */}
      {error && (
        <div className="flex items-start gap-2 md:gap-3 p-3 md:p-4 border-2 border-[#D4AF37] bg-[#FCF9F6] text-[#4A2F1D] text-[11px] md:text-xs font-medium shadow-[3px_3px_0_0_#E8D5C4] md:shadow-[4px_4px_0_0_#E8D5C4]">
          <AlertCircle size={16} className="md:size-[18] text-[#D4AF37] flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">{error}</p>
        </div>
      )}

      {/* ─── KONTEN UTAMA ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-start">
        
        {/* ─── KOLOM KIRI: DROPZONE ─── */}
        <div className="lg:col-span-2 space-y-1.5 md:space-y-2">
          <label className="text-[10px] md:text-[11px] font-mono font-bold text-[#4A2F1D] uppercase tracking-widest">
            Sampul Foto / Video
          </label>

          <div className="relative border-2 border-dashed border-[#C5B5A5] bg-[#F8F2EB] p-3 md:p-4 flex flex-col items-center justify-center min-h-[180px] md:min-h-[300px] overflow-hidden shadow-inner hover:border-[#D4AF37] transition-all duration-300">
            {mediaPreview ? (
              <div className="absolute inset-0 group">
                {mediaType === 'video' ? (
                  <video 
                    src={mediaPreview} 
                    className="w-full h-full object-cover" 
                    controls 
                    muted
                  />
                ) : (
                  <Image
                    src={mediaPreview}
                    alt="Preview Konten"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                    unoptimized={mediaPreview.startsWith('data:')}
                  />
                )}

                <div className="absolute inset-0 bg-[#4A2F1D]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4 md:p-6">
                  <div className="border-2 border-white p-2 md:p-2.5 mb-1.5 md:mb-2">
                    <UploadCloud size={16} className="md:size-[18] text-white" />
                  </div>
                  <p className="text-white font-bold text-[10px] md:text-xs tracking-widest">Ganti File</p>
                </div>
              </div>
            ) : (
              <div className="text-center p-4 md:p-6">
                <div className="border-2 border-[#D1C0B0] p-3 md:p-4 w-14 md:w-16 h-14 md:h-16 flex items-center justify-center mx-auto mb-2 md:mb-3 text-[#4A2F1D]">
                  <Film size={20} className="md:size-[24]" />
                </div>
                <h4 className="text-xs md:text-sm font-serif font-bold text-[#4A2F1D]">Seret atau Pilih Berkas</h4>
                <p className="text-[9px] md:text-[10px] text-[#8B5A33] max-w-[160px] md:max-w-[180px] mx-auto leading-relaxed font-mono mt-1">
                  JPG, PNG, MP4 (Maks 50MB)
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*,video/*" 
              onChange={handleMediaChange}
              required={!isEditing}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
            />
          </div>
        </div>

        {/* ─── KOLOM KANAN: FORM ─── */}
        <div className="lg:col-span-3 space-y-4 md:space-y-6">
          
          {/* KATEGORI */}
          <div className="space-y-1 md:space-y-1.5">
            <label className="text-[10px] md:text-[11px] font-mono font-bold text-[#4A2F1D] uppercase tracking-widest flex items-center gap-1.5 md:gap-2">
              <Layers size={12} className="md:size-[14] text-[#D4AF37]" /> Klasifikasi
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                className="w-full border-2 border-[#D1C0B0] bg-white px-3 md:px-4 py-3 md:py-3.5 text-xs md:text-sm font-medium focus:outline-none focus:border-[#D4AF37] focus:shadow-[3px_3px_0_0_#E8D5C4] md:focus:shadow-[4px_4px_0_0_#E8D5C4] transition-all text-[#4A2F1D] appearance-none shadow-[2px_2px_0_0_#E8D5C4] md:shadow-[2px_2px_0_0_#E8D5C4] cursor-pointer"
              >
                {category_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <span className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8B5A33] text-base md:text-lg font-bold">▼</span>
            </div>
          </div>

          {/* DESKRIPSI */}
          <div className="space-y-1 md:space-y-1.5">
            <label className="text-[10px] md:text-[11px] font-mono font-bold text-[#4A2F1D] uppercase tracking-widest flex items-center gap-1.5 md:gap-2">
              <FileText size={12} className="md:size-[14] text-[#D4AF37]" /> Catatan Memori
            </label>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tulis detail momen, deskripsi karya, atau rangkuman keseruan yang tertangkap lensa..."
                className="w-full border-2 border-[#D1C0B0] bg-white px-3 md:px-4 py-3 md:py-4 text-xs md:text-sm font-medium focus:outline-none focus:border-[#D4AF37] focus:shadow-[3px_3px_0_0_#E8D5C4] md:focus:shadow-[4px_4px_0_0_#E8D5C4] transition-all text-[#4A2F1D] placeholder-[#B5A392] shadow-[2px_2px_0_0_#E8D5C4] md:shadow-[2px_2px_0_0_#E8D5C4] resize-none min-h-[120px] md:min-h-[160px]"
              />
            </div>
          </div>

          {/* ─── TOMBOL AKSI ─── (Stack di mobile) ─── */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-2 md:gap-3 pt-3 md:pt-4 border-t-2 border-[#E8D5C4]">
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  resetFormLokal();
                  onCancelEdit();
                }}
                className="flex items-center justify-center gap-2 border-2 border-[#4A2F1D] bg-[#FCF9F6] text-[#4A2F1D] font-bold text-[11px] md:text-xs px-4 md:px-5 py-2.5 md:py-2.5 shadow-[3px_3px_0_0_#E8D5C4] hover:bg-[#E8D5C4] transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                <X size={14} />
                <span>Batal</span>
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 border-2 border-[#4A2F1D] bg-[#D4AF37] text-[#4A2F1D] font-bold text-[11px] md:text-xs px-5 md:px-6 py-2.5 md:py-2.5 shadow-[4px_4px_0_0_#4A2F1D] hover:bg-[#C5A059] hover:shadow-[2px_2px_0_0_#4A2F1D] transition-all active:scale-95 disabled:opacity-60 cursor-pointer w-full sm:w-auto ${
                isEditing ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-[#4A2F1D]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Check size={14} />
                  <span>{isEditing ? 'Simpan Perubahan' : 'Tayangkan'}</span>
                </>
              )}
            </button>
          </div>
          
        </div>

      </div>
    </form>
  );
}