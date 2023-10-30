import { createClient } from '@supabase/supabase-js';

const SupabaseAdmin = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_API_KEY as string
);

export { SupabaseAdmin };
