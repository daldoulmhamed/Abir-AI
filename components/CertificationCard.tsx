import Link from "next/link";
import type { Certification } from "@/data/certifications";

interface CertificationCardProps {
  certification: Certification;
  variant?: 'default' | 'compact';
}

export default function CertificationCard({ 
  certification, 
  variant = 'default' 
}: CertificationCardProps) {
  
  if (variant === 'compact') {
    return (
      <Link
        href={`/certifications/${certification.slug}`}
        className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className={`bg-gradient-to-r ${certification.color} p-6 text-white`}>
          <span className="text-4xl mb-3 block">{certification.icon}</span>
          <h3 className="text-xl font-bold">{certification.title}</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {certification.tagline}
          </p>
          <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-1 transition-transform inline-block">
            Learn More →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/certifications/${certification.slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${certification.color} p-6 text-white`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-4xl">{certification.icon}</span>
          <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            {certification.level.charAt(0).toUpperCase() + certification.level.slice(1)}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-2">{certification.title}</h3>
        <p className="text-white/90 text-sm">{certification.tagline}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {certification.description}
        </p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            👥 Perfect for:
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {certification.audience.join(', ')}
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            📚 Key Topics:
          </h4>
          <ul className="grid grid-cols-1 gap-1">
            {certification.topics.slice(0, 4).map((topic, idx) => (
              <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                <span className="mr-2">•</span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ⏱️ {certification.duration}
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
            Learn More →
          </span>
        </div>
      </div>
    </Link>
  );
}
