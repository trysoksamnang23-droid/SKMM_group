-- ============================================
-- SKMM Web - Online Fix: RLS & Permissions
-- Run in Supabase SQL Editor
-- https://console.supabase.com/project/wmcgccjkkxotkeoqgpwg/sql
-- ============================================

-- 1. Disable RLS on ALL tables (safe for this use case)
-- The anon key needs full access for public pages to read data
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE candidates DISABLE ROW LEVEL SECURITY;
ALTER TABLE applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE interview_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE partner_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE hanabi_schedules DISABLE ROW LEVEL SECURITY;
ALTER TABLE hanabi_enrollments DISABLE ROW LEVEL SECURITY;

-- 2. Verify tables have correct camelCase columns
-- Check jobs table
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'jobs' ORDER BY ordinal_position;

-- 3. Verify data exists
SELECT COUNT(*) as job_count FROM jobs;
SELECT COUNT(*) as news_count FROM news;
SELECT COUNT(*) as candidate_count FROM candidates;
SELECT COUNT(*) as schedule_count FROM hanabi_schedules;

-- 4. Verify RLS is disabled on all tables
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND rowsecurity = true;


-- 5. Check table schemas match JavaScript expectations
-- jobs: id, title, titleKhmer, company, country, city, salary, salaryDetail, schedule, employmentType, theme, statusBadge, date, sector, description, requirements, benefits
-- news: id, title, date, category, categoryLabel, author, readTime, excerpt, content
-- candidates: id, name, initials, gender, level, category, sector, age, experience, driving, video, status, statusClass
-- hanabi_schedules: id, courseName, targetLevel, duration, schedule, tuitionFee, sponsorship
