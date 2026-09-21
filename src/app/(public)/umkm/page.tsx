'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { formatRupiah, getWhatsAppUrl } from '@/lib/utils';
import {
  Store,
  Search,
  Plus,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Utensils,
  Wheat,
  Scissors,
  Wrench,
  Tag,
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  category: 'Kuliner' | 'Sembako' | 'Busana' | 'Jasa';
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
    description: 'Bumbu kacang medok asli, sayuran segar rebus, tempe kemul anget, dan peyek renyah gurih.',
    phone: '081299881122',
  },
  {
    id: 'p2',
    name: 'Madu Randu & Klanceng Huda Murni',
    category: 'Kuliner',
    owner: 'Pak Ridwan',
    domicile: 'RT 03 / RW 02',
    price: 85000,
    description: 'Madu mentah alami tanpa pengolahan kimia dan tanpa pemanis buatan, panen lebah lokal.',
    phone: '081388776655',
  },
  {
    id: 'p3',
    name: 'Beras Organik Mentik Wangi (5 Kg)',
    category: 'Sembako',
    owner: 'Toko Berkah Tani Mas Joko',
    domicile: 'RT 02 / RW 02',
    price: 72000,
    description: 'Beras pulen harum alami, bebas pemutih dan pengawet kimiawi, panen sawah binaan.',
    phone: '081977663311',
  },
  {
    id: 'p4',
    name: 'Jasa Jahit Baju Muslim & Permak Busana',
    category: 'Busana',
    owner: 'Ibu Maryam',
    domicile: 'RT 04 / RW 02',
    price: 35000,
    description: 'Jahit gamis, kemeja koko, pasang resleting, dan potong celana rapi tepat waktu.',
    phone: '081722334411',
  },
  {
    id: 'p5',
    name: 'Servis Kipas Angin, Pompa Air & Kelistrikan',
    category: 'Jasa',
    owner: 'Mas Arif (Remaja Masjid)',
    domicile: 'RT 02 / RW 02',
    price: 45000,
    description: 'Servis gulung dinamo, instalasi lampu hemat listrik, dan perbaikan stopkontak.',
    phone: '081344556677',
  },
  {
    id: 'p6',
    name: 'Aneka Sambal Kemasan Botol (Cumi & Bawang)',
    category: 'Kuliner',
    owner: 'Mbak Dewi',
    domicile: 'RT 01 / RW 02',
    price: 25000,
    description: 'Dibuat dari cabai pilihan dan cumi segar tanpa pengawet sintetik. Tahan hingga 1 bulan.',
    phone: '081566778899',
  },
];

const registerStoreSchema = z.object({
  name: z.string().min(3, { message: 'Nama lengkap minimal 3 karakter' }),
  domicile: z.string().min(2, { message: 'RT/RW wajib diisi' }),
  productName: z.string().min(3, { message: 'Nama produk minimal 3 karakter' }),
  category: z.enum(['Kuliner', 'Sembako', 'Busana', 'Jasa']),
  price: z.string().min(3, { message: 'Perkiraan harga wajib diisi' }),
  whatsapp: z.string().min(10, { message: 'Nomor WhatsApp minimal 10 digit' }),
  description: z.string().min(10, { message: 'Deskripsi minimal 10 karakter' }),
});

type RegisterStoreFormValues = z.infer<typeof registerStoreSchema>;

