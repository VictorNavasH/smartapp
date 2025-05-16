// Supabase deshabilitado para despliegue sin variables de entorno
export const supabase = undefined
export const supabaseAdmin = undefined
export const isServer = () => typeof window === "undefined"
