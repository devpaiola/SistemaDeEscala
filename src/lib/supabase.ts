// Exemplo em Node.js

// Use as variáveis de ambiente para segurança
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY // <-- Use a chave de serviço!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be defined in environment variables.');
}

// Agora, esta operação vai ignorar as políticas de RLS
