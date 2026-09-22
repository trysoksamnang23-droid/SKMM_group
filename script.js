/**
 * SKMM INVESTMENT GROUP - Interactive Website Engine & Admin System
 * Powers live searches, sidebar filters, interactive modals, form submissions,
 * and a full in-browser CRUD Admin Tool for Jobs and News with localStorage persistence.
 */

// --- 1. Default Data Stores ---
const DEFAULT_JOBS = [
    {
        id: 'agri-engineer',
        title: 'Senior Agricultural Engineer',
        titleKhmer: 'វិស្វករកសិកម្ម',
        company: 'SKMM Partner • Agri-Japan Co.',
        country: 'japan',
        city: 'Ibaraki / Tokyo, Japan',
        salary: '$1,800 - $2,400/mo',
        salaryDetail: '$1,800 - $2,400 / month (¥270,000 - ¥360,000)',
        schedule: 'full time',
        employmentType: 'overseas',
        theme: 'peach',
        statusBadge: 'SSW 1',
        date: '20 May, 2026',
        sector: 'agriculture',
        description: 'Lead modern greenhouse cultivation, automated hydroponic crop management, and drone irrigation monitoring for premium Japanese fruits and vegetables.',
        requirements: [
            'JLPT N4 or JFT-Basic A2 certificate required',
            'Agriculture Prometric Skill Assessment passed (or TITP 3-year completion)',
            'Bachelor or Associate degree in Agronomy/Agriculture or 2+ years field experience',
            'Strong physical health and high sense of responsibility'
        ],
        benefits: [
            'Dormitory subsidy (rent ¥15,000/mo includes Wi-Fi & utilities)',
            'Full Japanese Social & Health Insurance (Shakai Hoken)',
            'Annual return airfare bonus after 1st contract year',
            'Overtime pay at 1.25x standard hourly rate'
        ]
    },
    {
        id: 'japanese-instructor',
        title: 'Japanese Language Instructor',
        titleKhmer: 'គ្រូបង្រៀនភាសាជប៉ុន',
        company: 'HANABI Training Center',
        country: 'cambodia',
        city: 'Phnom Penh, Cambodia',
        salary: '$700 - $1,000/mo',
        salaryDetail: '$700 - $1,000 / month',
        schedule: 'full time',
        employmentType: 'full day',
        theme: 'mint',
        statusBadge: 'HANABI Center',
        date: '4 Feb, 2026',
        sector: 'education',
        description: 'Instruct Cambodian trainees and students from N5 to N3 level, focusing on practical conversation (Kaiwa), Japanese workplace culture (5S, Hou-Ren-So), and JLPT/JFT test preparation.',
        requirements: [
            'JLPT N2 or N1 certification',
            'Prior teaching experience or returnee from Japan TITP/Technical internship',
            'Passionate about education and mentoring young youth',
            'Fluency in Khmer and Japanese'
        ],
        benefits: [
            'Annual bonus & performance incentives',
            'Official National Social Security Fund (NSSF) coverage',
            'Free meals during teaching shifts',
            'Sponsored opportunities for advanced teacher training in Japan'
        ]
    },
    {
        id: 'caregiving-specialist',
        title: 'Caregiving Specialist (介護)',
        titleKhmer: 'អ្នកថែទាំមនុស្សចាស់',
        company: 'Osaka Healthcare Foundation',
        country: 'japan',
        city: 'Osaka / Kobe, Japan',
        salary: '$1,500 - $2,000/mo',
        salaryDetail: '$1,500 - $2,000 / month (¥230,000 - ¥300,000)',
        schedule: 'full time',
        employmentType: 'overseas',
        theme: 'lavender',
        statusBadge: 'Urgent',
        date: '29 Jan, 2026',
        sector: 'caregiving',
        description: 'Provide compassionate elderly assistance, daily activity support, rehabilitation accompaniment, and health monitoring in modern, robot-assisted elderly care facilities.',
        requirements: [
            'JLPT N4 or JFT-Basic A2 + Nursing Care Japanese Evaluation test',
            'Nursing Care Prometric Skills Test passed',
            'Gentle, compassionate attitude and clean medical record',
            'Completed 320 hours intensive training at HANABI Center or nursing background'
        ],
        benefits: [
            'Furnished private room in company dormitory (near subway)',
            'Comprehensive Japanese Health & Pension coverage',
            'Night shift allowance (¥8,000 extra per shift)',
            'Pathway to Japanese National Care Worker License (Kaigofukushishi)'
        ]
    },
    {
        id: 'food-processing',
        title: 'Food Manufacturing & Quality',
        titleKhmer: 'ផលិតចំណីអាហារ',
        company: 'Hiroshima Seika Foods Corp.',
        country: 'japan',
        city: 'Hiroshima, Japan',
        salary: '$1,400 - $1,750/mo',
        salaryDetail: '$1,400 - $1,750 / month (¥210,000 - ¥265,000)',
        schedule: 'full time',
        employmentType: 'overseas',
        theme: 'blue',
        statusBadge: 'HACCP',
        date: '15 Aug, 2026',
        sector: 'food',
        description: 'Operate automated packaging and quality control lines for Japanese bento, processed seafood, and bakery products under strict HACCP sanitary standards.',
        requirements: [
            'JLPT N4 / N5 minimum',
            'Passed Food Manufacturing Skill Assessment',
            'Good eyesight, color perception, and dexterity',
            'Age 18 - 32'
        ],
        benefits: [
            'Subsidized staff cafeteria meals',
            'Full social insurance and accident compensation',
            'Free company transportation to facility',
            'Overtime hours readily available'
        ]
    },
    {
        id: 'hospitality-staff',
        title: 'Hotel & Hospitality Front Associate',
        titleKhmer: 'បដិសណ្ឋារកិច្ច',
        company: 'Kyoto Heritage Ryokan Group',
        country: 'japan',
        city: 'Kyoto, Japan',
        salary: '$1,650 - $2,100/mo',
        salaryDetail: '$1,650 - $2,100 / month (¥250,000 - ¥320,000)',
        schedule: 'full time',
        employmentType: 'overseas',
        theme: 'pink',
        statusBadge: 'High Demand',
        date: '10 Sep, 2026',
        sector: 'hospitality',
        description: 'Welcome international and Japanese guests, manage front desk check-in, assist with concierge service, and oversee guest satisfaction in prestigious hotels.',
        requirements: [
            'JLPT N3 or higher (or confident conversational fluency)',
            'Passed Hospitality & Accommodation Skill Evaluation Test',
            'Polite manners, professional grooming, and friendly hospitality mindset',
            'Basic computer proficiency'
        ],
        benefits: [
            'Free accommodation within resort property',
            'Staff meals included',
            'Uniforms and laundering provided',
            'Language skill bonus for multilingual candidates'
        ]
    },
    {
        id: 'heavy-machinery',
        title: 'Construction & Scaffolding',
        titleKhmer: 'សំណង់ និងគ្រឿងចក្រ',
        company: 'Fukuoka Kenko Heavy Industries',
        country: 'japan',
        city: 'Fukuoka, Japan',
        salary: '$1,700 - $2,300/mo',
        salaryDetail: '$1,700 - $2,300 / month (¥260,000 - ¥350,000)',
        schedule: 'full time',
        employmentType: 'overseas',
        theme: 'gray',
        statusBadge: 'TITP / SSW',
        date: '25 Aug, 2026',
        sector: 'construction',
        description: 'Assembly and erection of safety scaffolding, interior finishing, and assisted heavy machinery operation on major civil engineering infrastructure projects.',
        requirements: [
            'JLPT N4 or JFT-Basic A2',
            'Construction Prometric Skill Assessment passed',
            'Strong physical condition and stamina',
            'Age 19 - 35, male'
        ],
        benefits: [
            'All safety gear, helmets, and work tools provided free',
            'Dormitory with laundry facilities and Japanese bath',
            'Full health insurance & Japanese workers accident insurance',
            'Overtime available regularly with hazard compensation bonuses'
        ]
    }
];

const DEFAULT_NEWS = [
    {
        id: 'news-1',
        title: 'Batch 18 Departs for Kansai International Airport — ពិធីជូនដំណើរកម្មសិក្សាការីជំនាន់ទី១៨',
        date: '12 Sep, 2026',
        category: 'departures',
        categoryLabel: 'Departures',
        author: 'Editorial Staff',
        readTime: '3 min read',
        excerpt: 'SKMM Group and the Ministry of Labour successfully hosted the pre-departure sendoff ceremony for 24 Cambodian technical interns and SSW workers heading to Osaka and Kyoto medical facilities.',
        content: `
            <p>SKMM Investment Group, in close coordination with the Ministry of Labour and Vocational Training (MoLVT), successfully hosted the official pre-departure sendoff ceremony for 24 Cambodian technical interns and Specified Skilled Workers heading to Osaka and Kyoto.</p>
            <br>
            <p>All 24 candidates completed 6 months of intensive Japanese language immersion and cultural acclimatization at HANABI Center, achieving JLPT N4 and JFT-Basic A2 credentials. The candidates are placed in nursing care and precision agriculture sectors.</p>
            <br>
            <p>CEO of SKMM Group delivered an encouraging speech reminding candidates to maintain high work ethics, embrace Japanese craftsmanship, and make Cambodia proud.</p>
        `
    },
    {
        id: 'news-2',
        title: 'Landmark MOU Signed with Tokyo Healthcare Alliance — ការចុះកិច្ចព្រមព្រៀងសហប្រតិបត្តិការ',
        date: '28 Aug, 2026',
        category: 'partnership',
        categoryLabel: 'Partnership',
        author: 'PR Division',
        readTime: '2 min read',
        excerpt: 'Strategic memorandum signed in Tokyo to train and deploy up to 100 Cambodian Certified Caregivers annually under the Specified Skilled Worker (SSW 1) program with full Japanese scholarships.',
        content: `
            <p>A landmark Memorandum of Understanding (MOU) was signed between SKMM Investment Group and Tokyo Wellness & Medical Alliance in Tokyo. Under this agreement, SKMM will prepare and deploy up to 100 Certified Caregiving Specialists annually under the Specified Skilled Worker (SSW) visa program.</p>
            <br>
            <p>The program includes sponsored scholarships for advanced nursing Japanese and guaranteed subsidized accommodation upon arrival in Japan.</p>
        `
    },
    {
        id: 'news-3',
        title: 'HANABI Center Students Achieve 94% Pass Rate in JLPT July 2026 — លទ្ធផលប្រឡងភាសាជប៉ុន',
        date: '10 Aug, 2026',
        category: 'campus',
        categoryLabel: 'Campus Life',
        author: 'Academic Dean',
        readTime: '2 min read',
        excerpt: 'Official results released for July JLPT test: HANABI students set a record 94% pass rate across N5, N4, and N3 levels, with 18 candidates earning N3 diplomas in just 8 months.',
        content: `
            <p>The official results for the July 2026 Japanese Language Proficiency Test (JLPT) were announced, with HANABI Training Center students recording an unprecedented 94% pass rate across N5, N4, and N3 levels.</p>
            <br>
            <p>18 candidates achieved N3 certification within their first 8 months of study, qualifying them for higher managerial and supervisory roles in Japanese corporations.</p>
        `
    },
    {
        id: 'news-4',
        title: 'Joint Interview Session with Ibaraki Agricultural Cooperative — សម្ភាសន៍ផ្ទាល់ជាមួយក្រុមហ៊ុនជប៉ុន',
        date: '24 Jul, 2026',
        category: 'interviews',
        categoryLabel: 'Interviews',
        author: 'Recruitment Team',
        readTime: '3 min read',
        excerpt: 'Japanese employer delegation conducted two days of in-person technical interviews and tractor dexterity evaluations at SKMM campus, selecting 28 skilled agricultural candidates.',
        content: `
            <p>Delegates from Ibaraki Agricultural Cooperative visited the SKMM Phnom Penh Headquarters for a two-day direct recruitment and practical evaluation session.</p>
            <br>
            <p>35 candidates participated in live tractor handling, soil preparation assessments, and formal Japanese interviews. 28 candidates were officially selected on the spot.</p>
        `
    },
    {
        id: 'news-5',
        title: 'Annual Japanese Cultural Matsuri & Speech Contest 2026 — ទិវាវប្បធម៌ជប៉ុន និងការប្រកួតសុន្ទរកថា',
        date: '15 Jul, 2026',
        category: 'campus',
        categoryLabel: 'Campus Life',
        author: 'Student Council',
        readTime: '2 min read',
        excerpt: 'Over 250 trainees and guests joined the lively summer Tanabata festival featuring traditional Yukata dress, Japanese Taiko drumming, and inspiring Japanese speech competitions.',
        content: `
            <p>Over 250 trainees, senseis, and visiting Japanese partner delegates gathered at HANABI Center for the 2026 Summer Matsuri. The event featured traditional Yukata dress workshops, Taiko drumming, and an inspiring speech competition won by Ms. Sokha on her aspirations to support elderly care in Kobe.</p>
        `
    },
    {
        id: 'news-6',
        title: 'MoLVT Inspection Team Commends SKMM Campus Compliance — គណៈប្រតិភូក្រសួងការងារចុះត្រួតពិនិត្យ',
        date: '02 Jun, 2026',
        category: 'partnership',
        categoryLabel: 'Partnership',
        author: 'Legal Affairs',
        readTime: '2 min read',
        excerpt: 'Senior officials from the Department of Employment and Manpower praised SKMM\'s strict adherence to ethical recruitment, dormitory sanitation, and high safety standards.',
        content: `
            <p>Senior inspection delegates from the Department of Employment and Manpower of Cambodia conducted a comprehensive routine assessment of SKMM facilities. The delegation awarded high commendations for dormitory cleanliness, zero broker fees, transparent candidate accounts, and professional caregiving simulation laboratories.</p>
        `
    }
];

