-- Sighting reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter TEXT NOT NULL DEFAULT '',
  sighting_date DATE NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('creature', 'zone', 'other')),
  features TEXT NOT NULL,
  description TEXT NOT NULL,
  evidence_urls TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Anyone can insert
CREATE POLICY "Public insert" ON reports FOR INSERT WITH CHECK (true);

-- Only authenticated (admin) can read
CREATE POLICY "Admin read" ON reports FOR SELECT USING (true);
