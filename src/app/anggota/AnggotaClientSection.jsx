'use client';

import { useState, useMemo, memo } from 'react';
import Image from 'next/image';
import { User, Sparkles } from 'lucide-react';

const SEKSI_CATEGORIES = [
  'seksie umum',
  'seksie ibadah',
  'seksie kreatif',
  'seksie dokum',
  'seksie perlengkapan',
  'seksie doa & sharing',
  'seksie humas'
];

const INTI_ROLES_STRUCTURE = [
  { key: 'ketua', label: 'Ketua' },
  { key: 'wakil ketua', label: 'Wakil Ketua' },
  { key: 'sekretaris', label: 'Sekretaris' },
  { key: 'wakil sekretaris', label: 'Wakil Sekretaris' },
  { key: 'bendahara', label: 'Bendahara' }
];

const getSeksiTheme = (category) => {
  const lower = category?.toLowerCase() || '';
  if (
    lower.includes('ketua') || 
    lower.includes('sekretaris') || 
    lower.includes('bendahara') || 
    lower.includes('inti')
  ) {
    return { borderAccent: 'border-b-[#D4AF37]', badge: 'bg-[#FFFDF4] text-[#B8860B] border-[#F5E6C4]' };
  }
  return { borderAccent: 'border-b-[#5C3A21]', badge: 'bg-[#FAF6F0] text-[#5C3A21] border-[#E8DFD5]' };
};

