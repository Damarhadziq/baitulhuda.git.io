'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { formatRupiah } from '@/lib/utils';
import { siteConfig } from '@/lib/constants/site-config';
import {
  Wallet,
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Copy,
  Check,
  QrCode,
  Download,
  FileText,
  Sparkles,
  Receipt,
} from 'lucide-react';

interface TransactionRecord {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'in' | 'out';
  amount: number;
  receiptNote: string;
}

const transactionData: TransactionRecord[] = [
  {
    id: 'tx-1',
    date: '19/09/2026',
    description: 'Kotak Infaq Sholat Jum’at Warga',
    category: 'Infaq Jum’at',
    type: 'in',
    amount: 3820000,
    receiptNote: 'Berita Acara Penghitungan Bersama 3 Saksi Jamaah Jum’at',
  },
  {
    id: 'tx-2',
    date: '17/09/2026',
    description: 'Pembayaran Tagihan Listrik PLN & Air PDAM',
    category: 'Operasional',
    type: 'out',
    amount: 845000,
    receiptNote: 'Struk Resmi PLN & PDAM Kota Semarang',
  },
  {
    id: 'tx-3',
    date: '15/09/2026',
    description: 'Infaq Digital via QRIS Bank Indonesia',
    category: 'Infaq QRIS',
    type: 'in',
    amount: 1250000,
    receiptNote: 'Rekap Settlement Merchant QRIS BSI',
  },
  {
    id: 'tx-4',
    date: '12/09/2026',
    description: 'Pembelian Pewangi Karpet & Sabun Sanitasi Tempat Wudhu',
    category: 'Perawatan Gedung',
    type: 'out',
    amount: 350000,
    receiptNote: 'Nota Toko Kebersihan Barokah Grosir',
  },
  {
    id: 'tx-5',
    date: '10/09/2026',
    description: 'Bisyarah Marbot & Petugas Kebersihan (Bulan Sept)',
    category: 'SDM & Khidmah',
    type: 'out',
    amount: 1500000,
    receiptNote: 'Tanda Terima Kwitansi Marbot Masjid',
  },
  {
    id: 'tx-6',
    date: '08/09/2026',
    description: 'Santunan Biaya Pengobatan Warga Lansia Dhuafa (RT 03)',
    category: 'Sosial & Dhuafa',
    type: 'out',
    amount: 725000,
    receiptNote: 'Kwitansi Pembelian Obat & Laporan Amil Sosial',
  },
  {
    id: 'tx-7',
    date: '05/09/2026',
    description: 'Infaq Subuh Berjamaah & Sedekah Kotak Keliling',
    category: 'Sedekah Subuh',
    type: 'in',
    amount: 960000,
    receiptNote: 'Pencatatan Kasir Subuh Berjamaah DKM',
  },
];

