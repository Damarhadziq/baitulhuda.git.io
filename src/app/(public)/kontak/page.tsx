import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants/site-config';
import { getWhatsAppUrl } from '@/lib/utils';
import { Phone, Mail, MapPin, MessageCircle, Clock, Sparkles } from 'lucide-react';

export default function KontakPage() {
  const dkmWa = getWhatsAppUrl(
    siteConfig.contacts.whatsappDkm,
    'Assalamu’alaikum Pengurus DKM Masjid Baitul Huda, saya ada keperluan terkait layanan masjid.'
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      <div>
        <Badge variant="default" className="mb-2">
          Pusat Informasi & Pelayanan
        </Badge>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          Kontak DKM & Layanan Warga
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Pintu sekretariat dan komunikasi kami senantiasa terbuka untuk kebutuhan jamaah dan warga.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-pastel text-primary">
              <MessageCircle className="h-5 w-5" />
            </div>
            <CardTitle className="mt-3">Layanan WhatsApp DKM</CardTitle>
            <CardDescription>
              Respon cepat untuk kabar lelayu, izin peminjaman aula/tenda, zakat, infaq, dan konsultasi syariah.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-mono text-base font-semibold text-text-primary">
              {siteConfig.contacts.whatsappDkm}
            </p>
            <Button asChild variant="default" size="default" className="w-full">
              <a href={dkmWa} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                <span>Chat Langsung via WhatsApp</span>
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-pastel text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <CardTitle className="mt-3">Alamat & Sekretariat</CardTitle>
            <CardDescription>
              Lokasi fisik Masjid Baitul Huda di tengah kampung yang asri dan tenang.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-text-secondary">
            <p className="font-medium text-text-primary text-sm">
              {siteConfig.name}
            </p>
            <p>{siteConfig.address.street}</p>
            <p>{siteConfig.address.village}, {siteConfig.address.district}</p>
            <p>{siteConfig.address.city}, {siteConfig.address.province} {siteConfig.address.postalCode}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
