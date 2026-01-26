import { CERTIFICATION_CONFIG, getPriceForLevel, validateCertification } from '@/config/certifications';
import { getCertificationUrl } from '@/config/site';

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
  price: number;
  topics: string[];
  benefits: string[];
  icon: string;
  color: string;
  featured: boolean;
  order: number;
  metaTitle: string;
  metaDescription: string;
}

// Common benefits now imported from config/certifications.ts
const { commonBenefits: COMMON_BENEFITS } = CERTIFICATION_CONFIG;

export const certifications: Certification[] = [
  {
    id: '1',
    title: 'Generative AI Practitioner',
    slug: 'generative-ai-practitioner',
    shortTitle: 'Gen AI Practitioner',
    tagline: 'Learn Generative AI Free — Get Certified for Just 49€',
    description: 'Master the fundamentals of generative AI with our comprehensive, self-paced course. Learn practical prompting techniques, explore real-world applications, and get hands-on experience with leading tools like ChatGPT and Claude. Perfect for beginners—no prior AI experience required. Validate your expertise with our optional certification exam for just 49€.',
    audience: ['Students', 'Junior Professionals', 'Freelancers', 'Employees'],
    level: 'beginner',
    duration: '1–4 weeks, self-paced',
    price: 49,
    topics: [
      'Generative AI Fundamentals',
      'Advanced Prompting Techniques',
      'Business Use Cases',
      'Real-World AI Tools (ChatGPT, Claude, etc.)',
      'AI Ethics & Limitations',
      'Practical Project Implementation'
    ],
    benefits: [
      COMMON_BENEFITS.free,
      COMMON_BENEFITS.selfPaced,
      COMMON_BENEFITS.handson,
      'Optional certification exam for 49€',
      COMMON_BENEFITS.recognized
    ],
    icon: '🥇',
    color: 'from-blue-500 to-cyan-500',
    featured: true,
    order: 1,
    metaTitle: 'Free Generative AI Course + Optional Certification (49€) | Abir-AI',
    metaDescription: 'Learn Generative AI for free with self-paced courses covering ChatGPT, prompting, and AI tools. Get certified for just 49€. Perfect for beginners and career switchers.'
  },
  {
    id: '2',
    title: 'AI Productivity & GitHub Copilot',
    slug: 'ai-productivity-github-copilot',
    shortTitle: 'AI Productivity',
    tagline: 'Learn AI Productivity Free — Certify Your Skills for 79€',
    description: 'Supercharge your productivity with GitHub Copilot and AI-powered development tools. This comprehensive course covers AI-assisted coding, workflow automation, and collaboration strategies for both developers and no-code builders. Learn through practical, hands-on exercises tailored to your skill level. Optional professional certification available for 79€.',
    audience: ['Developers', 'Product Managers', 'Tech Teams', 'No-Code Builders'],
    level: 'intermediate',
    duration: '2–6 weeks, self-paced',
    price: 79,
    topics: [
      'GitHub Copilot Mastery',
      'AI-Assisted Development',
      'Dev & No-Code Workflows',
      'Human + AI Collaboration',
      'Productivity Automation',
      'Code Quality & AI Review'
    ],
    benefits: [
      COMMON_BENEFITS.free,
      'Learn GitHub Copilot best practices',
      'Flexible self-paced learning',
      'Optional certification for 79€',
      'Credential recognized by tech companies'
    ],
    icon: '🥈',
    color: 'from-purple-500 to-pink-500',
    featured: true,
    order: 2,
    metaTitle: 'Free GitHub Copilot Course + AI Productivity Certification (79€) | Abir-AI',
    metaDescription: 'Learn GitHub Copilot and AI productivity for free. Self-paced training for developers and tech teams. Optional certification exam for 79€. Start boosting your workflow today.'
  },
  {
    id: '3',
    title: 'Generative AI for Business Operations',
    slug: 'generative-ai-business-operations',
    shortTitle: 'AI for Business',
    tagline: 'Learn Business AI Strategy Free — Certify for 79€',
    description: 'Transform your business operations with strategic AI implementation. Learn how to develop AI strategies, calculate ROI, optimize processes, and manage organizational change. This course provides practical frameworks, real-world case studies, and actionable templates designed specifically for business leaders. Earn your professional certification for 79€ to demonstrate your expertise.',
    audience: ['Managers', 'Business Owners', 'Founders', 'Consultants', 'Operations Leaders'],
    level: 'intermediate',
    duration: '2–8 weeks, self-paced',
    price: 79,
    topics: [
      'AI Strategy & Planning',
      'Process Optimization with AI',
      'ROI & Business Case Development',
      'AI-Driven Decision Making',
      'Risk Management',
      'Change Management & Adoption'
    ],
    benefits: [
      COMMON_BENEFITS.free,
      'Real-world ROI frameworks and templates',
      'Learn at your own schedule',
      'Optional certification exam for 79€',
      'Executive-level professional credential'
    ],
    icon: '🥉',
    color: 'from-orange-500 to-red-500',
    featured: true,
    order: 3,
    metaTitle: 'Free AI for Business Course + Professional Certification (79€) | Abir-AI',
    metaDescription: 'Free training on AI strategy, ROI, and business operations. Self-paced learning for managers and founders. Optional certification for 79€. Transform your business with AI.'
  },
  {
    id: '4',
    title: 'AI Governance & Responsible AI Foundations',
    slug: 'ai-governance-responsible-ai-foundations',
    shortTitle: 'Responsible AI',
    tagline: 'Learn Responsible AI Free — Get Certified for 79€',
    description: 'Build a strong foundation in AI ethics, governance, and compliance. This essential course covers bias detection and mitigation, privacy protection, security best practices, and regulatory frameworks including GDPR and the EU AI Act. Learn how to implement responsible AI practices that protect users and build trust. Industry-recognized certification available for 79€.',
    audience: ['All Professional Profiles', 'Compliance Officers', 'Risk Managers', 'AI Practitioners', 'Business Leaders'],
    level: 'intermediate',
    price: 79,
    topics: [
      'AI Ethics & Principles',
      'Bias Detection & Mitigation',
      'AI Security & Privacy',
      'Regulatory Compliance (GDPR, AI Act)',
      'Responsible AI Frameworks',
      'Best Practices & Standards'
    ],
    benefits: [
      COMMON_BENEFITS.free,
      COMMON_BENEFITS.selfPaced,
      COMMON_BENEFITS.handson,
      COMMON_BENEFITS.recognized
    ],
    duration: '3 weeks',
    icon: '🟠',
    color: 'from-green-500 to-emerald-500',
    featured: true,
    order: 4,
    metaTitle: 'Free Responsible AI Course + Governance Certification (79€) | Abir-AI',
    metaDescription: 'Learn AI ethics, compliance, and governance for free. Self-paced training on bias mitigation and GDPR. Optional certification for 79€. Essential for all AI professionals.'
  }
];

