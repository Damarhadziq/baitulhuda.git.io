import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

export default function GaleriPage() {
  const galleries = [
    { title: 'Kajian Shubuh Berjamaah & Sarapan Bersama', date: 'September 2026', tag: 'Kajian' },
    { title: 'Pembersihan Rutin Karpet & Pengharum Ruangan', date: 'Agustus 2026', tag: 'Kebersihan' },
    { title: 'Penyaluran Beras Lumbung Dhuafa Tahap VIII', date: 'Agustus 2026', tag: 'Lumbung Pangan' },
    { title: 'Peringatan Tahun Baru Hijriyah Bersama Anak Yatim', date: 'Juli 2026', tag: 'Sosial' },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      <div>
        <Badge variant="default" className="mb-2">
          Arsip & Dokumentasi
        </Badge>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
          Galeri & Dokumentasi Kegiatan
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Potret kebersamaan dan khidmah jamaah Masjid Baitul Huda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {galleries.map((item, idx) => (
          <Card key={idx} className="overflow-hidden">
            <div className="h-48 w-full bg-surface-subtle border-b border-border flex flex-col items-center justify-center text-text-muted gap-2">
              <ImageIcon className="h-8 w-8 text-primary/40" />
              <span className="text-xs">Foto Dokumentasi Kegiatan</span>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="subtle">{item.tag}</Badge>
                <span className="text-xs text-text-muted">{item.date}</span>
              </div>
              <CardTitle className="mt-2 text-base">{item.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
