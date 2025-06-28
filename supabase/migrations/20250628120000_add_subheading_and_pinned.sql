
-- Add subheading and pinned columns to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN subheading text,
ADD COLUMN pinned boolean DEFAULT false;

-- Create index for pinned posts for better performance
CREATE INDEX idx_blog_posts_pinned ON blog_posts(pinned, created_at DESC);
