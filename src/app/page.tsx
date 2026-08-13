import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JourneySection } from '@/components/sections/journey/JourneySection';
import { DeliveredSection } from '@/components/sections/DeliveredSection';

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Placeholder hero — replaced by the 3D terrain hero in the next phase */}
      <header className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-mono-label text-champagne">Est. 2005 · The NH-1 corridor</p>
        <h1 className="font-display text-5xl italic text-ivory sm:text-7xl">
          Divine Vision <span className="text-champagne">Infratech</span>
        </h1>
        <p className="max-w-md text-ivory-muted">
          3D terrain hero lands in the next phase — this placeholder confirms layout, theme and
          scroll wiring first.
        </p>
      </header>

      <JourneySection />
      <DeliveredSection />
      <Footer />
    </>
  );
}
