import React from "react";

export default function CredibilityPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Certification Credibility & Transparency
        </h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">How Exams Are Evaluated</h2>
          <p className="text-gray-700 dark:text-gray-300">
            All certification exams are automatically and objectively graded. Multiple-choice and practical questions are scored instantly. For open-ended or project-based questions, a double-blind review process is used to ensure fairness and consistency. No human grader has access to your personal information during evaluation.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">What the Certificate Proves</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Earning a certificate demonstrates that you have mastered the required skills and knowledge for the selected AI domain. It validates your ability to apply concepts in real-world scenarios and signals your commitment to professional growth.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Limitations & Transparency</h2>
          <p className="text-gray-700 dark:text-gray-300">
            While our certifications are industry-recognized, they do not replace formal university degrees or guarantee employment. We are transparent about our evaluation process, scoring criteria, and certificate limitations to ensure credibility and trust.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Anti-Fraud Policy</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We use advanced proctoring, plagiarism detection, and identity verification to prevent cheating. Any attempt to manipulate results or provide false information will result in disqualification and a permanent ban from our platform.
          </p>
        </section>
      </div>
    </div>
  );
}
