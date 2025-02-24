import { ReactQueryProvider } from "@/libs/reactQuery/ReactQueryProvider";
import { Inter as FontSans } from "next/font/google";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import "./globals.css";
import { cn } from "@/libs/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={cn(
          "scroll-custom bg-black-0 scroll-smooth min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
