'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, Code, Zap, Users, Shield, TrendingUp, 
  CheckCircle, Clock, ArrowRight, Target, Award, GitBranch 
} from 'lucide-react';


export default function AIProductivityGitHubCopilotPage() {
  const router = useRouter();

  const modules = [
    {
      id: 'module-1',
      number: 1,
      title: 'Introduction to GitHub Copilot',
      description: 'Master the fundamentals of GitHub Copilot, from installation to writing effective prompts and managing context.',
      icon: Code,
      duration: '3-6 hours',
      lessons: 3,
      topics: ['Copilot AI Architecture', 'IDE Configuration', 'Prompt Engineering', 'Context Management'],
      color: 'from-blue-500 to-cyan-500',
      slug: 'introduction-to-github-copilot'
    },
    {
      id: 'module-2',
      number: 2,
      title: 'Advanced Copilot Techniques',
      description: 'Explore advanced features including Chat, test generation, refactoring, and automated documentation.',
      icon: Zap,
      duration: '4-7 hours',
      lessons: 4,
      topics: ['Copilot Chat Mastery', 'TDD Test Generation', 'AI-Assisted Refactoring', 'Auto Documentation'],
      color: 'from-cyan-500 to-teal-500',
      slug: 'advanced-copilot-techniques'
    },
    {
      id: 'module-3',
      number: 3,
      title: 'AI-Assisted Development Workflows',
      description: 'Integrate Copilot into real-world development workflows from feature building to CI/CD automation.',
      icon: GitBranch,
      duration: '4-6 hours',
      lessons: 4,
      topics: ['Full-Stack Development', 'AI Debugging', 'Code Review', 'CI/CD Integration'],
      color: 'from-teal-500 to-green-500',
      slug: 'ai-assisted-development-workflows'
    },
    {
      id: 'module-4',
      number: 4,
      title: 'Team Collaboration & Code Quality',
      description: 'Establish team standards, maintain quality, and implement security best practices for AI-assisted development.',
      icon: Users,
      duration: '3-5 hours',
      lessons: 4,
      topics: ['Team AI Policies', 'Code Quality Standards', 'Knowledge Sharing', 'Security & Compliance'],
      color: 'from-green-500 to-emerald-500',
      slug: 'team-collaboration-code-quality'
    },
    {
      id: 'module-5',
      number: 5,
      title: 'No-Code & Automation with AI',
      description: 'Build automations and productivity tools without extensive coding knowledge using AI assistance.',
      icon: Target,
      duration: '3-5 hours',
      lessons: 4,
      topics: ['GitHub Actions', 'Data Processing', 'Productivity Utilities', 'Workflow Integration'],
      color: 'from-emerald-500 to-lime-500',
      slug: 'no-code-automation'
    },
    {
      id: 'module-6',
      number: 6,
      title: 'Advanced Integration & Best Practices',
      description: 'Deploy Copilot at scale, measure ROI, and stay ahead of AI development trends for enterprise success.',
      icon: TrendingUp,
      duration: '3-5 hours',
      lessons: 4,
      topics: ['Enterprise Integration', 'Performance Optimization', 'ROI Tracking', 'Future AI Trends'],
      color: 'from-lime-500 to-yellow-500',
      slug: 'advanced-integration-best-practices'
    }
  ];

  const handleModuleClick = (slug: string) => {
    router.push(`/learn/ai-productivity-github-copilot/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Intermediate Certification
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
              AI Productivity & GitHub Copilot
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Master AI-assisted development and become a 10x more productive developer. Code faster, smarter, and better with GitHub Copilot.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2 mx-auto" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">20-34</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Hours of Content</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-2 mx-auto" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">6</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Comprehensive Modules</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <Code className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-2 mx-auto" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">50+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Code Examples</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <Award className="w-8 h-8 text-green-600 dark:text-green-400 mb-2 mx-auto" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">79€</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Certification Fee</div>
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              Who This Is For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Developers & Engineers</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Write code faster and smarter with AI assistance
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Tech Leads & Managers</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Scale AI adoption across development teams
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Non-Technical Builders</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Build automations without extensive coding
                </p>
              </div>
            </div>
            <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
              <strong>Prerequisites:</strong> Basic programming knowledge recommended (any language). No prior AI experience required.
            </p>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800/50 dark:to-slate-800/50 rounded-2xl p-8 shadow-xl mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              What You'll Master
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Generate code 40% faster with GitHub Copilot',
                'Write effective prompts for AI-assisted coding',
                'Automate testing, refactoring, and documentation',
                'Debug efficiently with AI-powered suggestions',
                'Build CI/CD pipelines with AI automation',
                'Implement team-wide AI adoption strategies',
                'Create no-code automations with GitHub Actions',
                'Measure ROI and productivity gains',
                'Maintain code quality and security standards',
                'Stay ahead with emerging AI development trends'
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Paths */}
          <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-2xl p-8 shadow-xl mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Choose Your Learning Path
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="font-bold text-xl mb-2">Beginner Track</h3>
                <p className="text-blue-100 text-sm mb-3">
                  Modules 1, 5 (6-11 hours)
                </p>
                <p className="text-sm text-blue-50">
                  For product managers, designers, and no-code builders
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl mb-3">💻</div>
                <h3 className="font-bold text-xl mb-2">Developer Track</h3>
                <p className="text-cyan-100 text-sm mb-3">
                  Modules 1-4, 6 (17-29 hours)
                </p>
                <p className="text-sm text-cyan-50">
                  For software developers and engineers
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl mb-3">👔</div>
                <h3 className="font-bold text-xl mb-2">Team Lead Track</h3>
                <p className="text-teal-100 text-sm mb-3">
                  All Modules (20-34 hours)
                </p>
                <p className="text-sm text-teal-50">
                  For tech leads and engineering managers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            Course Modules
          </h2>
          <div className="space-y-6">
            {modules.map((module) => {
              const IconComponent = module.icon;
              return (
                <div
                  key={module.id}
                  onClick={() => handleModuleClick(module.slug)}
                  className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200/50 dark:border-slate-700/50 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-6">
                    {/* Module Number & Icon */}
                    <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>

                    {/* Module Content */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                            Module {module.number}
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {module.title}
                          </h3>
                        </div>
                        <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-2 transition-all" />
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {module.description}
                      </p>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {module.topics.map((topic, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{module.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{module.lessons} lessons</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to 10x Your Productivity?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Start with Module 1 and master GitHub Copilot to code faster and smarter than ever before.
            </p>
            <button
              onClick={() => handleModuleClick('introduction-to-github-copilot')}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
