"use client";
import { Suspense } from "react";
import ExamResultPage from "./ExamResultPage";

export default function ExamResultPageClient() {
  return (
    <Suspense fallback={<div>Loading exam result...</div>}>
      <ExamResultPage />
    </Suspense>
  );
}