// --- 2b. Default Candidates ---
const DEFAULT_CANDIDATES = [
    {
        id: 'SKMM-0821',
        name: 'Sokha M.',
        initials: 'SM',
        gender: 'female',
        level: 'N3',
        category: 'caregiving',
        sector: 'Caregiving (介護)',
        age: '23 Years',
        experience: '2 yrs Hospital Assistant',
        driving: 'Yes (Car & Motorbike)',
        video: 'Recorded (Self-Intro)',
        status: 'Available',
        statusClass: 'status-available'
    },
    {
        id: 'SKMM-0822',
        name: 'Vireak K.',
        initials: 'VK',
        gender: 'male',
        level: 'N4',
        category: 'agriculture',
        sector: 'Agriculture (農業)',
        age: '26 Years',
        experience: '3 yrs Hydroponic Farm',
        driving: 'Yes (Tractor / Auto)',
        video: 'Recorded (Farm skills)',
        status: 'Available',
        statusClass: 'status-available'
    },
    {
        id: 'SKMM-0823',
        name: 'Chanthy P.',
        initials: 'CP',
        gender: 'female',
        level: 'N4',
        category: 'food',
        sector: 'Food Processing (飲食料品)',
        age: '22 Years',
        experience: '1 yr Food Packaging Line',
        driving: 'No',
        video: 'Recorded (Hygiene test)',
        status: 'Interviewing',
        statusClass: 'status-interviewing'
    },
    {
        id: 'SKMM-0824',
        name: 'Dara T.',
        initials: 'DT',
        gender: 'male',
        level: 'N4',
        category: 'construction',
        sector: 'Construction (建設)',
        age: '25 Years',
        experience: '2 yrs Scaffolding / Civil',
        driving: 'Yes (Forklift / Machinery)',
        video: 'Recorded (Safety drill)',
        status: 'Available',
        statusClass: 'status-available'
    },
    {
        id: 'SKMM-0825',
        name: 'Bopha L.',
        initials: 'BL',
        gender: 'female',
        level: 'N3',
        category: 'hospitality',
        sector: 'Hospitality (宿泊・ホテル)',
        age: '24 Years',
        experience: '2 yrs Boutique Hotel Reception',
        driving: 'No',
        video: 'Recorded (Customer Care)',
        status: 'Available',
        statusClass: 'status-available'
    },
    {
        id: 'SKMM-0826',
        name: 'Rithy S.',
        initials: 'RS',
        gender: 'male',
        level: 'N4',
        category: 'livestock',
        sector: 'Livestock Farming (畜産)',
        age: '27 Years',
        experience: '3 yrs Cattle & Poultry',
        driving: 'Driver License Type B',
        video: 'Recorded (Practical)',
        status: 'Selected',
        statusClass: 'status-selected'
    }
];

// --- 2c. Candidate Store Helpers (localStorage) ---
function getCandidates() {
    try {
        const stored = localStorage.getItem('skmm_candidates');
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error('Error reading candidates', e);
    }
    saveCandidates(DEFAULT_CANDIDATES);
    return DEFAULT_CANDIDATES;
}

function saveCandidates(candidates) {
    try {
        localStorage.setItem('skmm_candidates', JSON.stringify(candidates));
    } catch (e) {
        console.error('Error saving candidates', e);
    }
}

function renderCandidates() {
    const candidateList = document.getElementById('candidate-list');
    if (!candidateList) return;

    const candidates = getCandidates();
    candidateList.innerHTML = '';

    candidates.forEach(c => {
        const card = document.createElement('div');
        card.className = 'candidate-card candidate-card-item';
        card.setAttribute('data-gender', c.gender || 'unknown');
        card.setAttribute('data-level', (c.level || '').toLowerCase());
        card.setAttribute('data-category', c.category || 'general');

        const statusMap = {
            'Available': 'status-available',
            'Interviewing': 'status-interviewing',
            'Selected': 'status-selected'
        };
        const badgeClass = statusMap[c.status] || 'status-available';

        card.innerHTML = `
            <div>
                <div class="candidate-header">
                    <div class="candidate-avatar" style="background: linear-gradient(135deg, #0284c7, #38bdf8);">${c.initials || '??'}</div>
                    <div>
                        <h3 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 2px;">${c.name || 'Unknown'}</h3>
                        <span class="status-badge ${badgeClass}">${c.status || 'Available'}</span>
                        <span class="text-muted" style="margin-left: 6px; font-weight: 600;">#${c.id || 'N/A'}</span>
                    </div>
                </div>
                <ul class="candidate-specs">
                    <li><span>Sector:</span> <strong>${c.sector || 'N/A'}</strong></li>
                    <li><span>Age / Gender:</span> <strong>${c.age || 'N/A'}</strong></li>
                    <li><span>Japanese:</span> <strong style="color: #0284c7;">${c.level ? 'JLPT ' + c.level : 'N/A'}</strong></li>
                    <li><span>Experience:</span> <strong>${c.experience || 'N/A'}</strong></li>
                    <li><span>Driving License:</span> <strong>${c.driving || 'N/A'}</strong></li>
                    <li><span>Video Intro:</span> <strong style="color: #10b981;">${c.video || 'N/A'}</strong></li>
                </ul>
            </div>
            <button onclick="requestInterview('${c.id}')" class="btn" style="width: 100%; text-align: center;">Request Interview (ស្នើសុំសម្ភាសន៍)</button>
        `;
        candidateList.appendChild(card);
    });
}

// --- 2d. Data Store Helpers (localStorage) ---
function getJobs() {
    try {
        const stored = localStorage.getItem('skmm_jobs');
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error('Error reading jobs from localStorage', e);
    }
    saveJobs(DEFAULT_JOBS);
    return DEFAULT_JOBS;
}

function saveJobs(jobs) {
    try {
        localStorage.setItem('skmm_jobs', JSON.stringify(jobs));
    } catch (e) {
        console.error('Error saving jobs to localStorage', e);
    }
}

function getNews() {
    try {
        const stored = localStorage.getItem('skmm_news');
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error('Error reading news from localStorage', e);
    }
    saveNews(DEFAULT_NEWS);
    return DEFAULT_NEWS;
}

function saveNews(newsList) {
    try {
        localStorage.setItem('skmm_news', JSON.stringify(newsList));
    } catch (e) {
        console.error('Error saving news to localStorage', e);
    }
}

// --- 3. Toast Notification System ---
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'info' ? 'toast-info' : type === 'warning' ? 'toast-warning' : ''}`;
    
    let icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'info') icon = 'ℹ';
    if (type === 'warning') icon = '⚠';

    toast.innerHTML = `<span style="font-weight:bold; font-size:1.1rem;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// --- 4. Modal System ---
