'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CourseContent from '@/components/CourseContent';
import { courseContentData } from '@/data/courseContent';

interface Section {
  id: string;
  title: string;
  position: number;
  totalSections: number;
  duration: string;
  description: string;
  hasContent: boolean;
}

const sectionData: Record<string, Section[]> = {
  'chatgpt-content-creation': [
    { id: 'getting-started-chatgpt', title: 'Getting Started with ChatGPT', position: 1, totalSections: 5, duration: '15 min', description: 'Learn how to set up your ChatGPT account and master the basic interface for content creation.', hasContent: false },
    { id: 'writing-prompts', title: 'Crafting Effective Prompts', position: 2, totalSections: 5, duration: '20 min', description: 'Discover techniques to write prompts that generate high-quality content tailored to your needs.', hasContent: false },
    { id: 'content-types', title: 'Creating Different Content Types', position: 3, totalSections: 5, duration: '25 min', description: 'Master creating blog posts, social media content, email newsletters, and more with ChatGPT.', hasContent: false },
    { id: 'refining-content', title: 'Refining and Optimizing Content', position: 4, totalSections: 5, duration: '20 min', description: 'Learn iterative techniques to improve, edit, and optimize your AI-generated content.', hasContent: false },
    { id: 'advanced-workflows', title: 'Advanced ChatGPT Workflows', position: 5, totalSections: 5, duration: '30 min', description: 'Explore advanced workflows combining ChatGPT with other tools for maximum productivity.', hasContent: false },
  ],
  'perplexity-research': [
    { id: 'introduction-perplexity', title: 'Introduction to Perplexity AI', position: 1, totalSections: 5, duration: '15 min', description: 'Get started with Perplexity AI and understand how it revolutionizes research and information gathering.', hasContent: false },
    { id: 'advanced-search', title: 'Advanced Search Techniques', position: 2, totalSections: 5, duration: '22 min', description: 'Master advanced search strategies to find accurate, cited information quickly.', hasContent: false },
    { id: 'research-workflows', title: 'Building Research Workflows', position: 3, totalSections: 5, duration: '28 min', description: 'Create efficient research workflows combining Perplexity with your content creation process.', hasContent: false },
    { id: 'source-verification', title: 'Verifying Sources and Citations', position: 4, totalSections: 5, duration: '18 min', description: 'Learn how to verify sources, check citations, and ensure information accuracy.', hasContent: false },
    { id: 'pro-perplexity-workflow', title: 'Pro Perplexity Workflow', position: 5, totalSections: 5, duration: '25 min', description: 'Master advanced Perplexity workflows for competitive research and market insights.', hasContent: false },
  ],
  'midjourney-design': [
    { id: 'what-is-midjourney', title: 'What is Midjourney & Prompt Engineering', position: 1, totalSections: 5, duration: '18 min', description: 'Understand Midjourney basics and the fundamentals of AI image prompt engineering.', hasContent: false },
    { id: 'prompt-anatomy', title: 'The Anatomy of a Powerful Prompt', position: 2, totalSections: 5, duration: '22 min', description: 'Learn the components that make prompts effective: subject, style, composition, and technical parameters.', hasContent: false },
    { id: 'style-composition', title: 'Controlling Style & Composition', position: 3, totalSections: 5, duration: '25 min', description: 'Master artistic styles, composition techniques, and visual design principles in Midjourney.', hasContent: false },
    { id: 'using-parameters', title: 'Using Midjourney Parameters', position: 4, totalSections: 5, duration: '20 min', description: 'Explore advanced parameters: --ar, --niji, --stylize, --chaos, and quality settings for precise control.', hasContent: false },
    { id: 'pro-prompt-workflow', title: 'Pro Prompt Workflow + Complete Mastery', position: 5, totalSections: 5, duration: '28 min', description: 'Build professional workflows combining all techniques for consistent, high-quality results.', hasContent: false },
  ],
  'buffer-social-media': [
    { id: 'what-is-buffer', title: 'What is Buffer + Why Use AI?', position: 1, totalSections: 5, duration: '12 min', description: 'Introduction to Buffer and how AI amplifies your social media management.', hasContent: false },
    { id: 'creating-posts-ai', title: 'Creating Social Posts with AI', position: 2, totalSections: 5, duration: '15 min', description: 'Generate engaging social content using AI-powered suggestions.', hasContent: false },
    { id: 'scheduling-buffer', title: 'Scheduling with Buffer', position: 3, totalSections: 5, duration: '12 min', description: 'Master Buffer scheduling features for optimal posting times.', hasContent: false },
    { id: 'improving-performance', title: 'Using AI to Improve Performance', position: 4, totalSections: 5, duration: '14 min', description: 'Analyze metrics and use AI insights to enhance your social media strategy.', hasContent: false },
    { id: 'full-automation-workflow', title: 'Full Automation Workflow', position: 5, totalSections: 5, duration: '16 min', description: 'Build end-to-end automated social media workflows with Buffer and AI.', hasContent: false },
  ],
  'github-copilot-coding': [
    { id: 'what-is-github-copilot', title: 'What is GitHub Copilot?', position: 1, totalSections: 4, duration: '12 min', description: 'Introduction to GitHub Copilot and how AI-powered coding assistance accelerates development.', hasContent: false },
    { id: 'writing-code-copilot', title: 'Writing Code with Copilot', position: 2, totalSections: 4, duration: '18 min', description: 'Master using Copilot to write, autocomplete, and generate code faster and smarter.', hasContent: false },
    { id: 'debugging-refactoring-copilot', title: 'Debugging and Refactoring with Copilot', position: 3, totalSections: 4, duration: '16 min', description: 'Use Copilot to identify bugs, refactor code, and improve code quality automatically.', hasContent: true },
    { id: 'pro-workflow-copilot', title: 'Pro Workflow + Wrap-Up', position: 4, totalSections: 4, duration: '14 min', description: 'Build professional coding workflows and master advanced Copilot techniques.', hasContent: true },
  ],
  'ethical-ai-business': [
    { id: 'what-is-ethical-ai', title: 'What Is Ethical AI in Business?', position: 1, totalSections: 5, duration: '15 min', description: 'Understanding ethical AI principles, responsibilities, and business implications.', hasContent: true },
    { id: 'data-privacy-security', title: 'Data Privacy & Security', position: 2, totalSections: 5, duration: '18 min', description: 'Learn how to handle data responsibly and protect user information in AI systems.', hasContent: true },
    { id: 'bias-fairness-ai', title: 'Bias and Fairness in AI', position: 3, totalSections: 5, duration: '20 min', description: 'Identify and mitigate bias in AI models to ensure fair and equitable outcomes.', hasContent: true },
    { id: 'transparency-oversight', title: 'Transparency & Human Oversight', position: 4, totalSections: 5, duration: '17 min', description: 'Implement transparency measures and maintain human control in AI decision-making.', hasContent: true },
    { id: 'ethical-best-practices', title: 'Ethical AI Best Practices', position: 5, totalSections: 5, duration: '19 min', description: 'Apply ethical AI principles and build sustainable responsible AI frameworks.', hasContent: true },
  ],
};

