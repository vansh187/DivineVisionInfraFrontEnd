import { Reveal } from '../../../shared/components/Reveal';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <header className={styles.hero}>
      <p className={`mono ${styles.kicker}`}>Est. 2005 · The NH-1 corridor</p>

      <h1 className={styles.headline}>
        <span className={styles.line}>
          <span>One highway.</span>
        </span>
        <span className={styles.line}>
          <span>
            <em>Seven</em> townships.
          </span>
        </span>
      </h1>

      <div className={styles.row}>
        <Reveal as="p" className={styles.lede}>
          Scroll — the page drives you down NH-1 from the Delhi border to Kurukshetra, stopping at
          every Divine Vision township on the way.
        </Reveal>
        <div className={`mono ${styles.scrollCue}`}>
          Drive <i />
        </div>
      </div>

      <Reveal className={styles.video}>
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80"
          alt="NH-1 Highway Corridor Aerial View"
        />
        <span className={`mono ${styles.videoTag}`}>NH-1 Highway Corridor</span>
      </Reveal>
    </header>
  );
}
