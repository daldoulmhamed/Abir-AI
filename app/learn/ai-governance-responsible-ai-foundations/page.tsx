'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, Scale, Shield, Brain, TrendingUp, Award, 
  CheckCircle, Clock, ArrowRight, Target, Users, FileText 
} from 'lucide-react';

export default function AIGovernanceResponsibleAIPage() {
  const router = useRouter();

  const modules = [
    {
      id: 'module-1',
      number: 1,
      title: 'AI Ethics & Principles',
      description: 'Master foundational AI ethics. Learn major ethical frameworks (UNESCO, IEEE, EU HLEG) and navigate real-world dilemmas with stakeholder analysis.',
      icon: Scale,
      duration: '5-6 hours',
      lessons: 4,
      topics: ['7 Ethical Principles', 'UNESCO/IEEE/EU Frameworks', 'Ethical Decision-Making', 'Stakeholder Analysis'],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'module-2',
      number: 2,
      title: 'Bias Detection & Mitigation',
      description: 'Identify and eliminate AI bias. Calculate fairness metrics (disparate impact, demographic parity) and apply mitigation strategies with practical code.',
      icon: Target,
      duration: '6-7 hours',
      lessons: 5,
      topics: ['Bias Types', 'Fairness Metrics (AIF360)', 'Pre/In/Post-Processing', 'Python Code Examples'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'module-3',
      number: 3,
      title: 'AI Security & Privacy',
      description: 'Defend against adversarial attacks, model extraction, and data poisoning. Implement GDPR-compliant privacy-preserving techniques.',
      icon: Shield,
      duration: '5-6 hours',
      lessons: 4,
      topics: ['Adversarial Testing', 'Privacy Attacks', 'GDPR Compliance', 'Differential Privacy'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'module-4',
      number: 4,
      title: 'Regulatory Compliance (GDPR, AI Act)',
      description: 'Navigate GDPR (Article 22, DPIAs) and EU AI Act (risk-based framework, conformity assessment). Ensure global regulatory compliance.',
      icon: FileText,
      duration: '7-8 hours',
      lessons: 5,
      topics: ['GDPR Deep Dive', 'EU AI Act Risk Classification', 'Conformity Assessment', 'Sector Regulations'],
      color: 'from-cyan-500 to-teal-500'
    },
    {
      id: 'module-5',
      number: 5,
      title: 'Responsible AI Frameworks',
      description: 'Build governance structures (AI Ethics Committee, Review Board). Implement NIST AI RMF and Algorithmic Impact Assessments throughout the AI lifecycle.',
      icon: Brain,
      duration: '7-8 hours',
      lessons: 5,
      topics: ['Governance Structures', 'NIST AI RMF', 'Algorithmic Impact Assessment', 'Lifecycle Governance'],
      color: 'from-teal-500 to-green-500'
    },
    {
      id: 'module-6',
      number: 6,
      title: 'Best Practices & Standards',
      description: 'Apply ResponsibleOps best practices. Master tools (SHAP, AIF360, ART, Opacus) and standards (ISO 42001, IEEE 7000). Assess and advance your AI maturity.',
      icon: TrendingUp,
      duration: '8-9 hours',
      lessons: 6,
      topics: ['ResponsibleOps', 'Fairness/Explainability Tools', 'ISO 42001 Certification', 'Maturity Models'],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const handleModuleClick = (moduleId: string) => {
    router.push(`/learn/ai-governance-responsible-ai-foundations/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Intermediate Certification
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-400 dark:via-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
              AI Governance & Responsible AI Foundations
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Build ethical, compliant, and trustworthy AI systems. Master governance frameworks and global regulatory requirements.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2 mx-auto" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">40+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Hours of Content</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-2 mx-auto" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">6</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Comprehensive Modules</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2 mx-auto" />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">50+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Templates & Tools</div>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <Award className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-2 mx-auto" />
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Compliance Officers</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Navigate GDPR, AI Act, and global regulations
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Risk Managers</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Assess and mitigate AI-related risks
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">AI Practitioners</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Build fair, explainable, and secure models
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Business Leaders</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Implement responsible AI governance
                </p>
              </div>
            </div>
            <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
              <strong>Prerequisites:</strong> Basic understanding of AI/ML concepts. Familiarity with data processing and business operations.
            </p>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-800/50 rounded-2xl p-8 shadow-xl mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              What You'll Master
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Apply 7 AI ethical principles to real-world dilemmas',
                'Detect and mitigate bias with fairness metrics (AIF360, Fairlearn)',
                'Implement GDPR-compliant AI (Article 22, DPIAs, data subject rights)',
                'Navigate EU AI Act risk classification and conformity assessment',
                'Build governance structures (AI Ethics Committee, Review Board)',
                'Deploy NIST AI RMF and conduct Algorithmic Impact Assessments',
                'Defend against adversarial attacks and implement differential privacy',
                'Achieve ISO 42001 AI Management Systems certification readiness',
                'Use SHAP, LIME, ART, Opacus for fairness, explainability, security',
                'Develop comprehensive Responsible AI Action Plans'
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certification Benefits */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-8 shadow-xl mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Why Get Certified?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">↑ 35%</div>
                <p className="text-purple-100">
                  Higher salaries for AI governance professionals
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">€35M</div>
                <p className="text-purple-100">
                  Max EU AI Act penalties—compliance is critical
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">2025+</div>
                <p className="text-purple-100">
                  EU AI Act enforcement—prepare now
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
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {module.title}
                          </h3>
                        </div>
                        <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-2 transition-all" />
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

          {/* Capstone Project */}
          <div className="mt-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              Capstone Project: Responsible AI Action Plan
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-center max-w-3xl mx-auto">
              Apply everything you've learned by developing a comprehensive Responsible AI Action Plan for your organization or a realistic scenario.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">7 Required Components</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Ethics framework, bias mitigation, privacy, compliance, governance, monitoring, stakeholder engagement
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Real-World Application</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  12-20 pages addressing actual organizational challenges with actionable recommendations
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Expert Review</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Evaluated on understanding, feasibility, comprehensiveness, clarity, and risk mitigation
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-8 text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build Ethical & Compliant AI?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Start with Module 1 and master the ethical foundations of responsible AI.
            </p>
            <button
              onClick={() => handleModuleClick('module-1')}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors inline-flex items-center gap-2"
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
