
import { createClient } from '@supabase/supabase-js';

export const getsupabase = (token) =>  {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE,
    {
      global: {
        headers: {
          Authorization:`Bearer ${token}`
        }
      }
    }
  );
}

export const adminsupabase = () => {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE 
  )
}