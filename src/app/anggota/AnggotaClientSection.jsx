'use client';

import { useState, useMemo, memo } from 'react';
import Image from 'next/image';
import { User, Sparkles } from 'lucide-react';

const SEKSI_CATEGORIES = [
  'Kordinator umum',
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

// ─── SUB-KOMPONEN KARTU POLAROID MOBILE-CENTERED ───
const PolaroidCard = memo(({ member, idx, theme }) => {
  const [imgError, setImgError] = useState(false);
  const memberName = member?.description || member?.name || 'Nama Pelayan';

  const craftStyle = useMemo(() => {
    const tapeTransforms = ['-rotate-3 left-[28%] -top-2', 'rotate-2 left-[46%] -top-1.5', '-rotate-1 left-[24%] -top-2', 'rotate-3 left-[40%] -top-2'];
    const baseRotates = ['rotate-[-1deg] sm:rotate-[-1.5deg]', 'rotate-[1deg] sm:rotate-[2deg]', 'rotate-[-1.5deg] sm:rotate-[-2deg]', 'rotate-[1.5deg]'];
    const pinPositions = ['top-2 right-2', 'top-2 left-2', 'bottom-12 right-2', 'top-3 right-3'];
    
    const seed = (idx + memberName.length) % 4;
    return {
      tape: tapeTransforms[seed],
      rotateClass: baseRotates[seed],
      pin: pinPositions[seed],
      clipTape: seed % 2 === 0 
        ? 'polygon(1% 0%, 99% 2%, 100% 96%, 0% 100%)' 
        : 'polygon(0% 2%, 100% 0%, 98% 100%, 2% 98%)'
    };
  }, [idx, memberName]);

  const imageUrl = member?.avatar_url || member?.image_url;

  return (
    // Menggunakan w-[46%] di mobile agar pembagian 2 kolom flex tetap seimbang dan presisi di tengah
    <div className="w-[46%] sm:w-56 flex-shrink-0 group perspective-1000">
      <div
        className={`relative bg-[#FCFAF2] border border-[#EDE7DC] px-3 pt-5 pb-4 flex flex-col items-center justify-center text-center rounded-sm transition-all duration-700 ease-out transform-gpu border-b-[4px] sm:border-b-[5px] ${theme?.borderAccent || 'border-b-[#5C3A21]'} ${craftStyle.rotateClass} shadow-[3px_8px_18px_rgba(92,58,33,0.06)] group-hover:shadow-[10px_25px_50px_rgba(92,58,33,0.12)] group-hover:-translate-y-3 group-hover:rotate-y-6 group-hover:rotate-0`}
      >
        <div className="absolute inset-0 bg-[#F7F4EB] border border-[#EAE3D5] rounded-sm -z-10 translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform-gpu" />

        <div 
          style={{ clipPath: craftStyle.clipTape }}
          className={`absolute w-12 sm:w-15 h-4.5 sm:h-5.5 bg-gradient-to-r backdrop-blur-[1.5px] border-x border-dashed border-black/[0.05] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform duration-500 group-hover:scale-105 ${craftStyle.tape} ${theme?.tapeBg || 'from-white/40 to-white/20'}`} 
        />

        <div className={`absolute w-1.5 h-1.5 rounded-full bg-[#8C7662]/10 border border-white/30 shadow-xs ${craftStyle.pin}`} />

        <div className="relative aspect-square w-full bg-[#F3EFE6] border border-[#E2DBCD] p-1.5 mb-3.5 flex-shrink-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.04)] rounded-xs overflow-hidden">
          <div className="relative w-full h-full bg-[#FAF9F5] shadow-inner">
            {imageUrl && !imgError ? (
              <Image
                src={imageUrl}
                alt={memberName}
                fill
                sizes="(max-width: 640px) 40vw, 144px"
                className="object-cover filter saturate-[85%] sepia-[10%] transition-all duration-700 group-hover:saturate-100 group-hover:sepia-0 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#A38A75]/30 bg-[#FAF6F0]">
                <User size={34} className="stroke-[1.2]" />
              </div>
            )}
          </div>
        </div>

        <div className="w-full min-w-0 px-0.5 relative z-10">
          <span className={`text-[8px] sm:text-[9.5px] font-bold tracking-[0.12em] px-2.5 py-0.5 rounded-full ${theme?.badge || 'bg-[#FAF6F0] text-[#5C3A21]'} border uppercase inline-block mb-2 max-w-full truncate`}>
            {member?.role || member?.category || 'Pelayan'}
          </span>
          
          <h4 className="text-[12px] sm:text-base font-bold text-[#362113] tracking-tight leading-snug min-h-[2.8rem] sm:min-h-0 flex items-center justify-center break-words font-serif group-hover:text-[#8C5A36] transition-colors">
            {memberName}
          </h4>
        </div>
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
      const target = category.toLowerCase().replace('seksie', '').replace('kordinator', '').trim();
      
      const filtered = safeMembers.filter((member) => {
        const dbCategory = member?.category?.toLowerCase().trim() || '';
        if (target === 'umum' && category.toLowerCase().includes('kordinator')) {
          return dbCategory.includes('kordinator umum');
        }
        if (dbCategory.includes('kordinator umum') && !category.toLowerCase().includes('kordinator')) {
          return false;
        }
        return dbCategory.includes(target);
      });

      const sortedMembers = [...filtered].sort((a, b) => {
        const catA = a?.category?.toLowerCase() || '';
        const catB = b?.category?.toLowerCase() || '';
        const isKorA = catA.includes('kordinator') ? 1 : 0;
        const isKorB = catB.includes('kordinator') ? 1 : 0;
        return isKorB - isKorA; 
      });

      acc[category] = sortedMembers;
      return acc;
    }, {});

    return {
      intiMembersGrouped: intiGrouped,
      totalIntiCount: intiCount,
      seksiMembersGrouped: seksiGrouped
    };
  }, [initialMembers]);

  return (
    <div className="space-y-20 sm:space-y-28 max-w-7xl mx-auto px-2 sm:px-8 py-8 selection:bg-[#5C3A21]/10 selection:text-[#362113]">
      <div className="space-y-24 sm:space-y-32 text-center">

        {/* ─── 1. KLASTER INTI TE (DI-TENGAN KAN UNTUK MOBILE) ─── */}
        {(activeTab === 'Semua' || activeTab === 'Inti TE') && totalIntiCount > 0 && (
          <div className="w-full py-2 animate-fade-in duration-500">
            <div className="relative pt-12 sm:pt-16 w-full max-w-5xl mx-auto border-t border-dashed border-[#DFD8CC]">
              
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#D4AF37] text-white text-[9.5px] sm:text-[11px] font-black px-7 sm:px-8 py-1.5 sm:py-2 rounded-full shadow-[0_4px_15px_rgba(212,175,55,0.2)] uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-1.5">
                <Sparkles size={11} className="fill-white text-white" />
                Pengurus Inti
              </div>

              <div className="space-y-12 sm:space-y-20 w-full">
                {INTI_ROLES_STRUCTURE.map((roleObj) => {
                  const roleMembers = intiMembersGrouped[roleObj.key] || [];
                  if (roleMembers.length === 0) return null;
                  const theme = getSeksiTheme('inti');

                  return (
                    <div key={roleObj.key} className="space-y-6">
                      <div className="flex items-center justify-center gap-4 px-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40" />
                        <h5 className="text-[#A38A75] font-serif text-sm sm:text-base italic font-medium tracking-wide">
                          {roleObj.label}
                        </h5>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40" />
                      </div>
                      
                      {/* Menggunakan flex dan justify-center agar posisi kartu selalu simetris di tengah HP */}
                      <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 sm:gap-10 px-1 w-full mx-auto max-w-sm sm:max-w-full">
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

        {/* ─── 2. KLASTER SEKSI LAINNYA ─── */}
        {SEKSI_CATEGORIES.map((category) => {
          if (activeTab !== 'Semua' && activeTab !== category) return null;

          const displayMembers = seksiMembersGrouped[category] || [];
          if (displayMembers.length === 0) return null;
          const theme = getSeksiTheme(category);

          return (
            <div key={category} className="w-full transition-all duration-300">
              <div className="border border-[#EADCC7] rounded-[2rem] p-4 sm:p-14 bg-gradient-to-b from-[#FAF8F2] to-[#F5F1E6] relative pt-16 sm:pt-18 w-full max-w-5xl mx-auto shadow-[0_20px_50px_rgba(92,58,33,0.015),inset_0_1px_0_rgba(255,255,255,0.6)]">
                
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#5C3A21] text-[#FCFAF2] text-[9px] sm:text-[11px] font-extrabold px-6 sm:px-8 py-1.5 sm:py-2 rounded-sm shadow-[0_4px_12px_rgba(92,58,33,0.15)] uppercase tracking-[0.18em] whitespace-nowrap">
                  {category}
                </div>

                {/* Grid 2 kolom seimbang untuk halaman seksi biasa */}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 sm:gap-8 items-center">
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