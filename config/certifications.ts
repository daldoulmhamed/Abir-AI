/**
 * Certification-specific configuration
 * Pricing tiers, common content, and validation rules
 */

export const CERTIFICATION_CONFIG = {
  // Pricing tiers (in EUR)
  pricing: {
    beginner: 49,
    intermediate: 79,
    advanced: 99
  },

  // Difficulty levels with metadata
  levels: {
    beginner: {
      label: 'Beginner',
      description: 'No prior AI experience required',
      color: 'green'
    },
    intermediate: {
      label: 'Intermediate',
      description: 'Basic AI familiarity recommended',
      color: 'blue'
    },
    advanced: {
      label: 'Advanced',
      description: 'Requires solid AI foundation',
      color: 'purple'
    }
  },

  // Common benefits (DRY principle)
  commonBenefits: {
    free: '100% free learning content',
    selfPaced: 'Study at your own pace, anytime',
    handson: 'Hands-on projects with real AI tools',
    recognized: 'Industry-recognized credential upon passing',
    lifetime: 'Lifetime access to all materials',
    updates: 'Free updates and new content',
    community: 'Access to learner community',
    support: 'Instructor support during learning'
  },

  // Duration presets
  durations: {
    short: '1–2 weeks, self-paced',
    medium: '2–4 weeks, self-paced',
    long: '4–8 weeks, self-paced'
  },

  // Default meta description template
  metaDescriptionTemplate: (title: string, level: string, price: number) =>
    `Free ${level} ${title} course. Self-paced learning with hands-on projects. Optional professional certification for ${price}€. Start learning AI today.`
} as const;

/**
 * Get price for a certification level
 */
export function getPriceForLevel(level: keyof typeof CERTIFICATION_CONFIG.levels): number {
  return CERTIFICATION_CONFIG.pricing[level];
}

/**
 * Validate certification data
 */
export function validateCertification(cert: any): string[] {
  const errors: string[] = [];

  if (!cert.title || cert.title.length < 5) {
    errors.push('Title must be at least 5 characters');
  }

  if (!cert.slug || !/^[a-z0-9-]+$/.test(cert.slug)) {
    errors.push('Slug must be lowercase alphanumeric with hyphens');
  }

  if (!cert.topics || cert.topics.length < 3) {
    errors.push('At least 3 topics are required');
  }

  if (!cert.audience || cert.audience.length < 1) {
    errors.push('At least 1 target audience is required');
  }

  if (cert.price && (cert.price < 0 || cert.price > 999)) {
    errors.push('Price must be between 0 and 999');
  }

  return errors;
}
