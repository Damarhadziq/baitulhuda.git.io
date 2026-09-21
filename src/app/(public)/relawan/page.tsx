import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants/site-config';
import { getWhatsAppUrl } from '@/lib/utils';
import { HeartHandshake, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export default function RelawanPage() {
  const roles = [
    { title: 'Relawan Penata Sound & Multimedia', count: '3 Orang', desc: 'Menjaga kejelasan audio khutbah Jum’at, kajian streaming, dan display TV jadwal sholat.' },
    { title: 'Tim Pembersih & Sanitasi Masjid', count: '6 Orang', desc: 'Memastikan karpet harum, tempat wudhu bersih tanpa lumut, dan toilet wangi setiap waktu sholat.' },
    { title: 'Relawan Distribusi Lumbung Pangan', count: '4 Orang', desc: 'Membantu penimbangan beras dan pengantaran sembako santun langsung ke rumah dhuafa.' },
    { title: 'Tim Pemulasaraan Jenazah (Fardhu Kifayah)', count: '5 Orang', desc: 'Siaga memandikan, mengkafani, dan mengurus perlengkapan lelayu warga tanpa membebani biaya.' },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      <div>
        <Badge variant="default" className="mb-2">
          Ladang Amal & Kebersamaan
        </Badge>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          Direktori Relawan & Khidmah Umat
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Bergabung bersama para pejuang kemakmuran rumah Allah di Kampung Asri.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {roles.map((r, i) => (
          <Card key={i} className="flex flex-col justify-between">
            <div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="subtle">{r.count}</Badge>
                  <HeartHandshake className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="mt-2 text-base">{r.title}</CardTitle>
                <CardDescription className="text-xs">{r.desc}</CardDescription>
              </CardHeader>
            </div>
            <div className="p-5 pt-0">
              <Button asChild variant="outline" size="sm" className="w-full">
                <a
                  href={getWhatsAppUrl(siteConfig.contacts.whatsappDkm, `Assalamu’alaikum DKM, saya ingin mendaftar sebagai relawan untuk bidang: ${r.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Daftar Khidmah Ini</span>
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
