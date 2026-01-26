/**
 * Global site configuration
 * Centralized constants for URLs, branding, and site-wide settings
 */

export const SITE_CONFIG = {
  name: 'Abir-AI',
  url: 'https://abir-ai.com',
  description: 'Free AI Education Platform with Optional Professional Certifications',
  
  // Social & External Links
  social: {
    github: 'https://github.com/daldoulmhamed/Abir-AI',
    twitter: 'https://twitter.com/abir-ai',
    linkedin: 'https://linkedin.com/company/abir-ai'
  },

  // Paths
  paths: {
    certifications: '/certifications',
    learn: '/learn',
    tutorials: '/tutorials',
    news: '/news',
    profiles: '/profiles'
  },

  // SEO defaults
  seo: {
    defaultRating: {
      value: '4.8',
      count: '245'
    }
  }
} as const;

/**
 * Generate absolute URL for any path
 */
export function getAbsoluteUrl(path: string): string {
  return `${SITE_CONFIG.url}${path}`;
}

/**
 * Generate certification URL
 */
export function getCertificationUrl(slug: string): string {
  return getAbsoluteUrl(`${SITE_CONFIG.paths.certifications}/${slug}`);
}
