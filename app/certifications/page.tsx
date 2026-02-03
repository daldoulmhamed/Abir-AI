import type { Metadata } from "next";
import Link from "next/link";
import { certifications } from "@/data/certifications";
import { 
  generateCertificationsListSchema, 
  generateFAQSchema 
} from "@/utils/generateCertificationSchema";

export const metadata: Metadata = {
  title: "AI Certifications - Get Certified in Artificial Intelligence | Abir-AI",
  description: "Get certified in AI with Abir-AI. Choose from 4 industry-recognized certifications: Generative AI, GitHub Copilot, Business Operations, and Responsible AI. Start your AI career today.",
  keywords: "AI certification, generative AI certification, GitHub Copilot certification, AI training, artificial intelligence courses",
  openGraph: {
    title: "AI Certifications - Get Certified in Artificial Intelligence | Abir-AI",
    description: "Get certified in AI with Abir-AI. Choose from 4 industry-recognized certifications in Generative AI, productivity, business, and responsible AI.",
    type: "website",
  }
};

export default function CertificationsPage() {
  const featured = certifications.filter(cert => cert.featured).sort((a, b) => a.order - b.order);
  
  // Generate structured data for SEO
  const listSchema = generateCertificationsListSchema(featured);
  const faqSchema = generateFAQSchema();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(listSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Learn AI for Free — Get Certified When Ready
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Access comprehensive AI training at no cost. Study at your own pace, build real projects, 
              and validate your expertise with affordable optional certifications (49€–99€).
            </p>
          </div>
          {/* Why Learn with Abir-AI - Inside Hero */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-5xl mb-4">🆓</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                100% Free Learning
              </h3>
              <p className="text-white/80">
                Access all course materials, videos, and exercises at no cost. Learn at your own pace.
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Self-Paced & Flexible
              </h3>
              <p className="text-white/80">
                Study when it fits your schedule. No deadlines, no pressure. Complete in 1 week or 6 months.
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Optional Certification
              </h3>
              <p className="text-white/80">
                Validate your skills with an affordable exam (49€–99€) and earn an industry-recognized certificate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Verification CTA - just below Hero, above How It Works */}
      <div className="w-full flex justify-center py-8 bg-gray-50 dark:bg-gray-900">
        <Link
          href="/verify"
          className="inline-flex items-center px-6 py-2 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 dark:bg-gray-800 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          Verify Certificate
        </Link>
      </div>

      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Start Learning Free
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Access all course materials, videos, and exercises at no cost
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Learn at Your Pace
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Study when convenient. Complete in weeks or months—your choice
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Get Certified (Optional)
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                When ready, take the certification exam (49€–99€) to validate your skills
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Share Your Achievement
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Display your certificate on LinkedIn and advance your career
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section id="certifications" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            All learning content is free. Certification exams are optional and range from 49€ to 99€.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map((cert) => (
              <Link
                key={cert.id}
                href={`/certifications/${cert.slug}`}
                className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${cert.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl">{cert.icon}</span>
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      {cert.level.charAt(0).toUpperCase() + cert.level.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{cert.title}</h3>
                  <p className="text-white/90 text-sm">{cert.tagline}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {cert.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      👥 Perfect for:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cert.audience.join(', ')}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      📚 Key Topics:
                    </h4>
                    <ul className="grid grid-cols-1 gap-1">
                      {cert.topics.slice(0, 4).map((topic, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ⏱️ {cert.duration}
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Learning for Free?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands who are learning AI at their own pace. Access all materials for free, get certified only when you're ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#certifications"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Browse Certifications
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 transition-colors"
            >
              Try Free Courses First
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is the learning content really free?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! All course materials, videos, exercises, and projects are 100% free. You only pay if you want to take the optional certification exam (49€–99€).
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Do I need to get certified?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No, certification is optional. You can learn everything for free and use the knowledge immediately. Get certified only when you want to validate your skills professionally.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How long does it take to complete?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                It's self-paced! Complete a course in 1–8 weeks depending on your schedule. Study full-time or a few hours per week—there are no deadlines.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
