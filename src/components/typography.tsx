import { cn } from '@/lib/utils';
import { type PropsWithChildren } from 'react';

interface HProps {
  readonly className?: string;
}

export const H1 = ({ children, className }: PropsWithChildren<HProps>) => {
  return (
    <h1 className={cn('scroll-m-20 mb-[12px] text-xl font-bold tracking-tight md:text-2xl', className)}>{children}</h1>
  );
};

export const H2 = ({ children, className }: PropsWithChildren<HProps>) => {
  return (
    <h1 className={cn('scroll-m-20 mb-[10px] text-lg font-bold tracking-tight md:text-xl', className)}>{children}</h1>
  );
};

export const H3 = ({ children, className }: PropsWithChildren<HProps>) => {
  return (
    <h1 className={cn('scroll-m-20 mb-[10px] text-base font-bold tracking-tight md:text-xl', className)}>{children}</h1>
  );
};
