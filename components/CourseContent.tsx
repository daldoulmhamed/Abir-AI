'use client';

import { CourseData } from '@/data/courseContent';
import { BookOpen, CheckCircle2, Lightbulb, Zap, Target, MessageSquare, Sparkles, ArrowRight, Code2 } from 'lucide-react';
import { useState } from 'react';

interface CourseContentProps {
  courseData: CourseData;
  gradientClass: string;
}

export default function CourseContent({ courseData, gradientClass }: CourseContentProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  return (
    <div className="space-y-12">
      {/* Course Overview - Premium Hero Section */}
      <div className={`bg-gradient-to-br ${gradientClass} rounded-2xl p-8 md:p-12 text-white shadow-2xl overflow-hidden relative`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">{courseData.courseTitle}</h2>
              <p className="text-white/90 text-lg leading-relaxed max-w-3xl">
                {courseData.metaDescription}
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  <Code2 className="w-4 h-4" />
                  {courseData.modules.length} Modules
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Learn at Your Pace
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid - Enhanced */}
      <div className="space-y-8">
        {courseData.modules.map((module, moduleIdx) => (
          <div key={module.id} className="space-y-4">
            {/* Module Header - Enhanced with Accordion */}
            <div 
              onClick={() => toggleModule(module.id)}
              className="group bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 rounded-xl p-6 md:p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg">
                      {moduleIdx + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                      {module.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-3 ml-13">
                    <Target className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{module.learningOutcome}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 ml-13">
                    {module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center transition-transform duration-300 ${expandedModules.has(module.id) ? 'rotate-180' : ''}`}>
                  <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            {/* Lessons - Expanded */}
            {expandedModules.has(module.id) && (
              <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-1 pl-0 md:pl-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {module.lessons.map((lesson, lessonIdx) => (
                  <div
                    key={lesson.id}
                    className="group bg-white dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-700 rounded-xl p-6 md:p-7 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Lesson Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                        <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          {lessonIdx + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {lesson.title}
                        </h4>
                      </div>
                    </div>

                    {/* Lesson Content - Beautiful Formatting */}
                    <div className="space-y-6 mb-8 ml-14">
                      {/* Main Content */}
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {lesson.content}
                        </p>
                      </div>

                      {/* Summary Box - Premium */}
                      {lesson.summary && (
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-4 border-emerald-500 pl-5 py-5 pr-5 rounded-lg backdrop-blur-sm">
                          <p className="text-emerald-900 dark:text-emerald-200 text-base leading-relaxed">
                            <span className="font-bold mr-2">💡 Quick Summary:</span>
                            {lesson.summary}
                          </p>
                        </div>
                      )}

                      {/* Problem-Solution Box */}
                      {lesson.problem && lesson.solution && (
                        <div className="space-y-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-l-4 border-orange-500 pl-5 py-5 pr-5 rounded-lg backdrop-blur-sm">
                          <div>
                            <p className="text-orange-900 dark:text-orange-200 text-base leading-relaxed">
                              <span className="font-bold">⚠️ Challenge:</span> {lesson.problem}
                            </p>
                          </div>
                          <div>
                            <p className="text-orange-900 dark:text-orange-200 text-base leading-relaxed">
                              <span className="font-bold">✅ Solution:</span> {lesson.solution}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Interactive Elements - Premium Cards */}
                    <div className="space-y-4 pt-6 border-t-2 border-gray-100 dark:border-gray-700 ml-14">
                      {lesson.handsOn && (
                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg p-5 border border-amber-200 dark:border-amber-800 hover:shadow-md transition-all">
                          <div className="flex gap-3">
                            <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-semibold text-amber-900 dark:text-amber-200 text-base mb-2">
                                🚀 Hands-On Practice
                              </p>
                              <p className="text-amber-800 dark:text-amber-300 text-base leading-relaxed">{lesson.handsOn}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {lesson.action && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-5 border border-green-200 dark:border-green-800 hover:shadow-md transition-all">
                          <div className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-semibold text-green-900 dark:text-green-200 text-base mb-2">
                                ✨ Action Item
                              </p>
                              <p className="text-green-800 dark:text-green-300 text-base leading-relaxed">{lesson.action}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {lesson.exercise && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-5 border border-purple-200 dark:border-purple-800 hover:shadow-md transition-all">
                          <div className="flex gap-3">
                            <Target className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-semibold text-purple-900 dark:text-purple-200 text-base mb-2">
                                💪 Exercise
                              </p>
                              <p className="text-purple-800 dark:text-purple-300 text-base leading-relaxed">{lesson.exercise}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {lesson.reflection && (
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-5 border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all">
                          <div className="flex gap-3">
                            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-semibold text-blue-900 dark:text-blue-200 text-base mb-2">
                                🤔 Reflection
                              </p>
                              <p className="text-blue-800 dark:text-blue-300 text-base leading-relaxed">{lesson.reflection}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>


    </div>
  );
}
