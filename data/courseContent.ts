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
  'chatgpt-content-creation/getting-started-chatgpt': {
    courseTitle: 'Getting Started with ChatGPT: A Beginner\'s Hands-On Guide',
    metaTitle: 'Getting Started with ChatGPT for Beginners | Step-by-Step Tutorial (2026)',
    metaDescription: 'New to ChatGPT? Learn how to sign up, navigate the interface, craft your first prompts, and apply it practically in this quick 3-5 minute beginner tutorial. Build core skills fast—no experience needed.',
    modules: [
      {
        id: 'chatgpt-fundamentals',
        title: 'ChatGPT Fundamentals',
        learningOutcome: 'Understand what ChatGPT is and how to access it.',
        lessons: [
          {
            id: 'what-is-chatgpt',
            title: 'What is ChatGPT?',
            content: 'ChatGPT is an AI chatbot from OpenAI that generates human-like text responses to user prompts, powered by large language models like GPT. Beginners use it for tasks such as writing ideas, answering questions, or summarizing text.',
            handsOn: 'Reflect: What everyday task could this simplify for you?'
          },
          {
            id: 'free-vs-paid-access',
            title: 'Free vs. Paid Access',
            content: 'The free version uses GPT-3.5 for basic needs, while paid ChatGPT Plus ($20/month) offers GPT-4o for better accuracy, faster responses, and extras like image analysis. Start free to build skills without commitment.',
            summary: 'Free suits learning; upgrade for heavy use.'
          }
        ]
      },
      {
        id: 'first-steps-interface',
        title: 'First Steps in the Interface',
        learningOutcome: 'Navigate confidently and start your first conversation.',
        lessons: [
          {
            id: 'signing-up-logging-in',
            title: 'Signing Up and Logging In',
            content: 'Visit chatgpt.com, click "Sign up," and use email or Google for a free account—no credit card needed. Log in to access the clean chat window.',
            action: 'Create your account now and note your login details.'
          },
          {
            id: 'exploring-chat-interface',
            title: 'Exploring the Chat Interface',
            content: 'The screen shows a conversation area, prompt box at the bottom, and sidebar for chats; regenerate or edit responses as needed. Settings allow custom instructions for personalized replies.',
            handsOn: 'Open ChatGPT and type "Hello" to see the response flow.'
          }
        ]
      },
      {
        id: 'crafting-prompts',
        title: 'Crafting Prompts and Basic Applications',
        learningOutcome: 'Create effective prompts and generate useful outputs.',
        lessons: [
          {
            id: 'writing-your-first-prompt',
            title: 'Writing Your First Prompt',
            content: 'Prompts are clear instructions like "Explain photosynthesis simply"—add context for better results, e.g., "for a 10-year-old." Use roles like "Act as a teacher" to guide outputs.',
            exercise: 'Prompt: "List 3 beginner tips for [your interest]." Refine if needed.'
          },
          {
            id: 'simple-use-cases',
            title: 'Simple Use Cases and Next Steps',
            content: 'Generate ideas (e.g., recipes), summarize articles, or translate text; always fact-check as AI can hallucinate. Problem: Vague prompts yield poor results. Solution: Be specific for targeted outcomes.',
            reflection: 'Try summarizing a news headline—what worked well?'
          }
        ]
      }
    ],
    seoNotes: 'H1: Course title; H2: Modules; H3: Lessons for scannable hierarchy. Short paragraphs, bullets, and actions boost engagement and dwell time. Topic clusters ensure semantic depth without repetition, aligning with E-E-A-T via cited examples and practical exercises. FAQ optional: "Is ChatGPT free?" (Yes, basics are).',
    expansionIdeas: 'Expand to "Intermediate Prompt Engineering" or "ChatGPT for [Industry]" paths. Content upgrade: Free "10 Beginner Prompts Checklist" PDF for email capture. Soft CTA: "Practice these skills, then explore our advanced AI tools course." Guides users naturally to deeper learning or premium resources like tool integrations.'
  }
};
