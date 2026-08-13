import type { JourneyStop } from '../types';
import styles from './JourneyCorridor.module.css';

interface JourneyPanelProps {
  stop: JourneyStop;
}

export function JourneyPanel({ stop }: JourneyPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.txt}>
        <div className={`mono ${styles.eyebrow}`}>{stop.eyebrow}</div>
        {stop.bigNumber && (
          <div className={styles.bigNumber}>
            {stop.bigNumber.value}
            <small>{stop.bigNumber.unit}</small>
          </div>
        )}
        <h2 className={styles.heading}>
          {stop.heading} <em>{stop.headingEmphasis}</em>
        </h2>
        <p className={styles.desc}>{stop.description}</p>
        {stop.chips && (
          <div className={styles.chipRow}>
            {stop.chips.map((chip) => (
              <span key={chip} className={styles.chip}>
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={styles.img}>
        <img data-parallax-img src={stop.image.src} alt={stop.image.alt} />
        <span className={`mono ${styles.imgTag}`}>{stop.image.tag}</span>
      </div>
    </div>
  );
}
