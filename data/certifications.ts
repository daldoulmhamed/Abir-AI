export interface Certification {
  id: string;
  title: string;
  slug: string;
  shortTitle: string;
  tagline: string;
  description: string;
  audience: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  topics: string[];
  benefits: string[];
  icon: string;
  color: string;
  featured: boolean;
  order: number;
  metaTitle: string;
  metaDescription: string;
}

export const certifications: Certification[] = [
  {
    id: '1',
    title: 'Generative AI Practitioner',
    slug: 'generative-ai-practitioner',
    shortTitle: 'Gen AI Practitioner',
    tagline: 'Master Generative AI for Real-World Applications',
    description: 'Learn to leverage generative AI tools and techniques for practical business applications. Master prompting, understand AI capabilities, and apply generative AI to solve real-world challenges.',
    audience: ['Students', 'Junior Professionals', 'Freelancers', 'Employees'],
    level: 'beginner',
    duration: '6-8 weeks',
    topics: [
      'Generative AI Fundamentals',
      'Advanced Prompting Techniques',
      'Business Use Cases',
      'Real-World AI Tools (ChatGPT, Claude, etc.)',
      'AI Ethics & Limitations',
      'Practical Project Implementation'
    ],
    benefits: [
      'Industry-recognized certification',
      'Hands-on projects with real AI tools',
      'Job-ready skills for AI-powered roles',
      'Access to exclusive community',
      'Lifetime access to course materials'
    ],
    icon: '🥇',
    color: 'from-blue-500 to-cyan-500',
    featured: true,
    order: 1,
    metaTitle: 'Generative AI Practitioner Certification - Master Gen AI | Abir-AI',
    metaDescription: 'Get certified in Generative AI. Learn prompting, business use cases, and real-world AI tools. Perfect for students, juniors, and professionals. Start your AI career today.'
  },
  {
    id: '2',
    title: 'AI Productivity & GitHub Copilot',
    slug: 'ai-productivity-github-copilot',
    shortTitle: 'AI Productivity',
    tagline: 'Supercharge Your Workflow with AI-Powered Tools',
    description: 'Master GitHub Copilot and AI-powered productivity tools to 10x your development workflow. Learn how to collaborate effectively with AI in both technical and no-code environments.',
    audience: ['Developers', 'Product Managers', 'Tech Teams', 'No-Code Builders'],
    level: 'intermediate',
    duration: '4-6 weeks',
    topics: [
      'GitHub Copilot Mastery',
      'AI-Assisted Development',
      'Dev & No-Code Workflows',
      'Human + AI Collaboration',
      'Productivity Automation',
      'Code Quality & AI Review'
    ],
    benefits: [
      'Boost coding productivity by 40%+',
      'Master GitHub Copilot best practices',
      'Learn AI-powered workflow automation',
      'Certificate recognized by tech companies',
      'Real-world project portfolio'
    ],
    icon: '🥈',
    color: 'from-purple-500 to-pink-500',
    featured: true,
    order: 2,
    metaTitle: 'AI Productivity & GitHub Copilot Certification | Abir-AI',
    metaDescription: 'Master GitHub Copilot and AI productivity tools. Learn AI-assisted development, automation, and human-AI collaboration. Perfect for developers and tech teams.'
  },
  {
    id: '3',
    title: 'Generative AI for Business Operations',
    slug: 'generative-ai-business-operations',
    shortTitle: 'AI for Business',
    tagline: 'Transform Your Business with Strategic AI Implementation',
    description: 'Learn how to implement generative AI in business operations to drive ROI, optimize processes, and make data-driven decisions. Perfect for leaders who want to leverage AI strategically.',
    audience: ['Managers', 'Business Owners', 'Founders', 'Consultants', 'Operations Leaders'],
    level: 'intermediate',
    duration: '5-7 weeks',
    topics: [
      'AI Strategy & Planning',
      'Process Optimization with AI',
      'ROI & Business Case Development',
      'AI-Driven Decision Making',
      'Risk Management',
      'Change Management & Adoption'
    ],
    benefits: [
      'Strategic AI implementation framework',
      'ROI-focused business cases',
      'Risk mitigation strategies',
      'Executive-level certification',
      'Network with AI-forward leaders'
    ],
    icon: '🥉',
    color: 'from-orange-500 to-red-500',
    featured: true,
    order: 3,
    metaTitle: 'Generative AI for Business Operations Certification | Abir-AI',
    metaDescription: 'Learn to implement AI in business operations. Master AI strategy, ROI optimization, and decision-making. Perfect for managers, founders, and consultants.'
  },
  {
    id: '4',
    title: 'AI Governance & Responsible AI Foundations',
    slug: 'ai-governance-responsible-ai-foundations',
    shortTitle: 'Responsible AI',
    tagline: 'Build Ethical, Secure, and Compliant AI Systems',
    description: 'Understand the critical aspects of responsible AI implementation including bias mitigation, security, compliance, and ethical best practices. Essential knowledge for all AI practitioners.',
    audience: ['All Professional Profiles', 'Compliance Officers', 'Risk Managers', 'AI Practitioners', 'Business Leaders'],
    level: 'intermediate',
    duration: '4-5 weeks',
    topics: [
      'AI Ethics & Principles',
      'Bias Detection & Mitigation',
      'AI Security & Privacy',
      'Regulatory Compliance (GDPR, AI Act)',
      'Responsible AI Frameworks',
      'Best Practices & Standards'
    ],
    benefits: [
      'Essential knowledge for AI careers',
      'Compliance-focused certification',
      'Risk management expertise',
      'Industry best practices',
      'Recognized by major organizations'
    ],
    icon: '🟠',
    color: 'from-green-500 to-emerald-500',
    featured: true,
    order: 4,
    metaTitle: 'AI Governance & Responsible AI Foundations Certification | Abir-AI',
    metaDescription: 'Master responsible AI, governance, and compliance. Learn bias mitigation, security, and ethical best practices. Essential certification for all AI professionals.'
  }
];

export const getCertificationBySlug = (slug: string): Certification | undefined => {
  return certifications.find(cert => cert.slug === slug);
};

export const getFeaturedCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.featured).sort((a, b) => a.order - b.order);
};