export default function UmkmPage() {
  const [products, setProducts] = React.useState<ProductItem[]>(initialProducts);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('Semua');
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterStoreFormValues>({
    resolver: zodResolver(registerStoreSchema),
    defaultValues: {
      category: 'Kuliner',
    },
  });

  const onRegisterSubmit = async (data: RegisterStoreFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const newProd: ProductItem = {
      id: `p-${Date.now()}`,
      name: data.productName,
      category: data.category,
      owner: data.name,
      domicile: data.domicile,
      price: parseInt(data.price.replace(/\D/g, '')) || 25000,
      description: data.description,
      phone: data.whatsapp,
    };
    setProducts((prev) => [newProd, ...prev]);
    setIsRegisterSuccess(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
    setIsRegisterSuccess(false);
    reset();
  };

  const categories = [
    { label: 'Semua', value: 'Semua', icon: Store },
    { label: 'Kuliner & Snack', value: 'Kuliner', icon: Utensils },
    { label: 'Sembako & Pangan', value: 'Sembako', icon: Wheat },
    { label: 'Busana Muslim', value: 'Busana', icon: Scissors },
    { label: 'Jasa & Teknik', value: 'Jasa', icon: Wrench },
  ];

  const filteredProducts = React.useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 md:space-y-16 pb-20">
      {/* 1. DISTINCT HERO SECTION: Warm, Community Commerce Atmosphere */}
      <section className="relative pt-6 pb-4 md:pt-10 md:pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative rounded-3xl bg-surface-subtle/70 p-6 sm:p-10 md:p-12 overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-primary-pastel/40 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-pastel px-3.5 py-1 text-xs font-medium text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Pemberdayaan Ekonomi Jamaah</span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary leading-[1.2]">
                  Perniagaan Berkah <br />
                  <span className="text-primary">UMKM Warga Baitul Huda</span>
                </h1>

                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
                  Dukung kemandirian tetangga dan jamaah sendiri. Belanja aneka hidangan halal, sembako harian, pakaian, hingga jasa pertukangan terpercaya langsung dari warga Kampung Huda Asri.
                </p>

                {/* Soft Micro Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-text-secondary font-normal">
                  <span className="rounded-full bg-white px-3 py-1 text-xs">
                    ✓ Bebas Biaya Lapak
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs">
                    ✓ Transaksi Langsung via WhatsApp
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs">
                    ✓ 100% Usaha Warga Muslim
                  </span>
                </div>
              </div>

              {/* Action Button for Registration */}
              <div className="flex-shrink-0">
                <Button
                  variant="default"
                  size="default"
                  onClick={() => setIsRegisterOpen(true)}
                  className="rounded-full px-6 text-xs sm:text-sm font-medium"
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  <span>Daftarkan Usaha Anda</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH BAR (Borderless, Airy) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs transition-all ${
                    isSelected
                      ? 'bg-primary text-white font-medium'
                      : 'bg-surface-subtle text-text-secondary hover:text-text-primary hover:bg-surface-subtle/90 font-normal'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <Input
              type="text"
              placeholder="Cari produk atau nama penjual..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs rounded-full bg-surface-subtle"
            />
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG GRID (Spacious, Varied, Uncrowded) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between pb-4">
          <p className="text-xs text-text-muted font-normal">
            Menampilkan <span className="font-medium text-text-primary">{filteredProducts.length}</span> produk aktif dari warga
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-surface-subtle/50 p-8">
            <ShoppingBag className="mx-auto h-12 w-12 text-text-muted/40 mb-3" />
            <h3 className="font-heading font-medium text-base text-text-primary">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-xs text-text-secondary mt-1 max-w-sm mx-auto">
              Tidak ada produk yang cocok dengan kata kunci atau filter yang Anda pilih.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-4 rounded-full text-xs"
            >
              Reset Filter
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item) => {
              const waOrderUrl = getWhatsAppUrl(
                item.phone,
                `Assalamu’alaikum ${item.owner}, saya tertarik untuk memesan "${item.name}" yang saya lihat di Web Masjid Baitul Huda.`
              );

              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-surface-subtle/70 hover:bg-surface-subtle transition-all flex flex-col justify-between overflow-hidden p-5 space-y-4"
                >
                  <div className="space-y-3">
                    {/* Visual Card Header with Category & Domicile */}
                    <div className="flex items-center justify-between">
                      <Badge variant="default" className="text-[11px] font-medium">
                        {item.category}
                      </Badge>
                      <span className="text-[11px] text-text-muted font-normal">
                        {item.domicile}
                      </span>
                    </div>

                    {/* Price and Title */}
                    <div className="space-y-1">
                      <p className="font-mono text-lg font-semibold text-primary">
                        {formatRupiah(item.price)}
                      </p>
                      <h3 className="font-heading font-semibold text-base text-text-primary leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer: Seller & WhatsApp CTA */}
                  <div className="pt-2 space-y-3">
                    <div className="flex items-center justify-between text-xs text-text-muted font-normal">
                      <span>Penjual: <strong className="text-text-primary font-medium">{item.owner}</strong></span>
                    </div>

                    <Button
                      asChild
                      variant="default"
                      size="default"
                      className="w-full justify-center rounded-full text-xs font-medium"
                    >
                      <a href={waOrderUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4 mr-1.5" />
                        <span>Pesan Langsung via WA</span>
                      </a>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. DIALOG MODAL: Registration for Local Congregant Store */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Khidmah Pemberdayaan Ekonomi</span>
            </div>
            <DialogTitle className="font-heading font-semibold text-lg text-text-primary">
              Daftarkan Usaha Jamaah
            </DialogTitle>
            <DialogDescription className="text-xs text-text-secondary">
              Layanan etalase gratis untuk seluruh warga & jamaah Masjid Baitul Huda.
            </DialogDescription>
          </DialogHeader>

          {isRegisterSuccess ? (
            <div className="py-6 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-pastel text-primary">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-base text-text-primary">
                Alhamdulillah, Pendaftaran Berhasil!
              </h3>
              <p className="text-xs text-text-secondary max-w-xs mx-auto leading-relaxed">
                Produk usaha Anda telah ditambahkan ke etalase UMKM warga. Jamaah lain kini dapat menghubungi Anda langsung via WhatsApp.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCloseRegister}
                className="mt-2 text-xs font-medium rounded-full px-5"
              >
                Kembali ke Katalog
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-medium text-text-primary block mb-1">
                  Nama Pemilik Usaha <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register('name')}
                  placeholder="Contoh: Ibu Fatimah"
                  className="text-xs"
                />
                {errors.name && (
                  <span className="text-[11px] text-destructive mt-0.5 block font-normal">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-text-primary block mb-1">
                    Domisili RT/RW <span className="text-destructive">*</span>
                  </label>
                  <Input
                    {...register('domicile')}
                    placeholder="Contoh: RT 03 / RW 02"
                    className="text-xs"
                  />
                  {errors.domicile && (
                    <span className="text-[11px] text-destructive mt-0.5 block font-normal">
                      {errors.domicile.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-text-primary block mb-1">
                    Kategori <span className="text-destructive">*</span>
                  </label>
                  <select
                    {...register('category')}
                    className="flex h-10 w-full rounded-xl bg-surface-subtle px-3 py-2 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                  >
                    <option value="Kuliner">Kuliner</option>
                    <option value="Sembako">Sembako</option>
                    <option value="Busana">Busana</option>
                    <option value="Jasa">Jasa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text-primary block mb-1">
                  Nama Produk / Usaha <span className="text-destructive">*</span>
                </label>
                <Input
                  {...register('productName')}
                  placeholder="Contoh: Bakpia Basah Khas Huda"
                  className="text-xs"
                />
                {errors.productName && (
                  <span className="text-[11px] text-destructive mt-0.5 block font-normal">
                    {errors.productName.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-text-primary block mb-1">
                    Harga / Tarif (Rp) <span className="text-destructive">*</span>
                  </label>
                  <Input
                    {...register('price')}
                    placeholder="Contoh: 15000"
                    type="number"
                    className="text-xs"
                  />
                  {errors.price && (
                    <span className="text-[11px] text-destructive mt-0.5 block font-normal">
                      {errors.price.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-text-primary block mb-1">
                    WhatsApp Aktif <span className="text-destructive">*</span>
                  </label>
                  <Input
                    {...register('whatsapp')}
                    placeholder="Contoh: 081234567890"
                    type="tel"
                    className="text-xs"
                  />
                  {errors.whatsapp && (
                    <span className="text-[11px] text-destructive mt-0.5 block font-normal">
                      {errors.whatsapp.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text-primary block mb-1">
                  Deskripsi Singkat Produk <span className="text-destructive">*</span>
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="Jelaskan keunggulan produk atau rincian pesanan..."
                  className="flex w-full rounded-xl bg-surface-subtle p-3 text-xs text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                />
                {errors.description && (
                  <span className="text-[11px] text-destructive mt-0.5 block font-normal">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCloseRegister}
                  className="text-xs rounded-full px-4"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={isSubmitting}
                  className="text-xs rounded-full px-5"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Tayangkan Produk'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
