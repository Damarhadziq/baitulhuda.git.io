'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { siteConfig } from '@/lib/constants/site-config';
import { getWhatsAppUrl } from '@/lib/utils';
import {
  Landmark,
  ShieldCheck,
  Users,
  Ambulance,
  Phone,
  MessageCircle,
  Key,
  Camera,
  Sparkles,
  HeartHandshake,
  BookOpen,
  Compass,
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Penyembelihan & Distribusi Qurban Idul Adha',
    category: 'Qurban & Sosial',
    date: 'Juni 2026',
    description: 'Pemotongan 8 ekor sapi dan 14 ekor kambing gotong royong warga, disalurkan ke 420 keluarga sekitar.',
  },
  {
    id: 'g2',
    title: 'Kajian Akbar Ramadhan & Buka Puasa Bersama',
    category: 'Dakwah & Taklim',
    date: 'April 2026',
    description: 'Buka puasa bersama 250 jamaah setiap petang selama bulan suci Ramadhan.',
  },
  {
    id: 'g3',
    title: 'Penyaluran Santunan Warga Lansia & Dhuafa',
    category: 'Sosial Umat',
    date: 'Agustus 2026',
    description: 'Penyerahan paket santunan sembako dan kesehatan kepada 65 lansia di Kampung Huda Asri.',
  },
  {
    id: 'g4',
    title: 'Kerja Bakti Karpet & Sanitasi Ruang Utama',
    category: 'Kebersihan',
    date: 'September 2026',
    description: 'Pencucian karpet dan pembersihan filter pendingin udara masjid demi kenyamanan ibadah.',
  },
];

const managementStructure = [
  { role: 'Ketua DKM', name: 'K.H. Masduki, M.Ag.', duty: 'Pengarah Utama & Kebijakan Dakwah', standby: 'Ba’da Maghrib' },
  { role: 'Sekretaris DKM', name: 'Ust. Fajar Ramadhan', duty: 'Administrasi, Warta & Layanan Warga', standby: 'Pukul 08.00 - 16.00 WIB' },
  { role: 'Bendahara Umum', name: 'H. Bambang Irawan', duty: 'Pembukuan Kas, Infaq & Keuangan', standby: 'Pekan Jum’at' },
  { role: 'Koordinator Marbot & Sarana', name: 'Pak Trisno & Pak Joko', duty: 'Kebersihan, Sound System & Fasilitas', standby: 'Siaga 24 Jam di Asrama' },
  { role: 'Amil Zakat & Sosial', name: 'Ust. H. Syafi’i', duty: 'Zakat, Infak & Santunan Warga Dhuafa', standby: 'Pukul 09.00 - 14.00 WIB' },
  { role: 'Ketua Remaja Masjid (RISMA)', name: 'Muhammad Ilham', duty: 'Kegiatan Pemuda, Media & Dokumentasi', standby: 'Malam Ahad' },
];