export const getCertificationBySlug = (slug: string): Certification | undefined => {
  return certifications.find(cert => cert.slug === slug);
};

export const getFeaturedCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.featured).sort((a, b) => a.order - b.order);
};

export const getCertificationPrice = (cert: Certification): string => {
  return `${cert.price}€`;
};

/**
 * Get all certifications by level
 */
export const getCertificationsByLevel = (level: Certification['level']): Certification[] => {
  return certifications.filter(cert => cert.level === level);
};

/**
 * Get certification by ID
 */
export const getCertificationById = (id: string): Certification | undefined => {
  return certifications.find(cert => cert.id === id);
};

/**
 * Get all unique topics across certifications
 */
export const getAllTopics = (): string[] => {
  const topics = new Set<string>();
  certifications.forEach(cert => cert.topics.forEach(topic => topics.add(topic)));
  return Array.from(topics).sort();
};

/**
 * Get certifications count
 */
export const getCertificationsCount = (): number => certifications.length;

/**
 * Validate all certifications on build
 */
if (process.env.NODE_ENV === 'development') {
  certifications.forEach(cert => {
    const errors = validateCertification(cert);
    if (errors.length > 0) {
      console.warn(`⚠️  Validation errors in certification "${cert.title}":`, errors);
    }
  });
}
