import Link from 'next/link';

export default function AIFundamentalsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Background Section */}
      <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/nature-bg.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-blue-900/70 to-emerald-900/80"></div>
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
              AI Fundamentals
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-3xl mx-auto">
              Understanding the Basics of Artificial Intelligence and Machine Learning
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
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction to AI</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                  Artificial intelligence (AI) is changing the way people work, create, and make decisions. From writing content to analyzing data and automating tasks, AI tools are now part of everyday professional life.
                  Before using these tools, it is important to understand what AI is, how it works, and what its limits are.
                </p>
                <p className="mb-8 text-gray-700 dark:text-gray-300">
                  This guide explains the core ideas behind artificial intelligence in a simple and practical way.
                </p>
              </div>
            </div>

            {/* What is AI */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What Is Artificial Intelligence (AI)?</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Artificial intelligence refers to computer systems designed to perform tasks that normally require human intelligence. These tasks include understanding language, recognizing images, making predictions, and learning from data.
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  Unlike traditional software, AI systems do not just follow fixed instructions. They analyze patterns, learn from experience, and improve their performance over time.
                </p>
              </div>

              {/* Key Examples */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Examples of AI in Everyday Life</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">💬</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Chatbots and virtual assistants</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">📺</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Recommendation systems on streaming platforms</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">👁️</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Image and speech recognition</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">✍️</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Writing and design tools</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      <strong>Important:</strong> AI does not think or feel like a human. It processes information and makes decisions based on data and mathematical models.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Types of AI */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Types of Artificial Intelligence</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-8">There are two main categories of AI:</p>

              {/* Narrow AI */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center mr-3 text-sm font-bold">🎯</span>
                  Narrow AI (Weak AI)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Narrow AI is designed to perform a specific task. Almost all AI tools used today belong to this category.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    Writing assistants
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    Translation tools
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    Face recognition systems
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    Spam filters
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  These systems are very good at one job, but they cannot think or act outside of their specific function.
                </p>
              </div>

              {/* General AI */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mr-3 text-sm font-bold">🚀</span>
                  General AI (Strong AI)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  General AI refers to a theoretical type of AI that could think, learn, and solve problems like a human across many different tasks.
                  This type of AI does not exist yet. It is still the subject of research and science fiction.
                </p>
                <div className="bg-purple-100 dark:bg-purple-800/50 rounded-lg p-3">
                  <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                    When people talk about using AI for work today, they are always referring to Narrow AI.
                  </p>
                </div>
              </div>
            </div>

            {/* Machine Learning */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Machine Learning Basics</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Machine learning is a key part of artificial intelligence. It allows computers to learn from data instead of being manually programmed for every situation.
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300">In machine learning:</p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-600 dark:text-green-400 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Data Input</h4>
                      <p className="text-gray-700 dark:text-gray-300">The system is given large amounts of data</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-600 dark:text-green-400 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Pattern Recognition</h4>
                      <p className="text-gray-700 dark:text-gray-300">It finds patterns inside that data</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-600 dark:text-green-400 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Prediction & Decision</h4>
                      <p className="text-gray-700 dark:text-gray-300">It uses those patterns to make predictions or decisions</p>
                    </div>
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
                      <strong>Example:</strong> A machine learning system trained on thousands of emails can learn to detect spam by recognizing common patterns in unwanted messages.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
                <p className="text-green-700 dark:text-green-300 font-medium">
                  💡 The more high-quality data a system has, the better it can usually perform.
                </p>
              </div>
            </div>

            {/* Neural Networks */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Neural Networks Explained</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Neural networks are one of the most important technologies behind modern AI.
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  They are inspired by the way the human brain works. A neural network is made of layers of connected units called neurons. These neurons:
                </p>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 mb-6">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mb-3">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">📥</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Receive</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Receive information</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mb-3">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">⚙️</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Process</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Process it</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mb-3">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">📤</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Pass</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Pass it to the next layer</p>
                  </div>
                </div>
              </div>

              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Each time the system makes a prediction, it checks whether the result was correct. If it was wrong, it adjusts itself. Over time, the network becomes better at recognizing patterns, such as:
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <span className="text-2xl mb-2 block">🖼️</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Faces in images</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <span className="text-2xl mb-2 block">💬</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Meaning in text</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <span className="text-2xl mb-2 block">🔊</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Sounds in speech</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4">
                <p className="text-indigo-700 dark:text-indigo-300 font-medium">
                  🚀 Large language models and image generators are built using very advanced neural networks.
                </p>
              </div>
            </div>

            {/* Ethics */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ethics in Artificial Intelligence</h2>
              </div>
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  AI is powerful, but it must be used responsibly.
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300">Ethical AI means:</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 dark:text-red-400 text-xs font-bold">🔒</span>
                    </span>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Privacy</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Respecting privacy</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 dark:text-red-400 text-xs font-bold">⚖️</span>
                    </span>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Fairness</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Avoiding harmful or biased decisions</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 dark:text-red-400 text-xs font-bold">👁️</span>
                    </span>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Transparency</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Being transparent about how AI is used</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="w-6 h-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
                      <span className="text-red-600 dark:text-red-400 text-xs font-bold">🛡️</span>
                    </span>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Safety</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Protecting users from misuse</p>
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
                      AI systems learn from human data, which means they can also inherit human biases. This is why it is important to:
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Best Practices for Ethical AI Use</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Use AI as a support tool, not a replacement for human judgment</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Verify important information</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">Avoid using AI in ways that could harm people or spread misinformation</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg p-4">
                <p className="text-emerald-700 dark:text-emerald-300 font-medium text-center">
                  🌱 On Abir-IA, we promote the use of AI as a tool for productivity, creativity, and learning — not for deception or harm.
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