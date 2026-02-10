"use client";
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./ExamResult.module.css";
import { useRouter } from "next/navigation";

// Configuration
const PASSING_THRESHOLD = 70; // %

// Pour la démo, simulez les différents cas d'échec :
// 1er échec : retakeAttemptsLeft = 1, affiche le code de rattrapage
// 2e échec (après usage du code) : retakeAttemptsLeft = 0, plus de code
// Modifiez ces valeurs pour tester !

const DEFAULT_CERTIFICATION = "AI Productivity with GitHub Copilot";

// On ne met plus de titre par défaut, mais un slug par défaut
const DEFAULT_CERTIFICATION_SLUG = "generative-ai-practitioner";
const initialResult = {
  certificationSlug: DEFAULT_CERTIFICATION_SLUG,
  score: 68,
  maxScore: 100,
  retakeAttemptsLeft: 1,
  usedRetakeCode: false,
};


export default function ExamResultPage() {
  // --- HOOKS: useState ---
  const searchParams = useSearchParams();
  const [result, setResult] = useState(initialResult);
  const [userFullName, setUserFullName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [certificateSerial, setCertificateSerial] = useState("");
  const [retakeError, setRetakeError] = useState<string | null>(null);
  const [loadingRetake, setLoadingRetake] = useState(false);
  const router = useRouter();

  // --- HOOKS: useMemo ---
  const { certificationId, certificationTitle, userId, certificateInfoUrl } = React.useMemo(() => {
    let certificationId = "";
    let certificationTitle = "";
    let userId = "USER_DEMO";
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { certifications } = require("@/data/certifications");
      let found = certifications.find((c: any) => c.slug === result.certificationSlug);
      if (!found && certifications.length > 0) found = certifications[0];
      if (found) {
        certificationId = found.id;
        certificationTitle = found.title;
      } else {
        certificationId = "1";
        certificationTitle = "Unknown Certification";
      }
    } catch (e) {
      certificationId = "1";
      certificationTitle = "Unknown Certification";
    }
    const certificateInfoUrl = `/certifications/certificate-info?mode=certificate&certificationId=${certificationId}&userId=${userId}`;
    return { certificationId, certificationTitle, userId, certificateInfoUrl };
  }, [result.certificationSlug]);


  // --- LOGIQUE ---
  let percentage = 0;
  let passed = false;

  if (result.certificationSlug === "ai-governance-responsible-ai-foundations") {
    // score = nombre de bonnes réponses, maxScore = 14
    const max = 14;
    const correct = Math.max(0, Math.min(result.score, max));
    percentage = Math.round((correct / max) * 100);
    passed = correct >= 10;
  } else {
    percentage = Math.round((result.score / result.maxScore) * 100);
    passed = percentage >= 70;
  }

  // --- HOOKS: useEffect ---
  useEffect(() => {
    // Récupère score et slug de certification de l'URL si présents
    const scoreParam = searchParams.get("score");
    const certSlugParam = searchParams.get("page") || searchParams.get("certification") || DEFAULT_CERTIFICATION_SLUG;
    if (scoreParam) {
      setResult((prev) => ({
        ...prev,
        score: parseInt(scoreParam, 10),
        certificationSlug: certSlugParam,
      }));
    }
    setIsLoaded(true);
  }, [searchParams]);

  useEffect(() => {
    if (passed && certificationId) {
      fetch("/api/certificate-serial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certCode: certificationId.toUpperCase() })
      })
        .then(res => res.json())
        .then(data => setCertificateSerial(data.serial || ""))
        .catch(() => setCertificateSerial("ERROR-GENERATING-SERIAL"));
    } else {
      setCertificateSerial("");
    }
  }, [passed, certificationId]);

  if (!isLoaded) {
    return null;
  }

  const handleRetake = async () => {
    if (!userFullName.trim()) {
      setRetakeError("Veuillez saisir votre nom complet.");
      return;
    }
    setLoadingRetake(true);
    setRetakeError(null);
    const examSlug = 'ai-productivity-github-copilot';
    const examId = examSlug;
    const fullName = userFullName.trim();
    let tokenId = null;
    try {
      const res = await fetch('/api/retakes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, examId })
      });
      const data = await res.json();
      if (!data.success && data.tokenId) {
        setRetakeError("No retake attempts remaining");
        setLoadingRetake(false);
        return;
      } else if (data.success && data.tokenId) {
        tokenId = data.tokenId;
      } else {
        setRetakeError("No retake attempts remaining");
        setLoadingRetake(false);
        return;
      }
    } catch (err) {
      setRetakeError("No retake attempts remaining");
      setLoadingRetake(false);
      return;
    }
    try {
      const validateRes = await fetch('/api/retakes/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenId, examId, fullName })
      });
      const validateData = await validateRes.json();
      if (validateData.success) {
        router.push(`/certifications/${examId}/exam/start?retake=1&tokenId=${tokenId}`);
      } else {
        setRetakeError("No retake attempts remaining");
      }
    } catch (err) {
      setRetakeError("No retake attempts remaining");
    }
    setLoadingRetake(false);
  };

  // Simule la réussite de l'examen
  const handleSuccess = () => {
    setResult({
      ...result,
      score: 85,
      retakeAttemptsLeft: 1,
      usedRetakeCode: false,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Exam Results</h1>
      <div className={passed ? styles.pass : styles.fail}>
        <span className={styles.status}>
          {passed ? "✅ Passed" : "❌ Failed"}
        </span>
      </div>
      <div className={styles.details}>
        <p>
          <strong>Certification:</strong> {certificationTitle}
        </p>
        <p>
          <strong>Score:</strong> {percentage}%
        </p>
      </div>
      {/* Certificate serial number is no longer displayed here */}
      {passed ? (
        <div className={styles.messageBlock}>
          <p className={styles.successMsg}>
            🎉 Congratulations! You have successfully passed the exam.<br />
            Your dedication and hard work paid off. You’re now certified—share your achievement and inspire others!
          </p>
          <button
            className={styles.primaryBtn}
            onClick={() => {
              router.push(certificateInfoUrl);
            }}
          >
            Continue to Certificate Info
          </button>
          <button className={styles.primaryBtn} style={{marginTop: 10}} onClick={handleRetake}>
            Simulate Fail
          </button>
        </div>
      ) : (
        <div className={styles.messageBlock}>
          <p className={styles.failMsg}>You did not pass this attempt.</p>
          <p className={styles.sweetMsg}>
            Don't be discouraged! Every expert was once a beginner. Review the material and come back stronger. You’re on the right path!
          </p>
          <div style={{marginBottom: 12}}>
            <label htmlFor="userFullName" style={{fontWeight:600}}>Full name:</label>
            <input
              id="userFullName"
              type="text"
              value={userFullName}
              onChange={e => setUserFullName(e.target.value)}
              placeholder="Enter your full name"
              style={{marginLeft:8, padding:4, borderRadius:4, border:'1px solid #ccc'}}
              disabled={loadingRetake}
            />
          </div>
          <button
            className={styles.primaryBtn}
            onClick={handleRetake}
            disabled={loadingRetake}
          >
            {loadingRetake ? "Processing..." : "Retake Exam"}
          </button>
          {retakeError && (
            <div className={styles.retakeErrorBox} style={{marginTop:12}}>
              <strong>{retakeError}</strong>
            </div>
          )}
          <button className={styles.primaryBtn} style={{marginTop: 10}} onClick={handleSuccess}>
            Simulate Success
          </button>
        </div>
      )}
    </div>
  );
}