const colorGradients: Record<string, string> = {
  'chatgpt-content-creation': 'from-purple-600 to-pink-600',
  'perplexity-research': 'from-cyan-600 to-blue-600',
  'midjourney-design': 'from-emerald-600 to-teal-600',
  'buffer-social-media': 'from-violet-600 to-purple-600',
  'github-copilot-coding': 'from-indigo-600 to-purple-600',
  'ethical-ai-business': 'from-purple-600 to-violet-600',
};

// YouTube video URLs - Add video links here
const videoData: Record<string, string | null> = {
  // ChatGPT sections
  'getting-started-chatgpt': 'https://www.youtube.com/embed/sbns0957-ps',
  'writing-prompts': 'https://www.youtube.com/embed/BX5c7bxESk0',
  'content-types': 'https://www.youtube.com/embed/PaMhfCW1SE0',
  'refining-content': 'https://www.youtube.com/embed/jw0gVPJaN94',
  'advanced-workflows': null,
  // Perplexity sections
  'introduction-perplexity': null,
  'advanced-search': null,
  'research-workflows': null,
  'source-verification': null,
  'pro-perplexity-workflow': null,
  // Midjourney sections
  'what-is-midjourney': null,
  'prompt-anatomy': null,
  'style-composition': null,
  'using-parameters': null,
  'pro-prompt-workflow': null,
  // Buffer sections
  'what-is-buffer': null,
  'creating-posts-ai': null,
  'scheduling-buffer': null,
  'improving-performance': null,
  'full-automation-workflow': null,
  // GitHub Copilot sections
  'what-is-github-copilot': null,
  'writing-code-copilot': null,
  'debugging-refactoring-copilot': null,
  'pro-workflow-copilot': null,
  // Ethical AI sections
  'what-is-ethical-ai': null,
  'data-privacy-security': null,
  'bias-fairness-ai': null,
  'transparency-oversight': null,
  'ethical-best-practices': null,
};

