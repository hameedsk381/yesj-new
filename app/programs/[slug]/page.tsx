import { Metadata } from 'next';
import ProgramClientPage from './client-page';
import { getProgramBySlug } from '@/lib/data/programs';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const program = getProgramBySlug(params.slug);
  
  if (!program) {
    return {
      title: 'Program Not Found | YESJ',
    };
  }

  return {
    title: `${program.title} | YESJ Programs`,
    description: program.overviewDescription,
  };
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = getProgramBySlug(params.slug);

  if (!program) {
    notFound();
  }

  return <ProgramClientPage program={program} />;
}
