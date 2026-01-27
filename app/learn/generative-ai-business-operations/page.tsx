'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Target, TrendingUp, Brain, Shield, Users, CheckCircle, Clock, Award, ArrowRight } from 'lucide-react';

export default function GenerativeAIBusinessOperationsPage() {
  const router = useRouter();

  const modules = [
    {
      id: 'module-1',
      number: 1,
      title: 'AI Strategy & Planning',
      description: 'Build a comprehensive AI strategy aligned with business goals. Gain executive buy-in and assess organizational readiness.',
      icon: Target,
      duration: '4-6 hours',
      lessons: 4,
      topics: ['AI Maturity Assessment', 'Use Case Prioritization', 'Executive Buy-In', 'Organizational Readiness'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'module-2',
      number: 2,
      title: 'Process Optimization with AI',
      description: 'Transform operations through intelligent process redesign. Map workflows, identify automation opportunities, and measure improvements.',
      icon: TrendingUp,
      duration: '5-7 hours',
      lessons: 4,
      topics: ['Process Mapping', 'AI-Enhanced Workflows', 'ROI Models', 'Case Studies'],
      color: 'from-cyan-500 to-teal-500'
    },
    {
      id: 'module-3',
      number: 3,
      title: 'ROI & Business Case Development',
      description: 'Build compelling financial cases with TCO models, NPV/IRR analysis, and executive presentations.',
      icon: TrendingUp,
      duration: '4-5 hours',
      lessons: 3,
      topics: ['Financial Modeling', 'Stakeholder Presentations', 'Value Tracking', 'Business Cases'],
      color: 'from-teal-500 to-green-500'
    },
    {
      id: 'module-4',
      number: 4,
      title: 'AI-Driven Decision Making',
      description: 'Implement AI analytics and decision support systems. Balance automation with human judgment and ethical practices.',
      icon: Brain,
      duration: '4-5 hours',
      lessons: 4,
      topics: ['Predictive Analytics', 'Decision Support', 'Decision Quality', 'Ethical AI'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'module-5',
      number: 5,
      title: 'Risk Management',
      description: 'Identify and mitigate AI risks. Navigate compliance requirements and implement governance frameworks.',
      icon: Shield,
      duration: '3-4 hours',
      lessons: 4,
      topics: ['Risk Framework', 'GDPR Compliance', 'Governance', 'Vendor Management'],
      color: 'from-emerald-500 to-lime-500'
    },
    {
      id: 'module-6',
      number: 6,
      title: 'Change Management & Adoption',
      description: 'Drive successful adoption across your organization. Build AI-ready culture and measure success.',
      icon: Users,
      duration: '3-5 hours',
      lessons: 4,
      topics: ['Change Strategy', 'User Adoption', 'Culture Building', 'Success Metrics'],
      color: 'from-lime-500 to-yellow-500'
    }
  ];

  const handleModuleClick = (moduleId: string) => {
    router.push(`/learn/generative-ai-business-operations/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Professional Certification
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
              Generative AI for Business Operations
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Transform your operations with AI. Build strategy. Drive ROI. Lead change.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2 mx-auto" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">25+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Hours of Content</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-2 mx-auto" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">6</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Comprehensive Modules</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <Target className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-2 mx-auto" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">20+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Real Case Studies</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <Award className="w-8 h-8 text-green-600 dark:text-green-400 mb-2 mx-auto" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">79€</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Optional Certification</div>
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
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Operations Leaders</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Managers optimizing workflows and reducing costs
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Business Owners</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Founders seeking competitive advantage through AI
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Consultants</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Advisors guiding clients through AI transformation
                </p>
              </div>
            </div>
            <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
              <strong>No technical background required.</strong> This course focuses on strategy, ROI, and execution.
            </p>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800/50 dark:to-slate-800/50 rounded-2xl p-8 shadow-xl mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              What You'll Learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Develop AI strategies aligned with business goals',
                'Build compelling business cases with quantified ROI',
                'Design AI-enhanced workflows (40%+ productivity gains)',
                'Implement AI-driven analytics for better decisions',
                'Navigate GDPR and AI compliance requirements',
                'Drive successful adoption and culture change'
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{outcome}</span>
                </div>
              ))}
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
                  onClick={() => handleModuleClick(module.id)}
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
              Ready to Transform Your Operations?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Start with Module 1 and build a comprehensive AI strategy for your organization.
            </p>
            <button
              onClick={() => handleModuleClick('module-1')}
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
