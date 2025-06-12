// supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://smdcewzikyrwlxrmipnd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtZGNld3ppa3lyd2x4cm1pcG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNDY3NzUsImV4cCI6MjA2MzkyMjc3NX0.oSWTZjtEdEbLYIycrt-ciRN2vi_4sP5wr-c87JZfFQU'

export const supabase = createClient(supabaseUrl, supabaseKey)