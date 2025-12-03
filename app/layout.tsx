import type { Metadata } from "next";
import { Geist, Geist_Mono, Itim, Pridi, Prompt } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "block",
});

const pridi = Pridi({
  variable: "--font-pridi",
  subsets: ["latin", "thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal"],
  display: "block",
});

const itim = Itim({
  variable: "--font-itim",
  subsets: ["latin", "thai"],
  weight: ["400"],
  style: ["normal"],
  display: "block",
});

export const metadata: Metadata = {
  title: "การ์ดวันพ่อ - บ้านบางแค",
  description: "ร่วมกันเขียนการ์ดวันพ่อให้คุณปู่และคุณตาในบ้านบางแค",
  openGraph: {
    title: "การ์ดวันพ่อ - บ้านบางแค",
    description: "ร่วมกันเขียนการ์ดวันพ่อให้คุณปู่และคุณตาในบ้านบางแค",
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${prompt.variable} ${pridi.variable} ${itim.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
