import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Atmos | Curated Visual Atmospheres",
  description: "A premium, cinematic collection of currated desktop wallpapers.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} dark`}>
      <body className="antialiased font-sans bg-[#0B0B0F] text-zinc-100 flex flex-col min-h-screen">
        <SmoothScrollProvider>
          {children}
          {modal}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
