import Link from 'next/link';

const profiles = [
  { name: 'Freelancer', slug: 'freelancer', description: 'Tools for independent professionals' },
  { name: 'Student', slug: 'student', description: 'AI assistance for learning and research' },
  { name: 'Entrepreneur', slug: 'entrepreneur', description: 'Tools to build and scale your business' },
  { name: 'Content Creator', slug: 'creator', description: 'AI for content creation and media' },
  { name: 'Developer', slug: 'developer', description: 'AI tools for coding and development' },
  { name: 'Another', slug: 'general', description: 'Explore all AI tools without specific guidance' },
];

export default function ProfileSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <Link
          key={profile.slug}
          href={`/profiles/${profile.slug}`}
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {profile.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {profile.description}
          </p>
        </Link>
      ))}
    </div>
  );
}