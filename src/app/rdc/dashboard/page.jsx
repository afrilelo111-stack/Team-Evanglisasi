// app/admin/dashboard/page.jsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";
import AdminNav from "../components/Nav";
import { Calendar } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/rdc");

  // Fetch paralel data
  const [komentarResult, itemsResult] = await Promise.all([
    supabase.from("komentar").select("id"),
    supabase.from("gallery").select("*").order("created_at", { ascending: false }),
  ]);

  const totalKomentar = komentarResult.data?.length || 0;
  const initialItems = itemsResult.data || [];
  const totalItems = initialItems.length;

  const serverDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AdminNav pageTitle="Dashboard">
      {/* ─── BANNER IDENTITAS ─── */}
      <header className="bg-white border border-[#3D2A1C]/5 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(74,47,29,0.02)] mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-50 border border-stone-200/60 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#3D2A1C]/60 uppercase">
                Soli Deo Gloria — Administrasi Internal
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-[#3D2A1C] leading-none">
              Evangelisasi <span className="italic font-normal text-[#6F4E37]">Archive</span>
            </h1>
            <p className="text-xs md:text-sm text-stone-500 font-medium max-w-xl leading-relaxed">
              Pusat kurasi visual teologis, manajemen metadata media publik, dan pencatatan warta digital Team Evangelisasi SMK Negeri 3 Manado.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-stone-50/50 border border-stone-200/40 rounded-xl p-4 self-start md:self-center">
            <div className="w-10 h-10 rounded-lg bg-[#3D2A1C] flex items-center justify-center text-stone-100 font-serif font-bold text-lg">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-0.5">
              <span className="block text-[9px] font-sans font-black uppercase tracking-widest text-stone-400">Petugas Log</span>
              <span className="block text-xs font-mono font-bold text-[#6F4E37]">{user.email}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── DOCK METRIK ─── */}
      <section className="bg-white border border-[#3D2A1C]/5 rounded-2xl shadow-[0_4px_20px_rgba(74,47,29,0.02)] overflow-hidden mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#3D2A1C]/5">
          <div className="p-6 lg:p-8 space-y-2">
            <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-wider block">Registrasi Data</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-serif font-bold tracking-tight">{totalItems}</span>
              <span className="text-[10px] font-sans font-medium text-stone-400 uppercase">Arsip</span>
            </div>
          </div>

          <div className="p-6 lg:p-8 space-y-2">
            <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-wider block">Interaksi Publik</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-serif font-bold tracking-tight">{totalKomentar}</span>
              <span className="text-[10px] font-sans font-medium text-stone-400 uppercase">Tanggapan</span>
            </div>
          </div>

          <div className="p-6 lg:p-8 space-y-3">
            <span className="text-[10px] font-sans font-bold text-[#6F4E37] uppercase tracking-wider block">Status Konektivitas</span>
            <div className="flex items-center gap-2 bg-emerald-50/60 border border-emerald-100 px-2.5 py-1 rounded w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-800">Live Database</span>
            </div>
          </div>

          <div className="p-6 lg:p-8 space-y-1.5 bg-stone-50/30">
            <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-wider block">Kalender Kerja</span>
            <div className="flex items-center gap-2 text-xs font-medium text-[#3D2A1C]/80">
              <Calendar size={14} className="text-stone-400" />
              <span>{serverDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KONTEN UTAMA (DashboardClient) ─── */}
      <DashboardClient initialItems={initialItems} />
    </AdminNav>
  );
}