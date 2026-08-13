import { navLinks } from '../data/navigation';
import { loginOptions } from '../data/loginOptions';
import { contact } from '../data/contact';
import { company } from '../data/company';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            DIVINE VISION <i>—</i> INFRATECH
          </div>
          <p className={styles.tagline}>{company.tagline}</p>
        </div>

        <div className={styles.column}>
          <h5 className={`mono ${styles.heading}`}>Explore</h5>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h5 className={`mono ${styles.heading}`}>Account</h5>
          <ul>
            {loginOptions.map((option) => (
              <li key={option.href}>
                <a href={option.href}>{option.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h5 className={`mono ${styles.heading}`}>Contact</h5>
          <ul>
            <li>
              <a href={contact.phoneHref}>{contact.phone}</a>
            </li>
            <li>
              <a href={contact.emailHref}>{contact.email}</a>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h5 className={`mono ${styles.heading}`}>Where we build</h5>
          <ul>
            {company.locations.map((location) => (
              <li key={location}>{location}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div>
          {company.legalName} · Est. {company.foundedYear}
        </div>
        <div>{company.compliance.join(' · ')}</div>
        <div>© {year} All rights reserved.</div>
      </div>
    </footer>
  );
}
