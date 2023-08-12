import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { type FC } from "react";
import { Header, Footer, BottomNavigation } from "@/components";
import Provider from "@/components/provider/Provider";

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
      <body
        className={`${inter.className} flex flex-col h-screen items-center`}
      >
        <Provider>
          <Header />
          {children}
          <BottomNavigation />
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
