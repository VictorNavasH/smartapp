import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Create a Supabase client with the anonymous key for client-side requests
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create a Supabase client with the service role key for server-side requests
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || "")

// Helper function to check if we're on the server
export const isServer = () => typeof window === "undefined"
