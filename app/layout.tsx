import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";

export const metadata: Metadata = {
  title: "Sors | Gerencie suas finanças com inteligência",
  description: "Sors é um gerenciador de finanças pessoais que ajuda você a organizar, planejar e crescer financeiramente com praticidade e segurança.",
  keywords: ["finanças pessoais", "controle financeiro", "planejamento financeiro", "gestão de dinheiro", "Sors", "app de finanças"],
  authors: [{ name: "Sors Team" }],
  creator: "Sors",
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
