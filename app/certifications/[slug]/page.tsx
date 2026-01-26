import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCertificationBySlug, certifications } from "@/data/certifications";
import { 
  generateCertificationSchema, 
  generateBreadcrumbSchema 
} from "@/utils/generateCertificationSchema";

interface CertificationPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return certifications.map((cert) => ({
    slug: cert.slug,
  }));
}

export async function generateMetadata({ params }: CertificationPageProps): Promise<Metadata> {
  const certification = getCertificationBySlug(params.slug);
  
  if (!certification) {
    return {
      title: "Certification Not Found | Abir-AI"
    };
  }

  return {
    title: certification.metaTitle,
    description: certification.metaDescription,
    keywords: `${certification.title}, AI certification, ${certification.topics.join(', ')}`,
    openGraph: {
      title: certification.metaTitle,
      description: certification.metaDescription,
      type: "website",
    }
  };
}

export default function CertificationPage({ params }: CertificationPageProps) {
  const certification = getCertificationBySlug(params.slug);

  if (!certification) {
    notFound();
  }

  // Get related certifications (excluding current)
  const relatedCertifications = certifications
    .filter(cert => cert.id !== certification.id)
    .slice(0, 3);

  // Generate structured data for SEO
  const certificationSchema = generateCertificationSchema(certification);
  const breadcrumbSchema = generateBreadcrumbSchema(certification);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(certificationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      {/* Hero Section */}
      <section className={`relative py-20 md:py-28 bg-gradient-to-br ${certification.color}`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/80 mb-4">
            <Link href="/certifications" className="hover:text-white transition-colors">
              Certifications
            </Link>
            <span>/</span>
            <span>{certification.shortTitle}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-6xl">{certification.icon}</span>
                <span className="text-sm font-medium bg-white/20 px-4 py-2 rounded-full">
                  {certification.level.charAt(0).toUpperCase() + certification.level.slice(1)}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {certification.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-6">
                {certification.tagline}
              </p>
              <p className="text-lg text-white/80 mb-8">
                {certification.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors">
                  Enroll Now
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors">
                  Download Syllabus
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Certification Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Duration</div>
                    <div className="text-gray-600 dark:text-gray-300">{certification.duration}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Level</div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {certification.level.charAt(0).toUpperCase() + certification.level.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Target Audience</div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {certification.audience.join(', ')}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Certificate</div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Industry-recognized credential
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certification.topics.map((topic, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-4 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg"
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${certification.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {topic}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Certification Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certification.benefits.map((benefit, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
              >
                <div className="text-4xl mb-4">
                  {idx === 0 ? '✅' : idx === 1 ? '🚀' : idx === 2 ? '💼' : idx === 3 ? '👥' : '🎯'}
                </div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Curriculum Overview
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            A structured learning path designed by industry experts to take you from fundamentals to mastery.
          </p>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Comprehensive Learning Materials
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Video lessons, interactive exercises, real-world projects, and expert support throughout your journey.
            </p>
            <button className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors">
              View Full Curriculum
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 bg-gradient-to-r ${certification.color}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Certified?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join professionals who have already advanced their careers with this certification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors">
              Enroll Now
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Related Certifications */}
      {relatedCertifications.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Explore More Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCertifications.map((cert) => (
                <Link
                  key={cert.id}
                  href={`/certifications/${cert.slug}`}
                  className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className={`bg-gradient-to-r ${cert.color} p-6 text-white`}>
                    <span className="text-4xl mb-3 block">{cert.icon}</span>
                    <h3 className="text-xl font-bold">{cert.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {cert.tagline}
                    </p>
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Learn More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
