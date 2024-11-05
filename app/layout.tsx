import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import ClientProvider from "@/hoc/ClientProvider";
import { Toaster } from "@/components/ui/sonner";

const font = Roboto({
  weight : ['100','300','400','500','700','900'],
  subsets : ['latin'],
})


export const metadata: Metadata = {
  title: "로그인 인증 연습용",
  description: "로그인 인증 연습 시스템입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className + ' antialiased'}>
        <ClientProvider>
          {children}
          {/* 알람 기능 추가 라이브러리!  */}
          <Toaster />
        </ClientProvider>
      </body>
    </html>
  );
}
