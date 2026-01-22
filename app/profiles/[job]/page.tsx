import { notFound } from 'next/navigation';
import ProfileCard from '@/components/ProfileCard';
import { tools } from '@/data/tools';

const slugToKeyMap: Record<string, string> = {
  freelancer: 'freelancer',
  student: 'student',
  entrepreneur: 'entrepreneur',
  'content-creator': 'creator',
  developer: 'developer',
  artist: 'artist',
  educator: 'educator',
  'other-not-listed': 'other',
  general: 'general',
};

const profileTitles: Record<string, string> = {
  freelancer: 'Freelancer Tools',
  student: 'Student Tools',
  entrepreneur: 'Entrepreneur Tools',
  creator: 'Content Creator Tools',
  developer: 'Developer Tools',
  artist: 'Artist Tools',
  educator: 'Educator Tools',
  'other': 'Explore All AI Tools',
  general: 'General AI Tools',
};

const profileDescriptions: Record<string, string> = {
  freelancer: 'Find the best AI tools for Freelancer to improve productivity, content creation, and daily work using artificial intelligence.',
  student: 'Find the best AI tools for Student to improve productivity, content creation, and daily work using artificial intelligence.',
  entrepreneur: 'Find the best AI tools for Entrepreneur to improve productivity, content creation, and daily work using artificial intelligence.',
  creator: 'Find the best AI tools for Creator to improve productivity, content creation, and daily work using artificial intelligence.',
  developer: 'Find the best AI tools for Developer to improve productivity, content creation, and daily work using artificial intelligence.',
  artist: 'Find the best AI tools for Artists and creative professionals to bring your artistic vision to life with AI-powered tools.',
  educator: 'Find the best AI tools for Educators to enhance teaching, create engaging content, and improve student learning outcomes.',
  'other': 'Explore a curated selection of AI tools across all categories and use cases without specific role guidance.',
  general: 'Explore a curated selection of popular AI tools for various purposes without specific guidance.',
};

interface PageProps {
  params: Promise<{ job: string }>;
}

export default async function ProfilePage({ params }: PageProps) {
  const { job } = await params;
  const toolKey = slugToKeyMap[job] || job;

  if (!tools[toolKey]) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileCard
          title={profileTitles[toolKey]}
          description={profileDescriptions[toolKey]}
          tools={tools[toolKey]}
        />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(slugToKeyMap).map((slug) => ({
    job: slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { job } = await params;
  const toolKey = slugToKeyMap[job] || job;
  const title = profileTitles[toolKey];

  if (!title) {
    return {
      title: 'Profile Not Found',
    };
  }

  return {
    title: `${title} | Abir-AI`,
    description: profileDescriptions[toolKey],
  };
}