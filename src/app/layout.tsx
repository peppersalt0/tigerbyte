import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";


export const metadata: Metadata = {
  title: "tigerbyte",
  description: "Created by Josh Jung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
            {children}
      </body>
    </html>
  );
}
