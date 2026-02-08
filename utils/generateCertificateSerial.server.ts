// Générateur de numéro de série pour certificats Abir-IA (côté serveur uniquement)
import fs from 'fs';
import path from 'path';

const SERIALS_FILE = path.resolve(process.cwd(), 'data/certificateSerials.json');

function padId(id: number): string {
  return id.toString().padStart(6, '0');
}

/**
 * Génère un numéro de série unique pour un certificat Abir-IA.
 * @param {string} certCode - Code du certificat (ex: MAI, COPILOT)
 * @returns {string} Numéro de série généré
 */
export function generateCertificateSerial(certCode: string): string {
  const year = new Date().getFullYear();
  let serials: { [key: string]: number } = {};
  if (fs.existsSync(SERIALS_FILE)) {
    try {
      const raw = fs.readFileSync(SERIALS_FILE, 'utf-8');
      serials = JSON.parse(raw);
    } catch (e) {
      serials = {};
    }
  }
  const key = `${certCode}-${year}`;
  let lastId = serials[key] || 0;
  const newId = lastId + 1;
  serials[key] = newId;
  fs.writeFileSync(SERIALS_FILE, JSON.stringify(serials, null, 2));
  return `ABIR-${certCode}-${year}-${padId(newId)}`;
}