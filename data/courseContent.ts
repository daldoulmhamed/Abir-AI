export interface CourseModule {
  id: string;
  title: string;
  learningOutcome: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  handsOn?: string;
  summary?: string;
  action?: string;
  exercise?: string;
  reflection?: string;
  problem?: string;
  solution?: string;
}

export interface CourseData {
  courseTitle: string;
  metaTitle: string;
  metaDescription: string;
  modules: CourseModule[];
  seoNotes?: string;
  expansionIdeas?: string;
}

export const courseContentData: Record<string, CourseData> = {
};
