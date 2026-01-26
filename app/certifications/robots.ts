import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration for the certifications section
 * Ensures all certification pages are crawlable
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://abir-ai.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/certifications/',
        disallow: [],
      },
      {
        userAgent: 'Googlebot',
        allow: '/certifications/',
        crawlDelay: 0,
      },
    ],
    sitemap: [
      `${baseUrl}/certifications/sitemap.xml`,
      `${baseUrl}/sitemap.xml`,
    ],
  };
}