function openModal(title, contentHtml) {
    let modal = document.getElementById('global-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'global-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-box">
                <button class="modal-close-btn" onclick="closeModal()">&times;</button>
                <h3 id="modal-title" style="margin-bottom: 1rem; color: #0f172a; font-size: 1.35rem;"></h3>
                <div id="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = contentHtml;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('global-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// --- 5. Job Details Modal Launcher ---
function viewJobDetails(jobId) {
    const jobs = getJobs();
    const job = jobs.find(j => j.id === jobId);
    if (!job) {
        showToast('Job details not found', 'error');
        return;
    }

    const html = `
        <div style="margin-bottom: 1.25rem;">
            <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 4px;">${job.company}</p>
            <p style="font-size: 1.15rem; font-weight: 700; color: #0284c7; margin-bottom: 8px;">${job.salaryDetail || job.salary}</p>
            <div class="tags-group" style="margin-bottom: 1rem;">
                <span class="pill-tag">📍 ${job.city || job.location}</span>
                <span class="pill-tag">⏰ ${job.schedule}</span>
                <span class="pill-tag">📅 ${job.date}</span>
                <span class="pill-tag">🏷️ ${job.statusBadge || 'Open'}</span>
            </div>
            <p style="color: #334155; line-height: 1.6; margin-bottom: 1rem;">${job.description}</p>
        </div>

        <div style="margin-bottom: 1rem;">
            <h4 style="color: #0f172a; margin-bottom: 0.5rem;">Requirements (លក្ខខណ្ឌតម្រូវ)</h4>
            <ul style="padding-left: 1.25rem; color: #475569; font-size: 0.875rem; line-height: 1.6;">
                ${(job.requirements || []).map(r => `<li>${r}</li>`).join('')}
            </ul>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #0f172a; margin-bottom: 0.5rem;">Benefits & Welfare (អត្ថប្រយោជន៍)</h4>
            <ul style="padding-left: 1.25rem; color: #475569; font-size: 0.875rem; line-height: 1.6;">
                ${(job.benefits || []).map(b => `<li>${b}</li>`).join('')}
            </ul>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end; border-top: 1px solid #f1f5f9; padding-top: 1rem;">
            <button class="btn-outline" onclick="closeModal()">Close</button>
            <button class="btn" onclick="applyForJob('${job.title.replace(/'/g, "\\'")}')">Apply Now (ដាក់ពាក្យ)</button>
        </div>
    `;

    openModal(job.title, html);
}

function applyForJob(jobTitle) {
    closeModal();
    const jobSelect = document.getElementById('application-job-select');
    const appForm = document.getElementById('application-form-section');
    if (jobSelect && appForm) {
        jobSelect.value = jobTitle;
        appForm.scrollIntoView({ behavior: 'smooth' });
        showToast(`Selected "${jobTitle}". Please complete your details below.`);
    } else {
        openApplicationModal(jobTitle);
    }
}

function openApplicationModal(jobTitle = '') {
    const html = `
        <form onsubmit="handleQuickApplication(event)">
            <div class="form-group">
                <label>Applied Position — តំណែងការងារ</label>
                <input type="text" id="modal-app-position" value="${jobTitle || 'General Application'}" required readonly style="background:#f1f5f9;">
            </div>
            <div class="form-group">
                <label>Full Name — ឈ្មោះពេញ</label>
                <input type="text" id="modal-app-name" placeholder="e.g. Chan Sokha" required>
            </div>
            <div class="grid-2">
                <div class="form-group">
                    <label>Phone / Telegram — លេខទូរសព្ទ</label>
                    <input type="tel" id="modal-app-phone" placeholder="012 345 678" required>
                </div>
                <div class="form-group">
                    <label>Current Location — ទីតាំងបច្ចុប្បន្ន</label>
                    <select id="modal-app-loc">
                        <option value="Phnom Penh">Phnom Penh, Cambodia</option>
                        <option value="Province">Cambodia Province</option>
                        <option value="Japan">Currently in Japan</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Japanese Language Level — កម្រិតភាសាជប៉ុន</label>
                <select id="modal-app-lang">
                    <option value="No Japanese">No Japanese (Will train at HANABI)</option>
                    <option value="N5">JLPT N5 (Basic)</option>
                    <option value="N4">JLPT N4 / JFT-Basic A2</option>
                    <option value="N3">JLPT N3 (Conversational)</option>
                    <option value="N2">JLPT N2 or higher</option>
                </select>
            </div>
            <div class="form-group">
                <label>Work Experience & Skills — បទពិសោធន៍ការងារ និងជំនាញ</label>
                <textarea id="modal-app-experience" rows="3" placeholder="Briefly describe your prior work experience, vocational training, or skills..."></textarea>
            </div>
            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 1.5rem;">
                <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn">Submit Application</button>
            </div>
        </form>
    `;
    openModal('Apply for Position — ការដាក់ពាក្យ', html);
}

function handleQuickApplication(e) {
    e.preventDefault();
    const name = document.getElementById('modal-app-name').value;
    const phone = document.getElementById('modal-app-phone').value;
    const pos = document.getElementById('modal-app-position').value;
    const location = document.getElementById('modal-app-loc').value;
    const japaneseLevel = document.getElementById('modal-app-lang').value;
    const experience = document.getElementById('modal-app-experience').value;

    const appData = {
        id: 'app-' + Date.now(),
        name: name,
        phone: phone,
        jobPosition: pos,
        dob: '',
        location: location,
        japaneseLevel: japaneseLevel,
        experience: experience,
        appliedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    try { window.saveApplications([appData].concat(window.getApplications())); } catch(err) { console.log('[SKMM] Supabase save deferred:', err.message); }

    closeModal();
    showToast(`Thank you, ${name}! Your application for "${pos}" has been received. Admin can review in Applications tab.`, 'success');
}

// --- 6. Candidate Modal & Interview Request ---
const CANDIDATE_DETAILS = {
    'SKMM-0821': {
        id: 'SKMM-0821',
        name: 'Sokha M.',
        sector: 'Caregiving (介護)',
        level: 'N3'
    },
    'SKMM-0822': {
        id: 'SKMM-0822',
        name: 'Vireak K.',
        sector: 'Agriculture (農業)',
        level: 'N4'
    },
    'SKMM-0823': {
        id: 'SKMM-0823',
        name: 'Chanthy P.',
        sector: 'Food Processing (飲食料品)',
        level: 'N4'
    },
    'SKMM-0824': {
        id: 'SKMM-0824',
        name: 'Dara T.',
        sector: 'Construction (建設)',
        level: 'N4'
    },
    'SKMM-0825': {
        id: 'SKMM-0825',
        name: 'Bopha L.',
        sector: 'Hospitality (宿泊)',
        level: 'N3'
    },
    'SKMM-0826': {
        id: 'SKMM-0826',
        name: 'Rithy S.',
        sector: 'Livestock Farming (畜産)',
        level: 'N4'
    }
};

function requestInterview(candidateId) {
    const c = CANDIDATE_DETAILS[candidateId] || {
        id: candidateId,
        sector: 'Specified Skill Worker',
        level: 'Japanese N4/N3'
    };

    const html = `
        <form onsubmit="handleInterviewBooking(event, '${candidateId}')">
            <div class="notice-box" style="margin-top: 0;">
                <strong>Candidate:</strong> ${c.id} (${c.sector} • ${c.level})
            </div>
            <div class="form-group">
                <label>Company / Organization Name</label>
                <input type="text" id="interview-company" placeholder="e.g. Tokyo Care Service Corp." required>
            </div>
            <div class="form-group">
                <label>Representative Name & Title</label>
                <input type="text" id="interview-rep" placeholder="e.g. Kenji Tanaka (HR Director)" required>
            </div>
            <div class="grid-2">
                <div class="form-group">
                    <label>Work Email</label>
                    <input type="email" id="interview-email" placeholder="tanaka@company.co.jp" required>
                </div>
                <div class="form-group">
                    <label>Preferred Interview Tool</label>
                    <select id="interview-tool">
                        <option value="Zoom">Zoom Online Video</option>
                        <option value="Google Meet">Google Meet</option>
                        <option value="Teams">Microsoft Teams</option>
                        <option value="Phnom Penh In-person">In-person in Phnom Penh</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Preferred Date & Time (Japan Time)</label>
                <input type="datetime-local" id="interview-datetime" required>
            </div>
            <div class="form-group">
                <label>Special Requests / Job Description Notes</label>
                <textarea rows="3" id="interview-notes" placeholder="Specify any technical assessment requirements or questions..."></textarea>
            </div>
            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 1rem;">
                <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn">Confirm Interview Request</button>
            </div>
        </form>
    `;

    openModal(`Request Interview: Candidate ${candidateId}`, html);
}

function handleInterviewBooking(e, candidateId) {
    e.preventDefault();
    const company = document.getElementById('interview-company').value;
    const rep = document.getElementById('interview-rep').value;
    const email = document.getElementById('interview-email').value;
    const tool = document.getElementById('interview-tool').value;
    const datetime = document.getElementById('interview-datetime').value;
    const notes = document.getElementById('interview-notes').value;

    const request = {
        id: 'int-' + Date.now(),
        candidateName: candidateId,
        company: company,
        representative: rep,
        email: email,
        tool: tool,
        datetime: datetime,
        notes: notes,
        status: 'Pending',
        submittedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    try { window.saveInterviewRequests([request].concat(window.getInterviewRequests())); } catch(err) { console.log('[SKMM] Supabase save deferred:', err.message); }

    closeModal();
    showToast(`Interview requested by ${company} for ${candidateId}! Admin can review in Interview Requests tab.`, 'success');
}

// --- 7. Partner Modals (Download & Meeting) ---
function downloadCompanyProfile() {
    showToast('Downloading SKMM Group Official Company Profile (PDF)...', 'info');
    setTimeout(() => {
        const blob = new Blob([
            "SKMM INVESTMENT GROUP CO., LTD.\nOfficial Company Profile & Partner Guide 2026\n\nMinistry of Labour & Vocational Training License\nHANABI Japanese Language Center\nSending Technical Interns and Specified Skilled Workers (SSW) to Japan.\nWebsite: https://skmmgroup.com\nEmail: contact@skmmgroup.com\nTel: +855 (0)23 998 812"
        ], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'SKMM_Company_Profile_2026.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showToast('SKMM Company Profile downloaded successfully!');
    }, 800);
}

function bookPartnerMeeting() {
    const html = `
        <form onsubmit="handlePartnerMeeting(event)">
            <p style="color: #475569; font-size: 0.9rem; margin-bottom: 1rem;">
                Schedule a direct consultation with our International Relations Director in Tokyo or Phnom Penh.
            </p>
            <div class="form-group">
                <label>Japanese Company / Supervising Organization (監理団体・登録支援機関)</label>
                <input type="text" id="partner-company" placeholder="e.g. Kanto Cooperative Union" required>
            </div>
            <div class="grid-2">
                <div class="form-group">
                    <label>Contact Person Name</label>
                    <input type="text" id="partner-name" placeholder="e.g. Mr. Sato" required>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" id="partner-email" placeholder="sato@union.or.jp" required>
                </div>
            </div>
            <div class="form-group">
                <label>Industry of Interest (業種)</label>
                <select id="partner-industry">
                    <option value="Agriculture">Agriculture & Greenhouse (農業)</option>
                    <option value="Caregiving">Nursing Care (介護)</option>
                    <option value="Food Processing">Food Manufacturing (飲食料品製造業)</option>
                    <option value="Hospitality">Accommodation & Hospitality (宿泊業)</option>
                    <option value="Construction">Construction & Civil (建設業)</option>
                    <option value="Automobile">Automobile Repair & Logistics (自動車整備・物流)</option>
                </select>
            </div>
            <div class="form-group">
                <label>Estimated Number of Trainees / Workers Needed</label>
                <input type="text" id="partner-volume" placeholder="e.g. 5-10 workers by Autumn 2026">
            </div>
            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 1.25rem;">
                <button type="button" class="btn-outline" onclick="closeModal()">Close</button>
                <button type="submit" class="btn">Book Online Meeting</button>
            </div>
        </form>
    `;
    openModal('Book an Online Meeting with SKMM Directors', html);
}

function handlePartnerMeeting(e) {
    e.preventDefault();
    const company = document.getElementById('partner-company').value;
    const name = document.getElementById('partner-name').value;
    const email = document.getElementById('partner-email').value;
    const industry = document.getElementById('partner-industry').value;
    const volume = document.getElementById('partner-volume').value;

    const request = {
        id: 'ptr-' + Date.now(),
        company: company,
        contactName: name,
        email: email,
        industry: industry,
        volume: volume,
        status: 'Pending',
        submittedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    try { window.savePartnerRequests([request].concat(window.getPartnerRequests())); } catch(err) { console.log('[SKMM] Supabase save deferred:', err.message); }

    closeModal();
    showToast(`Consultation booked for ${company}! Admin can review in Partner Consultations tab.`, 'success');
}

// --- 8. News Article Reader Modal ---
function readNewsArticle(articleId) {
    const newsList = getNews();
    const article = newsList.find(n => n.id === articleId);
    if (!article) {
        showToast('Article not found', 'error');
        return;
    }
    const html = `
        <div style="margin-bottom: 1rem;">
            <span class="pill-tag" style="background:#e0f2fe; color:#0284c7; font-weight:600;">${article.categoryLabel || article.category}</span>
            <span style="font-size:0.85rem; color:#64748b; margin-left: 10px;">📅 ${article.date}</span>
            <span style="font-size:0.85rem; color:#64748b; margin-left: 10px;">✍️ ${article.author || 'Editorial'}</span>
        </div>
        <div style="color:#334155; line-height: 1.7; font-size: 0.95rem;">
            ${article.content}
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem; border-top: 1px solid #f1f5f9; padding-top: 1rem;">
            <button class="btn" onclick="closeModal()">Close</button>
        </div>
    `;
    openModal(article.title, html);
}

// --- 9. Dynamic Renderers: Home, Jobs, News ---
function renderHomeJobs() {
    const grid = document.getElementById('home-job-grid');
    if (!grid) return;

    const jobs = getJobs();
    grid.innerHTML = '';

    jobs.forEach(job => {
        const card = document.createElement('div');
        card.className = `job-card ${job.theme || 'peach'}`;
        card.setAttribute('data-location', job.country || 'japan');
        card.setAttribute('data-schedule', job.schedule || 'full time');
        card.setAttribute('data-type', job.employmentType || 'overseas');

        card.innerHTML = `
            <div class="card-top">
                <span class="date-tag">${job.date}</span>
                <span class="status-badge status-available">${job.statusBadge || 'Open'}</span>
            </div>
            <div>
                <p class="company-name">${job.company}</p>
                <h3 class="job-title">${job.title}</h3>
                <div class="tags-group">
                    <span class="pill-tag">${job.schedule}</span>
                    <span class="pill-tag">${job.sector || 'General'}</span>
                    <span class="pill-tag">${job.country === 'cambodia' ? 'Cambodia' : 'Japan'}</span>
                </div>
            </div>
            <div class="card-bottom">
                <div>
                    <p class="salary-text">${job.salary}</p>
                    <p class="location-text">${job.city}</p>
                </div>
                <button onclick="viewJobDetails('${job.id}')" class="btn-details">Details</button>
            </div>
        `;
        grid.appendChild(card);
    });

    const badge = document.querySelector('.badge-count');
    if (badge) badge.textContent = `${jobs.length} found`;
}

function renderJobPage() {
    const overseasContainer = document.getElementById('overseas-jobs-container');
    const domesticContainer = document.getElementById('domestic-jobs-container');
    const jobSelect = document.getElementById('application-job-select');

    if (!overseasContainer && !domesticContainer) return;

    const jobs = getJobs();

    if (overseasContainer) overseasContainer.innerHTML = '';
    if (domesticContainer) domesticContainer.innerHTML = '';
    if (jobSelect) {
        jobSelect.innerHTML = '<option value="">-- Select Job Position --</option>';
    }

    jobs.forEach(job => {
        // Populate select option
        if (jobSelect) {
            const opt = document.createElement('option');
            opt.value = job.title;
            opt.textContent = `${job.title} (${job.city})`;
            jobSelect.appendChild(opt);
        }

        const isOverseas = (job.country !== 'cambodia');
        const targetContainer = isOverseas ? overseasContainer : domesticContainer;
        if (!targetContainer) return;

        const item = document.createElement('div');
        item.style.cssText = 'border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; background: #fff;';
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
                <div>
                    <span class="status-badge status-available">${job.statusBadge || 'Open'}</span>
                    <h3 style="margin-top: 6px; font-size: 1.1rem; color: #0f172a;">${job.title}</h3>
                    <p style="font-size: 0.85rem; color: #64748b;">${job.company} • ${job.city}</p>
                </div>
                <span style="font-size: 1rem; font-weight: 700; color: #0284c7;">${job.salary}</span>
            </div>
            <div class="tags-group" style="margin: 8px 0;">
                <span class="pill-tag">${job.schedule}</span>
                <span class="pill-tag">${job.sector || 'General'}</span>
                <span class="pill-tag">${job.city}</span>
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px;">
                <button onclick="viewJobDetails('${job.id}')" class="btn-outline">Details</button>
                <button onclick="applyForJob('${job.title.replace(/'/g, "\\'")}')" class="btn">Apply</button>
            </div>
        `;
        targetContainer.appendChild(item);
    });
}

function renderNewsPage() {
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;

    const newsList = getNews();
    newsGrid.innerHTML = '';

    newsList.forEach(item => {
        let tagBg = '#e0f2fe';
        let tagCol = '#0284c7';
        if (item.category === 'partnership') { tagBg = '#dcfce7'; tagCol = '#15803d'; }
        if (item.category === 'campus') { tagBg = '#ede9fe'; tagCol = '#6d28d9'; }
        if (item.category === 'interviews') { tagBg = '#fef3c7'; tagCol = '#b45309'; }

        const art = document.createElement('article');
        art.className = 'section-block news-card-item';
        art.setAttribute('data-category', item.category);
        art.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span class="pill-tag" style="background: ${tagBg}; color: ${tagCol}; font-weight: 700;">${item.categoryLabel || item.category}</span>
                <span style="font-size: 0.8rem; color: #64748b;">${item.date}</span>
            </div>
            <h3 style="font-size: 1.15rem; color: #0f172a; margin-top: 0; line-height: 1.4;">
                ${item.title}
            </h3>
            <p style="color: #475569; font-size: 0.875rem; line-height: 1.6; margin-bottom: 1rem;">
                ${item.excerpt}
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="text-muted">By ${item.author || 'Editorial'} • ${item.readTime || '3 min read'}</span>
                <button onclick="readNewsArticle('${item.id}')" class="btn-outline">Read Full Story</button>
            </div>
        `;
        newsGrid.appendChild(art);
    });
}

// --- 10. Live Job Search & Filter Controller ---
function initJobFilter() {
    const searchInput = document.querySelector('.search-header-bar input');
    const locationSelect = document.querySelector('.search-header-bar select');
    const checkboxes = document.querySelectorAll('.sidebar input[type="checkbox"]');
    const jobCards = document.querySelectorAll('.job-grid .job-card');
    const badgeCount = document.querySelector('.badge-count');

    if (!jobCards.length) return;

    function applyFilter() {
        const query = (searchInput ? searchInput.value.toLowerCase().trim() : '');
        const loc = (locationSelect ? locationSelect.value.toLowerCase() : '');

        const checkedSchedules = [];
        const checkedTypes = [];
        checkboxes.forEach(cb => {
            if (cb.checked) {
                const label = cb.parentElement.textContent.trim().toLowerCase();
                if (label.includes('full time')) checkedSchedules.push('full time');
                if (label.includes('part time')) checkedSchedules.push('part time');
                if (label.includes('internship')) checkedSchedules.push('internship');
                if (label.includes('project')) checkedSchedules.push('project');

                if (label.includes('full day')) checkedTypes.push('full day');
                if (label.includes('flexible')) checkedTypes.push('flexible');
                if (label.includes('overseas')) checkedTypes.push('overseas');
            }
        });

        let visibleCount = 0;

        jobCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const cardLocation = card.getAttribute('data-location') || cardText;
            const cardSchedule = card.getAttribute('data-schedule') || cardText;
            const cardType = card.getAttribute('data-type') || cardText;

            let matchesQuery = !query || cardText.includes(query);
            let matchesLocation = !loc || cardLocation.includes(loc);
            let matchesSchedule = checkedSchedules.length === 0 || checkedSchedules.some(s => cardSchedule.includes(s));
            let matchesType = checkedTypes.length === 0 || checkedTypes.some(t => cardType.includes(t));

            if (matchesQuery && matchesLocation && matchesSchedule && matchesType) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (badgeCount) {
            badgeCount.textContent = `${visibleCount} found`;
        }
    }

    if (searchInput) searchInput.addEventListener('input', applyFilter);
    if (locationSelect) locationSelect.addEventListener('change', applyFilter);
    checkboxes.forEach(cb => cb.addEventListener('change', applyFilter));
}

// --- 11. Candidate Search Controller ---
function initCandidateFilter() {
    const form = document.querySelector('#candidate-filter-form');
    const cards = document.querySelectorAll('.candidate-card-item');
    if (!form || !cards.length) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const gender = (document.getElementById('filter-gender')?.value || '').toLowerCase();
        const level = (document.getElementById('filter-level')?.value || '').toLowerCase();
        const category = (document.getElementById('filter-category')?.value || '').toLowerCase();
        const query = (document.getElementById('filter-keyword')?.value || '').toLowerCase();

        let count = 0;
        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const cardGender = (card.getAttribute('data-gender') || '').toLowerCase();
            const cardLevel = (card.getAttribute('data-level') || '').toLowerCase();
            const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();

            let matchGender = !gender || gender === 'all' || cardGender === gender;
            let matchLevel = !level || level === 'all' || cardLevel === level;
            let matchCategory = !category || category === 'all' || cardCategory.includes(category);
            let matchQuery = !query || cardText.includes(query);

            if (matchGender && matchLevel && matchCategory && matchQuery) {
                card.style.display = 'flex';
                count++;
            } else {
                card.style.display = 'none';
            }
        });

        showToast(`Filtered candidates: ${count} matching profile(s) found.`, 'info');
    });
}

// --- 12. News Category Tab Controller ---
function initNewsTabs() {
    const tabs = document.querySelectorAll('.news-tab-btn');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');
            const articles = document.querySelectorAll('.news-card-item');
            articles.forEach(art => {
                const artCat = art.getAttribute('data-category');
                if (category === 'all' || artCat === category) {
                    art.style.display = 'block';
                } else {
                    art.style.display = 'none';
                }
            });
        });
    });
}

