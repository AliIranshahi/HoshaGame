import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import { ReduxProvider } from "@/redux/feauture/Provider";
import { ToastContainer } from "react-toastify";
export const dynamic = 'force-dynamic'; // ✅
import "@fontsource/orbitron";
import Head from "next/head";



export const metadata: Metadata = {
  title: {
    default: "هوشا",
    template: "هوشا | %s"
  },
  description: "Hosha Game For Who Love Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR">
      <body className="">

        {/*  Header */}
        <ReduxProvider>
          <Header />
        </ReduxProvider>
     


        {/*--- */}

        {children}
        <ToastContainer className={"fixed top-0 right-0 z-50"} style={{ fontFamily: "f-f-vazir-medium" }} />
      </body>

    </html>
  );
}
