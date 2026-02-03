import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const dieGrotesk = localFont({
  src: [
    {
      path: "./fonts/die-grotesk.woff2",
      style: "normal",
    },
    {
      path: "./fonts/die-grotesk-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-die-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Someone - Own your name on the internet",
  description:
    "Claim your unique identity on the internet. Join the waitlist today.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Someone - Own your name on the internet",
    description:
      "Claim your unique identity on the internet. Join the waitlist today.",
    url: "https://someo.ne",
    siteName: "Someone",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Someone - Own your name on the internet",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Someone - Own your name on the internet",
    description:
      "Claim your unique identity on the internet. Join the waitlist today.",
    images: ["/og_image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dieGrotesk.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
