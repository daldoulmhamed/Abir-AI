'use client';

import Link from 'next/link';
import { useState } from 'react';
import { blogs } from '../../data/blogs';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const articles = blogs.map(blog => ({
    title: blog.title,
    category: blog.category,
    date: blog.date,
    excerpt: blog.excerpt,
    readTime: blog.reading_time,
    slug: blog.slug,
  }));

  const categories = ['All', 'AI News', 'Privacy', 'Business', 'Platform Updates', 'Case Studies', 'Education'];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI and Digital Technology News & Guides
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Read the latest AI news, artificial intelligence updates, digital technology trends, and in-depth guides about AI tools and innovation.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white border border-indigo-600 dark:border-indigo-500'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <article key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  article.category === 'AI News'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : article.category === 'Privacy'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : article.category === 'Business'
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    : article.category === 'Platform Updates'
                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    : article.category === 'Case Studies'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {article.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {article.readTime}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">
                <Link href={`/news/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <Link href={`/news/${article.slug}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium">
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-indigo-600 dark:bg-indigo-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Get the latest AI news, tool recommendations, and platform updates delivered to your inbox.
            No spam, unsubscribe anytime.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            />
            <button className="px-6 py-2 bg-white text-indigo-600 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-indigo-200 mt-2">
            We respect your privacy. No tracking, no data selling.
          </p>
        </div>
      </div>
    </div>
  );
}