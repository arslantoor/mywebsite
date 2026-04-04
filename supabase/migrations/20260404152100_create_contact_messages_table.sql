-- Create contact_messages table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE,
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (anyone can submit contact forms)
CREATE POLICY "Anyone can submit contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Create policy to allow you to read messages (authenticated users only)
CREATE POLICY "Authenticated users can read contact messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');