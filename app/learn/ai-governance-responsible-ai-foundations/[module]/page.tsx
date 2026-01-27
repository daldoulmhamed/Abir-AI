'use server';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

interface ModulePageProps {
  params: Promise<{
    module: string;
  }>;
}

const modules = [
  { id: 'module-1', slug: 'module-1', title: 'AI Ethics & Principles', file: 'module-1-ai-ethics-principles.md' },
  { id: 'module-2', slug: 'module-2', title: 'Bias Detection & Mitigation', file: 'module-2-bias-detection-mitigation.md' },
  { id: 'module-3', slug: 'module-3', title: 'AI Security & Privacy', file: 'module-3-ai-security-privacy.md' },
  { id: 'module-4', slug: 'module-4', title: 'Regulatory Compliance (GDPR, AI Act)', file: 'module-4-regulatory-compliance-gdpr-ai-act.md' },
  { id: 'module-5', slug: 'module-5', title: 'Responsible AI Frameworks', file: 'module-5-responsible-ai-frameworks.md' },
  { id: 'module-6', slug: 'module-6', title: 'Best Practices & Standards', file: 'module-6-best-practices-standards.md' }
];

async function getModuleContent(moduleSlug: string) {
  const module = modules.find(m => m.slug === moduleSlug);
  if (!module) return null;

  const filePath = path.join(
    process.cwd(),
    'docs',
    'certifications',
    'ai-governance-responsible-ai-foundations',
    module.file
  );

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading module file: ${filePath}`, error);
    return null;
  }
}

export default async function ModulePage({ params }: ModulePageProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/learn/ai-governance-responsible-ai-foundations"
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Course Overview
            </Link>
          </div>

          {/* Module Header */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
            <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400 mb-4">
              <BookOpen className="w-6 h-6" />
              <span className="font-semibold">Module {currentIndex + 1} of {modules.length}</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {currentModule.title}
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
            <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-code:text-purple-600 dark:prose-code:text-purple-400 prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:shadow-xl">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: ({ node, inline, className, children, ...props }: any) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
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
            </article>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between gap-4">
            {prevModule ? (
              <Link
                href={`/learn/ai-governance-responsible-ai-foundations/${prevModule.slug}`}
                className="flex items-center gap-2 bg-white dark:bg-slate-800 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Previous</div>
                  <div className="font-semibold text-slate-900 dark:text-white">{prevModule.title}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {nextModule ? (
              <Link
                href={`/learn/ai-governance-responsible-ai-foundations/${nextModule.slug}`}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="text-right">
                  <div className="text-xs text-purple-100">Next</div>
                  <div className="font-semibold">{nextModule.title}</div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href="/certifications/ai-governance-responsible-ai-foundations"
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="text-right">
                  <div className="text-xs text-green-100">Complete</div>
                  <div className="font-semibold">Get Certified</div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
