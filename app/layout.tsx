import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Смарт-Климат — подбор и монтаж кондиционеров в Краснодаре",
  description:
    "Подбор, продажа и монтаж кондиционеров для квартиры, дома и офиса в Краснодаре.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
