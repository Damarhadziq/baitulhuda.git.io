import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants/site-config';
import { getWhatsAppUrl } from '@/lib/utils';
import { ShoppingBag, MessageCircle, HeartHandshake, PackageCheck, Store } from 'lucide-react';

export default function LumbungUmkmPage() {
  const umkmList = [
    {
      name: 'Warung Bu Harsono (Pecel & Sayur Matang)',
      owner: 'Ibu Hj. Harsono (RT 01)',
      category: 'Kuliner & Sarapan',
      desc: 'Nasi pecel pincuk madiun, sayur lodeh, gorengan tempe kemul anget.',
      phone: '081299881122',
      location: 'Depan gapura RT 01',
    },
    {
      name: 'Madu Randu Murni Huda Asri',
      owner: 'Pak Ridwan (RT 03)',
      category: 'Herbal & Kesehatan',
      desc: 'Madu mentah alami tanpa campuran gula, panen lebah lokal pegunungan.',
      phone: '081388776655',
      location: 'Jl. Melati No. 12',
    },
    {
      name: 'Jasa Servis Kipas & Elektronik Ringan',
      owner: 'Mas Arif (Remaja Masjid)',
      category: 'Jasa & Pertukangan',
      desc: 'Gulung dinamo, servis kulkas mati, ganti colokan & instalasi listrik rumah.',
      phone: '081512347890',
      location: 'Samping pos ronda RW 02',
    },
    {
      name: 'Laundry Kiloan Berkah Barokah',
      owner: 'Mbak Dewi (RT 02)',
      category: 'Jasa Cuci',
      desc: 'Cuci setrika wangi, antar jemput gratis untuk jamaah masjid.',
      phone: '081977663311',
      location: 'Gang Huda 2',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      <div>
        <Badge variant="default" className="mb-2">
          Ekonomi Berdaya & Peduli
        </Badge>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          Lumbung Pangan & Etalase UMKM Jamaah
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Menggerakkan gotong royong pangan untuk warga dhuafa dan memajukan usaha perniagaan tetangga sendiri.
        </p>
      </div>

      {/* Lumbung Pangan Box */}
      <div className="rounded-xl border border-border bg-surface p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <PackageCheck className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-lg font-semibold text-text-primary">
                Program Lumbung Pangan Sembako Dhuafa
              </h2>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              Penyaluran beras dan minyak goreng bulanan kepada 37 Kepala Keluarga berhak terima di Kampung Asri.
            </p>
          </div>
          <Badge variant="gold">Target Bulan Ini: 200 Kg</Badge>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Terkumpul saat ini: <strong className="text-text-primary">185 Kg</strong></span>
            <span className="font-semibold text-primary">92.5%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-border overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: '92.5%' }} />
          </div>
          <p className="text-[11px] text-text-muted">
            Kurang 15 Kg lagi untuk mencukupi kuota paket sembako pekan depan. Bagi warga yang hendak berinfaq beras dapat menyerahkan langsung ke sekretariat DKM.
          </p>
        </div>
      </div>

      {/* UMKM Catalog */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="font-heading text-xl font-semibold text-text-primary flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              <span>Etalase Usaha Jamaah & Warga</span>
            </h2>
            <p className="text-xs text-text-secondary">
              Beli dari tetangga, rekatkan silaturahmi, hidupkan ekonomi berkah.
            </p>
          </div>

          <Button asChild variant="outline" size="sm">
            <a
              href={getWhatsAppUrl(siteConfig.contacts.whatsappDkm, 'Assalamu’alaikum DKM, saya warga ingin mendaftarkan produk usaha saya ke etalase web masjid.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>+ Daftarkan Usaha Anda</span>
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {umkmList.map((shop, idx) => (
            <Card key={idx} className="flex flex-col justify-between">
              <div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="subtle">{shop.category}</Badge>
                    <span className="text-[11px] text-text-muted">{shop.location}</span>
                  </div>
                  <CardTitle className="mt-2 text-base">{shop.name}</CardTitle>
                  <CardDescription className="text-xs text-text-muted">
                    Pemilik: {shop.owner}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-text-secondary">{shop.desc}</p>
                </CardContent>
              </div>
              <div className="p-5 pt-0">
                <Button asChild variant="pastel" size="sm" className="w-full">
                  <a
                    href={getWhatsAppUrl(shop.phone, `Assalamu’alaikum ${shop.owner}, saya tertarik dengan produk ${shop.name} yang tertera di web Masjid Baitul Huda.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Pesan via WhatsApp</span>
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
