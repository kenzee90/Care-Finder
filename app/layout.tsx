import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { NavbarComponent } from "@/components/navbarComponent";
import FooterComponent from "@/components/footerComponent";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Care-Finder",
  description: " Care-Finder"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        
        <AuthContextProvider>{children}</AuthContextProvider>
        
      </body>
    </html>
  );
}
