import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCertificationBySlug, certifications, Certification } from "@/data/certifications";
import { 
  generateCertificationSchema, 
  generateBreadcrumbSchema 
} from "@/utils/generateCertificationSchema";

interface CertificationPageProps {
  params: {
    slug: string;
  };
}

// Skills mapping based on certification slug
const getSkillsForCertification = (certification: Certification) => {
  const skillsMap: Record<string, Array<{icon: string, title: string, items: string[]}>> = {
    'generative-ai-practitioner': [
      {
        icon: '🧠',
        title: 'AI Fundamentals',
        items: [
          'Understanding how LLMs work',
          'Identifying AI capabilities & limitations',
          'Evaluating AI outputs critically'
        ]
      },
      {
        icon: '✍️',
        title: 'Prompt Engineering',
        items: [
          'Crafting effective prompts',
          'Advanced prompting techniques',
          'Context optimization strategies'
        ]
      },
      {
        icon: '🛠️',
        title: 'Practical Application',
        items: [
          'Using ChatGPT, Claude & tools effectively',
          'Implementing AI in workflows',
          'Building AI-enhanced projects'
        ]
      },
      {
        icon: '⚖️',
        title: 'Responsible AI',
        items: [
          'Understanding AI ethics & bias',
          'Data privacy & security best practices',
          'Transparent AI usage'
        ]
      },
      {
        icon: '💡',
        title: 'Business Strategy',
        items: [
          'Identifying AI use cases',
          'Evaluating ROI of AI solutions',
          'Communicating AI value to stakeholders'
        ]
      },
      {
        icon: '🚀',
        title: 'Productivity & Automation',
        items: [
          'Automating repetitive tasks',
          'Optimizing workflows with AI',
          'Measuring productivity gains'
        ]
      }
    ],
    'ai-productivity-github-copilot': [
      {
        icon: '💻',
        title: 'GitHub Copilot Mastery',
        items: [
          'AI-assisted code generation',
          'Copilot best practices & shortcuts',
          'Context-aware coding techniques'
        ]
      },
      {
        icon: '⚡',
        title: 'AI-Assisted Development',
        items: [
          'Writing code faster with AI',
          'Debugging with AI assistance',
          'Refactoring & code optimization'
        ]
      },
      {
        icon: '🔄',
        title: 'Workflow Automation',
        items: [
          'Automating repetitive dev tasks',
          'CI/CD integration with AI',
          'Documentation generation'
        ]
      },
      {
        icon: '🤝',
        title: 'Human-AI Collaboration',
        items: [
          'Effective pair programming with AI',
          'Code review with AI tools',
          'Balancing AI suggestions with expertise'
        ]
      },
      {
        icon: '📊',
        title: 'Code Quality',
        items: [
          'Maintaining high code standards',
          'AI-powered testing strategies',
          'Security best practices'
        ]
      },
      {
        icon: '🎯',
        title: 'Productivity Optimization',
        items: [
          'Measuring productivity improvements',
          'Building no-code/low-code solutions',
          'Team collaboration strategies'
        ]
      }
    ],
    'generative-ai-business-operations': [
      {
        icon: '📈',
        title: 'AI Strategy & Planning',
        items: [
          'Developing AI transformation roadmaps',
          'Identifying strategic opportunities',
          'Aligning AI with business objectives'
        ]
      },
      {
        icon: '⚙️',
        title: 'Process Optimization',
        items: [
          'Analyzing processes for AI integration',
          'Workflow automation strategies',
          'Efficiency measurement & KPIs'
        ]
      },
      {
        icon: '💰',
        title: 'ROI & Business Cases',
        items: [
          'Calculating AI investment returns',
          'Building compelling business cases',
          'Cost-benefit analysis frameworks'
        ]
      },
      {
        icon: '🎯',
        title: 'AI-Driven Decision Making',
        items: [
          'Data-driven insights with AI',
          'Predictive analytics applications',
          'Strategic decision frameworks'
        ]
      },
      {
        icon: '🛡️',
        title: 'Risk Management',
        items: [
          'Identifying AI implementation risks',
          'Mitigation strategies & controls',
          'Compliance & regulatory awareness'
        ]
      },
      {
        icon: '🔄',
        title: 'Change Management',
        items: [
          'Leading organizational AI adoption',
          'Stakeholder engagement strategies',
          'Training & upskilling teams'
        ]
      }
    ],
    'ai-governance-responsible-ai-foundations': [
      {
        icon: '⚖️',
        title: 'AI Ethics & Principles',
        items: [
          'Ethical AI frameworks & guidelines',
          'Fairness & accountability principles',
          'Transparency & explainability'
        ]
      },
      {
        icon: '🔍',
        title: 'Bias Detection & Mitigation',
        items: [
          'Identifying bias in AI systems',
          'Testing for fairness',
          'Implementing mitigation strategies'
        ]
      },
      {
        icon: '🔒',
        title: 'Security & Privacy',
        items: [
          'Data protection best practices',
          'Privacy-preserving AI techniques',
          'Security risk assessment'
        ]
      },
      {
        icon: '📋',
        title: 'Regulatory Compliance',
        items: [
          'GDPR & data protection laws',
          'EU AI Act requirements',
          'Industry-specific regulations'
        ]
      },
      {
        icon: '🏗️',
        title: 'Governance Frameworks',
        items: [
          'Implementing AI governance structures',
          'Policy development & documentation',
          'Audit & monitoring processes'
        ]
      },
      {
        icon: '✅',
        title: 'Best Practices & Standards',
        items: [
          'Industry standards compliance',
          'Responsible AI implementation',
          'Continuous improvement processes'
        ]
      }
    ]
  };

  return skillsMap[certification.slug] || skillsMap['generative-ai-practitioner'];
};

