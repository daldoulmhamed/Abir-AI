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
  },
  'chatgpt-content-creation/refining-content': {
    courseTitle: 'Creating Social Media Posts with ChatGPT: A Beginner\'s Guide to Smart, Engaging Content',
    metaTitle: 'Create Social Media Posts with ChatGPT – Quick Beginner\'s Guide to Engaging AI Content',
    metaDescription: 'Learn how to use ChatGPT to craft social media posts that grab attention and express your brand voice. Discover prompt strategies, editing tips, and content planning ideas in just a few minutes.',
    modules: [
      {
        id: 'understanding-chatgpt-social',
        title: 'Understanding ChatGPT\'s Role in Social Media Creation',
        learningOutcome: 'Identify which parts of your social media process AI can enhance without losing personal authenticity.',
        lessons: [
          {
            id: 'chatgpt-social-capabilities',
            title: 'What ChatGPT Can Do for Social Media',
            content: 'ChatGPT can suggest ideas, write captions, craft storytelling hooks, and adapt tone across platforms. It\'s particularly useful for brainstorming campaigns or rewriting messages to fit specific character limits.\n\nWhat It Can\'t Do: It doesn\'t know your audience\'s current reactions or the algorithm of each platform. You still manage timing, visuals, and strategy — ChatGPT helps you save time on language and ideation.\n\nHow It Fits into the Workflow:\n• Planning: Generate content ideas, hashtags, and campaign themes.\n• Creation: Write captions, descriptions, or calls to action.\n• Refinement: Edit tone, test variations, and A/B test post wording.'
          }
        ]
      },
      {
        id: 'crafting-social-prompts',
        title: 'Crafting Effective Prompts for Social Posts',
        learningOutcome: 'Create clear, structured prompts that produce post variations suitable for different platforms and audiences.',
        lessons: [
          {
            id: 'social-prompt-framework',
            title: 'Key Prompt Framework for Social Media',
            content: 'The right prompt produces content that fits your audience, platform, and personality.\n\nKey Framework Elements:\n• Objective: "Promote a new product," "share a tip," "boost engagement."\n• Platform: Each network has its own tone – LinkedIn is professional, Instagram is visual, TikTok is playful.\n• Tone & Style: Friendly, bold, confident, educational, or humorous.\n• Format: Captions, carousels, threads, or short descriptions.\n• Length & CTA: "Keep it under 100 words and end with an engaging call to action."'
          },
          {
            id: 'example-prompts',
            title: 'Example Prompts for Different Platforms',
            content: 'Platform-Specific Examples:\n• Instagram: "Write three short, engaging Instagram captions for a sustainable fashion brand\'s new eco‑friendly collection. Include hashtags."\n• LinkedIn: "Create a LinkedIn post sharing a productivity tip, professional tone, 100 words, with a question to invite discussion."\n• Twitter/X: "Write a witty, concise tweet about AI productivity tools, under 140 characters, with a call to action."\n• TikTok: "Create an energetic, casual TikTok script about morning routines for busy professionals."',
            exercise: 'Pick one platform you use most. Write a simple prompt like the examples above, test it in ChatGPT, and adjust wording until the tone feels right for your brand.'
          }
        ]
      },
      {
        id: 'editing-personalizing-social',
        title: 'Editing, Personalizing, and Adding Visual Ideas',
        learningOutcome: 'Edit AI‑generated captions into authentic posts aligned with your brand voice and audience expectations.',
        lessons: [
          {
            id: 'making-it-yours',
            title: 'Make It Sound Like You',
            content: 'AI can mimic tone, but your genuine personality makes it engaging. Add stories from your experience, brand language, and emotional authenticity.',
            handsOn: 'Platform-Specific Editing Tips:\n• Instagram: Keep it conversational and image‑focused.\n• Twitter/X: Prioritize brevity and hooks.\n• LinkedIn: Add insights or professional reflections.\n• TikTok/Short‑Form: Use energetic, conversational language.'
          },
          {
            id: 'visual-direction',
            title: 'Adding Visual Direction to Posts',
            content: 'Don\'t limit AI to text — use it to brainstorm visual concepts too.',
            handsOn: 'Ask ChatGPT: "Suggest image or video concepts to match this post caption about morning routines."',
            exercise: 'Quick Editing Routine:\n1. Review for clarity, emotion, and accuracy.\n2. Simplify complex sentences.\n3. Reword generic phrases to reflect your voice.\n4. Add specifics from your experience or brand.',
            reflection: 'What tone feels most natural for your brand — friendly, confident, or storytelling? How can AI support that tone consistently?'
          }
        ]
      },
      {
        id: 'planning-scheduling-engagement',
        title: 'Planning, Scheduling, and Measuring Engagement',
        learningOutcome: 'Design consistent, ethical content workflows supported by AI that improve efficiency and engagement.',
        lessons: [
          {
            id: 'content-planning',
            title: 'Using ChatGPT for Content Planning',
            content: 'AI\'s usefulness extends beyond writing — it can help you plan and optimize future posts.\n\nContent Calendar Ideas: Ask for recommendations like: "Create a 2‑week content calendar for Instagram around wellness and productivity, with post ideas and hashtags."',
            handsOn: 'Optimizing for Engagement:\nPrompt idea: "Rewrite this post to increase engagement by asking a question or encouraging comments."'
          },
          {
            id: 'ethical-practices',
            title: 'Ethical and Practical Tips for AI Social Content',
            content: 'Always check facts before sharing. Disclose AI involvement when relevant to maintain transparency. Combine AI outputs with real visuals, testimonials, or stats.',
            exercise: 'Practice Challenges:\n1. Repurpose one ChatGPT‑generated caption across three platforms.\n2. Run a quick A/B test using two prompt styles.\n3. Build a monthly post calendar template with AI assistance.',
            reflection: 'Which platform will you experiment with first using ChatGPT? Set one mini goal and measure how your audience responds.'
          }
        ]
      }
    ],
    seoNotes: 'H1: Course title; H2: Modules; H3: Lessons for scannable hierarchy. Include platform-specific examples (Instagram, LinkedIn, TikTok, Twitter). Use comparison formats showing weak vs. strong captions. Emphasize authenticity and audience connection throughout.',
    expansionIdeas: 'Create follow-up courses: "Advanced Prompting for Brand Storytelling" or "AI Tools for Visual Media Management." Offer downloadable "10 Prompts for Better Social Media Posts – From Idea to Engagement" worksheet. Include FAQ addressing authenticity concerns and platform-specific best practices.'
  },
  'chatgpt-content-creation/advanced-workflows': {
    courseTitle: 'Creating Marketing Copy with ChatGPT: Write Smarter, Sell Better',
    metaTitle: 'Create Marketing Copy with ChatGPT – Quick Beginner\'s Guide to Persuasive AI Writing',
    metaDescription: 'Learn how to craft effective marketing copy using ChatGPT. This short beginner guide reveals prompt structures, brand voice techniques, and editing tips that turn AI copy into authentic, high‑performing content.',
    modules: [
      {
        id: 'understanding-ai-copywriting',
        title: 'Understanding AI\'s Role in Copywriting',
        learningOutcome: 'Position ChatGPT as your partner for first drafts and understand its capabilities and limitations in marketing copy.',
        lessons: [
          {
            id: 'ai-copywriting-capabilities',
            title: 'What ChatGPT Can Do for Marketing Copy',
            content: 'ChatGPT can generate product descriptions and brand messaging, suggest variations of headlines, slogans, or taglines, and transform features into customer‑focused benefits.\n\nWhat You Provide: AI imitates patterns — you provide the empathy and insight that makes the message credible. Your job is to guide tone, clarity, and emotion.\n\nCopywriting Success = AI Pattern + Your Human Intent + Audience Insight'
          }
        ]
      },
      {
        id: 'writing-marketing-prompts',
        title: 'Writing Marketing Copy Prompts that Persuade',
        learningOutcome: 'Guide AI to write targeted, emotionally resonant marketing messages that convert.',
        lessons: [
          {
            id: 'prompt-building-formula',
            title: 'Prompt Building Formula for Marketing Copy',
            content: 'The goal of marketing copy is influence through clarity and emotion. Good prompts combine both.\n\nPrompt Building Elements:\n• Audience: Who are you persuading?\n• Goal: What action should they take?\n• Tone: Choose emotional energy (friendly, trustworthy, bold).\n• Format: Specify what kind of copy — headline, ad, landing intro, or email.\n• Voice Example (optional): Provide a short sample of your brand copy.'
          },
          {
            id: 'example-marketing-prompts',
            title: 'Example Prompts for Different Copy Types',
            content: 'Copy Type Examples:\n• Product Description: "Write a 50‑word product description for an eco‑friendly water bottle. Tone: playful, benefit‑focused. Include a short call to action."\n• Headlines & Taglines: "Create three headline options and a tagline for a landing page promoting an online writing course for beginners."\n• Email Copy: "Draft a 3‑sentence email subject line and preview text for a promotion targeting busy professionals."\n• Ad Copy: "Write two versions of ad copy (50 words each) for a fitness app — one for beginners, one for experienced users."',
            exercise: 'Pick one product or service you know. Write two prompts — one vague, one structured — and compare how specific variables change the result.'
          }
        ]
      },
      {
        id: 'editing-polishing-copy',
        title: 'Editing and Polishing for Conversion',
        learningOutcome: 'Convert AI drafts into compelling, polished copy that feels both persuasive and authentic.',
        lessons: [
          {
            id: 'human-editing-steps',
            title: 'The Four-Step Human Editing Process',
            content: 'Clarity: Replace filler phrases with action verbs. Look for words like "is," "helps," or "offers" and replace with stronger verbs.\n\nEmotion: Add real stories, outcomes, or proof points. Show results, not features.\n\nVoice Match: Read aloud — does it sound like your brand? Your unique personality matters.\n\nCTA Strength: Ensure every piece invites action naturally. Words like "Start," "Discover," or "Join" outperform generic CTAs.',
            handsOn: 'Quick Example:\nChatGPT draft: "Our app is easy to use and helps you stay organized."\nHuman‑edited: "Simplify your week — organize every task in one app that runs like second nature."\nA small shift in tone builds more connection.'
          },
          {
            id: 'humanizing-copy',
            title: 'Humanizing AI Copy with Your Voice',
            content: 'The best marketing copy combines AI speed with human authenticity. Your stories, insights, and personality are what differentiate your brand.',
            reflection: 'Which part of your copy feels most AI‑generated — tone, flow, or emotion? How can you humanize it?'
          }
        ]
      },
      {
        id: 'wrapping-up-confidence',
        title: 'Wrapping Up — Building Confidence with AI Writing',
        learningOutcome: 'Master the complete AI writing workflow from awareness to conversion across all content types.',
        lessons: [
          {
            id: 'complete-workflow',
            title: 'The Three Pillars of Digital Writing with AI',
            content: 'Blog Posts: structure and clarity — establish authority and provide value.\n\nSocial Media Posts: engagement and variety — build community and maintain presence.\n\nMarketing Copy: persuasion and emotion — convert interest into action.\n\nEach stage reinforces the next — from awareness to conversion. The key takeaway? AI writing works best when guided by human intent, empathy, and expertise.'
          },
          {
            id: 'next-steps',
            title: 'Practice Challenges and Continued Growth',
            content: 'Build your AI writing skills through real practice with your own content and audience feedback.',
            exercise: 'Practice Challenge:\n1. Create one marketing headline in three tones: friendly, bold, and luxurious.\n2. Test which version resonates most with your audience in real campaigns.\n3. Build a prompt library for different marketing scenarios in your industry.',
            reflection: 'How will you integrate AI writing into your workflow while maintaining your authentic brand voice?'
          }
        ]
      }
    ],
    seoNotes: 'H1: Course title; H2: Modules; H3: Lessons for scannable hierarchy. Include before/after copy examples showing AI draft vs. human‑edited version. Use comparison tables for vague vs. persuasive prompts. Emphasize authenticity, human oversight, and conversion strategy throughout.',
    expansionIdeas: 'Create advanced courses: "AI Copywriting Strategy 2.0" or "Building Authentic Brand Voice with AI." Offer downloadable "Prompt Templates for Persuasive Marketing Copy" worksheet. Include case studies of high‑converting AI‑assisted marketing copy. Build comprehensive prompt library for different industries and copy types.'
  },
  'perplexity-research/introduction-perplexity': {
    courseTitle: 'What is Perplexity AI? A Beginner\'s 3-Minute Guide to the Smart Answer Engine',
    metaTitle: 'What is Perplexity AI? Features, Uses & Beginner Guide (2026)',
    metaDescription: 'Discover what Perplexity AI is, how it works, and why it\'s different from ChatGPT or Google. This quick beginner guide explains its real-time search, citations, and practical uses in just 3 minutes.',
    modules: [
      {
        id: 'what-makes-perplexity-different',
        title: 'What Makes Perplexity AI Different',
        learningOutcome: 'Understand Perplexity\'s unique position as a hybrid search-AI tool built for truth and efficiency.',
        lessons: [
          {
            id: 'perplexity-core-concept',
            title: 'Core Concept: The Answer Engine',
            content: 'Perplexity AI is an "answer engine" — not just a chatbot or search engine. It delivers direct, conversational responses backed by live web sources, blending AI reasoning with real-time research.\n\nKey Differences from Others:\n• ChatGPT: Trained on static data (can hallucinate facts).\n• Google: Link lists, no synthesized answers.\n• Perplexity: Real-time search + citations + natural explanations.\n\nSimple Analogy: Think of it as a brilliant research assistant who reads the entire internet in seconds, then writes you a concise report with footnotes.'
          }
        ]
      },
      {
        id: 'standout-features',
        title: 'Standout Features You\'ll Actually Use',
        learningOutcome: 'Know Perplexity\'s killer features and when to use each one effectively.',
        lessons: [
          {
            id: 'citation-backed-answers',
            title: '1. Citation-Backed Answers',
            content: 'Every response includes verifiable sources. Click any citation to read the original page — perfect for research, fact-checking, or building trust.'
          },
          {
            id: 'multi-model-choice',
            title: '2. Multi-Model Choice (Pro Feature)',
            content: 'Switch between GPT-4o, Claude 3.5, Llama 3.1, and more based on your needs — coding, creative writing, or analysis.'
          },
          {
            id: 'real-time-web-search',
            title: '3. Real-Time Web Search',
            content: 'Ask current events, stock prices, or news. Answers update continuously, unlike static AI models.'
          },
          {
            id: 'focus-modes',
            title: '4. Focus Modes',
            content: 'Narrow searches to Academic, YouTube, Reddit, or Wolfram for specialized results.\n\nQuick Example:\nQuery: "Latest iPhone release date" → Gets today\'s answer with Apple\'s press release cited.'
          }
        ]
      },
      {
        id: 'who-uses-perplexity',
        title: 'Who Uses Perplexity & Real-World Applications',
        learningOutcome: 'Identify if Perplexity fits your workflow and which plan matches your needs.',
        lessons: [
          {
            id: 'perplexity-use-cases',
            title: 'Perfect Use Cases for Different Roles',
            content: 'Perplexity AI is ideal for:\n• Students: Research papers with cited sources.\n• Professionals: Competitive analysis, market trends.\n• Content Creators: Fast, accurate background info.\n• Developers: API for custom research tools.\n\nFree vs Pro ($20/month):\n• Free: Quick answers, basic search functionality.\n• Pro: Model choice, file uploads, unlimited searches, advanced features.'
          },
          {
            id: 'hands-on-exercise',
            title: 'Getting Started with Perplexity',
            content: 'Visit perplexity.ai and explore its interface. The free version gives you immediate access to core features.',
            exercise: 'Ask Perplexity: "Summarize the top 3 AI trends in 2026 with sources." Notice how citations are provided for each claim. This demonstrates Perplexity\'s key strength.'
          }
        ]
      }
    ],
    seoNotes: 'H1: Course title; H2: Modules; H3: Lessons for scannable hierarchy. Use comparison tables (Perplexity vs. ChatGPT vs. Google). Include feature tables showing Free vs Pro capabilities. Emphasize accuracy, citations, and real-time search advantages throughout.',
    expansionIdeas: 'Create follow-up courses: "Advanced Search with Perplexity" or "Perplexity for Business Intelligence." Offer downloadable "Perplexity Quickstart Guide: 10 Power Prompts for Better Research" PDF. Include FAQ addressing accuracy, free vs paid, and comparison with Google.'
  }
};
