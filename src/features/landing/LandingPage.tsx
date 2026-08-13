import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { JourneyCorridor } from './components/JourneyCorridor';
import { DeliveredStrip } from './components/DeliveredStrip';
import { Footer } from './components/Footer';

/**
 * Composition root for the marketing landing page. Each section is a
 * self-contained component driven by its own data module — this file only
 * decides ordering, nothing else.
 */
export function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <JourneyCorridor />
      <DeliveredStrip />
      <Footer />
    </>
  );
}
