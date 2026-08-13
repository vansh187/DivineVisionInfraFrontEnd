import Image from 'next/image';
import Link from 'next/link';
import type { JourneyStop } from '@/lib/types';
import { getTownshipBySlug } from '@/data/townships';

interface JourneyPanelProps {
  stop: JourneyStop;
}

export function JourneyPanel({ stop }: JourneyPanelProps) {
  const township = getTownshipBySlug(stop.id);

  return (
    <div className="relative grid w-screen flex-none grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-20 sm:px-12 md:py-0">
        <div className="eyebrow-label mb-4 text-terracotta">{stop.eyebrow}</div>

        {stop.bigNumber && (
          <div className="font-display text-[clamp(60px,9vw,140px)] font-bold leading-[0.9] text-green">
            {stop.bigNumber.value}
            <small className="ml-1 align-super text-[0.32em] tracking-normal text-terracotta">
              {stop.bigNumber.unit}
            </small>
          </div>
        )}

        <h2 className="font-display text-balance text-[clamp(28px,4.4vw,60px)] font-bold leading-[1.15] text-ink">
          {stop.heading} <em className="text-green not-italic">{stop.headingEmphasis}</em>
        </h2>

        <p className="mt-4.5 max-w-[42ch] text-[15px] leading-[1.8] text-ink-muted">
          {stop.description}
        </p>

        {stop.chips && (
          <div className="mt-5.5 flex flex-wrap gap-2">
            {stop.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-hairline bg-surface px-3.5 py-2 text-[12.5px] text-ink-muted"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {township && (
          <Link
            href={`/masterplan/${township.slug}`}
            className="eyebrow-label mt-6 inline-flex w-fit items-center gap-2 text-terracotta transition-colors hover:text-green"
          >
            Explore in 3D →
          </Link>
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
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/10 to-transparent" />
        <span className="eyebrow-label absolute right-3.5 top-3.5 rounded bg-bg/90 px-2.5 py-1.5 text-[9.5px] text-ink-muted">
          {stop.image.tag}
        </span>
      </div>
    </div>
  );
}
