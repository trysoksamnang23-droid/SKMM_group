-- ============================================
-- Fix: Add missing columns to match JavaScript code
-- Run in Supabase SQL Editor
-- ============================================

-- 1. INTERVIEW_REQUESTS - add missing columns
ALTER TABLE interview_requests 
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS "submittedAt" TEXT,
ADD COLUMN IF NOT EXISTS "dateTime" TIMESTAMPTZ;

-- 2. PARTNER_REQUESTS - add missing columns
ALTER TABLE partner_requests 
ADD COLUMN IF NOT EXISTS "contactName" TEXT,
ADD COLUMN IF NOT EXISTS "contactEmail" TEXT,
ADD COLUMN IF NOT EXISTS "submittedAt" TEXT;

-- 3. CONTACT_INQUIRIES - add missing columns
ALTER TABLE contact_inquiries 
ADD COLUMN IF NOT EXISTS type TEXT,
ADD COLUMN IF NOT EXISTS message TEXT,
ADD COLUMN IF NOT EXISTS "submittedAt" TEXT,
ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMPTZ DEFAULT now();

-- 4. APPLICATIONS - add missing columns
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS "jobPosition" TEXT,
ADD COLUMN IF NOT EXISTS "japaneseLevel" TEXT,
ADD COLUMN IF NOT EXISTS "appliedAt" TEXT,
ADD COLUMN IF NOT EXISTS "appliedDate" TIMESTAMPTZ DEFAULT now(),
ADD COLUMN IF NOT EXISTS dob TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS experience TEXT;

-- 5. HANABI_ENROLLMENTS - add missing columns
ALTER TABLE hanabi_enrollments 
ADD COLUMN IF NOT EXISTS knowledge TEXT,
ADD COLUMN IF NOT EXISTS dormitory TEXT,
ADD COLUMN IF NOT EXISTS career TEXT,
ADD COLUMN IF NOT EXISTS "submittedAt" TEXT,
ADD COLUMN IF NOT EXISTS "enrollmentDate" TIMESTAMPTZ DEFAULT now();

-- 6. Fix column naming: date_time -> dateTime for interview_requests
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='interview_requests' AND column_name='date_time') THEN
        ALTER TABLE interview_requests RENAME COLUMN date_time TO "dateTime";
    END IF;
END $$;

-- 7. Fix column naming: candidate_name -> candidateName
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='interview_requests' AND column_name='candidate_name') THEN
        ALTER TABLE interview_requests RENAME COLUMN candidate_name TO "candidateName";
    END IF;
END $$;

-- 8. Fix column naming: contact_email -> contactEmail for partner_requests
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='partner_requests' AND column_name='contact_email') THEN
        ALTER TABLE partner_requests RENAME COLUMN contact_email TO "contactEmail";
    END IF;
END $$;

-- 9. Fix column naming: applied_date -> appliedDate for applications
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='applications' AND column_name='applied_date') THEN
        ALTER TABLE applications RENAME COLUMN applied_date TO "appliedDate";
    END IF;
END $$;

-- 10. Fix column naming: enrollment_date -> enrollmentDate for hanabi_enrollments
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='hanabi_enrollments' AND column_name='enrollment_date') THEN
        ALTER TABLE hanabi_enrollments RENAME COLUMN enrollment_date TO "enrollmentDate";
    END IF;
END $$;

-- 11. Fix column naming: created_at -> createdAt for contact_inquiries
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contact_inquiries' AND column_name='created_at') THEN
        ALTER TABLE contact_inquiries RENAME COLUMN created_at TO "createdAt";
    END IF;
END $$;

-- Verify the changes
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('interview_requests', 'partner_requests', 'contact_inquiries', 'applications', 'hanabi_enrollments', 'jobs', 'news', 'candidates', 'hanabi_schedules')
ORDER BY table_name, ordinal_position;