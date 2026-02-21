"use client";
export const dynamic = "force-dynamic";
import { useEffect } from "react";
import { setFullName, setEmail } from "../../utils/userIdentity";
import UserIdentityForm from "../../components/UserIdentityForm";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyInfoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams) {
      const name = searchParams.get("name");
      const email = searchParams.get("email");
      if (name) setFullName(name);
      if (email) setEmail(email);
    }
  }, [searchParams]);
  // Fonction de validation pour rediriger vers l'exam
  const handleValidated = (_userId: string, _fullName: string, _email?: string) => {
    if (searchParams) {
      const examId = searchParams.get("examId");
      if (examId) {
        router.push(`/certifications/exam-result?examId=${examId}`);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Certificate Verification Information
        </h1>
        <UserIdentityForm onValidated={handleValidated} />
      </div>
    </div>
  );
}
