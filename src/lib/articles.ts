export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  keywords: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: "harga-service-ac-batam",
    title: "Harga Service AC di Batam 2026 — Panduan Lengkap",
    description: "Berapa biaya cuci AC, isi freon, bongkar pasang, dan service AC lainnya di Batam? Simak panduan harga lengkap dan tips hemat.",
    category: "Service AC",
    date: "2026-09-01",
    readTime: "5 menit",
    keywords: ["harga service ac batam", "biaya cuci ac batam", "harga isi freon batam"],
  },
  {
    slug: "ac-tidak-dingin-penyebab-dan-solusi",
    title: "AC Tidak Dingin? Ini 7 Penyebab dan Cara Mengatasinya",
    description: "AC nyala tapi tidak dingin? Jangan langsung isi freon. Kenali 7 penyebab umum dan solusi yang tepat sebelum panggil teknisi.",
    category: "Service AC",
    date: "2026-08-28",
    readTime: "6 menit",
    keywords: ["ac tidak dingin", "penyebab ac tidak dingin", "ac nyala tapi tidak dingin"],
  },
  {
    slug: "berapa-bulan-sekali-cuci-ac",
    title: "Berapa Bulan Sekali AC Harus Dicuci? Jadwal Perawatan AC",
    description: "Jadwal cuci AC yang tepat bisa perpanjang umur AC dan hemat listrik. Pelajari kapan waktu yang tepat untuk cuci AC.",
    category: "Service AC",
    date: "2026-08-25",
    readTime: "4 menit",
    keywords: ["berapa bulan cuci ac", "jadwal cuci ac", "perawatan ac"],
  },
  {
    slug: "tanda-ac-harus-diservis",
    title: "5 Tanda AC Harus Segera Diservis — Jangan Ditunda",
    description: "AC bocor, bau, bunyi aneh? Kenali 5 tanda AC harus segera diservis sebelum kerusakan makin parah dan mahal.",
    category: "Service AC",
    date: "2026-08-20",
    readTime: "4 menit",
    keywords: ["tanda ac harus diservis", "ac bocor", "ac bau", "ac bunyi"],
  },
  {
    slug: "tips-hemat-listrik-ac",
    title: "7 Tips Hemat Listrik AC — Tagihan Bisa Turun 30%",
    description: "Tagihan listrik naik gara-gara AC? Terapkan 7 tips ini untuk menghemat listrik tanpa mengorbankan kenyamanan.",
    category: "Tips",
    date: "2026-08-15",
    readTime: "5 menit",
    keywords: ["tips hemat listrik ac", "ac boros listrik", "hemat listrik batam"],
  },
  {
    slug: "cuci-ac-sendiri-atau-panggil-teknisi",
    title: "Cuci AC Sendiri atau Panggil Teknisi? Ini Pertimbangannya",
    description: "Mau cuci AC sendiri untuk hemat? Ketahui risiko dan kapan sebaiknya panggil teknisi profesional.",
    category: "Tips",
    date: "2026-08-10",
    readTime: "5 menit",
    keywords: ["cuci ac sendiri", "cara cuci ac", "cuci ac tanpa teknisi"],
  },
];
