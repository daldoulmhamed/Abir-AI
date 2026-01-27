import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const modules = [
  { slug: 'introduction-to-github-copilot', title: 'Introduction to GitHub Copilot', order: 1 },
  { slug: 'advanced-copilot-techniques', title: 'Advanced Copilot Techniques', order: 2 },
  { slug: 'ai-assisted-development-workflows', title: 'AI-Assisted Development Workflows', order: 3 },
  { slug: 'team-collaboration-code-quality', title: 'Team Collaboration & Code Quality', order: 4 },
  { slug: 'no-code-automation', title: 'No-Code & Automation with AI', order: 5 },
  { slug: 'advanced-integration-best-practices', title: 'Advanced Integration & Best Practices', order: 6 }
];

interface PageProps {
  params: Promise<{ module: string }>;
}

export async function generateStaticParams() {
  return modules.map((module) => ({
    module: module.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { module: moduleSlug } = await params;
  const module = modules.find(m => m.slug === moduleSlug);
  
  if (!module) {
    return {
      title: 'Module Not Found | Abir-AI',
    };
  }

  return {
    title: `${module.title} | AI Productivity & GitHub Copilot | Abir-AI`,
    description: `Learn ${module.title.toLowerCase()} in the AI Productivity & GitHub Copilot certification course.`,
  };
}

async function getModuleContent(moduleSlug: string) {
  const moduleMap: Record<string, string> = {
    'introduction-to-github-copilot': 'module-1-introduction-to-github-copilot',
    'advanced-copilot-techniques': 'module-2-advanced-copilot-techniques',
    'ai-assisted-development-workflows': 'module-3-ai-assisted-development-workflows',
    'team-collaboration-code-quality': 'module-4-team-collaboration-code-quality',
    'no-code-automation': 'module-5-no-code-automation',
    'advanced-integration-best-practices': 'module-6-advanced-integration-best-practices'
  };

  const fileName = moduleMap[moduleSlug];
  if (!fileName) return null;

  const filePath = path.join(
    process.cwd(),
    'docs',
    'certifications',
    'ai-productivity-github-copilot',
    `${fileName}.md`
  );

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading module file: ${filePath}`, error);
    return null;
  }
}

export default async function ModulePage({ params }: PageProps) {
  const { module: moduleSlug } = await params;
  
  const currentModule = modules.find(m => m.slug === moduleSlug);
  if (!currentModule) {
    notFound();
  }

  const content = await getModuleContent(moduleSlug);
  if (!content) {
    notFound();
  }

  const currentIndex = modules.findIndex(m => m.slug === moduleSlug);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <Link 
              href="/learn/ai-productivity-github-copilot"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Modules
            </Link>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Module {currentModule.order} of {modules.length}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8">
            {/* Module Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                <BookOpen className="w-4 h-4" />
                Module {currentModule.order}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {currentModule.title}
              </h1>
            </div>

            {/* Markdown Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
              prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-b prose-h2:pb-2 prose-h2:border-gray-200 dark:prose-h2:border-gray-700
              prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
              prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:my-2
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
              prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-0 prose-pre:rounded-lg prose-pre:overflow-hidden
              prose-img:rounded-lg prose-img:shadow-md
              prose-hr:border-gray-200 dark:prose-hr:border-gray-700 prose-hr:my-8
              prose-table:border-collapse prose-table:w-full
              prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-3 prose-th:text-left prose-th:font-semibold
              prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700 prose-td:p-3"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeString = String(children).replace(/\n$/, '');
                    
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-lg"
                        customStyle={{
                          margin: '1.5rem 0',
                          padding: '1.5rem',
                          fontSize: '0.9rem',
                          lineHeight: '1.6'
                        }}
                        {...props}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevModule ? (
            <Link
              href={`/learn/ai-productivity-github-copilot/${prevModule.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Previous</div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {prevModule.title}
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div></div>
          )}

          {nextModule ? (
            <Link
              href={`/learn/ai-productivity-github-copilot/${nextModule.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors md:text-right"
            >
              <div className="flex items-center justify-end gap-3">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Next</div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {nextModule.title}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
            </Link>
          ) : (
            <Link
              href="/certifications/ai-productivity-github-copilot"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-lg p-6 text-white md:text-right hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-end gap-3">
                <div>
                  <div className="text-sm text-blue-100">Completed?</div>
                  <div className="font-semibold text-white">
                    Get Certified
                  </div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Course Progress
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentModule.order} / {modules.length} modules
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${(currentModule.order / modules.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
