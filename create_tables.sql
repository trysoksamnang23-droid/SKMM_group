-- ============================================
-- SKMM Web - Database Schema
-- Run this in Supabase SQL Editor:
-- https://console.supabase.com/project/wmcgccjkkxotkeoqgpwg/sql
-- ============================================

-- 1. JOBS TABLE
CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_khmer TEXT,
  company TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  salary TEXT NOT NULL,
  salary_detail TEXT,
  schedule TEXT,
  employment_type TEXT,
  theme TEXT DEFAULT 'peach',
  status_badge TEXT,
  date TEXT NOT NULL,
  sector TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements JSONB DEFAULT '[]',
  benefits JSONB DEFAULT '[]'
);

-- 2. NEWS TABLE
CREATE TABLE news (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT,
  author TEXT,
  read_time TEXT,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL
);

-- 3. CANDIDATES TABLE
CREATE TABLE candidates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  initials TEXT,
  gender TEXT,
  level TEXT,
  category TEXT,
  sector TEXT,
  age TEXT,
  experience TEXT,
  driving TEXT,
  video TEXT,
  status TEXT DEFAULT 'Available',
  status_class TEXT
);

-- 4. APPLICATIONS TABLE
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  position TEXT,
  japanese_level TEXT,
  applied_date TIMESTAMPTZ DEFAULT now()
);

-- 5. INTERVIEW REQUESTS TABLE
CREATE TABLE interview_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_name TEXT,
  company TEXT,
  representative TEXT,
  tool TEXT,
  date_time TIMESTAMPTZ,
  status TEXT DEFAULT 'Pending'
);

-- 6. PARTNER REQUESTS TABLE
CREATE TABLE partner_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT,
  contact_email TEXT,
  industry TEXT,
  volume TEXT,
  status TEXT DEFAULT 'Pending'
);

-- 7. CONTACT INQUIRIES TABLE
CREATE TABLE contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  type TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. HANABI SCHEDULES TABLE
CREATE TABLE hanabi_schedules (
  id TEXT PRIMARY KEY,
  course_name TEXT NOT NULL,
  target_level TEXT,
  duration TEXT,
  schedule TEXT,
  tuition_fee TEXT,
  sponsorship TEXT
);

-- 9. HANABI ENROLLMENTS TABLE
CREATE TABLE hanabi_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  course TEXT,
  enrollment_date TIMESTAMPTZ DEFAULT now()
);

-- Enable real-time for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE news;
ALTER PUBLICATION supabase_realtime ADD TABLE candidates;
ALTER PUBLICATION supabase_realtime ADD TABLE applications;
ALTER PUBLICATION supabase_realtime ADD TABLE interview_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE partner_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE contact_inquiries;
ALTER PUBLICATION supabase_realtime ADD TABLE hanabi_schedules;
ALTER PUBLICATION supabase_realtime ADD TABLE hanabi_enrollments;
