import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { MasterplanHud } from '@/components/masterplan/MasterplanHud';
import { MasterplanSceneLoader } from '@/components/masterplan/MasterplanSceneLoader';
import { townships, getTownshipBySlug } from '@/data/townships';

export function generateStaticParams() {
  return townships.map((t) => ({ project: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project: string }>;
}): Promise<Metadata> {
  const { project } = await params;
  const township = getTownshipBySlug(project);
  return { title: township ? `${township.name} — Interactive Masterplan` : 'Masterplan' };
}

export default async function MasterplanPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  const township = getTownshipBySlug(project);
  if (!township) notFound();

  return (
    <>
      <Navbar />
      <main className="relative h-svh w-full overflow-hidden">
        <MasterplanSceneLoader township={township} />
        <MasterplanHud township={township} />
      </main>
    </>
  );
}
