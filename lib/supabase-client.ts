import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Missing some environment variable")
}
const api = createClient(SUPABASE_URL, SUPABASE_KEY)

export default api
