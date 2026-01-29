"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { validateRetakeCodeLocal } from "@/utils/retakeCodes";

const EXAM_DETAILS = {
  name: "AI Governance & Responsible AI Foundations Exam",
  duration: "100 minutes",
  format: "65 multiple-choice questions",
  passingScore: "72%",
  price: 99,
  currency: "€",
  includes: [
    "One exam attempt + one free retake",
    "Official digital certificate",
    "Shareable credential badge",
    "Detailed score report by domain",
    "Immediate results and next-step guidance"
  ]
};

const CERTIFICATION_ID = "ai-governance-responsible-ai-foundations";

const VALIDATES = [
  "Understanding of responsible AI principles and ethics",
  "Bias detection, fairness testing, and mitigation approaches",
  "Privacy, security, and risk management basics",
  "Regulatory awareness and compliance readiness",
  "Governance frameworks and operational controls"
];

const AUDIENCE = [
  "AI policy and governance leads",
  "Compliance, legal, and risk teams",
  "Product leaders implementing AI responsibly",
  "Learners who completed the free governance modules"
];

const ACCESS_STEPS = [
  {
    title: "Already unlocked",
    description: "If you already have access, you’ll be taken straight to the exam start."
  },
  {
    title: "Pay once",
    description: "Complete a single Stripe payment to unlock the exam immediately."
  },
  {
    title: "Use a voucher",
    description: "Enter a valid voucher code to unlock access without payment."
  },
  {
    title: "Use a retake code",
    description: "Enter the retake code from your first paid attempt to unlock one extra try."
  }
];

const TRUST_POINTS = [
  "Questions align with the published exam objectives",
  "Clear scoring and transparent pass criteria",
  "No trick questions—focus is on responsible practice"
];

async function checkExamAccess(): Promise<boolean> {
  // Server-side cookie validation happens in the API route.
  const response = await fetch(
    `/api/vouchers?certificationId=${encodeURIComponent(CERTIFICATION_ID)}`,
    { cache: "no-store" }
  );
  const data = (await response.json()) as { hasAccess?: boolean };
  return Boolean(data?.hasAccess);
}

async function validateVoucherCode(
  code: string
): Promise<{ success: boolean; message: string }>
{
  const response = await fetch("/api/vouchers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, certificationId: CERTIFICATION_ID })
  });
  const data = (await response.json()) as { success?: boolean; message?: string };
  return {
    success: Boolean(data?.success),
    message: data?.message ?? "Unable to validate voucher code."
  };
}

async function validateRetakeCode(code: string): Promise<boolean> {
  // Retake codes are issued after failure via /api/retakes and stored in localStorage.
  // TODO: Call requestRetakeCode(CERTIFICATION_ID) when the exam result is a fail.
  return validateRetakeCodeLocal(CERTIFICATION_ID, code);
}

function redirectToCheckout() {
  // TODO: Replace with Stripe Checkout redirect.
  window.location.href = "/checkout";
}

