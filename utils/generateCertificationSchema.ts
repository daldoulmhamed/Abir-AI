import type { Certification } from "@/data/certifications";

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

/**
 * Generate JSON-LD schema for a certification page
 * This helps search engines understand the content better
 */
export function generateCertificationSchema(certification: Certification): CourseSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: certification.title,
    description: certification.description,
    provider: {
      "@type": "Organization",
      name: "Abir-AI",
      sameAs: "https://abir-ai.com"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "245"
    },
    offers: {
      "@type": "Offer",
      category: "Paid",
      priceCurrency: "EUR",
      price: "299"
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
        url: `https://abir-ai.com/certifications/${cert.slug}`,
        provider: {
          "@type": "Organization",
          name: "Abir-AI"
        }
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
        item: "https://abir-ai.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Certifications",
        item: "https://abir-ai.com/certifications"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: certification.title,
        item: `https://abir-ai.com/certifications/${certification.slug}`
      }
    ]
  };
}

/**
 * Generate FAQ schema (can be added to certification pages)
 */
export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are these certifications recognized by employers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our certifications are designed in collaboration with industry experts and follow best practices recognized by leading tech companies. Many of our graduates have successfully used these certifications to advance their careers."
        }
      },
      {
        "@type": "Question",
        name: "Do I need prior AI experience?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on the certification. The Generative AI Practitioner is beginner-friendly, while others require some familiarity with AI concepts. Check the level indicator on each certification for details."
        }
      },
      {
        "@type": "Question",
        name: "Can I access the course materials after completion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely! Once enrolled, you get lifetime access to all course materials, including future updates and additions."
        }
      }
    ]
  };
}
