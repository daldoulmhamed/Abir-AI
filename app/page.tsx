import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/nature-bg.jpg')" }}>
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Image
            src="/images/logo.png"
            alt="Abir-AI"
            width={1000}
            height={334}
            className="h-20 md:h-32 lg:h-40 w-auto mb-6 mx-auto"
          />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-600 to-blue-300 bg-clip-text text-transparent mb-6">
            Learn and Use AI with Confidence
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Abir-AI helps you discover reliable AI tools and learn how to use them through clear guides, tutorials, and real-world examples — tailored to your work and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/learn"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Start Learning AI
            </Link>
            <Link
              href="/profiles"
              className="inline-flex items-center px-8 py-3 border-2 border-indigo-600 text-base font-medium rounded-md text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 bg-transparent hover:bg-indigo-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Find AI Tools for My Job
            </Link>
          </div>
        </div>
      </section>

      {/* Choose Your Profile Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent mb-4">
            Choose Your Profile
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Get AI tools, tutorials, and practical use cases adapted to your role.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Freelancer', description: 'Tools for independent professionals' },
              { name: 'Student', description: 'AI assistance for learning and research' },
              { name: 'Entrepreneur', description: 'Tools to build and scale your business' },
              { name: 'Content Creator', description: 'AI for content creation and media' },
            ].map((profile) => (
              <Link
                key={profile.name}
                href={`/profiles/${profile.name.toLowerCase().replace(/ \//g, '').replace(/ /g, '-')}`}
                className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-400"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {profile.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {profile.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="flex justify-center gap-6 flex-wrap mt-6">
            {[
              { name: 'Artist', description: 'AI tools for creative and artistic work' },
              { name: 'Educator', description: 'AI tools for teaching and educational content' },
              { name: 'Other / Not Listed', description: 'Explore all AI tools without specific guidance' },
            ].map((profile) => (
              <Link
                key={profile.name}
                href={`/profiles/${profile.name.toLowerCase().replace(/ \//g, '').replace(/ /g, '-')}`}
                className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-400 w-full md:w-80 lg:w-80"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {profile.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {profile.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent mb-4">
              Learn AI the Practical Way
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Abir-AI provides structured learning content designed to help you understand AI concepts and apply them responsibly in real situations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/learn"
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="p-8">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                  <svg className="w-7 h-7 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Learn AI Basics
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Clear explanations of key AI concepts for beginners and non-technical users.
                </p>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Explore →
                </div>
              </div>
            </Link>

            <Link
              href="/tutorials"
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="p-8">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                  <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Step-by-Step Tutorials
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Practical guides showing how to use AI tools for everyday tasks.
                </p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Explore →
                </div>
              </div>
            </Link>

            <Link
              href="/news"
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="p-8">
                <div className="w-14 h-14 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pink-200 dark:group-hover:bg-pink-800 transition-colors">
                  <svg className="w-7 h-7 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2m2 2a2 2 0 002-2m-2 2v-1m0-6V9a2 2 0 00-2-2m0 0V7a2 2 0 00-2-2m0 0H7a2 2 0 00-2 2v1m0 6v1m0 1" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  AI News & Insights
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Carefully selected updates to help you stay informed without misinformation or hype.
                </p>
                <div className="flex items-center text-pink-600 dark:text-pink-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Explore →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Abir-AI Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16 flex items-center justify-center gap-3">
            <span className="bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">Why</span> <Image
              src="/images/logo.png"
              alt="Abir-AI"
              width={480}
              height={160}
              className="h-48 w-auto"
            />
            <span className="sr-only">Abir-AI</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Clarity First
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We explain AI in a simple and accessible way, without unnecessary technical complexity.
              </p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Curated Resources
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tools, tutorials, and content are selected carefully to reduce noise and confusion.
              </p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Learning-Driven Approach
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We focus on helping users understand how and when to use AI — not just what tool to click.
              </p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Built for Real People
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Designed for freelancers, students, entrepreneurs, and creators — not only AI specialists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Resources Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent mb-12">
            Explore Our Resources
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 mb-12">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-indigo-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Introduction to AI for Everyday Work
                </h3>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  How to Choose the Right AI Tool for Your Job
                </h3>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-pink-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Practical AI Use Cases Across Industries
                </h3>
              </div>
            </div>
            <div className="text-center">
              <Link
                href="/learn"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Browse All Learning Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/nature-bg.jpg')" }}>
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-blue-600 to-blue-300 bg-clip-text text-transparent mb-4">
            Start Exploring AI at Your Own Pace
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Discover tools, learn step by step, and build your understanding of artificial intelligence with clarity and confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center px-8 py-3 border-2 border-indigo-600 text-base font-medium rounded-md text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 bg-transparent hover:bg-indigo-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Browse Learning Content
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
