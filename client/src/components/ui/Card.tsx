import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    glass?: boolean;
    hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, glass = false, hover = true, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-2xl border p-8',
                    glass
                        ? 'glass'
                        : 'bg-surface border-white/10',
                    hover && 'transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow-card',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 pb-4', className)}
        {...props}
    />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            'font-heading font-semibold text-2xl leading-tight tracking-tight',
            className
        )}
        {...props}
    />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-muted leading-relaxed', className)}
        {...props}
    />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center pt-4', className)}
        {...props}
    />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
