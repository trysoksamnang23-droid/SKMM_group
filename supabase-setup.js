/* ===================================================================
   SKMM Web - Supabase Integration
   Loads AFTER script.js - overrides localStorage functions with Supabase
   =================================================================== */

(function () {
  'use strict';

  var SUPABASE_URL = (typeof supabaseConfig !== 'undefined') ? supabaseConfig.supabaseUrl : '';
  var SUPABASE_KEY = (typeof supabaseConfig !== 'undefined') ? supabaseConfig.supabaseAnonKey : '';
  var SUPABASE_ENABLED = SUPABASE_URL && SUPABASE_URL !== '' && SUPABASE_KEY && SUPABASE_KEY !== '' && SUPABASE_KEY !== 'YOUR_ANON_KEY_HERE';

  if (!SUPABASE_ENABLED) {
    console.log('[SKMM Supabase] Not configured - running in localStorage mode.');
    return;
  }

  if (typeof supabase === 'undefined') {
    console.error('[SKMM Supabase] Supabase SDK not loaded!');
    return;
  }

  var supabaseClient = null;
  var SYNC_COMPLETE = {};

  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('[SKMM Supabase] Client created');
  } catch (e) {
    console.error('[SKMM Supabase] Failed to create client:', e);
    return;
  }

  console.log('[SKMM Supabase] Initialized');

  function getLocal(key) {
    try {
      var stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
    } catch (e) { }
    return null;
  }

  function setLocal(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) { }
  }

  async function syncFromSupabase(table, storageKey, defaults) {
    if (SYNC_COMPLETE[table]) return;
    SYNC_COMPLETE[table] = true;

    try {
      var result = await supabaseClient.from(table).select('*');

      if (result.error) {
        console.error('[SKMM Supabase] Error syncing ' + table + ':', result.error.message);
        SYNC_COMPLETE[table] = false;
        return;
      }

      if (result.data && result.data.length > 0) {
        setLocal(storageKey, result.data);
        triggerRerender(table);
      } else if (defaults) {
        var insertResult = await supabaseClient.from(table).insert(defaults);
        if (!insertResult.error) {
          setLocal(storageKey, defaults);
          triggerRerender(table);
        } else {
          console.error('[SKMM Supabase] Insert defaults error for ' + table + ':', insertResult.error.message);
        }
      }
    } catch (e) {
      console.error('[SKMM Supabase] Sync error for ' + table + ':', e);
      SYNC_COMPLETE[table] = false;
    }
  }

  async function refreshFromSupabase(table, storageKey) {
    try {
      var result = await supabaseClient.from(table).select('*');
      if (!result.error && result.data) {
        setLocal(storageKey, result.data);
        triggerRerender(table);
      }
    } catch (e) {
      console.error('[SKMM Supabase] Refresh error for ' + table + ':', e);
    }
  }

  async function upsertToSupabase(table, data, idField) {
    console.log('[SKMM Supabase] upsertToSupabase:', table);
    if (!supabaseClient) {
      console.error('[SKMM Supabase] Client is null - cannot upsert to', table);
      return;
    }
    try {
      var items = Array.isArray(data) ? data : [data];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var id = item[idField || 'id'];
        var result;
        if (id) {
          result = await supabaseClient.from(table).upsert(item);
        } else {
          result = await supabaseClient.from(table).insert(item);
        }
        if (result.error) {
          console.error('[SKMM Supabase] Upsert error for ' + table + ':', result.error.message, JSON.stringify(item));
        } else {
          console.log('[SKMM Supabase] Upserted to', table, id || '(new)');
        }
      }
    } catch (e) {
      console.error('[SKMM Supabase] Upsert exception for ' + table + ':', e);
    }
  }

  async function deleteFromSupabase(table, idField, ids) {
    if (!supabaseClient) {
      console.error('[SKMM Supabase] Client is null - cannot delete from', table);
      return;
    }
    try {
      for (var i = 0; i < ids.length; i++) {
        var result = await supabaseClient.from(table).delete().eq(idField, ids[i]);
        if (result.error) {
          console.error('[SKMM Supabase] Delete error:', result.error.message, ids[i]);
        } else {
          console.log('[SKMM Supabase] Deleted from', table, ids[i]);
        }
      }
    } catch (e) {
      console.error('[SKMM Supabase] Delete exception for ' + table + ':', e);
    }
  }

  function subscribeToTable(table, storageKey) {
    if (!supabaseClient) return;
    try {
      var channel = supabaseClient.channel('table-' + table);
      channel.on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: table
      }, function (payload) {
        console.log('[SKMM Supabase] Real-time update:', table, payload.eventType);
        refreshFromSupabase(table, storageKey);
      }).subscribe();
      console.log('[SKMM Supabase] Subscribed to', table);
    } catch (e) {
      console.warn('[SKMM Supabase] Subscription error for ' + table + ':', e.message);
    }
  }

  var isInitialSync = true;

  console.log('[SKMM Supabase] Script loaded, starting setup...');

  function triggerRerender(table) {
    setTimeout(function () {
      var event = new CustomEvent('skmm-supabase-update', { detail: { table: table } });
      window.dispatchEvent(event);

      setTimeout(function () {
        if (table === 'jobs' || table === 'news' || table === 'candidates' || table === 'hanabi_schedules') {
          if (typeof renderHomeJobs === 'function') renderHomeJobs();
          if (typeof renderJobPage === 'function') renderJobPage();
          if (typeof renderNewsPage === 'function') renderNewsPage();
          if (typeof renderCandidates === 'function') renderCandidates();
          if (typeof renderSchedules === 'function') renderSchedules();
        }
        if (document.location.pathname.includes('admin')) {
          setTimeout(function () {
            if (typeof renderAdminJobsTable === 'function') renderAdminJobsTable();
            if (typeof renderAdminNewsTable === 'function') renderAdminNewsTable();
            if (typeof renderAdminCandidatesTable === 'function') renderAdminCandidatesTable();
            if (typeof renderAdminApplicationsTable === 'function') renderAdminApplicationsTable();
            if (typeof renderAdminInterviewTable === 'function') renderAdminInterviewTable();
            if (typeof renderAdminPartnerTable === 'function') renderAdminPartnerTable();
            if (typeof renderAdminScheduleTable === 'function') renderAdminScheduleTable();
            if (typeof renderAdminEnrollmentTable === 'function') renderAdminEnrollmentTable();
            if (typeof renderAdminInquiryTable === 'function') renderAdminInquiryTable();
          }, 300);
        } else if (!isInitialSync) {
          console.log('[SKMM Supabase] Data updated on', table, '(no reload)');
          if (typeof renderHomeJobs === 'function') renderHomeJobs();
          if (typeof renderJobPage === 'function') renderJobPage();
          if (typeof renderNewsPage === 'function') renderNewsPage();
          if (typeof renderCandidates === 'function') renderCandidates();
          if (typeof renderSchedules === 'function') renderSchedules();
        }
      }, 200);
    }, 100);
  }

  // ====================== OVERRIDE: JOBS ======================
  function getJobs() {
    var cached = getLocal('skmm_jobs');
    if (cached && cached.length > 0) return cached;
    var defaults = DEFAULT_JOBS;
    setLocal('skmm_jobs', defaults);
    return defaults;
  }

  async function saveJobs(jobs) {
    console.log('[SKMM Supabase] saveJobs called with', jobs.length, 'jobs');
    setLocal('skmm_jobs', jobs);
    try {
      console.log('[SKMM Supabase] Calling upsertToSupabase...');
      await upsertToSupabase('jobs', jobs, 'id');
      console.log('[SKMM Supabase] Upsert done');
    } catch (e) {
      console.error('[SKMM Supabase] saveJobs error:', e);
    }
    triggerRerender('jobs');
  }

  async function deleteAdminJob(id) {
    var jobs = getJobs().filter(function (j) { return j.id !== id; });
    saveJobs(jobs);
    await deleteFromSupabase('jobs', 'id', [id]);
  }

  // ====================== OVERRIDE: NEWS ======================
  function getNews() {
    var cached = getLocal('skmm_news');
    if (cached && cached.length > 0) return cached;
    var defaults = DEFAULT_NEWS;
    setLocal('skmm_news', defaults);
    return defaults;
  }

  async function saveNews(newsList) {
    setLocal('skmm_news', newsList);
    await upsertToSupabase('news', newsList, 'id');
    triggerRerender('news');
  }

  async function deleteAdminNews(id) {
    var newsList = getNews().filter(function (n) { return n.id !== id; });
    saveNews(newsList);
    await deleteFromSupabase('news', 'id', [id]);
  }

  // ====================== OVERRIDE: CANDIDATES ======================
  function getCandidates() {
    var cached = getLocal('skmm_candidates');
    if (cached && cached.length > 0) return cached;
    var defaults = DEFAULT_CANDIDATES;
    setLocal('skmm_candidates', defaults);
    return defaults;
  }

  async function saveCandidates(candidates) {
    setLocal('skmm_candidates', candidates);
    await upsertToSupabase('candidates', candidates, 'id');
    triggerRerender('candidates');
  }

  async function deleteAdminCandidate(candId) {
    var candidates = getCandidates().filter(function (c) { return c.id !== candId; });
    saveCandidates(candidates);
    await deleteFromSupabase('candidates', 'id', [candId]);
  }

  // ====================== OVERRIDE: SCHEDULES ======================
  function getSchedules() {
    var cached = getLocal('skmm_schedules');
    if (cached && cached.length > 0) return cached;
    var defaults = DEFAULT_SCHEDULES;
    setLocal('skmm_schedules', defaults);
    return defaults;
  }

  async function saveSchedules(schedules) {
    setLocal('skmm_schedules', schedules);
    await upsertToSupabase('hanabi_schedules', schedules, 'id');
    triggerRerender('hanabi_schedules');
  }

  async function deleteSchedule(schedId) {
    var schedules = getSchedules().filter(function (s) { return s.id !== schedId; });
    saveSchedules(schedules);
    await deleteFromSupabase('hanabi_schedules', 'id', [schedId]);
  }

  // ====================== OVERRIDE: APPLICATIONS ======================
  function getApplications() {
    var cached = getLocal('skmm_applications');
    if (cached) return cached;
    setLocal('skmm_applications', DEFAULT_APPLICATIONS);
    return DEFAULT_APPLICATIONS;
  }

  async function saveApplications(apps) {
    setLocal('skmm_applications', apps);
    await upsertToSupabase('applications', apps, 'id');
    triggerRerender('applications');
  }

  async function deleteApplication(appId) {
    var apps = getApplications().filter(function (a) { return a.id !== appId; });
    saveApplications(apps);
    await deleteFromSupabase('applications', 'id', [appId]);
  }

  // ====================== OVERRIDE: INTERVIEW REQUESTS ======================
  function getInterviewRequests() {
    var cached = getLocal('skmm_interview_requests');
    if (cached) return cached;
    setLocal('skmm_interview_requests', DEFAULT_INTERVIEW_REQUESTS);
    return DEFAULT_INTERVIEW_REQUESTS;
  }

  async function saveInterviewRequests(requests) {
    setLocal('skmm_interview_requests', requests);
    await upsertToSupabase('interview_requests', requests, 'id');
    triggerRerender('interview_requests');
  }

  async function deleteInterviewRequest(reqId) {
    var requests = getInterviewRequests().filter(function (r) { return r.id !== reqId; });
    saveInterviewRequests(requests);
    await deleteFromSupabase('interview_requests', 'id', [reqId]);
  }

  // ====================== OVERRIDE: PARTNER REQUESTS ======================
  function getPartnerRequests() {
    var cached = getLocal('skmm_partner_requests');
    if (cached) return cached;
    setLocal('skmm_partner_requests', DEFAULT_PARTNER_REQUESTS);
    return DEFAULT_PARTNER_REQUESTS;
  }

  async function savePartnerRequests(requests) {
    setLocal('skmm_partner_requests', requests);
    await upsertToSupabase('partner_requests', requests, 'id');
    triggerRerender('partner_requests');
  }

  async function deletePartnerRequest(reqId) {
    var requests = getPartnerRequests().filter(function (r) { return r.id !== reqId; });
    savePartnerRequests(requests);
    await deleteFromSupabase('partner_requests', 'id', [reqId]);
  }

  // ====================== OVERRIDE: CONTACT INQUIRIES ======================
  function getInquiries() {
    var cached = getLocal('skmm_inquiries');
    if (cached) return cached;
    setLocal('skmm_inquiries', DEFAULT_CONTACT_INQUIRIES);
    return DEFAULT_CONTACT_INQUIRIES;
  }

  async function saveInquiries(inquiries) {
    setLocal('skmm_inquiries', inquiries);
    await upsertToSupabase('contact_inquiries', inquiries, 'id');
    triggerRerender('contact_inquiries');
  }

  async function deleteInquiry(inqId) {
    var inquiries = getInquiries().filter(function (i) { return i.id !== inqId; });
    saveInquiries(inquiries);
    await deleteFromSupabase('contact_inquiries', 'id', [inqId]);
  }

  // ====================== OVERRIDE: ENROLLMENTS ======================
  function getEnrollments() {
    var cached = getLocal('skmm_enrollments');
    if (cached) return cached;
    setLocal('skmm_enrollments', DEFAULT_ENROLLMENTS);
    return DEFAULT_ENROLLMENTS;
  }

  async function saveEnrollments(enrollments) {
    setLocal('skmm_enrollments', enrollments);
    await upsertToSupabase('hanabi_enrollments', enrollments, 'id');
    triggerRerender('hanabi_enrollments');
  }

  // ====================== OVERRIDE: AUTH ======================
  var ADMIN_USERNAME = 'SKMMadmin@soksamnang';
  var ADMIN_PASSWORD = 'NOattackHERE@123';
  var AUTH_KEY = 'skmm_admin_session';
  var LOCKOUT_SECONDS = 30;

  function isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) === 'skmm_admin_active';
  }

  function authenticate(username, password) {
    console.log('[SKMM Supabase] authenticate:', username);
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'skmm_admin_active');
      console.log('[SKMM Supabase] Authenticated');
      // Background: try to set up Supabase Auth user
      if (supabaseClient) {
        supabaseClient.auth.signUp({
          email: 'admin@skmm.com',
          password: ADMIN_PASSWORD
        }).then(function(result) {
          if (result.error && result.error.message !== 'User already registered') {
            console.warn('[SKMM Supabase] Auth signup:', result.error.message);
          }
        }).catch(function() {});
      }
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    try {
      supabaseClient.auth.signOut();
    } catch (e) { }
  }

  function resetAllDataToDefault() {
    if (!confirm('Are you sure you want to reset all data to defaults?')) return;

    saveJobs(DEFAULT_JOBS);
    saveNews(DEFAULT_NEWS);
    saveCandidates(DEFAULT_CANDIDATES);
    saveSchedules(DEFAULT_SCHEDULES);
    saveApplications(DEFAULT_APPLICATIONS);
    saveInterviewRequests(DEFAULT_INTERVIEW_REQUESTS);
    savePartnerRequests(DEFAULT_PARTNER_REQUESTS);
    saveInquiries(DEFAULT_CONTACT_INQUIRIES);
    saveEnrollments(DEFAULT_ENROLLMENTS);

    syncAllFromSupabase();
  }

  async function syncAllFromSupabase() {
    SYNC_COMPLETE = {};
    await syncFromSupabase('jobs', 'skmm_jobs', DEFAULT_JOBS);
    await syncFromSupabase('news', 'skmm_news', DEFAULT_NEWS);
    await syncFromSupabase('candidates', 'skmm_candidates', DEFAULT_CANDIDATES);
    await syncFromSupabase('hanabi_schedules', 'skmm_schedules', DEFAULT_SCHEDULES);
    await syncFromSupabase('applications', 'skmm_applications', DEFAULT_APPLICATIONS);
    await syncFromSupabase('interview_requests', 'skmm_interview_requests', DEFAULT_INTERVIEW_REQUESTS);
    await syncFromSupabase('partner_requests', 'skmm_partner_requests', DEFAULT_PARTNER_REQUESTS);
    await syncFromSupabase('contact_inquiries', 'skmm_inquiries', DEFAULT_CONTACT_INQUIRIES);
    await syncFromSupabase('hanabi_enrollments', 'skmm_enrollments', DEFAULT_ENROLLMENTS);
  }

  // ====================== INITIALIZATION ======================
  document.addEventListener('DOMContentLoaded', async function () {
    await syncAllFromSupabase();
    isInitialSync = false;

    subscribeToTable('jobs', 'skmm_jobs');
    subscribeToTable('news', 'skmm_news');
    subscribeToTable('candidates', 'skmm_candidates');
    subscribeToTable('hanabi_schedules', 'skmm_schedules');
    subscribeToTable('applications', 'skmm_applications');
    subscribeToTable('interview_requests', 'skmm_interview_requests');
    subscribeToTable('partner_requests', 'skmm_partner_requests');
    subscribeToTable('contact_inquiries', 'skmm_inquiries');
    subscribeToTable('hanabi_enrollments', 'skmm_enrollments');

    console.log('[SKMM Supabase] All tables synced and real-time subscriptions active');
  });

  window.addEventListener('skmm-supabase-update', function (e) {
    console.log('[SKMM Supabase] Update received for:', e.detail.table);
  });

  window.saveJobs = saveJobs;
  window.getJobs = getJobs;
  window.saveNews = saveNews;
  window.getNews = getNews;
  window.saveCandidates = saveCandidates;
  window.getCandidates = getCandidates;
  window.saveSchedules = saveSchedules;
  window.getSchedules = getSchedules;
  window.saveApplications = saveApplications;
  window.getApplications = getApplications;
  window.saveInterviewRequests = saveInterviewRequests;
  window.getInterviewRequests = getInterviewRequests;
  window.savePartnerRequests = savePartnerRequests;
  window.getPartnerRequests = getPartnerRequests;
  window.saveInquiries = saveInquiries;
  window.getInquiries = getInquiries;
  window.saveEnrollments = saveEnrollments;
  window.getEnrollments = getEnrollments;
  window.deleteAdminJob = deleteAdminJob;
  window.deleteAdminNews = deleteAdminNews;
  window.deleteAdminCandidate = deleteAdminCandidate;
  window.deleteSchedule = deleteSchedule;
  window.deleteApplication = deleteApplication;
  window.deleteInterviewRequest = deleteInterviewRequest;
  window.deletePartnerRequest = deletePartnerRequest;
  window.deleteInquiry = deleteInquiry;
  window.isAuthenticated = isAuthenticated;
  window.authenticate = authenticate;
  window.logout = logout;
  window.resetAllDataToDefault = resetAllDataToDefault;
  window.syncAllFromSupabase = syncAllFromSupabase;

})();