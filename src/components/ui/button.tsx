import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.99] duration-150',
  {
    variants: {
      variant: {
        // 1. Primary Pine Green
        default:
          'bg-primary text-white hover:bg-primary-hover active:bg-[#1E4735]',
        // 2. Ultra-soft pastel green wash with pine text
        pastel:
          'bg-primary-pastel text-primary hover:bg-[#DDE9E1] active:bg-[#D2E2D7]',
        // 3. 1px hairline border with crisp white surface
        outline:
          'border border-border bg-surface text-text-primary hover:bg-surface-subtle active:bg-[#EBEBE6]',
        // 4. Ghost / subtle hover
        ghost:
          'text-text-primary hover:bg-surface-subtle active:bg-[#EBEBE6]',
        // 5. Warm gold accent
        gold:
          'bg-accent-gold text-white hover:bg-[#C59261] active:bg-[#B58352]',
        // 6. Muted clay red for duka cita / lelayu
        destructive:
          'bg-destructive text-white hover:bg-[#B34E48] active:bg-[#A3433D]',
      },
      size: {
        // Small: h-8, compact touch
        sm: 'h-8 py-[6px] px-3 text-xs font-medium rounded-md gap-1.5',
        // Default: standard web h-9
        default: 'h-9 py-2 px-4 text-sm font-medium rounded-lg gap-2',
        // Mobile Primary Action: min-h-[40px] max-h-[42px]
        mobile: 'min-h-[40px] max-h-[42px] py-[10px] px-4 text-sm font-medium rounded-lg gap-2',
        // Form/Block Action: full width
        form: 'w-full justify-center py-[10px] px-5 text-sm font-medium rounded-lg gap-2 min-h-[40px]',
        // Icon only
        icon: 'h-9 w-9 p-0 rounded-lg justify-center',
        'icon-sm': 'h-8 w-8 p-0 rounded-md justify-center',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