// --- 13. Form Submissions Interceptor ---
function initGlobalForms() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const phoneInput = contactForm.querySelector('input[type="tel"]');
            const selectElement = contactForm.querySelector('select');
            const textarea = contactForm.querySelector('textarea');

            const name = nameInput ? nameInput.value.trim() : 'Valued Guest';
            const inquiry = {
                id: 'inq-' + Date.now(),
                name: name,
                email: emailInput ? emailInput.value.trim() : '',
                phone: phoneInput ? phoneInput.value.trim() : '',
                type: selectElement ? selectElement.value : 'Other',
                message: textarea ? textarea.value.trim() : '',
                submittedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            };

            try { window.saveInquiries([inquiry].concat(window.getInquiries())); } catch(err) { console.log('[SKMM] Supabase save deferred:', err.message); }

            showToast(`Thank you, ${name}! Your inquiry has been saved. Admin will respond within 24 business hours.`, 'success');
            contactForm.reset();
        });
    }

    const jobAppForm = document.getElementById('job-app-form');
    if (jobAppForm) {
        jobAppForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('[SKMM Job] Form submit triggered');
            console.log('[SKMM Job] saveApplications is:', typeof saveApplications);
            const nameInput = jobAppForm.querySelector('input[type="text"]');
            const name = nameInput ? nameInput.value.trim() : 'Applicant';

            const phoneInput = jobAppForm.querySelector('input[type="tel"]');
            const phone = phoneInput ? phoneInput.value.trim() : '';

            const jobSelect = document.getElementById('application-job-select');
            const jobPosition = jobSelect ? jobSelect.value : 'General Application';

            const appData = {
                id: 'app-' + Date.now(),
                name: name,
                phone: phone,
                jobPosition: jobPosition,
                dob: '',
                location: '',
                japaneseLevel: '',
                experience: '',
                appliedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            };
            console.log('[SKMM Job] appData:', appData);

            const dobInput = jobAppForm.querySelector('input[type="date"]');
            if (dobInput) appData.dob = dobInput.value;

            const locInput = jobAppForm.querySelector('input[type="text"]');
            if (locInput && locInput.placeholder && locInput.placeholder.includes('Province')) appData.location = locInput.value.trim();

            const langSelect = jobAppForm.querySelector('select');
            if (langSelect) {
                const options = langSelect.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].selected) { appData.japaneseLevel = options[i].value; break; }
                }
            }

            const textarea = jobAppForm.querySelector('textarea');
            if (textarea) appData.experience = textarea.value.trim();

            console.log('[SKMM Job] Calling saveApplications...');
            try {
                try { window.saveApplications([appData].concat(window.getApplications())); } catch(err) { console.log('[SKMM] Supabase save deferred:', err.message); }
                console.log('[SKMM Job] saveApplications called successfully');
                console.log('[SKMM Job] localStorage skmm_applications:', localStorage.getItem('skmm_applications') ? 'yes' : 'no');
            } catch (err) {
                console.error('[SKMM Job] saveApplications error:', err);
            }
            console.log('[SKMM Job] Table rendered, count:', getApplications().length);
            showToast(`Application submitted by ${name}! Admin can review it in the Applications tab.`, 'success');
            jobAppForm.reset();
        });
    }

    const hanabiForm = document.getElementById('hanabi-enrollment-form');
    if (hanabiForm) {
        hanabiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = hanabiForm.querySelector('input[type="text"]');
            const phoneInput = hanabiForm.querySelector('input[type="tel"]');
            const courseSelect = hanabiForm.querySelectorAll('select')[0];
            const name = nameInput ? nameInput.value.trim() : 'Student';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const course = courseSelect ? courseSelect.value : 'Not selected';

            const enrollment = {
                id: 'enr-' + Date.now(),
                name: name,
                phone: phone,
                course: course,
                knowledge: '',
                dormitory: '',
                career: '',
                submittedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            };

            // Get all form values
            const selects = hanabiForm.querySelectorAll('select');
            if (selects.length > 1) enrollment.knowledge = selects[1].value;
            if (selects.length > 2) enrollment.dormitory = selects[2].value;
            if (selects.length > 3) enrollment.career = selects[3].value;

            try { window.saveEnrollments([enrollment].concat(window.getEnrollments())); } catch(err) { console.log('[SKMM] Supabase save deferred:', err.message); }

            showToast(`Enrollment confirmed for ${name}! Admin can review in Enrollments tab.`, 'success');
            hanabiForm.reset();
        });
    }

    const toggleBtn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    if (toggleBtn && nav) {
        toggleBtn.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });
    }
}

// --- 14. Admin Management Portal Functions ---
function initAdminPortal() {
    const jobTableBody = document.getElementById('admin-jobs-tbody');
    const newsTableBody = document.getElementById('admin-news-tbody');
    if (!jobTableBody && !newsTableBody) return;

    renderAdminJobsTable();
    renderAdminNewsTable();

    // Tab switching inside admin
    const adminTabs = document.querySelectorAll('.admin-nav-tab');
    adminTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            adminTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetSection = tab.getAttribute('data-target');
            document.querySelectorAll('.admin-section').forEach(sec => sec.style.display = 'none');
            const targetEl = document.getElementById(targetSection);
            if (targetEl) targetEl.style.display = 'block';
        });
    });

    // News Form Submit (Add or Edit)
    const newsForm = document.getElementById('admin-news-form');
    if (newsForm) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const editId = document.getElementById('admin-news-id').value;
            const newsList = getNews();

            const title = document.getElementById('news-title').value.trim();
            const category = document.getElementById('news-category').value;
            const categoryLabel = document.getElementById('news-category').options[document.getElementById('news-category').selectedIndex].text;
            const author = document.getElementById('news-author').value.trim() || 'SKMM Team';
            const readTime = document.getElementById('news-readtime').value.trim() || '2 min read';
            const excerpt = document.getElementById('news-excerpt').value.trim();
            const content = document.getElementById('news-content').value.trim();

            const now = new Date();
            const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

            if (editId) {
                const index = newsList.findIndex(n => n.id === editId);
                if (index !== -1) {
                    newsList[index] = {
                        ...newsList[index],
                        title,
                        category,
                        categoryLabel,
                        author,
                        readTime,
                        excerpt,
                        content
                    };
                    saveNews(newsList);
                    showToast(`News article "${title}" updated successfully!`);
                }
            } else {
                const newId = 'news-' + Date.now();
                const newArticle = {
                    id: newId,
                    title,
                    date: dateStr,
                    category,
                    categoryLabel,
                    author,
                    readTime,
                    excerpt,
                    content
                };
                newsList.unshift(newArticle);
                saveNews(newsList);
                showToast(`New article "${title}" published successfully!`);
            }

            resetNewsForm();
            renderAdminNewsTable();
        });
    }
}

function renderAdminJobsTable() {
    const tbody = document.getElementById('admin-jobs-tbody');
    if (!tbody) return;

    const jobs = getJobs();
    tbody.innerHTML = '';

    if (jobs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:#64748b;">No jobs listed. Add your first job above!</td></tr>`;
        return;
    }

    jobs.forEach(job => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${job.title}</strong><br><span style="font-size:0.75rem; color:#64748b;">${job.company}</span></td>
            <td>${job.city}</td>
            <td><span style="font-weight:700; color:#0284c7;">${job.salary}</span></td>
            <td><span class="pill-tag">${job.schedule}</span></td>
            <td><span class="status-badge status-available">${job.statusBadge || 'Active'}</span></td>
            <td style="white-space:nowrap;">
                <button onclick="editAdminJob('${job.id}')" class="btn-outline" style="padding:4px 10px; font-size:0.75rem;">Edit</button>
                <button onclick="deleteAdminJob('${job.id}')" class="btn" style="background:#ef4444; padding:4px 10px; font-size:0.75rem; margin-left:4px;">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editAdminJob(id) {
    const jobs = getJobs();
    const job = jobs.find(j => j.id === id);
    if (!job) return;

    document.getElementById('admin-job-id').value = job.id;
    document.getElementById('job-title').value = job.title;
    document.getElementById('job-company').value = job.company;
    document.getElementById('job-country').value = job.country || 'japan';
    document.getElementById('job-city').value = job.city;
    document.getElementById('job-salary').value = job.salary;
    document.getElementById('job-schedule').value = job.schedule || 'full time';
    document.getElementById('job-employment-type').value = job.employmentType || 'overseas';
    document.getElementById('job-sector').value = job.sector || 'general';
    document.getElementById('job-theme').value = job.theme || 'peach';
    document.getElementById('job-status-badge').value = job.statusBadge || '';
    document.getElementById('job-description').value = job.description || '';
    document.getElementById('job-requirements').value = (job.requirements || []).join('\n');
    document.getElementById('job-benefits').value = (job.benefits || []).join('\n');

    document.getElementById('admin-job-form-title').textContent = `Edit Job: ${job.title}`;
    document.getElementById('admin-job-submit-btn').textContent = 'Update Job';
    document.getElementById('admin-job-cancel-btn').style.display = 'inline-block';

    document.getElementById('admin-job-form').scrollIntoView({ behavior: 'smooth' });
    showToast(`Editing "${job.title}"...`, 'info');
}

function resetJobForm() {
    const form = document.getElementById('admin-job-form');
    if (form) form.reset();
    document.getElementById('admin-job-id').value = '';
    document.getElementById('admin-job-form-title').textContent = '➕ Add New Job Opening';
    document.getElementById('admin-job-submit-btn').textContent = 'Publish Job';
    document.getElementById('admin-job-cancel-btn').style.display = 'none';
}

function deleteAdminJob(id) {
    const jobs = getJobs();
    const job = jobs.find(j => j.id === id);
    if (!job) return;

    if (confirm(`Are you sure you want to delete the job "${job.title}"?`)) {
        const filtered = jobs.filter(j => j.id !== id);
        saveJobs(filtered);
        renderAdminJobsTable();
        showToast(`Job "${job.title}" deleted.`);
    }
}

function renderAdminNewsTable() {
    const tbody = document.getElementById('admin-news-tbody');
    if (!tbody) return;

    const newsList = getNews();
    tbody.innerHTML = '';

    if (newsList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:#64748b;">No articles found. Add an article above!</td></tr>`;
        return;
    }

    newsList.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.title}</strong></td>
            <td><span class="pill-tag">${item.categoryLabel || item.category}</span></td>
            <td>${item.date}</td>
            <td>${item.author || 'Editorial'}</td>
            <td style="white-space:nowrap;">
                <button onclick="editAdminNews('${item.id}')" class="btn-outline" style="padding:4px 10px; font-size:0.75rem;">Edit</button>
                <button onclick="deleteAdminNews('${item.id}')" class="btn" style="background:#ef4444; padding:4px 10px; font-size:0.75rem; margin-left:4px;">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editAdminNews(id) {
    const newsList = getNews();
    const item = newsList.find(n => n.id === id);
    if (!item) return;

    document.getElementById('admin-news-id').value = item.id;
    document.getElementById('news-title').value = item.title;
    document.getElementById('news-category').value = item.category || 'departures';
    document.getElementById('news-author').value = item.author || '';
    document.getElementById('news-readtime').value = item.readTime || '';
    document.getElementById('news-excerpt').value = item.excerpt || '';
    document.getElementById('news-content').value = item.content || '';

    document.getElementById('admin-news-form-title').textContent = `Edit Article: ${item.title}`;
    document.getElementById('admin-news-submit-btn').textContent = 'Update Article';
    document.getElementById('admin-news-cancel-btn').style.display = 'inline-block';

    document.getElementById('admin-news-form').scrollIntoView({ behavior: 'smooth' });
    showToast(`Editing "${item.title}"...`, 'info');
}

function resetNewsForm() {
    const form = document.getElementById('admin-news-form');
    if (form) form.reset();
    document.getElementById('admin-news-id').value = '';
    document.getElementById('admin-news-form-title').textContent = '➕ Add / Publish News Article';
    document.getElementById('admin-news-submit-btn').textContent = 'Publish Article';
    document.getElementById('admin-news-cancel-btn').style.display = 'none';
}

function deleteAdminNews(id) {
    const newsList = getNews();
    const item = newsList.find(n => n.id === id);
    if (!item) return;

    if (confirm(`Are you sure you want to delete the news article "${item.title}"?`)) {
        const filtered = newsList.filter(n => n.id !== id);
        saveNews(filtered);
        renderAdminNewsTable();
        showToast(`Article "${item.title}" deleted.`);
    }
}

// --- 15. Backup, Export, Import, Reset Functions ---
function exportDataJSON() {
    const data = {
        exportedAt: new Date().toISOString(),
        jobs: getJobs(),
        news: getNews()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skmm_database_backup_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Database exported successfully as JSON!');
}

function importDataJSON() {
    const fileInput = document.getElementById('admin-import-file');
    if (!fileInput || !fileInput.files.length) {
        showToast('Please select a valid JSON backup file first.', 'error');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported.jobs)) saveJobs(imported.jobs);
            if (Array.isArray(imported.news)) saveNews(imported.news);
            renderAdminJobsTable();
            renderAdminNewsTable();
            showToast('Database successfully imported & updated!');
            fileInput.value = '';
        } catch (err) {
            showToast('Invalid JSON file format!', 'error');
        }
    };
    reader.readAsText(file);
}

function resetAllDataToDefault() {
    if (confirm('Are you sure you want to reset all Jobs and News back to default demo data? Any custom items will be lost!')) {
        saveJobs(DEFAULT_JOBS);
        saveNews(DEFAULT_NEWS);
        renderAdminJobsTable();
        renderAdminNewsTable();
        showToast('Database restored to default demo data.');
    }
}

// --- 16. Hero Slideshow & Interactive Search Engine ---
let currentHeroSlide = 0;
let heroSlideTimer = null;

function initHeroSlider() {
    const sliderWrapper = document.getElementById('hero-slider-wrapper');
    const dotsContainer = document.getElementById('hero-slider-dots');
    if (!sliderWrapper) return;

    function showSlide(index) {
        const slides = sliderWrapper.querySelectorAll('.hero-slide');
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];
        if (!slides.length) return;

        if (index >= slides.length) currentHeroSlide = 0;
        else if (index < 0) currentHeroSlide = slides.length - 1;
        else currentHeroSlide = index;

        sliderWrapper.style.transform = `translateX(-${currentHeroSlide * 100}%)`;

        dots.forEach((d, i) => {
            if (i === currentHeroSlide) d.classList.add('active');
            else d.classList.remove('active');
        });
    }

    window.setHeroSlide = function(index) {
        showSlide(index);
        resetHeroTimer();
    };

    window.moveHeroSlide = function(step) {
        showSlide(currentHeroSlide + step);
        resetHeroTimer();
    };

    function resetHeroTimer() {
        if (heroSlideTimer) clearInterval(heroSlideTimer);
        heroSlideTimer = setInterval(() => {
            showSlide(currentHeroSlide + 1);
        }, 6000);
    }

    const container = document.querySelector('.hero-slider-container');
    if (container) {
        container.addEventListener('mouseenter', () => {
            if (heroSlideTimer) clearInterval(heroSlideTimer);
        });
        container.addEventListener('mouseleave', () => {
            resetHeroTimer();
        });
    }

    resetHeroTimer();
}

