'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { formatRupiah, getWhatsAppUrl } from '@/lib/utils';
import { siteConfig } from '@/lib/constants/site-config';
import {
  ShoppingBag,
  Store,
  Filter,
  Plus,
  MessageCircle,
  PackageCheck,
  HeartHandshake,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  category: 'Kuliner' | 'Sembako & Sayur' | 'Pakaian/Jahit' | 'Jasa & Teknik';
  owner: string;
  domicile: string;
  price: number;
  description: string;
  phone: string;
}

const initialProducts: ProductItem[] = [
  {
    id: 'p1',
    name: 'Nasi Pecel Pincuk Madiun & Gorengan Anget',
    category: 'Kuliner',
    owner: 'Bu Hj. Harsono',
    domicile: 'RT 01 / RW 02',
    price: 12000,
    description: 'Bumbu kacang medok asli, sayuran segar rebus, tempe kemul anget, dan peyek renyah.',
    phone: '081299881122',
  },
  {
    id: 'p2',
    name: 'Madu Randu & Klanceng Huda Murni',
    category: 'Kuliner',
    owner: 'Pak Ridwan',
    domicile: 'RT 03 / RW 02',
    price: 85000,
    description: 'Madu mentah alami tanpa pengolahan kimia dan tanpa pemanis buatan, panen lokal.',
    phone: '081388776655',
  },
  {
    id: 'p3',
    name: 'Beras Organik Mentik Wangi (5 Kg)',
    category: 'Sembako & Sayur',
    owner: 'Toko Berkah Tani Mas Joko',
    domicile: 'RT 02 / RW 02',
    price: 72000,
    description: 'Beras pulen harum alami, bebas pemutih dan pengawet, hasil panen sawah binaan.',
    phone: '081977663311',
  },
  {
    id: 'p4',
    name: 'Jasa Jahit Baju Muslim & Permak Busana',
    category: 'Pakaian/Jahit',
    owner: 'Ibu Maryam',
    domicile: 'RT 04 / RW 02',
    price: 35000,
    description: 'Jahit gamis, kemeja koko, pasang resleting, dan potong celana rapi tepat waktu.',
    phone: '081722334411',
  },
  {
    id: 'p5',
    name: 'Servis Kipas Angin, Pompa Air & Kelistrikan',
    category: 'Jasa & Teknik',
    owner: 'Mas Arif (Remaja Masjid)',
    domicile: 'RT 02 / RW 02',
    price: 45000,
    description: 'Servis gulung dinamo, instalasi lampu hemat listrik, dan perbaikan stopkontak.',
    phone: '081512347890',
  },
  {
    id: 'p6',
    name: 'Kue Basah Tradisional & Snack Box Pengajian',
    category: 'Kuliner',
    owner: 'Mbak Dewi',
    domicile: 'RT 01 / RW 02',
    price: 15000,
    description: 'Lemper ayam, nagasari, pastel renyah, dan bolu kukus mekar higienis.',
    phone: '081399112244',
  },
];

const registerStoreSchema = z.object({
  productName: z.string().min(3, { message: 'Nama produk minimal 3 karakter' }),
  category: z.string().min(1, { message: 'Pilih kategori' }),
  owner: z.string().min(3, { message: 'Nama pemilik minimal 3 karakter' }),
  domicile: z.string().min(2, { message: 'RT/RW wajib diisi' }),
  price: z.string().min(1, { message: 'Harga produk wajib diisi' }),
  phone: z.string().min(10, { message: 'No. WA minimal 10 digit' }),
  description: z.string().min(5, { message: 'Deskripsi minimal 5 karakter' }),
});

type RegisterStoreValues = z.infer<typeof registerStoreSchema>;

const sembakoCommitmentSchema = z.object({
  donorName: z.string().min(3, { message: 'Nama donatur minimal 3 karakter' }),
  phone: z.string().min(10, { message: 'No. WA minimal 10 digit' }),
  itemType: z.string().min(1, { message: 'Pilih jenis barang' }),
  quantity: z.string().min(1, { message: 'Jumlah wajib diisi' }),
  dropPlan: z.string().min(3, { message: 'Rencana drop barang wajib diisi' }),
});

type SembakoCommitmentValues = z.infer<typeof sembakoCommitmentSchema>;

