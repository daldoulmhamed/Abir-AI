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
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Get Certified in Artificial Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Industry-recognized AI certifications designed to accelerate your career. 
            Learn from experts, build real projects, and join a community of AI practitioners.
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
              Start Learning Free
            </Link>
          </div>
        </div>
      </section>

      {/* Why Get Certified Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Get AI Certified with Abir-AI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Industry Recognition
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Certifications recognized by leading companies and validated by AI experts.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Career Advancement
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stand out in the job market with verified AI skills and hands-on experience.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Practical Skills
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn by doing with real-world projects, not just theory. Build your portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section id="certifications" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Choose Your Certification Path
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Four specialized certifications designed for different career paths and skill levels.
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

      {/* Certification Process */}
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
                Choose Your Path
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Select the certification that matches your career goals
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Learn & Practice
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Complete video lessons, hands-on projects, and exercises
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Pass the Exam
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Demonstrate your knowledge in a comprehensive assessment
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Get Certified
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Receive your certificate and showcase it on LinkedIn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your AI Certification Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of professionals who have already advanced their careers with Abir-AI certifications.
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
                Are these certifications recognized by employers?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! Our certifications are designed in collaboration with industry experts and follow best practices recognized by leading tech companies. Many of our graduates have successfully used these certifications to advance their careers.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Do I need prior AI experience?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                It depends on the certification. The Generative AI Practitioner is beginner-friendly, while others require some familiarity with AI concepts. Check the level indicator on each certification for details.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Can I access the course materials after completion?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutely! Once enrolled, you get lifetime access to all course materials, including future updates and additions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
