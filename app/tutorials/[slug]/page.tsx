'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Clock, BookOpen } from 'lucide-react';

const tutorialData: {
  [key: string]: {
    title: string;
    description: string;
    duration: string;
    category: string;
    level: string;
    sections: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  };
} = {
  'chatgpt-content-creation': {
    title: 'Getting Started with ChatGPT for Content Creation',
    description: 'Learn how to use ChatGPT effectively for writing blog posts, social media content, and marketing copy.',
    duration: '15 min',
    category: 'Content Creation',
    level: 'Beginner',
    sections: [
      { id: 'getting-started-chatgpt', title: 'Getting Started with ChatGPT', duration: '3 min' },
      { id: 'writing-prompts', title: 'Crafting Effective Prompts', duration: '3 min' },
      { id: 'content-types', title: 'Creating Different Content Types', duration: '3 min' },
      { id: 'refining-content', title: 'Refining and Optimizing Content', duration: '3 min' },
      { id: 'advanced-workflows', title: 'Advanced ChatGPT Workflows', duration: '3 min' },
    ],
  },
  'perplexity-research': {
    title: 'AI-Powered Research: Using Perplexity AI',
    description: 'Master the art of AI-assisted research with real-time fact-checking and source verification.',
    duration: '20 min',
    category: 'Research',
    level: 'Intermediate',
    sections: [
      { id: 'introduction-perplexity', title: 'Introduction to Perplexity AI', duration: '4 min' },
      { id: 'advanced-search', title: 'Advanced Search Techniques', duration: '4 min' },
      { id: 'research-workflows', title: 'Building Research Workflows', duration: '4 min' },
      { id: 'source-verification', title: 'Verifying Sources and Citations', duration: '4 min' },
      { id: 'pro-perplexity-workflow', title: 'Pro Perplexity Workflow', duration: '4 min' },
    ],
  },
  'midjourney-design': {
    title: 'Midjourney Prompt Engineering for Stunning Images',
    description: 'Create professional-quality images with precise control over AI-generated artwork.',
    duration: '25 min',
    category: 'Design',
    level: 'Advanced',
    sections: [
      { id: 'what-is-midjourney', title: 'What is Midjourney & Prompt Engineering', duration: '5 min' },
      { id: 'prompt-anatomy', title: 'The Anatomy of a Powerful Prompt', duration: '5 min' },
      { id: 'style-composition', title: 'Controlling Style & Composition', duration: '5 min' },
      { id: 'using-parameters', title: 'Using Midjourney Parameters', duration: '5 min' },
      { id: 'pro-prompt-workflow', title: 'Pro Prompt Workflow + Complete Mastery', duration: '5 min' },
    ],
  },
  'buffer-social-media': {
    title: 'Automating Social Media with Buffer and AI',
    description: 'Streamline your social media workflow with AI-powered content suggestions and scheduling.',
    duration: '18 min',
    category: 'Marketing',
    level: 'Intermediate',
    sections: [
      { id: 'what-is-buffer', title: 'What is Buffer + Why Use AI?', duration: '4 min' },
      { id: 'creating-posts-ai', title: 'Creating Social Posts with AI', duration: '4 min' },
      { id: 'scheduling-buffer', title: 'Scheduling with Buffer', duration: '4 min' },
      { id: 'improving-performance', title: 'Using AI to Improve Performance', duration: '3 min' },
      { id: 'full-automation-workflow', title: 'Full Automation Workflow', duration: '3 min' },
    ],
  },
  'github-copilot-coding': {
    title: 'GitHub Copilot for Faster Coding',
    description: 'Boost your programming productivity with AI code suggestions and autocompletion.',
    duration: '12 min',
    category: 'Development',
    level: 'Beginner',
    sections: [
      { id: 'what-is-github-copilot', title: 'What is GitHub Copilot?', duration: '3 min' },
      { id: 'writing-code-copilot', title: 'Writing Code with Copilot', duration: '4 min' },
      { id: 'debugging-refactoring-copilot', title: 'Debugging and Refactoring with Copilot', duration: '4 min' },
      { id: 'pro-workflow-copilot', title: 'Pro Workflow + Wrap-Up', duration: '1 min' },
    ],
  },
  'ethical-ai-business': {
    title: 'Ethical AI Usage in Business',
    description: 'Understanding privacy, bias, and responsible AI implementation in professional settings.',
    duration: '30 min',
    category: 'Ethics',
    level: 'All Levels',
    sections: [
      { id: 'what-is-ethical-ai', title: 'What Is Ethical AI in Business?', duration: '6 min' },
      { id: 'data-privacy-security', title: 'Data Privacy & Security', duration: '6 min' },
      { id: 'bias-fairness-ai', title: 'Bias and Fairness in AI', duration: '6 min' },
      { id: 'transparency-oversight', title: 'Transparency & Human Oversight', duration: '6 min' },
      { id: 'ethical-best-practices', title: 'Ethical AI Best Practices', duration: '6 min' },
    ],
  },
};

const categoryColors: { [key: string]: string } = {
  'Content Creation': 'from-purple-600 to-pink-600',
  'Research': 'from-cyan-600 to-blue-600',
  'Design': 'from-emerald-600 to-teal-600',
  'Marketing': 'from-amber-600 to-orange-600',
  'Development': 'from-indigo-600 to-purple-600',
  'Ethics': 'from-red-600 to-pink-600',
};

export default function TutorialPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const tutorial = tutorialData[slug];

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Tutorial Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The tutorial you're looking for doesn't exist.</p>
          <Link
            href="/tutorials"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Tutorials
          </Link>
        </div>
      </div>
    );
  }

  const gradientClass = categoryColors[tutorial.category] || 'from-blue-600 to-cyan-600';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradientClass} text-white py-12 px-4 md:px-8`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">{tutorial.level}</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">{tutorial.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{tutorial.title}</h1>
          <p className="text-lg opacity-90 mb-6">{tutorial.description}</p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{tutorial.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={20} />
              <span>{tutorial.sections.length} Sections</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Tutorial Sections</h2>

          <div className="space-y-4">
            {tutorial.sections.map((section, index) => (
              <Link
                key={section.id}
                href={`/tutorials/${slug}/${section.id}`}
                className="group block p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Section {index + 1} of {tutorial.sections.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{section.duration}</span>
                    <ChevronRight className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition" size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/tutorials"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
            >
              ← Back to All Tutorials
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
