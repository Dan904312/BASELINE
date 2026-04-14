import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benchline — Outcome-Driven Performance",
  description:
    "Set a real sports goal. Get benchmarked. Close the gap. Benchline turns performance targets into step-by-step adaptive plans.",
  openGraph: {
    title: "Benchline",
    description: "Outcome-driven sports performance tracking",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
