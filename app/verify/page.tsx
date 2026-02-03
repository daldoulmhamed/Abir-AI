"use client";
import React, { useState } from "react";
import { certificates } from "../../data/certificateVerificationData";

export default function CertificateVerificationPage() {
  const [serial, setSerial] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    status: string;
    fullName: string;
    certificationTitle: string;
    issueDate: string;
    certificateSerial: string;
  }>(null);
  const [error, setError] = useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");
    setTimeout(() => {
      const cert = certificates.find(
        (c) => c.certificateSerial.trim().toUpperCase() === serial.trim().toUpperCase()
      );
      if (cert && cert.status === "Valid") {
        setResult(cert);
      } else if (cert && cert.status === "Revoked") {
        setError("❌ Ce certificat a été révoqué.");
      } else {
        setError("❌ Certificate not found or invalid serial number");
      }
      setLoading(false);
    }, 800); // Simulate loading
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Verify an Abir-IA Certificate</h1>
        <p className="text-gray-600 mb-6 text-center">Confirm the authenticity of an Abir-IA certification</p>
        <form onSubmit={handleVerify} className="space-y-4">
          <label htmlFor="serial" className="block text-sm font-medium text-gray-700">
            Certificate Serial Number
          </label>
          <input
            id="serial"
            name="serial"
            type="text"
            autoComplete="off"
            required
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ABIR-AI-2026-000123"
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors disabled:opacity-60"
            disabled={loading || !serial}
          >
            {loading ? "Verifying..." : "Verify Certificate"}
          </button>
        </form>
        <div className="mt-6 min-h-[60px]">
          {result && (
            <div className="bg-green-50 border border-green-400 text-green-800 rounded p-4 text-sm">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">✅</span>
                <span className="font-semibold">Status: Valid Certificate</span>
              </div>
              <div><span className="font-medium">Holder:</span> {result.fullName}</div>
              <div><span className="font-medium">Certification:</span> {result.certificationTitle}</div>
              <div><span className="font-medium">Issued by:</span> Abir-IA</div>
              <div><span className="font-medium">Issue date:</span> {new Date(result.issueDate).toLocaleDateString()}</div>
              <div><span className="font-medium">Serial number:</span> {result.certificateSerial}</div>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-800 rounded p-4 text-sm flex items-center">
              <span className="text-2xl mr-2">❌</span>
              <span>{error}</span>
            </div>
          )}
        </div>
        <p className="mt-8 text-xs text-gray-500 text-center border-t pt-4">
          This verification confirms that the certificate was issued by Abir-IA.
        </p>
      </div>
    </div>
  );
}

// To connect to a real database, replace the import and lookup logic above with an API call or database query.
