import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Target, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Productivity & GitHub Copilot Certification | Abir-AI',
  description: 'Master GitHub Copilot and AI-assisted development. Learn to code faster, automate workflows, and become a 10x more productive developer.',
  keywords: ['GitHub Copilot', 'AI Productivity', 'AI-Assisted Development', 'Coding Automation', 'Developer Productivity', 'AI Tools'],
};

const modules = [
  {
    id: 'module-1',
    title: 'Introduction to GitHub Copilot',
    description: 'Master the fundamentals of GitHub Copilot, from installation to writing effective prompts.',
    duration: '3-6 hours',
    lessons: 3,
    topics: [
      'Understanding Copilot\'s AI architecture',
      'Installation and IDE configuration',
      'Prompt engineering basics',
      'Context management strategies'
    ],
    slug: 'introduction-to-github-copilot'
  },
  {
    id: 'module-2',
    title: 'Advanced Copilot Techniques',
    description: 'Explore advanced features including Chat, test generation, refactoring, and documentation.',
    duration: '4-7 hours',
    lessons: 4,
    topics: [
      'GitHub Copilot Chat mastery',
      'Automated test generation (TDD)',
      'AI-assisted code refactoring',
      'Documentation generation'
    ],
    slug: 'advanced-copilot-techniques'
  },
  {
    id: 'module-3',
    title: 'AI-Assisted Development Workflows',
    description: 'Integrate Copilot into real-world development workflows from feature building to CI/CD.',
    duration: '4-6 hours',
    lessons: 4,
    topics: [
      'Full-stack development with Copilot',
      'AI-powered debugging strategies',
      'Code review with AI assistance',
      'CI/CD pipeline integration'
    ],
    slug: 'ai-assisted-development-workflows'
  },
  {
    id: 'module-4',
    title: 'Team Collaboration & Code Quality',
    description: 'Establish team standards, maintain quality, and implement security best practices.',
    duration: '3-5 hours',
    lessons: 4,
    topics: [
      'Team AI usage policies',
      'Code quality standards',
      'Knowledge sharing practices',
      'Security and compliance'
    ],
    slug: 'team-collaboration-code-quality'
  },
  {
    id: 'module-5',
    title: 'No-Code & Automation with AI',
    description: 'Build automations and productivity tools without extensive coding knowledge.',
    duration: '3-5 hours',
    lessons: 4,
    topics: [
      'GitHub Actions automation',
      'Data processing scripts',
      'Custom productivity utilities',
      'Workflow integration'
    ],
    slug: 'no-code-automation'
  },
  {
    id: 'module-6',
    title: 'Advanced Integration & Best Practices',
    description: 'Deploy Copilot at scale, measure ROI, and stay ahead of AI development trends.',
    duration: '3-5 hours',
    lessons: 4,
    topics: [
      'Enterprise integration patterns',
      'Performance optimization',
      'ROI measurement and tracking',
      'Future of AI-assisted development'
    ],
    slug: 'advanced-integration-best-practices'
  }
];

export default function AIProductivityCertificationPage() {
  const totalDuration = '20-34 hours';
  const totalLessons = modules.reduce((sum, mod) => sum + mod.lessons, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/certifications/ai-productivity-github-copilot"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Certification Overview
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AI Productivity & GitHub Copilot
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Master AI-assisted development and supercharge your productivity
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Duration</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{totalDuration}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Lessons</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{totalLessons} lessons</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Skill Level</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">Intermediate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Paths */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-8 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Choose Your Learning Path
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🚀 Beginner Track</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Modules 1, 5</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">For product managers, designers, no-code builders</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💻 Developer Track</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Modules 1-4, 6</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">For software developers and engineers</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">👔 Team Lead Track</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">All Modules</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">For tech leads and engineering managers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Course Modules</h2>
          
          {modules.map((module, index) => (
            <div
              key={module.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 ml-13">
                      {module.description}
                    </p>
                  </div>
                </div>

                <div className="ml-13 space-y-4">
                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{module.lessons} lessons</span>
                    </div>
                  </div>

                  {/* Topics */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      What you'll learn:
                    </p>
                    <ul className="space-y-1">
                      {module.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    <Link
                      href={`/learn/ai-productivity-github-copilot/${module.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Start Module {index + 1}
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Begin your journey to AI-powered productivity. Complete all modules and earn your certification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/learn/ai-productivity-github-copilot/introduction-to-github-copilot"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Module 1
            </Link>
            <Link
              href="/certifications/ai-productivity-github-copilot"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              View Certification Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
