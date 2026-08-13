import { useScrolled } from '../../../shared/hooks/useScrolled';
import { navLinks } from '../data/navigation';
import styles from './Navbar.module.css';

export function Navbar() {
  const scrolled = useScrolled(50);

  return (
    <nav className={[styles.nav, scrolled && styles.scrolled].filter(Boolean).join(' ')}>
      <div className={styles.logo}>
        DIVINE VISION <i>—</i> INFRATECH
      </div>
      <div className={styles.links}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <a className={styles.pill} href="#visit">
        Book a site visit
      </a>
    </nav>
  );
}
