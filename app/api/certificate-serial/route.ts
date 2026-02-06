import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SERIALS_FILE = path.resolve(process.cwd(), 'data/certificateSerials.json');

function padId(id: number): string {
  return id.toString().padStart(6, '0');
}

export async function POST(req: NextRequest) {
  const { certCode } = await req.json();
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
  const serial = `ABIR-${certCode}-${year}-${padId(newId)}`;
  return NextResponse.json({ serial });
}
