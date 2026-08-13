import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { JourneySection } from '@/components/sections/journey/JourneySection';
import { DeliveredSection } from '@/components/sections/DeliveredSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <JourneySection />
      <DeliveredSection />
      <Footer />
    </>
  );
}
