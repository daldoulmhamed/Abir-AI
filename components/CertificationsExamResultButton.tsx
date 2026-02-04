import Link from "next/link";

export default function CertificationsExamResultButton() {
  return (
    <Link href="/certifications/exam-result">
      <button type="button" style={{
        background: "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "10px 22px",
        fontWeight: 600,
        fontSize: "1rem",
        cursor: "pointer",
        margin: "18px auto 0 auto",
        display: "block"
      }}>
        View Mock Exam Result
      </button>
    </Link>
  );
}
