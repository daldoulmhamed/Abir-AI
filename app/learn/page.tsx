import Link from 'next/link';

export default function LearnPage() {
  const topics = [
    {
      title: 'AI Fundamentals',
      description: 'Understanding the basics of artificial intelligence and machine learning.',
      items: [
        'What is AI?',
        'Types of AI (Narrow vs General)',
        'Machine Learning Basics',
        'Neural Networks Explained',
        'Ethics in AI',
      ],
      link: '/learn/ai-fundamentals',
    },
    {
      title: 'Safe AI Usage',
      description: 'Best practices for using AI tools responsibly and securely.',
      items: [
        'Data Privacy Considerations',
        'Avoiding AI Hallucinations',
        'Fact-checking AI Outputs',
        'Responsible AI Prompts',
        'Digital Literacy Skills',
      ],
      link: '/learn/safe-ai-usage',
    },
    {
      title: 'Productivity Workflows',
      description: 'Integrating AI into your daily work routines for maximum efficiency.',
      items: [
        'AI for Task Management',
        'Automating Repetitive Tasks',
        'Content Creation Workflows',
        'Research and Analysis',
        'Communication Enhancement',
      ],
      link: '/learn/productivity-workflows',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learn how to use artificial intelligence for real work
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover AI fundamentals, ethical usage practices, and productivity workflows to integrate artificial intelligence safely and effectively into your daily work routines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {topic.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {topic.description}
              </p>
              <ul className="space-y-2 mb-6">
                {topic.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-700 dark:text-gray-400">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              {topic.link ? (
                <Link href={topic.link}>
                  <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Start Learning
                  </button>
                </Link>
              ) : (
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Start Learning
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Interactive Tutorials
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Step-by-step guides with hands-on exercises to master AI tools.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Video walkthroughs</li>
                <li>• Practice exercises</li>
                <li>• Downloadable templates</li>
                <li>• Real-world examples</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Certification Programs
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Earn credentials in AI literacy and responsible technology use.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• AI Ethics Certification</li>
                <li>• Tool Mastery Badges</li>
                <li>• Productivity Specialist</li>
                <li>• Digital Skills Recognition</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}