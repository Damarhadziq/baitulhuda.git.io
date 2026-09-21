import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium transition-colors select-none tracking-normal',
  {
    variants: {
      variant: {
        // Pastel green wash (standard active tag/category)
        default:
          'bg-primary-pastel text-primary',
        // Pure solid primary
        solid:
          'bg-primary text-white',
        // Hairline outline replaced with subtle chip
        outline:
          'text-text-secondary bg-surface-subtle',
        // Subtle muted
        subtle:
          'bg-surface-subtle text-text-secondary',
        // Warm gold (prayer/call to prayer/special badge)
        gold:
          'bg-accent-gold-subtle text-[#A06E39]',
        // Muted clay red (lelayu/duka cita alert)
        destructive:
          'bg-destructive-subtle text-destructive',
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
