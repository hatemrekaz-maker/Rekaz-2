import "./globals.css";
import { Metadata } from "next";
import { Providers } from "@/lib/providers";

export const metadata: Metadata = {
  title: "Rekaz Field PWA",
  description: "Offline-first field records for Oman Oil (WO) and NAMA (WNSC).",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Rekaz Field PWA",
  },
  formatDetection: { telephone: false },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#0f4c81" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>
        <Providers>
          <header className="topbar">
            <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
              <strong className="brand-grad" style={{fontSize:20}}>Rekaz</strong>
              <nav style={{display:'flex',gap:8}}>
                <a className="badge" href="/dashboard">لوحة التحكم</a>
                <a className="badge" href="/wo">WO</a>
                <a className="badge" href="/wnsc">WNSC</a>
                <a className="badge" href="/settings">الإعدادات</a>
              </nav>
            </div>
          </header>
          <main className="container">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
