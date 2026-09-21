import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors select-none tracking-normal',
  {
    variants: {
      variant: {
        // Pastel green wash (standard active tag/category)
        default:
          'bg-primary-pastel text-primary border border-primary/10',
        // Pure solid primary
        solid:
          'bg-primary text-white border-transparent',
        // Hairline outline
        outline:
          'border border-border text-text-secondary bg-surface',
        // Subtle muted
        subtle:
          'bg-surface-subtle text-text-secondary border border-border/50',
        // Warm gold (prayer/call to prayer/special badge)
        gold:
          'bg-accent-gold-subtle text-[#A06E39] border border-accent-gold/20',
        // Muted clay red (lelayu/duka cita alert)
        destructive:
          'bg-destructive-subtle text-destructive border border-destructive/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