export default function TentangPage() {
  const [activeGallery, setActiveGallery] = React.useState<GalleryItem | null>(null);

  const waAmbulance = getWhatsAppUrl(
    siteConfig.contacts.ambulancePhone,
    'Assalamu’alaikum Driver Ambulans Masjid Baitul Huda, ada kebutuhan armada darurat warga.'
  );

  const waMarbot = getWhatsAppUrl(
    siteConfig.contacts.marbotPhone,
    'Assalamu’alaikum Marbot Masjid Baitul Huda, saya ingin bertanya mengenai peminjaman inventaris masjid.'
  );

  return (
    <div className="space-y-12 md:space-y-16 pb-20">
      {/* 1. DISTINCT HERO SECTION: Asymmetrical Story & Heritage Layout */}
      <section className="relative pt-6 pb-4 md:pt-10 md:pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative rounded-3xl bg-surface-subtle/70 p-6 sm:p-10 md:p-12 overflow-hidden">
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-primary-pastel/40 blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Story & History */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-pastel px-3.5 py-1 text-xs font-medium text-primary">
                  <Landmark className="h-3.5 w-3.5" />
                  <span>Sejarah & Identitas Kemasjidan</span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary leading-[1.2]">
                  Oase Spiritual Sejak 1994: <br />
                  <span className="text-primary">{siteConfig.name}</span>
                </h1>

                <div className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal space-y-3">
                  <p>
                    Masjid Baitul Huda didirikan dari tanah wakaf almarhum H. Abdul Manan seluas 650 m² pada tahun 1994. Sejak peletakan batu pertama, masjid ini diniatkan menjadi tempat yang meneduhkan: tempat yang adem lantainya, sejuk sirkulasi udaranya, tenang suasananya, dan harum ruangannya.
                  </p>
                  <p className="text-xs sm:text-sm text-text-muted italic">
                    « Wadah pembinaan keimanan, penguatan persaudaraan, dan gotong royong ekonomi warga Kampung Huda Asri, Semarang. »
                  </p>
                </div>
              </div>

              {/* Right Column: Clean White Legal & Building Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-white p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="font-heading font-semibold text-sm text-text-primary">
                      Legalitas & Bangunan
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-text-muted">Nomor ID Simas:</span>
                      <span className="font-mono font-medium text-text-primary">{siteConfig.simasId}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-text-muted">Status Tanah:</span>
                      <span className="font-medium text-text-primary">Wakaf Bersertifikat</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-text-muted">Luas Tanah:</span>
                      <span className="font-medium text-text-primary">650 m²</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-text-muted">Kapasitas:</span>
                      <span className="font-medium text-text-primary">± 500 Jamaah</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-text-muted">Arah Kiblat:</span>
                      <span className="font-mono font-medium text-primary">294.8° Barat Laut</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3 PILAR UTAMA PENGABDIAN MASJID (Borderless Cards) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 space-y-5">
        <div>
          <h2 className="font-heading font-semibold text-xl text-text-primary">
            3 Pilar Utama Pengabdian Masjid
          </h2>
          <p className="text-xs text-text-secondary font-normal mt-0.5">
            Fondasi khidmah DKM Baitul Huda dalam melayani umat dan warga kampung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl bg-surface-subtle/70 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-pastel text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-heading font-semibold text-base text-text-primary">
              1. Kemakmuran Ibadah
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed font-normal">
              Sholat fardhu lima waktu berjamaah tepat waktu, imam yang fasih, dan kenyamanan sarana ibadah yang senantiasa harum, bersih, dan suci.
            </p>
          </div>

          <div className="rounded-2xl bg-surface-subtle/70 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-pastel text-primary">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h3 className="font-heading font-semibold text-base text-text-primary">
              2. Pemberdayaan Ekonomi
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed font-normal">
              Keterbukaan laporan kas transparan, dukungan pemasaran produk UMKM warga jamaah, dan jaminan sosial bagi keluarga lansia dhuafa sekitar.
            </p>
          </div>

          <div className="rounded-2xl bg-surface-subtle/70 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-pastel text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-heading font-semibold text-base text-text-primary">
              3. Pembinaan Generasi Muda
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed font-normal">
              TPA anak-anak, pembinaan pemuda RISMA, dan kajian rutin keilmuan muamalah yang santun, praktis, dan meneduhkan hati jamaah.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SUSUNAN PENGURUS DKM (Borderless Grid) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 space-y-5">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="font-heading font-semibold text-xl text-text-primary">
            Susunan Pengurus DKM (Periode 2024 - 2027)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {managementStructure.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-surface-subtle/70 p-5 flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block">
                  {item.role}
                </span>
                <p className="font-semibold text-sm text-text-primary mt-1">
                  {item.name}
                </p>
                <p className="text-xs text-text-secondary mt-0.5 font-normal">
                  {item.duty}
                </p>
              </div>
              <div className="pt-2 text-[11px] text-text-muted font-normal">
                Piket Siaga: {item.standby}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. KONTAK LAYANAN CEPAT (Emergency Ambulance & Marbot) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 space-y-6">
        <div>
          <Badge variant="destructive" className="mb-2">
            Siaga Warga
          </Badge>
          <h2 className="font-heading font-semibold text-xl text-text-primary">
            Kontak Layanan Cepat & Tanggap Darurat
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary font-normal mt-0.5">
            Akses langsung bantuan armada darurat dan peminjaman inventaris masjid untuk keperluan warga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Emergency Ambulance Card */}
          <div className="rounded-2xl bg-[#FCF5F5] p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-destructive">
                <Ambulance className="h-5 w-5" />
                <span className="font-semibold text-sm">Armada Ambulans & Mobil Duka</span>
              </div>
              <p className="text-xs text-text-secondary font-normal leading-relaxed">
                Siaga 24 jam untuk pengantaran pasien darurat ke RS atau pemakaman jenazah warga Kampung Asri. Gratis bagi yang membutuhkan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <Button asChild variant="destructive" size="sm" className="w-full justify-center text-xs font-medium rounded-full">
                <a href={waAmbulance} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-3.5 w-3.5 mr-1" />
                  <span>WhatsApp Driver Ambulans</span>
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="text-xs font-medium text-destructive hover:bg-white rounded-full bg-white/70">
                <a href={`tel:${siteConfig.contacts.ambulancePhone}`}>
                  <Phone className="h-3.5 w-3.5 mr-1" />
                  <span>Telepon</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Marbot & Inventory Card */}
          <div className="rounded-2xl bg-surface-subtle/70 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-text-primary">
                <Key className="h-5 w-5 text-primary" />
                <span className="font-semibold text-sm">Marbot & Inventaris Masjid</span>
              </div>
              <p className="text-xs text-text-secondary font-normal leading-relaxed">
                Peminjaman kursi, tenda, sound system portabel, atau izin pemakaian aula serbaguna untuk hajatan warga dan pengajian keluarga.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <Button asChild variant="default" size="sm" className="w-full justify-center text-xs font-medium rounded-full">
                <a href={waMarbot} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-3.5 w-3.5 mr-1" />
                  <span>Hubungi Marbot via WhatsApp</span>
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="text-xs font-medium text-text-secondary hover:text-text-primary rounded-full bg-white">
                <a href={`tel:${siteConfig.contacts.marbotPhone}`}>
                  <Phone className="h-3.5 w-3.5 mr-1" />
                  <span>Telepon</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DOKUMENTASI & GALERI KHIDMAH */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 space-y-5">
        <div>
          <h2 className="font-heading font-semibold text-xl text-text-primary">
            Dokumentasi Khidmah Jamaah
          </h2>
          <p className="text-xs text-text-secondary font-normal mt-0.5">
            Rekam jejak kebersamaan dalam memelihara rumah Allah dan melayani masyarakat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryData.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveGallery(item)}
              className="group cursor-pointer rounded-2xl bg-surface-subtle/70 hover:bg-surface-subtle transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="h-32 w-full bg-surface-subtle flex items-center justify-center text-text-muted group-hover:scale-105 transition-transform duration-200">
                <Camera className="h-8 w-8 text-primary/40" />
              </div>
              <div className="p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant="subtle" className="text-[10px]">
                    {item.category}
                  </Badge>
                  <span className="text-[10px] text-text-muted font-normal">{item.date}</span>
                </div>
                <h4 className="font-heading font-semibold text-xs text-text-primary line-clamp-2 leading-snug">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Lightbox Dialog */}
      <Dialog open={Boolean(activeGallery)} onOpenChange={(open) => !open && setActiveGallery(null)}>
        {activeGallery && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="default">{activeGallery.category}</Badge>
                <span className="text-xs text-text-muted font-normal">{activeGallery.date}</span>
              </div>
              <DialogTitle className="font-heading font-semibold text-lg text-text-primary">
                {activeGallery.title}
              </DialogTitle>
            </DialogHeader>

            <div className="h-48 w-full rounded-2xl bg-surface-subtle flex items-center justify-center text-text-muted my-2">
              <Camera className="h-12 w-12 text-primary/40" />
            </div>

            <p className="text-xs text-text-secondary leading-relaxed font-normal">
              {activeGallery.description}
            </p>

            <div className="flex justify-end pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveGallery(null)}
                className="text-xs font-medium rounded-full px-4"
              >
                Tutup
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