export default function EtalasePage() {
  const [activeTab, setActiveTab] = React.useState('umkm');
  const [categoryFilter, setCategoryFilter] = React.useState<string>('Semua Kategori');
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const [sembakoOpen, setSembakoOpen] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  // Store registration form
  const storeForm = useForm<RegisterStoreValues>({
    resolver: zodResolver(registerStoreSchema),
    defaultValues: {
      productName: '',
      category: 'Kuliner',
      owner: '',
      domicile: '',
      price: '',
      phone: '',
      description: '',
    },
  });

  // Sembako commitment form
  const sembakoForm = useForm<SembakoCommitmentValues>({
    resolver: zodResolver(sembakoCommitmentSchema),
    defaultValues: {
      donorName: '',
      phone: '',
      itemType: 'Beras (Kg)',
      quantity: '',
      dropPlan: '',
    },
  });

  const onRegisterStoreSubmit = async (data: RegisterStoreValues) => {
    await new Promise((r) => setTimeout(r, 600));
    setSuccessMsg('Pendaftaran usaha berhasil dikirim ke pengurus DKM untuk verifikasi tayang!');
    storeForm.reset();
  };

  const onSembakoSubmit = async (data: SembakoCommitmentValues) => {
    await new Promise((r) => setTimeout(r, 600));
    setSuccessMsg('Komitmen sedekah sembako Anda tercatat! Tim DKM akan menyambut di posko masjid.');
    sembakoForm.reset();
  };

  const filteredProducts = React.useMemo(() => {
    if (categoryFilter === 'Semua Kategori') return initialProducts;
    return initialProducts.filter((p) => p.category === categoryFilter);
  }, [categoryFilter]);

  const waLaporRentan = getWhatsAppUrl(
    siteConfig.contacts.whatsappDkm,
    'Assalamu’alaikum DKM Amil Sosial, saya ingin melaporkan secara privat warga/keluarga di lingkungan kami yang membutuhkan bantuan sembako darurat.'
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      {/* Header Page */}
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-pastel px-3 py-1 text-xs font-medium text-primary mb-2 border border-primary/10">
          <Sparkles className="h-3 w-3" />
          <span>Pemberdayaan & Solidaritas Jamaah</span>
        </div>
        <h1 className="font-heading font-semibold text-2xl sm:text-3xl text-text-primary tracking-tight">
          Etalase Jamaah & Lumbung Pangan
        </h1>
        <p className="mt-1 text-sm text-text-secondary leading-relaxed font-normal max-w-2xl">
          Mendukung ekonomi tetangga sendiri melalui direktori UMKM warga, dan memastikan tidak ada saudara kita yang kelaparan melalui Lumbung Pangan Masjid.
        </p>
      </div>

      {/* Top Segment Switcher (shadcn Tabs) */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="umkm" className="flex items-center gap-1.5">
            <Store className="h-3.5 w-3.5" />
            <span>Etalase UMKM Jamaah</span>
          </TabsTrigger>
          <TabsTrigger value="lumbung" className="flex items-center gap-1.5">
            <PackageCheck className="h-3.5 w-3.5" />
            <span>Lumbung Pangan Digital</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: ETALASE UMKM */}
        <TabsContent value="umkm" className="space-y-6">
          {/* Action and Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted font-normal">Kategori Usaha:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs font-medium">
                    <Filter className="h-3 w-3 mr-1 text-primary" />
                    <span>{categoryFilter}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setCategoryFilter('Semua Kategori')}>
                    Semua Kategori
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('Kuliner')}>
                    Kuliner & Makanan
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('Sembako & Sayur')}>
                    Sembako & Sayur
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('Pakaian/Jahit')}>
                    Pakaian / Jahit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('Jasa & Teknik')}>
                    Jasa & Teknik
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setRegisterOpen(true);
                setSuccessMsg(null);
              }}
              className="text-xs font-medium self-start sm:self-auto"
            >
              <Plus className="h-3.5 w-3.5 mr-1 text-primary" />
              <span>Daftarkan Usaha Saya</span>
            </Button>
          </div>

          {/* Grid of Products */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => {
              const waUrl = getWhatsAppUrl(
                p.phone,
                `Assalamu’alaikum ${p.owner}, saya ingin memesan "${p.name}" dari katalog web Masjid Baitul Huda.`
              );

              return (
                <Card key={p.id} className="flex flex-col justify-between">
                  <div>
                    {/* 4:3 Aspect Ratio Thumbnail Container */}
                    <div className="aspect-[4/3] w-full rounded-t-xl bg-surface-subtle border-b border-border flex items-center justify-center text-text-muted">
                      <ShoppingBag className="h-8 w-8 text-primary/30" />
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="subtle">{p.category}</Badge>
                        <span className="text-[11px] text-text-muted font-normal">{p.domicile}</span>
                      </div>
                      <CardTitle className="mt-2 text-base font-semibold text-text-primary leading-snug">
                        {p.name}
                      </CardTitle>
                      <p className="text-xs text-text-muted font-normal">
                        Pemilik: {p.owner}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-2">
                      <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed font-normal">
                        {p.description}
                      </p>
                      <div className="pt-1">
                        <span className="font-mono text-base font-medium text-primary">
                          {formatRupiah(p.price)}
                        </span>
                      </div>
                    </CardContent>
                  </div>

                  <div className="p-5 pt-0">
                    <Button
                      asChild
                      variant="pastel"
                      size="sm"
                      className="w-full text-xs font-medium justify-center"
                    >
                      <a href={waUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-3.5 w-3.5 mr-1" />
                        <span>Pesan via WhatsApp</span>
                      </a>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* TAB 2: LUMBUNG PANGAN DIGITAL */}
        <TabsContent value="lumbung" className="space-y-8">
          {/* Sembako Stock Metrics using shadcn Progress */}
          <div className="rounded-xl border border-border bg-surface p-6 space-y-6 shadow-none">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-4">
              <div>
                <h3 className="font-heading font-semibold text-lg text-text-primary">
                  Status Stok Lumbung Pangan Masjid
                </h3>
                <p className="text-xs text-text-secondary font-normal">
                  Penyaluran rutin akhir bulan bagi 37 Kepala Keluarga berhak terima di lingkungan Kampung Asri.
                </p>
              </div>
              <Badge variant="gold" className="self-start sm:self-auto font-medium">
                Penyaluran: 30 September 2026
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Beras Progress (120/200 Kg) */}
              <div className="rounded-lg border border-border bg-surface-subtle/50 p-4 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-text-primary">Beras Pulen</span>
                  <span className="font-mono font-semibold text-primary">120 / 200 Kg</span>
                </div>
                <Progress value={60} />
                <div className="flex justify-between text-[11px] text-text-muted font-normal">
                  <span>Tercapai 60%</span>
                  <span>Kurang 80 Kg</span>
                </div>
              </div>

              {/* Minyak Goreng Progress (40/100 L) */}
              <div className="rounded-lg border border-border bg-surface-subtle/50 p-4 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-text-primary">Minyak Goreng</span>
                  <span className="font-mono font-semibold text-primary">40 / 100 Liter</span>
                </div>
                <Progress value={40} />
                <div className="flex justify-between text-[11px] text-text-muted font-normal">
                  <span>Tercapai 40%</span>
                  <span>Kurang 60 L</span>
                </div>
              </div>

              {/* Telur Progress (15/50 pack) */}
              <div className="rounded-lg border border-border bg-surface-subtle/50 p-4 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-text-primary">Telur Ayam</span>
                  <span className="font-mono font-semibold text-primary">15 / 50 Pack</span>
                </div>
                <Progress value={30} />
                <div className="flex justify-between text-[11px] text-text-muted font-normal">
                  <span>Tercapai 30%</span>
                  <span>Kurang 35 Pack</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2 Action Cards: Sedekah Sembako & Lapor Warga Rentan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kiri: Sedekah Sembako */}
            <Card className="flex flex-col justify-between">
              <div>
                <CardHeader>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-pastel text-primary mb-2">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                  <CardTitle>Sedekah Sembako Fisik</CardTitle>
                  <CardDescription>
                    Pencatatan komitmen drop barang sembako langsung di posko kesekretariatan DKM.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-text-secondary leading-relaxed font-normal">
                  Anda dapat menyalurkan beras, minyak kemasan, atau telur mentah yang akan ditimbang dan dimasukkan ke stok lumbung oleh marbot piket.
                </CardContent>
              </div>

              <div className="p-5 pt-0">
                <Button
                  variant="default"
                  size="default"
                  onClick={() => {
                    setSembakoOpen(true);
                    setSuccessMsg(null);
                  }}
                  className="w-full text-xs font-medium"
                >
                  <PackageCheck className="h-4 w-4 mr-1.5" />
                  <span>Catat Komitmen Drop Sembako</span>
                </Button>
              </div>
            </Card>

            {/* Kanan: Lapor Warga Rentan */}
            <Card className="flex flex-col justify-between border-border">
              <div>
                <CardHeader>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-subtle text-text-primary mb-2 border border-border">
                    <ShieldAlert className="h-5 w-5 text-destructive" />
                  </div>
                  <CardTitle>Lapor Warga Rentan (Privat)</CardTitle>
                  <CardDescription>
                    Jalur komunikasi rahasia langsung ke WA amil & DKM sosial bagi keluarga sekitar yang membutuhkan bahan pokok darurat.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-text-secondary leading-relaxed font-normal">
                  Privasi pelapor dan keluarga yang dilaporkan terjaga 100%. Tim amil sosial akan memverifikasi santun tanpa mempermalukan yang bersangkutan.
                </CardContent>
              </div>

              <div className="p-5 pt-0">
                <Button
                  asChild
                  variant="outline"
                  size="default"
                  className="w-full text-xs font-medium border-destructive/30 text-destructive hover:bg-destructive-subtle"
                >
                  <a href={waLaporRentan} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-1.5" />
                    <span>Laporkan via WhatsApp DKM Sosial</span>
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal Dialog: Daftarkan Usaha UMKM */}
      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading font-semibold text-lg text-text-primary">
              Daftarkan Usaha Jamaah
            </DialogTitle>
            <DialogDescription className="text-xs text-text-secondary">
              Promosikan usaha Anda kepada seluruh jamaah Masjid Baitul Huda tanpa biaya pendaftaran.
            </DialogDescription>
          </DialogHeader>

          {successMsg ? (
            <div className="py-6 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-pastel text-primary">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-xs text-text-secondary">{successMsg}</p>
              <Button variant="outline" size="sm" onClick={() => setRegisterOpen(false)}>
                Tutup
              </Button>
            </div>
          ) : (
            <form onSubmit={storeForm.handleSubmit(onRegisterStoreSubmit)} className="space-y-3 pt-2 text-xs">
              <div>
                <label className="font-medium text-text-primary block mb-1">Nama Produk / Usaha *</label>
                <Input {...storeForm.register('productName')} placeholder="Misal: Nasi Uduk Bu Maryam" />
                {storeForm.formState.errors.productName && (
                  <span className="text-destructive text-[11px] block mt-0.5">{storeForm.formState.errors.productName.message}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-text-primary block mb-1">Nama Pemilik *</label>
                  <Input {...storeForm.register('owner')} placeholder="Nama Anda" />
                </div>
                <div>
                  <label className="font-medium text-text-primary block mb-1">Alamat RT / RW *</label>
                  <Input {...storeForm.register('domicile')} placeholder="RT 03 / RW 02" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-text-primary block mb-1">Harga (Rp) *</label>
                  <Input {...storeForm.register('price')} placeholder="Contoh: 15000" type="number" />
                </div>
                <div>
                  <label className="font-medium text-text-primary block mb-1">Nomor WhatsApp *</label>
                  <Input {...storeForm.register('phone')} placeholder="081234567890" type="tel" />
                </div>
              </div>

              <div>
                <label className="font-medium text-text-primary block mb-1">Deskripsi Singkat Produk *</label>
                <Input {...storeForm.register('description')} placeholder="Uraikan keunggulan atau menu produk Anda" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setRegisterOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" variant="default" size="sm" disabled={storeForm.formState.isSubmitting}>
                  {storeForm.formState.isSubmitting ? 'Menyimpan...' : 'Daftarkan Usaha'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Dialog: Sedekah Sembako Commitment */}
      <Dialog open={sembakoOpen} onOpenChange={setSembakoOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading font-semibold text-lg text-text-primary">
              Catat Komitmen Drop Sembako
            </DialogTitle>
            <DialogDescription className="text-xs text-text-secondary">
              Bantu tim DKM mempersiapkan penerimaan paket beras, minyak, atau telur di posko lumbung.
            </DialogDescription>
          </DialogHeader>

          {successMsg ? (
            <div className="py-6 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-pastel text-primary">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-xs text-text-secondary">{successMsg}</p>
              <Button variant="outline" size="sm" onClick={() => setSembakoOpen(false)}>
                Tutup
              </Button>
            </div>
          ) : (
            <form onSubmit={sembakoForm.handleSubmit(onSembakoSubmit)} className="space-y-3 pt-2 text-xs">
              <div>
                <label className="font-medium text-text-primary block mb-1">Nama Donatur / Keluarga *</label>
                <Input {...sembakoForm.register('donorName')} placeholder="Nama Anda / Hamba Allah" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-text-primary block mb-1">Nomor WhatsApp *</label>
                  <Input {...sembakoForm.register('phone')} placeholder="081234567890" type="tel" />
                </div>
                <div>
                  <label className="font-medium text-text-primary block mb-1">Jumlah & Satuan *</label>
                  <Input {...sembakoForm.register('quantity')} placeholder="Misal: 10 Kg Beras" />
                </div>
              </div>

              <div>
                <label className="font-medium text-text-primary block mb-1">Rencana Waktu Drop ke Posko Masjid *</label>
                <Input {...sembakoForm.register('dropPlan')} placeholder="Misal: Jum’at siang ba’da sholat" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setSembakoOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" variant="default" size="sm" disabled={sembakoForm.formState.isSubmitting}>
                  {sembakoForm.formState.isSubmitting ? 'Mencatat...' : 'Konfirmasi Komitmen'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
