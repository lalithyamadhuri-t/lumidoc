import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Compress PDF Online Free | Lumidoc PDF Compressor",
  description:
    "Compress PDF files online for free. Reduce PDF size quickly without losing quality with Lumidoc PDF Compressor.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6654563293753791"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}