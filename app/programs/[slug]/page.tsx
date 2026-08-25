import { Metadata } from 'next';
import ProgramClientPage from './client-page';
import { getMergedPrograms } from '@/lib/programs-server';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/config';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const programs = await getMergedPrograms();
  const program = programs.find((p) => p.slug === params.slug);

  if (!program) {
    return {
      title: 'Program Not Found | YESJ',
    };
  }

  return {
    title: `${program.title} | YESJ Programs`,
    description: program.overviewDescription,
    alternates: { canonical: `${siteConfig.url}/programs/${program.slug}` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${siteConfig.url}/programs/${program.slug}`,
      siteName: "YESJ",
      title: `${program.title} | YESJ Programs`,
      description: program.overviewDescription,
      images: [
        {
          url: `${siteConfig.url}/YESJ_Logo_Black-eaf43d27.png`,
          width: 1200,
          height: 630,
          alt: "YESJ Logo - Youth Empowering Service Jesuits",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${program.title} | YESJ Programs`,
      description: program.overviewDescription,
      images: [`${siteConfig.url}/YESJ_Logo_Black-eaf43d27.png`],
    },
  };
}

export default async function ProgramPage({ params }: { params: { slug: string } }) {
  const programs = await getMergedPrograms();
  const program = programs.find((p) => p.slug === params.slug);

  if (!program) {
    notFound();
  }

  return <ProgramClientPage program={program} />;
}