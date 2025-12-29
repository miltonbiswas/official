// src/app/layout.tsx
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar"; // Ensure Navbar is imported
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavbarUI from "@/components/NavbarUI";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Milton Biswas | Digital HQ",
  description: "Full Stack Architect & Pharmacist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NavbarUI user={undefined} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}