import { useRef } from 'react';
import { journeyStops } from '../data/journeyStops';
import { useJourneyScroll } from '../hooks/useJourneyScroll';
import { JourneyPanel } from './JourneyPanel';
import styles from './JourneyCorridor.module.css';

export function JourneyCorridor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useJourneyScroll({ containerRef, trackRef, progressRef });

  return (
    <div id="journey" className={styles.journey} ref={containerRef}>
      <div className={styles.track} ref={trackRef}>
        {journeyStops.map((stop) => (
          <JourneyPanel key={stop.id} stop={stop} />
        ))}
      </div>
      <div className={styles.progressTrack}>
        <i ref={progressRef} className={styles.progressFill} />
      </div>
    </div>
  );
}
