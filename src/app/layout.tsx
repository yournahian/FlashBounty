import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlashBounty 3D | Rialo Native RISC-V Hero",
  description: "Bounty Faster. Verify Instantly. Rialo native event-driven oracle-less architecture for open-source developer crypto payouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark h-full bg-black text-white">
      <body
        suppressHydrationWarning
        className={`${jakarta.variable} ${playfair.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-black text-white antialiased selection:bg-white/20 selection:text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
