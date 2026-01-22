import Link from 'next/link';

const profiles = [
  { name: 'Freelancer', slug: 'freelancer', description: 'Tools for independent professionals' },
  { name: 'Student', slug: 'student', description: 'AI assistance for learning and research' },
  { name: 'Entrepreneur', slug: 'entrepreneur', description: 'Tools to build and scale your business' },
  { name: 'Content Creator', slug: 'content-creator', description: 'AI for content creation and media' },
  { name: 'Artist', slug: 'artist', description: 'AI tools for creative and artistic work' },
  { name: 'Educator', slug: 'educator', description: 'AI tools for teaching and educational content' },
  { name: 'Other / Not Listed', slug: 'other', description: 'Explore all AI tools without specific guidance' },
];

export default function ProfileSelector() {
  const firstFourProfiles = profiles.slice(0, 4);
  const lastThreeProfiles = profiles.slice(4);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {firstFourProfiles.map((profile) => (
          <Link
            key={profile.slug}
            href={`/profiles/${profile.slug}`}
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
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
      <div className="flex justify-center gap-6 flex-wrap mt-6">
        {lastThreeProfiles.map((profile) => (
          <Link
            key={profile.slug}
            href={`/profiles/${profile.slug}`}
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 w-full md:w-80 lg:w-80"
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
    </>
  );
}