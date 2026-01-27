import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, Award, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Generative AI Practitioner Learning Path | Abir-AI',
  description: 'Start your journey to become a Certified Generative AI Practitioner. 7 comprehensive modules covering AI tools, prompt engineering, and practical applications.',
};

const modules = [
  {
    id: 1,
    slug: 'module-1',
    title: 'Introduction to Generative AI & AI Tools',
    duration: '2-5 hours',
    level: 'Beginner',
    lessons: 3,
    description: 'Learn AI fundamentals, explore major AI tools, and master basic prompting techniques.',
    topics: ['AI Fundamentals', 'Tool Selection', 'Basic Prompting', 'AI Workspace Setup']
  },
  {
    id: 2,
    slug: 'module-2',
    title: 'AI for Writing & Content Creation',
    duration: '3-6 hours',
    level: 'Beginner-Intermediate',
    lessons: 3,
    description: 'Master AI-assisted writing for professional content while maintaining your unique voice.',
    topics: ['Advanced Prompting', 'Voice Consistency', 'Content Templates', 'Professional Writing']
  },
  {
    id: 3,
    slug: 'module-3',
    title: 'AI for Communication & Collaboration',
    duration: '3-5 hours',
    level: 'Intermediate',
    lessons: 3,
    description: 'Enhance meetings, presentations, and team coordination with AI assistance.',
    topics: ['Meeting Management', 'Presentations', 'Team Coordination', 'Stakeholder Communication']
  },
  {
    id: 4,
    slug: 'module-4',
    title: 'AI for Data Analysis & Visualization',
    duration: '3-6 hours',
    level: 'Intermediate',
    lessons: 3,
    description: 'Leverage AI for data analysis, visualization, and actionable insights.',
    topics: ['Data Analysis', 'Spreadsheet Automation', 'Visualization', 'Insight Generation']
  },
  {
    id: 5,
    slug: 'module-5',
    title: 'AI for Coding & Development',
    duration: '4-7 hours',
    level: 'Intermediate-Advanced',
    lessons: 3,
    description: 'Use AI coding assistants to write, debug, and learn code faster.',
    topics: ['AI Coding Tools', 'Code Generation', 'Debugging', 'Learning Languages']
  },
  {
    id: 6,
    slug: 'module-6',
    title: 'Building AI-Enhanced Workflows',
    duration: '3-6 hours',
    level: 'Intermediate-Advanced',
    lessons: 3,
    description: 'Design and implement end-to-end AI-powered workflows that multiply productivity.',
    topics: ['Workflow Design', 'Automation', 'Integration', 'ROI Optimization']
  },
  {
    id: 7,
    slug: 'module-7',
    title: 'Ethics, Best Practices & Future Trends',
    duration: '2-4 hours',
    level: 'All Levels',
    lessons: 3,
    description: 'Use AI responsibly, stay secure, and position yourself for the AI-driven future.',
    topics: ['AI Ethics', 'Security', 'Career Strategy', 'Future Trends']
  }
];

export default function LearningPathPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Free Learning Path
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Generative AI Practitioner
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Master AI productivity through 7 comprehensive modules. Learn at your own pace, 
            build real projects, and earn your certification.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Modules</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">20-39h</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Duration</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">15+h</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Weekly Time Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Your Learning Journey</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Complete modules in order to build a strong foundation
            </p>
          </div>

          <div className="space-y-4">
            {modules.map((module, index) => (
              <Link 
                key={module.id}
                href={`/learn/generative-ai-practitioner/${module.slug}`}
                className="block group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
                  <div className="flex items-start gap-4">
                    {/* Module Number */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {module.id}
                      </div>
                    </div>

                    {/* Module Content */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {module.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {module.description}
                          </p>
                        </div>
                      </div>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {module.topics.map((topic, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{module.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{module.lessons} lessons</span>
                        </div>
                        <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs font-medium">
                          {module.level}
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Productivity?</h3>
            <p className="mb-6 opacity-90">
              Start with Module 1 and unlock the power of AI in your daily work
            </p>
            <Link 
              href="/learn/generative-ai-practitioner/module-1"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Begin Module 1
            </Link>
          </div>

          {/* FAQ Note */}
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              💡 All modules are free. Optional certification exam available after completion.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
