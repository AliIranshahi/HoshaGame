import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "هوشا | گیم",
  description: "Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-[26px]"></div>


      {children}



    </>

  );
}
