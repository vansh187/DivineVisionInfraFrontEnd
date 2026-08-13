import Image from 'next/image';
import type { JourneyStop } from '@/lib/types';

interface JourneyPanelProps {
  stop: JourneyStop;
}

export function JourneyPanel({ stop }: JourneyPanelProps) {
  return (
    <div className="relative grid w-screen flex-none grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-20 sm:px-12 md:py-0">
        <div className="font-mono-label mb-4 text-champagne">{stop.eyebrow}</div>

        {stop.bigNumber && (
          <div className="font-display text-[clamp(60px,9vw,140px)] leading-[0.9] text-champagne">
            {stop.bigNumber.value}
            <small className="ml-1 align-super text-[0.32em] not-italic tracking-normal text-champagne-soft">
              {stop.bigNumber.unit}
            </small>
          </div>
        )}

        <h2 className="font-display text-[clamp(28px,4.4vw,60px)] italic leading-[0.98] text-ivory">
          {stop.heading} <em className="text-champagne">{stop.headingEmphasis}</em>
        </h2>

        <p className="mt-4.5 max-w-[42ch] text-[15px] font-light leading-[1.8] text-ivory-muted">
          {stop.description}
        </p>

        {stop.chips && (
          <div className="mt-5.5 flex flex-wrap gap-2">
            {stop.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-hairline bg-obsidian-elevated px-3.5 py-2 text-[12.5px] text-ivory-muted"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="relative min-h-[36svh] overflow-hidden md:order-2 md:min-h-0">
        <Image
          data-parallax-img
          src={stop.image.src}
          alt={stop.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/10 to-transparent" />
        <span className="font-mono-label absolute right-3.5 top-3.5 rounded bg-obsidian/80 px-2.5 py-1.5 text-[9.5px] text-ivory-muted backdrop-blur-sm">
          {stop.image.tag}
        </span>
      </div>
    </div>
  );
}
