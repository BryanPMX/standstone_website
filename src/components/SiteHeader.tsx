"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_NAV, HERO_CTA } from "@/constants/site";
import { cn } from "@/lib/utils";
import { MobileMenuPortal } from "@/components/MobileMenuPortal";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPositionRef = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    scrollPositionRef.current = window.scrollY;
    const { style } = document.body;
    const originalOverflow = style.overflow;
    const originalPosition = style.position;
    const originalTop = style.top;
    const originalLeft = style.left;
    const originalRight = style.right;
    const originalWidth = style.width;

    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollPositionRef.current}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";

    return () => {
      const scrollY = scrollPositionRef.current;
      style.overflow = originalOverflow;
      style.position = originalPosition;
      style.top = originalTop;
      style.left = originalLeft;
      style.right = originalRight;
      style.width = originalWidth;
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnDesktop);

    return () => {
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const closeOnHashChange = () => setIsMenuOpen(false);
    window.addEventListener("hashchange", closeOnHashChange);
    return () => window.removeEventListener("hashchange", closeOnHashChange);
  }, []);

  const prevMenuOpenRef = useRef(false);
  useEffect(() => {
    if (prevMenuOpenRef.current && !isMenuOpen) {
      requestAnimationFrame(() => {
        menuButtonRef.current?.focus({ preventScroll: true });
      });
    }
    prevMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((open) => !open);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[80] flex h-16 items-center justify-between px-3 sm:px-4 md:h-[72px] md:px-8",
        "bg-gradient-to-r from-sandstone-maroon/80 to-sandstone-navy/80 backdrop-blur-xl border-b border-white/15 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.9)]"
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="group flex items-center gap-3 text-sandstone-base transition-colors duration-500 hover:text-white focus-visible:text-white focus-visible:outline-none"
        aria-label="Sandstone Real Estate Team - Home"
      >
        <div className="relative h-10 w-10 overflow-hidden rounded bg-white/10">
          <Image
            src="/logo.jpg"
            alt="Sandstone Real Estate Team logo"
            fill
            className="object-contain"
            sizes="40px"
            priority
          />
        </div>
        <div className="hidden leading-tight sm:block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-sandstone-base">
            Sandstone
          </span>
          <span className="block text-[10px] font-medium uppercase tracking-widest text-sandstone-base/90 transition-colors duration-500 group-hover:text-white/90 group-focus-visible:text-white/90">
            Real Estate Team
          </span>
        </div>
      </Link>

      {/* Nav links – centered */}
      <nav
        className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex"
        aria-label="Main"
      >
        <ul className="flex items-center gap-6">
          {SITE_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group relative isolate inline-flex items-center px-1 py-1 text-base font-medium text-white/90 transition-all [transition-duration:420ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:text-sandstone-base focus-visible:-translate-y-px focus-visible:text-sandstone-base focus-visible:outline-none"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-[-0.45rem] inset-y-[-0.18rem] z-0 scale-[0.985] rounded-full bg-gradient-to-r from-white/[0.01] via-white/[0.1] to-white/[0.01] opacity-0 transition-all [transition-duration:420ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-1 left-1/2 z-0 h-px w-[calc(100%+0.65rem)] -translate-x-1/2 origin-center scale-x-0 bg-gradient-to-r from-transparent via-sandstone-base to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span className="relative z-10">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          className="group flex items-center gap-1.5 text-base text-white/90 transition-all duration-500 hover:-translate-y-px hover:text-sandstone-base"
          aria-label="Contact us"
        >
          <Mail
            className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-[1.05]"
            aria-hidden
          />
          <span>Contact Us</span>
        </Link>
      </nav>

      {/* CTA + mobile menu – far right */}
      <div className="ml-auto flex items-center gap-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="group relative hidden overflow-hidden border-sandstone-bronze/85 text-sandstone-base shadow-[0_8px_20px_-14px_rgba(0,0,0,0.65)] transition-all [transition-duration:460ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-sandstone-base hover:bg-sandstone-bronze/25 hover:text-white hover:shadow-[0_20px_34px_-18px_rgba(183,150,120,0.82)] lg:inline-flex"
        >
          <Link href="/#contact">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-2/3 w-[55%] -skew-x-12 bg-gradient-to-r from-white/0 via-white/45 to-white/0 opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
            />
            <span className="relative z-10">{HERO_CTA}</span>
          </Link>
        </Button>
        <button
          ref={menuButtonRef}
          type="button"
          className="p-2 text-white/90 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sandstone-base focus-visible:ring-offset-2 focus-visible:ring-offset-sandstone-navy/80 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <MobileMenuPortal
        isOpen={isMenuOpen}
        onClose={closeMenu}
        navItems={SITE_NAV}
      />
    </header>
  );
}
