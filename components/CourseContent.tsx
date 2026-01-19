'use client';

import { CourseData } from '@/data/courseContent';
import { BookOpen, CheckCircle2, Lightbulb, Zap, Target, MessageSquare } from 'lucide-react';

interface CourseContentProps {
  courseData: CourseData;
  gradientClass: string;
}

export default function CourseContent({ courseData, gradientClass }: CourseContentProps) {
  return (
    <div className="space-y-12">
      {/* Course Overview */}
      <div className={`bg-gradient-to-r ${gradientClass} rounded-2xl p-8 md:p-12 text-white shadow-xl`}>
        <div className="flex items-start gap-4 mb-6">
          <BookOpen className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{courseData.courseTitle}</h2>
            <p className="text-white/90 text-lg leading-relaxed">
              {courseData.metaDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="space-y-8">
        {courseData.modules.map((module, moduleIdx) => (
          <div key={module.id} className="space-y-6">
            {/* Module Header */}
            <div className="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 pl-6 mb-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                    Module {moduleIdx + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {module.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-3">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">Learning outcome:</span> {module.learningOutcome}
              </p>
            </div>

            {/* Lessons */}
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {module.lessons.map((lesson, lessonIdx) => (
                <div
                  key={lesson.id}
                  className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                >
                  {/* Lesson Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <span className="text-blue-700 dark:text-blue-300 font-bold text-lg">
                        {lessonIdx + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {lesson.title}
                      </h4>
                    </div>
                  </div>

                  {/* Lesson Content */}
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {lesson.content}
                    </p>

                    {/* Summary Box */}
                    {lesson.summary && (
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 pl-4 py-3 rounded">
                        <p className="text-emerald-900 dark:text-emerald-200 text-sm font-medium">
                          💡 <span className="font-semibold">Quick summary:</span> {lesson.summary}
                        </p>
                      </div>
                    )}

                    {/* Problem-Solution Box */}
                    {lesson.problem && lesson.solution && (
                      <div className="space-y-2 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 pl-4 py-3 rounded">
                        <p className="text-orange-900 dark:text-orange-200 text-sm">
                          <span className="font-semibold">⚠️ Problem:</span> {lesson.problem}
                        </p>
                        <p className="text-orange-900 dark:text-orange-200 text-sm">
                          <span className="font-semibold">✅ Solution:</span> {lesson.solution}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Interactive Elements */}
                  <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {lesson.handsOn && (
                      <div className="flex gap-3 items-start">
                        <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                            Hands-On
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{lesson.handsOn}</p>
                        </div>
                      </div>
                    )}

                    {lesson.action && (
                      <div className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                            Action
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{lesson.action}</p>
                        </div>
                      </div>
                    )}

                    {lesson.exercise && (
                      <div className="flex gap-3 items-start">
                        <Target className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                            Exercise
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{lesson.exercise}</p>
                        </div>
                      </div>
                    )}

                    {lesson.reflection && (
                      <div className="flex gap-3 items-start">
                        <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                            Reflection
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{lesson.reflection}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA & Expansion */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Next Steps */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Continue Learning</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {courseData.expansionIdeas}
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
            Explore Advanced Courses →
          </button>
        </div>

        {/* SEO Notes */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Content Structure</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
            {courseData.seoNotes}
          </p>
        </div>
      </div>

      {/* Completion Tracker */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Learning Progress</h3>
        <div className="space-y-3">
          {courseData.modules.map((module, idx) => (
            <div key={module.id} className="flex items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {module.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {module.lessons.length} lessons
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
