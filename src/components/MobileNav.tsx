'use client';

import { useState, type MouseEvent } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Link, useNavigate } from 'react-router';

export const MobileNav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (e: MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();

    // Update your state
    setShowMobileMenu(false);

    navigate(to);
  };

  return (
    <div>
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button aria-label="Open navigation menu" variant="secondary" size="icon" className="size-8 cursor-pointer">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="mt-[65px] px-0 w-full">
          <SheetHeader>
            <SheetTitle className="sr-only focus:not-sr-only leading-none">Menu</SheetTitle>
            <SheetDescription className="sr-only focus:not-sr-only">Main navigation menu</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 px-4 py-8">
            <Link to="/" onClick={(e) => handleNavigate(e, '/')}>
              Posts
            </Link>
            <Link to="/authors" onClick={(e) => handleNavigate(e, '/authors')}>
              Authors
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
