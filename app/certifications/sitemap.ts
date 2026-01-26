import { MetadataRoute } from 'next';
import { certifications } from '@/data/certifications';

/**
 * Generate sitemap entries for all certification pages
 * This helps search engines discover and index certification pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abir-ai.com';
  
  // Main certifications page
  const mainPage = {
    url: `${baseUrl}/certifications`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  };

  // Individual certification pages
  const certificationPages = certifications.map((cert) => ({
    url: `${baseUrl}/certifications/${cert.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [mainPage, ...certificationPages];
}
