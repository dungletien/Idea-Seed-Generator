import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Providers } from "@/components/Provider";

export const metadata: Metadata = {
  title: "Idea Seed Generator - IOTA dApp",
  description: "Users propose ideas; others support to grow them",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
