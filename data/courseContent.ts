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
  },
  'perplexity-research/advanced-search': {
    courseTitle: 'Asking Smart Questions in Perplexity AI: Intermediate Guide to Precision Research',
    metaTitle: 'Asking Smart Questions in Perplexity AI – Intermediate Prompting Techniques',
    metaDescription: 'Master intermediate prompting strategies for Perplexity AI. Learn layered questioning, context stacking, focus modes, and source analysis to extract precise, actionable insights from your research engine.',
    modules: [
      {
        id: 'anatomy-precision-prompts',
        title: 'The Anatomy of Precision Prompts',
        learningOutcome: 'Transform simple questions into precision research requests using a 4-layer framework.',
        lessons: [
          {
            id: 'why-questions-fail',
            title: 'Why Most Questions Fail & How to Fix Them',
            content: 'Vague queries = generic answers. "AI trends" gives surface-level buzzwords. Context-rich prompts trigger deeper analysis.\n\nIntermediate Prompt Framework (4 Layers):\n[Context] + [Specific Ask] + [Format] + [Constraints]',
            handsOn: 'Layer Breakdown:\n• Context: Your situation/expertise level\n• Specific Ask: Exact deliverable (analysis, ranking, timeline)\n• Format: Table, bullet points, pros/cons, timeline\n• Constraints: Budget, timeframe, exclusions\n\nBasic: "SEO tools"\nSmart: "Compare Ahrefs vs SEMrush for small business SEO in 2026. Include pricing, core features, and learning curve. Format as comparison table with recommendations."'
          },
          {
            id: 'rewrite-exercise',
            title: 'Precision Prompt Exercise',
            content: 'Take your existing research questions and restructure them using the 4-layer framework.',
            exercise: 'Rewrite your last 3 Perplexity queries using this 4-layer structure. Notice how much more specific the responses become.'
          }
        ]
      },
      {
        id: 'mastering-focus-modes',
        title: 'Mastering Focus Modes & Model Selection',
        learningOutcome: 'Know exactly which mode/model delivers optimal results for each use case.',
        lessons: [
          {
            id: 'focus-modes-guide',
            title: 'Focus Modes: Target Specific Knowledge Domains',
            content: 'Beyond default web search, target specific knowledge domains:\n\n• Academic: "Latest peer-reviewed studies on [topic]"\n• YouTube: "Top 5 tutorial videos explaining [concept]"\n• Reddit: "Real user experiences with [product/service]"\n• Wolfram: "Mathematical analysis of [problem]"\n\nPro Tip: Combine modes in sequence:\n1. Reddit → real user sentiment\n2. Academic → validated research\n3. YouTube → visual explanations'
          },
          {
            id: 'model-selection',
            title: 'Model Selection Strategy for Different Tasks',
            content: 'Choose the right AI model for the right task:\n\n• Claude 3.5: Creative analysis, writing, nuance\n• GPT-4o: Speed, broad knowledge, coding\n• Llama 3.1: Technical accuracy, math\n• Sonar: Perplexity\'s search-optimized model\n\nKey insight: Different models excel at different domains. Match the model to your question type.'
          }
        ]
      },
      {
        id: 'layered-questioning',
        title: 'Layered Questioning & Follow-Up Chains',
        learningOutcome: 'Chain questions to build comprehensive strategic insights.',
        lessons: [
          {
            id: 'research-funnel',
            title: 'The 3-Question Research Funnel',
            content: 'Build depth progressively:\n\n1. BROAD SCAN: "Current landscape of [industry] 2026"\n2. DEEP DIVE: "Analyze [specific trend from Q1] - drivers, risks, 3-year forecast"\n3. ACTION PLAN: "Create implementation roadmap for [insight from Q2] for [your role/industry]"\n\nExample Chain:\n• Q1: "EV market leaders 2026"\n• Q2: "Tesla vs BYD supply chain advantages"\n• Q3: "Procurement strategy for EV fleet manager buying 50 vehicles"'
          },
          {
            id: 'context-stacking',
            title: 'Context Stacking Technique for Deeper Analysis',
            content: 'Reference prior answers to build deeper analysis:\n\n"Using your previous analysis of [specific point], now compare with [new variable]. Update recommendations."\n\nThis technique transforms surface-level research into strategic business intelligence.',
            exercise: 'Ask Perplexity about your industry. Follow with 2 increasingly specific questions. Notice the depth improvement compared to asking all at once.'
          }
        ]
      },
      {
        id: 'advanced-techniques',
        title: 'Advanced Techniques for Pro Results',
        learningOutcome: 'Command Perplexity like a research director, not a casual user.',
        lessons: [
          {
            id: 'constraint-analysis',
            title: 'Constraint-Based Analysis & Filtering',
            content: 'Use specific constraints to get targeted results:\n\nExample: "Recommend CRM software under $100/user/month, excluding Salesforce, with mobile-first design and Zapier integration. Rank by implementation speed."\n\nConstraints unlock precision by eliminating irrelevant options.'
          },
          {
            id: 'advanced-request-types',
            title: 'Time-Series & Multi-Perspective Analysis',
            content: 'Advanced request types for complex research:\n\nTime-Series: "Show revenue growth comparison: HubSpot vs ActiveCampaign 2022-2026. Include market share changes and acquisition costs."\n\nMulti-Perspective: "Analyze [policy change] from 3 perspectives: consumer impact, business strategy, regulatory implications. Format as 3-column comparison."\n\nSource Quality: "Find case studies of [strategy] implementation from tier-1 publications (Forbes, HBR, WSJ) in last 12 months only."'
          },
          {
            id: 'pro-template',
            title: 'Pro Prompt Template for Research Direction',
            content: 'Master template for maximum results:\n\n"Act as [expert role]. Analyze [topic] for [your situation]. Consider [3 key variables]. Format as [specific deliverable]. Sources from [quality/time constraints]."\n\nThis template ensures all critical elements are addressed in a single, structured request.'
          }
        ]
      },
      {
        id: 'workflow-integration',
        title: 'Workflow Integration & Pro Tips',
        learningOutcome: 'Build sustainable research workflows that save time and drive decisions.',
        lessons: [
          {
            id: 'daily-research-stack',
            title: 'Daily Research Stack Integration',
            content: 'Integrate Perplexity into your daily workflow:\n\nMorning: "Top 3 stories impacting [your industry] today"\nMidday: "Deep dive on [morning insight] - 3 actionable takeaways"\nEvening: "Weekly synthesis: connect this week\'s insights into 2026 strategy"\n\nExport & Action: "Format this analysis as Notion-ready markdown with action items tagged" or "Create Trello card structure from these recommendations"'
          },
          {
            id: 'pitfalls-best-practices',
            title: 'Common Pitfalls & Best Practices',
            content: 'What works and what doesn\'t:\n\n❌ AVOID: "Tell me about X"\n✅ DO: "Benchmark X against Y and Z for [specific use case]"\n\n❌ AVOID: Vague timeframes\n✅ DO: "Changes in the last 90 days"\n\n❌ AVOID: Generic format requests\n✅ DO: "Format as actionable checklist with ROI estimates"\n\nKey principle: Specificity drives quality. Every detail improves the result.',
            reflection: 'Review your last 5 Perplexity sessions. How many used layered prompting? Rewrite your weakest query using these advanced techniques.'
          }
        ]
      }
    ],
    seoNotes: 'H1: Course title; H2: Modules; H3: Lessons for scannable hierarchy. Use side-by-side comparison of basic vs. smart questions. Include prompt templates as code blocks for easy copying. Emphasize ROI and time-savings throughout. Include focus mode selection matrix.',
    expansionIdeas: 'Create advanced courses: "Perplexity for Enterprise Research" or "Automated Insight Generation Systems." Offer downloadable "20 Intermediate Perplexity Prompts" template collection. Include 30-day challenge framework. Build prompt library organized by industry and use case.'
  },
  'perplexity-research/research-workflows': {
    courseTitle: 'Using Perplexity AI for Content & Market Research: Intermediate Strategies for Professionals',
    metaTitle: 'Using Perplexity AI for Content & Market Research – Intermediate Workflows',
    metaDescription: 'Leverage Perplexity AI\'s Deep Research, Spaces, and Copilot for professional content planning and market analysis. Master intermediate workflows that save hours on competitor research, audience insights, and content gap analysis.',
    modules: [
      {
        id: 'deep-research-accelerator',
        title: 'Deep Research – Your Content Planning Accelerator',
        learningOutcome: 'Deploy Deep Research to instantly generate professional-grade research reports.',
        lessons: [
          {
            id: 'deep-research-overview',
            title: 'What Deep Research Does',
            content: '2-4 minute automated research reports that read hundreds of sources, synthesize findings, and deliver structured insights. Perfect for content briefs and market overviews.'
          },
          {
            id: 'deploy-deep-research',
            title: 'When to Deploy Deep Research',
            content: 'Use Deep Research for:\n• Content Strategy: "Market analysis for [niche] content creators 2026"\n• Competitor Research: "Content gaps in [competitor] publishing strategy"\n• Trend Forecasting: "Emerging [industry] content formats for Q2 2026"',
            handsOn: 'Pro Workflow Example:\nQuery: "Create comprehensive competitor analysis for newsletter platforms serving B2B marketers. Include pricing models, feature gaps, customer pain points from reviews, and content marketing strategies."\nResult: 15-page report with tables, citations, SWOT analysis'
          },
          {
            id: 'deep-research-exercise',
            title: 'Deep Research Exercise',
            content: 'Put Deep Research into practice immediately.',
            exercise: 'Run Deep Research on your top competitor\'s content strategy. Export as PDF and review the structured findings.'
          }
        ]
      },
      {
        id: 'spaces-research-hub',
        title: 'Spaces – Your Research Command Center',
        learningOutcome: 'Organize complex research projects into actionable Spaces with persistent context.',
        lessons: [
          {
            id: 'why-spaces-matter',
            title: 'Why Spaces Beat Single Threads',
            content: 'Dedicated research hubs with file uploads, pinned results, and cross-referencing. Perfect for multi-week content projects.'
          },
          {
            id: 'spaces-setup',
            title: 'Content Research Space Setup',
            content: 'Organize your research by project phase:\n\nSpace 1: "Q1 Content Strategy" → Upload audience personas, brand guidelines\nSpace 2: "Competitor Tracking" → Pin weekly Deep Research reports\nSpace 3: "Content Calendar 2026" → Live calendar + performance data\n\nPro Tip: Name Spaces by project phase (Discovery → Planning → Execution → Analysis)'
          },
          {
            id: 'file-upload-power',
            title: 'File Upload Power for Research',
            content: 'Leverage file uploads in Spaces:\n\nUpload: Past content performance spreadsheet → "Analyze which formats drove most engagement"\nUpload: Competitor content calendar → "Identify their publishing cadence and gaps"\n\nFiles stay in context across all your follow-up questions in that Space.'
          }
        ]
      },
      {
        id: 'competitor-intelligence',
        title: 'Competitor Content Intelligence Framework',
        learningOutcome: 'Systematically extract actionable intelligence from competitor content ecosystems.',
        lessons: [
          {
            id: 'five-query-dive',
            title: 'The 5-Query Competitor Deep Dive',
            content: 'Run these 5 queries sequentially for comprehensive competitor analysis:\n\n1. "Analyze [competitor] top 10 articles by traffic - topics, formats, headlines"\n2. "Customer sentiment analysis from reviews of [competitor] content/products"\n3. "Backlink profile analysis of [competitor]\'s highest traffic pages"\n4. "Social media content gaps - what gets engagement vs what doesn\'t"\n5. "Content promotion channels ranked by ROI for [competitor niche]"'
          },
          {
            id: 'content-gap-analysis',
            title: 'Content Gap Analysis Template',
            content: 'Use this powerful template for competitive positioning:\n\nPrompt: "Compare content coverage across these 5 competitors: [list]. Create matrix showing:\n• Topics covered (heatmap)\n• Format preferences\n• Keyword opportunities (low competition, high intent)\n• Publishing frequency by content type"\n\nThis reveals exactly where your content can differentiate.',
            exercise: 'Run the 5-query sequence on your #1 competitor today. Save results to a Perplexity Space for ongoing tracking.'
          }
        ]
      },
      {
        id: 'audience-trend-research',
        title: 'Audience & Trend Research Systems',
        learningOutcome: 'Predict content performance using multi-source audience and trend intelligence.',
        lessons: [
          {
            id: 'persona-extraction',
            title: 'Audience Persona Extraction',
            content: 'Build detailed buyer personas with Perplexity:\n\n"Create detailed buyer personas for [niche] from:\n1. Reddit discussions (r/[subreddits])\n2. Product reviews on G2/Capterra\n3. LinkedIn job postings\n4. Recent surveys/studies"\n\nThis generates data-backed personas instead of guesswork.'
          },
          {
            id: 'trend-velocity',
            title: 'Trend Velocity Tracking & Forecasting',
            content: 'Stay ahead of trends:\n\nWeekly: "Show content trend growth rates for [3 topics] across 6 platforms"\nMonthly: "Predict Q2 content format winners based on 90-day social data"\n\nUse these insights to publish before trends peak.'
          },
          {
            id: 'seasonal-planning',
            title: 'Seasonal Content Planning',
            content: 'Build comprehensive calendars with data:\n\n"Build 6-month content calendar for [niche] incorporating:\n• Major industry events/holidays\n• Historical performance peaks\n• Emerging topic clusters\n• Competitor content gaps"\n\nCombines seasonality with trend data for maximum relevance.'
          }
        ]
      },
      {
        id: 'content-brief-workflow',
        title: 'Content Brief Generation Workflow',
        learningOutcome: 'Automate professional content briefs with research citations and SEO optimization.',
        lessons: [
          {
            id: 'perfect-brief',
            title: 'The Perfect Content Brief (3 Prompts)',
            content: 'Use this three-step process for complete briefs:\n\n1. RESEARCH: "Deep Research: Comprehensive background on [topic] for [audience]"\n2. STRUCTURE: "Create SEO-optimized content brief including:\n   • Target keywords + search intent\n   • Content outline with word counts\n   • Featured snippet opportunities\n   • Supporting data/statistics needed"\n3. ANGLED: "Generate 5 unique angles for [topic] targeting [buyer persona]"'
          },
          {
            id: 'brief-export',
            title: 'Export & Reuse Content Briefs',
            content: 'All briefs export to markdown/Notion with citations intact. Pro Tip: Pin your 3-prompt sequence to a Space for reuse across projects.\n\nThis creates a scalable content production system without quality loss.'
          }
        ]
      },
      {
        id: 'performance-tracking',
        title: 'Performance Tracking & Iteration',
        learningOutcome: 'Build data-driven content cycles that continuously improve ROI.',
        lessons: [
          {
            id: 'weekly-audit',
            title: 'Weekly Content Audit System',
            content: 'Use Perplexity for weekly analysis:\n\n"Analyze my last 10 posts performance data: [paste analytics]\nRank by engagement, identify patterns, recommend format adjustments."\n\nThis turns raw analytics into actionable insights.'
          },
          {
            id: 'roi-formula',
            title: 'ROI Content Formula & Tracking',
            content: 'Track what actually matters:\n\nHigh ROI = (Traffic + Engagement + Conversions) × Evergreen Potential\n\nPerplexity tracks all variables across competitors + your performance, helping you focus on high-impact content types.'
          },
          {
            id: 'calendar-challenge',
            title: 'Build Your Content Calendar Using This System',
            content: 'Combine all 6 modules into a complete workflow:\n\n1. Deep Research → Market understanding\n2. Spaces → Organized research hub\n3. Competitor Intelligence → Differentiation gaps\n4. Audience Research → Persona targeting\n5. Brief Generation → Production ready\n6. Performance Tracking → Continuous improvement\n\nYou now have a complete, data-driven content system.',
            reflection: 'Build your Q2 content calendar using this 6-module system. Measure time saved vs. manual research methods.'
          }
        ]
      }
    ],
    seoNotes: 'H1: Course title; H2: Modules; H3: Lessons for scannable hierarchy. Use workflow diagrams showing research progression. Include prompt templates as copy-paste code blocks. Emphasize time savings and ROI metrics throughout. Include Space organization matrix.',
    expansionIdeas: 'Create advanced courses: "Perplexity Deep Research for Teams" or "Enterprise Content Intelligence Systems." Offer downloadable "Content Research Power Pack: 25 Pro Prompts + Space Templates" bundle. Include case studies showing content performance improvements. Build templates library for different industries.'
  },
  'perplexity-research/source-verification': {
    courseTitle: 'Verifying Sources and Fact-Checking in Perplexity AI: Intermediate Guide to Research Integrity',
    metaTitle: 'Verify Sources & Fact-Check in Perplexity AI – Intermediate Research Methods',
    metaDescription: 'Master source verification and fact-checking techniques in Perplexity AI. Learn citation analysis, cross-verification workflows, Academic Focus mode, and bias detection for trustworthy intermediate research.',
    modules: [
      {
        id: 'reading-citations-detective',
        title: 'Reading Perplexity Citations Like a Detective',
        learningOutcome: 'Systematically validate every Perplexity citation before trusting it.',
        lessons: [
          {
            id: 'citation-numbers-truth',
            title: 'Citation Numbers ≠ Truth',
            content: 'Every Perplexity answer links to sources, but smart researchers verify what sources actually say. Citation presence doesn\'t guarantee accuracy — context matching matters.'
          },
          {
            id: 'source-checklist',
            title: 'The 30-Second Source Checklist',
            content: 'Use this rapid verification protocol for every citation:\n\n1. CLICK → Does the link work? (Dead links = red flag)\n2. DOMAIN → .edu/.gov/.org vs blogspot.com? (Authority matters)\n3. CONTEXT → Does quoted text match source claim? (AI can mis-summarize)\n4. DATE → Freshness relevant? (2026 data ≠ 2022 stats)\n5. AUTHOR → Credentials or anonymous? (Expertise signals)\n\nPro Move: Hover citations before clicking to preview domain/quality instantly.'
          },
          {
            id: 'ghost-citation-detection',
            title: 'Ghost Citation Detection',
            content: 'Detect fabricated references:\n\nPrompt: "Verify if \'[Book Title]\' by [Author] exists. Provide DOI or publisher link."\n\nNo results = fabricated reference. Never cite fabricated sources.',
            exercise: 'Pick your last Perplexity answer. Audit all 5+ citations using the 30-second checklist. Note which pass and which require deeper investigation.'
          }
        ]
      },
      {
        id: 'focus-modes-quality',
        title: 'Focus Modes for Source Quality Control',
        learningOutcome: 'Select focus modes strategically based on source quality needs.',
        lessons: [
          {
            id: 'academic-focus-gold',
            title: 'Academic Focus = Gold Standard',
            content: 'Different queries need different sources:\n\nExample Query: "AI ethics regulation impact"\n• Default: Mixed blog/forum results\n• Academic: Peer-reviewed papers only (.edu/.gov/.org)\n\nAcademic Focus delivers highest-authority sources for research that needs citations.'
          },
          {
            id: 'focus-mode-matrix',
            title: 'When to Use Each Focus Mode',
            content: 'Strategic mode selection by use case:\n\n• Academic: Research papers, citations → Highest quality\n• Wolfram: Math/stats validation → Highest quality\n• YouTube: Tutorials, demos → Medium quality\n• Reddit: User sentiment → Lowest quality\n• Default: General research → Mixed quality\n\nPro Workflow: Academic → Default → Reddit (Validation → Context → Reality check)'
          }
        ]
      },
      {
        id: 'cross-verification',
        title: 'Cross-Verification Systems (Never Trust One Source)',
        learningOutcome: 'Never accept single-source validation; systematic cross-checking becomes automatic.',
        lessons: [
          {
            id: 'validation-triangle',
            title: 'The 3-Way Validation Triangle',
            content: 'Never rely on single source:\n\nPerplexity Answer → Source Documents → Independent Confirmation\n\nThis three-step process ensures robustness and catches errors/misinterpretations.'
          },
          {
            id: 'cross-check-prompts',
            title: 'Practical Cross-Check Prompts',
            content: 'Use these prompts to validate Perplexity claims:\n\n1. "Verify this claim using sources published after [date]"\n2. "What do peer-reviewed studies say about [Perplexity claim]?"\n3. "Counterarguments to [main finding from Perplexity]?"\n\nRed Flags Requiring Triple-Check:\n• Single-source answers (no multiple citations)\n• Very recent events (<48 hours)\n• Controversial topics (politics, medicine)\n• Statistical claims without ranges',
            handsOn: 'Case Study Example:\nPerplexity: "X increased revenue 300% in Q4"\nVerification: Check earnings call transcript + SEC filing + analyst reports',
            exercise: 'Take one Perplexity stat from today. Run 3 cross-verification prompts and compare results across sources.'
          }
        ]
      },
      {
        id: 'advanced-fact-checking',
        title: 'Advanced Fact-Checking Workflows',
        learningOutcome: 'Command comprehensive fact-checking systems beyond basic citation clicking.',
        lessons: [
          {
            id: 'bias-detection',
            title: 'Bias Detection Framework',
            content: 'Identify subtle biases in sources:\n\n1. SOURCE AFFILIATION → Who funds/publishes? (Industry vs Independent)\n2. LANGUAGE TONE → Alarmist/neutral/authoritative?\n3. MISSING COUNTERPOINTS → Only one side presented?\n4. PREDICTION vs EVIDENCE → "Will happen" vs "Has happened"\n\nThese indicators reveal whether sources present balanced analysis.'
          },
          {
            id: 'perplexity-library-method',
            title: 'The "Perplexity + Library" Method for Depth',
            content: 'Combine speed with depth:\n\nStep 1: Perplexity scouting (speed)\nStep 2: Google Scholar/JSTOR validation (depth)\nStep 3: Primary source access (.gov filings, transcripts)\n\nPro Prompt Template:\n"Analyze [claim] using these criteria: [list 3-5 validation factors]. Cite tier-1 sources only (WSJ, HBR, peer-reviewed). Flag potential biases."'
          },
          {
            id: 'timestamp-discipline',
            title: 'Timestamp Discipline for Data Freshness',
            content: 'Always track data vintage:\n\nAlways note: Query date + Source publication date + Data vintage\n\n"2026 analysis using 2024 data" = Stale\n"Q1 2026 figures using live web data" = Fresh\n\nTimestamp discipline prevents acting on outdated information.'
          }
        ]
      },
      {
        id: 'verification-sop',
        title: 'Building Your Verification SOP',
        learningOutcome: 'Build sustainable verification systems that scale across research projects.',
        lessons: [
          {
            id: 'audit-template',
            title: 'Daily Research Audit Template',
            content: 'Use this standardized template for every research session:\n\nQuery: ___________\nCitations: [1✓] [2✗] [3✓] (✓=Verified, ✗=Flagged)\nCross-Check: Google Scholar [✓] Primary Source [✓]\nConfidence: High/Medium/Low → Actionable?\n\nThis creates accountability and traceability.'
          },
          {
            id: 'enterprise-practices',
            title: 'Enterprise-Grade Verification Practices',
            content: 'Professional standards for high-stakes research:\n\n• Never cite Perplexity directly (cite original sources)\n• Log query timestamps + source URLs\n• Flag >30% questionable sources → Redo research\n• Weekly audit: 10% of citations manually re-verified\n\nThese practices ensure credibility and auditability.',
            reflection: 'Review your last 3 research sessions. What % of citations did you actually verify? Set a goal to increase verification rate.'
          }
        ]
      }
    ],
    seoNotes: 'H1: Course title; H2: Modules; H3: Lessons for scannable hierarchy. Include source quality matrix as table. Use red flags/green flags format for easy scanning. Emphasize citation verification and bias detection throughout. Include audit template as downloadable checklist.',
    expansionIdeas: 'Create advanced courses: "Enterprise Perplexity: Team Research Systems" or "AI Verification for Academic Institutions." Offer downloadable "Perplexity Verification Checklist PDF" for daily audits. Include case studies of commonly mis-cited sources. Build source quality database by domain type.'
  },
  'perplexity-research/pro-perplexity-workflow': {
    courseTitle: 'Pro Perplexity Research Workflow + Series Wrap-Up: Enterprise Mastery',
    metaTitle: 'Pro Perplexity Research Workflow + Complete Mastery Guide (2026)',
    metaDescription: 'Master professional Perplexity AI workflows combining Deep Research, Spaces, Collections, and API automation. This final intermediate course + series capstone delivers your complete research operating system.',
    modules: [
      {
        id: 'pro-research-os',
        title: 'The Pro Research Operating System (ROS)',
        learningOutcome: 'Build a repeatable, scalable professional research system that compounds knowledge across time.',
        lessons: [
          {
            id: 'ros-philosophy',
            title: 'Core Philosophy: Research Compounds',
            content: 'Your research doesn\'t exist in isolation:\n\nWeek 1 Output → Week 2 Context → Week 3 Strategic Foresight\nSingle query → Living knowledge system → Competitive weapon\n\nThe ROS (Research Operating System) transforms reactive research into proactive strategic intelligence.'
          },
          {
            id: 'ros-architecture',
            title: 'ROS Architecture: 5 Core Systems',
            content: 'Your complete research machine has 5 interconnected systems:\n\n1. DAILY BRIEFING SYSTEM (5 min) - Stay aware\n2. WEEKLY DEEP DIVE SYSTEM (45 min) - Find patterns\n3. PROJECT RESEARCH SYSTEM (Spaces) - Execute\n4. KNOWLEDGE EXTRACTION SYSTEM (Collections) - Preserve\n5. STRATEGIC SYNTHESIS SYSTEM (Copilot) - Decide\n\nYour New Reality: 80% less research time, 300% better insights.'
          }
        ]
      },
      {
        id: 'daily-briefing',
        title: 'Daily Briefing System (Reactive → Proactive)',
        learningOutcome: 'Build a 5-minute daily intelligence routine that keeps you ahead of the curve.',
        lessons: [
          {
            id: 'morning-stack',
            title: 'Morning Intelligence Stack (15 Prompts)',
            content: 'Create a Space called "Daily Intelligence Hub" and use these prompts daily:\n\n1. "Top 5 stories impacting [your industry/niche] in last 24 hours"\n2. "Competitor mentions across news + social + forums today"\n3. "Trending questions people ask about [your focus area]"\n4. "New research papers/publications in [field] past 48 hours"\n5. "Key people talking about [topic] - what are they saying?"\n\nPin top 3 insights → Forward to team\n\nPro Automation: Save as Space template → Daily refresh with new dates.\nTime Saved: 2 hours manual scanning → 10 minutes automated.'
          }
        ]
      },
      {
        id: 'weekly-deep-dive',
        title: 'Weekly Deep Dive System (Pattern Recognition)',
        learningOutcome: 'Extract strategic patterns and predictions from daily research.',
        lessons: [
          {
            id: 'friday-synthesis',
            title: 'Friday Strategic Synthesis (7-Step Sequence)',
            content: 'Create a Space called "Weekly Synthesis [Date]" and run this sequence:\n\n1. DEEP RESEARCH: "Week in review: [your 3 focus areas]"\n2. TREND TRACKING: "Velocity changes in key metrics vs last week"\n3. COMPETITOR MOVES: "Strategic analysis of competitor actions"\n4. CUSTOMER SENTIMENT: "Voice of customer synthesis from all channels"\n5. CONTENT GAPS: "Emerging topics competitors missed"\n6. PREDICTION: "3 bold predictions for next 30 days"\n7. ACTION PLAN: "Prioritized 3 initiatives for next week"\n\nExport → Notion/Obsidian → Team briefing\n\nCompound Effect: Week 4 insights reference Weeks 1-3 automatically.'
          }
        ]
      },
      {
        id: 'project-research',
        title: 'Project Research System (Spaces Mastery)',
        learningOutcome: 'Organize complex projects with systematic Space architecture.',
        lessons: [
          {
            id: 'space-architecture',
            title: 'Enterprise Space Architecture',
            content: 'Structure every project Space like this:\n\nMASTER SPACE: "[Project Name] Command Center"\n├── 01-Discovery (Deep Research reports)\n├── 02-Competitors (Pinned weekly competitor intel)\n├── 03-Audience (Persona evolution + sentiment)\n├── 04-Trends (Velocity tracking + predictions)\n├── 05-Synthesis (Copilot Pages + final deliverables)\n└── 06-Archive (Closed projects for reference)\n\nThis creates systematic, discoverable research that scales.'
          },
          {
            id: 'file-upload-power',
            title: 'File Upload Power User Techniques',
            content: 'Leverage file uploads for maximum research power:\n\nUpload: Sales call transcripts → "Extract customer pain points + objections"\nUpload: Competitor pricing sheets → "Benchmark analysis + opportunity gaps"\nUpload: Past campaign performance → "Pattern recognition + optimization"\n\nPro Move: Share read-only links to client-facing Pages for transparency and collaboration.'
          }
        ]
      },
      {
        id: 'knowledge-extraction',
        title: 'Knowledge Extraction System (Collections)',
        learningOutcome: 'Build reusable research assets that compound across projects.',
        lessons: [
          {
            id: 'collections-mastery',
            title: 'Turn Research into Reusable Assets',
            content: 'Create a Collection called "Industry Playbook [2026]" containing:\n\n• Competitor frameworks (reusable templates)\n• Audience personas (living documents)\n• Content briefs (pre-researched angles)\n• Trend reports (historical context)\n• Prediction logs (accuracy tracking)\n\nWeekly Harvest: Tag valuable insights → Add to Collections during research.\n\nROI: Research compounds across projects, clients, and years.'
          }
        ]
      },
      {
        id: 'strategic-copilot',
        title: 'Strategic Copilot System (Thinking Partner)',
        learningOutcome: 'Use Copilot as your strategic advisor for monthly planning.',
        lessons: [
          {
            id: 'copilot-strategy',
            title: 'Monthly Strategy Sessions with Copilot',
            content: 'Use this prompt for monthly strategic sessions:\n\n"Act as my Chief of Staff. Review all research from [Space name]. Create:\n\n1. Executive summary (3 key insights)\n2. Strategic risks/opportunities (matrix format)\n3. Decision framework (3 options ranked)\n4. Action roadmap (90-day priorities)\n5. Key questions for next month"\n\nResult: Instant boardroom-ready strategy brief.'
          }
        ]
      },
      {
        id: 'series-complete',
        title: 'Series Wrap-Up – Your Complete Perplexity Mastery',
        learningOutcome: 'Consolidate all 5 courses and activate your research operating system immediately.',
        lessons: [
          {
            id: 'mastery-stack',
            title: 'You\'ve Built This Complete Research Stack',
            content: 'Congratulations! You\'ve mastered:\n\n✅ FOUNDATIONS: What is Perplexity? (3 min)\n✅ PROMPTING: Smart Questions (4 min)\n✅ INTEGRITY: Source Verification (4 min)\n✅ CONTENT: Market Research (4 min)\n✅ ENTERPRISE: Pro Workflow (5 min)\n\nTotal Investment: ~20 minutes\nLifetime ROI: 10,000+ hours saved, millions in better decisions\n\nBEFORE: Manual research, scattered notes, guesswork\nAFTER: Systematic intelligence, compound knowledge, strategic clarity'
          },
          {
            id: 'mastery-checklist',
            title: 'Complete Mastery Activation Checklist',
            content: 'Implement your ROS immediately:\n\nDaily (5 min): Intelligence briefing\nWeekly (45 min): Deep synthesis\nMonthly (2 hrs): Strategic Copilot\nPer Project: Space + Collection system\n\nPro Upgrade Path: API automation → Custom research agents\n\nYour research now works for you, not the other way around.',
            reflection: 'Review the complete 5-course journey. Which module will you implement first? Start with Daily Briefing or Weekly Synthesis and track your time savings over 30 days.'
          }
        ]
      }
    ],
    seoNotes: 'H1: Course title; H2: Modules; H3: Lessons for scannable hierarchy. Include ROS architecture diagram. Use 5-system framework throughout. Emphasize compound growth, time savings, and ROI. Include implementation checklist and automation templates.',
    expansionIdeas: 'Create advanced courses: "Perplexity Enterprise: Teams + API + Custom Agents" or "Building Research Automation at Scale." Offer downloadable "Complete 5-Course Mastery Package" with 50 pro prompts, Space templates, ROS dashboard (Notion), and 90-day tracker. Include certification challenge and community sharing.'
  },
  'midjourney-design/what-is-midjourney': {
    courseTitle: 'What is Midjourney & Prompt Engineering? Intermediate Guide to AI Visual Mastery',
    metaTitle: 'Midjourney AI Explained + Prompt Engineering Guide – Intermediate',
    metaDescription: 'Master Midjourney AI image generation and advanced prompt engineering techniques. Learn parameters, style control, image referencing, and professional workflows for stunning AI-generated visuals.',
    modules: [
      {
        id: 'midjourney-fundamentals',
        title: 'Midjourney Fundamentals + Access Methods',
        learningOutcome: 'Understand Midjourney\'s core technology and choose the right access method for your workflow.',
        lessons: [
          {
            id: 'core-technology',
            title: 'Core Technology: Latent Diffusion Model',
            content: 'Midjourney transforms text into art through a latent diffusion model trained on billions of image-text pairs. It converts natural language into photorealistic, artistic, or abstract visuals through iterative noise reduction.'
          },
          {
            id: 'access-methods',
            title: 'Access Methods in 2026',
            content: 'Multiple ways to access Midjourney:\n\n• Discord (primary): /imagine → text prompt → 4 image variations\n• Web Alpha: midjourney.com (browser-based, faster iteration)\n• API: Enterprise plans for automation\n\nEach offers different advantages for different workflows.'
          },
          {
            id: 'subscription-tiers',
            title: 'Subscription Tiers & GPU Minutes',
            content: 'Choose the plan that matches your volume:\n\n• Basic: 3.3 hrs GPU/month, Limited Fast Mode\n• Standard: 15 hrs GPU/month, Full Fast Mode\n• Pro: 30 hrs GPU/month, Full Fast Mode + Stealth Mode\n• Mega: 60 hrs GPU/month, Full Fast Mode + Stealth Mode\n\nPro Move: Standard plan + Relax Mode = unlimited generations (slower queue). Perfect for experimentation.'
          }
        ]
      },
      {
        id: 'prompt-engineering',
        title: 'Prompt Engineering Framework (The 7-Layer Method)',
        learningOutcome: 'Master the 7-layer prompt structure that separates amateur from professional results.',
        lessons: [
          {
            id: 'basic-to-pro',
            title: 'From Basic to Professional Prompts',
            content: 'Prompt Structure:\n[LAYER 1: Subject] + [2: Medium] + [3: Style] + [4: Lighting] + [5: Composition] + [6: Mood] + [7: Parameters]\n\nExample Evolution:\nAmateur: "dragon"\nPro: "highly detailed iridescent dragon perched on ancient castle turret, digital painting by Greg Rutkowski, dramatic golden hour lighting, cinematic depth of field, epic fantasy atmosphere --ar 16:9 --v 6 --s 750 --q 2"\n\nNotice how the pro prompt specifies every visual element.'
          },
          {
            id: 'parameter-mastery',
            title: 'Parameter Mastery (Essential Commands)',
            content: 'Essential parameters for controlling output:\n\n• --ar (Aspect Ratio): 16:9, 1:1, 9:16 → Social to Print optimization\n• --v (Model Version): 6.1, 6 → Latest features and improvements\n• --s (Stylization): 0-1000 → Artistic (750) vs Realistic (100)\n• --q (Quality): 0.25, 0.5, 1, 2 → Detail level vs Speed\n• --c (Chaos): 0-100 → Creative exploration and variation\n• --iw (Image Weight): 0-2 → Reference image influence\n\nMastering these parameters gives you complete visual control.',
            exercise: 'Generate the same subject with --s 100, --s 500, and --s 750. Study how stylization parameter dramatically affects artistic expression.'
          }
        ]
      },
      {
        id: 'advanced-techniques',
        title: 'Advanced Techniques – Image Referencing + Remix',
        learningOutcome: 'Use image referencing and remix mode to achieve consistent, iterative results.',
        lessons: [
          {
            id: 'image-prompting',
            title: 'Image Prompting (Combining Text + Visual Reference)',
            content: 'Double your control with image prompting:\n\n/imagine prompt: [your text] [image_url_1] [image_url_2] --iw 1.5\n\nPro Reference Strategy:\n• Character Consistency: Reuse same character image across scenes\n• Style Matching: Reference artist portfolio image\n• Mood Transfer: Reference perfect lighting/atmosphere\n\nImage references are your secret weapon for consistency.'
          },
          {
            id: 'remix-mode',
            title: 'Remix Mode (Evolution, Not Recreation)',
            content: 'Remix workflow for iterative refinement:\n\n1. Generate base image\n2. V1-V4 → Select favorite\n3. Remix ON → Edit prompt → New variations preserving composition\n\nProduction Workflow: Base image → Remix chain → Final polish\n\nRemix mode lets you evolve an image without starting over.'
          }
        ]
      },
      {
        id: 'professional-workflow',
        title: 'Professional Workflow Systems',
        learningOutcome: 'Build scalable systems for production-quality output at speed.',
        lessons: [
          {
            id: 'production-pipeline',
            title: 'The 5-Step Production Pipeline',
            content: 'Professional output follows this sequence:\n\n1. THUMBNAILS: Low --q 0.25 --s 250 → 12+ concepts\n2. SELECTION: Pick 2-3 winners → Upscale (U1-U4)\n3. VARIATION: Vary subtle (--c 10) → Pick production candidate\n4. POLISH: Remix with refined prompt + style references\n5. FINAL: --q 2 --s 500 → Export 4K\n\nThis pipeline ensures speed without sacrificing quality.'
          },
          {
            id: 'batch-processing',
            title: 'Batch Processing & Asset Organization',
            content: 'Professional systems need organization:\n\nBatch Processing:\n• Discord DM: Private generations (no public gallery)\n• Web Alpha: Side-by-side comparison + faster iterations\n• /switch: Clean slate between projects\n\nAsset Library Building:\n• Organize by: Character designs → Scene templates → Style references → Lighting setups\n• Tag system: --ar, --s, artist names for instant reuse\n\nOrganization enables rapid iteration and consistency.'
          }
        ]
      },
      {
        id: 'style-control',
        title: 'Style Control + Artist Referencing',
        learningOutcome: 'Master artistic style transfer and parameter fine-tuning for any aesthetic.',
        lessons: [
          {
            id: 'artist-styles',
            title: 'Artist Style Transfer (Legal + Effective)',
            content: 'Use artist references ethically:\n\n"by [artist], in the style of [artist]" → Direct homage\nSpecific works: Upload portfolio images as --iw 1.0 references\n\nTop 2026 Artists for Midjourney:\n• Greg Rutkowski: Cinematic fantasy\n• Alphonse Mucha: Art nouveau\n• James Gurney: Dinotopia realism\n• Studio Ghibli: Whimsical environments\n\nArtist references are your creative foundation.'
          },
          {
            id: 'style-matrix',
            title: 'Parameter Fine-Tuning Matrix by Style',
            content: 'Different aesthetics need different parameters:\n\nPhotorealistic: --s 100 --q 2 --v 6\nCinematic: --s 400 --ar 21:9\nIllustrated: --s 750 --style raw\nAbstract: --s 1000 --c 80\n\nUnderstanding these combinations unlocks any visual aesthetic.'
          }
        ]
      },
      {
        id: 'commercial-applications',
        title: 'Commercial Applications + Best Practices',
        learningOutcome: 'Deploy Midjourney visuals professionally across all platforms with confidence.',
        lessons: [
          {
            id: 'platform-optimization',
            title: 'Production-Ready Outputs for Every Platform',
            content: 'Optimize for each platform:\n\n• Social Media: --ar 16:9, 9:16, 1:1 (platform optimized)\n• Print: --ar 8.5:11, --q 2 (300 DPI)\n• Web: --ar 16:9, 1920px wide\n• Video Thumbnails: --ar 16:9, high contrast\n\nFormat matters. Tailor output to destination.'
          },
          {
            id: 'legal-ethical',
            title: 'Legal & Ethical Best Practices',
            content: 'Navigate AI-generated content responsibly:\n\n✅ Commercial rights included (paid plans)\n✅ Artist style reference OK (homage, not copying)\n❌ Direct trademarked characters/IP\n✅ Original characters + inspired environments\n\nPro Tip: Watermark during testing, remove for final delivery.\n\nAlways respect intellectual property and ethical guidelines.'
          }
        ]
      }
    ],
    seoNotes: 'H1: Course title; H2: Modules; H3: Lessons for scannable hierarchy. Include parameter comparison tables. Use example prompt evolution to show basic vs pro. Emphasize 7-layer method throughout. Include access method comparison and subscription matrix.',
    expansionIdeas: 'Create advanced courses: "Midjourney for Teams + API Automation" or "Professional Branding with AI Visuals." Offer downloadable "Midjourney Pro Prompt Library: 100 Production Templates" with style combinations. Include production challenge framework. Build parameter recipe database by aesthetic.'
  },
  'midjourney-design/prompt-anatomy': {
    courseTitle: 'The Anatomy of a Powerful Prompt: Advanced Prompt Engineering Mastery',
    metaTitle: 'Anatomy of Powerful AI Prompts – Advanced Engineering Guide (2026)',
    metaDescription: 'Dissect the 9-layer structure of production-grade prompts for Midjourney, Perplexity, ChatGPT, and Claude. Master constraint stacking, meta-prompting, chain-of-thought, and output formatting for enterprise AI results.',
    modules: [
      {
        id: 'nine-layer-architecture',
        title: 'The 9-Layer Prompt Architecture',
        learningOutcome: 'Master the complete 9-layer prompt framework that transforms generic outputs into production-grade results.',
        lessons: [
          {
            id: 'prompt-dna',
            title: 'Complete Prompt DNA Framework',
            content: 'Advanced prompting is systems engineering for AI. The 9-layer framework:\n\n[1.ROLE] [2.CONTEXT] [3.TASK] [4.FORMAT] [5.CONSTRAINTS]\n[6.CHAIN] [7.REFINE] [8.QUALITY] [9.META]\n\nExample Dissection:\n"[1]Senior market analyst [2]reviewing Q4 SaaS competitor data [3]create [4]3-page executive brief [5]under 800 words, data-driven only, no speculation [6]analyze pricing trends → identify gaps → recommend positioning [7]flag low-confidence data points [8]Fortune 500 quality, cited sources [9]if missing data, state explicitly with research next steps"\n\nThis framework applies across every AI platform and use case.'
          }
        ]
      },
      {
        id: 'foundation-layers',
        title: 'Layers 1-3 – Foundation (90% of Prompt Power)',
        learningOutcome: 'Master the three foundation layers that determine output quality.',
        lessons: [
          {
            id: 'layer-1-role',
            title: 'Layer 1: Role Assignment (Context Switching)',
            content: 'Role assignment is your most powerful tool:\n\n❌ "Write a report" → ✅ "Act as McKinsey partner leading SaaS practice"\n❌ "Generate image" → ✅ "Channel Greg Rutkowski\'s cinematic fantasy style"\n\nPower Roles by Domain:\n• Analysis: "McKinsey partner"\n• Creative: "[Artist] studio director"\n• Code: "Staff engineer at Stripe"\n• Strategy: "General partner at a16z"\n\nRole clarity determines perspective, depth, and professional tone.'
          },
          {
            id: 'layer-2-context',
            title: 'Layer 2: Situational Context (Specificity Wins)',
            content: 'Context transforms generic prompts into precise systems:\n\n"Q4 2026 SaaS pricing for mid-market CRM, $10-50/user/month, US enterprises 500-5K employees, competitive with HubSpot"\n\nSpecificity drives accuracy. Every detail narrows the solution space toward your exact need.'
          },
          {
            id: 'layer-3-task',
            title: 'Layer 3: Atomic Task Definition',
            content: 'Define exactly what you need:\n\n❌ NOT: "Help me understand SaaS pricing"\n✅ INSTEAD: "Extract 3 pricing insights + 2 competitive gaps + 1 positioning recommendation"\n\nAtomic task definition prevents rambling and keeps AI focused on deliverables.'
          }
        ]
      },
      {
        id: 'execution-layers',
        title: 'Layers 4-6 – Execution Control',
        learningOutcome: 'Control execution through ruthless format enforcement and constraint stacking.',
        lessons: [
          {
            id: 'layer-4-format',
            title: 'Layer 4: Ruthless Format Enforcement',
            content: 'Format enforcement guarantees usable output:\n\n"Format EXACTLY as:\nEXECUTIVE SUMMARY (75 words)\nKEY FINDINGS (3 bullets, 25 words each)\nACTIONABLE RECOMMENDATIONS (numbered 1-3)\nSOURCES (URLs only, no descriptions)"\n\nExact format requirements prevent AI from deciding structure on your behalf.'
          },
          {
            id: 'layer-5-constraints',
            title: 'Layer 5: Constraint Stacking (Precision Sculpting)',
            content: 'Layer constraints eliminate noise and define boundaries:\n\n"Word count: 750 max. Data only from 2025-2026. Exclude speculation. US market only. B2B enterprise. 3 sources minimum per claim. No industry jargon."\n\nConstraint stacking sculpts outputs toward your exact requirements by elimination.'
          },
          {
            id: 'layer-6-chain',
            title: 'Layer 6: Chain-of-Thought Instructions',
            content: 'Chain-of-thought reasoning dramatically improves quality:\n\n"Step 1: List all pricing data points. Step 2: Rank by recency. Step 3: Identify outliers. Step 4: Cross-reference competitors. Step 5: Synthesize 3 insights. Step 6: Derive recommendations."\n\nPro Discovery: CoT doubles reasoning accuracy, triples actionable output.'
          }
        ]
      },
      {
        id: 'polish-layers',
        title: 'Layers 7-9 – Polish & Error-Proofing',
        learningOutcome: 'Perfect outputs through self-critique, quality benchmarks, and edge case handling.',
        lessons: [
          {
            id: 'layer-7-critique',
            title: 'Layer 7: Self-Critique Mechanisms',
            content: 'Build AI review into the prompt:\n\n"After generating, review for: factual accuracy, actionability, word count compliance. Flag issues and fix before final output."\n\nSelf-critique reduces errors by forcing AI to validate its own work.'
          },
          {
            id: 'layer-8-quality',
            title: 'Layer 8: Quality Benchmarks',
            content: 'Set explicit quality targets:\n\n"Quality standards: Fortune 500 boardroom ready. Every claim cited. Zero fluff. Maximum signal."\n\nBenchmarks establish what excellence looks like for this specific project.'
          },
          {
            id: 'layer-9-meta',
            title: 'Layer 9: Meta-Instructions (Handle Edge Cases)',
            content: 'Edge case handling prevents failures:\n\n"If data insufficient: State clearly + suggest 3 next research steps.\nIf ambiguous requirements: Ask 1 clarifying question then proceed with assumptions stated."\n\nMeta-instructions prepare AI for incomplete information and ambiguity.'
          }
        ]
      },
      {
        id: 'platform-optimization',
        title: 'Platform-Specific Optimizations',
        learningOutcome: 'Apply the 9-layer framework across different AI platforms.',
        lessons: [
          {
            id: 'midjourney-visual',
            title: 'Midjourney (Visual Precision)',
            content: 'Visual platform optimization:\n\n"hyper-detailed [subject], [medium], by [artist1] and [artist2], [lighting], [composition], [mood] --ar 16:9 --v 6.1 --s 750 --q 2 --c 20 --style raw"\n\nVisual platforms need role + medium + artists + parameters stacked for control.'
          },
          {
            id: 'perplexity-research',
            title: 'Perplexity (Research Rigor)',
            content: 'Research platform optimization:\n\n"Deep Research: [topic]. Include: peer-reviewed sources post-2025, competitor analysis, pricing benchmarks, customer sentiment. Format: Executive brief + data tables + 3 predictions."\n\nResearch platforms need source recency + data types + output format.'
          },
          {
            id: 'reasoning-models',
            title: 'Claude/ChatGPT (Reasoning Depth)',
            content: 'Reasoning platform optimization:\n\n"Chain-of-thought reasoning. Think step-by-step. First [step 1]. Then [step 2]. Finally [step 3]. Output only final answer."\n\nReasoning platforms need step-by-step guidance + output gate.'
          }
        ]
      },
      {
        id: 'advanced-systems',
        title: 'Advanced Prompt Systems',
        learningOutcome: 'Scale prompts through cascades, inheritance, and negative prompting.',
        lessons: [
          {
            id: 'three-prompt-cascade',
            title: 'The 3-Prompt Cascade (Enterprise Gold)',
            content: 'Sequential prompting builds depth:\n\nPROMPT 1: Research/scoping → "Map current landscape"\nPROMPT 2: Analysis → "Synthesize patterns + gaps"\nPROMPT 3: Strategy → "Convert insights to 90-day roadmap"\n\nCascading lets AI build on prior outputs, creating strategic depth impossible in single prompts.'
          },
          {
            id: 'constraint-inheritance',
            title: 'Constraint Inheritance (Scale Winner)',
            content: 'Reusable prompt systems:\n\nSave master prompt → Reuse across projects → Swap only [context/subject] variables\n\nConstraint inheritance scales consistency across teams and projects without rebuilding prompts.'
          },
          {
            id: 'negative-prompting',
            title: 'Negative Prompting (Elimination Power)',
            content: 'Define what to exclude:\n\n"Exclude: generic stock photos, blurry images, poor anatomy, over-saturated colors, amateur composition"\n\nNegative prompts are often more powerful than positive ones for visual+text generation.'
          }
        ]
      },
      {
        id: 'measuring-roi',
        title: 'Measuring Prompt ROI',
        learningOutcome: 'Quantify the business value of advanced prompting systems.',
        lessons: [
          {
            id: 'success-metrics',
            title: 'Success Metrics for Advanced Prompts',
            content: 'Track measurable outcomes:\n\n✅ 1 prompt = 3 manual hours saved\n✅ 80% reduction in editing/revision\n✅ 95% first-pass quality acceptance\n✅ Cross-platform consistency (Midjourney → Perplexity → Claude)\n\nThese metrics show the true business impact of prompt engineering investment.'
          },
          {
            id: 'audit-checklist',
            title: 'Prompt Audit Checklist',
            content: 'Validate your prompts:\n\n[ ] Role clarity (Layer 1)\n[ ] Format enforced (Layer 4)\n[ ] Constraints explicit (Layer 5)\n[ ] Chain-of-thought present (Layer 6)\n[ ] Error handling included (Layer 9)\n\nUse this checklist to ensure every production prompt meets professional standards.',
            reflection: 'Rewrite your last 5 prompts using the full 9-layer architecture. Compare quality metrics before and after.'
          }
        ]
      }
    ],
    seoNotes: 'H1: Course title; H2: Modules; H3: Lessons for scannable hierarchy. Include 9-layer architecture diagram. Use side-by-side examples (bad vs good prompts). Include platform comparison matrix. Emphasize constraint stacking and chain-of-thought throughout.',
    expansionIdeas: 'Create advanced courses: "Prompt Systems Engineering" (API chaining + agent orchestration) or "Enterprise Prompt Management." Offer downloadable "9-Layer Prompt Builder Worksheet + 25 Production Templates." Include before/after case studies. Build platform-specific prompt template library.'
  }
};
