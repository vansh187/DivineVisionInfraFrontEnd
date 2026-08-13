import { navLinks } from '@/data/navigation';
import { loginOptions } from '@/data/loginOptions';
import { contact } from '@/data/contact';
import { company } from '@/data/company';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-obsidian-elevated px-6 pb-8 pt-12 sm:px-10">
      <div className="grid grid-cols-1 gap-8 border-b border-hairline pb-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
        <div>
          <div className="font-display text-lg italic text-ivory">
            Divine Vision <span className="text-champagne">— Infratech</span>
          </div>
          <p className="mt-3.5 max-w-[28ch] text-sm font-light text-ivory-muted">
            {company.tagline}
          </p>
        </div>

        <div>
          <h5 className="font-mono-label mb-3.5 block text-champagne">Explore</h5>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-ivory-muted transition-colors hover:text-champagne">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-mono-label mb-3.5 block text-champagne">Account</h5>
          <ul className="flex flex-col gap-2.5">
            {loginOptions.map((option) => (
              <li key={option.href}>
                <a href={option.href} className="text-sm text-ivory-muted transition-colors hover:text-champagne">
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-mono-label mb-3.5 block text-champagne">Contact</h5>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a href={contact.phoneHref} className="text-sm text-ivory-muted transition-colors hover:text-champagne">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="text-sm text-ivory-muted transition-colors hover:text-champagne">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-mono-label mb-3.5 block text-champagne">Where we build</h5>
          <ul className="flex flex-col gap-2.5">
            {company.locations.map((location) => (
              <li key={location} className="text-sm text-ivory-muted">
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-4">
        <div className="font-mono-label text-[10px] text-ivory-muted/70">
          {company.legalName} · Est. {company.foundedYear}
        </div>
        <div className="font-mono-label text-[10px] text-ivory-muted/70">
          {company.compliance.join(' · ')}
        </div>
        <div className="font-mono-label text-[10px] text-ivory-muted/70">
          © {year} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
