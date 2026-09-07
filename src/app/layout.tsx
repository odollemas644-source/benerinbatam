import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Benerin — Service Rumah & Kantor di Batam",
    template: "%s | Benerin",
  },
  description:
    "Platform jasa service terpercaya di Batam. Service AC, listrik, plumbing, cleaning. Teknisi terverifikasi, harga transparan, garansi pekerjaan.",
  keywords: [
    "service ac batam",
    "cuci ac batam",
    "jasa listrik batam",
    "cleaning service batam",
    "plumbing batam",
    "teknisi batam",
  ],
  openGraph: {
    title: "Benerin — Service Rumah & Kantor di Batam",
    description:
      "Teknisi terverifikasi datang ke lokasi. Harga transparan. Garansi pekerjaan.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-800 antialiased">{children}</body>
    </html>
  );
}
