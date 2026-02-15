"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const BADGE_MAP: Record<string, string> = {
  "ai-productivity-github-copilot": "/images/ai-productivity-github-copilot.png",
  "generative-ai-practitioner": "/images/generative-ai-practitioner.png",
  "generative-ai-business-operations": "/images/generative-ai-for-business-operations.png",
  "ai-governance-responsible-ai-foundations": "/images/ai-governance-responsible-ai-foundations.png",
};

const EXAM_DETAILS = {
  name: "Generative AI Practitioner Exam",
  duration: "90 minutes",
  format: "14 multiple-choice questions",
  passingScore: "70%",
  price: 49,
  currency: "€",
  includes: [
    "One exam attempt + one free retake",
    "Official digital certificate",
    "Shareable credential badge",
    "Detailed score report by domain",
    "Immediate results and next-step guidance"
  ]
};

const CERTIFICATION_ID = "generative-ai-practitioner";

const VALIDATES = [
  "Core understanding of generative AI concepts and limitations",
  "Ability to craft effective prompts and evaluate outputs",
  "Responsible AI practices: bias, privacy, and transparency",
  "Practical application across common business workflows",
  "Clear, ethical communication of AI-driven insights"
];

const AUDIENCE = [
  "Professionals applying AI in daily work",
  "Students and career changers building AI literacy",
  "Teams seeking a shared baseline for AI skills",
  "Anyone who completed the free learning modules"
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
  // Retake code step supprimé
];

const TRUST_POINTS = [
  "Questions align with the published exam objectives",
  "Clear scoring and transparent pass criteria",
  "No trick questions—focus is on practical understanding"
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
  // Retake codes are issued after failure via /api/retakes.
  // TODO: Call requestRetakeCode(CERTIFICATION_ID) when the exam result is a fail.
  // ...ancienne logique supprimée : validation côté serveur désormais
  return false;
}

function redirectToCheckout() {
  // TODO: Replace with Stripe Checkout redirect.
  window.location.href = "/checkout";
}

export default function GenerativeAIPractitionerExamPage() {
  const badgeUrl = BADGE_MAP["generative-ai-practitioner"];
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
  // Gestion stricte des tentatives (2 max, reset avec retake)
  const ATTEMPT_KEY = 'abirai_examAttempts_generative-ai-practitioner';
  const [attemptsLeft, setAttemptsLeft] = useState(2);

  const priceLabel = useMemo(
    () => `${EXAM_DETAILS.price}${EXAM_DETAILS.currency}`,
    []
  );

  useEffect(() => {
    const runAccessCheck = async () => {
      const access = await checkExamAccess();
      setHasAccess(access);
      setIsChecking(false);
      // Lecture du compteur de tentatives dans localStorage
      if (typeof window !== "undefined") {
        const attempts = parseInt(localStorage.getItem(ATTEMPT_KEY) || '0', 10);
        setAttemptsLeft(2 - attempts);
      }
    };
    runAccessCheck();
  }, [router]);

  // Nouveau : Start Exam ouvre la modale d'accès (Pay/Voucher)
  const handleStartExam = () => {
    setIsAccessOpen(true);
  };

  const handleVoucherSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setVoucherError(null);
    setIsRedeeming(true);
    try {
      const result = await validateVoucherCode(voucherCode);
      if (result.success) {
        setHasAccess(true);
        setIsVoucherOpen(false);
        // Réinitialise le compteur de tentatives
        setAttemptsLeft(2);
        if (typeof window !== "undefined") {
          localStorage.setItem(ATTEMPT_KEY, '0');
          try {
            const { clearIdentity } = await import("../../../../utils/userIdentity");
            clearIdentity();
          } catch {}
        }
        router.push("/certifications/generative-ai-practitioner/exam/start");
      } else {
        setVoucherError(result.message);
      }
    } catch {
      setVoucherError("Network error. Please try again.");
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleRetakeSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setRetakeError(null);
    setIsRetakeRedeeming(true);

    const isValid = await validateRetakeCode(retakeCode);

    if (isValid) {
      setHasAccess(true);
      setIsRetakeOpen(false);
      // Reset le compteur de tentatives pour permettre 2 nouvelles tentatives
      if (typeof window !== "undefined") {
        localStorage.setItem(ATTEMPT_KEY, '0');
        setAttemptsLeft(2);
      }
      router.push("/certifications/generative-ai-practitioner/exam/start");
    } else {
      setRetakeError("The retake code is invalid or expired.");
    }

    setIsRetakeRedeeming(false);
  };

  return (
    <main className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/70 dark:border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/certifications" className="hover:text-slate-900 dark:hover:text-white">
              Certifications
            </Link>
            <span>/</span>
            <Link
              href="/certifications/generative-ai-practitioner"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Generative AI Practitioner
            </Link>
            <span>/</span>
            <span className="text-slate-700 dark:text-slate-200">Exam</span>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                Certification Exam
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-semibold leading-tight">
                {EXAM_DETAILS.name}
              </h1>
              <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
                Validate your practical AI skills with a focused, fair assessment built around real-world tasks and responsible usage. Learning content is free; the exam is a paid credential.
              </p>
              {/* Section Duration, Format, Passing Score */}
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
                    <span className="text-blue-600">✔</span>
                    <p className="text-sm text-slate-700 dark:text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-xl bg-slate-50 dark:bg-slate-800 px-4 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">One-time payment</span>
                  <span className="text-xl font-semibold text-slate-900 dark:text-white">{priceLabel}</span>
                </div>
                {/* Logo en bas de la box principale */}
                {badgeUrl && (
                  <div style={{display:'flex',justifyContent:'center',marginTop:'2em'}}>
                    <img src={badgeUrl} alt="Certification badge" style={{maxWidth:140,maxHeight:140,objectFit:'contain',borderRadius:12,boxShadow:'0 2px 8px #0001'}} />
                  </div>
                )}
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
              This assessment verifies applied knowledge, not memorization. The focus is on responsible, real-world usage of generative AI tools.
            </p>
            <ul className="mt-6 space-y-3">
              {VALIDATES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
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
          </div>
        </div>
      </section>

      {/* Access options modal */}
      {isAccessOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white dark:bg-slate-900 p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Exam access</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Please choose a method to unlock the exam. You will need to pay or use a voucher before accessing the test and identity form.
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
                onClick={async () => {
                  const userId = localStorage.getItem('abirai_userId');
                  const res = await fetch('/api/stripe/create-checkout-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      examId: CERTIFICATION_ID,
                      priceId: 'price_1T0vmeIxX8ZlSW7LiexpMIZp', // Generative AI Practitioner
                      userId,
                    }),
                  });
                  const data = await res.json();
                  if (data.url) {
                    window.location.href = data.url;
                  } else {
                    alert('Payment error: ' + (data.error || 'Unknown error'));
                  }
                }}
                className="w-full rounded-md bg-blue-600 text-white px-4 py-3 text-sm font-semibold hover:bg-blue-700 dark:bg-white dark:text-slate-900"
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
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Payment unlocks two attempts and the identity form. Voucher unlocks the same access.
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
                  Voucher codes unlock paid exam access. Example: GAP-XXXXXX
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
                  placeholder="GAP-123456"
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
