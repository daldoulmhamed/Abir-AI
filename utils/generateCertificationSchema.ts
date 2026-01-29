import type { Certification } from "@/data/certifications";
import { SITE_CONFIG, getCertificationUrl } from "@/config/site";

interface CourseSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  provider: {
    "@type": string;
    name: string;
    sameAs: string;
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    ratingCount: string;
  };
  offers?: {
    "@type": string;
    category: string;
    priceCurrency: string;
    price: string;
  };
  hasCourseInstance?: {
    "@type": string;
    courseMode: string;
    courseWorkload: string;
  };
  educationalLevel?: string;
  about?: string[];
  teaches?: string[];
}

const PROVIDER = {
  "@type": "Organization" as const,
  name: SITE_CONFIG.name,
  sameAs: SITE_CONFIG.url
};

const DEFAULT_RATING = {
  "@type": "AggregateRating" as const,
  ratingValue: SITE_CONFIG.seo.defaultRating.value,
  ratingCount: SITE_CONFIG.seo.defaultRating.count
};

/**
 * Generate JSON-LD schema for a certification page
 */
export function generateCertificationSchema(certification: Certification): CourseSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: certification.title,
    description: certification.description,
    provider: PROVIDER,
    aggregateRating: DEFAULT_RATING,
    offers: {
      "@type": "Offer",
      category: "Free learning, optional paid certification",
      priceCurrency: "EUR",
      price: certification.price.toString()
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: certification.duration
    },
    educationalLevel: certification.level,
    about: certification.topics.slice(0, 5),
    teaches: certification.topics
  };
}

/**
 * Generate JSON-LD schema for the certifications listing page
 */
export function generateCertificationsListSchema(certifications: Certification[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: certifications.map((cert, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: cert.title,
        description: cert.tagline,
        url: getCertificationUrl(cert.slug),
        provider: PROVIDER
      }
    }))
  };
}

/**
 * Generate breadcrumb schema for certification pages
 */
export function generateBreadcrumbSchema(certification: Certification) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Certifications",
        item: `${SITE_CONFIG.url}${SITE_CONFIG.paths.certifications}`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: certification.title,
        item: getCertificationUrl(certification.slug)
      }
    ]
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema() {
  const faqs = [
    {
      question: "Is the learning content really free?",
      answer: "Yes! All course materials, videos, exercises, and projects are 100% free. You only pay if you want to take the optional certification exam (49€–99€)."
    },
    {
      question: "Do I need to get certified?",
      answer: "No, certification is optional. You can learn everything for free and use the knowledge immediately. Get certified only when you want to validate your skills professionally."
    },
    {
      question: "How long does it take to complete?",
      answer: "It's self-paced! Complete a course in 1–8 weeks depending on your schedule. Study full-time or a few hours per week—there are no deadlines."
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}