const getPreviousSectionId = (slug: string, currentPosition: number): string | null => {
  const sections = sectionData[slug];
  if (!sections) return null;
  const prev = sections.find(s => s.position === currentPosition - 1);
  return prev?.id || null;
};

const getNextSectionId = (slug: string, currentPosition: number): string | null => {
  const sections = sectionData[slug];
  if (!sections) return null;
  const next = sections.find(s => s.position === currentPosition + 1);
  return next?.id || null;
};

function TutorialSectionPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const sectionId = params?.['section'] as string;

  const tutorialSections = sectionData[slug];
  const section = tutorialSections?.find(s => s.id === sectionId);

  if (!section) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Section Not Found</h1>
          <Link href={`/tutorials/${slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Tutorial
          </Link>
        </div>
      </div>
    );
  }

  const previousSectionId = getPreviousSectionId(slug, section.position);
  const nextSectionId = getNextSectionId(slug, section.position);
  const gradientClass = colorGradients[slug] || 'from-blue-600 to-cyan-600';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradientClass} text-white py-8 px-4 md:px-8`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-4 opacity-90">
            <Link href={`/tutorials/${slug}`} className="hover:opacity-75">Tutorial</Link>
            <span>/</span>
            <span>{section.title}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{section.title}</h1>
          <p className="text-lg opacity-90 mb-4">{section.description}</p>
          <div className="flex items-center justify-between">
            <div className="text-sm">{section.position} / {section.totalSections} sections</div>
            <div className="flex items-center gap-2">
              <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${(section.position / section.totalSections) * 100}%` }}></div>
              </div>
              <span className="text-sm ml-2">{Math.round((section.position / section.totalSections) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* Video Description */}
        <div className="mb-12 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg">
          <p className="text-blue-900 dark:text-blue-200 text-base">
            This video shows you the <span className="font-semibold">how</span> — the written lesson explains the <span className="font-semibold">why</span>. For best results, enjoy both!
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {videoData[sectionId] ? (
            <div className="aspect-video bg-black">
              <iframe
                className="rounded-lg shadow-2xl"
                width="100%"
                height="100%"
                src={videoData[sectionId]}
                title={section.title}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-20 h-20 mx-auto mb-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Video coming soon</p>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="space-y-12">
          {courseContentData[`${slug}/${sectionId}`] ? (
            <CourseContent courseData={courseContentData[`${slug}/${sectionId}`]} gradientClass={gradientClass} />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Coming Soon</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">This section is being prepared with comprehensive learning materials. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          {previousSectionId ? (
            <button
              onClick={() => router.push(`/tutorials/${slug}/${previousSectionId}`)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>
          ) : (
            <div></div>
          )}

          <span className="text-sm text-gray-600 dark:text-gray-400">
            {section.position} / {section.totalSections}
          </span>

          {nextSectionId ? (
            <button
              onClick={() => router.push(`/tutorials/${slug}/${nextSectionId}`)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          ) : (
            <div></div>
          )}
        </div>

        {/* Back to Tutorial */}
        <div className="mt-8 text-center">
          <Link
            href={`/tutorials/${slug}`}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            ← Back to Tutorial
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TutorialSectionPage;
