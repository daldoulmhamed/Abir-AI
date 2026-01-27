'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CheckCircle2, AlertCircle, Lightbulb, BookOpen } from 'lucide-react';

interface ModuleContentProps {
  content: string;
}

export default function ModuleContent({ content }: ModuleContentProps) {
  if (!content || content.length === 0) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">No Content Available</h3>
        <p className="text-yellow-700 dark:text-yellow-400">The module content could not be loaded.</p>
      </div>
    );
  }
  
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 md:p-12">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Headings
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl font-bold mt-8 mb-6 text-gray-900 dark:text-white border-b-2 border-blue-600 pb-4" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100" {...props} />
            ),
            h4: ({ node, ...props }) => (
              <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100" {...props} />
            ),
            
            // Paragraphs
            p: ({ node, children, ...props }) => {
              const text = String(children);
              
              // Check for special formatting
              if (text.startsWith('✅')) {
                return (
                  <div className="flex items-start gap-2 my-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-300 m-0" {...props}>{children}</p>
                  </div>
                );
              }
              
              if (text.startsWith('❌')) {
                return (
                  <div className="flex items-start gap-2 my-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-300 m-0" {...props}>{children}</p>
                  </div>
                );
              }
              
              if (text.startsWith('💡')) {
                return (
                  <div className="flex items-start gap-2 my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-300 m-0" {...props}>{children}</p>
                  </div>
                );
              }
              
              return <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props}>{children}</p>;
            },
            
            // Lists
            ul: ({ node, ...props }) => (
              <ul className="my-6 space-y-2 list-disc list-inside" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="my-6 space-y-2 list-decimal list-inside" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="text-gray-700 dark:text-gray-300 ml-4" {...props} />
            ),
            
            // Code blocks
            code: ({ node, inline, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              
              return !inline && match ? (
                <div className="my-6 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 text-gray-300 text-sm font-mono">
                    {language}
                  </div>
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      fontSize: '0.9rem',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              );
            },
            
            // Blockquotes
            blockquote: ({ node, ...props }) => (
              <blockquote className="my-6 pl-4 border-l-4 border-blue-600 italic text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 py-4 pr-4 rounded-r" {...props} />
            ),
            
            // Tables
            table: ({ node, ...props }) => (
              <div className="my-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg" {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-gray-50 dark:bg-gray-800" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700" {...props} />
            ),
            
            // Links
            a: ({ node, ...props }) => (
              <a className="text-blue-600 dark:text-blue-400 hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />
            ),
            
            // Horizontal rule
            hr: ({ node, ...props }) => (
              <hr className="my-12 border-t-2 border-gray-200 dark:border-gray-700" {...props} />
            ),
            
            // Strong/Bold
            strong: ({ node, ...props }) => (
              <strong className="font-bold text-gray-900 dark:text-white" {...props} />
            ),
            
            // Emphasis/Italic
            em: ({ node, ...props }) => (
              <em className="italic text-gray-800 dark:text-gray-200" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
