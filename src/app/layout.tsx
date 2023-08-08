import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { type FC } from "react";
import { Header, Footer, BottomNavigation } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recomm App",
  description: "The place to sell and buy your next favorite thing.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col items-center p-4`}>
        <Header />
        {children}
        <BottomNavigation />
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
