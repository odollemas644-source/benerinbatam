export const BRAND = {
  name: "Benerin",
  tagline: "Tinggal panggil, beres.",
  phone: "6288901477760",
  whatsappUrl: "https://wa.me/6288901477760",
  instagram: "@benerin.btm",
  tiktok: "@benerin.btm",
};

export const SERVICE_CATEGORIES = [
  {
    id: "ac",
    name: "Service AC",
    slug: "service-ac",
    icon: "Snowflake",
    tagline: "Cuci AC, isi freon, bongkar pasang",
    popular: true,
  },
  {
    id: "elektronik",
    name: "Service Elektronik",
    slug: "service-elektronik",
    icon: "Tv",
    tagline: "TV, kulkas, mesin cuci, microwave",
    popular: false,
  },
  {
    id: "cleaning",
    name: "Cleaning Service",
    slug: "cleaning-service",
    icon: "Sparkles",
    tagline: "Rumah, kantor, apartemen, kos",
    popular: false,
  },
  {
    id: "listrik",
    name: "Jasa Listrik",
    slug: "jasa-listrik",
    icon: "Zap",
    tagline: "Instalasi, perbaikan, penambahan daya",
    popular: false,
  },
  {
    id: "plumbing",
    name: "Plumbing",
    slug: "plumbing",
    icon: "Droplets",
    tagline: "Saluran air, WC, kebocoran pipa",
    popular: false,
  },
] as const;

export const ALL_SERVICES = [
  // AC
  { slug: "cuci-ac", name: "Cuci AC", category: "ac" },
  { slug: "isi-freon", name: "Isi Freon AC", category: "ac" },
  { slug: "service-ac-tidak-dingin", name: "AC Tidak Dingin", category: "ac" },
  { slug: "ac-bocor", name: "AC Bocor / Netes Air", category: "ac" },
  { slug: "bongkar-pasang-ac", name: "Bongkar Pasang AC", category: "ac" },
  { slug: "pasang-ac-baru", name: "Pasang AC Baru", category: "ac" },
  { slug: "deep-clean-ac", name: "Deep Clean AC", category: "ac" },
  { slug: "cek-ac", name: "Cek & Diagnosa AC", category: "ac" },
  // Elektronik
  { slug: "service-kulkas", name: "Service Kulkas", category: "elektronik" },
  { slug: "service-mesin-cuci", name: "Service Mesin Cuci", category: "elektronik" },
  { slug: "service-tv", name: "Service TV", category: "elektronik" },
  { slug: "service-water-heater", name: "Service Water Heater", category: "elektronik" },
  { slug: "service-dispenser", name: "Service Dispenser", category: "elektronik" },
  // Cleaning
  { slug: "cleaning-rumah", name: "Cleaning Rumah", category: "cleaning" },
  { slug: "cleaning-kantor", name: "Cleaning Kantor", category: "cleaning" },
  { slug: "cleaning-apartemen", name: "Cleaning Apartemen", category: "cleaning" },
  { slug: "cleaning-kos", name: "Cleaning Kos-kosan", category: "cleaning" },
  { slug: "cuci-sofa", name: "Cuci Sofa", category: "cleaning" },
  // Listrik
  { slug: "pasang-stop-kontak", name: "Pasang Stop Kontak", category: "listrik" },
  { slug: "perbaikan-listrik", name: "Perbaikan Listrik", category: "listrik" },
  { slug: "instalasi-listrik", name: "Instalasi Listrik", category: "listrik" },
  { slug: "listrik-konslet", name: "Listrik Konslet / Trip", category: "listrik" },
  { slug: "pasang-lampu", name: "Pasang Lampu", category: "listrik" },
  // Plumbing
  { slug: "saluran-mampet", name: "Saluran Mampet", category: "plumbing" },
  { slug: "kran-bocor", name: "Kran / Pipa Bocor", category: "plumbing" },
  { slug: "perbaikan-wc", name: "Perbaikan WC / Toilet", category: "plumbing" },
  { slug: "pasang-water-heater", name: "Pasang Water Heater", category: "plumbing" },
  { slug: "instalasi-pipa", name: "Instalasi Pipa Air", category: "plumbing" },
];

