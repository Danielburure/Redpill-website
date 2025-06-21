
-- Update storage policies to allow public uploads for images
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

CREATE POLICY "Anyone can upload images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images');

CREATE POLICY "Anyone can update images" ON storage.objects
FOR UPDATE USING (bucket_id = 'images');

CREATE POLICY "Anyone can delete images" ON storage.objects
FOR DELETE USING (bucket_id = 'images');

-- Update storage policies to allow public uploads for videos
DROP POLICY IF EXISTS "Authenticated users can upload videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON storage.objects;

CREATE POLICY "Anyone can upload videos" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Anyone can update videos" ON storage.objects
FOR UPDATE USING (bucket_id = 'videos');

CREATE POLICY "Anyone can delete videos" ON storage.objects
FOR DELETE USING (bucket_id = 'videos');
