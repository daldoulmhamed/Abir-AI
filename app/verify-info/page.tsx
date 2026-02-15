import React from "react";

export default function VerifyInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Certificate Verification Information
        </h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">How to Verify a Certificate</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Every certificate issued by Abir-AI includes a unique serial number. You can verify the authenticity of any certificate using our online verification tool. Simply enter the serial number to confirm the holder's achievement.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Security & Privacy</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We protect your data and ensure that only authorized parties can access certificate information. Verification is secure, transparent, and respects the privacy of all certificate holders.
          </p>
        </section>
      </div>
    </div>
  );
}
