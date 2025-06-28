
-- Add the missing pinned and subheading columns to the blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS pinned BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS subheading TEXT;

-- Update the existing posts to have pinned set to false by default
UPDATE public.blog_posts 
SET pinned = false 
WHERE pinned IS NULL;