// Hero Search Handler
function handleHeroSearch(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('hero-search-input');
    const query = input ? input.value.trim().toLowerCase() : '';

    const jobGrid = document.getElementById('home-job-grid');
    if (!jobGrid) return;

    const cards = jobGrid.querySelectorAll('.job-card');
    let count = 0;

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!query || text.includes(query)) {
            card.style.display = 'flex';
            count++;
        } else {
            card.style.display = 'none';
        }
    });

    const badge = document.querySelector('.badge-count');
    if (badge) badge.textContent = `${count} found`;

    jobGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast(query ? `Found ${count} job(s) for "${query}".` : 'Showing all jobs.');
}

// Popular Tag Click Handler
function searchPopularTag(tag) {
    const input = document.getElementById('hero-search-input');
    if (input) input.value = tag;
    handleHeroSearch();
}

// --- Auth System ---
const AUTH_KEY = 'skmm_admin_session';
const ADMIN_USERNAME = 'SKMMadmin@soksamnang';
const ADMIN_PASSWORD = 'NOattackHERE@123';
const LOCKOUT_SECONDS = 30;

function isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) === 'skmm_admin_active';
}

function authenticate(username, password) {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
}

function startLockoutTimer(inputEl, submitBtn, errorEl, seconds) {
    let remaining = seconds;
    inputEl.disabled = true;
    submitBtn.disabled = true;
    errorEl.textContent = `Too many attempts. Try again in ${remaining}s.`;
    errorEl.style.display = 'block';

    const timer = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
            clearInterval(timer);
            inputEl.disabled = false;
            submitBtn.disabled = false;
            errorEl.textContent = '';
            errorEl.style.display = 'none';
            inputEl.focus();
        } else {
            errorEl.textContent = `Too many attempts. Try again in ${remaining}s.`;
        }
    }, 1000);
}

function openAdminLogin() {
    const html = `
        <form onsubmit="handleAdminLogin(event)">
            <h3 style="margin-bottom: 0.5rem; color: #0f172a; font-size: 1.4rem; text-align: center;">🔐 Admin Login</h3>
            <p style="color: #64748b; font-size: 0.85rem; text-align: center; margin-bottom: 1.25rem;">Enter your credentials to access the admin panel.</p>
            <div class="form-group">
                <label>Username</label>
                <input type="text" id="admin-login-username" placeholder="SKMMadmin@soksamnang" required autofocus>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" id="admin-login-password" placeholder="NOattackHERE@123" required>
            </div>
            <div id="admin-login-error" style="color: #ef4444; font-size: 0.85rem; margin-bottom: 1rem; display: none; background: #fef2f2; padding: 8px 12px; border-radius: 8px; border-left: 3px solid #ef4444;"></div>
            <button type="submit" class="btn" style="width: 100%; padding: 0.75rem;">Sign In (ចូលប្រើប្រាស់)</button>
        </form>
    `;
    openModal('Admin Login — ការចូលប្រើប្រាស់', html);
}

function handleAdminLogin(e) {
    e.preventDefault();
    const username = document.getElementById('admin-login-username').value.trim();
    const password = document.getElementById('admin-login-password').value;
    const errorEl = document.getElementById('admin-login-error');

    if (authenticate(username, password)) {
        localStorage.setItem(AUTH_KEY, 'skmm_admin_active');
        closeModal();
        showToast('Admin login successful!', 'success');

        const gate = document.getElementById('admin-gate');
        const content = document.getElementById('admin-content');
        if (gate) gate.style.display = 'none';
        if (content) content.style.display = 'block';
        resetInactivityTimer();
    } else {
        errorEl.textContent = 'Invalid username or password.';
        errorEl.style.display = 'block';

        const input = document.getElementById('admin-login-username');
        const submitBtn = e.target.querySelector('button[type="submit"]');
        startLockoutTimer(input, submitBtn, errorEl, LOCKOUT_SECONDS);
    }
}

function handleAdminGate(e) {
    e.preventDefault();
    const username = document.getElementById('admin-gate-input').value.trim();
    const password = document.getElementById('admin-gate-password').value;
    const errorEl = document.getElementById('gate-error');

    if (authenticate(username, password)) {
        localStorage.setItem(AUTH_KEY, 'skmm_admin_active');
        const gate = document.getElementById('admin-gate');
        const content = document.getElementById('admin-content');
        if (gate) gate.style.display = 'none';
        if (content) content.style.display = 'block';
        resetInactivityTimer();
    } else {
        errorEl.textContent = 'Invalid username or password.';
        errorEl.style.display = 'block';

        const input = document.getElementById('admin-gate-input');
        const submitBtn = e.target.querySelector('button[type="submit"]');
        startLockoutTimer(input, submitBtn, errorEl, LOCKOUT_SECONDS);
    }
}

function checkAdminAuth() {
    if (!isAuthenticated()) {
        const gate = document.getElementById('admin-gate');
        const content = document.getElementById('admin-content');
        if (gate) gate.style.display = 'flex';
        if (content) content.style.display = 'none';
    } else {
        const gate = document.getElementById('admin-gate');
        const content = document.getElementById('admin-content');
        if (gate) gate.style.display = 'none';
        if (content) content.style.display = 'block';
    }
}

// --- Auto Logout: 30 minutes inactivity ---
const INACTIVITY_TIMEOUT = 30 * 60 * 1000;
let inactivityTimerId = null;

function resetInactivityTimer() {
    if (inactivityTimerId) clearTimeout(inactivityTimerId);
    if (isAuthenticated()) {
        inactivityTimerId = setTimeout(handleInactivity, INACTIVITY_TIMEOUT);
    }
}

function handleInactivity() {
    logout();
    const gate = document.getElementById('admin-gate');
    const content = document.getElementById('admin-content');
    if (gate) gate.style.display = 'flex';
    if (content) content.style.display = 'none';
    showToast('Session expired due to inactivity. Please log in again.', 'warning');
    const input = document.getElementById('admin-gate-input');
    const password = document.getElementById('admin-gate-password');
    if (input) input.value = '';
    if (password) password.value = '';
}

function startInactivityWatcher() {
    if (!document.getElementById('admin-gate')) return;
    ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt => {
        document.addEventListener(evt, resetInactivityTimer, { passive: true });
    });
    resetInactivityTimer();
}

// --- 15. Job Applications ---
const DEFAULT_APPLICATIONS = [];

function getApplications() {
    try {
        const stored = localStorage.getItem('skmm_applications');
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error('Error reading applications', e);
    }
    saveApplications(DEFAULT_APPLICATIONS);
    return DEFAULT_APPLICATIONS;
}

function saveApplications(apps) {
    try {
        localStorage.setItem('skmm_applications', JSON.stringify(apps));
    } catch (e) {
        console.error('Error saving applications', e);
    }
}

function renderApplications() {
    const candidateList = document.getElementById('candidate-list');
    if (!candidateList) return;

    const urlParams = new URLSearchParams(window.location.search);
    const appliedName = urlParams.get('applied');

    const apps = getApplications();

    apps.forEach(app => {
        const existing = candidateList.querySelector(`[data-app-id="${app.id}"]`);
        if (existing) return;

        const card = document.createElement('div');
        card.className = 'candidate-card candidate-card-item';
        card.setAttribute('data-gender', 'unknown');
        card.setAttribute('data-level', 'unknown');
        card.setAttribute('data-category', 'application');
        card.setAttribute('data-app-id', app.id);

        const initials = app.name ? app.name.split(' ').map(w => w[0] || '').join('').substring(0, 2).toUpperCase() : 'AP';
        const avatarBg = 'linear-gradient(135deg, #8b5cf6, #6366f1)';

        card.innerHTML = `
            <div>
                <div class="candidate-header">
                    <div class="candidate-avatar" style="background: ${avatarBg};">${initials}</div>
                    <div>
                        <h3 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 2px;">${app.name || 'Unknown'}</h3>
                        <span class="status-badge status-interviewing">Applied</span>
                        <span class="text-muted" style="margin-left: 6px; font-weight: 600;">${app.jobPosition}</span>
                    </div>
                </div>
                <ul class="candidate-specs">
                    <li><span>Applied for:</span> <strong>${app.jobPosition || 'N/A'}</strong></li>
                    <li><span>Phone:</span> <strong>${app.phone || 'N/A'}</strong></li>
                    <li><span>Japanese:</span> <strong>${app.japaneseLevel || 'Not specified'}</strong></li>
                    <li><span>Location:</span> <strong>${app.location || 'N/A'}</strong></li>
                    <li><span>Applied:</span> <strong>${app.appliedAt || 'N/A'}</strong></li>
                </ul>
            </div>
            <button onclick="requestInterview('${app.id}')" class="btn" style="width: 100%; text-align: center;">Request Interview (ស្នើសុំសម្ភាសន៍)</button>
        `;
        candidateList.prepend(card);
    });

    if (appliedName) {
        showToast(`${appliedName}'s application is now listed on this page.`, 'info');
    }
}

