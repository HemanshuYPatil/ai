import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/header";
import { metadataConfig } from "@/lib/config/metadata";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = metadataConfig;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  userScalable: false,
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={font.className}>
          <div className="background" />
          <div className="fixed z-10 inset-0 overflow-y-scroll overflow-x-hidden">
            <div className="min-h-full relative">
              <Header />
              {children}
              <ModalProvider />
              <Toaster
              
                toastOptions={{
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    zIndex: 9999, 
                  },
                }}
              />
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
