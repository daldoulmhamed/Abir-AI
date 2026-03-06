import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { serial } = await req.json();
    if (!serial) {
      return NextResponse.json({ error: 'Missing serial number' }, { status: 400 });
    }
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('certificateSerial', serial.trim().toUpperCase())
      .limit(1);
    if (error) {
      return NextResponse.json({ error: 'Supabase error' }, { status: 500 });
    }
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Certificate not found or invalid serial number' }, { status: 404 });
    }
    const cert = data[0];
    if (cert.status === 'Revoked') {
      return NextResponse.json({ error: 'Ce certificat a été révoqué.' }, { status: 403 });
    }
    return NextResponse.json({
      status: cert.status,
      fullName: cert.fullName,
      certificationTitle: cert.certificationTitle,
      issueDate: cert.issueDate,
      certificateSerial: cert.certificateSerial,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
