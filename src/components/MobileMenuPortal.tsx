"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_CTA } from "@/constants/site";

const HEADER_HEIGHT_PX = 64;

export type NavItem = { label: string; href: string };

type MobileMenuPortalProps = {
  isOpen: boolean;
  onClose: () => void;
  navItems: readonly NavItem[];
};

/**
 * Renders the mobile menu into document.body so no ancestor layout (overflow,
 * flex, transform) can clip or collapse the list. Uses explicit dimensions
 * and a plain scrollable div (no Framer Motion on the scroll container).
 */
export function MobileMenuPortal({
  isOpen,
  onClose,
  navItems,
}: MobileMenuPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || typeof document === "undefined") {
    return null;
  }

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    left: 0,
    right: 0,
    top: HEADER_HEIGHT_PX,
    bottom: 0,
    zIndex: 70,
    backgroundColor: "#253471", // sandstone-navy
  };

  const panelStyle: React.CSSProperties = {
    height: "100%",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    padding: "20px 12px 0",
    paddingBottom: "max(2.5rem, env(safe-area-inset-bottom, 2.5rem))",
    boxSizing: "border-box",
  };

  const content = (
    <div
      className="md:hidden"
      style={overlayStyle}
      onClick={onClose}
      role="presentation"
    >
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <nav aria-label="Main">
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "block",
            }}
          >
            {navItems.map((item) => (
              <li
                key={item.href}
                style={{
                  display: "block",
                  minHeight: 48,
                  marginBottom: 8,
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-xl border border-white/20 bg-white/15 py-3 px-4 text-[15px] font-semibold text-white no-underline transition-colors hover:border-sandstone-base/80 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sandstone-base focus-visible:ring-offset-2 focus-visible:ring-offset-sandstone-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 space-y-3">
          <Button
            asChild
            size="lg"
            className="w-full justify-center bg-sandstone-base text-sandstone-navy shadow-[0_18px_48px_-22px_rgba(255,210,175,0.95)] hover:-translate-y-[3px] hover:bg-sandstone-base/90"
          >
            <Link href="/#contact" onClick={onClose}>
              {HERO_CTA}
            </Link>
          </Button>

          <Link
            href="/#contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/15 py-3 px-4 text-base font-medium text-white no-underline transition-colors hover:border-sandstone-base/80 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sandstone-base focus-visible:ring-offset-2 focus-visible:ring-offset-sandstone-navy"
          >
            <Mail className="h-4 w-4" aria-hidden />
            <span>Contact Us</span>
          </Link>
        </div>

        <div className="mt-8 space-y-1 text-sm text-white/70">
          <p className="font-semibold text-white/90">Sandstone Real Estate Team</p>
          <p className="leading-relaxed">
            Luxury guidance, relocation expertise, and concierge support — now
            one tap away.
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
