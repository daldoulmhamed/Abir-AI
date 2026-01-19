import Link from 'next/link';
import ReactMarkdown, { Components } from 'react-markdown';
import { blogs } from '../../../data/blogs';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Custom Markdown components with professional styling
const customComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 mt-12">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <div className="flex items-center mb-8 mt-12">
      <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {children}
      </h2>
    </div>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8 flex items-center">
      <span className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-3 text-sm font-bold text-indigo-600 dark:text-indigo-400">•</span>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-none mb-6 space-y-3 pl-0">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="flex items-start text-gray-700 dark:text-gray-300">
      <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <span className="text-lg leading-relaxed">{children}</span>
    </li>
  ),
  hr: () => (
    <div className="my-12 border-t-2 border-gray-200 dark:border-gray-700"></div>
  ),
  blockquote: ({ children }) => (
    <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-6 rounded-r-lg mb-6 my-8">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 text-amber-700 dark:text-amber-300">{children}</div>
      </div>
    </div>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline font-medium">
      {children}
    </a>
  ),
};

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Background Section */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/nature-bg.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-blue-900/70 to-emerald-900/80"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/news" className="inline-flex items-center text-white/90 hover:text-white transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to News Hub
            </Link>
          </div>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-white/20 text-white rounded-full text-sm font-semibold backdrop-blur-sm">
              {blog.category}
            </span>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg leading-tight">
              {blog.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-3xl mx-auto mb-8">
              {blog.meta_description}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{blog.reading_time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown components={customComponents}>
                {blog.content}
              </ReactMarkdown>
            </div>

            {/* Author Section */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Learn More on Abir-AI
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Explore structured learning paths, AI tools, and practical tutorials to master AI skills for your role.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/learn" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Explore Learning Paths
                  </Link>
                  <Link href="/tutorials" className="inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View Tutorials
                  </Link>
                </div>
              </div>
            </div>

            {/* Back to News */}
            <div className="mt-8">
              <Link href="/news" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}