import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingChat from "@/components/ai/FloatingChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── METADATA YANG MENARIK & SEO OPTIMIZED (UPDATED) ───
export const metadata = {
  title: {
    default: "Team Evangelisasi (Pelsis) - SMKN 3 Manado",
    template: "%s | Team Evangelisasi (Pelsis)"
  },
  description: "Wadah Pelayanan Siswa Kristen (Pelsis) / Team Evangelisasi resmi di SMK Negeri 3 Manado. Tempat bertumbuh dalam iman, karakter Kristiani, dan aksi sosial nyata.",
  keywords: [
    "Team Evangelisasi SMK 3 Manado",
    "SMK 3 Manado Team Evangelisasi", 
    "Pelsis SMKN 3 Manado",
    "SMKN 3 Manado Pelsis",
    "Pelayanan Siswa Kristen",
    "Evang SMKN 3 Manado", 
    "Komunitas Kristen SKM 3 Manado", 
    "Pelayanan Anak Muda Manado"
  ],
  authors: [{ name: "Team Evangelisasi SMKN 3 Manado" }],
  creator: "Team Evangelisasi Developer",
  metadataBase: new URL("https://pelsis-te.vercel.app"), 
  
  // Tampilan saat link website dibagikan di WhatsApp, Facebook, dll.
  openGraph: {
    title: "Team Evangelisasi (Pelsis) - SMKN 3 Manado",
    description: "Beri yang terbaik untuk kemuliaan Tuhan. Mari bergabung bersama Pelayanan Siswa Kristen (Pelsis) / Team Evangelisasi SMKN 3 Manado.",
    url: "https://pelsis-te.vercel.app",
    siteName: "Team Evangelisasi (Pelsis) SMKN 3 Manado",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo/logo1.png",
        width: 1200,
        height: 630,
        alt: "Logo Resmi Team Evangelisasi / Pelsis SMKN 3 Manado",
      },
    ],
  },

  // Tampilan khusus jika link dibagikan di Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "Team Evangelisasi (Pelsis) - SMKN 3 Manado",
    description: "Wadah pertumbuhan karakter Pelayanan Siswa Kristen dan media pelayanan kreatif di SMKN 3 Manado.",
    images: ["/logo/logo1.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <FloatingChat />
      </body>
    </html>
  );
}