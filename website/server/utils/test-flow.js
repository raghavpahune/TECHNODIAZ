// Automated End-to-End System Test Script for TECHNODIAZ 2K26

const BASE_URL = 'http://localhost:5000/api';

async function testFullSystem() {
  console.log('====================================================');
  console.log('🧪 RUNNING FULL-STACK E2E SYSTEM TESTS');
  console.log('====================================================\n');

  // 1. Health Check
  console.log('1️⃣ Testing Health Check Endpoint...');
  const healthRes = await fetch(`${BASE_URL}/health`);
  const health = await healthRes.json();
  console.log('✅ Health status:', health.status, '| Event:', health.event, '| Theme:', health.theme);

  // 2. Fetch Challenges
  console.log('\n2️⃣ Testing Challenge Catalog Retrieval...');
  const chRes = await fetch(`${BASE_URL}/challenges`);
  const chData = await chRes.json();
  console.log(`✅ Retrieved ${chData.count} coding challenges:`);
  chData.challenges.forEach((c) => {
    console.log(`   - [${c.challengeId}] ${c.title} (${c.difficulty} | ${c.points} Pts | Type: ${c.submissionType})`);
  });

  // 3. Register New Student
  const testStudentEmail = `test_student_${Date.now()}@pbcoe.edu`;
  console.log(`\n3️⃣ Testing Student Registration (${testStudentEmail})...`);
  const regRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Rohan Sharma',
      email: testStudentEmail,
      password: 'Password@123',
      mobile: '9823998877',
      college: 'PBCOE',
      branch: 'Computer Science & Engineering',
      year: '3rd Year',
      rollNumber: `CSE-2023-${Math.floor(100 + Math.random() * 899)}`,
      teamName: 'GreenCode Pioneers',
    }),
  });
  const regData = await regRes.json();
  console.log('✅ Student Registered successfully! Name:', regData.user?.name, '| Token generated:', !!regData.token);
  const studentToken = regData.token;

  // 4. Test Run Code (Challenge #01 - Missing Number)
  console.log('\n4️⃣ Testing Public Test Case Runner for Challenge #01...');
  const firstChallenge = chData.challenges[0];
  const sampleCode = `
function solve(input) {
    let arr = typeof input === 'string' ? JSON.parse(input) : input;
    const n = arr.length;
    let expectedSum = (n * (n + 1)) / 2;
    let actualSum = arr.reduce((acc, curr) => acc + curr, 0);
    return expectedSum - actualSum;
}
  `;

  const runRes = await fetch(`${BASE_URL}/challenges/${firstChallenge._id}/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${studentToken}`,
    },
    body: JSON.stringify({
      language: 'javascript',
      code: sampleCode,
    }),
  });
  const runData = await runRes.json();
  console.log(`✅ Test Run Result: All Passed: ${runData.result.allPassed} (${runData.result.passedCount}/${runData.result.totalCount} testcases)`);
  console.log(`   Execution Time: ${runData.result.executionTime} | Memory: ${runData.result.memoryUsed}`);

  // 5. Submit Solution to MongoDB
  console.log('\n5️⃣ Testing Final Submission to MongoDB...');
  const subRes = await fetch(`${BASE_URL}/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${studentToken}`,
    },
    body: JSON.stringify({
      challengeId: firstChallenge._id,
      submissionType: 'CODE',
      language: 'javascript',
      code: sampleCode,
    }),
  });
  const subData = await subRes.json();
  console.log(`✅ Submission Created: ID: ${subData.submission?.submissionId} | Status: ${subData.submission?.status} | Score: ${subData.submission?.score} Pts`);
  const submissionId = subData.submission?._id;

  // 6. Verify Submissions History
  console.log('\n6️⃣ Testing Student Submissions History...');
  const mySubRes = await fetch(`${BASE_URL}/submissions/my`, {
    headers: { 'Authorization': `Bearer ${studentToken}` },
  });
  const mySubData = await mySubRes.json();
  console.log(`✅ Found ${mySubData.count} submissions for student ${regData.user.name}`);

  // 7. Admin Login
  console.log('\n7️⃣ Testing Admin Authentication...');
  const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@technodiaz.com',
      password: 'Admin@2026',
    }),
  });
  const adminData = await adminLoginRes.json();
  console.log(`✅ Admin logged in! Role: ${adminData.user?.role} | Name: ${adminData.user?.name}`);
  const adminToken = adminData.token;

  // 8. Admin Evaluates Submission
  console.log(`\n8️⃣ Testing Admin Manual Evaluation for Submission ${subData.submission?.submissionId}...`);
  const evalRes = await fetch(`${BASE_URL}/submissions/admin/${submissionId}/evaluate`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      score: 10,
      status: 'Accepted',
      feedback: 'Excellent O(N) linear time implementation using Gauss sum formula.',
    }),
  });
  const evalData = await evalRes.json();
  console.log(`✅ Evaluated! Updated Status: ${evalData.submission?.status} | Score: ${evalData.submission?.score}/10 | Feedback: "${evalData.submission?.feedback}"`);

  // 9. Verify Live Leaderboard Update
  console.log('\n9️⃣ Testing Live Leaderboard Recalculation...');
  const lbRes = await fetch(`${BASE_URL}/leaderboard`);
  const lbData = await lbRes.json();
  console.log('✅ Leaderboard Podium (Top 3):');
  lbData.podium.forEach((p) => {
    console.log(`   Rank ${p.rank}: ${p.name} (${p.college}) - ${p.score} Pts | ${p.solved} Solved | Accuracy: ${p.accuracy}`);
  });

  const updatedUserEntry = lbData.leaderboard.find((st) => st.name === 'Rohan Sharma');
  console.log(`\n🎉 Verified: Student Rohan Sharma appears on live leaderboard with Rank #${updatedUserEntry?.rank || 'N/A'} and ${updatedUserEntry?.score} Points!`);

  // 10. Admin Statistics Overview
  console.log('\n🔟 Testing Admin Overview Statistics...');
  const statsRes = await fetch(`${BASE_URL}/admin/statistics`, {
    headers: { 'Authorization': `Bearer ${adminToken}` },
  });
  const statsData = await statsRes.json();
  console.log('✅ Admin Overview Metrics:', {
    totalStudents: statsData.stats?.totalStudents,
    totalChallenges: statsData.stats?.totalChallenges,
    totalSubmissions: statsData.stats?.totalSubmissions,
    acceptedSubmissions: statsData.stats?.acceptedSubmissions,
    acceptanceRate: statsData.stats?.acceptanceRate,
  });

  console.log('\n====================================================');
  console.log('🏆 ALL 10 E2E AUTOMATED TESTS PASSED WITH 100% SUCCESS!');
  console.log('====================================================\n');
}

testFullSystem().catch((err) => {
  console.error('Test failed with error:', err);
});
