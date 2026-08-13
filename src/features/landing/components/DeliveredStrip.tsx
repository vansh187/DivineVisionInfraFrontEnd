import { Reveal } from '../../../shared/components/Reveal';
import { deliveredRecords } from '../data/deliveredRecords';
import styles from './DeliveredStrip.module.css';

export function DeliveredStrip() {
  return (
    <section id="record" className={styles.section}>
      <Reveal>
        <div className={`mono ${styles.eyebrow}`}>Handovers 2007 → 2017</div>
        <h2 className={styles.heading}>Five townships already lived in.</h2>
      </Reveal>

      <div className={styles.grid}>
        {deliveredRecords.map((record) => (
          <Reveal key={`${record.name}-${record.location}`} className={styles.card}>
            <em>{record.year}</em>
            <h4>{record.name}</h4>
            <span>{record.location}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