export async function generateStaticParams() {
  return certifications.map((cert) => ({
    slug: cert.slug,
  }));
}

export async function generateMetadata({ params }: CertificationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const certification = getCertificationBySlug(slug);
  
  if (!certification) {
    return {
      title: "Certification Not Found | Abir-AI"
    };
  }

  return {
    title: certification.metaTitle,
    description: certification.metaDescription,
    keywords: `${certification.title}, AI certification, ${certification.topics.join(', ')}`,
    openGraph: {
      title: certification.metaTitle,
      description: certification.metaDescription,
      type: "website",
    }
  };
}

export default async function CertificationPage({ params }: CertificationPageProps) {
  const { slug } = await params;
  const certification = getCertificationBySlug(slug);

  if (!certification) {
    notFound();
  }

  // Get related certifications (excluding current)
  const relatedCertifications = certifications
    .filter(cert => cert.id !== certification.id)
    .slice(0, 3);

  // Generate structured data for SEO
  const certificationSchema = generateCertificationSchema(certification);
  const breadcrumbSchema = generateBreadcrumbSchema(certification);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(certificationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      {/* Hero Section */}
      <section className={`relative py-20 md:py-28 bg-gradient-to-br ${certification.color}`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/80 mb-4">
            <Link href="/certifications" className="hover:text-white transition-colors">
              Certifications
            </Link>
            <span>/</span>
            <span>{certification.shortTitle}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-6xl">{certification.icon}</span>
                <span className="text-sm font-medium bg-white/20 px-4 py-2 rounded-full">
                  {certification.level.charAt(0).toUpperCase() + certification.level.slice(1)}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {certification.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-6">
                {certification.tagline}
              </p>
              <p className="text-lg text-white/80 mb-8">
                {certification.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {certification.slug === 'generative-ai-practitioner' ? (
                  <Link 
                    href="/learn/generative-ai-practitioner"
                    className="px-8 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors text-center"
                  >
                    Start Learning Free
                  </Link>
                ) : certification.slug === 'ai-productivity-github-copilot' ? (
                  <Link 
                    href="/learn/ai-productivity-github-copilot"
                    className="px-8 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors text-center"
                  >
                    Start Learning Free
                  </Link>
                ) : certification.slug === 'generative-ai-business-operations' ? (
                  <Link 
                    href="/learn/generative-ai-business-operations"
                    className="px-8 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors text-center"
                  >
                    Start Learning Free
                  </Link>
                ) : (
                  <button className="px-8 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors">
                    Coming Soon
                  </button>
                )}
                <button className="px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors">
                  View Certification Exam
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Course Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🆓</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Learning Content</div>
                    <div className="text-gray-600 dark:text-gray-300">100% Free</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Duration</div>
                    <div className="text-gray-600 dark:text-gray-300">{certification.duration}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Level</div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {certification.level.charAt(0).toUpperCase() + certification.level.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Perfect For</div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {certification.audience.join(', ')}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Optional Certification</div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {certification.slug === 'generative-ai-practitioner' ? '49€' : '79€'} exam fee
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Who Is This Certification For?
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            This certification is designed for anyone looking to understand and apply generative AI in professional settings—no prior AI experience required.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Students</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Build in-demand AI skills to stand out in the job market and prepare for the AI-driven future.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Professionals</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Upskill with generative AI to increase productivity and stay competitive in your field.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🔄</div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Career Switchers</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Transition into AI roles with practical skills that employers value across industries.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">👨‍💻</div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Freelancers</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Offer AI-powered services to clients and differentiate yourself in a competitive market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills You Will Gain */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Skills You Will Gain
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Master practical, real-world skills that are immediately applicable in professional environments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getSkillsForCertification(certification).map((skill, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {skill.title}
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  {skill.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Comprehensive Curriculum
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Access comprehensive content at no cost. Study at your own pace with practical exercises and real-world projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certification.topics.map((topic, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-4 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${certification.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {topic}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Why Learn with Abir-AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certification.benefits.map((benefit, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
              >
                <div className="text-4xl mb-4">
                  {idx === 0 ? '✅' : idx === 1 ? '🚀' : idx === 2 ? '💼' : idx === 3 ? '👥' : '🎯'}
                </div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Assessment */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Flexible Certification Path
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Choose the assessment approach that best fits your learning style and career goals. Both paths lead to the same industry-recognized certification.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Guided Path */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Guided Assessment</h3>
                <span className="text-4xl">📝</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Take a comprehensive exam that tests your knowledge across all course topics.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div className="text-gray-700 dark:text-gray-300">
                    <strong>50 multiple-choice questions</strong><br/>
                    <span className="text-sm">Covering AI fundamentals, prompting, ethics, and practical application</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div className="text-gray-700 dark:text-gray-300">
                    <strong>90-minute time limit</strong><br/>
                    <span className="text-sm">Take the exam when you feel ready</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div className="text-gray-700 dark:text-gray-300">
                    <strong>70% passing score</strong><br/>
                    <span className="text-sm">Instant results with detailed feedback</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div className="text-gray-700 dark:text-gray-300">
                    <strong>One free retake</strong><br/>
                    <span className="text-sm">If you don't pass on your first attempt</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">49€</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">One-time exam fee</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                <strong>Best for:</strong> Learners who prefer structured assessments
              </p>
            </div>

            {/* Real-World Path */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 border-2 border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Project-Based Assessment</h3>
                <span className="text-4xl">🚀</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Demonstrate your skills by building and submitting a real-world AI project.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div className="text-gray-700 dark:text-gray-300">
                    <strong>Complete a capstone project</strong><br/>
                    <span className="text-sm">Apply AI to solve a problem in your domain</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div className="text-gray-700 dark:text-gray-300">
                    <strong>Choose your own topic</strong><br/>
                    <span className="text-sm">Work on something relevant to your career goals</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div className="text-gray-700 dark:text-gray-300">
                    <strong>Expert review & feedback</strong><br/>
                    <span className="text-sm">Receive detailed feedback from AI practitioners</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div className="text-gray-700 dark:text-gray-300">
                    <strong>Portfolio-ready work</strong><br/>
                    <span className="text-sm">Showcase your project to potential employers</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">49€</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">One-time assessment fee</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                <strong>Best for:</strong> Practitioners who prefer hands-on demonstrations
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Not sure which path to choose? You can decide after completing the free course materials.
            </p>
          </div>
        </div>
      </section>

      {/* Certification Outcome */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Your Certification, Your Success
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Upon successful completion, you'll receive an industry-recognized credential that demonstrates your practical AI expertise.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Official Certificate
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Digital certificate with unique verification code, perfect for LinkedIn and your resume.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Shareable Credential
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Add your certification to LinkedIn, email signatures, and professional profiles instantly.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-lg">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Career Advancement
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stand out to employers seeking AI-skilled professionals in the growing AI job market.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-12 max-w-4xl mx-auto shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🏆</div>
                    <div className="text-sm font-semibold">Abir-AI</div>
                    <div className="text-xs">Certified</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  What You'll Receive
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Downloadable PDF certificate</strong> with your name and achievement date</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Unique verification code</strong> that employers can verify online</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>LinkedIn integration</strong> for easy profile updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Access to exclusive alumni network</strong> and career resources</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Digital badge</strong> for email signatures and social media</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12">
            Everything you need to know about the Generative AI Practitioner certification
          </p>
          
          <div className="space-y-6">
            <details className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>What is a Generative AI Practitioner?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                A Generative AI Practitioner is a professional who understands and applies generative AI technologies like ChatGPT, Claude, and other LLM-based tools to solve real-world problems, enhance productivity, and drive innovation across various industries. They bridge the gap between AI technology and practical business applications.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Do I need any prior AI experience?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                No! This course is designed for complete beginners. We start with the fundamentals and gradually build to more advanced concepts. All you need is basic computer literacy and willingness to learn.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>How long does it take to complete the certification?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Most students complete the certification in 1-4 weeks, studying 5-10 hours per week. Since the course is self-paced, you can go faster or slower based on your schedule and learning preferences. You have lifetime access to all materials.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Is the certification recognized by employers?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Yes! The Abir-AI Generative AI Practitioner certification is designed to meet industry standards and demonstrates practical skills that employers value. Many of our graduates have successfully used this certification to advance their careers or transition into AI-related roles.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>What's the difference between the free course and the certification?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                All learning materials are completely free—you can access videos, exercises, and projects at no cost. The 49€ fee is only for the optional certification exam or project assessment. If you just want to learn, everything is free. If you want the official credential, there's a small exam fee.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>What if I fail the exam?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Don't worry! Every exam registration includes one free retake. If you don't pass on your first attempt, you'll receive detailed feedback on areas to improve and can retake the exam at no additional cost.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Can I learn on mobile devices?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Absolutely! Our platform is fully responsive and works on smartphones, tablets, and computers. You can learn on the go, during your commute, or wherever suits you best.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Do I need to know how to code?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                No coding experience is required! While some modules touch on AI-assisted development tools like GitHub Copilot, the core curriculum focuses on understanding and using generative AI through prompting and practical application, not programming.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>What career opportunities are available after certification?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Certified practitioners can pursue roles such as AI Practitioner, Prompt Engineer, AI Solutions Consultant, AI Product Manager, and AI-Enhanced positions across various industries. Entry-level salaries typically range from $65,000-$85,000, with experienced practitioners earning $90,000-$130,000+.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 group">
              <summary className="font-semibold text-lg text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Is there a community or support available?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Yes! All enrolled students get access to our active community forum, weekly Q&A sessions, and peer learning groups. You'll also have access to an exclusive alumni network after certification for continued learning and career support.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section - Early Access */}
      <section className={`py-20 bg-gradient-to-r ${certification.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium mb-6">
            ✨ Limited Early Access
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Master Generative AI?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-4">
            Start learning for free today. No credit card required.
          </p>
          <p className="text-lg text-white/80 mb-10">
            Join thousands of students, professionals, and career switchers who are transforming their careers with AI skills.
          </p>
          
          <div className="bg-white/95 backdrop-blur dark:bg-gray-800/95 rounded-2xl p-8 md:p-10 max-w-2xl mx-auto shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Get Started in 3 Easy Steps
            </h3>
            
            <div className="space-y-5 mb-8 text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Create Your Free Account</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Sign up in 30 seconds—no payment required</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Access All Learning Materials</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Start learning immediately with lifetime access</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Get Certified (Optional)</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Take the exam for 49€ when you're ready</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {certification.slug === 'generative-ai-practitioner' ? (
                <Link 
                  href="/learn/generative-ai-practitioner"
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
                >
                  Start Learning Free →
                </Link>
              ) : certification.slug === 'ai-productivity-github-copilot' ? (
                <Link 
                  href="/learn/ai-productivity-github-copilot"
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
                >
                  Start Learning Free →
                </Link>
              ) : certification.slug === 'generative-ai-business-operations' ? (
                <Link 
                  href="/learn/generative-ai-business-operations"
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
                >
                  Start Learning Free →
                </Link>
              ) : (
                <>
                  <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                    Coming Soon
                  </button>
                  <button className="px-10 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold text-lg rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Notify Me When Available
                  </button>
                </>
              )}
            </div>
            
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              🔒 Your data is secure • 🆓 No credit card required • ⏰ Lifetime access
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">5,000+</div>
              <div className="text-white/80 text-sm md:text-base">Certified Practitioners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-white/80 text-sm md:text-base">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">87%</div>
              <div className="text-white/80 text-sm md:text-base">Career Advancement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Join Successful AI Practitioners
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12">
            Hear from students who transformed their careers with Abir-AI
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "This certification gave me the confidence to transition from marketing to an AI consultant role. The practical exercises were invaluable."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  SJ
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Sarah Johnson</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">AI Consultant</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "As a developer, this course helped me understand how to effectively integrate AI into my workflow. GitHub Copilot section was fantastic!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  MR
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Michael Rodriguez</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Full-Stack Developer</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "Perfect for beginners! I had zero AI knowledge and now I'm using AI tools daily to boost my productivity by 40%. Worth every minute."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold">
                  EK
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Emily Kim</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Product Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Certifications */}
      {relatedCertifications.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Explore More Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCertifications.map((cert) => (
                <Link
                  key={cert.id}
                  href={`/certifications/${cert.slug}`}
                  className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className={`bg-gradient-to-r ${cert.color} p-6 text-white`}>
                    <span className="text-4xl mb-3 block">{cert.icon}</span>
                    <h3 className="text-xl font-bold">{cert.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {cert.tagline}
                    </p>
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Learn More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
