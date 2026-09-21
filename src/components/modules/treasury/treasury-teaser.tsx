'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatRupiah } from '@/lib/utils';
import { siteConfig } from '@/lib/constants/site-config';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Wallet, QrCode, ArrowRight, ShieldCheck, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function TreasuryTeaser() {
  const [qrisOpen, setQrisOpen] = React.useState(false);

  return (
    <section aria-labelledby="transparansi-teaser-heading" className="space-y-4">
      <div className="rounded-3xl bg-surface-subtle/70 p-6 sm:p-8 shadow-none">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Summary Info */}
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-pastel text-primary">
                <Wallet className="h-4 w-4" />
              </div>
              <h2
                id="transparansi-teaser-heading"
                className="font-heading font-semibold text-lg sm:text-xl text-text-primary tracking-tight"
              >
                Transparansi Kas & Infaq Cepat
              </h2>
              <Badge variant="gold" className="text-[10px] font-medium">
                Amanah Umat
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
              Seluruh dana infaq kotak sholat Jum’at, transfer perbankan, dan QRIS dipublikasikan secara terbuka untuk pemeliharaan fasilitas ibadah dan santunan dhuafa.
            </p>
          </div>

          {/* Center/Right: Balance and Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 lg:pt-0">
            <div className="space-y-0.5">
              <span className="text-xs text-text-muted font-normal">Saldo Kas Aktif Berjalan:</span>
              <p className="font-mono text-2xl font-semibold text-primary">
                {formatRupiah(24850000)}
              </p>
              <span className="text-[11px] text-text-muted font-normal block">
                Pembaruan per 21 September 2026
              </span>
            </div>

            <Button
              variant="default"
              size="default"
              onClick={() => setQrisOpen(true)}
              className="text-xs font-medium self-stretch sm:self-auto rounded-full px-5"
            >
              <QrCode className="h-3.5 w-3.5 mr-1.5" />
              <span>Infaq QRIS</span>
            </Button>
          </div>
        </div>

        {/* Clean Link to Full Report */}
        <div className="mt-6 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
          <div className="flex items-center gap-4 text-text-secondary font-normal">
            <span className="flex items-center gap-1">
              <ArrowDownRight className="h-3.5 w-3.5 text-primary" />
              <span>Penerimaan Bulan Ini: <strong>{formatRupiah(8450000)}</strong></span>
            </span>
            <span className="text-text-muted/40">•</span>
            <span className="flex items-center gap-1">
              <ArrowUpRight className="h-3.5 w-3.5 text-destructive" />
              <span>Pengeluaran: <strong>{formatRupiah(3420000)}</strong></span>
            </span>
          </div>

          <Link
            href="/transparansi-kas"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline hover:text-primary-hover transition-colors"
          >
            <span>Lihat laporan mutasi dan pembukuan kas lengkap</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* QRIS Dialog Modal */}
      <Dialog open={qrisOpen} onOpenChange={setQrisOpen}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="font-heading font-semibold text-lg text-text-primary">
              QRIS Resmi Masjid Baitul Huda
            </DialogTitle>
            <DialogDescription className="text-xs text-text-secondary">
              Scan barcode di bawah menggunakan aplikasi perbankan digital atau e-wallet apa pun.
            </DialogDescription>
          </DialogHeader>

          <div className="my-2 flex flex-col items-center justify-center rounded-2xl bg-surface-subtle p-5">
            <div className="flex h-44 w-44 items-center justify-center rounded-xl bg-white text-primary">
              <QrCode className="h-36 w-36 text-primary" />
            </div>
            <p className="mt-3 text-xs font-semibold text-text-primary">
              NMID: ID1020268899120
            </p>
            <p className="text-[11px] text-text-muted">
              Standar QRIS Bank Indonesia • Bebas Biaya Admin
            </p>
          </div>

          <div className="rounded-xl bg-surface-subtle p-3.5 text-left text-xs space-y-1">
            <span className="text-text-muted font-normal">Transfer Manual Rekening BSI:</span>
            <p className="font-mono text-sm font-semibold text-primary">
              {siteConfig.treasury.accountNumber}
            </p>
            <p className="text-[11px] text-text-secondary font-normal">
              a.n. {siteConfig.treasury.accountHolder}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
