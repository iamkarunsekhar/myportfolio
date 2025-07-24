import type { Metadata } from "next";
import { Playfair_Display, Quicksand } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/StarCanvas";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"]
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: 'Karun Sekhar | Senior Software Engineer',
  description: 'Portfolio of a senior software engineer using Next.js, React, and Three.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script type="module" src="https://unpkg.com/ionicons@7.2.0/dist/ionicons/ionicons.esm.js"></script>
        <script noModule src="https://unpkg.com/ionicons@7.2.0/dist/ionicons/ionicons.js"></script>
      </head>
      <body
        className={`${quicksand.variable} ${playfair.variable} antialiased`}
      >
        <StarsCanvas />
        {children}
      </body>
    </html>
  );
}
