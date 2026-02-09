"use client";

import { useMemo, useState, useEffect } from "react";

const EXAM_OVERVIEW = {
  title: "Generative AI for Business Operations — Final Certification Exam",
  duration: "90 minutes",
  totalScore: 100,
  passingScore: 70,
  parts: [
    "Part 1 — Knowledge Check (30%)",
    "Part 2 — Applied Scenarios (40%)",
    "Part 3 — Practical Task (30%)"
  ]
};

const PART1_QUESTIONS = [
  {
    id: "KC1",
    type: "single",
    question:
      "You need to standardize weekly operations updates. What prompt is most effective?",
    options: [
      { id: "A", text: "Summarize the updates." },
      {
        id: "B",
        text:
          "Create a weekly ops summary with sections for KPIs, risks, blockers, decisions, and next-week priorities. Keep it under 200 words."
      },
      { id: "C", text: "Write a long narrative of everything that happened." },
      { id: "D", text: "Make it inspirational." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Clear sections and constraints produce consistent, actionable operations updates."
  },
  {
    id: "KC2",
    type: "single",
    question:
      "Which is the safest way to use AI for a supplier report that contains contract terms?",
    options: [
      { id: "A", text: "Paste the full contract and ask for a summary." },
      {
        id: "B",
        text:
          "Remove sensitive terms, provide only necessary data, and review outputs before sharing."
      },
      { id: "C", text: "Let the model store the contract for future use." },
      { id: "D", text: "Skip review to speed up reporting." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Privacy and confidentiality require minimizing sensitive data and validating outputs."
  },
  {
    id: "KC3",
    type: "multi",
    question:
      "Which actions improve the quality of AI-generated SOPs? (Select all that apply)",
    options: [
      { id: "A", text: "Provide a clear process outline and role responsibilities." },
      { id: "B", text: "Ask for a generic SOP with no context." },
      { id: "C", text: "Include required compliance steps or checks." },
      { id: "D", text: "Add a short example of a completed SOP section." }
    ],
    correctAnswers: ["A", "C", "D"],
    explanation:
      "Context, compliance steps, and examples improve SOP relevance and completeness."
  },
  {
    id: "KC4",
    type: "single",
    question:
      "You receive AI-generated KPI insights. What should you do before sharing them?",
    options: [
      { id: "A", text: "Share immediately to save time." },
      {
        id: "B",
        text: "Validate key figures against source data and flag assumptions."
      },
      { id: "C", text: "Remove data sources so it looks cleaner." },
      { id: "D", text: "Ask AI to make them sound more confident." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Operational reporting requires verification and transparency about assumptions."
  },
  {
    id: "KC5",
    type: "single",
    question:
      "What is the best reason to use templates for AI-assisted operational reports?",
    options: [
      { id: "A", text: "They remove the need for human review." },
      { id: "B", text: "They enforce consistency across teams and periods." },
      { id: "C", text: "They guarantee perfect accuracy." },
      { id: "D", text: "They make reports longer." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Templates standardize output quality and structure in business operations."
  },
  {
    id: "KC6",
    type: "single",
    question:
      "Which approach best supports change management communications?",
    options: [
      { id: "A", text: "Let AI generate a message without key stakeholders." },
      {
        id: "B",
        text: "Provide the audience, change rationale, timeline, and required actions."
      },
      { id: "C", text: "Ask for a generic announcement with no details." },
      { id: "D", text: "Only include technical steps." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Change communications must include audience, rationale, timeline, and actions."
  },
  {
    id: "KC7",
    type: "multi",
    question:
      "Which practices help ensure responsible AI usage in operations? (Select all that apply)",
    options: [
      { id: "A", text: "Define approval steps for external communications." },
      { id: "B", text: "Share sensitive data freely for better outputs." },
      { id: "C", text: "Keep a human-in-the-loop for decisions and summaries." },
      { id: "D", text: "Document prompts and assumptions for audits." }
    ],
    correctAnswers: ["A", "C", "D"],
    explanation:
      "Governance, human oversight, and documentation support responsible AI use."
  },
  {
    id: "KC8",
    type: "single",
    question:
      "What is a good practice when using AI to generate meeting minutes?",
    options: [
      { id: "A", text: "Use only the AI output without review." },
      {
        id: "B",
        text: "Review for accuracy, confirm decisions and owners, and correct errors."
      },
      { id: "C", text: "Remove decisions to keep it neutral." },
      { id: "D", text: "Publish without checking action items." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Minutes must be accurate and verified to avoid operational mistakes."
  },
  {
    id: "KC9",
    type: "single",
    question:
      "Which prompt best supports a weekly risk log update?",
    options: [
      { id: "A", text: "Summarize risks." },
      {
        id: "B",
        text:
          "Update the risk log with columns: risk, impact, likelihood, mitigation, owner, and status. Use bullet points."
      },
      { id: "C", text: "Write a story about risks." },
      { id: "D", text: "List only high-level risks with no details." }
    ],
    correctAnswers: ["B"],
    explanation:
      "A structured risk log requires defined fields for actionability."
  },
  {
    id: "KC10",
    type: "single",
    question:
      "Which statement best describes AI’s role in business operations?",
    options: [
      { id: "A", text: "AI replaces operational judgment." },
      { id: "B", text: "AI accelerates work, but humans remain accountable." },
      { id: "C", text: "AI eliminates the need for process documentation." },
      { id: "D", text: "AI decisions are always correct." }
    ],
    correctAnswers: ["B"],
    explanation:
      "AI supports productivity; accountability and decision-making remain human responsibilities."
  }
];

const PART2_SCENARIOS = [
  {
    id: "SC1",
    scenario:
      "Your team must prepare a monthly operations dashboard. You have raw metrics from multiple systems.",
    actions: [
      {
        id: "A",
        text: "Use AI to draft the dashboard narrative, then verify KPIs against source data."
      },
      { id: "B", text: "Let AI invent missing metrics to fill gaps." },
      { id: "C", text: "Publish AI output without verification." }
    ],
    correctAnswer: "A",
    explanation:
      "Drafting is fine, but KPIs must be validated against source systems."
  },
  {
    id: "SC2",
    scenario:
      "You need to update a customer support playbook used by new hires.",
    actions: [
      {
        id: "A",
        text: "Provide current playbook sections and ask AI to improve clarity while preserving policies."
      },
      { id: "B", text: "Ask AI to rewrite everything without the current policies." },
      { id: "C", text: "Copy random templates from the internet." }
    ],
    correctAnswer: "A",
    explanation:
      "Keeping policy alignment ensures compliance and operational consistency."
  },
  {
    id: "SC3",
    scenario:
      "A finance leader asks for a cost-saving analysis using procurement data.",
    actions: [
      {
        id: "A",
        text: "Use anonymized data, ask AI for hypotheses, and validate against detailed sources."
      },
      { id: "B", text: "Share full supplier contracts and skip review." },
      { id: "C", text: "Ask AI to decide vendor changes without data." }
    ],
    correctAnswer: "A",
    explanation:
      "Sensitive financial data should be protected and conclusions verified."
  },
  {
    id: "SC4",
    scenario:
      "You are rolling out a new workflow tool across departments.",
    actions: [
      {
        id: "A",
        text: "Use AI to draft a change plan with timeline, training steps, and FAQs, then review with stakeholders."
      },
      { id: "B", text: "Announce the change with no timeline or training." },
      { id: "C", text: "Let AI auto-send messages without review." },
      { id: "D", text: "Avoid documenting the change to stay flexible." }
    ],
    correctAnswer: "A",
    explanation:
      "Operational changes require communication, training, and stakeholder alignment."
  }
];

const PRACTICAL_EVALUATION_CRITERIA = [
  "Clear objective and audience",
  "Structured prompt or workflow",
  "Responsible use (privacy and approvals)",
  "Verification plan for metrics and facts",
  "Quality of final output (clarity, actionability)",
  "Reflection on risks and improvement steps"
];

const PRACTICAL_TASK = {
  pathA: {
    title: "Path A — Guided Practical Task (Students / Beginners)",
    instructions: [
      "Scenario: You need a weekly team update for operations.",
      "Input notes:",
      "- KPI: On-time delivery 96% (target 95%)",
      "- Blocker: Vendor delay on replacement parts",
      "- Decision: Prioritize expedited shipping for top clients",
      "- Next week: Train two new team members",
      "Task: Write a prompt that turns the notes into a concise update.",
      "Deliverable: Provide the exact prompt and a 3–5 sentence rationale."
    ]
  },
  pathB: {
    title: "Path B — Real-World Practical Task (Professionals)",
    instructions: [
      "Scenario: You must produce a monthly operations report for leadership.",
      "Task: Design an AI-assisted workflow that converts raw notes into the final report.",
      "Include: prompt template, verification steps, and approval checklist.",
      "Deliverable: Provide the prompt template, workflow steps, and rationale."
    ]
  }
};

type AnswerMap = Record<string, string[]>;
type SubmittedMap = Record<string, boolean>;


export default function GenerativeAIBusinessOperationsExamStartPage() {
      const [showTimeUp, setShowTimeUp] = useState(false);
    // Timer d'examen (90 minutes)
    const EXAM_DURATION_SECONDS = 90 * 60;
    function formatTime(seconds: number) {
      const m = Math.floor(seconds / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }
    const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
    useEffect(() => {
      if (timeLeft <= 0) {
        setShowTimeUp(true);
        return;
      }
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }, [timeLeft]);
  const [selectedPracticalPath, setSelectedPracticalPath] = useState<"A" | "B" | null>(null);
  const [part1Answers, setPart1Answers] = useState<AnswerMap>({});
  const [part2Answers, setPart2Answers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState<SubmittedMap>({});

  const totalQuestions = PART1_QUESTIONS.length + PART2_SCENARIOS.length;

  const answeredCount = useMemo(() => {
    const submittedCount = Object.values(submitted).filter(Boolean).length;
    return Math.min(submittedCount, totalQuestions);
  }, [submitted, totalQuestions]);

  const allQuestionsAnswered = answeredCount === totalQuestions;

  const score = useMemo(() => {
    const part1Score = PART1_QUESTIONS.reduce((sum, q) => {
      const isSubmitted = submitted[q.id];
      if (!isSubmitted) return sum;
      const selected = part1Answers[q.id] ?? [];
      const correct = q.correctAnswers;
      const isCorrect =
        selected.length === correct.length &&
        selected.every((answer) => correct.includes(answer));
      return isCorrect ? sum + 3 : sum;
    }, 0);

    const part2Score = PART2_SCENARIOS.reduce((sum, s) => {
      const isSubmitted = submitted[s.id];
      if (!isSubmitted) return sum;
      const selected = part2Answers[s.id] ?? [];
      const isCorrect = selected.includes(s.correctAnswer);
      return isCorrect ? sum + 10 : sum;
    }, 0);

    return part1Score + part2Score;
  }, [part1Answers, part2Answers, submitted]);

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
      <section className="border-b border-slate-200/70 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Final Certification Exam
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold leading-tight">
            {EXAM_OVERVIEW.title}
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            This exam validates practical, responsible AI usage in business operations. Answer all parts. Total score is {EXAM_OVERVIEW.totalScore}; passing score is {EXAM_OVERVIEW.passingScore}.
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
          10 multiple-choice or multi-select questions. Focus on practical operations use.
        </p>
        <div className="mt-6 space-y-6">
          {PART1_QUESTIONS.map((q) => (
            <div key={q.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{q.id}. {q.question}</h3>
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
            {PART2_SCENARIOS.map((s) => (
              <div key={s.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-6">
                <h3 className="text-lg font-semibold">{s.id}. {s.scenario}</h3>
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
                    // Redirige vers la page de résultat avec le score et le slug
                    window.location.href = `/certifications/exam-result?page=generative-ai-business-operations&score=${score}`;
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