# Adding a New Certification - Quick Guide

Follow these steps to add a new certification to Abir-AI in under 5 minutes.

## Step 1: Add Certification Data

Edit `/data/certifications.ts` and add your new certification to the `certifications` array:

```typescript
{
  id: '5', // Increment from last certification
  title: 'Your Certification Title',
  slug: 'your-certification-slug', // lowercase-with-hyphens
  shortTitle: 'Short Title',
  tagline: 'Learn [Topic] Free — Get Certified for [Price]€',
  description: 'Free access to comprehensive training on [topic]...',
  audience: ['Target Audience 1', 'Target Audience 2'],
  level: 'beginner', // or 'intermediate' or 'advanced'
  duration: CERTIFICATION_CONFIG.durations.medium, // or .short, .long, or custom
  price: getPriceForLevel('beginner'), // Auto-set price based on level
  topics: [
    'Topic 1',
    'Topic 2',
    'Topic 3',
    // Add 4-8 topics
  ],
  benefits: [
    COMMON_BENEFITS.free,
    COMMON_BENEFITS.selfPaced,
    COMMON_BENEFITS.handson,
    COMMON_BENEFITS.recognized
    // Or add custom benefits
  ],
  icon: '🎯', // Choose an emoji icon
  color: 'from-blue-500 to-cyan-500', // Tailwind gradient
  featured: true, // Show on homepage
  order: 5, // Display order for featured certs
  metaTitle: 'Free [Topic] Course + Certification ([Price]€) | Abir-AI',
  metaDescription: CERTIFICATION_CONFIG.metaDescriptionTemplate(
    'Your Certification Title',
    'beginner', 
    getPriceForLevel('beginner')
  )
}
```

## Step 2: Test Locally

```bash
npm run dev
```

Visit:
- `/certifications` - Check your certification appears in the grid
- `/certifications/your-certification-slug` - View the full page

## Step 3: Validate & Build

```bash
npm run build
```

The build process will automatically:
- ✅ Validate your certification data
- ✅ Generate the static page
- ✅ Add to sitemap
- ✅ Create JSON-LD schema

## Step 4: Commit & Deploy

```bash
git add .
git commit -m "Add [Your Certification] certification"
git push
```

---

## Configuration Options

### Pricing Tiers (Auto-Set)
```typescript
// Defined in /config/certifications.ts
pricing: {
  beginner: 49,      // Use: getPriceForLevel('beginner')
  intermediate: 79,  // Use: getPriceForLevel('intermediate')
  advanced: 99       // Use: getPriceForLevel('advanced')
}
```

### Duration Presets
```typescript
CERTIFICATION_CONFIG.durations.short  // '1–2 weeks, self-paced'
CERTIFICATION_CONFIG.durations.medium // '2–4 weeks, self-paced'
CERTIFICATION_CONFIG.durations.long   // '4–8 weeks, self-paced'
```

### Common Benefits (Reusable)
```typescript
COMMON_BENEFITS.free       // '100% free learning content'
COMMON_BENEFITS.selfPaced  // 'Study at your own pace, anytime'
COMMON_BENEFITS.handson    // 'Hands-on projects with real AI tools'
COMMON_BENEFITS.recognized // 'Industry-recognized credential upon passing'
COMMON_BENEFITS.lifetime   // 'Lifetime access to all materials'
COMMON_BENEFITS.updates    // 'Free updates and new content'
COMMON_BENEFITS.community  // 'Access to learner community'
COMMON_BENEFITS.support    // 'Instructor support during learning'
```

### Level Configuration
```typescript
level: 'beginner'      // Green badge, 49€
level: 'intermediate'  // Blue badge, 79€
level: 'advanced'      // Purple badge, 99€
```

---

## Troubleshooting

### Validation Warnings
Run `npm run dev` and check console for validation errors:
- Title must be ≥5 characters
- Slug must be lowercase-with-hyphens
- At least 3 topics required
- At least 1 target audience required
- Price must be 0-999

### Page Not Generating
Ensure:
- `slug` is unique (no duplicates)
- `featured: true` to show on homepage
- `order` number is unique for proper sorting

### SEO Issues
- Use auto-generated meta description template
- Keep `metaTitle` under 60 characters
- Keep `metaDescription` under 155 characters

---

## Helper Functions Available

```typescript
// Get certification by slug
getCertificationBySlug('your-slug')

// Get featured certifications (homepage)
getFeaturedCertifications()

// Get certifications by level
getCertificationsByLevel('beginner')

// Get certification by ID
getCertificationById('5')

// Get all unique topics
getAllTopics()

// Get total count
getCertificationsCount()

// Get formatted price
getCertificationPrice(cert) // Returns "49€"

// Validate certification data
validateCertification(cert) // Returns errors array
```

---

## Best Practices

✅ **DO:**
- Use `getPriceForLevel()` for consistent pricing
- Reuse `COMMON_BENEFITS` instead of duplicating text
- Use emojis for icons (visual consistency)
- Keep taglines in format: "Learn X Free — Get Certified for Y€"
- Add 4-8 specific topics
- Test locally before pushing

❌ **DON'T:**
- Hardcode prices (pricing tiers may change)
- Duplicate benefit text (use constants)
- Use overly long titles (max 60 chars for SEO)
- Skip validation (run build to check)
- Forget to set `order` for featured certs

---

## Example: Complete New Certification

```typescript
{
  id: '5',
  title: 'AI-Powered Data Analysis',
  slug: 'ai-powered-data-analysis',
  shortTitle: 'AI Data Analysis',
  tagline: 'Learn AI Data Analysis Free — Get Certified for 79€',
  description: 'Free access to comprehensive training on using AI for data analysis, visualization, and insights. Master Python, pandas, and AI-powered analytics tools at your own pace. Optional certification exam (79€) recognized by data teams worldwide.',
  audience: ['Data Analysts', 'Business Analysts', 'Data Scientists', 'Researchers'],
  level: 'intermediate',
  duration: CERTIFICATION_CONFIG.durations.medium,
  price: getPriceForLevel('intermediate'),
  topics: [
    'AI-Powered Data Cleaning',
    'Automated Analysis with LLMs',
    'Data Visualization with AI',
    'Predictive Analytics',
    'Statistical Analysis',
    'Real-World Case Studies'
  ],
  benefits: [
    COMMON_BENEFITS.free,
    COMMON_BENEFITS.selfPaced,
    COMMON_BENEFITS.handson,
    COMMON_BENEFITS.recognized
  ],
  icon: '📊',
  color: 'from-purple-500 to-pink-500',
  featured: true,
  order: 5,
  metaTitle: 'Free AI Data Analysis Course + Certification (79€) | Abir-AI',
  metaDescription: CERTIFICATION_CONFIG.metaDescriptionTemplate(
    'AI Data Analysis',
    'intermediate',
    getPriceForLevel('intermediate')
  )
}
```

That's it! Your certification is now live and SEO-optimized. 🚀
