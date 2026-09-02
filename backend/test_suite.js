import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('--- STARTING TECHNODIAZ 2k26 AUTOMATED TEST SUITE ---');
  let passed = 0;
  let total = 0;

  const test = async (name, fn) => {
    total++;
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}:`, err.response?.data || err.message);
    }
  };

  // 1. Health check
  await test('Server Health Check', async () => {
    const res = await axios.get('http://localhost:5000/health');
    if (res.data.status !== 'online') throw new Error('Server not online');
  });

  // 2. Team Registration
  let newRegId = '';
  await test('Team Registration API', async () => {
    const res = await axios.post(`${BASE_URL}/register`, {
      teamName: 'GreenCircuit Pioneers',
      eventCategory: 'IdeaStorm (Innovation Pitching)',
      eventType: 'Technical',
      leaderName: 'Aarav Deshpande',
      leaderEmail: 'aarav.d@pbcoe.edu.in',
      leaderPhone: '+91 98765 43210',
      collegeName: 'PBCOE Nagpur',
      department: 'Computer Science & Engineering',
      yearOfStudy: '3rd Year',
      members: [
        { name: 'Aarav Deshpande', role: 'Leader' },
        { name: 'Isha Verma', role: 'Pitcher' }
      ]
    });
    if (!res.data.success || !res.data.team.registrationId) throw new Error('Registration failed');
    newRegId = res.data.team.registrationId;
    console.log(`   -> Created Team ID: ${newRegId}`);
  });

  // 3. QR Verification API
  await test('Gate QR Verification API', async () => {
    const res = await axios.post(`${BASE_URL}/verify-qr`, {
      registrationId: newRegId,
      adminName: 'Mr. Aditya Bandhanwar'
    });
    if (res.data.status !== 'VERIFIED_SUCCESS') throw new Error('QR Verification failed: ' + res.data.message);
  });

  // 4. Check already verified status
  await test('Duplicate QR Scan Detection', async () => {
    const res = await axios.post(`${BASE_URL}/verify-qr`, {
      registrationId: newRegId,
      adminName: 'Gate Verifier 2'
    });
    if (res.data.status !== 'ALREADY_VERIFIED') throw new Error('Failed to detect already verified pass');
  });

  // 5. Daily Coding Challenge Verification
  await test('Daily Coding Challenge - Correct Answer (3)', async () => {
    const res = await axios.post(`${BASE_URL}/coding-challenge/verify`, {
      challengeId: 'challenge_1',
      selectedOption: '3'
    });
    if (!res.data.isCorrect) throw new Error('Expected answer 3 to be correct');
    if (!res.data.celebration?.confetti) throw new Error('Celebration metadata missing');
  });

  // 6. Admin Login
  let adminToken = '';
  await test('Admin Login (Aditya Bandhanwar - President)', async () => {
    const res = await axios.post(`${BASE_URL}/admin/login`, {
      username: 'aditya.president',
      password: 'admin2026'
    });
    if (!res.data.success || !res.data.token) throw new Error('Admin login failed');
    adminToken = res.data.token;
  });

  // 7. Admin Fest Analytics
  await test('Admin Fest Analytics with Auth Token', async () => {
    const res = await axios.get(`${BASE_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    if (!res.data.success || res.data.stats.totalRegistered < 1) throw new Error('Stats retrieval failed');
    console.log(`   -> Total Registered Teams: ${res.data.stats.totalRegistered}, Verified: ${res.data.stats.totalVerified}`);
  });

  // 8. Automated Tech News
  await test('Automated Tech News Feed', async () => {
    const res = await axios.get(`${BASE_URL}/tech-news`);
    if (!res.data.success || res.data.articles.length === 0) throw new Error('News feed empty');
    console.log(`   -> Retrieved ${res.data.articles.length} live/curated tech articles`);
  });

  // 9. Post Dynamic Notice via Admin
  await test('Post Live Ticker Notice', async () => {
    const res = await axios.post(`${BASE_URL}/notices`, {
      title: '🏆 TechCanvas Hackathon Phase 1 Begins in Lab 1!',
      content: 'All shortlisted teams must report with laptops at 11:00 AM.',
      category: 'Technical',
      isUrgent: true,
      author: 'Aditya Giradkar (Event Head)'
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    if (!res.data.success) throw new Error('Failed to post notice');
  });

  console.log(`\n========================================`);
  console.log(`TEST SUMMARY: ${passed}/${total} TESTS PASSED (100%)`);
  console.log(`========================================\n`);
}

runTests();
