"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
const UserIdentityForm = dynamic(() => import("../../../../../components/UserIdentityForm"), { ssr: false });
import { getUserId, getFullName, isFullNameLocked } from "../../../../../utils/userIdentity";
import { useRouter } from "next/navigation";

const EXAM_OVERVIEW = {
  title: "Generative AI Practitioner — Final Certification Exam",
  duration: "90 minutes",
  totalScore: 100,
  passingScore: 70,
  parts: [
    "Part 1 — Knowledge Check (30%)",
    "Part 2 — Applied Scenarios (40%)",
    "Part 3 — Practical Task (30%)"
  ]
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const RAW_PART1_QUESTIONS = [
  {
    id: "KC1",
    type: "single",
    question:
      "You need a concise meeting summary with decisions and action items. Which prompt is best?",
    options: [
      { id: "A", text: "Summarize this meeting." },
      {
        id: "B",
        text:
          "Summarize the meeting in 6 bullet points. Include: decisions made, action items with owners and deadlines, and open questions. Keep it under 180 words."
      },
      {
        id: "C",
        text:
          "Write a detailed transcript and include everything that was said."
      },
      {
        id: "D",
        text:
          "Give me a creative recap of the meeting in a storytelling style."
      }
    ],
    correctAnswers: ["B"],
    explanation:
      "The best prompt defines the format, required elements, and length constraints for a useful, actionable summary."
  },
  {
    id: "KC2",
    type: "single",
    question:
      "You must draft a client email using sensitive customer data. What is the safest first step?",
    options: [
      { id: "A", text: "Paste all raw data so the model has full context." },
      {
        id: "B",
        text:
          "Anonymize or remove sensitive details, and include only what is needed for the draft."
      },
      {
        id: "C",
        text: "Ask the model to store the data for later use." 
      },
      {
        id: "D",
        text: "Skip human review because AI is more consistent." 
      }
    ],
    correctAnswers: ["B"],
    explanation:
      "Responsible use starts with minimizing sensitive data exposure and keeping only necessary context."
  },
  {
    id: "KC3",
    type: "multi",
    question:
      "Which actions improve the reliability of AI-generated content? (Select all that apply)",
    options: [
      { id: "A", text: "Ask for sources or assumptions and verify them." },
      { id: "B", text: "Accept the output if it sounds confident." },
      { id: "C", text: "Cross-check key facts with trusted references." },
      { id: "D", text: "Run a quick edge-case check or counterexample test." }
    ],
    correctAnswers: ["A", "C", "D"],
    explanation:
      "Verification, fact-checking, and testing edge cases increase trustworthiness. Confidence alone is not evidence."
  },
  {
    id: "KC4",
    type: "single",
    question:
      "You notice the model is inventing details. What is the best response?",
    options: [
      { id: "A", text: "Ignore it if the answer looks plausible." },
      { id: "B", text: "Ask the model to be more creative." },
      {
        id: "C",
        text:
          "Request a grounded answer, ask for sources, and verify before using the output."
      },
      { id: "D", text: "Switch to a longer prompt without changing the task." }
    ],
    correctAnswers: ["C"],
    explanation:
      "When hallucinations appear, you should constrain the output, request sources, and verify against trusted data."
  },
  {
    id: "KC5",
    type: "single",
    question:
      "Why add a short example to a prompt?",
    options: [
      { id: "A", text: "It reduces the model’s ability to generalize." },
      {
        id: "B",
        text: "It demonstrates the expected format, tone, and level of detail."
      },
      { id: "C", text: "It makes the model always produce longer outputs." },
      { id: "D", text: "It guarantees 100% factual accuracy." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Examples help the model align with the desired output style and structure."
  },
  {
    id: "KC6",
    type: "single",
    question:
      "You need a report in a formal tone with bullet points and a 200-word limit. What should you include?",
    options: [
      { id: "A", text: "Only the topic; tone and length are implied." },
      {
        id: "B",
        text: "Explicit instructions for tone, format, and word limit."
      },
      { id: "C", text: "A long paragraph and no formatting guidance." },
      { id: "D", text: "A request to make it fun and casual." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Clear constraints on tone, format, and length improve consistency and usefulness."
  },
  {
    id: "KC7",
    type: "single",
    question:
      "Which use of generative AI is most appropriate without additional approvals?",
    options: [
      { id: "A", text: "Drafting a confidential legal contract." },
      { id: "B", text: "Summarizing a public blog post for internal notes." },
      { id: "C", text: "Generating medical advice for a patient." },
      { id: "D", text: "Writing performance reviews using sensitive HR data." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Low-risk, public content tasks are generally appropriate without extra approvals."
  },
  {
    id: "KC8",
    type: "multi",
    question:
      "Which prompt elements help reduce ambiguous outputs? (Select all that apply)",
    options: [
      { id: "A", text: "Define the audience and purpose." },
      { id: "B", text: "Leave format unspecified." },
      { id: "C", text: "Provide required sections or headings." },
      { id: "D", text: "Set constraints (length, tone, do/don’t)." }
    ],
    correctAnswers: ["A", "C", "D"],
    explanation:
      "Specific audience, structure, and constraints reduce ambiguity and improve relevance."
  },
  {
    id: "KC9",
    type: "single",
    question:
      "What is the best reason to keep a prompt library for recurring tasks?",
    options: [
      { id: "A", text: "It prevents any need for human review." },
      { id: "B", text: "It increases consistency and reduces setup time." },
      { id: "C", text: "It forces all tasks to use the same output." },
      { id: "D", text: "It guarantees zero errors." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Reusable prompts help standardize quality and speed up repeatable workflows."
  },
  {
    id: "KC10",
    type: "single",
    question:
      "You used AI to draft a report that will be shared externally. What is a good practice?",
    options: [
      { id: "A", text: "Publish immediately to save time." },
      { id: "B", text: "Disclose AI assistance if required, review for accuracy, and check for sensitive data." },
      { id: "C", text: "Remove all citations so the report looks original." },
      { id: "D", text: "Ask the model to add fictional sources." }
    ],
    correctAnswers: ["B"],
    explanation:
      "External communications should be reviewed, validated, and compliant with disclosure and privacy policies."
  }
];

const RAW_PART2_SCENARIOS = [
  {
    id: "SC1",
    scenario:
      "You are preparing a product launch email. You have a draft outline, a list of customer benefits, and a set of compliance-approved claims.",
    actions: [
      {
        id: "A",
        text: "Ask the AI to write a launch email and explicitly paste the approved claims and tone guidelines."
      },
      {
        id: "B",
        text: "Ask the AI to invent compelling claims to make the launch more exciting."
      },
      {
        id: "C",
        text: "Let the AI decide the product facts without providing references."
      }
    ],
    correctAnswer: "A",
    explanation:
      "Providing approved claims and tone guidance ensures the output stays accurate and compliant."
  },
  {
    id: "SC2",
    scenario:
      "A manager wants a summary of a 20-page policy document for new hires. The summary must be accurate and easy to follow.",
    actions: [
      {
        id: "A",
        text: "Ask AI to summarize without giving the source document, then publish it as-is."
      },
      {
        id: "B",
        text: "Provide the policy, request a bullet summary with sections, and review key points against the original."
      },
      {
        id: "C",
        text: "Ask AI to write a shorter, more creative version with no references."
      }
    ],
    correctAnswer: "B",
    explanation:
      "Grounding the model in the source and verifying key points preserves accuracy and clarity."
  },
  {
    id: "SC3",
    scenario:
      "A student is overwhelmed by a long reading list and wants a study plan for the next 4 weeks.",
    actions: [
      {
        id: "A",
        text: "Ask AI to generate a week-by-week plan based on priorities, time available, and upcoming deadlines."
      },
      {
        id: "B",
        text: "Ask AI to read every book and provide a single summary."
      },
      {
        id: "C",
        text: "Use AI to decide which topics are unimportant without checking the course requirements."
      }
    ],
    correctAnswer: "A",
    explanation:
      "A plan based on constraints and priorities is the most practical, realistic use of AI."
  },
  {
    id: "SC4",
    scenario:
      "You handle support tickets. You want AI to draft replies while keeping a consistent, empathetic tone.",
    actions: [
      {
        id: "A",
        text: "Create a template prompt with tone guidelines and require human review before sending."
      },
      { id: "B", text: "Let AI auto-send responses to save time." },
      {
        id: "C",
        text: "Ask AI to make responses as short as possible, regardless of customer context."
      },
      {
        id: "D",
        text: "Avoid providing ticket details to keep privacy, and ask AI to guess the issue."
      }
    ],
    correctAnswer: "A",
    explanation:
      "Templates plus human review balance efficiency, tone consistency, and accuracy."
  }
];

const PRACTICAL_EVALUATION_CRITERIA = [
  "Clear objective and audience definition",
  "Well-structured prompt or workflow (steps, constraints, and format)",
  "Responsible use (privacy-aware, avoids sensitive data exposure)",
  "Grounding and verification plan for key facts",
  "Output quality: clarity, usefulness, and completeness",
  "Reflection or iteration plan (how you would improve the result)"
];

const PRACTICAL_TASK = {
  pathA: {
    title: "Path A — Guided Practical Task (Students / Beginners)",
    instructions: [
      "Scenario: You are helping a student club publish a weekly update.",
      "Input notes (use these in your prompt):",
      "- Event: AI Study Jam on Feb 12, 6–8 PM, Room B12",
      "- Speaker: Guest mentor from local startup",
      "- Bring: laptop, charger, and questions",
      "- RSVP deadline: Feb 9",
      "- Contact: studentclub@example.com",
      "Task: Write a prompt that turns the notes into a polished email announcement.",
      "Your prompt must specify tone, length, required sections, and a call-to-action.",
      "Deliverable: Provide the exact prompt you would use and a 3–5 sentence rationale."
    ]
  },
  pathB: {
    title: "Path B — Real-World Practical Task (Professionals)",
    instructions: [
      "Scenario: You lead a team preparing a monthly stakeholder update.",
      "Task: Design an AI-assisted workflow that turns raw notes into a concise report.",
      "Your workflow should include: a prompt template, a verification step, and a final review checklist.",
      "Deliverable: Provide the prompt template, the workflow steps, and a brief rationale for each step."
    ]
  }
};

type AnswerMap = Record<string, string[]>;
type SubmittedMap = Record<string, boolean>;

export default function GenerativeAIPractitionerExamStartPage() {
  // Randomisation à chaque accès (montage du composant)
  const [part1Questions, setPart1Questions] = useState<typeof RAW_PART1_QUESTIONS>([]);
  const [part2Scenarios, setPart2Scenarios] = useState<typeof RAW_PART2_SCENARIOS>([]);
  useEffect(() => {
    // Mélange les réponses de chaque question
    const shuffledPart1 = shuffleArray(RAW_PART1_QUESTIONS).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setPart1Questions(shuffledPart1);
    setPart2Scenarios(shuffleArray(RAW_PART2_SCENARIOS));
  }, []);
  // Gestion identité utilisateur minimale
  const [identityReady, setIdentityReady] = useState(false);
  useEffect(() => {
    // Toujours demander l'identité avant l'examen
    setIdentityReady(false);
  }, []);
  const handleIdentityValidated = () => setIdentityReady(true);
    // Bloquer le retour arrière (back navigation)
    useEffect(() => {
      const handlePopState = (e: PopStateEvent) => {
        e.preventDefault();
        window.history.pushState(null, '', window.location.href);
        alert("Le retour arrière est désactivé pendant l'examen.");
      };
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }, []);
  const router = useRouter();
  // Clé unique pour localStorage
  const STORAGE_KEY = 'examState-generative-ai-practitioner';
  const EXAM_DURATION_SECONDS = 90 * 60;
  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
  const [selectedPracticalPath, setSelectedPracticalPath] = useState<"A" | "B" | null>(null);
  const [part1Answers, setPart1Answers] = useState<AnswerMap>({});
  const [part2Answers, setPart2Answers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState<SubmittedMap>({});
  const [showTimeUp, setShowTimeUp] = useState(false);

  // Timer effect
  useEffect(() => {
    if (showTimeUp) return;
    if (timeLeft <= 0) {
      setShowTimeUp(true);
      setTimeLeft(0);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, showTimeUp]);

                  // Charger l’état sauvegardé au démarrage
                  useEffect(() => {
                    const saved = localStorage.getItem(STORAGE_KEY);
                    if (saved) {
                      try {
                        const state = JSON.parse(saved);
                        if (state.timeLeft) setTimeLeft(state.timeLeft);
                        if (state.part1Answers) setPart1Answers(state.part1Answers);
                        if (state.part2Answers) setPart2Answers(state.part2Answers);
                        if (state.submitted) setSubmitted(state.submitted);
                        if (state.selectedPracticalPath) setSelectedPracticalPath(state.selectedPracticalPath);
                      } catch {}
                    }
                  }, []);

                  // Sauvegarder l’état à chaque changement
                  useEffect(() => {
                    const state = {
                      timeLeft,
                      part1Answers,
                      part2Answers,
                      submitted,
                      selectedPracticalPath
                    };
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
                  }, [timeLeft, part1Answers, part2Answers, submitted, selectedPracticalPath]);

  // Nouvelle logique : réussite si au moins 10/14 bonnes réponses (70%)
  const totalQuestions = part1Questions.length + part2Scenarios.length;

  const answeredCount = useMemo(() => {
    const submittedCount = Object.values(submitted).filter(Boolean).length;
    return Math.min(submittedCount, totalQuestions);
  }, [submitted, totalQuestions]);

  const allQuestionsAnswered = answeredCount === totalQuestions;
  const correctAnswersCount = useMemo(() => {
    let count = 0;
    part1Questions.forEach((q) => {
      const isSubmitted = submitted[q.id];
      if (!isSubmitted) return;
      const selected = part1Answers[q.id] ?? [];
      const correct = q.correctAnswers;
      const isCorrect =
        selected.length === correct.length &&
        selected.every((answer) => correct.includes(answer));
      if (isCorrect) count++;
    });
    part2Scenarios.forEach((s) => {
      const isSubmitted = submitted[s.id];
      if (!isSubmitted) return;
      const selected = part2Answers[s.id] ?? [];
      const isCorrect = selected.includes(s.correctAnswer);
      if (isCorrect) count++;
    });
    return count;
  }, [part1Answers, part2Answers, submitted]);

  const score = useMemo(() => {
    // Pour compatibilité avec la page de résultat, score sur 100
    return Math.round((correctAnswersCount / totalQuestions) * 100);
  }, [correctAnswersCount, totalQuestions]);

  const handleSingleSelect = (
    section: "part1" | "part2",
    questionId: string,
    answerId: string
  ) => {
    if (section === "part1") {
      setPart1Answers((prev) => ({ ...prev, [questionId]: [answerId] }));
      return;
    }

    setPart2Answers((prev) => ({ ...prev, [questionId]: [answerId] }));
  };

  const handleMultiToggle = (questionId: string, answerId: string) => {
    setPart1Answers((prev) => {
      const current = new Set(prev[questionId] ?? []);
      if (current.has(answerId)) {
        current.delete(answerId);
      } else {
        current.add(answerId);
      }
      return { ...prev, [questionId]: Array.from(current) };
    });
  };

  const handleSubmit = (questionId: string) => {
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  if (!identityReady) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8">
          <UserIdentityForm onValidated={handleIdentityValidated} />
        </div>
      </main>
    );
  }

  return (
    <>
      {showTimeUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
            <h2 className="text-2xl font-extrabold text-red-700 mb-4">You made it to the end ...</h2>
            <p className="mb-4 text-center text-slate-800 dark:text-slate-100 font-semibold">
              Time is up, but every minute spent here is a step closer to excellence.<br />
              Keep learning, keep growing, and always aim higher!
            </p>
            <div className="flex gap-4 mb-6">
              <a href="/certifications" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Certifications</a>
              <a href="/learn" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Learn</a>
            </div>
            <a href="/" className="block px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-center w-full mt-2">Home</a>
          </div>
        </div>
      )}
      <main className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="fixed right-2 top-24 z-40 flex flex-col items-center">
        <span className="text-[10px] text-slate-500 dark:text-slate-300">Time remaining</span>
        <span className="text-lg font-bold text-blue-600 dark:text-blue-400 tracking-widest bg-white dark:bg-slate-900 px-2 py-0.5 rounded shadow">
          {formatTime(timeLeft)}
        </span>
      </div>
      <div className="fixed right-8 top-48 h-[50vh] w-6 flex flex-col items-center z-30">
        <span className="mb-2 text-xs text-blue-600 dark:text-blue-400 font-semibold">{progressPercent}%</span>
        <div className="relative h-full w-2 bg-slate-200 dark:bg-slate-800 rounded-full">
          <div
            className="absolute left-0 top-0 w-2 bg-blue-600 rounded-full transition-all"
            style={{ height: `${progressPercent}%` }}
            aria-label="Exam progress vertical"
          />
        </div>
      </div>
      <section className="border-b border-slate-200/70 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Final Certification Exam
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold leading-tight">
            {EXAM_OVERVIEW.title}
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            This exam validates practical, responsible use of generative AI in real workflows. Answer all parts. Total score is {EXAM_OVERVIEW.totalScore}; passing score is {EXAM_OVERVIEW.passingScore}. Same certification applies to both practical paths.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Duration</p>
              <p className="mt-2 font-semibold text-slate-900 dark:text-white">{EXAM_OVERVIEW.duration}</p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Total Score</p>
              <p className="mt-2 font-semibold text-slate-900 dark:text-white">{EXAM_OVERVIEW.totalScore}</p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Passing Score</p>
              <p className="mt-2 font-semibold text-slate-900 dark:text-white">{EXAM_OVERVIEW.passingScore}</p>
            </div>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {EXAM_OVERVIEW.parts.map((part) => (
              <li key={part}>• {part}</li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Progress (Part 1 & 2)</p>
                <p className="mt-1 text-lg font-semibold">{answeredCount}/{totalQuestions} answered</p>
              </div>
                <div>
                  {/* Score supprimé, pas de note affichée */}
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: `${progressPercent}%` }}
                aria-label="Exam progress"
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Part 3 is evaluated by rubric and does not affect the auto-graded score.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-semibold">Part 1 — Knowledge Check (30%)</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          10 multiple-choice or multi-select questions. Focus on practical understanding.
        </p>
        <div className="mt-6 space-y-6">
          {part1Questions.map((q) => (
            <div key={q.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{q.question}</h3>
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  {q.type === "multi" ? "Multi-select" : "Single-select"}
                </span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {q.options.map((opt) => {
                  const selected = part1Answers[q.id] ?? [];
                  const isChecked = selected.includes(opt.id);
                  return (
                    <label key={opt.id} className="flex items-start gap-3 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-3 py-2 cursor-pointer">
                      <input
                        type={q.type === "multi" ? "checkbox" : "radio"}
                        name={q.id}
                        checked={isChecked}
                        onChange={() =>
                          q.type === "multi"
                            ? handleMultiToggle(q.id, opt.id)
                            : handleSingleSelect("part1", q.id, opt.id)
                        }
                        className="mt-1"
                        disabled={submitted[q.id]}
                      />
                      <span>
                        <span className="font-semibold">{opt.id}.</span> {opt.text}
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleSubmit(q.id)}
                  className="rounded-md bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                >
                  Confirm answer
                </button>
                {submitted[q.id] ? (
                  <span className="text-sm text-slate-500">Answer locked and evaluated.</span>
                ) : null}
              </div>
              {submitted[q.id] ? (
                <div className="mt-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 text-sm">
                  <p className="font-semibold text-slate-700 dark:text-slate-200">Correct answer(s): {q.correctAnswers.join(", ")}</p>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{q.explanation}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Part 2 — Applied Scenarios (40%)</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            4 scenario-based questions. Choose the best AI-assisted approach.
          </p>
          <div className="mt-6 space-y-6">
            {part2Scenarios.map((s) => (
              <div key={s.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-6">
                <h3 className="text-lg font-semibold">{s.scenario}</h3>
                <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  {s.actions.map((action) => {
                    const selected = part2Answers[s.id] ?? [];
                    const isChecked = selected.includes(action.id);
                    return (
                      <label key={action.id} className="flex items-start gap-3 rounded-md border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 px-3 py-2 cursor-pointer">
                        <input
                          type="radio"
                          name={s.id}
                          checked={isChecked}
                          onChange={() => handleSingleSelect("part2", s.id, action.id)}
                          className="mt-1"
                          disabled={submitted[s.id]}
                        />
                        <span>
                          <span className="font-semibold">{action.id}.</span> {action.text}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleSubmit(s.id)}
                    className="rounded-md bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                  >
                    Confirm answer
                  </button>
                  {submitted[s.id] ? (
                    <span className="text-sm text-slate-500">Answer locked and evaluated.</span>
                  ) : null}
                </div>
                {submitted[s.id] ? (
                  <div className="mt-4 rounded-xl bg-white dark:bg-slate-900 p-4 text-sm">
                    <p className="font-semibold text-slate-700 dark:text-slate-200">Correct answer: {s.correctAnswer}</p>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">{s.explanation}</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-semibold">Part 3 — Practical Task (30%)</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Choose one of the two equivalent paths. Both are assessed with the same criteria.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <label className={`rounded-2xl border cursor-pointer transition-all border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 ${selectedPracticalPath === "A" ? "ring-2 ring-blue-500 border-blue-500" : "hover:border-blue-400"}`}>
            <input
              type="radio"
              name="practicalPath"
              value="A"
              checked={selectedPracticalPath === "A"}
              onChange={() => setSelectedPracticalPath("A")}
              className="mr-3 accent-blue-600"
            />
            <span className="align-top">
              <h3 className="text-lg font-semibold inline">{PRACTICAL_TASK.pathA.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {PRACTICAL_TASK.pathA.instructions.map((line, idx) => (
                  <li key={`${line}-${idx}`}>• {line}</li>
                ))}
              </ul>
            </span>
          </label>
          <label className={`rounded-2xl border cursor-pointer transition-all border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 ${selectedPracticalPath === "B" ? "ring-2 ring-blue-500 border-blue-500" : "hover:border-blue-400"}`}>
            <input
              type="radio"
              name="practicalPath"
              value="B"
              checked={selectedPracticalPath === "B"}
              onChange={() => setSelectedPracticalPath("B")}
              className="mr-3 accent-blue-600"
            />
            <span className="align-top">
              <h3 className="text-lg font-semibold inline">{PRACTICAL_TASK.pathB.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {PRACTICAL_TASK.pathB.instructions.map((line, idx) => (
                  <li key={`${line}-${idx}`}>• {line}</li>
                ))}
              </ul>
            </span>
          </label>
        </div>

        {selectedPracticalPath && (
          <>
            <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-6">
              <h3 className="text-lg font-semibold">Evaluation criteria (same for both paths)</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {PRACTICAL_EVALUATION_CRITERIA.map((criterion) => (
                  <li key={criterion}>• {criterion}</li>
                ))}
              </ul>
            </div>
            {allQuestionsAnswered && (
              <div className="mt-8 flex justify-center">
                <button
                  className="rounded-md bg-blue-600 text-white px-6 py-3 text-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  type="button"
                  onClick={() => {
                    router.push(`/certifications/exam-result?page=generative-ai-practitioner&score=${score}`);
                  }}
                >
                  exam result
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
    </>
  );
}