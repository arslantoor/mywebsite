-- Drop existing policy and create a more secure one
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

-- Only authenticated users can view their own roles
CREATE POLICY "Authenticated users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());