import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline' | 'glow' | 'secondary';
    pulse?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant = 'default', pulse = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-mono font-medium uppercase tracking-wider',
                    {
                        'bg-primary/20 border border-primary/50 text-primary': variant === 'default',
                        'border border-white/20 text-white': variant === 'outline',
                        'bg-primary/20 border border-primary/50 text-primary shadow-glow-orange': variant === 'glow',
                        'bg-amber-500/20 border border-amber-500/50 text-amber-500': variant === 'secondary',
                    },
                    className
                )}
                {...props}
            >
                {pulse && (
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                )}
                {children}
            </div>
        );
    }
);
Badge.displayName = 'Badge';

export { Badge };
