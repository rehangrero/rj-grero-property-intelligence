import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RJ Grero Property Intelligence",
  description: "Global Property Market Intelligence Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0f1e] text-gray-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
