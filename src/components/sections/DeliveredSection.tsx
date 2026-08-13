import { Reveal } from '@/components/shared/Reveal';
import { deliveredRecords } from '@/data/deliveredRecords';

export function DeliveredSection() {
  return (
    <section id="record" className="px-6 py-20 sm:px-10 sm:py-28">
      <Reveal>
        <div className="font-mono-label mb-3.5 text-champagne">Handovers 2007 → 2017</div>
        <h2 className="font-display text-4xl italic text-ivory sm:text-6xl">
          Five townships already lived in.
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
        {deliveredRecords.map((record) => (
          <Reveal
            key={`${record.name}-${record.location}`}
            className="bg-obsidian p-5.5 transition-colors hover:bg-obsidian-elevated"
          >
            <em className="font-mono-label not-italic text-champagne">{record.year}</em>
            <h4 className="mt-2.5 mb-1 text-[17px] font-semibold tracking-tight text-ivory">
              {record.name}
            </h4>
            <span className="text-[12.5px] text-ivory-muted">{record.location}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
