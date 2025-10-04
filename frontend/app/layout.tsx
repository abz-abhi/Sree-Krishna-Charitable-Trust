// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper"; // Client wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sree Krishna Charitable Trust | Old Age Home with Care & Love",
  description:
    "Sree Krishna Charitable Trust provides an old age home for the most needy with maximum comfort, love, and care. Supporting the elderly who need dignity in their final stage of life.",
  keywords: [
    "Sree Krishna Charitable Trust",
    "old age home",
    "charity Kerala",
    "non profit",
    "elderly care",
    "Santhi Bhavan",
    "charitable trust India",
    "NGO Palakkad",
    "donation Kerala",
  ],
  openGraph: {
    title: "Sree Krishna Charitable Trust | Old Age Home with Care & Love",
    description:
      "We provide comfort and dignity to the elderly who need care, love, and support. Join us in our mission.",
    url: "https://sreekrishnacharitabletrusttpba.com",
    siteName: "Sree Krishna Charitable Trust",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sree Krishna Charitable Trust - Old Age Home",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sree Krishna Charitable Trust",
    description:
      "A charitable trust in Kerala providing old age home care with love and dignity.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-poppins antialiased max-w-[2200px]`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
