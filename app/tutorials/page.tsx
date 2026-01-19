'use client';

import Link from 'next/link';

export default function TutorialsPage() {
  const tutorials = [
    {
      id: 'chatgpt-content-creation',
      title: 'Getting Started with ChatGPT for Content Creation',
      category: 'Content Creation',
      level: 'Beginner',
      duration: '15 min',
      description: 'Learn how to use ChatGPT effectively for writing blog posts, social media content, and marketing copy.',
    },
    {
      id: 'perplexity-research',
      title: 'AI-Powered Research: Using Perplexity AI',
      category: 'Research',
      level: 'Intermediate',
      duration: '20 min',
      description: 'Master the art of AI-assisted research with real-time fact-checking and source verification.',
    },
    {
      id: 'midjourney-design',
      title: 'Midjourney Prompt Engineering for Stunning Images',
      category: 'Design',
      level: 'Advanced',
      duration: '25 min',
      description: 'Create professional-quality images with precise control over AI-generated artwork.',
    },
    {
      id: 'buffer-social-media',
      title: 'Automating Social Media with Buffer and AI',
      category: 'Marketing',
      level: 'Intermediate',
      duration: '18 min',
      description: 'Streamline your social media workflow with AI-powered content suggestions and scheduling.',
    },
    {
      id: 'github-copilot-coding',
      title: 'GitHub Copilot for Faster Coding',
      category: 'Development',
      level: 'Beginner',
      duration: '12 min',
      description: 'Boost your programming productivity with AI code suggestions and autocompletion.',
    },
    {
      id: 'ethical-ai-business',
      title: 'Ethical AI Usage in Business',
      category: 'Ethics',
      level: 'All Levels',
      duration: '30 min',
      description: 'Understanding privacy, bias, and responsible AI implementation in professional settings.',
    },
    {
      id: 'getting-started-chatgpt-basics',
      title: 'Getting Started with ChatGPT: A Beginner\'s Hands-On Guide',
      category: 'Fundamentals',
      level: 'Beginner',
      duration: '30 min',
      description: 'New to ChatGPT? Learn how to sign up, navigate the interface, craft your first prompts, and apply it practically with core skills fast.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tutorials
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Step-by-step tutorials to help you use AI tools, workflows, and real-world applications for your job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tutorials.map((tutorial) => (
            <Link key={tutorial.id} href={`/tutorials/${tutorial.id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    tutorial.level === 'Beginner'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : tutorial.level === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {tutorial.level}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {tutorial.duration}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {tutorial.category}
                </p>
                <p className="text-gray-700 dark:text-gray-400 mb-6">
                  {tutorial.description}
                </p>
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                  Start Tutorial
                </button>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Tutorial Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Video Guides
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Embedded videos for visual learning
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Step-by-Step
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Detailed text instructions
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Visual Aids
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Screenshots and illustrations
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Templates
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Downloadable resources
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}