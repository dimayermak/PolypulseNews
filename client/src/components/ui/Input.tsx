import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-12 w-full bg-black/50 px-4 py-2 text-sm text-white',
                    'border-b-2 border-white/20',
                    'placeholder:text-white/30',
                    'focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)]',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    'transition-all duration-200',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };
