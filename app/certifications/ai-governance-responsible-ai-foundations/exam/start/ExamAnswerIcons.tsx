import React from "react";

export function AnswerIcon({ correct, selected, show }: { correct: boolean; selected: boolean; show: boolean }) {
  if (!show) return null;
  if (correct && selected) {
    return <span style={{ color: "#2e7d32", marginLeft: 8 }} title="Bonne réponse">✔️</span>;
  }
  if (!correct && selected) {
    return <span style={{ color: "#c62828", marginLeft: 8 }} title="Mauvaise réponse">❌</span>;
  }
  if (correct && !selected) {
    return <span style={{ color: "#2e7d32", marginLeft: 8 }} title="Bonne réponse non sélectionnée">✔️</span>;
  }
  return null;
}
