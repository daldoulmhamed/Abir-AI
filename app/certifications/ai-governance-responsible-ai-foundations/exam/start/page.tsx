"use client";


import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// ...existing code...

const EXAM_OVERVIEW = {
  title: "AI Governance & Responsible AI Foundations — Final Certification Exam",
  duration: "100 minutes",
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
      "Which statement best describes responsible AI governance?",
    options: [
      { id: "A", text: "It focuses only on model accuracy." },
      {
        id: "B",
        text: "It combines policies, oversight, and accountability for AI risks and impacts."
      },
      { id: "C", text: "It is only needed for regulated industries." },
      { id: "D", text: "It removes the need for human review." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Governance includes policies, oversight, and accountability across the AI lifecycle."
  },
  {
    id: "KC2",
    type: "single",
    question:
      "What is the best first step when assessing a new AI use case?",
    options: [
      { id: "A", text: "Deploy quickly and fix issues later." },
      {
        id: "B",
        text: "Conduct an initial risk assessment to determine impact and exposure."
      },
      { id: "C", text: "Skip documentation to reduce friction." },
      { id: "D", text: "Only consult legal after launch." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Risk assessment is the entry point for responsible AI evaluation."
  },
  {
    id: "KC3",
    type: "multi",
    question:
      "Which are core principles of responsible AI? (Select all that apply)",
    options: [
      { id: "A", text: "Fairness and non-discrimination" },
      { id: "B", text: "Opacity and secrecy" },
      { id: "C", text: "Transparency and explainability" },
      { id: "D", text: "Accountability and human oversight" }
    ],
    correctAnswers: ["A", "C", "D"],
    explanation:
      "Responsible AI emphasizes fairness, transparency, and accountability."
  },
  {
    id: "KC4",
    type: "single",
    question:
      "Why is documentation critical in AI governance?",
    options: [
      { id: "A", text: "It is optional and rarely used." },
      {
        id: "B",
        text: "It enables audits, accountability, and compliance verification."
      },
      { id: "C", text: "It replaces monitoring and testing." },
      { id: "D", text: "It only matters for open-source models." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Documentation provides traceability and evidence of compliance and oversight."
  },
  {
    id: "KC5",
    type: "single",
    question:
      "What is a common governance control for high-risk AI systems?",
    options: [
      { id: "A", text: "No testing to avoid delays." },
      {
        id: "B",
        text: "Human review and approval before deployment."
      },
      { id: "C", text: "Only automated decisions with no overrides." },
      { id: "D", text: "Skip stakeholder input." }
    ],
    correctAnswers: ["B"],
    explanation:
      "High-risk systems require human oversight and approvals."
  },
  {
    id: "KC6",
    type: "single",
    question:
      "What does a bias assessment aim to do?",
    options: [
      { id: "A", text: "Make the model prefer one group for efficiency." },
      {
        id: "B",
        text: "Identify and reduce unfair outcomes across groups."
      },
      { id: "C", text: "Eliminate the need for transparency." },
      { id: "D", text: "Only measure accuracy on average." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Bias assessment focuses on fairness across different groups."
  },
  {
    id: "KC7",
    type: "multi",
    question:
      "Which practices support trustworthy AI operations? (Select all that apply)",
    options: [
      { id: "A", text: "Ongoing monitoring and incident response" },
      { id: "B", text: "Ignoring model drift after launch" },
      { id: "C", text: "Clear ownership and escalation paths" },
      { id: "D", text: "Regular audits and reviews" }
    ],
    correctAnswers: ["A", "C", "D"],
    explanation:
      "Monitoring, ownership, and audits are essential for trustworthy operations."
  },
  {
    id: "KC8",
    type: "single",
    question:
      "Why is human oversight important in AI decision-making?",
    options: [
      { id: "A", text: "It slows down every workflow." },
      {
        id: "B",
        text: "It helps catch errors, bias, and contextual issues."
      },
      { id: "C", text: "It is only for marketing purposes." },
      { id: "D", text: "It removes accountability." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Human oversight provides contextual judgment and safeguards against harm."
  },
  {
    id: "KC9",
    type: "single",
    question:
      "Which prompt best supports a stakeholder impact assessment summary?",
    options: [
      { id: "A", text: "Summarize risks." },
      {
        id: "B",
        text:
          "Summarize impacts by stakeholder group, include potential harms/benefits, and mitigation steps."
      },
      { id: "C", text: "Write a short opinion on the project." },
      { id: "D", text: "List only benefits to improve adoption." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Impact assessments require balanced benefits/harms and mitigation steps."
  },
  {
    id: "KC10",
    type: "single",
    question:
      "Which statement best reflects accountability in AI governance?",
    options: [
      { id: "A", text: "AI systems are accountable for their outputs." },
      { id: "B", text: "Responsibility is shared and clearly assigned to humans."
      },
      { id: "C", text: "Accountability ends at model deployment." },
      { id: "D", text: "Accountability is optional for internal tools." }
    ],
    correctAnswers: ["B"],
    explanation:
      "Accountability rests with people and organizations, not with the model."
  }
];

const PART2_SCENARIOS = [
  {
    id: "SC1",
    scenario:
      "A team wants to deploy an AI system that screens job applications. The tool affects hiring decisions.",
    actions: [
      {
        id: "A",
        text: "Classify it as high risk, conduct a fairness review, and establish human oversight."
      },
      { id: "B", text: "Deploy quickly and add governance later." },
      { id: "C", text: "Avoid documenting the model to keep it simple." }
    ],
    correctAnswer: "A",
    explanation:
      "High-impact decisions require risk assessment, fairness checks, and oversight."
  },
  {
    id: "SC2",
    scenario:
      "An AI chatbot is used for customer support. It sometimes gives incorrect policy details.",
    actions: [
      {
        id: "A",
        text: "Add policy grounding, human review for sensitive cases, and monitoring for errors."
      },
      { id: "B", text: "Remove disclaimers to improve trust." },
      { id: "C", text: "Stop collecting feedback to avoid criticism." }
    ],
    correctAnswer: "A",
    explanation:
      "Grounding, oversight, and monitoring reduce risk and improve reliability."
  },
  {
    id: "SC3",
    scenario:
      "A vendor offers an AI system for loan approvals. You must decide whether to adopt it.",
    actions: [
      {
        id: "A",
        text: "Run a vendor assessment, review documentation, and require evidence of bias testing."
      },
      { id: "B", text: "Assume the vendor is responsible for compliance." },
      { id: "C", text: "Skip due diligence to speed up procurement." }
    ],
    correctAnswer: "A",
    explanation:
      "Vendor assessments ensure accountability and compliance before adoption."
  },
  {
    id: "SC4",
    scenario:
      "You detect model drift in a live AI system that affects customer outcomes.",
    actions: [
      {
        id: "A",
        text: "Trigger incident response, investigate impacts, and update or retrain with oversight."
      },
      { id: "B", text: "Ignore drift unless users complain." },
      { id: "C", text: "Disable monitoring to reduce alerts." },
      { id: "D", text: "Let the model self-correct without review." }
    ],
    correctAnswer: "A",
    explanation:
      "Drift can cause harm; response and remediation are required."
  }
];

const PRACTICAL_EVALUATION_CRITERIA = [
  "Clear identification of risks and stakeholders",
  "Structured governance approach (policies, oversight, approvals)",
  "Responsible data and privacy handling",
  "Verification plan (testing, audits, monitoring)",
  "Transparency and documentation quality",
  "Reflection on mitigation and next steps"
];

const PRACTICAL_TASK = {
  pathA: {
    title: "Path A — Guided Practical Task (Students / Beginners)",
    instructions: [
      "Scenario: Your school wants to use AI to recommend tutoring resources.",
      "Task: Draft a prompt that produces a short risk and mitigation summary.",
      "Include: stakeholders, potential harms, and mitigation steps.",
      "Deliverable: Provide the prompt and a 3–5 sentence rationale."
    ]
  },
  pathB: {
    title: "Path B — Real-World Practical Task (Professionals)",
    instructions: [
      "Scenario: Your organization plans to deploy an AI screening tool for hiring.",
      "Task: Design an AI governance workflow for approval and monitoring.",
      "Include: risk assessment, fairness testing, human oversight, and documentation steps.",
      "Deliverable: Provide the workflow steps, a prompt template, and a brief rationale."
    ]
  }
};

type AnswerMap = Record<string, string[]>;
type SubmittedMap = Record<string, boolean>;

export default function AIGovernanceResponsibleFoundationsExamStartPage() {
      const [showTimeUp, setShowTimeUp] = useState(false);
    // Timer d'examen (100 minutes)
    const EXAM_DURATION_SECONDS = 100 * 60;
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
  const [part1Answers, setPart1Answers] = useState<AnswerMap>({});
  const [part2Answers, setPart2Answers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState<SubmittedMap>({});
  const [selectedPracticalPath, setSelectedPracticalPath] = useState<"A" | "B" | null>(null);

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

  const router = useRouter();
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
            This exam validates foundational governance and responsible AI practices. Answer all parts. Total score is {EXAM_OVERVIEW.totalScore}; passing score is {EXAM_OVERVIEW.passingScore}.
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
          10 multiple-choice or multi-select questions. Focus on governance fundamentals.
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
            4 scenario-based questions. Choose the best AI governance action.
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
                    router.push(`/certifications/exam-result?page=ai-governance-responsible-ai-foundations&score=${score}`);
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