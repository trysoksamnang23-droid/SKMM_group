-- ============================================
-- SKMM Web - Fix: camelCase columns with proper quoting
-- Run in Supabase SQL Editor
-- https://console.supabase.com/project/wmcgccjkkxotkeoqgpwg/sql
-- ============================================

-- Drop all tables
DROP TABLE IF EXISTS hanabi_enrollments;
DROP TABLE IF EXISTS contact_inquiries;
DROP TABLE IF EXISTS partner_requests;
DROP TABLE IF EXISTS interview_requests;
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS hanabi_schedules;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS jobs;

-- 1. JOBS TABLE (quoted camelCase columns)
CREATE TABLE jobs (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "titleKhmer" TEXT,
  "company" TEXT NOT NULL,
  "country" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "salary" TEXT NOT NULL,
  "salaryDetail" TEXT,
  "schedule" TEXT,
  "employmentType" TEXT,
  "theme" TEXT DEFAULT 'peach',
  "statusBadge" TEXT,
  "date" TEXT NOT NULL,
  "sector" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "requirements" JSONB DEFAULT '[]',
  "benefits" JSONB DEFAULT '[]'
);

-- 2. NEWS TABLE
CREATE TABLE news (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "date" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "categoryLabel" TEXT,
  "author" TEXT,
  "readTime" TEXT,
  "excerpt" TEXT NOT NULL,
  "content" TEXT NOT NULL
);

-- 3. CANDIDATES TABLE
CREATE TABLE candidates (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "initials" TEXT,
  "gender" TEXT,
  "level" TEXT,
  "category" TEXT,
  "sector" TEXT,
  "age" TEXT,
  "experience" TEXT,
  "driving" TEXT,
  "video" TEXT,
  "status" TEXT DEFAULT 'Available',
  "statusClass" TEXT
);

-- 4. APPLICATIONS TABLE
CREATE TABLE applications (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "name" TEXT NOT NULL,
  "phone" TEXT,
  "position" TEXT,
  "japaneseLevel" TEXT,
  "appliedDate" TIMESTAMPTZ DEFAULT now()
);

-- 5. INTERVIEW REQUESTS TABLE
CREATE TABLE interview_requests (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "candidateName" TEXT,
  "company" TEXT,
  "representative" TEXT,
  "tool" TEXT,
  "dateTime" TIMESTAMPTZ,
  "status" TEXT DEFAULT 'Pending'
);

-- 6. PARTNER REQUESTS TABLE
CREATE TABLE partner_requests (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "company" TEXT,
  "contactEmail" TEXT,
  "industry" TEXT,
  "volume" TEXT,
  "status" TEXT DEFAULT 'Pending'
);

