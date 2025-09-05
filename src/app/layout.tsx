import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { getConfig } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig();

  return {
    metadataBase: new URL(config.domain),
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords?.join(", "),
    authors: [{ name: config.name }],
    creator: config.name,
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.description,
    },
    icons: {
      icon: config.seo.favicon || "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getConfig();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider config={config}>{children}</ThemeProvider>
        <Analytics config={config.analytics} />
      </body>
    </html>
  );
}
