'use client';

import * as React from 'react';
import Link from 'next/link';
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
import {
  ScanLine,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  QrCode,
} from 'lucide-react';

export function TreasuryTeaser() {
  const [qrisOpen, setQrisOpen] = React.useState(false);

  return (
    <section aria-labelledby="transparansi-teaser-heading" className="space-y-4">
      <div className="rounded-2xl bg-surface-subtle/70 p-6 sm:p-8 shadow-none space-y-6">
        {/* Header: Accounting & Governance Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-pastel text-primary">
                <Receipt className="h-4 w-4" />
              </div>
              <h2
                id="transparansi-teaser-heading"
                className="font-heading font-semibold text-lg sm:text-xl text-text-primary tracking-tight"
              >
                Transparansi Pembukuan Kas & Infaq
              </h2>
              <Badge variant="default" className="text-[10px] font-medium rounded-lg">
                <ShieldCheck className="h-3 w-3 mr-1 text-primary" />
                <span>Terverifikasi DKM</span>
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
              Pencatatan mutasi kas riil secara terbuka demi menjaga amanah sedekah, infaq Jumat, dan infaq digital jamaah.
            </p>
          </div>

          <Button
            variant="default"
            size="default"
            onClick={() => setQrisOpen(true)}
            className="text-xs font-medium self-start sm:self-auto rounded-lg px-4"
          >
            <ScanLine className="h-4 w-4 mr-1.5" />
            <span>Scan Infaq</span>
          </Button>
        </div>

        {/* 4 Economic Ledger Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Card 1: Saldo Kas Berjalan */}
          <div className="rounded-xl bg-white p-4 space-y-1 shadow-none">
            <span className="text-[11px] text-text-muted font-normal block">
              Saldo Kas Aktif (Likuid)
            </span>
            <p className="font-mono text-xl sm:text-2xl font-semibold text-primary">
              {formatRupiah(24850000)}
            </p>
            <span className="text-[10px] text-text-secondary font-normal block">
              Per 21-09-2026 • Rekening BSI & Tunai
            </span>
          </div>

          {/* Card 2: Penerimaan (Debits) */}
          <div className="rounded-xl bg-white p-4 space-y-1 shadow-none">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-muted font-normal">
                Penerimaan Bulan Ini
              </span>
              <ArrowDownLeft className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="font-mono text-lg sm:text-xl font-semibold text-primary">
              +{formatRupiah(8450000)}
            </p>
            <span className="text-[10px] text-text-secondary font-normal block">
              Infaq Kotak, QRIS, & Transfer
            </span>
          </div>

          {/* Card 3: Realisasi Belanja (Credits) */}
          <div className="rounded-xl bg-white p-4 space-y-1 shadow-none">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-muted font-normal">
                Pengeluaran Operasional
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-destructive" />
            </div>
            <p className="font-mono text-lg sm:text-xl font-semibold text-destructive">
              -{formatRupiah(3420000)}
            </p>
            <span className="text-[10px] text-text-secondary font-normal block">
              Listrik, Kebersihan, & Perawatan
            </span>
          </div>

          {/* Card 4: Surplus Berjalan */}
          <div className="rounded-xl bg-white p-4 space-y-1 shadow-none">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-muted font-normal">
                Surplus Bersih Berjalan
              </span>
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="font-mono text-lg sm:text-xl font-semibold text-primary">
              +{formatRupiah(5030000)}
            </p>
            <span className="text-[10px] text-text-secondary font-normal block">
              Rasio Keuangan Sehat 100%
            </span>
          </div>
        </div>

        {/* Footer Navigation Link */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <span className="text-text-secondary font-normal">
            Buku kas ditutup setiap akhir pekan oleh Bendahara DKM dan dipublikasikan transparan.
          </span>

          <Link
            href="/transparansi-kas"
            className="inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary-hover hover:underline transition-colors"
          >
            <span>Buka Laporan Neraca & Mutasi Lengkap</span>
            <ArrowRight className="h-3.5 w-3.5" />
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
              Scan barcode di bawah menggunakan aplikasi perbankan digital atau dompet digital nasional.
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
