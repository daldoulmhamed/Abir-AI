'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Module {
  id: number;
  slug: string;
  title: string;
}

interface ModuleNavigationProps {
  currentModuleId: number;
  prevModule: Module | null;
  nextModule: Module | null;
  isLastModule: boolean;
}

export default function ModuleNavigation({ 
  currentModuleId, 
  prevModule, 
  nextModule,
  isLastModule 
}: ModuleNavigationProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Check if module is marked as completed in localStorage
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    setCompleted(completedModules.includes(currentModuleId));
  }, [currentModuleId]);

  const handleMarkComplete = () => {
    const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
    
    if (!completedModules.includes(currentModuleId)) {
      completedModules.push(currentModuleId);
      localStorage.setItem('completedModules', JSON.stringify(completedModules));
      setCompleted(true);
    }
  };

  return (
    <div className="mt-12 space-y-6">
      {/* Mark as Complete Button */}
      {!completed && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Finished this module? Mark it as complete to track your progress.
          </p>
          <button
            onClick={handleMarkComplete}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Award className="w-5 h-5" />
            Mark Module {currentModuleId} Complete
          </button>
        </div>
      )}

      {completed && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
            <Award className="w-6 h-6" />
            <span className="font-semibold">Module {currentModuleId} Completed! 🎉</span>
          </div>
        </div>
      )}

      {/* Last Module CTA */}
      {isLastModule && completed && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            Congratulations! You've Completed All Modules 🎓
          </h3>
          <p className="mb-6 opacity-90 max-w-2xl mx-auto">
            You've mastered AI productivity across all 7 modules. Ready to earn your official certification?
          </p>
          <Link
            href="/certifications/generative-ai-practitioner"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <Award className="w-5 h-5" />
            Get Certified – Optional Exam
          </Link>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
        {prevModule ? (
          <Link
            href={`/learn/generative-ai-practitioner/${prevModule.slug}`}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-gray-500 dark:text-gray-400">Previous</div>
              <div className="text-sm">Module {prevModule.id}</div>
            </div>
          </Link>
        ) : (
          <Link
            href="/learn/generative-ai-practitioner"
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Overview</span>
          </Link>
        )}

        {nextModule ? (
          <Link
            href={`/learn/generative-ai-practitioner/${nextModule.slug}`}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors group"
          >
            <div className="text-right">
              <div className="text-xs opacity-90">Next</div>
              <div className="text-sm">Module {nextModule.id}</div>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <Link
            href="/learn/generative-ai-practitioner"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-colors"
          >
            <span>View All Modules</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        )}
      </div>

      {/* Quick Links */}
      <div className="text-center pt-4">
        <Link
          href="/learn/generative-ai-practitioner"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Learning Path Overview
        </Link>
      </div>
    </div>
  );
}