-- 7. CONTACT INQUIRIES TABLE
CREATE TABLE contact_inquiries (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT,
  "type" TEXT,
  "message" TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- 8. HANABI SCHEDULES TABLE
CREATE TABLE hanabi_schedules (
  "id" TEXT PRIMARY KEY,
  "courseName" TEXT NOT NULL,
  "targetLevel" TEXT,
  "duration" TEXT,
  "schedule" TEXT,
  "tuitionFee" TEXT,
  "sponsorship" TEXT
);

-- 9. HANABI ENROLLMENTS TABLE
CREATE TABLE hanabi_enrollments (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "name" TEXT NOT NULL,
  "phone" TEXT,
  "course" TEXT,
  "enrollmentDate" TIMESTAMPTZ DEFAULT now()
);

-- Insert default jobs (quoted camelCase columns)
INSERT INTO jobs ("id", "title", "titleKhmer", "company", "country", "city", "salary", "salaryDetail", "schedule", "employmentType", "theme", "statusBadge", "date", "sector", "description", "requirements", "benefits") VALUES
('agri-engineer', 'Senior Agricultural Engineer', 'វិស្វករកសិកម្ម', 'SKMM Partner • Agri-Japan Co.', 'japan', 'Ibaraki / Tokyo, Japan', '$1,800 - $2,400/mo', '$1,800 - $2,400 / month (¥270,000 - ¥360,000)', 'full time', 'overseas', 'peach', 'SSW 1', '20 May, 2026', 'agriculture', 'Lead modern greenhouse cultivation, automated hydroponic crop management, and drone irrigation monitoring for premium Japanese fruits and vegetables.', '["JLPT N4 or JFT-Basic A2 certificate required","Agriculture Prometric Skill Assessment passed (or TITP 3-year completion)","Bachelor or Associate degree in Agronomy/Agriculture or 2+ years field experience","Strong physical health and high sense of responsibility"]', '["Dormitory subsidy (rent ¥15,000/mo includes Wi-Fi & utilities)","Full Japanese Social & Health Insurance (Shakai Hoken)","Annual return airfare bonus after 1st contract year","Overtime pay at 1.25x standard hourly rate"]'),
('japanese-instructor', 'Japanese Language Instructor', 'គ្រូបង្រៀនភាសាជប៉ុន', 'HANABI Training Center', 'cambodia', 'Phnom Penh, Cambodia', '$700 - $1,000/mo', '$700 - $1,000 / month', 'full time', 'full day', 'mint', 'HANABI Center', '4 Feb, 2026', 'education', 'Instruct Cambodian trainees and students from N5 to N3 level, focusing on practical conversation (Kaiwa), Japanese workplace culture (5S, Hou-Ren-So), and JLPT/JFT test preparation.', '["JLPT N2 or N1 certification","Prior teaching experience or returnee from Japan TITP/Technical internship","Passionate about education and mentoring young youth","Fluency in Khmer and Japanese"]', '["Annual bonus & performance incentives","Official National Social Security Fund (NSSF) coverage","Free meals during teaching shifts","Sponsored opportunities for advanced teacher training in Japan"]'),
('caregiving-specialist', 'Caregiving Specialist (介護)', 'អ្នកថែទាំមនុស្សចាស់', 'Osaka Healthcare Foundation', 'japan', 'Osaka / Kobe, Japan', '$1,500 - $2,000/mo', '$1,500 - $2,000 / month (¥230,000 - ¥360,000)', 'full time', 'overseas', 'lavender', 'Urgent', '29 Jan, 2026', 'caregiving', 'Provide compassionate elderly assistance, daily activity support, rehabilitation accompaniment, and health monitoring in modern, robot-assisted elderly care facilities.', '["JLPT N4 or JFT-Basic A2 + Nursing Care Japanese Evaluation test","Nursing Care Prometric Skills Test passed","Gentle, compassionate attitude and clean medical record","Completed 320 hours intensive training at HANABI Center or nursing background"]', '["Furnished private room in company dormitory (near subway)","Comprehensive Japanese Health & Pension coverage","Night shift allowance (¥8,000 extra per shift)","Pathway to Japanese National Care Worker License (Kaigofukushishi)"]'),
('food-processing', 'Food Manufacturing & Quality', 'ផលិតចំណីអាហារ', 'Hiroshima Seika Foods Corp.', 'japan', 'Hiroshima, Japan', '$1,400 - $1,750/mo', '$1,400 - $1,750 / month (¥210,000 - ¥265,000)', 'full time', 'overseas', 'blue', 'HACCP', '15 Aug, 2026', 'food', 'Operate automated packaging and quality control lines for Japanese bento, processed seafood, and bakery products under strict HACCP sanitary standards.', '["JLPT N4 / N5 minimum","Passed Food Manufacturing Skill Assessment","Good eyesight, color perception, and dexterity","Age 18 - 32"]', '["Subsidized staff cafeteria meals","Full social insurance and accident compensation","Free company transportation to facility","Overtime hours readily available"]'),
('hospitality-staff', 'Hotel & Hospitality Front Associate', 'បដិសណ្ឋារកិច្ច', 'Kyoto Heritage Ryokan Group', 'japan', 'Kyoto, Japan', '$1,650 - $2,100/mo', '$1,650 - $2,100 / month (¥250,000 - ¥320,000)', 'full time', 'overseas', 'pink', 'High Demand', '10 Sep, 2026', 'hospitality', 'Welcome international and Japanese guests, manage front desk check-in, assist with concierge service, and oversee guest satisfaction in prestigious hotels.', '["JLPT N3 or higher (or confident conversational fluency)","Passed Hospitality & Accommodation Skill Evaluation Test","Polite manners, professional grooming, and friendly hospitality mindset","Basic computer proficiency"]', '["Free accommodation within resort property","Staff meals included","Uniforms and laundering provided","Language skill bonus for multilingual"]'),
('heavy-machinery', 'Construction & Scaffolding', 'សំណង់ និងគ្រឿងចក្រ', 'Fukuoka Kenko Heavy Industries', 'japan', 'Fukuoka, Japan', '$1,700 - $2,300/mo', '$1,700 - $2,300 / month (¥260,000 - ¥350,000)', 'full time', 'overseas', 'gray', 'TITP / SSW', '25 Aug, 2026', 'construction', 'Assembly and erection of safety scaffolding, interior finishing, and assisted heavy machinery operation on major civil engineering infrastructure projects.', '["JLPT N4 or JFT-Basic A2","Construction Prometric Skill Assessment passed","Strong physical condition and stamina","Age 19 - 35, male"]', '["All safety gear, helmets, and work tools provided free","Dormitory with laundry facilities and Japanese bath","Full health insurance & Japanese workers accident insurance","Overtime available regularly with hazard compensation bonuses"]');

-- Insert default news
INSERT INTO news ("id", "title", "date", "category", "categoryLabel", "author", "readTime", "excerpt", "content") VALUES
('news-1', 'Batch 18 Departs for Kansai International Airport', '12 Sep, 2026', 'departures', 'Departures', 'Editorial Staff', '3 min read', 'SKMM Group and the Ministry of Labour successfully hosted the pre-departure sendoff ceremony for 24 Cambodian technical interns and SSW workers heading to Osaka and Kyoto medical facilities.', '<p>SKMM Investment Group, in close coordination with the Ministry of Labour and Vocational Training (MoLVT), successfully hosted the official pre-departure sendoff ceremony for 24 Cambodian technical interns and Specified Skilled Workers heading to Osaka and Kyoto.</p>'),
('news-2', 'Landmark MOU Signed with Tokyo Healthcare Alliance', '28 Aug, 2026', 'partnership', 'Partnership', 'PR Division', '2 min read', 'Strategic memorandum signed in Tokyo to train and deploy up to 100 Cambodian Certified Caregivers annually under the SSW 1 program.', '<p>A landmark Memorandum of Understanding (MOU) was signed between SKMM Investment Group and Tokyo Wellness & Medical Alliance in Tokyo. Under this agreement, SKMM will prepare and deploy up to 100 Certified Caregiving Specialists annually under the Specified Skilled Worker (SSW) visa program.</p>'),
('news-3', 'HANABI Center Students Achieve 94% Pass Rate in JLPT July 2026', '10 Aug, 2026', 'campus', 'Campus Life', 'Academic Dean', '2 min read', 'Official results released for July JLPT test: HANABI students set a record 94% pass rate across N5, N4, and N3 levels.', '<p>The official results for the July 2026 Japanese Language Proficiency Test (JLPT) were announced, with HANABI Training Center students recording an unprecedented 94% pass rate across N5, N4, and N3 levels.</p>'),
('news-4', 'Joint Interview Session with Ibaraki Agricultural Cooperative', '24 Jul, 2026', 'interviews', 'Interviews', 'Recruitment Team', '3 min read', 'Japanese employer delegation conducted two days of in-person technical interviews and tractor dexterity evaluations at SKMM campus.', '<p>Delegates from Ibaraki Agricultural Cooperative visited the SKMM Phnom Penh Headquarters for a two-day direct recruitment and practical evaluation session.</p>'),
('news-5', 'Annual Japanese Cultural Matsuri & Speech Contest 2026', '15 Jul, 2026', 'campus', 'Campus Life', 'Student Council', '2 min read', 'Over 250 trainees and guests joined the lively summer festival.', '<p>Over 250 trainees, senseis, and visiting Japanese partner delegates gathered at HANABI Center for the 2026 Summer Matsuri.</p>'),
('news-6', 'MoLVT Inspection Team Commends SKMM Campus Compliance', '02 Jun, 2026', 'partnership', 'Partnership', 'Legal Affairs', '2 min read', 'Senior officials from the Department of Employment and Manpower praised SKMM''s strict adherence to ethical recruitment and high safety standards.', '<p>Senior inspection delegates from the Department of Employment and Manpower of Cambodia conducted a comprehensive routine assessment of SKMM facilities.</p>');

-- Insert default candidates
INSERT INTO candidates ("id", "name", "initials", "gender", "level", "category", "sector", "age", "experience", "driving", "video", "status", "statusClass") VALUES
('SKMM-0821', 'Sokha M.', 'SM', 'female', 'N3', 'caregiving', 'Caregiving', '23 Years', '2 yrs Hospital Assistant', 'Yes (Car & Motorbike)', 'Recorded (Self-Intro)', 'Available', 'status-available'),
('SKMM-0822', 'Vireak K.', 'VK', 'male', 'N4', 'agriculture', 'Agriculture', '26 Years', '3 yrs Hydroponic Farm', 'Yes (Tractor / Auto)', 'Recorded (Farm skills)', 'Available', 'status-available'),
('SKMM-0823', 'Chanthy P.', 'CP', 'female', 'N4', 'food', 'Food Processing', '22 Years', '1 yr Food Packaging Line', 'No', 'Recorded (Hygiene test)', 'Interviewing', 'status-interviewing'),
('SKMM-0824', 'Dara T.', 'DT', 'male', 'N4', 'construction', 'Construction', '25 Years', '2 yrs Scaffolding / Civil', 'Yes (Forklift / Machinery)', 'Recorded (Safety drill)', 'Available', 'status-available'),
('SKMM-0825', 'Bopha L.', 'BL', 'female', 'N3', 'hospitality', 'Hospitality', '24 Years', '2 yrs Boutique Hotel Reception', 'No', 'Recorded (Customer Care)', 'Available', 'status-available'),
('SKMM-0826', 'Rithy S.', 'RS', 'male', 'N4', 'livestock', 'Livestock', '27 Years', '3 yrs Cattle & Poultry', 'Driver License Type B', 'Recorded (Practical)', 'Selected', 'status-selected');

-- Insert default schedules
INSERT INTO hanabi_schedules ("id", "courseName", "targetLevel", "duration", "schedule", "tuitionFee", "sponsorship") VALUES
('sched-1', 'Basic Foundation (N5)', 'Zero to JLPT N5', '3 Months (300 hrs)', 'Mon - Fri (8:00 - 16:30)', '$180 / course', 'Available'),
('sched-2', 'SSW JFT-Basic A2 Intensive', 'N5 to JFT-Basic A2', '3 Months (320 hrs)', 'Mon - Fri (8:00 - 17:00)', '$220 / course', 'Employer Sponsored'),
('sched-3', 'Intermediate Mastery (N4 - N3)', 'N4 to JLPT N3', '4 Months (400 hrs)', 'Mon - Fri (8:00 - 17:00)', '$250 / course', 'Partial Scholarship'),
('sched-4', 'Caregiving Specialized Japanese', 'Care Terminology & Skills', '2 Months (200 hrs)', 'Mon - Sat (8:00 - 16:30)', '$160 / course', '100% Sponsored for Matched Candidates');

-- Enable real-time
ALTER PUBLICATION supabase_realtime ADD TABLE jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE news;
ALTER PUBLICATION supabase_realtime ADD TABLE candidates;
ALTER PUBLICATION supabase_realtime ADD TABLE applications;
ALTER PUBLICATION supabase_realtime ADD TABLE interview_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE partner_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE contact_inquiries;
ALTER PUBLICATION supabase_realtime ADD TABLE hanabi_schedules;
ALTER PUBLICATION supabase_realtime ADD TABLE hanabi_enrollments;