export const AC_PROBLEMS = [
  {
    title: "AC Tidak Dingin",
    description: "Filter kotor, freon habis, atau kompresor bermasalah. Teknisi kami diagnosa penyebabnya sebelum service.",
    icon: "Thermometer",
  },
  {
    title: "AC Bocor / Netes Air",
    description: "Drain pipe tersumbat, filter kotor, atau evaporator bermasalah. Jangan didiamkan, bisa merusak dinding.",
    icon: "Droplets",
  },
  {
    title: "AC Bau Tidak Sedap",
    description: "Jamur dan bakteri menumpuk di evaporator. Deep clean mengatasi bau dan menjaga kesehatan.",
    icon: "Wind",
  },
  {
    title: "AC Bunyi Berisik",
    description: "Baling-baling longgar, kompresor bermasalah, atau bracket kendor. Perlu dicek sebelum makin parah.",
    icon: "Volume2",
  },
  {
    title: "AC Mati Total",
    description: "Bisa karena kapasitor rusak, PCB error, atau masalah listrik. Teknisi cek dan perbaiki di tempat.",
    icon: "PowerOff",
  },
  {
    title: "Tagihan Listrik Naik",
    description: "AC kotor bekerja lebih keras dan boros listrik. Cuci AC rutin bisa hemat listrik sampai 30%.",
    icon: "Zap",
  },
];

export const AREAS = [
  "Batam Center",
  "Nagoya",
  "Lubuk Baja",
  "Bengkong",
  "Batam Kota",
  "Sekupang",
  "Batu Aji",
  "Sagulung",
  "Nongsa",
  "Tiban",
  "Batu Ampar",
  "Sei Beduk",
];

export const TIME_SLOTS = [
  "Pagi (08:00 - 10:00)",
  "Siang (10:00 - 12:00)",
  "Siang (13:00 - 15:00)",
  "Sore (15:00 - 17:00)",
];

export const HOW_IT_WORKS = [
  { step: 1, title: "Pilih Layanan", description: "Pilih jenis service yang dibutuhkan dan jelaskan masalahnya." },
  { step: 2, title: "Hubungi Kami", description: "Booking via form atau langsung chat WhatsApp." },
  { step: 3, title: "Teknisi Datang", description: "Teknisi terverifikasi datang ke lokasi sesuai jadwal." },
  { step: 4, title: "Beres, Bayar", description: "Pekerjaan selesai, bayar setelah puas dengan hasilnya." },
];

export const TRUST_POINTS = [
  { title: "Teknisi Terverifikasi", description: "Semua teknisi sudah diseleksi dan diverifikasi identitasnya." },
  { title: "Harga Transparan", description: "Konsultasi gratis. Harga disepakati sebelum pengerjaan." },
  { title: "Garansi Pekerjaan", description: "Jika masih bermasalah setelah service, teknisi datang lagi." },
  { title: "Booking Mudah", description: "Pesan online atau via WhatsApp, teknisi datang ke lokasi." },
];

export const FAQ_AC = [
  { q: "Berapa harga service AC?", a: "Harga tergantung jenis pekerjaan dan kondisi AC. Konsultasi gratis via WhatsApp, kami berikan estimasi harga sebelum pengerjaan." },
  { q: "Berapa lama proses cuci AC?", a: "Cuci AC standar memakan waktu sekitar 30-45 menit per unit. Deep clean bisa sampai 1 jam." },
  { q: "Berapa bulan sekali AC harus dicuci?", a: "Idealnya setiap 3 bulan. Jika AC nyala lebih dari 12 jam sehari atau di area berdebu, bisa lebih sering." },
  { q: "Apakah teknisi bawa peralatan sendiri?", a: "Ya, semua teknisi kami sudah membawa peralatan lengkap. Anda hanya perlu menyediakan akses ke unit AC dan sumber air." },
  { q: "Bagaimana cara pembayarannya?", a: "Pembayaran dilakukan setelah pekerjaan selesai. Bisa via transfer bank atau tunai." },
  { q: "Apakah ada garansi?", a: "Ya, ada garansi pekerjaan. Jika AC masih bermasalah setelah diservis, teknisi akan datang lagi tanpa biaya tambahan." },
  { q: "Area mana saja yang dilayani?", a: "Kami melayani seluruh Batam termasuk Batam Center, Nagoya, Lubuk Baja, Bengkong, Sekupang, Batu Aji, Sagulung, Nongsa, dan area lainnya." },
  { q: "Bisa booking untuk hari ini?", a: "Bisa, tergantung ketersediaan teknisi. Untuk jadwal hari ini, sebaiknya hubungi kami via WhatsApp agar lebih cepat." },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount);
}

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${BRAND.phone}?text=${encodeURIComponent(message)}`;
}

export const ORDER_STATUS_MAP: Record<string, { label: string; color: string }> = {
  new: { label: "Baru", color: "bg-blue-100 text-blue-800" },
  confirmed: { label: "Dikonfirmasi", color: "bg-cyan-100 text-cyan-800" },
  assigned: { label: "Vendor Ditugaskan", color: "bg-purple-100 text-purple-800" },
  in_progress: { label: "Dikerjakan", color: "bg-yellow-100 text-yellow-800" },
  completed: { label: "Selesai", color: "bg-green-100 text-green-800" },
  paid: { label: "Dibayar", color: "bg-emerald-100 text-emerald-800" },
  closed: { label: "Ditutup", color: "bg-gray-100 text-gray-800" },
  cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-800" },
};
