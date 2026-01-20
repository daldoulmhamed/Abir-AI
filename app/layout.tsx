import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import GoToTop from "@/components/GoToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abir-AI — The fresh way to use AI",
  description: "Abir-IA helps you find the best AI tools, learn how to use artificial intelligence, and stay updated with the latest AI and digital technology news for work, business, and content creation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
      >
        <Header />
        <NavigationBar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <GoToTop />
      </body>
    </html>
  );
}
