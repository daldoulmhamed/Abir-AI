import Link from 'next/link';

export default function ProductivityWorkflowsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Background Section */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/nature-bg.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/80 via-amber-900/70 to-yellow-900/80"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/learn" className="inline-flex items-center text-white/90 hover:text-white transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Learn Hub
            </Link>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Productivity Workflows
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-3xl mx-auto">
              Integrating AI into Your Daily Work Routines for Maximum Efficiency
            </p>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            {/* Introduction */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction to Productivity Workflows</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                  Artificial intelligence can transform the way you work, helping you save time, improve output quality, and focus on what really matters. By integrating AI into your daily workflows, you can achieve higher productivity without burnout.
                </p>
                <p className="mb-8 text-gray-700 dark:text-gray-300">
                  This guide explores practical ways to use AI for task management, automation, content creation, research, and communication.
                </p>
              </div>
            </div>

            {/* AI for Task Management */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI for Task Management</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  AI can help you stay organized and prioritize work effectively.
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300">How AI can assist:</p>
              </div>

              {/* Task Management Features */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">📋</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Smart to-do lists and task prioritization</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">📅</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Automated scheduling and calendar management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">⏰</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Reminders and notifications for deadlines</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">🎯</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Suggesting optimal time blocks for deep work</span>
                  </div>
                </div>
              </div>

              {/* Practical Tips */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 dark:text-green-400 text-xs font-bold">💡</span>
                  </span>
                  Practical Tips
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Use AI-powered project management tools like Notion AI, Trello with AI integrations, or ClickUp AI to plan your day</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Ask AI to break complex projects into smaller tasks</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Have AI summarize meetings and action items</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4">
                <p className="text-blue-700 dark:text-blue-300 font-medium">
                  📋 This saves time and ensures nothing important is overlooked.
                </p>
              </div>
            </div>

            {/* Automating Repetitive Tasks */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Automating Repetitive Tasks</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Repetitive or routine tasks are a major source of wasted time. AI can automate many of them.
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300">Common repetitive tasks AI can help with:</p>
              </div>

              {/* Repetitive Tasks Grid */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">📧</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Email filtering and replies</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">📊</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Data entry and spreadsheet updates</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">📁</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">File organization and management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">📱</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Scheduling social media posts</span>
                  </div>
                </div>
              </div>

              {/* Workflow Example */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      <strong>Practical Workflow Example:</strong> Use AI to scan emails and suggest draft responses. Automate weekly reporting by connecting AI tools to your spreadsheets. Let AI generate reminders for repetitive tasks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
                <p className="text-purple-700 dark:text-purple-300 font-medium">
                  🔄 By automating these tasks, you can focus on higher-value work that requires creativity or strategic thinking.
                </p>
              </div>
            </div>

            {/* Content Creation Workflows */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Content Creation Workflows</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  AI is particularly effective for content creators who need to produce text, visuals, or videos regularly.
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300">How to integrate AI:</p>
              </div>

              {/* Content Creation Features */}
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-pink-600 dark:text-pink-400 text-sm font-bold">📝</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Generate blog outlines, social media posts, or marketing copy</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-pink-600 dark:text-pink-400 text-sm font-bold">🔍</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Use AI to proofread, summarize, and improve existing content</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-pink-600 dark:text-pink-400 text-sm font-bold">🎨</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Create AI-assisted visual content like designs, infographics, or thumbnails</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-pink-600 dark:text-pink-400 text-sm font-bold">📺</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Draft scripts, emails, or presentations quickly</span>
                  </div>
                </div>
              </div>

              {/* Best Practice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Best Practice:</strong> Always review AI-generated content. Use it as a starting point, then add your personal touch or professional expertise.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Research and Analysis */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Research and Analysis</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  AI can drastically reduce the time spent gathering information and analyzing data.
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300">AI-powered research includes:</p>
              </div>

              {/* Research Applications */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">📄</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Summarizing articles, reports, and research papers</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">📊</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Extracting key insights from large datasets</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">🏢</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Conducting competitive analysis for marketing or business strategy</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">📈</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Generating visual data summaries and dashboards</span>
                  </div>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      <strong>Pro Tip:</strong> When using AI for research, always verify the sources. Combine AI-generated insights with trusted references to make informed decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Enhancement */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Communication Enhancement</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  AI can improve how you communicate, internally and externally.
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300">Key applications:</p>
              </div>

              {/* Communication Applications */}
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold">📧</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Drafting professional emails or responses</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold">🌐</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Translating documents or messages instantly</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold">📝</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Summarizing long meetings into actionable points</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold">📊</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Creating presentations or reports efficiently</span>
                  </div>
                </div>
              </div>

              {/* Workflow Example */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 dark:text-green-400 text-xs font-bold">🔄</span>
                  </span>
                  Workflow Example
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">1</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">AI generates a meeting summary</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">2</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">AI drafts follow-up emails</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">3</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">You review and personalize before sending</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-4">
                <p className="text-cyan-700 dark:text-cyan-300 font-medium">
                  💬 This workflow reduces repetitive effort and improves clarity in team communication.
                </p>
              </div>
            </div>

            {/* Best Practices */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Best Practices for Productivity Workflows</h2>
              </div>

              {/* Best Practices List */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">🚀</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Start Small</h4>
                      <p className="text-gray-700 dark:text-gray-300">Integrate AI into one workflow at a time</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">👤</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Keep Humans in Control</h4>
                      <p className="text-gray-700 dark:text-gray-300">Use AI as a tool, not a replacement for judgment</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">👀</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Review AI Output</h4>
                      <p className="text-gray-700 dark:text-gray-300">Ensure accuracy and relevance before acting</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">📊</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Measure Impact</h4>
                      <p className="text-gray-700 dark:text-gray-300">Track time saved or quality improvements</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">⚖️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Stay Ethical</h4>
                      <p className="text-gray-700 dark:text-gray-300">Do not automate anything that violates privacy or trust</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg p-4">
                <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                  ✅ By following these principles, AI becomes a powerful ally in your daily work, helping you achieve more in less time.
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Summary</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  Integrating AI into your work routines doesn't have to be complex. By focusing on task management, automation, content creation, research, and communication, you can build smarter workflows that save time, improve output, and allow you to focus on what truly matters.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg p-6">
                <p className="text-orange-700 dark:text-orange-300 font-medium text-center">
                  🌟 Abir-IA helps you discover the right AI tools, tutorials, and best practices to make your daily work faster, smarter, and more efficient.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-between">
            <Link href="/learn" className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Learn Hub
            </Link>
            <Link href="/learn" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Continue Learning
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}