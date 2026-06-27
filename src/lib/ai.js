import { adminSupabase } from "@/lib/supabase/admin";

export async function getAISettings() {
  const { data, error } = await adminSupabase
    .from("ai_settings")
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}