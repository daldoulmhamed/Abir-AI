/**
 * Certification Data Template
 * Copy this template when adding a new certification
 */

import { CERTIFICATION_CONFIG, getPriceForLevel } from '@/config/certifications';

// Get common benefits for reuse
const { commonBenefits: COMMON_BENEFITS } = CERTIFICATION_CONFIG;

// TEMPLATE - Copy and customize this object
export const NEW_CERTIFICATION_TEMPLATE = {
  // REQUIRED FIELDS
  id: 'X', // Increment from last certification (e.g., '5', '6', '7')
  
  title: '[Full Certification Title]', // e.g., 'AI-Powered Data Analysis'
  
  slug: '[lowercase-with-hyphens]', // e.g., 'ai-powered-data-analysis'
  
  shortTitle: '[Short Title]', // e.g., 'AI Data Analysis' (for cards/navigation)
  
  tagline: 'Learn [Topic] Free — Get Certified for [X]€',
  // Follow format: "Learn X Free — Get Certified for Y€"
  
  description: `Free access to comprehensive training on [topic description]. 
  Master [tools/concepts] at your own pace. 
  Optional certification exam (X€) recognized across industries.`,
  // 2-3 sentences, emphasize FREE learning + optional paid cert
  
  audience: [
    '[Target Role 1]', // e.g., 'Data Analysts'
    '[Target Role 2]', // e.g., 'Business Analysts'
    '[Target Role 3]', // e.g., 'Data Scientists'
    // Add 3-5 target audiences
  ],
  
  level: 'beginner', // 'beginner' | 'intermediate' | 'advanced'
  // beginner = 49€, intermediate = 79€, advanced = 99€
  
  duration: CERTIFICATION_CONFIG.durations.medium,
  // Options: .short (1-2 weeks) | .medium (2-4 weeks) | .long (4-8 weeks)
  // Or custom string: '3–6 weeks, self-paced'
  
  price: getPriceForLevel('beginner'),
  // Auto-set based on level. Options: 'beginner' | 'intermediate' | 'advanced'
  
  topics: [
    '[Topic 1]',
    '[Topic 2]',
    '[Topic 3]',
    '[Topic 4]',
    '[Topic 5]',
    '[Topic 6]'
    // Add 4-8 specific topics covered in the certification
  ],
  
  benefits: [
    COMMON_BENEFITS.free,       // '100% free learning content'
    COMMON_BENEFITS.selfPaced,  // 'Study at your own pace, anytime'
    COMMON_BENEFITS.handson,    // 'Hands-on projects with real AI tools'
    COMMON_BENEFITS.recognized  // 'Industry-recognized credential upon passing'
    // Optional: Add custom benefits or use more from COMMON_BENEFITS
  ],
  
  // VISUAL STYLING
  icon: '🎯', // Choose an emoji that represents your certification
  
  color: 'from-blue-500 to-cyan-500',
  // Tailwind gradient classes. Examples:
  // 'from-blue-500 to-cyan-500'    (blue theme)
  // 'from-purple-500 to-pink-500'  (purple theme)
  // 'from-green-500 to-emerald-500' (green theme)
  // 'from-orange-500 to-red-500'   (orange theme)
  
  // HOMEPAGE DISPLAY
  featured: true, // Show on homepage? true/false
  
  order: 5, // Display order (1-based) for featured certifications on homepage
  
  // SEO METADATA
  metaTitle: 'Free [Topic] Course + Certification ([Price]€) | Abir-AI',
  // Keep under 60 characters for optimal SEO
  
  metaDescription: CERTIFICATION_CONFIG.metaDescriptionTemplate(
    '[Certification Title]',
    'beginner', // 'beginner' | 'intermediate' | 'advanced'
    getPriceForLevel('beginner')
  )
  // Or write custom: 'Free [topic] course. Self-paced...' (max 155 chars)
} as const;

// EXAMPLES OF COMMON CONFIGURATIONS

// Example 1: Beginner Certification (49€)
export const BEGINNER_EXAMPLE = {
  id: '5',
  title: 'AI Prompt Engineering Fundamentals',
  slug: 'ai-prompt-engineering-fundamentals',
  shortTitle: 'Prompt Engineering',
  tagline: 'Learn Prompt Engineering Free — Get Certified for 49€',
  level: 'beginner',
  price: getPriceForLevel('beginner'), // 49€
  duration: CERTIFICATION_CONFIG.durations.short,
  // ... rest of fields
};

// Example 2: Intermediate Certification (79€)
export const INTERMEDIATE_EXAMPLE = {
  id: '6',
  title: 'AI-Powered Business Intelligence',
  slug: 'ai-powered-business-intelligence',
  shortTitle: 'AI Business Intelligence',
  tagline: 'Learn AI Business Intelligence Free — Get Certified for 79€',
  level: 'intermediate',
  price: getPriceForLevel('intermediate'), // 79€
  duration: CERTIFICATION_CONFIG.durations.medium,
  // ... rest of fields
};

// Example 3: Advanced Certification (99€)
export const ADVANCED_EXAMPLE = {
  id: '7',
  title: 'Enterprise AI Architecture & Deployment',
  slug: 'enterprise-ai-architecture-deployment',
  shortTitle: 'Enterprise AI',
  tagline: 'Learn Enterprise AI Free — Get Certified for 99€',
  level: 'advanced',
  price: getPriceForLevel('advanced'), // 99€
  duration: CERTIFICATION_CONFIG.durations.long,
  // ... rest of fields
};

// VALIDATION CHECKLIST
// Before adding your certification, ensure:
// ✅ Title is 5+ characters and descriptive
// ✅ Slug is lowercase with hyphens only (no spaces, special chars)
// ✅ Slug is unique (check existing certifications)
// ✅ At least 3 topics listed
// ✅ At least 1 target audience listed
// ✅ Price matches level (use getPriceForLevel)
// ✅ Icon is a single emoji
// ✅ Color uses valid Tailwind gradient classes
// ✅ Order number is unique (if featured)
// ✅ metaTitle is under 60 characters
// ✅ metaDescription is under 155 characters

// RUN THIS TO VALIDATE:
// npm run build
// Check console for validation warnings
