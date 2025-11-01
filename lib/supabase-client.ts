import { createClient } from "@supabase/supabase-js"
import { getSession } from "./auth"

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Missing some environment variable")
}

export const api = createClient(SUPABASE_URL, SUPABASE_KEY, {
  accessToken: async () => {
    const token = await getSession()
    if (token) {
      return token
    }
    return null
  },
})

export const authApi = createClient(SUPABASE_URL, SUPABASE_KEY).auth
