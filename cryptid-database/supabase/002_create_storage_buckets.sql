-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('evidence', 'evidence', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('creatures', 'creatures', true);

-- Public read access for both buckets
CREATE POLICY "Public read evidence" ON storage.objects FOR SELECT USING (bucket_id = 'evidence');
CREATE POLICY "Public read creatures" ON storage.objects FOR SELECT USING (bucket_id = 'creatures');

-- Allow anonymous uploads to evidence bucket (for report form)
CREATE POLICY "Anyone can upload evidence" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'evidence');
