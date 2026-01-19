import ProfileSelector from "@/components/ProfileSelector";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/nature-bg.jpg')" }}>
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/images/logo.png"
              alt="Abir-AI"
              width={1000}
              height={334}
              className="h-24 md:h-48 lg:h-80 w-auto mb-4"
            />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Empowering Your Journey with AI
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            The fresh way to use AI
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Abir-IA helps people discover and use the best AI tools for work, productivity, and creativity. 
            Inspired by the meaning of "Abir", the platform focuses on clarity, freshness, and simple discovery of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Profile Selector */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Choose your profile
          </h2>
          <ProfileSelector />
        </div>
      </section>

      {/* Why Different */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 flex items-center justify-center gap-2">
            Why <Image src="/images/logo.png" alt="Abir-AI" width={480} height={160} className="h-16 md:h-32 w-auto" /> is different
          </h2>
          <div className="mb-12 text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              Abir-IA is a platform dedicated to helping people discover and use the best AI tools for work, productivity, and creativity. 
              We serve freelancers, students, entrepreneurs, and content creators who want to use artificial intelligence to work faster, create better, and make smarter decisions. 
              Abir-IA provides AI software, tutorials, real-world examples, and digital technology news in a clear and accessible way.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Ethical & Transparent
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No dark patterns, honest recommendations, and complete transparency about our suggestions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Privacy First
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We respect your privacy and never sell your data. No tracking, no ads, just helpful recommendations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Fast & Accessible
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                WCAG 2.1 AA compliant, optimized for speed, and designed with accessibility in mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Performance */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Trust & Privacy
              </h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No data collection or selling
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Honest, unbiased recommendations
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  GDPR-compliant user rights
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Performance & Simplicity
              </h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-sky-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lightning-fast loading times
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-sky-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Mobile-first responsive design
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-sky-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Low bandwidth friendly
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 bg-cover bg-center" style={{ backgroundImage: "url('/images/nature-cta.jpg')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to discover your perfect AI tools?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Choose your profile above and get started with curated, ethical AI recommendations.
          </p>
          <a
            href="#profiles"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}
