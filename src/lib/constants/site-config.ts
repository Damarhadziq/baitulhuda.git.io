export const siteConfig = {
  name: 'Masjid Baitul Huda',
  tagline: 'Sistem Digital Masjid Kampung',
  motto: 'Adem, Bersih, Tenang, Rapi, dan Harum',
  address: {
    street: 'Jl. Melati No. 45, RT 03 / RW 02',
    village: 'Kampung Huda Asri',
    district: 'Kecamatan Tengah',
    city: 'Kota Semarang',
    province: 'Jawa Tengah',
    postalCode: '50134',
  },
  kemenagCityId: '1301',
  kemenagCityName: 'KOTA SEMARANG',
  simasId: '01.4.14.01.02.000412', // Nomor ID Kemasjidan Simas Kemenag
  coordinates: {
    latitude: -6.9932,
    longitude: 110.4203,
  },
  contacts: {
    whatsappDkm: '081234567890',
    ambulancePhone: '08119988776', // Driver Ambulans / Mobil Duka
    marbotPhone: '081322334455', // Kontak Marbot & Inventaris
    email: 'dkm@baitulhuda.id',
    instagram: '@masjidbaitulhuda',
  },
  treasury: {
    bankName: 'Bank Syariah Indonesia (BSI)',
    accountNumber: '7141234567',
    bankJatengSyariah: '5023019988',
    accountHolder: 'DKM Masjid Baitul Huda',
    qrisPlaceholderUrl: '/images/qris-baitul-huda.png',
  },
  navigation: [
    { label: 'Beranda', href: '/' },
    { label: 'Kegiatan', href: '/warta' },
    { label: 'UMKM', href: '/umkm' },
    { label: 'Transparansi Kas', href: '/transparansi-kas' },
    { label: 'Tentang Kami', href: '/tentang' },
  ],
  mobileNav: [
    { label: 'Beranda', href: '/', icon: 'Home' },
    { label: 'Kegiatan', href: '/warta', icon: 'Calendar' },
    { label: 'UMKM', href: '/umkm', icon: 'Store' },
    { label: 'Kas', href: '/transparansi-kas', icon: 'Wallet' },
    { label: 'Tentang', href: '/tentang', icon: 'Info' },
  ],
};
