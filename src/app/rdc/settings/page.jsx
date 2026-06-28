// app/rdc/settings/page.jsx (atau app/admin/ai-settings/page.jsx)
'use client';

import { useState, useEffect } from "react";
import {
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Bot,
  Sparkles,
  Cpu,
  Zap,
  FileText,
} from "lucide-react";
// Gunakan path absolut untuk AdminNav, pastikan file ada di components/dashboard/AdminNav.jsx
import AdminNav from "../components/Nav";

export default function AISettingsPage() {
  const [formData, setFormData] = useState({
    enabled: true,
    model: "llama-3.1-8b-instant", // Diperbarui: Menggunakan model aktif terbaru sebagai default awal
    system_prompt: "",
    temperature: 0.7,
    max_output_tokens: 1000,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: "", message: "" }), 4000);
  };

  // ─── FETCH SETTINGS ───
  useEffect(() => {
    let isMounted = true;

    async function fetchSettings() {
      try {
        const res = await fetch("/api/admin/ai-settings");
        const resData = await res.json();

        if (isMounted && resData.success && resData.data) {
          // Fallback otomatis jika data model di database masih menyimpan model usang
          let savedModel = resData.data.model;
          if (!savedModel || savedModel === "llama3-8b-8192") {
            savedModel = "llama-3.1-8b-instant";
          } else if (savedModel === "llama3-70b-8192") {
            savedModel = "llama-3.3-70b-versatile";
          }

          setFormData({
            enabled: resData.data.enabled,
            model: savedModel,
            system_prompt: resData.data.system_prompt || "",
            temperature: resData.data.temperature || 0.7,
            max_output_tokens: resData.data.max_output_tokens || 1000,
          });
        }
      } catch (err) {
        if (isMounted) {
          showNotification("error", "Gagal memuat pengaturan AI.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  // ─── HANDLE SUBMIT ───
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/ai-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        showNotification("success", "Pengaturan AI berhasil diperbarui!");
      } else {
        throw new Error(data.message || "Gagal menyimpan.");
      }
    } catch (err) {
      showNotification("error", err.message || "Gagal menyimpan perubahan.");
    } finally {
      setIsSaving(false);
    }
  };

  // ─── LOADING ───
  if (isLoading) {
    return (
      <AdminNav pageTitle="Pengaturan AI">
        <div className="flex h-96 items-center justify-center gap-3 text-stone-400">
          <RefreshCw className="animate-spin" size={20} />
          <span className="text-sm font-medium">Memuat pengaturan AI...</span>
        </div>
      </AdminNav>
    );
  }

  // ─── RENDER ───
  return (
    <AdminNav pageTitle="Pengaturan AI">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex items-center gap-4 pb-6 border-b-4 border-[#D4AF37]">
          <div className="p-3 border-2 border-[#4A2F1D] bg-[#FCF9F6] shadow-[4px_4px_0_0_#D4AF37]">
            <Bot size={22} className="text-[#4A2F1D]" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#4A2F1D] tracking-tight">
              Konfigurasi <span className="text-[#D4AF37]">AI</span>
            </h1>
            <p className="text-xs font-mono text-[#8B5A33] tracking-widest uppercase mt-0.5">
              Kelola otak dan perilaku Model AI untuk Chatbot Team Evangelisasi
            </p>
          </div>
        </div>

        {/* NOTIFIKASI */}
        {notification.message && (
          <div
            className={`flex items-center gap-3 p-4 border-2 rounded-xl text-sm font-medium shadow-[3px_3px_0_0_#E8D5C4] ${
              notification.type === "success"
                ? "bg-[#F0F7EE] border-[#A3C9A1] text-[#2D5A27]"
                : "bg-[#FDF0EE] border-[#E8B4B0] text-[#7A2E2A]"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 size={18} className="text-[#2D5A27]" />
            ) : (
              <AlertCircle size={18} className="text-[#7A2E2A]" />
            )}
            {notification.message}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-[#E8D5C4] rounded-2xl p-6 md:p-8 shadow-[8px_8px_0_0_#D1C0B0] space-y-8"
        >
          {/* Status AI */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#FAF8F5] border-2 border-[#E8D5C4] rounded-xl">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#D4AF37]" />
                <span className="font-bold text-sm text-[#4A2F1D]">Status Fitur AI</span>
              </div>
              <p className="text-xs text-[#8B5A33] font-medium">
                Aktifkan atau nonaktifkan chatbot AI secara global di frontend
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, enabled: !formData.enabled })}
              className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 border-2 ${
                formData.enabled
                  ? "bg-[#D4AF37] border-[#4A2F1D]"
                  : "bg-[#E8D5C4] border-[#C5B5A5]"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                  formData.enabled ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Model & Parameter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-[#4A2F1D] uppercase tracking-widest flex items-center gap-1.5">
                <Cpu size={13} className="text-[#D4AF37]" /> Model AI
              </label>
              <select
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full bg-white border-2 border-[#D1C0B0] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#D4AF37] focus:shadow-[4px_4px_0_0_#E8D5C4] transition-all text-[#4A2F1D] shadow-[2px_2px_0_0_#E8D5C4]"
              >
                {/* Diperbarui: Daftar Model Groq Terbaru yang Valid & Aktif */}
                <optgroup label="Groq Cloud API (Aktif & Direkomendasikan)">
                  <option value="llama-3.1-8b-instant">Meta Llama 3.1 8B ⚡ (Super Cepat)</option>
                  <option value="llama-3.3-70b-versatile">Meta Llama 3.3 70B 🧠 (Sangat Pintar)</option>
                  <option value="gemma2-9b-it">Google Gemma 2 9B 💎</option>
                </optgroup>
                
                <optgroup label="Google AI Studio (Cadangan)">
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                </optgroup>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-[#4A2F1D] uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#D4AF37]" /> Creativity (Temp)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="2"
                value={formData.temperature}
                onChange={(e) =>
                  setFormData({ ...formData, temperature: parseFloat(e.target.value) })
                }
                className="w-full bg-white border-2 border-[#D1C0B0] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#D4AF37] focus:shadow-[4px_4px_0_0_#E8D5C4] transition-all text-[#4A2F1D] shadow-[2px_2px_0_0_#E8D5C4]"
              />
              <span className="text-[9px] font-mono text-[#8B5A33]">
                0 = Faktual &nbsp;·&nbsp; 2 = Sangat Kreatif
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-[#4A2F1D] uppercase tracking-widest flex items-center gap-1.5">
                <FileText size={13} className="text-[#D4AF37]" /> Max Output Tokens
              </label>
              <input
                type="number"
                value={formData.max_output_tokens}
                onChange={(e) =>
                  setFormData({ ...formData, max_output_tokens: parseInt(e.target.value) })
                }
                className="w-full bg-white border-2 border-[#D1C0B0] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#D4AF37] focus:shadow-[4px_4px_0_0_#E8D5C4] transition-all text-[#4A2F1D] shadow-[2px_2px_0_0_#E8D5C4]"
              />
              <span className="text-[9px] font-mono text-[#8B5A33]">
                Maksimum panjang respons AI
              </span>
            </div>
          </div>

          {/* System Prompt */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <label className="text-[10px] font-mono font-bold text-[#4A2F1D] uppercase tracking-widest flex items-center gap-1.5">
                <FileText size={13} className="text-[#D4AF37]" /> System Prompt (Knowledge Base)
              </label>
              <span className="text-[9px] font-mono text-[#8B5A33]">
                Gunakan format teks biasa atau Markdown
              </span>
            </div>
            <textarea
              rows={10}
              value={formData.system_prompt}
              onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
              placeholder="Tulis instruksi peran AI, biodata, visi-misi, dan informasi penting tentang Team Evangelisasi di sini..."
              className="w-full bg-white border-2 border-[#D1C0B0] rounded-xl px-4 py-4 text-sm font-medium focus:outline-none focus:border-[#D4AF37] focus:shadow-[4px_4px_0_0_#E8D5C4] transition-all text-[#4A2F1D] placeholder-[#B5A392] shadow-[2px_2px_0_0_#E8D5C4] resize-y min-h-[180px] leading-relaxed"
            />
          </div>

          {/* Tombol Simpan */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t-2 border-[#E8D5C4]">
            <div className="flex items-center gap-2 text-[10px] text-[#8B5A33] font-mono">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
              Perubahan akan langsung berlaku di frontend
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 bg-[#D4AF37] border-2 border-[#4A2F1D] text-[#4A2F1D] font-bold text-xs px-6 py-3 rounded-xl shadow-[4px_4px_0_0_#4A2F1D] hover:shadow-[2px_2px_0_0_#4A2F1D] hover:bg-[#C5A059] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminNav>
  );
}