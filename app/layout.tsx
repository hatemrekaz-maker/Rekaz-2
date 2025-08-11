import "./globals.css";
import { Metadata } from "next";
import { Providers } from "@/lib/providers";
export const metadata: Metadata = { title: "Rekaz Field PWA", manifest: "/manifest.json" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Providers>
          <main className="container" style={{maxWidth:1100, margin:'0 auto', padding:16}}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}