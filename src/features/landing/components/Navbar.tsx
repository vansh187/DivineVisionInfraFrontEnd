import { useScrolled } from '../../../shared/hooks/useScrolled';
import { navLinks } from '../data/navigation';
import { contact } from '../data/contact';
import { LoginMenu } from './LoginMenu';
import styles from './Navbar.module.css';

export function Navbar() {
  const scrolled = useScrolled(50);

  return (
    <nav className={[styles.nav, scrolled && styles.scrolled].filter(Boolean).join(' ')}>
      <div className={styles.logo}>
        DIVINE VISION <i>—</i> INFRATECH
      </div>
      <div className={styles.right}>
        <div className={styles.links}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <LoginMenu />
        <a className={styles.pill} href={contact.phoneHref}>
          Book a site visit
        </a>
      </div>
    </nav>
  );
}