export default function AiGovernanceResponsibleAiExamPage() {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isAccessOpen, setIsAccessOpen] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherError, setVoucherError] = useState<string | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isRetakeOpen, setIsRetakeOpen] = useState(false);
  const [retakeCode, setRetakeCode] = useState("");
  const [retakeError, setRetakeError] = useState<string | null>(null);
  const [isRetakeRedeeming, setIsRetakeRedeeming] = useState(false);

  const priceLabel = useMemo(
    () => `${EXAM_DETAILS.price}${EXAM_DETAILS.currency}`,
    []
  );

  useEffect(() => {
    const runAccessCheck = async () => {
      // Placeholder access check. Replace with a real API call.
      const access = await checkExamAccess();
      setHasAccess(access);
      setIsChecking(false);

      if (access) {
        // If access already exists, route directly to the exam start.
        router.push("/certifications/ai-governance-responsible-ai-foundations/exam/start");
      }
    };

    runAccessCheck();
  }, [router]);

  const handleStartExam = () => {
    if (hasAccess) {
      router.push("/certifications/ai-governance-responsible-ai-foundations/exam/start");
      return;
    }

    // No access → show access options.
    setIsAccessOpen(true);
  };

  const handleVoucherSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setVoucherError(null);
    setIsRedeeming(true);

    const result = await validateVoucherCode(voucherCode);

    if (result.success) {
      setHasAccess(true);
      setIsVoucherOpen(false);
      router.push("/certifications/ai-governance-responsible-ai-foundations/exam/start");
    } else {
      setVoucherError(result.message);
    }

    setIsRedeeming(false);
  };

  const handleRetakeSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setRetakeError(null);
    setIsRetakeRedeeming(true);

    const isValid = await validateRetakeCode(retakeCode);

    if (isValid) {
      setHasAccess(true);
      setIsRetakeOpen(false);
      router.push("/certifications/ai-governance-responsible-ai-foundations/exam/start");
    } else {
      setRetakeError("The retake code is invalid or expired.");
    }

    setIsRetakeRedeeming(false);
  };

  return (
    <main className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/70 dark:border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/certifications" className="hover:text-slate-900 dark:hover:text-white">
              Certifications
            </Link>
            <span>/</span>
            <Link
              href="/certifications/ai-governance-responsible-ai-foundations"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              AI Governance & Responsible AI Foundations
            </Link>
            <span>/</span>
            <span className="text-slate-700 dark:text-slate-200">Exam</span>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                Certification Exam
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-semibold leading-tight">
                {EXAM_DETAILS.name}
              </h1>
              <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
                Validate responsible AI knowledge with a calm, fair assessment grounded in ethics, compliance, and governance. Learning content is free; the exam is a paid credential.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Duration</p>
                  <p className="mt-2 font-semibold text-slate-900 dark:text-white">{EXAM_DETAILS.duration}</p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Format</p>
                  <p className="mt-2 font-semibold text-slate-900 dark:text-white">{EXAM_DETAILS.format}</p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Passing Score</p>
                  <p className="mt-2 font-semibold text-slate-900 dark:text-white">{EXAM_DETAILS.passingScore}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartExam}
                  className="rounded-md bg-slate-900 text-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                >
                  Start Exam
                </button>
                <button
                  onClick={() => setIsVoucherOpen(true)}
                  className="rounded-md border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Enter Voucher Code
                </button>
                <button
                  onClick={() => setIsRetakeOpen(true)}
                  className="rounded-md border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Use Retake Code
                </button>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                {isChecking ? "Checking access status..." : "Access will be verified before you begin."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
              <h2 className="text-xl font-semibold">What you’ll receive</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                A single payment unlocks the exam and credential — with a free retake included.
              </p>
              <div className="mt-6 space-y-3">
                {EXAM_DETAILS.includes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-amber-600">✔</span>
                    <p className="text-sm text-slate-700 dark:text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-xl bg-slate-50 dark:bg-slate-800 px-4 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">One-time payment</span>
                  <span className="text-xl font-semibold text-slate-900 dark:text-white">{priceLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Validates */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold">What this exam validates</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              This assessment verifies governance readiness and responsible AI decision-making, not memorization.
            </p>
            <ul className="mt-6 space-y-3">
              {VALIDATES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-600" />
                  <span className="text-slate-700 dark:text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
            <h3 className="text-lg font-semibold">Fair and transparent by design</h3>
            <ul className="mt-4 space-y-3">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="text-sm text-slate-600 dark:text-slate-300">
                  • {point}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-500">
              We publish clear objectives and scoring rules so you always know what you’re being assessed on.
            </p>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-semibold">Who this exam is for</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {AUDIENCE.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-4"
              >
                <p className="text-sm text-slate-700 dark:text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold">How access works</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Learning content is free. The exam is a paid credential that unlocks after payment, a voucher, a retake code, or existing access.
            </p>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
            {ACCESS_STEPS.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{step.title}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-semibold">Pricing</h2>
              <p className="mt-3 text-slate-200">
                One-time payment for exam access and official credential. No subscriptions.
              </p>
              <div className="mt-6 text-4xl font-semibold">{priceLabel}</div>
              <p className="mt-2 text-sm text-slate-300">Includes one free retake.</p>
            </div>
            <div className="rounded-2xl bg-white/10 border border-white/20 p-6">
              <h3 className="text-lg font-semibold">What is included</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                {EXAM_DETAILS.includes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-semibold">Ready to begin?</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            You’ll see the full exam instructions before the timer starts.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleStartExam}
              className="rounded-md bg-slate-900 text-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900"
            >
              Start Exam
            </button>
            <button
              onClick={() => setIsVoucherOpen(true)}
              className="rounded-md border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Enter Voucher Code
            </button>
            <button
              onClick={() => setIsRetakeOpen(true)}
              className="rounded-md border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Use Retake Code
            </button>
          </div>
        </div>
      </section>

      {/* Access options modal */}
      {isAccessOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white dark:bg-slate-900 p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Get exam access</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Choose payment, use a voucher, or enter a retake code from a previous paid attempt. You receive one extra attempt if you don’t pass the first try.
                </p>
              </div>
              <button
                onClick={() => setIsAccessOpen(false)}
                className="text-slate-400 hover:text-slate-600"
                aria-label="Close access options"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={redirectToCheckout}
                className="w-full rounded-md bg-slate-900 text-white px-4 py-3 text-sm font-semibold hover:bg-slate-800 dark:bg-white dark:text-slate-900"
              >
                Pay {priceLabel}
              </button>
              <button
                onClick={() => {
                  setIsAccessOpen(false);
                  setIsVoucherOpen(true);
                }}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                I have a voucher
              </button>
              <button
                onClick={() => {
                  setIsAccessOpen(false);
                  setIsRetakeOpen(true);
                }}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                I have a retake code
              </button>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              One paid attempt unlocks one extra attempt if the first try is unsuccessful.
            </p>
          </div>
        </div>
      ) : null}

      {/* Voucher modal placeholder */}
      {isVoucherOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Enter voucher code</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Voucher codes unlock paid exam access. Example: GOV-XXXXXX
                </p>
              </div>
              <button
                onClick={() => setIsVoucherOpen(false)}
                className="text-slate-400 hover:text-slate-600"
                aria-label="Close voucher modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleVoucherSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Voucher code
                </label>
                <input
                  value={voucherCode}
                  onChange={(event) => setVoucherCode(event.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                  placeholder="GOV-123456"
                  required
                />
              </div>
              {voucherError ? (
                <p className="text-sm text-red-600 dark:text-red-400">{voucherError}</p>
              ) : null}
              <button
                type="submit"
                disabled={isRedeeming}
                className="w-full rounded-md bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-900"
              >
                {isRedeeming ? "Validating..." : "Unlock access"}
              </button>
            </form>
            <p className="mt-4 text-xs text-slate-500">
              Voucher validation happens securely on the server in production.
            </p>
          </div>
        </div>
      ) : null}

      {/* Retake modal placeholder */}
      {isRetakeOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Enter retake code</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Retake codes unlock your extra attempt after a paid exam. Example: ABIR-RETAKE-019
                </p>
              </div>
              <button
                onClick={() => setIsRetakeOpen(false)}
                className="text-slate-400 hover:text-slate-600"
                aria-label="Close retake modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRetakeSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Retake code
                </label>
                <input
                  value={retakeCode}
                  onChange={(event) => setRetakeCode(event.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
                  placeholder="ABIR-RETAKE-019"
                  required
                />
              </div>
              {retakeError ? (
                <p className="text-sm text-red-600 dark:text-red-400">{retakeError}</p>
              ) : null}
              <button
                type="submit"
                disabled={isRetakeRedeeming}
                className="w-full rounded-md bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-900"
              >
                {isRetakeRedeeming ? "Validating..." : "Unlock access"}
              </button>
            </form>
            <p className="mt-4 text-xs text-slate-500">
              Retake code validation happens securely on the server in production.
            </p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
