import Link from "next/link";
import { certifications } from "@/data/certifications";
import CertificationCard from "./CertificationCard";

interface RecommendedCertificationsProps {
  title?: string;
  description?: string;
  excludeIds?: string[];
  limit?: number;
  variant?: 'default' | 'compact';
}

export default function RecommendedCertifications({
  title = "Get Certified in AI",
  description = "Take your skills to the next level with industry-recognized certifications.",
  excludeIds = [],
  limit = 3,
  variant = 'compact'
}: RecommendedCertificationsProps) {
  
  const recommended = certifications
    .filter(cert => !excludeIds.includes(cert.id) && cert.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, limit);

  if (recommended.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className={`grid grid-cols-1 ${
          recommended.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' :
          recommended.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
          'md:grid-cols-3'
        } gap-8`}>
          {recommended.map((cert) => (
            <CertificationCard 
              key={cert.id} 
              certification={cert} 
              variant={variant}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/certifications"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            View All Certifications
          </Link>
        </div>
      </div>
    </section>
  );
}
