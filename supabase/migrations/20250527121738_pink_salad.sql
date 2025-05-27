/*
  # Add user creation policy

  1. Changes
    - Add new RLS policy to allow creation of new users
    
  2. Security
    - Allows authenticated users to create new users
    - Maintains existing policies for user management and reading
*/

-- Add policy to allow authenticated users to create new users
CREATE POLICY "Allow authenticated users to create users"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (true);