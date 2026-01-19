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
  },
  'chatgpt-content-creation/writing-prompts': {
    courseTitle: 'Crafting Effective Prompts: Master the Art of AI Instruction',
    metaTitle: 'Crafting Effective Prompts for ChatGPT | Beginner Guide (2026)',
    metaDescription: 'Learn the fundamentals of effective prompt writing. Master clarity, structure, and precision to unlock the full potential of ChatGPT in 20 minutes.',
    modules: [
      {
        id: 'understanding-prompts',
        title: 'Understanding Prompts',
        learningOutcome: 'By the end of this module, you\'ll grasp what prompts are, why they matter, and how precision transforms AI interactions.',
        lessons: [
          {
            id: 'what-is-prompt',
            title: 'What Is a Prompt?',
            content: 'A prompt serves as your instruction to an AI model, like ChatGPT or Claude, telling it exactly what to do and how to respond. Think of it as giving directions to a highly capable assistant—vague instructions lead to wandering results, while clear ones deliver precise value. This foundation prevents common frustrations for beginners in AI prompt writing.',
            handsOn: 'Real-World Example:\n- Vague: "Tell me about cats."\n- Clear: "List 3 fun facts about Siamese cats for kids aged 8-10."\nThe second yields focused, useful output every time.',
            exercise: 'Write a one-sentence prompt for a task you face daily, like summarizing an email. Then rewrite it with one added detail for specificity. Test both in your favorite AI tool and note the difference.',
            summary: 'Prompts bridge your intent and AI capability—start simple, add clarity for better results.'
          },
          {
            id: 'how-ai-interprets',
            title: 'How AI Interprets Your Words',
            content: 'AI models process prompts by breaking them into tokens (word chunks), prioritizing the first instructions, and filling gaps with patterns from training data. Without structure, it defaults to generic responses; with it, you control depth, tone, and format. This understanding helps beginners avoid misaligned outputs in prompt engineering for beginners.',
            handsOn: 'Practical Scenario:\nYou\'re planning a trip from Grasse, France.\n- Weak prompt: "Vacation ideas."\n- Strong prompt: "Suggest a 3-day itinerary from Grasse to nearby lavender fields, including budget-friendly spots under €100/day, family-friendly activities."\nAI now delivers tailored plans instead of broad lists.',
            exercise: 'Pick a real task (e.g., recipe ideas). Craft a basic prompt, then enhance it with context like "vegetarian, 20 minutes prep, 2 servings." Compare AI responses side-by-side.',
            summary: 'AI follows your lead—structure your words to shape reliable, relevant replies.',
            reflection: 'What daily task could better prompts improve for you right now?'
          }
        ]
      }
    ],
    seoNotes: 'H1: Course title; H2: Modules; H3: Lessons for scannable hierarchy. Use comparison tables for vague vs. clear prompts. Hands-on exercises with real examples boost engagement and practical learning.',
    expansionIdeas: 'Create follow-up modules on "Advanced Prompt Techniques," "Prompts for Specific Industries," and "Custom Instructions." Offer downloadable "Prompt Starter Worksheet" with 5 templates for email capture. Link to tool-specific guides like ChatGPT prompt examples.'
  },
  'chatgpt-content-creation/content-types': {
    courseTitle: 'Creating Blog Posts with ChatGPT: A Beginner\'s Guide to Smart AI Writing',
    metaTitle: 'Learn to Create Blog Posts with ChatGPT – Step‑by‑Step Writing Guide for Beginners',
    metaDescription: 'Learn how to plan, write, and optimize blog posts using ChatGPT. This quick beginner\'s course teaches prompt design, editing strategies, and SEO‑friendly AI writing techniques that help you create original, engaging content fast.',
    modules: [
      {
        id: 'understanding-chatgpt-blogging',
        title: 'Understanding ChatGPT for Blogging',
        learningOutcome: 'Understand ChatGPT\'s capabilities and limitations for blog writing, and how it fits into your workflow.',
        lessons: [
          {
            id: 'what-chatgpt-can-do',
            title: 'What ChatGPT Can Do for You',
            content: 'ChatGPT is an AI language model that can generate ideas, outlines, and full blog drafts based on your instructions. It accelerates research, brainstorming, and early drafting, freeing you to focus on creativity and storytelling.\n\nWhat It Can\'t Do: It doesn\'t understand context the way humans do and can produce errors, clichés, or generic phrasing. The secret to success is maintaining editorial control — using ChatGPT as your assistant, not a substitute for your judgment.\n\nHow It Fits into Your Workflow:\n• Idea phase: Generate blog ideas or keyword topics.\n• Draft phase: Outline or write first versions.\n• Revision phase: Refine wording, add facts, inject personal insight.'
          }
        ]
      },
      {
        id: 'crafting-blog-prompts',
        title: 'Crafting Effective Blog Prompts',
        learningOutcome: 'Create structured, precise prompts that guide ChatGPT to deliver relevant, organized, and on‑brand content.',
        lessons: [
          {
            id: 'what-is-blog-prompt',
            title: 'Writing with ChatGPT Begins with Writing to ChatGPT',
            content: 'A prompt is your instruction. Instead of saying "write a blog about healthy eating," specify audience, format, and tone:\n\n"Write an 800-word blog post for beginners about healthy eating habits, in a friendly tone. Include 3 practical tips, a short introduction, and a conclusion inviting readers to start small."',
            handsOn: 'Prompt Design Framework:\n1. Define the topic and audience. Who are you helping and why?\n2. Set tone and style. Is it formal, conversational, or expert?\n3. Add structure. Tell ChatGPT how to organize your ideas.\n4. Request examples or formatting. Lists, paragraphs, or bullet points?\n5. Iterate. Use follow‑ups like "expand point 2 with real‑world examples."'
          },
          {
            id: 'prompt-exercise',
            title: 'Hands‑On Prompt Exercise',
            content: 'Pick a subject you care about. Write two prompts — one vague and one clear — and generate both versions with ChatGPT.',
            exercise: 'Compare the clarity, structure, and tone of each result. Note which prompt produces more useful content for your needs.'
          }
        ]
      },
      {
        id: 'editing-humanizing-text',
        title: 'Editing and Humanizing AI‑Generated Text',
        learningOutcome: 'Transform AI‑assisted drafts into engaging, human‑sounding blog posts with your unique voice.',
        lessons: [
          {
            id: 'editing-steps',
            title: 'The Four-Step Editing Process',
            content: 'Step 1 – Read for Substance: Check the facts and ensure the content aligns with your expertise. If data is missing, fill it in with real sources or personal experience.\n\nStep 2 – Inject Your Voice: Replace generic phrases with personal language, vivid examples, or experiences that feel "you." Readers connect with authenticity.\n\nStep 3 – Trim or Restructure: Cut repetition or filler. Reorder sections if the flow feels mechanical. Add transitions to smooth jumps between ideas.\n\nStep 4 – Ethical Editing: Credit sources, avoid plagiarism, and never pass off AI‑generated content as fully human work. Transparency builds trust.',
            handsOn: 'Practical Tip: Ask ChatGPT to rewrite a section in your voice by providing a sample paragraph you\'ve written. It learns your rhythm and adapts its tone.'
          },
          {
            id: 'voice-authenticity',
            title: 'Adding Your Personal Voice',
            content: 'Your human judgment transforms generic AI text into authentic content that resonates with readers. Personal stories and your unique perspective are what differentiate your blog from others.',
            reflection: 'How does adding your personal stories change the feel of an AI‑written blog post?'
          }
        ]
      },
      {
        id: 'seo-optimization',
        title: 'SEO and Optimization Basics',
        learningOutcome: 'Guide ChatGPT to produce search‑friendly content that reads naturally and ranks well.',
        lessons: [
          {
            id: 'structuring-readability',
            title: 'Structuring for Readability',
            content: 'Use clear headings (H1‑H3) to organize sections. Keep paragraphs short for screen readers. Include bullet points or numbered lists to simplify information.',
            handsOn: 'SEO Best Practices:\n• Focus on topics, not repetition.\n• For example, in a post about "creating blog posts with ChatGPT," include related terms naturally like "AI writing tools," "prompt techniques," and "SEO‑friendly blogging."\n• Never stuff keywords or rely solely on AI suggestions.'
          },
          {
            id: 'chatgpt-seo-enhancement',
            title: 'Enhancing SEO with ChatGPT',
            content: 'AI can generate optimized text when directed well. The best‑ranking content reads as if written for humans first, algorithms second.',
            exercise: 'Prompt ChatGPT: "Suggest a meta title and description for this blog post about using ChatGPT for content writing, targeting beginners and emphasizing authenticity."'
          }
        ]
      }
    ],
    seoNotes: 'H1: Course title; H2: Modules; H3: Lessons for scannable hierarchy. Use comparison tables showing vague vs. clear blog prompts. Include real examples of before/after AI editing. Emphasize authenticity and human oversight throughout.',
    expansionIdeas: 'Create follow-up courses: "Advanced Prompting for Content Strategy" or "AI‑Powered SEO for Bloggers." Offer downloadable "ChatGPT Blog Prompt Builder – From Idea to Published Post" worksheet. Build a prompt library for different content types. Create FAQ addressing ethical use and SEO concerns.'
  }
};
