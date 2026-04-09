import { Metadata } from 'next';
import ProgramClientPage from './client-page';
import { getProgramBySlug } from '@/lib/data/programs';
import { notFound } from 'next/navigation';
import { getProgramBySlugFetcher, STRAPI_URL } from '@/lib/strapi';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let program = null;
  
  if (STRAPI_URL && process.env.STRAPI_API_TOKEN) {
    program = await getProgramBySlugFetcher(params.slug);
  }
  
  if (!program) {
    program = getProgramBySlug(params.slug);
  }
  
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

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  let program = null;

  if (STRAPI_URL && process.env.STRAPI_API_TOKEN) {
    program = await getProgramBySlugFetcher(params.slug);
  }

  if (!program) {
    program = getProgramBySlug(params.slug);
  }

  if (!program) {
    notFound();
  }

  return <ProgramClientPage program={program} />;
}
