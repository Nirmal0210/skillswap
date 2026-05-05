import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "material-symbols/outlined.css";

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillSwap - Swap skills with your community",
  description:
    "A platform to connect with others and exchange skills in a fun and engaging way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfitSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
