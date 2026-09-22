-- ============================================
-- SKMM Web - Add missing columns (safe, no data loss)
-- Run in Supabase SQL Editor
-- ============================================

-- APPLICATIONS: position already exists, add extras
ALTER TABLE applications ADD COLUMN IF NOT EXISTS "jobPosition" TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS "dob" TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS "location" TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS "experience" TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS "appliedAt" TEXT;

-- INTERVIEW REQUESTS: add email, notes, datetime
ALTER TABLE interview_requests ADD COLUMN IF NOT EXISTS "email" TEXT;
ALTER TABLE interview_requests ADD COLUMN IF NOT EXISTS "notes" TEXT;
ALTER TABLE interview_requests ADD COLUMN IF NOT EXISTS "datetime" TEXT;

-- PARTNER REQUESTS: add contactName, email
ALTER TABLE partner_requests ADD COLUMN IF NOT EXISTS "contactName" TEXT;
ALTER TABLE partner_requests ADD COLUMN IF NOT EXISTS "email" TEXT;

-- HANABI ENROLLMENTS: add knowledge, dormitory, career
ALTER TABLE hanabi_enrollments ADD COLUMN IF NOT EXISTS "knowledge" TEXT;
ALTER TABLE hanabi_enrollments ADD COLUMN IF NOT EXISTS "dormitory" TEXT;
ALTER TABLE hanabi_enrollments ADD COLUMN IF NOT EXISTS "career" TEXT;
