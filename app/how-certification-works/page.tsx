import React from "react";

export default function HowCertificationWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          How Certification Works
        </h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Exam Process</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Exams are available online and can be taken at your convenience. Each exam includes a mix of multiple-choice, practical, and scenario-based questions. Results are provided instantly for most question types.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Scoring & Results</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Most questions are automatically graded. For open-ended or project-based questions, a double-blind review ensures fairness. You receive a detailed score report and, if successful, a verifiable digital certificate.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Retakes & Support</h2>
          <p className="text-gray-700 dark:text-gray-300">
            If you do not pass on your first attempt, you can retake the exam after a short waiting period. Our support team is available to answer any questions about the process.
          </p>
        </section>
      </div>
    </div>
  );
}
