import { contact } from '../data/contact';
import styles from './CtaSection.module.css';

export function CtaSection() {
  return (
    <div className={styles.cta} id="visit">
      <h2 className={styles.heading}>
        Drive it <em>yourself.</em>
      </h2>
      <p className={styles.copy}>
        Site visits seven days a week at both live townships. Walk the layout, see the approvals,
        pick from the open plots.
      </p>
      <div>
        <a className={`${styles.btn} ${styles.btnGold}`} href={contact.phoneHref}>
          Call {contact.phone}
        </a>
        <a className={styles.btn} href={contact.emailHref}>
          Request layout plan
        </a>
      </div>
    </div>
  );
}
