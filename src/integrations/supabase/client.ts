
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aeasfunzngepwiulqgjb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlYXNmdW56bmdlcHdpdWxxZ2piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMjg5NTcsImV4cCI6MjA2NTgwNDk1N30.fsxRA4FlpebiNJ6WWRE-PkOcF1snEamnENIHzT-2_KA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
