# Sistem Digital Masjid Kampung (Masjid Baitul Huda)

Sistem informasi dan khidmah digital warga untuk **Masjid Baitul Huda Kampung Asri**.
Aplikasi dibangun dengan atmosfer: *"Masjid tengah kota yang adem, bersih, tenang, rapi, dan harum."*

---

## 1. Panduan Desain & Brand Identity

### A. Estetika & Prinsip Visual
- **Zero Elevation**: Tidak ada `box-shadow` sama sekali (`box-shadow: none !important;`).
- **Hairline Borders**: Hirarki visual murni mengandalkan border tipis 1px (`#E5E8E4`) dan kontras permukaan linen `#FBFBF9` dengan kartu putih `#FFFFFF`.
- **Breathable & Calm**: Ruang antar elemen lapang, paduan warna tenang, dan tipografi berwibawa.

### B. Palet Warna (Calm Pastel Green & Earth Neutrals)
| Token | Hex | Penggunaan |
| :--- | :--- | :--- |
| `primary` | `#2D6A4F` | Warna utama hijau pinus, teks kontras tinggi, tombol utama |
| `primary-pastel`| `#E8F0EB` | Latar belakang lembut badge, card highlight, tab aktif |
| `primary-hover` | `#24553F` | Interaksi hover tombol utama |
| `background` | `#FBFBF9` | Kanvas latar belakang utama (linen sejuk di mata) |
| `surface` | `#FFFFFF` | Permukaan kartu konten & modal |
| `surface-subtle`| `#F4F4F0` | Seksi alternatif & pembatas halus |
| `text-primary` | `#1E2421` | Teks judul & tubuh (slate hijau gelap, bukan hitam pekat) |
| `text-secondary`| `#5C6560` | Teks keterangan dan deskripsi |
| `text-muted` | `#8C9690` | Placeholder & metadata sekunder |
| `border` | `#E5E8E4` | Border hairline 1px |
| `accent-gold` | `#D4A373` | Aksen waktu sholat, kaligrafi, dan arah kiblat |
| `destructive` | `#C85A54` | Warta lelayu (duka cita) & status error |

### C. Tipografi Ganda
- **Heading Font**: `Commissioner` via Google Fonts (CSS Variable: `--font-commissioner`, tracking: `-0.015em`, line-height: `1.2`).
- **Body Font**: `Inter` via Google Fonts (CSS Variable: `--font-inter`, tracking: `normal`, leading: `1.55`).

---

## 2. Struktur Direktori (Domain-Driven Architecture)

```text
masjid-app/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                      # Landing: Hero, Prayer bar, Papan Warta, Kas preview
│   │   │   ├── jadwal-sholat/page.tsx        # Fitur 1: Waktu Ibadah & Implikasi
│   │   │   ├── warta/page.tsx                # Fitur 2: Papan Berita Warga & Lelayu
│   │   │   ├── relawan/page.tsx              # Fitur 3: Direktori Relawan & Khidmah
│   │   │   ├── lumbung-umkm/page.tsx         # Fitur 4: Etalase UMKM & Lumbung Pangan
│   │   │   ├── transparansi-kas/page.tsx     # Fitur 5: Transparansi Kas & Infaq QRIS
│   │   │   ├── kontak/page.tsx               # Fitur 6: Kontak DKM & Layanan Warga
│   │   │   ├── tentang/page.tsx              # Fitur 7: Profil, Sejarah, Struktur
│   │   │   └── galeri/page.tsx               # Fitur 8: Dokumentasi & Agenda
│   │   ├── (tv-display)/
│   │   │   └── display/page.tsx              # Smart TV Masjid view (Fullscreen landscape)
│   │   ├── api/
│   │   │   ├── sholat/route.ts               # Proxy & Cache API Kemenag
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                               # Primitif: button, badge, card, input
│   │   ├── common/                           # navbar, mobile-bottom-nav, footer
│   │   └── modules/                          # prayer-bar, news-feed, kas-table
│   ├── hooks/                                # use-prayer-times, use-count-down
│   ├── lib/
│   │   ├── api/kemenag.ts                    # Kemenag API client (12h revalidation)
│   │   ├── api/supabase.ts                   # Supabase client initialization
│   │   ├── constants/site-config.ts          # Profil masjid & konfigurasi
│   │   └── utils.ts                          # cn, formatRupiah, getWhatsAppUrl
│   └── types/                                # TypeScript interfaces
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. Menjalankan Aplikasi Secara Lokal

1. **Install dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   ```

3. **Buka aplikasi di browser**:
   - Web Warga: [http://localhost:3000](http://localhost:3000)
   - Tampilan Smart TV Masjid: [http://localhost:3000/display](http://localhost:3000/display)
