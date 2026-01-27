'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProgressTrackerProps {
  currentModule: number;
  totalModules: number;
  moduleTitle: string;
}

export default function ProgressTracker({ 
  currentModule, 
  totalModules, 
  moduleTitle 
}: ProgressTrackerProps) {
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const completed = JSON.parse(localStorage.getItem('completedModules') || '[]');
    setCompletedModules(completed);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  const completionPercentage = (completedModules.length / totalModules) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span className="font-medium">Your Progress</span>
              <span>•</span>
              <span>{completedModules.length} of {totalModules} modules completed</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(completionPercentage)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Complete
            </div>
          </div>
        </div>

        {/* Module Indicators */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {Array.from({ length: totalModules }, (_, i) => i + 1).map((moduleNum) => {
            const isCompleted = completedModules.includes(moduleNum);
            const isCurrent = moduleNum === currentModule;

            return (
              <div
                key={moduleNum}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  isCurrent
                    ? 'bg-blue-600 text-white'
                    : isCompleted
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <Circle className="w-3 h-3" />
                )}
                <span>M{moduleNum}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
