'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
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
  Calendar,
  Sparkles,
  HeartHandshake,
  BookOpen,
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
    title: 'Penyaluran Beras Lumbung Dhuafa Tahap VIII',
    category: 'Lumbung Pangan',
    date: 'Agustus 2026',
    description: 'Penyerahan 185 Kg beras kepada lansia dan dhuafa di Kampung Huda Asri.',
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
  { role: 'Amil Zakat & Sosial', name: 'Ust. H. Syafi’i', duty: 'Lumbung Pangan, Zakat & Santunan Dhuafa', standby: 'Pukul 09.00 - 14.00 WIB' },
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 space-y-12 md:space-y-16">
      {/* Header Page */}
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-pastel px-3 py-1 text-xs font-medium text-primary mb-2 border border-primary/10">
          <Sparkles className="h-3 w-3" />
          <span>Profil & Khidmah Masjid</span>
        </div>
        <h1 className="font-heading font-semibold text-2xl sm:text-3xl text-text-primary tracking-tight">
          Tentang Masjid Baitul Huda
        </h1>
        <p className="mt-1 text-sm text-text-secondary leading-relaxed font-normal max-w-2xl">
          {siteConfig.motto}. Sejarah pendirian, legalitas Simas Kemenag, struktur pengurus, kontak layanan darurat, dan dokumentasi khidmah.
        </p>
      </div>

      {/* SECTION A: Profil & Sejarah Singkat */}
      <section aria-labelledby="profil-heading" className="rounded-xl border border-border bg-surface p-6 sm:p-8 space-y-5 shadow-none">
        <div className="flex items-center gap-2.5 border-b border-border pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-pastel text-primary">
            <Landmark className="h-4 w-4" />
          </div>
          <div>
            <h2 id="profil-heading" className="font-heading font-semibold text-lg text-text-primary">
              Sejarah & Identitas Kemasjidan
            </h2>
            <p className="text-xs text-text-secondary font-normal">
              Oase spiritual di tengah kota sejak tahun 1994
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
          <div className="lg:col-span-2 space-y-3">
            <p>
              Masjid Baitul Huda didirikan dari tanah wakaf almarhum H. Abdul Manan seluas 650 m² pada tahun 1994. Sejak peletakan batu pertama, masjid ini dirancang menjadi oase di tengah padatnya permukiman: tempat yang adem lantainya, sejuk sirkulasi udaranya, tenang suasananya, dan harum ruangannya.
            </p>
            <p>
              Kini Masjid Baitul Huda mampu menampung hingga 500 jamaah di lantai utama dan serambi. DKM terus bertransformasi mengadopsi teknologi digital untuk memastikan seluruh pencatatan infaq terbuka tanpa sekat rahasia, memajukan perniagaan warga, dan menjamin pangan keluarga dhuafa sekitar.
            </p>
          </div>

          {/* Quick Legal Card */}
          <div className="rounded-lg border border-border bg-surface-subtle p-4 space-y-2.5 text-xs">
            <span className="font-semibold text-text-primary block">Data Legalitas & Bangunan</span>
            <div className="space-y-1.5 text-text-secondary font-normal">
              <div className="flex justify-between">
                <span className="text-text-muted">Nomor ID Simas:</span>
                <span className="font-mono font-medium text-text-primary">{siteConfig.simasId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Status Tanah:</span>
                <span className="font-medium text-text-primary">Wakaf Bersertifikat</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Luas Tanah:</span>
                <span className="font-medium text-text-primary">650 m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Kapasitas:</span>
                <span className="font-medium text-text-primary">± 500 Jamaah</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Arah Kiblat:</span>
                <span className="font-mono font-medium text-primary">294.8° Barat Laut</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: Visi, Misi & 3 Pilar Masjid */}
      <section aria-labelledby="pilar-heading" className="space-y-5">
        <div>
          <h2 id="pilar-heading" className="font-heading font-semibold text-xl text-text-primary">
            3 Pilar Utama Pengabdian Masjid
          </h2>
          <p className="text-xs text-text-secondary font-normal mt-0.5">
            Fondasi khidmah DKM Baitul Huda dalam melayani umat dan warga kampung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card>
            <CardHeader>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-pastel text-primary mb-2">
                <Sparkles className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">1. Kemakmuran Ibadah</CardTitle>
              <CardDescription>
                Sholat fardhu lima waktu berjamaah tepat waktu, imam yang fasih, dan kenyamanan sarana ibadah yang harum dan suci.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-pastel text-primary mb-2">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">2. Pemberdayaan Sosial-Ekonomi</CardTitle>
              <CardDescription>
                Lumbung pangan beras untuk lansia & dhuafa, keterbukaan laporan kas, serta direktori etalase dagang UMKM warga sekitar.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-pastel text-primary mb-2">
                <BookOpen className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">3. Pembinaan Generasi Muda</CardTitle>
              <CardDescription>
                TPA anak-anak, pembinaan kepemudaan RISMA, dan kajian rutin keilmuan yang ramah, santun, dan meneduhkan.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* SECTION C: Struktur Pengurus DKM */}
      <section aria-labelledby="struktur-heading" className="space-y-5">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 id="struktur-heading" className="font-heading font-semibold text-xl text-text-primary">
            Susunan Pengurus DKM (Periode 2024 - 2027)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {managementStructure.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-surface p-4 flex flex-col justify-between space-y-2"
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
              <div className="pt-2 border-t border-border/60 text-[11px] text-text-muted font-normal">
                Piket Siaga: {item.standby}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION D: Kontak Layanan Cepat (Emergency & Layanan Jamaah) */}
      <section aria-labelledby="kontak-cepat-heading" className="rounded-xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-none">
        <div>
          <Badge variant="destructive" className="mb-2">
            Siaga Warga
          </Badge>
          <h2 id="kontak-cepat-heading" className="font-heading font-semibold text-xl text-text-primary">
            Kontak Layanan Cepat & Tanggap Darurat
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary font-normal mt-0.5">
            Akses langsung bantuan armada darurat dan peminjaman inventaris masjid untuk keperluan warga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Emergency Ambulance Card */}
          <div className="rounded-lg border border-destructive/30 bg-destructive-subtle/30 p-5 flex flex-col justify-between space-y-4">
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
              <Button asChild variant="destructive" size="sm" className="w-full justify-center text-xs font-medium">
                <a href={waAmbulance} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-3.5 w-3.5 mr-1" />
                  <span>WhatsApp Driver Ambulans</span>
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="text-xs font-medium border-destructive/30 text-destructive hover:bg-destructive-subtle">
                <a href={`tel:${siteConfig.contacts.ambulancePhone}`}>
                  <Phone className="h-3.5 w-3.5 mr-1" />
                  <span>Telepon</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Marbot & Inventory Card */}
          <div className="rounded-lg border border-border bg-surface-subtle p-5 flex flex-col justify-between space-y-4">
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
              <Button asChild variant="default" size="sm" className="w-full justify-center text-xs font-medium">
                <a href={waMarbot} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-3.5 w-3.5 mr-1" />
                  <span>Hubungi Marbot via WA</span>
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="text-xs font-medium">
                <a href={`tel:${siteConfig.contacts.marbotPhone}`}>
                  <Phone className="h-3.5 w-3.5 mr-1 text-primary" />
                  <span>Telepon</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: Galeri Dokumentasi Terintegrasi */}
      <section aria-labelledby="galeri-heading" className="space-y-5">
        <div>
          <h2 id="galeri-heading" className="font-heading font-semibold text-xl text-text-primary">
            Dokumentasi & Arsip Kegiatan
          </h2>
          <p className="text-xs text-text-secondary font-normal mt-0.5">
            Dokumentasi foto kegiatan kemakmuran masjid dan khidmah warga (klik untuk melihat detail).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryData.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActiveGallery(photo)}
              className="cursor-pointer group rounded-xl border border-border bg-surface overflow-hidden hover:border-primary transition-colors"
            >
              {/* Photo Placeholder Container */}
              <div className="aspect-[4/3] w-full bg-surface-subtle flex flex-col items-center justify-center text-text-muted group-hover:bg-primary-pastel/30 transition-colors">
                <Camera className="h-7 w-7 text-primary/40 group-hover:text-primary transition-colors" />
                <span className="text-[11px] mt-1 font-normal">Foto Dokumentasi</span>
              </div>
              <div className="p-3.5 space-y-1">
                <div className="flex justify-between items-center text-[10px] text-text-muted">
                  <Badge variant="subtle" className="text-[9px] px-1.5 py-0">
                    {photo.category}
                  </Badge>
                  <span>{photo.date}</span>
                </div>
                <h3 className="font-heading font-semibold text-xs text-text-primary line-clamp-1 group-hover:text-primary transition-colors">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Lightbox Dialog Modal */}
        <Dialog open={Boolean(activeGallery)} onOpenChange={(open) => !open && setActiveGallery(null)}>
          {activeGallery && (
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
                  <Badge variant="default">{activeGallery.category}</Badge>
                  <span>{activeGallery.date}</span>
                </div>
                <DialogTitle className="font-heading font-semibold text-lg text-text-primary leading-snug">
                  {activeGallery.title}
                </DialogTitle>
              </DialogHeader>

              <div className="aspect-[16/10] w-full rounded-lg bg-surface-subtle border border-border flex flex-col items-center justify-center text-text-muted space-y-2">
                <Camera className="h-10 w-10 text-primary/40" />
                <span className="text-xs font-normal">Foto Resolusi Penuh Dokumentasi Masjid</span>
              </div>

              <DialogDescription className="text-xs text-text-secondary leading-relaxed pt-1">
                {activeGallery.description}
              </DialogDescription>

              <div className="pt-2 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => setActiveGallery(null)} className="text-xs font-medium">
                  Tutup Foto
                </Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </section>
    </div>
  );
}
