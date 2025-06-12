// Exemplo em Node.js
import { createClient } from '@supabase/supabase-js'

// Use as variáveis de ambiente para segurança
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY // <-- Use a chave de serviço!

const supabase = createClient(supabaseUrl, supabaseKey)

// Agora, esta operação vai ignorar as políticas de RLS
const { data, error } = await supabase
  .from('users')
  .insert([{ name: 'Novo Usuário', role: 'member' }])