export default function TransparansiKasPage() {
  const [selectedReceipt, setSelectedReceipt] = React.useState<TransactionRecord | null>(null);
  const [copiedBsi, setCopiedBsi] = React.useState(false);
  const [copiedJateng, setCopiedJateng] = React.useState(false);

  const copyToClipboard = (text: string, type: 'bsi' | 'jateng') => {
    navigator.clipboard.writeText(text);
    if (type === 'bsi') {
      setCopiedBsi(true);
      setTimeout(() => setCopiedBsi(false), 2000);
    } else {
      setCopiedJateng(true);
      setTimeout(() => setCopiedJateng(false), 2000);
    }
  };

  const allocationBars = [
    { label: 'Operasional Listrik & Air', percentage: 25, amount: 845000 },
    { label: 'Santunan Dhuafa & Sosial', percentage: 21, amount: 725000 },
    { label: 'Dakwah & Pembinaan Jamaah', percentage: 10, amount: 350000 },
    { label: 'Perawatan Gedung & Sanitasi', percentage: 44, amount: 1500000 },
  ];

  return (
    <TooltipProvider>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
        {/* Header Page */}
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-pastel px-3 py-1 text-xs font-medium text-primary mb-2 border border-primary/10">
            <Sparkles className="h-3 w-3" />
            <span>Akuntabilitas Finansial</span>
          </div>
          <h1 className="font-heading font-semibold text-2xl sm:text-3xl text-text-primary tracking-tight">
            Transparansi & Pembukuan Kas
          </h1>
          <p className="mt-1 text-sm text-text-secondary leading-relaxed font-normal">
            Amanah, transparan, dan terbuka untuk seluruh jamaah.
          </p>
        </div>

        {/* KPI Metrics Strip (3 Cards Grid) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="border-primary/20 bg-primary-pastel/30">
            <CardHeader className="pb-1">
              <CardDescription className="text-text-secondary text-xs">
                Saldo Kas Saat Ini
              </CardDescription>
              <CardTitle className="font-mono text-2xl sm:text-3xl font-semibold text-primary">
                {formatRupiah(24850000)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-[11px] text-text-muted font-normal">
                Likuid di rekening BSI dan brankas DKM
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-1">
              <CardDescription className="text-text-secondary text-xs">
                Total Penerimaan Bulan Berjalan
              </CardDescription>
              <CardTitle className="font-mono text-2xl font-semibold text-primary flex items-center gap-1">
                <ArrowDownRight className="h-5 w-5 text-primary" />
                <span>{formatRupiah(8450000)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-[11px] text-text-muted font-normal">
                Dari 4x Kotak Jum’at, Subuh, dan QRIS
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-1">
              <CardDescription className="text-text-secondary text-xs">
                Total Pengeluaran Bulan Berjalan
              </CardDescription>
              <CardTitle className="font-mono text-2xl font-semibold text-destructive flex items-center gap-1">
                <ArrowUpRight className="h-5 w-5 text-destructive" />
                <span>{formatRupiah(3420000)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-[11px] text-text-muted font-normal">
                Listrik, air, marbot, dan sosial
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Alokasi Pengeluaran (Visual Clean Bar) */}
        <div className="rounded-xl border border-border bg-surface p-6 space-y-4 shadow-none">
          <div>
            <h3 className="font-heading font-semibold text-base text-text-primary">
              Alokasi Pengeluaran Bulan Ini
            </h3>
            <p className="text-xs text-text-secondary font-normal mt-0.5">
              Distribusi penggunaan dana infaq jamaah untuk keberlangsungan fasilitas ibadah dan kemanusiaan.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {allocationBars.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-normal text-text-primary">{item.label}</span>
                  <span className="font-mono font-medium text-text-secondary">
                    {formatRupiah(item.amount)} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabel Mutasi Kas Transparan */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle>Buku Mutasi Kas Digital</CardTitle>
                <CardDescription>
                  Pencatatan real-time pemasukan dan pengeluaran kas masjid
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="text-xs font-medium self-start sm:self-auto">
                <Download className="h-3.5 w-3.5 mr-1" />
                <span>Unduh Laporan PDF</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-28">Tanggal</TableHead>
                  <TableHead>Uraian Transaksi</TableHead>
                  <TableHead className="w-36">Kategori</TableHead>
                  <TableHead className="w-36 text-right">Nominal</TableHead>
                  <TableHead className="w-24 text-center">Bukti Struk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionData.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono text-xs text-text-muted">
                      {tx.date}
                    </TableCell>
                    <TableCell className="text-xs font-medium text-text-primary">
                      {tx.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="subtle" className="text-[10px]">
                        {tx.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-semibold text-right">
                      <span className={tx.type === 'in' ? 'text-[#2D6A4F]' : 'text-[#C85A54]'}>
                        {tx.type === 'in' ? '+' : '-'} {formatRupiah(tx.amount)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => setSelectedReceipt(tx)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-text-muted hover:text-primary hover:border-primary transition-colors"
                            aria-label={`Lihat bukti struk ${tx.description}`}
                          >
                            <Camera className="h-3.5 w-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>Lihat foto struk/nota</span>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Section Infaq Digital */}
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8 shadow-none space-y-6">
          <div>
            <Badge variant="default" className="mb-2">
              Saluran Infaq Digital
            </Badge>
            <h2 className="font-heading font-semibold text-xl text-text-primary">
              Salurkan Infaq & Sedekah Terbaik
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal mt-1">
              Mudah, aman, dan langsung masuk ke kas masjid yang terpantau transparan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left: Bank Accounts Transfer Option */}
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-surface-subtle p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-text-primary">
                    {siteConfig.treasury.bankName}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(siteConfig.treasury.accountNumber, 'bsi')}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                  >
                    {copiedBsi ? (
                      <>
                        <Check className="h-3 w-3 text-primary" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Salin No. Rek</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono text-base font-semibold text-primary">
                  {siteConfig.treasury.accountNumber}
                </p>
                <p className="text-[11px] text-text-muted font-normal">
                  a.n. {siteConfig.treasury.accountHolder}
                </p>
              </div>

              <div className="rounded-lg border border-border bg-surface-subtle p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-text-primary">
                    Bank Jateng Syariah
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(siteConfig.treasury.bankJatengSyariah, 'jateng')}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                  >
                    {copiedJateng ? (
                      <>
                        <Check className="h-3 w-3 text-primary" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Salin No. Rek</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono text-base font-semibold text-primary">
                  {siteConfig.treasury.bankJatengSyariah}
                </p>
                <p className="text-[11px] text-text-muted font-normal">
                  a.n. DKM Baitul Huda Operasional
                </p>
              </div>
            </div>

            {/* Right: QRIS Display Box */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface-subtle p-6 text-center">
              <div className="flex h-44 w-44 items-center justify-center rounded-lg border border-border bg-white text-primary">
                <QrCode className="h-36 w-36 text-primary" />
              </div>
              <p className="mt-3 text-xs font-semibold text-text-primary">
                QRIS Resmi Masjid Baitul Huda
              </p>
              <p className="text-[11px] text-text-muted font-normal">
                NMID: ID1020268899120 • Standar Bank Indonesia
              </p>
            </div>
          </div>
        </div>

        {/* Struk / Nota Dialog Modal */}
        <Dialog open={Boolean(selectedReceipt)} onOpenChange={(open) => !open && setSelectedReceipt(null)}>
          {selectedReceipt && (
            <DialogContent className="max-w-md">
              <DialogHeader>
                <div className="inline-flex items-center gap-1.5 text-xs text-text-muted mb-1">
                  <Receipt className="h-3.5 w-3.5 text-primary" />
                  <span>Bukti Struk Pembelian / Kwitansi</span>
                </div>
                <DialogTitle className="font-heading font-semibold text-lg text-text-primary">
                  {selectedReceipt.description}
                </DialogTitle>
                <DialogDescription className="text-xs text-text-secondary">
                  Tanggal: {selectedReceipt.date} • Nominal: {formatRupiah(selectedReceipt.amount)}
                </DialogDescription>
              </DialogHeader>

              {/* Simulated Receipt Preview */}
              <div className="rounded-lg border border-border bg-surface-subtle p-6 flex flex-col items-center justify-center text-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-primary-pastel text-primary flex items-center justify-center">
                  <Camera className="h-6 w-6" />
                </div>
                <span className="font-medium text-xs text-text-primary">
                  {selectedReceipt.receiptNote}
                </span>
                <p className="text-[11px] text-text-muted font-normal">
                  Nomor Arsip Pembukuan: DKM-BTL/{selectedReceipt.id.toUpperCase()}
                </p>
                <div className="pt-2 text-[10px] text-text-secondary border-t border-border w-full text-center">
                  Telah diverifikasi oleh Bendahara DKM & Dewan Pengawas Kas
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => setSelectedReceipt(null)} className="text-xs font-medium">
                  Tutup Bukti
                </Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
