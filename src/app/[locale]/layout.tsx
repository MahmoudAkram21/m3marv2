import type { Metadata, ResolvingMetadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { getSiteData, SiteData } from "lib/SiteDataAPI";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <NextIntlClientProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  `}
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </NextIntlClientProvider>
  );
}
