'use client';

import * as React from 'react';
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
  Sparkles,
  Receipt,
  ShieldCheck,
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
      <div className="space-y-12 md:space-y-16 pb-20">
        {/* 1. DISTINCT HERO SECTION: Transparency & Trust */}
        <section className="relative pt-6 pb-4 md:pt-10 md:pb-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="relative rounded-3xl bg-surface-subtle/70 p-6 sm:p-10 md:p-12 overflow-hidden">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-gold-subtle/60 blur-3xl" />

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-pastel px-3.5 py-1 text-xs font-medium text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Akuntabilitas & Keterbukaan Finansial</span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary leading-[1.2]">
                  Transparansi Kas & <br />
                  <span className="text-primary">Amanah Infaq Jamaah</span>
                </h1>

                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
                  Setiap rupiah amanah infaq dan sedekah dicatat secara akuntabel, transparan tanpa sekat rahasia, serta dialokasikan untuk kemakmuran peribadahan dan kemaslahatan sosial warga.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-text-secondary font-normal">
                  <span className="rounded-full bg-white px-3 py-1 text-xs">
                    ✓ Pencatatan Kas Terbuka Real-Time
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs">
                    ✓ Diaudit Bersama Saksi Jamaah
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs">
                    ✓ Bukti Struk & Kwitansi Tervalidasi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. KPI METRICS STRIP (3 Seamless Cards) */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-primary-pastel/60 p-6 space-y-2">
              <span className="text-xs text-text-secondary font-medium">
                Saldo Kas Saat Ini
              </span>
              <p className="font-mono text-2xl sm:text-3xl font-semibold text-primary">
                {formatRupiah(24850000)}
              </p>
              <span className="text-[11px] text-text-muted font-normal block">
                Likuid di rekening BSI dan brankas DKM
              </span>
            </div>

            <div className="rounded-2xl bg-surface-subtle/70 p-6 space-y-2">
              <span className="text-xs text-text-secondary font-medium">
                Penerimaan Bulan Berjalan
              </span>
              <p className="font-mono text-2xl font-semibold text-primary flex items-center gap-1">
                <ArrowDownRight className="h-5 w-5 text-primary" />
                <span>{formatRupiah(8450000)}</span>
              </p>
              <span className="text-[11px] text-text-muted font-normal block">
                Dari 4x Kotak Jum’at, Subuh, dan QRIS
              </span>
            </div>

            <div className="rounded-2xl bg-surface-subtle/70 p-6 space-y-2">
              <span className="text-xs text-text-secondary font-medium">
                Pengeluaran Bulan Berjalan
              </span>
              <p className="font-mono text-2xl font-semibold text-destructive flex items-center gap-1">
                <ArrowUpRight className="h-5 w-5 text-destructive" />
                <span>{formatRupiah(3420000)}</span>
              </p>
              <span className="text-[11px] text-text-muted font-normal block">
                Listrik, air, marbot, dan sosial
              </span>
            </div>
          </div>
        </section>

        {/* 3. ALOKASI PENGELUARAN (Airy Bar Visual) */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-3xl bg-surface-subtle/70 p-6 sm:p-8 space-y-5">
            <div>
              <h3 className="font-heading font-semibold text-base sm:text-lg text-text-primary">
                Alokasi Pengeluaran Bulan Ini
              </h3>
              <p className="text-xs text-text-secondary font-normal mt-0.5">
                Distribusi penggunaan dana infaq jamaah untuk keberlangsungan fasilitas ibadah dan kepedulian sosial.
              </p>
            </div>

            <div className="space-y-3.5 pt-1">
              {allocationBars.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-normal text-text-primary">{item.label}</span>
                    <span className="font-mono font-medium text-text-secondary">
                      {formatRupiah(item.amount)} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. TABEL BUKU MUTASI KAS DIGITAL (Borderless) */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-3xl bg-surface-subtle/60 p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-heading font-semibold text-base sm:text-lg text-text-primary">
                  Buku Mutasi Kas Digital
                </h3>
                <p className="text-xs text-text-secondary font-normal mt-0.5">
                  Pencatatan real-time pemasukan dan pengeluaran kas masjid
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-medium self-start sm:self-auto rounded-full px-4 bg-white"
              >
                <Download className="h-3.5 w-3.5 mr-1" />
                <span>Unduh Laporan PDF</span>
              </Button>
            </div>

            <div className="overflow-x-auto rounded-2xl bg-white p-3">
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
                        <span className={tx.type === 'in' ? 'text-primary' : 'text-destructive'}>
                          {tx.type === 'in' ? '+' : '-'} {formatRupiah(tx.amount)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={() => setSelectedReceipt(tx)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-subtle text-text-muted hover:text-primary hover:bg-primary-pastel transition-colors"
                              aria-label={`Lihat bukti struk ${tx.description}`}
                            >
                              <Camera className="h-4 w-4" />
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
            </div>
          </div>
        </section>

        {/* 5. SALURAN INFAQ DIGITAL (Spacious, Clean) */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-3xl bg-surface-subtle/70 p-6 sm:p-8 space-y-6">
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
                <div className="rounded-2xl bg-white p-5 space-y-2">
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

                <div className="rounded-2xl bg-white p-5 space-y-2">
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
                    a.n. {siteConfig.treasury.accountHolder}
                  </p>
                </div>
              </div>

              {/* Right: QRIS Scan Display */}
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 text-center">
                <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-surface-subtle text-primary">
                  <QrCode className="h-32 w-32 text-primary" />
                </div>
                <h4 className="mt-3 text-sm font-semibold text-text-primary">
                  QRIS Nasional Bebas Admin
                </h4>
                <p className="text-[11px] text-text-muted max-w-xs mt-0.5">
                  Buka aplikasi mobile banking (BSI, BCA, Mandiri, BRI) atau e-wallet (GoPay, OVO, ShopeePay).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Modal Dialog Struk Bukti */}
        <Dialog open={Boolean(selectedReceipt)} onOpenChange={(open) => !open && setSelectedReceipt(null)}>
          {selectedReceipt && (
            <DialogContent className="max-w-md">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={selectedReceipt.type === 'in' ? 'default' : 'subtle'}>
                    {selectedReceipt.category}
                  </Badge>
                  <span className="text-xs text-text-muted font-mono">{selectedReceipt.date}</span>
                </div>
                <DialogTitle className="font-heading font-semibold text-lg text-text-primary">
                  Bukti Verifikasi Kas
                </DialogTitle>
                <DialogDescription className="text-xs text-text-secondary">
                  {selectedReceipt.description}
                </DialogDescription>
              </DialogHeader>

              <div className="my-2 flex flex-col items-center justify-center rounded-2xl bg-surface-subtle p-6 text-center space-y-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-pastel text-primary">
                  <Receipt className="h-8 w-8" />
                </div>
                <div>
                  <span className="text-xs text-text-muted font-normal">Nominal Transaksi:</span>
                  <p className="font-mono text-xl font-semibold text-primary">
                    {selectedReceipt.type === 'in' ? '+' : '-'} {formatRupiah(selectedReceipt.amount)}
                  </p>
                </div>
                <p className="text-xs text-text-secondary max-w-xs leading-relaxed">
                  {selectedReceipt.receiptNote}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedReceipt(null)}
                  className="text-xs font-medium rounded-full px-4"
                >
                  Tutup
                </Button>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
