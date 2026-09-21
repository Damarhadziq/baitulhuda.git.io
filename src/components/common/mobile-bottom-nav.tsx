'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Wallet, Info } from 'lucide-react';

const navItems = [
  { label: 'Beranda', href: '/', icon: Home },
  { label: 'Etalase', href: '/etalase', icon: ShoppingBag },
  { label: 'Kas', href: '/transparansi-kas', icon: Wallet },
  { label: 'Tentang', href: '/tentang', icon: Info },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi Bawah"
      className="fixed bottom-0 left-0 right-0 z-40 block border-t border-border bg-surface/95 backdrop-blur-md md:hidden shadow-none"
    >
      <div className="mx-auto flex h-14 max-w-lg items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] min-h-[40px] transition-colors rounded-lg ${
                isActive
                  ? 'text-primary font-medium'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                  isActive ? 'bg-primary-pastel' : ''
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? 'text-primary' : 'text-text-secondary'
                  }`}
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
