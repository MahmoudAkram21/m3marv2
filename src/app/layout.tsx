import type { Metadata } from "next";
import "./globals.css";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "معمار للتطوير العقاري",
  description: "معمار للتطوير العقاري",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return <html lang="en">{children}</html>;
}
