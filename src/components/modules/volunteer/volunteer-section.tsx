'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { HeartHandshake, Users, CheckCircle2, Clock, Sparkles } from 'lucide-react';

const volunteerSchema = z.object({
  name: z.string().min(3, { message: 'Nama lengkap minimal 3 karakter' }),
  whatsapp: z.string().min(10, { message: 'Nomor WhatsApp minimal 10 digit' }),
  domicile: z.string().min(2, { message: 'Domisili RT/RW wajib diisi' }),
  notes: z.string().optional(),
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

interface VolunteerTask {
  id: string;
  title: string;
  category: string;
  needed: string;
  schedule: string;
  description: string;
}

const tasks: VolunteerTask[] = [
  {
    id: 'sound',
    title: 'Perawatan Sound System & Akustik Masjid',
    category: 'Teknis & Audio',
    needed: 'Dibutuhkan 2 orang',
    schedule: 'Jum’at Siang & Kajian Ahad Pagi',
    description: 'Menjaga kejernihan mikrofon adzan, mixer audio ruang utama, dan instalasi mic mimbar khutbah.',
  },
  {
    id: 'media',
    title: 'Dokumentasi & Publikasi Kajian Digital',
    category: 'Multimedia',
    needed: 'Dibutuhkan 1 orang',
    schedule: 'Fleksibel (Saat ada agenda kajian)',
    description: 'Mengabadikan dokumentasi foto santun dan mengunggah ringkasan warta ke portal web masjid.',
  },
  {
    id: 'kebersihan',
    title: 'Tim Khidmah Sanitasi & Pewangi Ruangan',
    category: 'Kebersihan',
    needed: 'Dibutuhkan 3 orang',
    schedule: 'Sabtu Pagi (Berkala 2 pekanan)',
    description: 'Memastikan karpet wangi, tempat wudhu bersih tidak licin, dan pendingin ruangan terawat.',
  },
  {
    id: 'pangan',
    title: 'Penyaluran Lumbung Pangan Sembako Dhuafa',
    category: 'Sosial Umat',
    needed: 'Dibutuhkan 2 orang',
    schedule: 'Pekan terakhir setiap bulan',
    description: 'Membantu penimbangan beras sedekah dan pendistribusian paket pangan langsung ke rumah warga lansia.',
  },
];

export function VolunteerSection() {
  const [selectedTask, setSelectedTask] = React.useState<VolunteerTask | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: '',
      whatsapp: '',
      domicile: '',
      notes: '',
    },
  });

  const onSubmit = async (data: VolunteerFormValues) => {
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSuccess(true);
  };

  const handleClose = () => {
    setSelectedTask(null);
    setIsSuccess(false);
    reset();
  };

  return (
    <section aria-labelledby="relawan-heading" className="space-y-6">
      <div>
        <h2
          id="relawan-heading"
          className="font-heading font-semibold text-xl md:text-2xl text-text-primary tracking-tight"
        >
          Direktori Relawan Khidmah
        </h2>
        <p className="mt-1 text-sm text-text-secondary font-normal">
          Mari berkhidmat merawat rumah Allah dan melayani warga dengan keahlian dan waktu yang kita miliki.
        </p>
      </div>

      {/* 3 Mini Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-surface p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-text-muted font-normal">Relawan Aktif</span>
            <p className="font-semibold text-lg text-primary mt-0.5">28 Relawan</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-pastel text-primary">
            <Users className="h-4 w-4" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-text-muted font-normal">Tugas Terpenuhi</span>
            <p className="font-semibold text-lg text-primary mt-0.5">14 Amanah</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-pastel text-primary">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-text-muted font-normal">Kebutuhan Terbuka</span>
            <p className="font-semibold text-lg text-primary mt-0.5">4 Posisi</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-pastel text-primary">
            <HeartHandshake className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Grid of Volunteer Tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {tasks.map((task) => (
          <Card key={task.id} className="flex flex-col justify-between">
            <div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="subtle">{task.category}</Badge>
                  <Badge variant="default" className="text-[11px] font-medium">
                    {task.needed}
                  </Badge>
                </div>
                <CardTitle className="mt-2 text-base font-semibold leading-snug text-text-primary">
                  {task.title}
                </CardTitle>
                <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1 font-normal">
                  <Clock className="h-3 w-3 text-primary" />
                  <span>{task.schedule}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-text-secondary leading-relaxed font-normal">
                  {task.description}
                </p>
              </CardContent>
            </div>

            <div className="p-5 pt-0">
              <Button
                variant="default"
                size="mobile"
                onClick={() => {
                  setSelectedTask(task);
                  setIsSuccess(false);
                }}
                className="w-full text-xs font-medium"
              >
                <HeartHandshake className="h-4 w-4 mr-1.5" />
                <span>Ikut Khidmah Ini</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Registration Dialog Form with react-hook-form + zod */}
      <Dialog open={Boolean(selectedTask)} onOpenChange={(open) => !open && handleClose()}>
        {selectedTask && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Formulir Khidmah Jamaah</span>
              </div>
              <DialogTitle className="font-heading font-semibold text-lg text-text-primary">
                {selectedTask.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-text-secondary">
                {selectedTask.needed} • {selectedTask.schedule}
              </DialogDescription>
            </DialogHeader>

            {isSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-pastel text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-base text-text-primary">
                  Jazakallahu Khairan!
                </h3>
                <p className="text-xs text-text-secondary max-w-xs mx-auto leading-relaxed">
                  Pendaftaran khidmah Anda telah diterima oleh koordinator DKM. Kami akan menghubungi Anda via WhatsApp untuk koordinasi tugas.
                </p>
                <Button variant="outline" size="sm" onClick={handleClose} className="mt-2 text-xs font-medium">
                  Selesai
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 pt-2">
                <div>
                  <label className="text-xs font-medium text-text-primary block mb-1">
                    Nama Lengkap <span className="text-destructive">*</span>
                  </label>
                  <Input
                    {...register('name')}
                    placeholder="Contoh: Muhammad Ilham"
                    className="text-xs"
                  />
                  {errors.name && (
                    <span className="text-[11px] text-destructive mt-0.5 block font-normal">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-text-primary block mb-1">
                    Nomor WhatsApp Aktif <span className="text-destructive">*</span>
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

                <div>
                  <label className="text-xs font-medium text-text-primary block mb-1">
                    Domisili RT / RW <span className="text-destructive">*</span>
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
                    Catatan / Pengalaman Terkait (Opsional)
                  </label>
                  <Input
                    {...register('notes')}
                    placeholder="Misal: Bersedia hadir setiap Ahad pagi"
                    className="text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="text-xs font-medium"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    size="sm"
                    disabled={isSubmitting}
                    className="text-xs font-medium"
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pendaftaran'}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
