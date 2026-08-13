'use client';

import { useScrolled } from '@/lib/hooks/useScrolled';
import { navLinks } from '@/data/navigation';
import { contact } from '@/data/contact';
import { LoginMenu } from './LoginMenu';

export function Navbar() {
  const scrolled = useScrolled(50);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[90] flex items-center justify-between px-6 py-4 transition-all duration-300 sm:px-10 ${
        scrolled
          ? 'border-b border-hairline bg-obsidian-elevated/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="font-display text-lg italic text-ivory">
        Divine Vision <span className="text-champagne">— Infratech</span>
      </div>

      <div className="flex items-center gap-7">
        <div className="hidden gap-6 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono-label text-xs text-ivory transition-colors hover:text-champagne"
            >
              {link.label}
            </a>
          ))}
        </div>

        <LoginMenu />

        <a
          href={contact.phoneHref}
          className="font-mono-label rounded-full border border-champagne/60 px-4.5 py-2.5 text-xs text-champagne transition-colors hover:bg-champagne hover:text-obsidian"
        >
          Book a site visit
        </a>
      </div>
    </nav>
  );
}
