import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import ModuleContent from '@/components/certifications/ModuleContent';
import ModuleNavigation from '@/components/certifications/ModuleNavigation';
import ProgressTracker from '@/components/certifications/ProgressTracker';

const modules = [
  {
    id: 1,
    slug: 'module-1',
    title: 'Introduction to Generative AI & AI Tools',
    file: 'module-1-intro-to-generative-ai.md',
    duration: '2-5 hours',
    lessons: 3
  },
  {
    id: 2,
    slug: 'module-2',
    title: 'AI for Writing & Content Creation',
    file: 'module-2-writing-content-creation.md',
    duration: '3-6 hours',
    lessons: 3
  },
  {
    id: 3,
    slug: 'module-3',
    title: 'AI for Communication & Collaboration',
    file: 'module-3-communication-collaboration.md',
    duration: '3-5 hours',
    lessons: 3
  },
  {
    id: 4,
    slug: 'module-4',
    title: 'AI for Data Analysis & Visualization',
    file: 'module-4-data-analysis-visualization.md',
    duration: '3-6 hours',
    lessons: 3
  },
  {
    id: 5,
    slug: 'module-5',
    title: 'AI for Coding & Development',
    file: 'module-5-coding-development.md',
    duration: '4-7 hours',
    lessons: 3
  },
  {
    id: 6,
    slug: 'module-6',
    title: 'Building AI-Enhanced Workflows',
    file: 'module-6-ai-enhanced-workflows.md',
    duration: '3-6 hours',
    lessons: 3
  },
  {
    id: 7,
    slug: 'module-7',
    title: 'Ethics, Best Practices & Future Trends',
    file: 'module-7-ethics-best-practices-future.md',
    duration: '2-4 hours',
    lessons: 3
  }
];

type Props = {
  params: { module: string }
};

export async function generateStaticParams() {
  return modules.map((module) => ({
    module: module.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const module = modules.find(m => m.slug === resolvedParams.module);
  
  if (!module) {
    return {
      title: 'Module Not Found | Abir-AI',
    };
  }

  return {
    title: `${module.title} | Generative AI Practitioner | Abir-AI`,
    description: `Learn ${module.title} in this comprehensive module. Duration: ${module.duration}.`,
  };
}

async function getModuleContent(filename: string): Promise<string> {
  const filePath = path.join(process.cwd(), 'docs', 'certifications', 'ai-productivity-practitioner', filename);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading module file: ${filename}`, error);
    return '';
  }
}

export default async function ModulePage({ params }: Props) {
  const resolvedParams = await params;
  const currentModule = modules.find(m => m.slug === resolvedParams.module);
  
  if (!currentModule) {
    notFound();
  }

  const content = await getModuleContent(currentModule.file);
  
  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Content Not Available</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Unable to load module content. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const prevModule = currentModule.id > 1 ? modules[currentModule.id - 2] : null;
  const nextModule = currentModule.id < modules.length ? modules[currentModule.id] : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Progress Bar */}
      <ProgressTracker 
        currentModule={currentModule.id}
        totalModules={modules.length}
        moduleTitle={currentModule.title}
      />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
              Module {currentModule.id} of {modules.length}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentModule.duration}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {currentModule.title}
          </h1>

          {/* Progress Indicator */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentModule.id / modules.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Module Content */}
        <ModuleContent content={content} />

        {/* Navigation */}
        <ModuleNavigation
          currentModuleId={currentModule.id}
          prevModule={prevModule}
          nextModule={nextModule}
          isLastModule={currentModule.id === modules.length}
        />
      </main>
    </div>
  );
}
