'use client';

import { useState, useMemo, memo } from 'react';
import Image from 'next/image';
import { User, Sparkles, Award } from 'lucide-react';

const PEMBINA_CATEGORIES = [
  'pembina utama',
  'guru agama',
  'pembina pendamping'
];

const PENASIHAT_ROLES_STRUCTURE = [
  { key: 'pelindung', label: 'Pelindung / Penasihat' },
  { key: 'pembina', label: 'Guru Pembina Kerohanian' }
];

const getSeksiTheme = (category) => {
  const lower = category?.toLowerCase() || '';
  if (
    lower.includes('utama') || 
    lower.includes('pelindung') || 
    lower.includes('kepala') || 
    lower.includes('penasihat')
  ) {
    return { 
      borderAccent: 'border-b-[#D4AF37]', 
      badge: 'bg-[#FFFDF4] text-[#B8860B] border-[#F5E6C4]',
      tapeBg: 'from-[#D4AF37]/25 via-[#F5E6C4]/40 to-[#D4AF37]/15'
    };
  }
  return { 
    borderAccent: 'border-b-[#5C3A21]', 
    badge: 'bg-[#FAF6F0] text-[#5C3A21] border-[#E8DFD5]',
    tapeBg: 'from-[#5C3A21]/15 via-[#E8DFD5]/35 to-[#5C3A21]/10'
  };
};

