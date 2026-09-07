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
  // === AC ===
  {
    slug: "harga-service-ac-batam",
    title: "Harga Service AC di Batam 2026 — Panduan Lengkap",
    description: "Berapa biaya cuci AC, isi freon, bongkar pasang di Batam? Simak panduan harga dan tips hemat.",
    category: "Service AC", date: "2026-09-01", readTime: "5 menit",
    keywords: ["harga service ac batam", "biaya cuci ac batam", "harga isi freon batam"],
  },
  {
    slug: "ac-tidak-dingin-penyebab-dan-solusi",
    title: "AC Tidak Dingin? Ini 7 Penyebab dan Cara Mengatasinya",
    description: "AC nyala tapi tidak dingin? Jangan langsung isi freon. Kenali 7 penyebab umum dan solusinya.",
    category: "Service AC", date: "2026-08-28", readTime: "6 menit",
    keywords: ["ac tidak dingin", "penyebab ac tidak dingin", "ac nyala tapi tidak dingin"],
  },
  {
    slug: "berapa-bulan-sekali-cuci-ac",
    title: "Berapa Bulan Sekali AC Harus Dicuci? Jadwal Perawatan AC",
    description: "Jadwal cuci AC yang tepat bisa perpanjang umur AC dan hemat listrik.",
    category: "Service AC", date: "2026-08-25", readTime: "4 menit",
    keywords: ["berapa bulan cuci ac", "jadwal cuci ac", "perawatan ac"],
  },
  {
    slug: "tanda-ac-harus-diservis",
    title: "5 Tanda AC Harus Segera Diservis — Jangan Ditunda",
    description: "AC bocor, bau, bunyi aneh? Kenali 5 tanda AC harus segera diservis.",
    category: "Service AC", date: "2026-08-20", readTime: "4 menit",
    keywords: ["tanda ac harus diservis", "ac bocor", "ac bau", "ac bunyi"],
  },
  {
    slug: "tips-hemat-listrik-ac",
    title: "7 Tips Hemat Listrik AC — Tagihan Bisa Turun 30%",
    description: "Tagihan listrik naik gara-gara AC? Terapkan 7 tips ini untuk menghemat listrik.",
    category: "Service AC", date: "2026-08-15", readTime: "5 menit",
    keywords: ["tips hemat listrik ac", "ac boros listrik", "hemat listrik batam"],
  },
  {
    slug: "cuci-ac-sendiri-atau-panggil-teknisi",
    title: "Cuci AC Sendiri atau Panggil Teknisi? Ini Pertimbangannya",
    description: "Mau cuci AC sendiri untuk hemat? Ketahui risiko dan kapan sebaiknya panggil teknisi.",
    category: "Service AC", date: "2026-08-10", readTime: "5 menit",
    keywords: ["cuci ac sendiri", "cara cuci ac", "cuci ac tanpa teknisi"],
  },

  // === ELEKTRONIK ===
  {
    slug: "service-kulkas-batam",
    title: "Service Kulkas Batam — Kulkas Tidak Dingin, Bocor, Berisik?",
    description: "Kulkas bermasalah? Kenali penyebab kulkas tidak dingin, bocor, dan bunyi aneh. Kapan harus panggil teknisi.",
    category: "Elektronik", date: "2026-09-02", readTime: "5 menit",
    keywords: ["service kulkas batam", "kulkas tidak dingin", "perbaikan kulkas batam"],
  },
  {
    slug: "service-mesin-cuci-batam",
    title: "Service Mesin Cuci Batam — Masalah Umum dan Solusinya",
    description: "Mesin cuci tidak mau berputar, bocor, atau berbau? Pelajari penyebab dan kapan harus service.",
    category: "Elektronik", date: "2026-08-30", readTime: "5 menit",
    keywords: ["service mesin cuci batam", "mesin cuci rusak", "perbaikan mesin cuci batam"],
  },
  {
    slug: "perawatan-elektronik-rumah",
    title: "Tips Merawat Elektronik Rumah Agar Awet dan Tahan Lama",
    description: "Kulkas, mesin cuci, TV, dan dispenser bisa lebih awet dengan perawatan sederhana. Simak tipsnya.",
    category: "Elektronik", date: "2026-08-18", readTime: "4 menit",
    keywords: ["perawatan elektronik", "tips merawat kulkas", "elektronik awet"],
  },

  // === CLEANING ===
  {
    slug: "cleaning-service-batam",
    title: "Cleaning Service Batam — Kapan Harus Panggil Jasa Bersih?",
    description: "Rumah, apartemen, atau kantor butuh deep cleaning? Pelajari kapan waktu yang tepat dan apa saja yang dibersihkan.",
    category: "Cleaning", date: "2026-09-03", readTime: "5 menit",
    keywords: ["cleaning service batam", "jasa bersih rumah batam", "deep cleaning batam"],
  },
  {
    slug: "tips-bersih-rumah-efektif",
    title: "Tips Bersih-Bersih Rumah yang Efektif — Hemat Waktu dan Tenaga",
    description: "Rumah berantakan tapi malas bersih-bersih? Terapkan metode ini untuk hasil maksimal dengan usaha minimal.",
    category: "Cleaning", date: "2026-08-22", readTime: "4 menit",
    keywords: ["tips bersih rumah", "cara bersihkan rumah", "rumah bersih"],
  },
  {
    slug: "cuci-sofa-batam",
    title: "Cuci Sofa Batam — Kapan Sofa Harus Dicuci dan Berapa Biayanya?",
    description: "Sofa bau, bernoda, atau berdebu? Pelajari tanda sofa harus dicuci dan manfaat cuci sofa profesional.",
    category: "Cleaning", date: "2026-08-12", readTime: "4 menit",
    keywords: ["cuci sofa batam", "jasa cuci sofa", "sofa bersih"],
  },

  // === LISTRIK ===
  {
    slug: "tukang-listrik-batam",
    title: "Tukang Listrik Batam — Kapan Harus Panggil dan Apa yang Perlu Diperhatikan",
    description: "Listrik konslet, stop kontak rusak, atau mau tambah titik lampu? Panduan lengkap soal jasa listrik di Batam.",
    category: "Listrik", date: "2026-09-04", readTime: "5 menit",
    keywords: ["tukang listrik batam", "jasa listrik batam", "instalasi listrik batam"],
  },
  {
    slug: "listrik-sering-trip-penyebab",
    title: "Listrik Sering Trip (MCB Turun)? Ini 5 Penyebab dan Solusinya",
    description: "MCB sering turun atau listrik sering mati? Jangan asal nyalakan ulang. Kenali penyebab dan bahayanya.",
    category: "Listrik", date: "2026-08-26", readTime: "5 menit",
    keywords: ["listrik sering trip", "mcb sering turun", "listrik konslet"],
  },
  {
    slug: "bahaya-instalasi-listrik-asal",
    title: "Bahaya Instalasi Listrik Asal-asalan — Jangan Ambil Risiko",
    description: "Instalasi listrik yang tidak benar bisa menyebabkan kebakaran. Kenali tanda bahaya dan pentingnya teknisi profesional.",
    category: "Listrik", date: "2026-08-14", readTime: "4 menit",
    keywords: ["bahaya listrik", "instalasi listrik aman", "kebakaran listrik"],
  },

  // === PLUMBING ===
  {
    slug: "saluran-mampet-batam",
    title: "Saluran Air Mampet di Batam? Penyebab dan Cara Mengatasinya",
    description: "Wastafel, toilet, atau saluran air mampet? Kenali penyebabnya dan kapan harus panggil tukang.",
    category: "Plumbing", date: "2026-09-05", readTime: "5 menit",
    keywords: ["saluran mampet batam", "wc mampet batam", "plumbing batam"],
  },
  {
    slug: "pipa-bocor-cara-atasi",
    title: "Pipa Air Bocor? Cara Mengatasi Sementara dan Kapan Panggil Teknisi",
    description: "Pipa bocor bisa merusak dinding dan lantai. Pelajari penanganan darurat dan kapan harus panggil tukang.",
    category: "Plumbing", date: "2026-08-24", readTime: "4 menit",
    keywords: ["pipa bocor", "kran bocor", "tukang pipa batam"],
  },
  {
    slug: "tips-merawat-saluran-air",
    title: "Tips Merawat Saluran Air Agar Tidak Mudah Mampet",
    description: "Mencegah lebih baik daripada memperbaiki. Terapkan tips sederhana ini agar saluran air rumah tetap lancar.",
    category: "Plumbing", date: "2026-08-08", readTime: "4 menit",
    keywords: ["tips saluran air", "mencegah saluran mampet", "perawatan pipa"],
  },
];
