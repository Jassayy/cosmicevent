import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
     subsets: ["latin"],
});

export const metadata: Metadata = {
     title: "Cosmic Event Tracker",
     description: "Browse Nasa Near-Earth-Objects and compare stats.",
};

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en" suppressHydrationWarning>
               <body className={`${inter.className} antialiased`}>
                    <Header />
                    <main className="container py-6">{children}</main>
                    <footer className="container py-10 text-sm opacity-80">
                         <div className="flex items-center justify-between">
                              <p>Developed by @Jas — Cosmic Event Tracker</p>
                              <p>
                                   Data:{" "}
                                   <a
                                        className="underline"
                                        href="https://api.nasa.gov"
                                   >
                                        NASA Open APIs
                                   </a>
                              </p>
                         </div>
                    </footer>
               </body>
          </html>
     );
}
