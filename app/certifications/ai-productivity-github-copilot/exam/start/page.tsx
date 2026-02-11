"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
const UserIdentityForm = dynamic(() => import("../../../../../components/UserIdentityForm"), { ssr: false });
import { getUserId, getFullName, isFullNameLocked } from "../../../../../utils/userIdentity";

// Bloquer le retour arrière (back navigation)
// Ce useEffect doit être placé dans le composant principal, pas au niveau du module

const EXAM_OVERVIEW = {
  title: "AI Productivity & GitHub Copilot — Final Certification Exam",
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
      "You want Copilot to generate a function with a clear purpose and inputs. What helps most?",
    options: [
      { id: "A", text: "An empty file and a vague comment." },
      {
        id: "B",
        text:
          "A descriptive function name, parameter list, and a brief docstring with examples."
      },
      { id: "C", text: "Only a TODO with no context." },
      { id: "D", text: "A random snippet from another project." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Clear intent, parameters, and examples give Copilot the strongest signal for accurate code generation."
  },
  {
    id: "KC2",
    type: "single",
    question:
      "Copilot suggests a block of code you don’t fully understand. What is the best next step?",
    options: [
      { id: "A", text: "Accept it to save time and move on." },
      {
        id: "B",
        text: "Review it, run tests, and ask Copilot to explain or simplify if needed."
      },
      { id: "C", text: "Assume it’s correct because it compiles." },
      { id: "D", text: "Remove all tests so it cannot fail." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Responsible usage includes understanding, testing, and validating AI-generated code."
  },
  {
    id: "KC3",
    type: "multi",
    question:
      "Which actions improve Copilot’s suggestions? (Select all that apply)",
    options: [
      { id: "A", text: "Add meaningful variable names and types." },
      { id: "B", text: "Remove context to avoid bias." },
      { id: "C", text: "Write a short comment describing the desired behavior." },
      { id: "D", text: "Provide a small example of input/output." }
    ],
    correctAnswers: ["A", "C", "D"],
    explanation:
      "Good local context—names, comments, and examples—drives more accurate suggestions."
  },
  {
    id: "KC4",
    type: "single",
    question:
      "When is it most appropriate to use Copilot for tests?",
    options: [
      { id: "A", text: "Never; tests should always be handwritten." },
      {
        id: "B",
        text: "To draft unit test scaffolding that you then review and adjust."
      },
      { id: "C", text: "To auto-generate tests and skip reviewing them." },
      { id: "D", text: "Only for production deployment scripts." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Copilot can accelerate test creation, but human review ensures correctness and coverage."
  },
  {
    id: "KC5",
    type: "single",
    question:
      "You need to refactor a function. What prompt yields the best result?",
    options: [
      { id: "A", text: "Make it better." },
      {
        id: "B",
        text: "Refactor to reduce duplication and keep the public API unchanged. Provide the updated function only."
      },
      { id: "C", text: "Rewrite the file in a different style." },
      { id: "D", text: "Delete all comments and shorten names." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Constraints and scope help Copilot deliver a safe, targeted refactor."
  },
  {
    id: "KC6",
    type: "single",
    question:
      "Which statement about Copilot and licensing is most accurate?",
    options: [
      { id: "A", text: "Copilot guarantees all code is license-safe." },
      {
        id: "B",
        text: "You should review suggestions and ensure they comply with your project’s licensing policy."
      },
      { id: "C", text: "Licensing doesn’t apply to AI-generated code." },
      { id: "D", text: "Copying large blocks of suggested code never creates risk." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Licensing responsibility stays with the developer and organization."
  },
  {
    id: "KC7",
    type: "multi",
    question:
      "Which are good practices when accepting Copilot suggestions? (Select all that apply)",
    options: [
      { id: "A", text: "Run the test suite or relevant checks." },
      { id: "B", text: "Verify edge cases and error handling." },
      { id: "C", text: "Accept everything to maintain flow." },
      { id: "D", text: "Check for security or data handling concerns." }
    ],
    correctAnswers: ["A", "B", "D"],
    explanation:
      "Validation steps reduce regressions and security risks."
  },
  {
    id: "KC8",
    type: "single",
    question:
      "You’re working on a critical bug fix. What is the best way to use Copilot?",
    options: [
      { id: "A", text: "Ask it to fix the bug and deploy immediately." },
      {
        id: "B",
        text: "Use it to propose fixes, then test, review, and validate before merging."
      },
      { id: "C", text: "Disable tests to ship faster." },
      { id: "D", text: "Only use Copilot for comments." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Copilot helps explore solutions, but correctness and safety require validation."
  },
  {
    id: "KC9",
    type: "single",
    question:
      "What is the best use of Copilot Chat for onboarding to a new codebase?",
    options: [
      { id: "A", text: "Generate a full system redesign from scratch." },
      {
        id: "B",
        text: "Ask for summaries of key modules, data flow, and how to run tests."
      },
      { id: "C", text: "Replace code reviews with chat responses." },
      { id: "D", text: "Copy code from other repositories to speed up." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Copilot Chat is well-suited for orientation and knowledge discovery within a codebase."
  },
  {
    id: "KC10",
    type: "single",
    question:
      "Which approach best improves productivity while maintaining quality?",
    options: [
      { id: "A", text: "Let Copilot write all code and skip reviews." },
      {
        id: "B",
        text: "Use Copilot for drafts and boilerplate, then refine with code review and tests."
      },
      { id: "C", text: "Turn off linting to reduce friction." },
      { id: "D", text: "Avoid documentation to move faster." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Balanced usage preserves quality while gaining speed."
  }
];

const RAW_PART2_SCENARIOS = [
  {
    id: "SC1",
    scenario:
      "You need to add a new API endpoint. The codebase has a consistent pattern for controllers and tests.",
    actions: [
      {
        id: "A",
        text: "Ask Copilot to draft the endpoint following the existing pattern, then review and add tests."
      },
      {
        id: "B",
        text: "Ask Copilot to generate a new pattern and refactor the whole codebase."
      },
      {
        id: "C",
        text: "Paste no context and hope Copilot guesses the architecture."
      }
    ],
    correctAnswer: "A",
    explanation:
      "Provide context and stick to existing patterns; then verify with tests and review."
  },
  {
    id: "SC2",
    scenario:
      "A teammate reports a failing test in CI. You need to diagnose and fix it quickly.",
    actions: [
      {
        id: "A",
        text: "Use Copilot to summarize the failing test and suggest possible fixes, then validate locally."
      },
      { id: "B", text: "Disable the test to unblock the pipeline." },
      { id: "C", text: "Merge anyway since it only fails in CI." }
    ],
    correctAnswer: "A",
    explanation:
      "Copilot can assist diagnosis, but the fix must be verified with local tests."
  },
  {
    id: "SC3",
    scenario:
      "You are writing a script to process customer files that contain sensitive data.",
    actions: [
      {
        id: "A",
        text: "Use anonymized sample data in prompts and avoid sharing sensitive details."
      },
      { id: "B", text: "Paste real customer data so Copilot can be accurate." },
      { id: "C", text: "Skip any security review to save time." }
    ],
    correctAnswer: "A",
    explanation:
      "Privacy-first practices are required when using AI tools in sensitive contexts."
  },
  {
    id: "SC4",
    scenario:
      "You need to improve performance in a hot path. The team requires clear evidence for changes.",
    actions: [
      {
        id: "A",
        text: "Ask Copilot for optimization ideas, then profile and compare before/after results."
      },
      { id: "B", text: "Apply the first suggestion without benchmarking." },
      { id: "C", text: "Disable logging and assume performance improves." },
      { id: "D", text: "Rewrite everything in a new language immediately." }
    ],
    correctAnswer: "A",
    explanation:
      "Optimizations should be evidence-based; Copilot suggestions still need profiling and validation."
  }
];

const PRACTICAL_EVALUATION_CRITERIA = [
  "Clear objective and constraints",
  "Prompt or workflow is specific and structured",
  "Uses Copilot responsibly (review, tests, security checks)",
  "Maintains code quality and existing conventions",
  "Verification plan (tests, linting, profiling as needed)",
  "Reflection on risks and how to mitigate them"
];

const PRACTICAL_TASK = {
  pathA: {
    title: "Path A — Guided Practical Task (Students / Beginners)",
    instructions: [
      "Scenario: You need a small utility function to validate email addresses in a JavaScript project.",
      "Task: Write a prompt for Copilot that generates the function and 3 unit tests.",
      "Constraints: Keep API simple, include edge cases (empty string, missing domain), and use a basic regex.",
      "Deliverable: Provide your exact prompt and a brief checklist for reviewing the output."
    ]
  },
  pathB: {
    title: "Path B — Real-World Practical Task (Professionals)",
    instructions: [
      "Scenario: Your team is adding a new REST endpoint and wants consistent patterns.",
      "Task: Design an AI-assisted workflow to generate the handler, validation, and tests.",
      "Your workflow should include: a prompt template, review steps, and test/CI verification.",
      "Deliverable: Provide the prompt template, workflow steps, and short rationale for each step."
    ]
  }
};

type AnswerMap = Record<string, string[]>;
type SubmittedMap = Record<string, boolean>;


// Liste des codes valides (voucher et retake)
const VALID_CODES = ["COPILOT2024", "AIEXAM123", "VCH456", "RETAKE2024"];


export default function CopilotExamStartPage() {
  // Randomisation à chaque accès (montage du composant)
  const [part1Questions, setPart1Questions] = useState<typeof RAW_PART1_QUESTIONS>([]);
  const [part2Scenarios, setPart2Scenarios] = useState<typeof RAW_PART2_SCENARIOS>([]);
  useEffect(() => {
    // Bloque copier/coller et clic droit
    const preventCopy = (e: Event) => {
      e.preventDefault();
      alert("Warning: Attempting to copy or cheat may result in loss of credit in your final score.");
    };
    const warnOnCtrl = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        alert("Warning: Attempting to copy or cheat may result in loss of credit in your final score.");
      }
    };
    document.addEventListener('copy', preventCopy);
    document.addEventListener('cut', preventCopy);
    document.addEventListener('contextmenu', preventCopy);
    document.addEventListener('keydown', warnOnCtrl);

    // Mélange les réponses de chaque question
    const shuffledPart1 = shuffleArray(RAW_PART1_QUESTIONS).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setPart1Questions(shuffledPart1);
    setPart2Scenarios(shuffleArray(RAW_PART2_SCENARIOS));

    return () => {
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('cut', preventCopy);
      document.removeEventListener('contextmenu', preventCopy);
      document.removeEventListener('keydown', warnOnCtrl);
    };
  }, []);
  // Minimal identity system
  const [identityReady, setIdentityReady] = useState(false);
  useEffect(() => {
    // Si identité déjà verrouillée, accès direct
    if (isFullNameLocked()) {
      setIdentityReady(true);
    }
  }, []);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [selectedPracticalPath, setSelectedPracticalPath] = useState<"A" | "B" | null>(null);
  const [part1Answers, setPart1Answers] = useState<AnswerMap>({});
  const [part2Answers, setPart2Answers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState<SubmittedMap>({});
  const [showTimeUp, setShowTimeUp] = useState(false);
  const router = useRouter();

  // Clé unique pour localStorage
  const STORAGE_KEY = 'examState-ai-productivity-github-copilot';
  const EXAM_DURATION_SECONDS = 90 * 60;
  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // On ne réinitialise pas identityReady à false à chaque rendu !
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

  // On prépare le rendu de l'écran d'identité, mais on ne fait pas de return avant les hooks !
  const identityScreen = (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8">
        <UserIdentityForm onValidated={handleIdentityValidated} />
      </div>
    </main>
  );



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


  // Protection contre le refresh/fermeture pendant l'examen
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Timer principal
  useEffect(() => {
    if (timeLeft <= 0) {
      setShowTimeUp(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const totalQuestions = part1Questions.length + part2Scenarios.length;

  const answeredCount = useMemo(() => {
    const submittedCount = Object.values(submitted).filter(Boolean).length;
    return Math.min(submittedCount, totalQuestions);
  }, [submitted, totalQuestions]);

  const allQuestionsAnswered = answeredCount === totalQuestions;

  // Nouvelle logique : réussite si au moins 10/14 bonnes réponses (70%)
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

  // Rendu conditionnel après tous les hooks
  if (!identityReady) {
    return identityScreen;
  }

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


  // Suppression de l'écran d'accès par code, l'examen s'affiche directement

  return (
    <>
      {/* Bouton de test pour afficher la popup */}
      <button
        type="button"
        className="fixed top-8 right-8 z-50 px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 shadow"
        onClick={() => setShowTimeUp(true)}
      >
        Tester la popup
      </button>
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
        <span className="mb-2 text-xs text-blue-600 dark:text-blue-400 font-semibold">{Math.round((answeredCount / totalQuestions) * 100)}%</span>
        <div className="relative h-full w-2 bg-slate-200 dark:bg-slate-800 rounded-full">
          <div
            className="absolute left-0 top-0 w-2 bg-blue-600 rounded-full transition-all"
            style={{ height: `${Math.round((answeredCount / totalQuestions) * 100)}%` }}
            aria-label="Exam progress vertical"
          />
        </div>
      </div>
      {/* Hero section (ENGLISH ONLY) */}
      <section className="border-b border-slate-200/70 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Final Certification Exam
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold leading-tight">
            {EXAM_OVERVIEW.title}
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            This exam validates practical, responsible use of GitHub Copilot and AI-assisted workflows. Answer all parts. Total score is {EXAM_OVERVIEW.totalScore}; passing score is {EXAM_OVERVIEW.passingScore}.
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
              {/* Score supprimé, pas de note affichée */}
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
          10 multiple-choice or multi-select questions. Focus on practical Copilot usage.
        </p>
        <div className="mt-6 space-y-6">
          {part1Questions.map((q) => (
            <div key={q.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold no-select">{q.question}</h3>
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  {q.type === "multi" ? "Multi-select" : "Single-select"}
                </span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {q.options.map((opt) => {
                  const selected = part1Answers[q.id] ?? [];
                  const isChecked = selected.includes(opt.id);
                  return (
                    <label key={opt.id} className="flex items-start gap-3 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-3 py-2 cursor-pointer no-select text-lg">
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
                      <span className="no-select">
                        {opt.text}
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
                      <label key={action.id} className="flex items-start gap-3 rounded-md border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 px-3 py-2 cursor-pointer text-lg">
                        <input
                          type="radio"
                          name={s.id}
                          checked={isChecked}
                          onChange={() => handleSingleSelect("part2", s.id, action.id)}
                          className="mt-1"
                          disabled={submitted[s.id]}
                        />
                            <span>{action.text}</span>
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
                    // Calcul du score total (déjà fait dans la variable score)
                    // Redirige vers la page de résultat avec le score en query
                    router.push(`/certifications/exam-result?page=ai-productivity-github-copilot&score=${score}`);
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