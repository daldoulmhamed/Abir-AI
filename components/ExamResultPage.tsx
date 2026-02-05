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
const initialResult = {
  certificationName: DEFAULT_CERTIFICATION,
  score: 68,
  maxScore: 100,
  retakeAttemptsLeft: 1,
  usedRetakeCode: false,
};

export default function ExamResultPage() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState(initialResult);
  const router = useRouter();

  useEffect(() => {
    // Récupère score et certification de l'URL si présents
    const scoreParam = searchParams.get("score");
    const certParam = searchParams.get("page");
    if (scoreParam) {
      setResult((prev) => ({
        ...prev,
        score: parseInt(scoreParam, 10),
        certificationName: certParam ? certParam.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : DEFAULT_CERTIFICATION,
      }));
    }
  }, [searchParams]);

  const percentage = Math.round((result.score / result.maxScore) * 100);
  const passed = percentage >= PASSING_THRESHOLD;

  // Nouvelle logique : automatisation du flux de reprise
  const [retakeError, setRetakeError] = useState<string | null>(null);
  const [loadingRetake, setLoadingRetake] = useState(false);

  const handleRetake = async () => {
    setLoadingRetake(true);
    setRetakeError(null);
    // Récupération automatique du token lié à examId et fullName
    // Correction : le slug doit correspondre au chemin réel
    // Ici, on force le slug pour la démo Copilot
    const examSlug = 'ai-productivity-github-copilot';
    const examId = examSlug;
    const fullName = 'Utilisateur Démo'; // À remplacer par le vrai nom utilisateur (ex: depuis le profil)
    let tokenId = null;
    try {
      // Appel à l'API pour récupérer le token existant
      const res = await fetch('/api/retakes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, examId })
      });
      const data = await res.json();
      // Si le token existe mais est déjà utilisé, on bloque immédiatement
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
    // Validation du token
    try {
      const validateRes = await fetch('/api/retakes/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenId, examId, fullName })
      });
      const validateData = await validateRes.json();
      if (validateData.success) {
        // Redirection vers la page de démarrage d'examen
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

  // Récupérer l'ID de la certification et un userId fictif (à remplacer par l'ID réel utilisateur si disponible)
  // Ici, on déduit le slug à partir du nom de la certification (pour la démo)
  const certification = result.certificationName;
  // On cherche le slug dans la liste des certifications (importée dynamiquement)
  let certificationId = "";
  let userId = "USER_DEMO";
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { certifications } = require("@/data/certifications");
    // Recherche par titre exact, sinon fallback sur le premier certificat
    let found = certifications.find((c: any) => c.title === certification);
    if (!found && certifications.length > 0) found = certifications[0];
    if (found) certificationId = found.id;
    else certificationId = "1";
  } catch (e) {
    certificationId = "1";
  }
  // Ajout du paramètre mode=certificate pour éviter l'erreur sur la page de formulaire
  const certificateInfoUrl = `/certifications/certificate-info?mode=certificate&certificationId=${certificationId}&userId=${userId}`;

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
          <strong>Certification:</strong> {result.certificationName}
        </p>
        <p>
          <strong>Score:</strong> {percentage}%
        </p>
      </div>
      {passed ? (
        <div className={styles.messageBlock}>
          <p className={styles.successMsg}>
            🎉 Bravo! You have successfully passed the exam.<br />
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
