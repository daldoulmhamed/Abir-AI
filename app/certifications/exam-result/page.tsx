
// Ce fichier doit être un composant serveur qui importe un composant client

import { Suspense } from "react";
import ExamResultPage from "@/components/ExamResultPage";

export default function ExamResult() {
  return (
    <Suspense>
      <ExamResultPage />
    </Suspense>
  );
}
