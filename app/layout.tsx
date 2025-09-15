import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Currency Transfer Comparison",
  description: "Compare money transfer services to find the best exchange rates and lowest fees for your international transfers.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
<html lang="en" className="h-full">
  <body
    className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
  >
    {/* Fixed gradient background */}
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900" />
    <div className="relative z-10 min-h-screen">
      {children}
    </div>
  </body>
</html>

  );
}
