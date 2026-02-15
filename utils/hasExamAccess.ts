import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

/**
 * Vérifie si un utilisateur a accès à un examen
 * @param userId UUID de l'utilisateur
 * @param examId ID de l'examen
 * @returns true si accès, false sinon
 */
export async function hasExamAccess(userId: string, examId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('exam_access')
    .select('id')
    .eq('user_id', userId)
    .eq('exam_id', examId)
    .single();
  if (error || !data) return false;
  return true;
}
