'use-client'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/ui/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Lesson Generator",
  description: "Generate lessons using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText transition-colors duration-300`}
      >
        <ThemeProvider>
          <div className=" flex flex-col h-screen">
            <Navbar />
            <main className="">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
