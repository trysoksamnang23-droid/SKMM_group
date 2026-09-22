-- ============================================
-- SKMM Web - Fix: change id columns from UUID to TEXT
-- Run in Supabase SQL Editor
-- ============================================

ALTER TABLE applications ALTER COLUMN "id" TYPE TEXT USING "id"::text;
ALTER TABLE interview_requests ALTER COLUMN "id" TYPE TEXT USING "id"::text;
ALTER TABLE partner_requests ALTER COLUMN "id" TYPE TEXT USING "id"::text;
ALTER TABLE contact_inquiries ALTER COLUMN "id" TYPE TEXT USING "id"::text;
ALTER TABLE hanabi_enrollments ALTER COLUMN "id" TYPE TEXT USING "id"::text;
