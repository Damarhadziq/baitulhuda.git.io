import * as React from 'react';
import { Navbar } from '@/components/common/navbar';
import { Footer } from '@/components/common/footer';
import { MobileBottomNav } from '@/components/common/mobile-bottom-nav';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
