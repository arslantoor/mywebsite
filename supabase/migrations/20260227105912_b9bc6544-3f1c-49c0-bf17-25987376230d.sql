
-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  badge TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  live_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  video_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Anyone can view projects
CREATE POLICY "Anyone can view projects"
ON public.projects FOR SELECT
USING (true);

-- Admins can manage projects
CREATE POLICY "Admins can insert projects"
ON public.projects FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update projects"
ON public.projects FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete projects"
ON public.projects FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for project media
INSERT INTO storage.buckets (id, name, public) VALUES ('project-media', 'project-media', true);

-- Storage policies
CREATE POLICY "Anyone can view project media"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-media');

CREATE POLICY "Admins can upload project media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-media' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update project media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'project-media' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete project media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'project-media' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Project images table
CREATE TABLE public.project_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view project images"
ON public.project_images FOR SELECT
USING (true);

CREATE POLICY "Admins can insert project images"
ON public.project_images FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete project images"
ON public.project_images FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
