// components/dashboard/AdminNav.jsx
'use client';

import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '../logout/actions';
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  Settings,
  LogOut,
  Bell,
  Menu,
  ChevronDown,
  User,
  Sparkles,
  Bot,
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/rdc/dashboard', icon: LayoutDashboard },
  { name: 'AI Settings', href: '/rdc/settings', icon: Bot },
];

function Sidebar({ isOpen, toggleSidebar, pathname }) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
    });
  };

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#4A2F1D]/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar utama */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-[#FCF9F6] border-r-4 border-[#E8D5C4] shadow-[8px_0_20px_rgba(74,47,29,0.06)]
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto lg:sticky lg:top-0 lg:h-screen
        `}
      >
        {/* ─── HEADER SIDEBAR ─── */}
        <div className="flex items-center gap-3 px-6 py-5 border-b-4 border-[#D4AF37] flex-shrink-0">
          <div className="w-10 h-10 bg-[#D4AF37] border-2 border-[#4A2F1D] flex items-center justify-center shadow-[3px_3px_0_0_#E8D5C4]">
            <Sparkles size={18} className="text-[#4A2F1D]" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-[#4A2F1D] leading-tight">
              Dashboard TE
            </h1>
            <p className="text-[9px] font-mono text-[#8B5A33] tracking-widest uppercase">
              Panel Administrasi
            </p>
          </div>
        </div>

        {/* ─── MENU NAVIGASI ─── */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider
                  border-2 transition-all duration-200
                  ${isActive
                    ? 'bg-[#D4AF37] border-[#4A2F1D] text-[#4A2F1D] shadow-[4px_4px_0_0_#4A2F1D]'
                    : 'bg-white border-[#E8D5C4] text-[#4A2F1D] hover:border-[#D4AF37] hover:shadow-[3px_3px_0_0_#E8D5C4]'
                  }
                `}
              >
                <Icon size={18} className="flex-shrink-0" />
                <span>{item.name}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 bg-[#4A2F1D] rotate-45" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ─── FOOTER SIDEBAR: LOGOUT ─── */}
        <div className="px-4 py-4 border-t-4 border-[#E8D5C4] flex-shrink-0">
          <button
            onClick={handleLogout}
            disabled={isPending}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider
              bg-white border-2 border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-400
              shadow-[3px_3px_0_0_#FEE2E2] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <LogOut size={18} />
            <span>{isPending ? 'Keluar...' : 'Keluar'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function TopBar({ toggleSidebar, pageTitle }) {
  const [isPending, startTransition] = useTransition();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'Anggota baru: Andi Saputra', time: '5 menit lalu' },
    { id: 2, text: 'Gambar baru diupload ke Galeri', time: '1 jam lalu' },
  ];

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
    });
  };

  return (
    <header className="bg-[#FCF9F6] border-b-4 border-[#E8D5C4] px-4 md:px-8 py-3 flex items-center justify-between shadow-[0_4px_12px_rgba(74,47,29,0.02)] sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg border-2 border-[#C5B5A5] hover:border-[#D4AF37] text-[#4A2F1D] transition-colors cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-lg md:text-xl font-serif font-bold text-[#4A2F1D] tracking-tight">
          {pageTitle || 'Dashboard'}
        </h2>
      </div>

      <div className="flex items-center gap-3 relative">
        {/* Notifikasi */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-lg border-2 border-[#C5B5A5] hover:border-[#D4AF37] text-[#4A2F1D] transition-colors relative cursor-pointer"
            aria-label="Notifikasi"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white">
                {notifications.length}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border-2 border-[#C5B5A5] shadow-[6px_6px_0_0_#E8D5C4] z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b-2 border-[#E8D5C4]">
                <span className="text-[10px] font-mono font-bold text-[#4A2F1D] uppercase tracking-widest">
                  Notifikasi
                </span>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className="px-4 py-2 hover:bg-[#FAF8F5] border-b border-[#E8D5C4]/40">
                  <p className="text-xs text-[#4A2F1D] font-medium">{n.text}</p>
                  <p className="text-[9px] text-[#8B5A33] font-mono">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-lg border-2 border-[#C5B5A5] hover:border-[#D4AF37] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#4A2F1D] flex items-center justify-center text-white font-bold text-sm border-2 border-[#D4AF37]">
              <User size={16} />
            </div>
            <span className="hidden sm:inline text-xs font-bold text-[#4A2F1D]">Admin</span>
            <ChevronDown size={14} className="text-[#8B5A33]" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-[#C5B5A5] shadow-[6px_6px_0_0_#E8D5C4] z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
              <button
                onClick={handleLogout}
                disabled={isPending}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left"
              >
                <LogOut size={14} />
                <span>{isPending ? 'Keluar...' : 'Keluar'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default function AdminNav({ children, pageTitle = 'Dashboard' }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex">
      {/* Sidebar - sticky di desktop */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} pathname={pathname} />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} pageTitle={pageTitle} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#FDFBF7]">
          {children}
        </main>
      </div>
    </div>
  );
}