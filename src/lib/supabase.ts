import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// CORRIGIDO: Usando o prefixo VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// CORRIGIDO: Usando a chave pública (anon) e o prefixo VITE_
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);