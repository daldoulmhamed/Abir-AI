// utils/auditLog.ts
// Journalisation interne des événements critiques (non visible utilisateur)

import fs from 'fs';
import path from 'path';

const LOG_PATH = path.resolve(process.cwd(), 'data', 'audit.log');

type AuditEvent =
  | { type: 'exam_started'; userId: string; examId: string; timestamp: string }
  | { type: 'exam_submitted'; userId: string; examId: string; timestamp: string }
  | { type: 'exam_result'; userId: string; examId: string; result: 'pass' | 'fail'; timestamp: string }
  | { type: 'retake_used'; userId: string; examId: string; timestamp: string }
  | { type: 'certificate_issued'; userId: string; certId: string; timestamp: string }
  | { type: 'certificate_verified'; certId: string; timestamp: string };

export function logAuditEvent(event: AuditEvent) {
  const line = JSON.stringify(event) + '\n';
  fs.appendFile(LOG_PATH, line, err => {
    if (err) {
      // Optionnel : log sur la console serveur
      console.error('Erreur journalisation audit:', err);
    }
  });
}
