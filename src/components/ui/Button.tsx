import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-full font-mono font-medium uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    {
        variants: {
            variant: {
                default:
                    'bg-gradient-to-r from-secondary to-primary text-white shadow-glow-orange hover:shadow-glow-orange-lg hover:scale-105',
                outline:
                    'border-2 border-white/20 bg-transparent text-white hover:border-white hover:bg-white/10',
                ghost:
                    'bg-transparent text-white hover:bg-white/10 hover:text-primary',
                link:
                    'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-11 px-8 py-2 text-sm',
                sm: 'h-9 px-6 text-xs',
                lg: 'h-14 px-10 text-base',
                icon: 'h-10 w-10',
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
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
