
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const BADGE_MAP: Record<string, string> = {
  "ai-productivity-github-copilot": "/images/ai-productivity-github-copilot.png",
  "generative-ai-practitioner": "/images/generative-ai-practitioner.png",
  "generative-ai-business-operations": "/images/generative-ai-for-business-operations.png",
  "ai-governance-responsible-ai-foundations": "/images/ai-governance-responsible-ai-foundations.png",
};

const EXAM_DETAILS = {
  name: "AI Productivity & GitHub Copilot Exam",
  duration: "90 minutes",
  format: "65 multiple-choice questions",
  passingScore: "72%",
  price: 79,
  currency: "€",
  includes: [
    "One exam attempt + one free retake",
    "Official digital certificate",
    "Shareable credential badge",
    "Detailed score report by domain",
    "Immediate results and next-step guidance"
  ]
};

const CERTIFICATION_ID = "ai-productivity-github-copilot";

const VALIDATES = [
  "Effective use of GitHub Copilot for code generation and refactoring",
  "Prompting strategies for accurate, context-aware suggestions",
  "Safe AI-assisted development practices and code quality checks",
  "Workflow automation and productivity measurement",
  "Human + AI collaboration for reliable engineering outcomes"
];

const AUDIENCE = [
  "Developers and technical teams using Copilot",
  "Product engineers seeking faster, safer delivery",
  "Leads standardizing AI-assisted coding practices",
  "Learners who completed the free productivity modules"
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
  "No trick questions—focus is on practical, real-world usage"
];

import { Suspense } from "react";

function AiProductivityCopilotExamPageInner() {
  const badgeUrl = BADGE_MAP["ai-productivity-github-copilot"];
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isAccessOpen, setIsAccessOpen] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherError, setVoucherError] = useState<string | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isRetakeOpen, setIsRetakeOpen] = useState(false);
  // Nouveau système : tokenId = code, examId = CERTIFICATION_ID, fullName
  const [retakeTokenId, setRetakeTokenId] = useState("");
  const [retakeError, setRetakeError] = useState<string | null>(null);
  const [isRetakeRedeeming, setIsRetakeRedeeming] = useState(false);
  const [retakeFullName, setRetakeFullName] = useState("");
  const searchParams = useSearchParams();
  // Suppression de la logique retakeCodesList (obsolète)

  const priceLabel = useMemo(
    () => `${EXAM_DETAILS.price}${EXAM_DETAILS.currency}`,
    []
  );

  const handleStartExam = () => {
    if (hasAccess) {
      router.push("/certifications/ai-productivity-github-copilot/exam/start");
      return;
    }
    setIsAccessOpen(true);
  };

  // Plus besoin de userId, on ne pré-remplit rien

  const handleValidateRetake = async () => {
    if (!retakeTokenId.trim() || !retakeFullName.trim()) {
      setRetakeError("Veuillez saisir votre code de retake et votre nom complet.");
      return;
    }
    setRetakeError(null);
    setIsRetakeRedeeming(true);
    try {
      const res = await fetch("/api/retakes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenId: retakeTokenId.trim(),
          examId: CERTIFICATION_ID,
          fullName: retakeFullName.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        setHasAccess(true);
        setIsRetakeOpen(false);
        router.push("/certifications/ai-productivity-github-copilot/exam/start");
      } else {
        setRetakeError(data.message || "Impossible de valider le code de retake.");
      }
    } catch (err) {
      setRetakeError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setIsRetakeRedeeming(false);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-slate-200/70 dark:border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/certifications" className="hover:text-slate-900 dark:hover:text-white">
              Certifications
            </Link>
            <span>/</span>
            <Link
              href="/certifications/ai-productivity-github-copilot"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              AI Productivity & Copilot
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
                Validate your Copilot skills with a focused, fair assessment built around real-world tasks and responsible usage. Learning content is free; the exam is a paid credential.
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
              </div>
              {isRetakeOpen && (
                <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-6 text-left">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Validate your retake code</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    For security, please enter the same full name used in your retake request.
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Full name</label>
                      <input
                        value={retakeFullName}
                        onChange={(e) => setRetakeFullName(e.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Retake code</label>
                      <input
                        value={retakeTokenId}
                        onChange={(e) => setRetakeTokenId(e.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                        placeholder="RETAKE-XXXXXXX"
                      />
                    </div>
                  </div>
                  {retakeError && (
                    <div className="mt-4 text-sm text-red-600">
                      {retakeError}
                    </div>
                  )}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleValidateRetake}
                      disabled={isRetakeRedeeming}
                      className="rounded-md bg-slate-900 text-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-slate-800 disabled:opacity-60"
                    >
                      {isRetakeRedeeming ? "Validation en cours..." : "Validate & Start Exam"}
                    </button>
                    <button
                      onClick={() => setIsRetakeOpen(false)}
                      className="rounded-md border border-slate-300 dark:border-slate-700 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
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
      {/* Audience section */}
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
      {/* Access section */}
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
      {/* Pricing section */}
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
        {/* Access options modal */}
        {isAccessOpen && (
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
                  onClick={() => {/* Stripe checkout à implémenter */}}
                  className="w-full rounded-md bg-slate-900 text-white px-4 py-3 text-sm font-semibold hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                >
                  Pay {priceLabel}
                </button>
                <button
                  onClick={() => { setIsAccessOpen(false); setIsVoucherOpen(true); }}
                  className="w-full rounded-md border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  I have a voucher
                </button>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                One paid attempt unlocks one extra attempt if the first try is unsuccessful.
              </p>
            </div>
          </div>
        )}

        {/* Voucher modal */}
        {isVoucherOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 p-6 shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Enter voucher code</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Voucher codes unlock paid exam access. Example: COP-XXXXXX
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
              <form onSubmit={async (e) => {
                e.preventDefault();
                setVoucherError(null);
                setIsRedeeming(true);
                try {
                  const res = await fetch("/api/vouchers", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: voucherCode, certificationId: CERTIFICATION_ID })
                  });
                  const data = await res.json();
                  if (data.success) {
                    setHasAccess(true);
                    setIsVoucherOpen(false);
                    router.push("/certifications/ai-productivity-github-copilot/exam/start");
                  } else {
                    setVoucherError(data.message);
                  }
                } catch {
                  setVoucherError("Network error. Please try again.");
                } finally {
                  setIsRedeeming(false);
                }
              }} className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Voucher code</label>
                  <input
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                    placeholder="COP-XXXXXX"
                  />
                </div>
                {voucherError && (
                  <div className="text-sm text-red-600">{voucherError}</div>
                )}
                <button
                  type="submit"
                  disabled={isRedeeming}
                  className="w-full rounded-md bg-slate-900 text-white px-4 py-3 text-sm font-semibold hover:bg-slate-800 disabled:opacity-60"
                >
                  {isRedeeming ? "Validation en cours..." : "Validate & Start Exam"}
                </button>
              </form>
            </div>
          </div>
        )}
    </main>
  );

}

export default function AiProductivityCopilotExamPage() {
  return (
    <Suspense>
      <AiProductivityCopilotExamPageInner />
    </Suspense>
  );
}
