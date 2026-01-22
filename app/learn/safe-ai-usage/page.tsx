import Link from 'next/link';

export default function SafeAIUsagePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Background Section */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/nature-bg.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-cyan-900/70 to-teal-900/80"></div>
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
              Safe AI Usage
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-3xl mx-auto">
              Best Practices for Using AI Tools Responsibly and Securely
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
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction to Safe AI Usage</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                  Artificial intelligence can dramatically improve productivity, creativity, and decision-making. But using AI without understanding its limits can lead to privacy risks, misinformation, and poor results.
                </p>
                <p className="mb-8 text-gray-700 dark:text-gray-300">
                  This guide explains how to use AI tools safely, responsibly, and effectively in real-world situations.
                </p>
              </div>
            </div>

            {/* Why Safe AI Usage Matters */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Why Safe AI Usage Matters</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  AI tools are now used for a wide range of professional tasks, but they come with important limitations that must be understood.
                </p>
              </div>

              {/* AI Applications Grid */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Tools Are Now Used For</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">✍️</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Writing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">📊</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Business Analysis</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">📢</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Marketing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">🎓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Education</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">🎨</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Design</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">💬</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Customer Support</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 rounded-r-lg mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 dark:text-red-300">
                      <strong>Critical Warning:</strong> AI systems do not truly understand what they generate. They predict text and results based on patterns in data. This means they can be wrong, invent facts, expose private data, or reflect bias.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <p className="text-green-700 dark:text-green-300 font-medium text-center">
                  🛡️ Learning how to use AI safely protects both you and your work.
                </p>
              </div>
            </div>

            {/* Data Privacy Considerations */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Privacy Considerations</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Whenever you use an AI tool, you are sharing information with a third-party system. That data may be stored, analyzed, or used to improve the model.
                </p>
              </div>

              {/* Never Enter List */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
                    <span className="text-red-600 dark:text-red-400 text-xs font-bold">🚫</span>
                  </span>
                  What You Should NEVER Enter Into AI Tools
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center text-sm text-red-700 dark:text-red-300">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    Passwords or login details
                  </div>
                  <div className="flex items-center text-sm text-red-700 dark:text-red-300">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    Bank or credit card numbers
                  </div>
                  <div className="flex items-center text-sm text-red-700 dark:text-red-300">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    Private client information
                  </div>
                  <div className="flex items-center text-sm text-red-700 dark:text-red-300">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    Medical or legal documents
                  </div>
                  <div className="flex items-center text-sm text-red-700 dark:text-red-300">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    Confidential business data
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 dark:text-green-400 text-xs font-bold">✅</span>
                  </span>
                  Privacy Best Practices
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Use fake or sample data when testing</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Remove names, emails, and identifiers</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Use enterprise versions of AI tools when working with sensitive material</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Read the privacy policy before uploading files</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Remember:</strong> AI should be treated like a public cloud service, not a private notebook. Even if a tool looks professional, you must assume that anything you submit could be stored.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Avoiding AI Hallucinations */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Avoiding AI Hallucinations</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  An AI hallucination happens when an AI produces information that sounds convincing but is completely incorrect.
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300">This often happens when:</p>
              </div>

              {/* When Hallucinations Occur */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">Hallucinations Often Occur When</h3>
                <div className="grid md:grid-cols-1 gap-3">
                  <div className="flex items-center text-sm text-purple-700 dark:text-purple-300">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    You ask about rare facts
                  </div>
                  <div className="flex items-center text-sm text-purple-700 dark:text-purple-300">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    You request statistics or legal information
                  </div>
                  <div className="flex items-center text-sm text-purple-700 dark:text-purple-300">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    The question is vague or unclear
                  </div>
                </div>
              </div>

              {/* How to Reduce Hallucinations */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 dark:text-green-400 text-xs font-bold">🛡️</span>
                  </span>
                  How to Reduce Hallucinations
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">1</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Ask for step-by-step explanations</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">2</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Request sources or references</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">3</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Break complex questions into smaller ones</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">4</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Avoid assuming the first answer is correct</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">5</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">If the answer is important, verify it</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fact-Checking AI Outputs */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fact-Checking AI Outputs</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Never use AI-generated information without verification when it affects important areas of life and work.
                </p>
              </div>

              {/* Critical Areas */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4">Never Use AI Without Verification When It Affects</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 dark:text-red-400 text-sm font-bold">💰</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Money</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 dark:text-red-400 text-sm font-bold">⚖️</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Legal Matters</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 dark:text-red-400 text-sm font-bold">🏥</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Health</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 dark:text-red-400 text-sm font-bold">🎓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Education</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 dark:text-red-400 text-sm font-bold">📢</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Public Communication</span>
                  </div>
                </div>
              </div>

              {/* Fact-Checking Process */}
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-cyan-900 dark:text-cyan-100 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mr-3">
                    <span className="text-cyan-600 dark:text-cyan-400 text-xs font-bold">🔍</span>
                  </span>
                  Simple Fact-Checking Process
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-cyan-600 dark:text-cyan-400 text-xs font-bold">1</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Take the key claims from the AI output</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-cyan-600 dark:text-cyan-400 text-xs font-bold">2</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Search them on Google or trusted websites</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-cyan-600 dark:text-cyan-400 text-xs font-bold">3</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Compare with official sources</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-cyan-600 dark:text-cyan-400 text-xs font-bold">4</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Only keep what you can confirm</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-4">
                <p className="text-cyan-700 dark:text-cyan-300 font-medium text-center">
                  🤖 AI is an assistant, not a final authority.
                </p>
              </div>
            </div>

            {/* Responsible AI Prompts */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Responsible AI Prompts</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  AI tools reflect the way you talk to them. Responsible prompting means being ethical and avoiding harmful requests.
                </p>
              </div>

              {/* Responsible vs Harmful */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Responsible Prompts */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✅</span>
                    </span>
                    Responsible Prompts
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white dark:bg-gray-700 rounded p-3 text-sm text-gray-700 dark:text-gray-300">
                      &quot;Summarize this article clearly&quot;
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded p-3 text-sm text-gray-700 dark:text-gray-300">
                      &quot;Help me rewrite this text more professionally&quot;
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded p-3 text-sm text-gray-700 dark:text-gray-300">
                      &quot;Give me ideas for marketing my product&quot;
                    </div>
                  </div>
                </div>

                {/* Harmful Prompts */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center">
                    <span className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 dark:text-red-400 text-xs font-bold">❌</span>
                    </span>
                    Harmful Prompts
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white dark:bg-gray-700 rounded p-3 text-sm text-gray-700 dark:text-gray-300">
                      &quot;Write fake reviews&quot;
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded p-3 text-sm text-gray-700 dark:text-gray-300">
                      &quot;Create scam messages&quot;
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded p-3 text-sm text-gray-700 dark:text-gray-300">
                      &quot;Pretend to be someone else&quot;
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded-r-lg mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Responsible prompting means you do not ask for harmful, illegal, or deceptive content. You do not use AI to impersonate others or create fake news or misleading material.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4">
                <p className="text-indigo-700 dark:text-indigo-300 font-medium text-center">
                  🛡️ Using AI ethically protects your reputation and the people who read your content.
                </p>
              </div>
            </div>

            {/* Digital Literacy Skills */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Digital Literacy Skills</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  To use AI well, you must also be digitally smart. Digital literacy includes essential skills for navigating the digital world safely.
                </p>
              </div>

              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-pink-900 dark:text-pink-100 mb-4">Digital Literacy Includes</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-pink-600 dark:text-pink-400 text-sm font-bold">🔍</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Knowing how to verify online information</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-pink-600 dark:text-pink-400 text-sm font-bold">⚙️</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Understanding how algorithms work</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-pink-600 dark:text-pink-400 text-sm font-bold">👁️</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Recognizing biased or misleading content</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-pink-600 dark:text-pink-400 text-sm font-bold">🔐</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Protecting your digital identity</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg p-4">
                <p className="text-pink-700 dark:text-pink-300 font-medium text-center">
                  🧠 AI is powerful, but critical thinking is what makes it useful.
                </p>
              </div>
            </div>

            {/* Safe AI Use on Abir-IA */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Safe AI Use on Abir-IA</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  At Abir-IA, we are committed to promoting safe, ethical, and responsible AI usage.
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">We Promote</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">👁️</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Transparent tools</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">⚖️</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Ethical use</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">🔒</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">User privacy</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">📚</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Accessible learning</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-4">
                <p className="text-emerald-700 dark:text-emerald-300 font-medium text-center">
                  🌱 Our goal is to help you use AI as a tool for growth, not as a risk.
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