// --- 16. Admin: Applications Section ---
function renderAdminApplicationsTable() {
    const tbody = document.getElementById('admin-applications-tbody');
    if (!tbody) return;

    const apps = getApplications();
    tbody.innerHTML = '';

    if (apps.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:#64748b;">No applications received yet.</td></tr>`;
        return;
    }

    apps.forEach(app => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${app.name || 'Unknown'}</strong></td>
            <td>${app.phone || 'N/A'}</td>
            <td><span class="pill-tag">${app.jobPosition || 'N/A'}</span></td>
            <td>${app.japaneseLevel || 'N/A'}</td>
            <td>${app.appliedAt || 'N/A'}</td>
            <td style="white-space:nowrap;">
                <button onclick="editApplication('${app.id}')" class="btn-outline" style="padding:4px 10px; font-size:0.75rem;">Edit</button>
                <button onclick="deleteApplication('${app.id}')" class="btn" style="background:#ef4444; padding:4px 10px; font-size:0.75rem; margin-left:4px;">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function viewApplicationDetails(appId) {
    const apps = getApplications();
    const app = apps.find(a => a.id === appId);
    if (!app) {
        showToast('Application not found', 'error');
        return;
    }

    const html = `
        <div style="margin-bottom: 1rem;">
            <p style="font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">${app.name || 'Unknown'}</p>
            <span class="status-badge status-interviewing">Applied</span>
        </div>
        <div style="margin-bottom: 1rem;">
            <h4 style="color: #0f172a; margin-bottom: 0.5rem;">Application Details</h4>
            <ul style="padding-left: 1.25rem; color: #475569; font-size: 0.875rem; line-height: 1.8;">
                <li><strong>Position Applied:</strong> ${app.jobPosition || 'N/A'}</li>
                <li><strong>Phone:</strong> ${app.phone || 'N/A'}</li>
                <li><strong>Date of Birth:</strong> ${app.dob || 'N/A'}</li>
                <li><strong>Location:</strong> ${app.location || 'N/A'}</li>
                <li><strong>Japanese Level:</strong> ${app.japaneseLevel || 'N/A'}</li>
                <li><strong>Experience:</strong> ${app.experience || 'N/A'}</li>
                <li><strong>Applied Date:</strong> ${app.appliedAt || 'N/A'}</li>
            </ul>
        </div>
        <div style="display: flex; justify-content: flex-end; border-top: 1px solid #f1f5f9; padding-top: 1rem;">
            <button class="btn-outline" onclick="closeModal()">Close</button>
        </div>
    `;
    openModal(`Application: ${app.name || 'Unknown'}`, html);
}

function deleteApplication(appId) {
    const apps = getApplications();
    if (confirm('Delete this application?')) {
        const filtered = apps.filter(a => a.id !== appId);
        saveApplications(filtered);
        renderAdminApplicationsTable();
        renderApplications();
        showToast('Application deleted.');
    }
}

// --- 16. Interview Requests ---
const DEFAULT_INTERVIEW_REQUESTS = [];

function getInterviewRequests() {
    try {
        const stored = localStorage.getItem('skmm_interview_requests');
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error('Error reading interview requests', e);
    }
    saveInterviewRequests(DEFAULT_INTERVIEW_REQUESTS);
    return DEFAULT_INTERVIEW_REQUESTS;
}

function saveInterviewRequests(requests) {
    try {
        localStorage.setItem('skmm_interview_requests', JSON.stringify(requests));
    } catch (e) {
        console.error('Error saving interview requests', e);
    }
}

function renderAdminInterviewTable() {
    const tbody = document.getElementById('admin-interview-tbody');
    if (!tbody) return;

    const requests = getInterviewRequests();
    tbody.innerHTML = '';

    if (requests.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:#64748b;">No interview requests yet.</td></tr>`;
        return;
    }

    requests.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${r.candidateName || 'N/A'}</strong></td>
            <td>${r.company || 'N/A'}</td>
            <td>${r.representative || 'N/A'}</td>
            <td><span class="pill-tag">${r.tool || 'N/A'}</span></td>
            <td>${r.datetime || 'N/A'}</td>
            <td><span class="status-badge status-${r.status === 'Pending' ? 'interviewing' : r.status === 'Approved' ? 'selected' : 'available'}">${r.status || 'Pending'}</span></td>
            <td style="white-space:nowrap;">
                <button onclick="editInterviewRequest('${r.id}')" class="btn-outline" style="padding:4px 10px; font-size:0.75rem;">Edit</button>
                <button onclick="updateInterviewStatus('${r.id}')" class="btn-outline" style="padding:4px 10px; font-size:0.75rem;">${r.status === 'Approved' ? 'Reject' : 'Approve'}</button>
                <button onclick="deleteInterviewRequest('${r.id}')" class="btn" style="background:#ef4444; padding:4px 10px; font-size:0.75rem; margin-left:4px;">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function viewInterviewRequest(reqId) {
    const requests = getInterviewRequests();
    const r = requests.find(req => req.id === reqId);
    if (!r) {
        showToast('Interview request not found', 'error');
        return;
    }

    const html = `
        <div style="margin-bottom: 1rem;">
            <p style="font-size: 1.15rem; font-weight: 700; color: #0f172a;">Interview Request #${r.candidateName}</p>
            <span class="status-badge status-${r.status === 'Pending' ? 'interviewing' : r.status === 'Approved' ? 'selected' : 'available'}">${r.status || 'Pending'}</span>
        </div>
        <div style="margin-bottom: 1rem;">
            <h4 style="color: #0f172a; margin-bottom: 0.5rem;">Request Details</h4>
            <ul style="padding-left: 1.25rem; color: #475569; font-size: 0.875rem; line-height: 1.8;">
                <li><strong>Company:</strong> ${r.company || 'N/A'}</li>
                <li><strong>Representative:</strong> ${r.representative || 'N/A'}</li>
                <li><strong>Email:</strong> ${r.email || 'N/A'}</li>
                <li><strong>Tool:</strong> ${r.tool || 'N/A'}</li>
                <li><strong>Date & Time:</strong> ${r.datetime || 'N/A'}</li>
                <li><strong>Notes:</strong> ${r.notes || 'None'}</li>
                <li><strong>Submitted:</strong> ${r.submittedAt || 'N/A'}</li>
            </ul>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #f1f5f9; padding-top: 1rem;">
            <button type="button" class="btn-outline" onclick="updateInterviewStatus('${r.id}')">${r.status === 'Approved' ? 'Reject' : 'Approve'}</button>
            <button type="button" class="btn-outline" onclick="deleteInterviewRequest('${r.id}')" style="background:#ef4444; color:#fff;">Delete</button>
            <button type="button" class="btn-outline" onclick="closeModal()">Close</button>
        </div>
    `;
    openModal(`Interview: ${r.candidateName}`, html);
}

function updateInterviewStatus(reqId) {
    const requests = getInterviewRequests();
    const r = requests.find(req => req.id === reqId);
    if (!r) return;

    r.status = r.status === 'Approved' ? 'Rejected' : 'Approved';
    saveInterviewRequests(requests);
    renderAdminInterviewTable();
    closeModal();
    showToast(`Interview ${r.status === 'Approved' ? 'approved' : 'rejected'} for ${r.candidateName}`);
}

function deleteInterviewRequest(reqId) {
    const requests = getInterviewRequests();
    if (confirm('Delete this interview request?')) {
        const filtered = requests.filter(req => req.id !== reqId);
        saveInterviewRequests(filtered);
        renderAdminInterviewTable();
        showToast('Interview request deleted.');
    }
}

// --- 17. Partner Consultations ---
const DEFAULT_PARTNER_REQUESTS = [];

function getPartnerRequests() {
    try {
        const stored = localStorage.getItem('skmm_partner_requests');
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error('Error reading partner requests', e);
    }
    savePartnerRequests(DEFAULT_PARTNER_REQUESTS);
    return DEFAULT_PARTNER_REQUESTS;
}

function savePartnerRequests(requests) {
    try {
        localStorage.setItem('skmm_partner_requests', JSON.stringify(requests));
    } catch (e) {
        console.error('Error saving partner requests', e);
    }
}

function renderAdminPartnerTable() {
    const tbody = document.getElementById('admin-partner-tbody');
    if (!tbody) return;

    const requests = getPartnerRequests();
    tbody.innerHTML = '';

    if (requests.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:#64748b;">No partner consultations booked yet.</td></tr>`;
        return;
    }

    requests.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${r.company || 'N/A'}</strong><br><span style="font-size:0.75rem; color:#64748b;">${r.contactName || 'N/A'}</span></td>
            <td>${r.email || 'N/A'}</td>
            <td><span class="pill-tag">${r.industry || 'N/A'}</span></td>
            <td>${r.volume || 'N/A'}</td>
            <td><span class="status-badge status-${r.status === 'Pending' ? 'interviewing' : r.status === 'Approved' ? 'selected' : 'available'}">${r.status || 'Pending'}</span></td>
            <td style="white-space:nowrap;">
                <button onclick="editPartnerRequest('${r.id}')" class="btn-outline" style="padding:4px 10px; font-size:0.75rem;">Edit</button>
                <button onclick="updatePartnerStatus('${r.id}')" class="btn-outline" style="padding:4px 10px; font-size:0.75rem;">${r.status === 'Approved' ? 'Reject' : 'Approve'}</button>
                <button onclick="deletePartnerRequest('${r.id}')" class="btn" style="background:#ef4444; padding:4px 10px; font-size:0.75rem; margin-left:4px;">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function viewPartnerRequest(reqId) {
    const requests = getPartnerRequests();
    const r = requests.find(req => req.id === reqId);
    if (!r) {
        showToast('Partner request not found', 'error');
        return;
    }

    const html = `
        <div style="margin-bottom: 1rem;">
            <p style="font-size: 1.15rem; font-weight: 700; color: #0f172a;">${r.company || 'N/A'}</p>
            <span class="status-badge status-${r.status === 'Pending' ? 'interviewing' : r.status === 'Approved' ? 'selected' : 'available'}">${r.status || 'Pending'}</span>
        </div>
        <div style="margin-bottom: 1rem;">
            <h4 style="color: #0f172a; margin-bottom: 0.5rem;">Details</h4>
            <ul style="padding-left: 1.25rem; color: #475569; font-size: 0.875rem; line-height: 1.8;">
                <li><strong>Contact:</strong> ${r.contactName || 'N/A'}</li>
                <li><strong>Email:</strong> ${r.email || 'N/A'}</li>
                <li><strong>Industry:</strong> ${r.industry || 'N/A'}</li>
                <li><strong>Volume:</strong> ${r.volume || 'N/A'}</li>
                <li><strong>Submitted:</strong> ${r.submittedAt || 'N/A'}</li>
            </ul>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #f1f5f9; padding-top: 1rem;">
            <button type="button" class="btn-outline" onclick="updatePartnerStatus('${r.id}')">${r.status === 'Approved' ? 'Reject' : 'Approve'}</button>
            <button type="button" class="btn" style="background:#ef4444;" onclick="deletePartnerRequest('${r.id}')">Delete</button>
            <button type="button" class="btn-outline" onclick="closeModal()">Close</button>
        </div>
    `;
    openModal(`Consultation: ${r.company || 'N/A'}`, html);
}

function updatePartnerStatus(reqId) {
    const requests = getPartnerRequests();
    const r = requests.find(req => req.id === reqId);
    if (!r) return;

    r.status = r.status === 'Approved' ? 'Rejected' : 'Approved';
    savePartnerRequests(requests);
    renderAdminPartnerTable();
    closeModal();
    showToast(`Consultation ${r.status === 'Approved' ? 'approved' : 'rejected'} for ${r.company}`);
}

function deletePartnerRequest(reqId) {
    const requests = getPartnerRequests();
    if (confirm('Delete this partner consultation request?')) {
        const filtered = requests.filter(req => req.id !== reqId);
        savePartnerRequests(filtered);
        renderAdminPartnerTable();
        showToast('Partner consultation request deleted.');
    }
}

// --- 18. Contact Inquiries ---
const DEFAULT_CONTACT_INQUIRIES = [];

function getInquiries() {
    try {
        const stored = localStorage.getItem('skmm_inquiries');
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error('Error reading inquiries', e);
    }
    saveInquiries(DEFAULT_CONTACT_INQUIRIES);
    return DEFAULT_CONTACT_INQUIRIES;
}

function saveInquiries(inquiries) {
    try {
        localStorage.setItem('skmm_inquiries', JSON.stringify(inquiries));
    } catch (e) {
        console.error('Error saving inquiries', e);
    }
}

function renderAdminInquiryTable() {
    const tbody = document.getElementById('admin-inquiry-tbody');
    if (!tbody) return;

    const inquiries = getInquiries();
    tbody.innerHTML = '';

    if (inquiries.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:#64748b;">No inquiries yet.</td></tr>`;
        return;
    }

    inquiries.forEach(i => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${i.name || 'N/A'}</strong></td>
            <td>${i.email || 'N/A'}</td>
            <td>${i.phone || 'N/A'}</td>
            <td><span class="pill-tag">${i.type || 'Other'}</span></td>
            <td style="white-space:nowrap;">
                <button onclick="editInquiry('${i.id}')" class="btn-outline" style="padding:4px 10px; font-size:0.75rem;">Edit</button>
                <button onclick="deleteInquiry('${i.id}')" class="btn" style="background:#ef4444; padding:4px 10px; font-size:0.75rem; margin-left:4px;">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function viewInquiry(inqId) {
    const inquiries = getInquiries();
    const i = inquiries.find(inq => inq.id === inqId);
    if (!i) {
        showToast('Inquiry not found', 'error');
        return;
    }

    const html = `
        <div style="margin-bottom: 1rem;">
            <p style="font-size: 1.15rem; font-weight: 700; color: #0f172a;">${i.name || 'N/A'}</p>
            <span class="text-muted">Submitted ${i.submittedAt || 'N/A'}</span>
        </div>
        <div style="margin-bottom: 1rem;">
            <h4 style="color: #0f172a; margin-bottom: 0.5rem;">Details</h4>
            <ul style="padding-left: 1.25rem; color: #475569; font-size: 0.875rem; line-height: 1.8;">
                <li><strong>Email:</strong> ${i.email || 'N/A'}</li>
                <li><strong>Phone:</strong> ${i.phone || 'N/A'}</li>
                <li><strong>Type:</strong> ${i.type || 'N/A'}</li>
            </ul>
        </div>
        <div style="margin-bottom: 1rem; background: #f8fafc; padding: 1rem; border-radius: 8px;">
            <strong>Message:</strong>
            <p style="margin: 0.5rem 0 0; color: #475569; font-size: 0.875rem; line-height: 1.6;">${i.message || 'N/A'}</p>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #f1f5f9; padding-top: 1rem;">
            <button type="button" class="btn" style="background:#ef4444;" onclick="deleteInquiry('${i.id}')">Delete</button>
            <button type="button" class="btn-outline" onclick="closeModal()">Close</button>
        </div>
    `;
    openModal(`Inquiry from ${i.name || 'N/A'}`, html);
}

function deleteInquiry(inqId) {
    const inquiries = getInquiries();
    if (confirm('Delete this inquiry?')) {
        const filtered = inquiries.filter(inq => inq.id !== inqId);
        saveInquiries(filtered);
        renderAdminInquiryTable();
        showToast('Inquiry deleted.');
    }
}

// ========== APPLICATIONS CRUD ==========
function toggleApplicationForm() {
    var panel = document.getElementById('application-form-panel');
    if (!panel) return;
    var isHidden = panel.style.display === 'none' || panel.style.display === '';
    panel.style.display = isHidden ? 'block' : 'none';
}

function handleApplicationSubmit(e) {
    e.preventDefault();
    var editId = document.getElementById('admin-application-id').value;
    var apps = getApplications();
    var app = {
        id: editId || 'app-' + Date.now(),
        name: document.getElementById('app-name').value.trim(),
        phone: document.getElementById('app-phone').value.trim(),
        jobPosition: document.getElementById('app-position').value.trim(),
        japaneseLevel: document.getElementById('app-japaneseLevel').value.trim(),
        location: document.getElementById('app-location').value.trim(),
        dob: document.getElementById('app-dob').value,
        experience: document.getElementById('app-experience').value.trim()
    };
    if (editId) {
        var idx = apps.findIndex(function(a) { return a.id === editId; });
        if (idx !== -1) apps[idx] = app;
    } else {
        apps.push(app);
    }
    localStorage.setItem('skmm_applications', JSON.stringify(apps));
    renderAdminApplicationsTable();
    toggleApplicationForm();
    showToast(editId ? 'Application updated' : 'Application added');
    try { saveApplications(apps); } catch(err) { console.log('[SKMM] Supabase save deferred:', err.message); }
}

function editApplication(appId) {
    var apps = getApplications();
    var app = apps.find(function(a) { return a.id === appId; });
    if (!app) return;
    document.getElementById('admin-application-id').value = app.id;
    document.getElementById('app-name').value = app.name || '';
    document.getElementById('app-phone').value = app.phone || '';
    document.getElementById('app-position').value = app.jobPosition || '';
    document.getElementById('app-japaneseLevel').value = app.japaneseLevel || '';
    document.getElementById('app-location').value = app.location || '';
    document.getElementById('app-dob').value = app.dob || '';
    document.getElementById('app-experience').value = app.experience || '';
    toggleApplicationForm();
}

// ========== INTERVIEW REQUESTS CRUD ==========
function toggleInterviewForm() {
    var panel = document.getElementById('interview-form-panel');
    if (!panel) return;
    var isHidden = panel.style.display === 'none' || panel.style.display === '';
    panel.style.display = isHidden ? 'block' : 'none';
}

function handleInterviewSubmit(e) {
    e.preventDefault();
    var editId = document.getElementById('admin-interview-id').value;
    var requests = getInterviewRequests();
    var req = {
        id: editId || 'int-' + Date.now(),
        candidateName: document.getElementById('int-candidateId').value.trim(),
        company: document.getElementById('int-company').value.trim(),
        representative: document.getElementById('int-representative').value.trim(),
        tool: document.getElementById('int-tool').value.trim(),
        datetime: document.getElementById('int-datetime').value,
        status: document.getElementById('int-status').value,
        email: document.getElementById('int-email').value.trim(),
        notes: document.getElementById('int-notes').value.trim()
    };
    if (editId) {
        var idx = requests.findIndex(function(r) { return r.id === editId; });
        if (idx !== -1) requests[idx] = req;
    } else {
        requests.push(req);
    }
    localStorage.setItem('skmm_interview_requests', JSON.stringify(requests));
    renderAdminInterviewTable();
    toggleInterviewForm();
    showToast(editId ? 'Interview request updated' : 'Interview request added');
    try { saveInterviewRequests(requests); } catch(err) { console.log('[SKMM] Supabase save deferred:', err.message); }
}

function editInterviewRequest(reqId) {
    var requests = getInterviewRequests();
    var req = requests.find(function(r) { return r.id === reqId; });
    if (!req) return;
    document.getElementById('admin-interview-id').value = req.id;
    document.getElementById('int-candidateId').value = req.candidateName || '';
    document.getElementById('int-company').value = req.company || '';
    document.getElementById('int-representative').value = req.representative || '';
    document.getElementById('int-tool').value = req.tool || '';
    document.getElementById('int-datetime').value = req.datetime || '';
    document.getElementById('int-status').value = req.status || 'Pending';
    document.getElementById('int-email').value = req.email || '';
    document.getElementById('int-notes').value = req.notes || '';
    toggleInterviewForm();
}

// ========== PARTNER REQUESTS CRUD ==========
function togglePartnerForm() {
    var panel = document.getElementById('partner-form-panel');
    if (!panel) return;
    var isHidden = panel.style.display === 'none' || panel.style.display === '';
    panel.style.display = isHidden ? 'block' : 'none';
}

function handlePartnerSubmit(e) {
    e.preventDefault();
    var editId = document.getElementById('admin-partner-id').value;
    var requests = getPartnerRequests();
    var req = {
        id: editId || 'part-' + Date.now(),
        company: document.getElementById('part-company').value.trim(),
        contactName: document.getElementById('part-contactName').value.trim(),
        email: document.getElementById('part-email').value.trim(),
        industry: document.getElementById('part-industry').value.trim(),
        volume: document.getElementById('part-volume').value.trim(),
        status: document.getElementById('part-status').value
    };
    if (editId) {
        var idx = requests.findIndex(function(r) { return r.id === editId; });
        if (idx !== -1) requests[idx] = req;
    } else {
        requests.push(req);
    }
    savePartnerRequests(requests);
    renderAdminPartnerTable();
    togglePartnerForm();
    showToast(editId ? 'Partner request updated' : 'Partner request added');
}

function editPartnerRequest(reqId) {
    var requests = getPartnerRequests();
    var req = requests.find(function(r) { return r.id === reqId; });
    if (!req) return;
    document.getElementById('admin-partner-id').value = req.id;
    document.getElementById('part-company').value = req.company || '';
    document.getElementById('part-contactName').value = req.contactName || '';
    document.getElementById('part-email').value = req.email || '';
    document.getElementById('part-industry').value = req.industry || '';
    document.getElementById('part-volume').value = req.volume || '';
    document.getElementById('part-status').value = req.status || 'Pending';
    togglePartnerForm();
}

// ========== CONTACT INQUIRIES CRUD ==========
function toggleInquiryForm() {
    var panel = document.getElementById('inquiry-form-panel');
    if (!panel) return;
    var isHidden = panel.style.display === 'none' || panel.style.display === '';
    panel.style.display = isHidden ? 'block' : 'none';
}

function handleInquirySubmit(e) {
    e.preventDefault();
    var editId = document.getElementById('admin-inquiry-id').value;
    var inquiries = getInquiries();
    var inq = {
        id: editId || 'inq-' + Date.now(),
        name: document.getElementById('inq-name').value.trim(),
        email: document.getElementById('inq-email').value.trim(),
        phone: document.getElementById('inq-phone').value.trim(),
        type: document.getElementById('inq-type').value.trim(),
        message: document.getElementById('inq-message').value.trim()
    };
    if (editId) {
        var idx = inquiries.findIndex(function(i) { return i.id === editId; });
        if (idx !== -1) inquiries[idx] = inq;
    } else {
        inquiries.push(inq);
    }
    saveInquiries(inquiries);
    renderAdminInquiryTable();
    toggleInquiryForm();
    showToast(editId ? 'Inquiry updated' : 'Inquiry added');
}

function editInquiry(inqId) {
    var inquiries = getInquiries();
    var inq = inquiries.find(function(i) { return i.id === inqId; });
    if (!inq) return;
    document.getElementById('admin-inquiry-id').value = inq.id;
    document.getElementById('inq-name').value = inq.name || '';
    document.getElementById('inq-email').value = inq.email || '';
    document.getElementById('inq-phone').value = inq.phone || '';
    document.getElementById('inq-type').value = inq.type || '';
    document.getElementById('inq-message').value = inq.message || '';
    toggleInquiryForm();
}

// ========== HANABI ENROLLMENTS CRUD ==========
function toggleEnrollmentForm() {
    var panel = document.getElementById('enrollment-form-panel');
    if (!panel) return;
    var isHidden = panel.style.display === 'none' || panel.style.display === '';
    panel.style.display = isHidden ? 'block' : 'none';
}

function handleEnrollmentSubmit(e) {
    e.preventDefault();
    var editId = document.getElementById('admin-enrollment-id').value;
    var enrollments = getEnrollments();
    var enr = {
        id: editId || 'enr-' + Date.now(),
        name: document.getElementById('enr-name').value.trim(),
        phone: document.getElementById('enr-phone').value.trim(),
        course: document.getElementById('enr-course').value.trim(),
        knowledge: document.getElementById('enr-knowledge').value.trim(),
        dormitory: document.getElementById('enr-dormitory').value.trim(),
        career: document.getElementById('enr-career').value.trim()
    };
    if (editId) {
        var idx = enrollments.findIndex(function(e) { return e.id === editId; });
        if (idx !== -1) enrollments[idx] = enr;
    } else {
        enrollments.push(enr);
    }
    saveEnrollments(enrollments);
    renderAdminEnrollmentTable();
    toggleEnrollmentForm();
    showToast(editId ? 'Enrollment updated' : 'Enrollment added');
}

function editEnrollment(enrId) {
    var enrollments = getEnrollments();
    var enr = enrollments.find(function(e) { return e.id === enrId; });
    if (!enr) return;
    document.getElementById('admin-enrollment-id').value = enr.id;
    document.getElementById('enr-name').value = enr.name || '';
    document.getElementById('enr-phone').value = enr.phone || '';
    document.getElementById('enr-course').value = enr.course || '';
    document.getElementById('enr-knowledge').value = enr.knowledge || '';
    document.getElementById('enr-dormitory').value = enr.dormitory || '';
    document.getElementById('enr-career').value = enr.career || '';
    toggleEnrollmentForm();
}

// --- 19. Admin: Candidates CRUD ---
function renderAdminCandidatesTable() {
    const tbody = document.getElementById('admin-candidates-tbody');
    if (!tbody) return;

    const candidates = getCandidates();
    tbody.innerHTML = '';

    if (candidates.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:#64748b;">No candidates found. Add one below.</td></tr>`;
        return;
    }

    candidates.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><div class="candidate-avatar" style="width:32px; height:32px; font-size:0.75rem; display:inline-flex; margin-right:8px; vertical-align:middle;">${c.initials || '??'}</div><strong>${c.name || 'Unknown'}</strong></td>
            <td>${c.sector || 'N/A'}</td>
            <td><span class="status-badge ${c.statusClass || 'status-available'}">${c.status || 'Available'}</span></td>
            <td>JLPT ${c.level || 'N/A'}</td>
            <td>${c.age || 'N/A'}</td>
            <td style="white-space:nowrap;">
                <button onclick="editAdminCandidate('${c.id}')" class="btn-outline" style="padding:4px 10px; font-size:0.75rem;">Edit</button>
                <button onclick="deleteAdminCandidate('${c.id}')" class="btn" style="background:#ef4444; padding:4px 10px; font-size:0.75rem; margin-left:4px;">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editAdminCandidate(candId) {
    const candidates = getCandidates();
    const c = candidates.find(cd => cd.id === candId);
    if (!c) {
        showToast('Candidate not found', 'error');
        return;
    }

    const html = `
        <form onsubmit="handleAdminCandidateSubmit(event)">
            <input type="hidden" id="admin-candidate-id" value="${c.id}">
            <div class="form-group">
                <label>Full Name — ឈ្មោះ</label>
                <input type="text" id="admin-candidate-name" value="${c.name || ''}" required>
            </div>
            <div class="grid-2">
                <div class="form-group">
                    <label>Sector — វិស័យ</label>
                    <select id="admin-candidate-sector">
                        <option value="Agriculture (កសិកម្ម)" ${c.sector === 'Agriculture (កសិកម្ម)' ? 'selected' : ''}>Agriculture</option>
                        <option value="Caregiving (ថែទាំមនុស្សចាស់)" ${c.sector === 'Caregiving (ថែទាំមនុស្សចាស់)' ? 'selected' : ''}>Caregiving</option>
                        <option value="Food Processing (ផលិតចំណីអាហារ)" ${c.sector === 'Food Processing (ផលិតចំណីអាហារ)' ? 'selected' : ''}>Food Processing</option>
                        <option value="Construction (សំណង់)" ${c.sector === 'Construction (សំណង់)' ? 'selected' : ''}>Construction</option>
                        <option value="Hospitality (សណ្ឋាគារ)" ${c.sector === 'Hospitality (សណ្ឋាគារ)' ? 'selected' : ''}>Hospitality</option>
                        <option value="Livestock Farming (ចិញ្ចឹមសត្វ)" ${c.sector === 'Livestock Farming (ចិញ្ចឹមសត្វ)' ? 'selected' : ''}>Livestock</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Japanese Level — កម្រិតភាសាជប៉ុន</label>
                    <select id="admin-candidate-level">
                        <option value="N5" ${c.level === 'N5' ? 'selected' : ''}>N5</option>
                        <option value="N4" ${c.level === 'N4' ? 'selected' : ''}>N4</option>
                        <option value="N3" ${c.level === 'N3' ? 'selected' : ''}>N3</option>
                        <option value="N2" ${c.level === 'N2' ? 'selected' : ''}>N2</option>
                    </select>
                </div>
            </div>
            <div class="grid-2">
                <div class="form-group">
                    <label>Age — កំណាយ</label>
                    <input type="text" id="admin-candidate-age" value="${c.age || ''}" placeholder="e.g. 25 Years">
                </div>
                <div class="form-group">
                    <label>Status — ស្ថានភាព</label>
                    <select id="admin-candidate-status">
                        <option value="Available" ${c.status === 'Available' ? 'selected' : ''}>Available</option>
                        <option value="Interviewing" ${c.status === 'Interviewing' ? 'selected' : ''}>Interviewing</option>
                        <option value="Selected" ${c.status === 'Selected' ? 'selected' : ''}>Selected</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Experience — ប្រជាប្រវត្តិការងារ</label>
                <input type="text" id="admin-candidate-experience" value="${c.experience || ''}" placeholder="e.g. 2 yrs Hospital Assistant">
            </div>
            <div class="form-group">
                <label>Driving License — សំណង់គ្រឿងចក្រ</label>
                <input type="text" id="admin-candidate-driving" value="${c.driving || ''}" placeholder="e.g. Yes (Car & Motorbike)">
            </div>
            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 0.5rem;">
                <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn">Save Changes</button>
            </div>
        </form>
    `;
    openModal(`Edit Candidate: ${c.name}`, html);
}

function handleAdminCandidateSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('admin-candidate-id').value;
    const candidates = getCandidates();
    const index = candidates.findIndex(c => c.id === id);
    if (index === -1) {
        showToast('Candidate not found', 'error');
        return;
    }

    const statusMap = {
        'Available': 'status-available',
        'Interviewing': 'status-interviewing',
        'Selected': 'status-selected'
    };

    candidates[index] = {
        ...candidates[index],
        name: document.getElementById('admin-candidate-name').value.trim(),
        sector: document.getElementById('admin-candidate-sector').value,
        level: document.getElementById('admin-candidate-level').value,
        age: document.getElementById('admin-candidate-age').value.trim(),
        status: document.getElementById('admin-candidate-status').value,
        statusClass: statusMap[document.getElementById('admin-candidate-status').value] || 'status-available',
        experience: document.getElementById('admin-candidate-experience').value.trim(),
        driving: document.getElementById('admin-candidate-driving').value.trim()
    };

    try { window.saveCandidates(candidates); } catch(err) { console.log('[SKMM] Supabase save deferred:', err.message); }
    closeModal();
    renderCandidates();
    renderAdminCandidatesTable();
    showToast(`Candidate "${candidates[index].name}" updated successfully!`);
}

function deleteAdminCandidate(candId) {
    const candidates = getCandidates();
    const c = candidates.find(cd => cd.id === candId);
    if (!c) return;

    if (confirm(`Are you sure you want to delete candidate "${c.name}"?`)) {
        const filtered = candidates.filter(cd => cd.id !== candId);
        try { window.saveCandidates(filtered); } catch(err) { console.log('[SKMM] Supabase save deferred:', err.message); }
        renderCandidates();
        renderAdminCandidatesTable();
        showToast(`Candidate "${c.name}" deleted.`);
    }
}

function openAddCandidate() {
    const html = `
        <form onsubmit="handleAddCandidate(event)">
            <h3 style="margin-bottom: 1rem; color: #0f172a; font-size: 1.25rem;">➕ Add New Candidate</h3>
            <div class="form-group">
                <label>Full Name — ឈ្មោះ *</label>
                <input type="text" id="admin-candidate-name" placeholder="e.g. Sokha M." required>
            </div>
            <div class="grid-2">
                <div class="form-group">
                    <label>Sector — វិស័យ *</label>
                    <select id="admin-candidate-sector" required>
                        <option value="Agriculture (កសិកម្ម)">Agriculture</option>
                        <option value="Caregiving (ថែទាំមនុស្សចាស់)">Caregiving</option>
                        <option value="Food Processing (ផលិតចំណីអាហារ)">Food Processing</option>
                        <option value="Construction (សំណង់)">Construction</option>
                        <option value="Hospitality (សណ្ឋាគារ)">Hospitality</option>
                        <option value="Livestock Farming (ចិញ្ចឹមសត្វ)">Livestock</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Japanese Level — កម្រិតភាសាជប៉ុន</label>
                    <select id="admin-candidate-level">
                        <option value="N5">N5</option>
                        <option value="N4" selected>N4</option>
                        <option value="N3">N3</option>
                        <option value="N2">N2</option>
                    </select>
                </div>
            </div>
            <div class="grid-2">
                <div class="form-group">
                    <label>Age — កំណាយ</label>
                    <input type="text" id="admin-candidate-age" placeholder="e.g. 25 Years">
                </div>
                <div class="form-group">
                    <label>Status — ស្ថានភាព</label>
                    <select id="admin-candidate-status">
                        <option value="Available" selected>Available</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Selected">Selected</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Experience — ប្រជាប្រវត្តិការងារ</label>
                <input type="text" id="admin-candidate-experience" placeholder="e.g. 2 yrs Hospital Assistant">
            </div>
            <div class="form-group">
                <label>Driving License — សំណង់គ្រឿងចក្រ</label>
                <input type="text" id="admin-candidate-driving" placeholder="e.g. Yes (Car & Motorbike)">
            </div>
            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 0.5rem;">
                <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn">Add Candidate</button>
            </div>
        </form>
    `;
    openModal('Add New Candidate — បន្ថែមបេក្ខជនថ្មី', html);
}

function handleAddCandidate(e) {
    e.preventDefault();
    const candidates = getCandidates();
    const statusMap = {
        'Available': 'status-available',
        'Interviewing': 'status-interviewing',
        'Selected': 'status-selected'
    };
    const newId = 'SKMM-' + (827 + candidates.length);
    const name = document.getElementById('admin-candidate-name').value.trim();
    const initials = name.split(' ').map(w => w[0] || '').join('').substring(0, 2).toUpperCase();

    const newCandidate = {
        id: newId,
        name: name,
        initials: initials,
        gender: 'unknown',
        level: document.getElementById('admin-candidate-level').value,
        category: 'general',
        sector: document.getElementById('admin-candidate-sector').value,
        age: document.getElementById('admin-candidate-age').value.trim(),
        experience: document.getElementById('admin-candidate-experience').value.trim(),
        driving: document.getElementById('admin-candidate-driving').value.trim(),
        video: 'Pending',
        status: document.getElementById('admin-candidate-status').value,
        statusClass: statusMap[document.getElementById('admin-candidate-status').value] || 'status-available'
    };

    candidates.push(newCandidate);
    try { window.saveCandidates(candidates); } catch(err) { console.log('[SKMM] Supabase save deferred:', err.message); }
    closeModal();
    renderCandidates();
    renderAdminCandidatesTable();
    showToast(`New candidate "${name}" added successfully!`);
}

// --- 18. HANABI Schedule & Enrollments ---
const DEFAULT_SCHEDULES = [
    {
        id: 'sched-1',
        courseName: 'Basic Foundation (N5)',
        targetLevel: 'Zero to JLPT N5',
        duration: '3 Months (300 hrs)',
        schedule: 'Mon - Fri (8:00 - 16:30)',
        tuitionFee: '$180 / course',
        sponsorship: 'Available'
    },
    {
        id: 'sched-2',
        courseName: 'SSW JFT-Basic A2 Intensive',
        targetLevel: 'N5 to JFT-Basic A2',
        duration: '3 Months (320 hrs)',
        schedule: 'Mon - Fri (8:00 - 17:00)',
        tuitionFee: '$220 / course',
        sponsorship: 'Employer Sponsored'
    },
    {
        id: 'sched-3',
        courseName: 'Intermediate Mastery (N4 - N3)',
        targetLevel: 'N4 to JLPT N3',
        duration: '4 Months (400 hrs)',
        schedule: 'Mon - Fri (8:00 - 17:00)',
        tuitionFee: '$250 / course',
        sponsorship: 'Partial Scholarship'
    },
    {
        id: 'sched-4',
        courseName: 'Caregiving Specialized Japanese',
        targetLevel: 'Care Terminology & Skills',
        duration: '2 Months (200 hrs)',
        schedule: 'Mon - Sat (8:00 - 16:30)',
        tuitionFee: '$160 / course',
        sponsorship: '100% Sponsored for Matched Candidates'
    }
];

function getSchedules() {
    try {
        const stored = localStorage.getItem('skmm_schedules');
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error('Error reading schedules', e);
    }
    saveSchedules(DEFAULT_SCHEDULES);
    return DEFAULT_SCHEDULES;
}

function saveSchedules(schedules) {
    try {
        localStorage.setItem('skmm_schedules', JSON.stringify(schedules));
    } catch (e) {
        console.error('Error saving schedules', e);
    }
}

function renderSchedules() {
    const hanabiScheduleBody = document.getElementById('hanabi-schedule-body');
    if (!hanabiScheduleBody) return;

    const schedules = getSchedules();
    hanabiScheduleBody.innerHTML = '';

    schedules.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${s.courseName || 'N/A'}</strong></td>
            <td>${s.targetLevel || 'N/A'}</td>
            <td>${s.duration || 'N/A'}</td>
            <td>${s.schedule || 'N/A'}</td>
            <td>${s.tuitionFee || 'N/A'}</td>
            <td><span class="status-badge status-available">${s.sponsorship || 'N/A'}</span></td>
        `;
        hanabiScheduleBody.appendChild(tr);
    });
}

const DEFAULT_ENROLLMENTS = [];

function getEnrollments() {
    try {
        const stored = localStorage.getItem('skmm_enrollments');
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error('Error reading enrollments', e);
    }
    saveEnrollments(DEFAULT_ENROLLMENTS);
    return DEFAULT_ENROLLMENTS;
}

function saveEnrollments(enrollments) {
    try {
        localStorage.setItem('skmm_enrollments', JSON.stringify(enrollments));
    } catch (e) {
        console.error('Error saving enrollments', e);
    }
}

// --- 19. Admin: Schedule & Enrollment Manager ---
function renderAdminScheduleTable() {
    const tbody = document.getElementById('admin-schedule-tbody');
    if (!tbody) return;

    const schedules = getSchedules();
    tbody.innerHTML = '';

    if (schedules.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:#64748b;">No courses found. Add one below.</td></tr>`;
        return;
    }

    schedules.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${s.courseName || 'N/A'}</strong></td>
            <td>${s.targetLevel || 'N/A'}</td>
            <td>${s.duration || 'N/A'}</td>
            <td>${s.schedule || 'N/A'}</td>
            <td>${s.tuitionFee || 'N/A'}</td>
            <td style="white-space:nowrap;">
                <button onclick="editAdminSchedule('${s.id}')" class="btn-outline" style="padding:4px 10px; font-size:0.75rem;">Edit</button>
                <button onclick="deleteSchedule('${s.id}')" class="btn" style="background:#ef4444; padding:4px 10px; font-size:0.75rem; margin-left:4px;">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editAdminSchedule(schedId) {
    const schedules = getSchedules();
    const s = schedules.find(sc => sc.id === schedId);
    if (!s) {
        showToast('Schedule not found', 'error');
        return;
    }

    const html = `
        <form onsubmit="handleAdminScheduleSubmit(event)">
            <input type="hidden" id="admin-schedule-id" value="${s.id}">
            <div class="grid-2">
                <div class="form-group">
                    <label>Course Name — វគ្គសិក្សា *</label>
                    <input type="text" id="admin-schedule-course" value="${s.courseName || ''}" required>
                </div>
                <div class="form-group">
                    <label>Target Level — កម្រិតគួរត្រូវ *</label>
                    <input type="text" id="admin-schedule-target" value="${s.targetLevel || ''}" required>
                </div>
            </div>
            <div class="grid-2">
                <div class="form-group">
                    <label>Duration — រយៈពេល</label>
                    <input type="text" id="admin-schedule-duration" value="${s.duration || ''}">
                </div>
                <div class="form-group">
                    <label>Class Schedule — កាលវិភាគ</label>
                    <input type="text" id="admin-schedule-class" value="${s.schedule || ''}">
                </div>
            </div>
            <div class="grid-2">
                <div class="form-group">
                    <label>Tuition Fee — តម្លៃ</label>
                    <input type="text" id="admin-schedule-tuition" value="${s.tuitionFee || ''}">
                </div>
                <div class="form-group">
                    <label>Sponsorship — ការជួយជាងត្រូវ</label>
                    <input type="text" id="admin-schedule-sponsor" value="${s.sponsorship || ''}">
                </div>
            </div>
            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 0.5rem;">
                <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn">Save Changes</button>
            </div>
        </form>
    `;
    openModal(`Edit Course: ${s.courseName}`, html);
}

function handleAdminScheduleSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('admin-schedule-id').value;
    const schedules = getSchedules();
    const index = schedules.findIndex(sc => sc.id === id);
    if (index === -1) {
        showToast('Schedule not found', 'error');
        return;
    }

    schedules[index] = {
        ...schedules[index],
        courseName: document.getElementById('admin-schedule-course').value.trim(),
        targetLevel: document.getElementById('admin-schedule-target').value.trim(),
        duration: document.getElementById('admin-schedule-duration').value.trim(),
        schedule: document.getElementById('admin-schedule-class').value.trim(),
        tuitionFee: document.getElementById('admin-schedule-tuition').value.trim(),
        sponsorship: document.getElementById('admin-schedule-sponsor').value.trim()
    };

    saveSchedules(schedules);
    closeModal();
    renderSchedules();
    renderAdminScheduleTable();
    showToast(`Course "${schedules[index].courseName}" updated!`);
}

function deleteSchedule(schedId) {
    const schedules = getSchedules();
    const s = schedules.find(sc => sc.id === schedId);
    if (!s) return;

    if (confirm(`Delete course "${s.courseName}"?`)) {
        const filtered = schedules.filter(sc => sc.id !== schedId);
        saveSchedules(filtered);
        renderSchedules();
        renderAdminScheduleTable();
        showToast(`Course "${s.courseName}" deleted.`);
    }
}

function openAddSchedule() {
    const html = `
        <form onsubmit="handleAddSchedule(event)">
            <h3 style="margin-bottom: 1rem; color: #0f172a; font-size: 1.25rem;">➕ Add New Course</h3>
            <div class="grid-2">
                <div class="form-group">
                    <label>Course Name — វគ្គសិក្សា *</label>
                    <input type="text" id="admin-schedule-course" placeholder="e.g. Advanced N2" required>
                </div>
                <div class="form-group">
                    <label>Target Level — កម្រិតគួរត្រូវ *</label>
                    <input type="text" id="admin-schedule-target" placeholder="e.g. JLPT N2" required>
                </div>
            </div>
            <div class="grid-2">
                <div class="form-group">
                    <label>Duration — រយៈពេល</label>
                    <input type="text" id="admin-schedule-duration" placeholder="e.g. 6 Months (600 hrs)">
                </div>
                <div class="form-group">
                    <label>Class Schedule — កាលវិភាគ</label>
                    <input type="text" id="admin-schedule-class" placeholder="e.g. Mon - Sat (8:00 - 17:00)">
                </div>
            </div>
            <div class="grid-2">
                <div class="form-group">
                    <label>Tuition Fee — តម្លៃ</label>
                    <input type="text" id="admin-schedule-tuition" placeholder="e.g. $300 / course">
                </div>
                <div class="form-group">
                    <label>Sponsorship — ការជួយជាងត្រូវ</label>
                    <input type="text" id="admin-schedule-sponsor" placeholder="e.g. Available">
                </div>
            </div>
            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 0.5rem;">
                <button type="button" class="btn-outline" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn">Add Course</button>
            </div>
        </form>
    `;
    openModal('Add New Course — បន្ថែមវគ្គថ្មី', html);
}

function handleAddSchedule(e) {
    e.preventDefault();
    const schedules = getSchedules();
    const newId = 'sched-' + (5 + schedules.length);
    const newSchedule = {
        id: newId,
        courseName: document.getElementById('admin-schedule-course').value.trim(),
        targetLevel: document.getElementById('admin-schedule-target').value.trim(),
        duration: document.getElementById('admin-schedule-duration').value.trim(),
        schedule: document.getElementById('admin-schedule-class').value.trim(),
        tuitionFee: document.getElementById('admin-schedule-tuition').value.trim(),
        sponsorship: document.getElementById('admin-schedule-sponsor').value.trim()
    };

    schedules.push(newSchedule);
    saveSchedules(schedules);
    closeModal();
    renderSchedules();
    renderAdminScheduleTable();
    showToast(`New course "${newSchedule.courseName}" added!`);
}

function renderAdminEnrollmentTable() {
    const tbody = document.getElementById('admin-enrollment-tbody');
    if (!tbody) return;

    const enrollments = getEnrollments();
    tbody.innerHTML = '';

    if (enrollments.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:#64748b;">No enrollments yet.</td></tr>`;
        return;
    }

    enrollments.forEach(en => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${en.name || 'N/A'}</strong></td>
            <td>${en.phone || 'N/A'}</td>
            <td><span class="pill-tag">${en.course || 'N/A'}</span></td>
            <td>${en.submittedAt || 'N/A'}</td>
            <td style="white-space:nowrap;">
                <button onclick="editEnrollment('${en.id}')" class="btn-outline" style="padding:4px 10px; font-size:0.75rem;">Edit</button>
                <button onclick="deleteEnrollment('${en.id}')" class="btn" style="background:#ef4444; padding:4px 10px; font-size:0.75rem; margin-left:4px;">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function viewEnrollment(enrId) {
    const enrollments = getEnrollments();
    const en = enrollments.find(e => e.id === enrId);
    if (!en) {
        showToast('Enrollment not found', 'error');
        return;
    }

    const html = `
        <div style="margin-bottom: 1rem;">
            <p style="font-size: 1.15rem; font-weight: 700; color: #0f172a;">${en.name || 'N/A'}</p>
            <span class="text-muted">#${en.id}</span>
        </div>
        <div style="margin-bottom: 1rem;">
            <h4 style="color: #0f172a; margin-bottom: 0.5rem;">Enrollment Details</h4>
            <ul style="padding-left: 1.25rem; color: #475569; font-size: 0.875rem; line-height: 1.8;">
                <li><strong>Phone:</strong> ${en.phone || 'N/A'}</li>
                <li><strong>Course:</strong> ${en.course || 'N/A'}</li>
                <li><strong>Japanese Knowledge:</strong> ${en.knowledge || 'N/A'}</li>
                <li><strong>Dormitory:</strong> ${en.dormitory || 'N/A'}</li>
                <li><strong>Career Goal:</strong> ${en.career || 'N/A'}</li>
                <li><strong>Submitted:</strong> ${en.submittedAt || 'N/A'}</li>
            </ul>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #f1f5f9; padding-top: 1rem;">
            <button type="button" class="btn" style="background:#ef4444;" onclick="deleteEnrollment('${en.id}')">Delete</button>
            <button type="button" class="btn-outline" onclick="closeModal()">Close</button>
        </div>
    `;
    openModal(`Enrollment: ${en.name || 'N/A'}`, html);
}

function deleteEnrollment(enrId) {
    const enrollments = getEnrollments();
    if (confirm('Delete this enrollment?')) {
        const filtered = enrollments.filter(e => e.id !== enrId);
        saveEnrollments(filtered);
        renderAdminEnrollmentTable();
        showToast('Enrollment deleted.');
    }
}

// --- 20. Admin: HANABI Manager ---
function initHANABIManager() {
    // Refresh data when HANABI tab is clicked
    const hanabiTab = document.querySelector('[data-target="admin-hanabi-section"]');
    if (hanabiTab) {
        hanabiTab.addEventListener('click', () => {
            renderAdminScheduleTable();
            renderAdminEnrollmentTable();
        });
    }

    // Sub-tab switching within HANABI section
    const hanabiSubTabs = document.querySelectorAll('.admin-hanabi-tab');
    if (hanabiSubTabs.length) {
        hanabiSubTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                hanabiSubTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const target = tab.getAttribute('data-target');
                document.querySelectorAll('.admin-hanabi-subsection').forEach(sub => sub.style.display = 'none');
                const targetEl = document.getElementById(target);
                if (targetEl) targetEl.style.display = 'block';
            });
        });
    }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();

    renderHomeJobs();
    renderJobPage();
    renderNewsPage();
    renderCandidates();
    renderSchedules();

    initJobFilter();
    initCandidateFilter();
    initNewsTabs();
    initGlobalForms();

    initAdminPortal();
    initHANABIManager();
    renderAdminCandidatesTable();
    renderAdminApplicationsTable();
    renderAdminInterviewTable();
    renderAdminPartnerTable();
    renderAdminScheduleTable();
    renderAdminEnrollmentTable();
    renderAdminInquiryTable();

    if (window.location.pathname.includes('admin')) {
        checkAdminAuth();
        startInactivityWatcher();
    }
});