// ─── KARTU POLAROID DENGAN FOTO LEBIH KECIL ───
const PolaroidCard = memo(({ member, idx, theme }) => {
  const [imgError, setImgError] = useState(false);
  const memberName = member?.description || member?.name || 'Nama Pelayan';

  const craftStyle = useMemo(() => {
    const tapeTransforms = [
      '-rotate-3 left-[24%] -top-1.5', 
      'rotate-2 left-[40%] -top-1', 
      '-rotate-1 left-[20%] -top-1.5', 
      'rotate-3 left-[35%] -top-1.5'
    ];
    const baseRotates = [
      'rotate-[-1deg] sm:rotate-[-1.5deg]',
      'rotate-[1deg] sm:rotate-[2deg]',
      'rotate-[-1.5deg] sm:rotate-[-2deg]',
      'rotate-[1.5deg]'
    ];
    const pinPositions = [
      'top-0.5 right-0.5', 
      'top-0.5 left-0.5', 
      'bottom-8 right-0.5', 
      'top-1 right-1'
    ];
    
    const seed = (idx + memberName.length) % 4;
    
    const tapeColors = [
      'bg-[#E8D5B5] border-[#D4C0A5]',
      'bg-[#D4AF37]/20 border-[#D4AF37]/40',
      'bg-[#C9B8A8] border-[#B8A796]',
      'bg-[#F5E6D3] border-[#E8D5C4]'
    ];
    
    return {
      tape: tapeTransforms[seed],
      rotateClass: baseRotates[seed],
      pin: pinPositions[seed],
      tapeColor: tapeColors[seed % tapeColors.length],
      clipTape: seed % 2 === 0 
        ? 'polygon(2% 0%, 98% 2%, 100% 96%, 0% 100%)' 
        : 'polygon(0% 2%, 100% 0%, 98% 100%, 2% 98%)',
      shadow: seed % 2 === 0 
        ? 'shadow-[3px_6px_15px_rgba(92,58,33,0.05)]' 
        : 'shadow-[4px_8px_20px_rgba(92,58,33,0.03)]'
    };
  }, [idx, memberName]);

  const imageUrl = member?.avatar_url || member?.image_url;

  return (
    <div className="w-full group perspective-1000">
      <div
        className={`relative bg-[#FCFAF2] border border-[#EDE7DC] px-1.5 sm:px-2 pt-2 sm:pt-3 pb-1.5 sm:pb-2 flex flex-col items-center text-center rounded-sm transition-all duration-700 ease-out transform-gpu border-b-[3px] sm:border-b-[4px] ${theme?.borderAccent || 'border-b-[#5C3A21]'} ${craftStyle.rotateClass} ${craftStyle.shadow} group-hover:shadow-[8px_20px_40px_rgba(92,58,33,0.1)] group-hover:-translate-y-2 group-hover:rotate-y-4 group-hover:rotate-0`}
      >
        <div className="absolute inset-0 bg-[#F7F4EB] border border-[#EAE3D5] rounded-sm -z-10 translate-x-0.5 translate-y-0.5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform-gpu" />

        {/* Selotip lebih kecil */}
        <div 
          style={{ clipPath: craftStyle.clipTape }}
          className={`absolute w-6 sm:w-10 h-2.5 sm:h-3.5 ${craftStyle.tapeColor} border border-dashed border-black/[0.05] shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-transform duration-500 group-hover:scale-105 ${craftStyle.tape}`} 
        />

        {/* Pin kecil */}
        <div className={`absolute w-1 h-1 rounded-full bg-[#8C7662]/20 border border-white/40 shadow-[0_1px_3px_rgba(0,0,0,0.03)] ${craftStyle.pin}`}>
          <div className="w-0.5 h-0.5 rounded-full bg-[#D4AF37]/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* ─── FOTO LEBIH KECIL ─── */}
        <div className="relative aspect-square w-full max-w-[120px] sm:max-w-[150px] mx-auto bg-[#F3EFE6] border border-[#E2DBCD] p-0.5 mb-1 flex-shrink-0 shadow-[inset_0_1px_4px_rgba(0,0,0,0.03)] rounded-xs overflow-hidden">
          <div className="relative w-full h-full bg-[#FAF9F5] shadow-inner">
            {imageUrl && !imgError ? (
              <Image
                src={imageUrl}
                alt={memberName}
                fill
                sizes="(max-width: 640px) 20vw, 120px"
                className="object-cover filter saturate-[80%] sepia-[10%] transition-all duration-700 group-hover:saturate-100 group-hover:sepia-0 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#A38A75]/20 bg-[#FAF6F0]">
                <User size={14} className="stroke-[1.2] sm:size-[18px]" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 pointer-events-none" />
          </div>
        </div>

        {/* Info lebih ringkas */}
        <div className="w-full min-w-0 px-0.5 relative z-10 flex flex-col items-center">
          <span className={`text-[5px] sm:text-[7px] font-bold tracking-wider sm:tracking-[0.1em] px-1 sm:px-1.5 py-0.5 rounded-sm ${theme?.badge || 'bg-[#FAF6F0] text-[#5C3A21]'} border uppercase inline-block mb-0.5 whitespace-normal leading-tight text-center break-words w-full shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]`}>
            {member?.role || member?.category || 'Pembina'}
          </span>
          
          <h4 className="text-[8px] sm:text-[11px] font-bold text-[#362113] tracking-tight leading-tight w-full break-words font-serif group-hover:text-[#8C5A36] transition-colors line-clamp-2">
            {memberName}
          </h4>
          
          <div className="w-1/3 h-[1px] bg-[#D4AF37]/10 mt-0.5 group-hover:w-1/2 transition-all duration-500" />
        </div>

        {/* Stempel kecil */}
        <div className="absolute bottom-0.5 right-1 text-[3px] font-mono font-black text-[#D4AF37]/15 uppercase tracking-widest rotate-12 pointer-events-none">
          ARSIP
        </div>
      </div>
    </div>
  );
});

PolaroidCard.displayName = 'PolaroidCard';

// ─── KOMPONEN UTAMA ───
export default function GuruAgamaSection({ initialTeachers = [] }) {
  const [activeTab] = useState('Semua');

  const { penasihatGrouped, totalPenasihatCount, pembinaGrouped } = useMemo(() => {
    const safeMembers = Array.isArray(initialTeachers) ? initialTeachers : [];

    const penasihatGroup = PENASIHAT_ROLES_STRUCTURE.reduce((acc, roleObj) => {
      acc[roleObj.key] = safeMembers.filter(
        (member) => member?.category?.toLowerCase().trim() === roleObj.key
      );
      return acc;
    }, {});

    const penasihatCount = Object.values(penasihatGroup).reduce((sum, list) => sum + list.length, 0);

    const pembinaGroup = PEMBINA_CATEGORIES.reduce((acc, category) => {
      const target = category.toLowerCase().replace('pembina', '').replace('guru', '').trim();
      
      const filtered = safeMembers.filter((member) => {
        const dbCategory = member?.category?.toLowerCase().trim() || '';
        if (target === 'utama' && category.toLowerCase().includes('pembina')) {
          return dbCategory.includes('pembina utama');
        }
        if (dbCategory.includes('pembina utama') && !category.toLowerCase().includes('pembina')) {
          return false;
        }
        return dbCategory.includes(target);
      });

      const sortedMembers = [...filtered].sort((a, b) => {
        const catA = a?.category?.toLowerCase() || '';
        const catB = b?.category?.toLowerCase() || '';
        const isKorA = catA.includes('utama') ? 1 : 0;
        const isKorB = catB.includes('utama') ? 1 : 0;
        return isKorB - isKorA; 
      });

      acc[category] = sortedMembers;
      return acc;
    }, {});

    return {
      penasihatGrouped: penasihatGroup,
      totalPenasihatCount: penasihatCount,
      pembinaGrouped: pembinaGroup
    };
  }, [initialTeachers]);

  return (
    <div className="space-y-16 sm:space-y-24 max-w-7xl mx-auto px-2 sm:px-6 py-6 selection:bg-[#5C3A21]/10 selection:text-[#362113] bg-[#FCF9F6] bg-[radial-gradient(ellipse_at_center,_#F5F0E8_0%,_#ECE5D9_100%)]">
      
      {/* HEADER */}

      <div className="space-y-20 sm:space-y-28">

        {/* ─── 1. KLASTER PENASIHAT ─── */}
        {(activeTab === 'Semua' || activeTab === 'Penasihat') && totalPenasihatCount > 0 && (
          <div className="w-full py-1 animate-fade-in duration-500">
            <div className="relative pt-10 sm:pt-14 w-full max-w-5xl mx-auto border-t-4 border-double border-[#D4AF37]/30">
              
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#D4AF37] text-white text-[8px] sm:text-[10px] font-black px-5 sm:px-7 py-1 sm:py-1.5 shadow-[0_4px_12px_rgba(212,175,55,0.2)] uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-1.5 border-2 border-[#4A2F1D]">
                <Sparkles size={10} className="fill-white text-white" />
                Struktur Penasihat
              </div>

              <div className="space-y-10 sm:space-y-16 w-full">
                {PENASIHAT_ROLES_STRUCTURE.map((roleObj) => {
                  const roleMembers = penasihatGrouped[roleObj.key] || [];
                  if (roleMembers.length === 0) return null;
                  const theme = getSeksiTheme('pelindung');

                  return (
                    <div key={roleObj.key} className="space-y-4">
                      <div className="flex items-center justify-center gap-3 px-4">
                        <div className="w-6 h-[1px] bg-[#D4AF37]/30" />
                        <h5 className="text-[#A38A75] font-serif text-xs sm:text-sm italic font-medium tracking-wide flex items-center gap-1.5">
                          <Award size={12} className="text-[#D4AF37]" />
                          {roleObj.label}
                        </h5>
                        <div className="w-6 h-[1px] bg-[#D4AF37]/30" />
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-3 px-1 w-full mx-auto max-w-5xl">
                        {roleMembers.map((member, idx) => (
                          <PolaroidCard 
                            key={member?.id || `penasihat-${roleObj.key}-${idx}`} 
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

        {/* ─── 2. KLASTER PEMBINA ─── */}
        {PEMBINA_CATEGORIES.map((category) => {
          if (activeTab !== 'Semua' && activeTab !== category) return null;

          const displayMembers = pembinaGrouped[category] || [];
          if (displayMembers.length === 0) return null;
          const theme = getSeksiTheme(category);

          return (
            <div key={category} className="w-full transition-all duration-300">
              <div className="border-2 border-[#EADCC7] rounded-2xl sm:rounded-[2rem] p-3 sm:p-8 bg-gradient-to-b from-[#FAF8F2] to-[#F5F1E6] relative pt-12 sm:pt-16 w-full max-w-5xl mx-auto shadow-[0_12px_40px_rgba(92,58,33,0.01),inset_0_1px_0_rgba(255,255,255,0.6)]">
                
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#5C3A21] text-[#FCFAF2] text-[8px] sm:text-[10px] font-extrabold px-4 sm:px-6 py-1 sm:py-1.5 rounded-sm shadow-[0_4px_10px_rgba(92,58,33,0.12)] uppercase tracking-[0.15em] whitespace-nowrap border-2 border-[#D4AF37]/30">
                  {category}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-3 px-1 w-full mx-auto">
                  {displayMembers.map((member, idx) => (
                    <PolaroidCard 
                      key={member?.id || `pembina-${category}-${idx}`} 
                      member={member} 
                      idx={idx} 
                      theme={theme}
                    />
                  ))}
                </div>

                <div className="absolute bottom-2 right-3 text-[6px] font-mono text-[#D4AF37]/20 uppercase tracking-widest">
                  verified
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}