import "./globals.css";
import React from "react";
import Header from "@/components/app/header";
import Sidebar from "@/components/app/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>miniGPT</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className="flex flex-col h-screen bg-cover bg-center bg-background bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-none"> 
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
