import { notFound } from 'next/navigation';
import ProfileCard from '@/components/ProfileCard';
import { tools } from '@/data/tools';

const profileTitles: Record<string, string> = {
  freelancer: 'Freelancer Tools',
  student: 'Student Tools',
  entrepreneur: 'Entrepreneur Tools',
  creator: 'Content Creator Tools',
  developer: 'Developer Tools',
  general: 'General AI Tools',
};

const profileDescriptions: Record<string, string> = {
  freelancer: 'Find the best AI tools for Freelancer to improve productivity, content creation, and daily work using artificial intelligence.',
  student: 'Find the best AI tools for Student to improve productivity, content creation, and daily work using artificial intelligence.',
  entrepreneur: 'Find the best AI tools for Entrepreneur to improve productivity, content creation, and daily work using artificial intelligence.',
  creator: 'Find the best AI tools for Creator to improve productivity, content creation, and daily work using artificial intelligence.',
  developer: 'Find the best AI tools for Developer to improve productivity, content creation, and daily work using artificial intelligence.',
  general: 'Explore a curated selection of popular AI tools for various purposes without specific guidance.',
};

interface PageProps {
  params: Promise<{ job: string }>;
}

export default async function ProfilePage({ params }: PageProps) {
  const { job } = await params;

  if (!tools[job]) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileCard
          title={profileTitles[job]}
          description={profileDescriptions[job]}
          tools={tools[job]}
        />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(tools).map((job) => ({
    job,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { job } = await params;
  const title = profileTitles[job];

  if (!title) {
    return {
      title: 'Profile Not Found',
    };
  }

  return {
    title: `${title} | Abir-AI`,
    description: profileDescriptions[job],
  };
}