// ─── SUB-KOMPONEN KARTU POLAROID SECURE & MEMOIZED ───
const PolaroidCard = memo(({ member, idx, theme }) => {
  const [imgError, setImgError] = useState(false);

  const dynamicStyles = useMemo(() => [
    { rotate: 'rotate-1 md:rotate-1', tape: '-rotate-3 left-1/3', offset: 'pt-5 pb-3' },
    { rotate: '-rotate-1 md:-rotate-2', tape: 'rotate-6 left-1/2', offset: 'pt-3 pb-5' },
    { rotate: 'rotate-2 md:-rotate-1', tape: '-rotate-6 left-1/4', offset: 'pt-4 pb-4' },
    { rotate: '-rotate-2 md:rotate-2', tape: 'rotate-2 left-2/5', offset: 'pt-5 pb-3' }
  ], []);
  
  const style = dynamicStyles[idx % dynamicStyles.length] || dynamicStyles[0];
  const imageUrl = member?.avatar_url || member?.image_url;
  const memberName = member?.description || member?.name || 'Nama Pelayan';

  return (
    <div
      className={`relative bg-white border border-[#E8DFD5]/60 rounded-xl px-2.5 sm:px-4 flex flex-col items-center justify-center text-center shadow-[0_6px_18px_rgba(92,58,33,0.03)] hover:shadow-[0_12px_24px_rgba(92,58,33,0.07)] hover:-translate-y-1 transition-all duration-500 transform border-b-4 ${theme?.borderAccent || 'border-b-[#5C3A21]'} ${style.rotate} ${style.offset} w-[160px] sm:w-56 flex-shrink-0 group mx-auto`}
    >
      {/* Washi Tape Art */}
      <div className={`absolute -top-2.5 ${style.tape} transform -translate-x-1/2 w-9 sm:w-11 h-4 bg-white/50 backdrop-blur-[1.5px] border border-white/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform group-hover:scale-105 group-hover:bg-white/70`} />

      {/* Frame Polaroid - UKURAN FOTO DIPERBESAR DI SINI */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-lg overflow-hidden bg-[#FAF9F5] border border-slate-100 mb-3 flex-shrink-0 shadow-inner">
        {imageUrl && !imgError ? (
          <Image
            src={imageUrl}
            alt={memberName}
            fill
            sizes="(max-width: 640px) 112px, 144px"
            className="object-cover transition-transform duration-700 grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#A38A75]/40 bg-[#FAF6F0]" aria-label="Foto tidak tersedia">
            <User size={36} className="sm:size-10" />
          </div>
        )}
      </div>

      {/* Info Detail */}
      <div className="w-full min-w-0 px-1">
        <span className={`text-[8px] font-bold tracking-widest px-2 py-0.5 rounded ${theme?.badge || 'bg-[#FAF6F0] text-[#5C3A21]'} border uppercase inline-block mb-1 truncate max-w-full`}>
          {member?.role || member?.category || 'Pelayan'}
        </span>
        
        <h4 className="text-[11px] sm:text-sm font-semibold text-[#3D2616] tracking-tight leading-tight min-h-[2.5rem] sm:min-h-0 flex items-center justify-center break-words transition-colors group-hover:text-[#5C3A21]">
          {memberName}
        </h4>
      </div>
    </div>
  );
});

PolaroidCard.displayName = 'PolaroidCard';

export default function AnggotaClientSection({ initialMembers = [] }) {
  const [activeTab] = useState('Semua');

  const { intiMembersGrouped, totalIntiCount, seksiMembersGrouped } = useMemo(() => {
    const safeMembers = Array.isArray(initialMembers) ? initialMembers : [];

    const intiGrouped = INTI_ROLES_STRUCTURE.reduce((acc, roleObj) => {
      acc[roleObj.key] = safeMembers.filter(
        (member) => member?.category?.toLowerCase().trim() === roleObj.key
      );
      return acc;
    }, {});

    const intiCount = Object.values(intiGrouped).reduce((sum, list) => sum + list.length, 0);

    const seksiGrouped = SEKSI_CATEGORIES.reduce((acc, category) => {
      acc[category] = safeMembers.filter(
        (member) => member?.category?.toLowerCase().trim() === category.toLowerCase().trim()
      );
      return acc;
    }, {});

    return {
      intiMembersGrouped: intiGrouped,
      totalIntiCount: intiCount,
      seksiMembersGrouped: seksiGrouped
    };
  }, [initialMembers]);

  return (
    <div className="space-y-12 sm:space-y-16 max-w-7xl mx-auto px-2 sm:px-6">
      <div className="space-y-16 sm:space-y-24 text-center">

        {/* ─── 1. BLOK INTI TE ─── */}
        {(activeTab === 'Semua' || activeTab === 'Inti TE') && totalIntiCount > 0 && (
          <div className="w-full py-2 animate-fade-in">
            <div className="relative pt-6 sm:pt-10 w-full max-w-5xl mx-auto">
              
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#D4AF37] text-white text-[10px] sm:text-[11px] font-bold px-6 sm:px-8 py-1.5 sm:py-2 rounded-full shadow-[0_4px_12px_rgba(212,175,55,0.2)] uppercase tracking-widest whitespace-nowrap flex items-center gap-1.5">
                <Sparkles size={10} className="fill-white" />
                Inti TE
              </div>

              <div className="space-y-10 sm:space-y-14 w-full">
                {INTI_ROLES_STRUCTURE.map((roleObj) => {
                  const roleMembers = intiMembersGrouped[roleObj.key] || [];
                  if (roleMembers.length === 0) return null;
                  const theme = getSeksiTheme('inti');

                  return (
                    <div key={roleObj.key} className="space-y-4">
                      <div className="flex items-center justify-center gap-3 px-6">
                        <span className="h-[1px] flex-1 max-w-[40px] bg-[#E8DFD5]"></span>
                        <div className="text-[#A38A75] font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                          {roleObj.label}
                        </div>
                        <span className="h-[1px] flex-1 max-w-[40px] bg-[#E8DFD5]"></span>
                      </div>
                      
                      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 px-4 w-full mx-auto">
                        {roleMembers.map((member, idx) => (
                          <PolaroidCard 
                            key={member?.id || `inti-${roleObj.key}-${idx}`} 
                            member={member} 
                            idx={idx} 
                            theme={theme} 
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* ─── 2. BLOK SEKSI LAINNYA ─── */}
        {SEKSI_CATEGORIES.map((category) => {
          if (activeTab !== 'Semua' && activeTab !== category) return null;

          const displayMembers = seksiMembersGrouped[category] || [];
          if (displayMembers.length === 0) return null;
          const theme = getSeksiTheme(category);

          return (
            <div key={category} className="w-full px-1 sm:px-0">
              <div className="border border-[#E8DFD5]/60 rounded-2xl p-4 sm:p-8 bg-white/[0.55] backdrop-blur-[6px] relative pt-12 w-full max-w-5xl mx-auto shadow-[0_12px_40px_rgba(92,58,33,0.015)]">
                
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#5C3A21] text-white text-[10px] sm:text-[11px] font-semibold px-6 py-1.5 rounded-full shadow-[0_4px_14px_rgba(92,58,33,0.12)] uppercase tracking-widest whitespace-nowrap">
                  {category}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-1 sm:gap-6 justify-center items-center">
                  {displayMembers.map((member, idx) => (
                    <PolaroidCard 
                      key={member?.id || `seksi-${category}-${idx}`} 
                      member={member} 
                      idx={idx} 
                      theme={theme} 
                    />
                  ))}
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}