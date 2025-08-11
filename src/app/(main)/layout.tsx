import type { Metadata } from "next";
import { ReduxProvider } from '@/redux/feauture/Provider';


export const metadata: Metadata = {
  title: "ورود",
  description: "Signup and Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-[26px]"></div>
      <ReduxProvider>

        {children}
      </ReduxProvider>


    </>

  );
}
