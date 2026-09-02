/**
 * Technodiaz 2K26 - Admin / Organizer Review Dashboard Logic
 * Department of Computer Science & Engineering
 */

const STORAGE_KEY = 'technodiaz_2k26_submissions';
const ADMIN_PASSCODE = 'technodiaz2026';
let allSubmissions = [];

document.addEventListener('DOMContentLoaded', () => {
  checkAdminAuth();
  loadSubmissions();
  setupAdminListeners();
});

function checkAdminAuth() {
  const isAuth = sessionStorage.getItem('tdz_admin_auth');
  const authGate = document.getElementById('admin-auth-gate');
  const adminContent = document.getElementById('admin-main-content');

  if (isAuth === 'true') {
    if (authGate) authGate.style.display = 'none';
    if (adminContent) adminContent.style.display = 'block';
  } else {
    if (authGate) authGate.style.display = 'flex';
    if (adminContent) adminContent.style.display = 'none';
  }
}

function handleLogin() {
  const passInput = document.getElementById('admin-passcode');
  const errEl = document.getElementById('auth-error-msg');
  if (!passInput) return;

  if (passInput.value === ADMIN_PASSCODE) {
    sessionStorage.setItem('tdz_admin_auth', 'true');
    if (errEl) errEl.style.display = 'none';
    checkAdminAuth();
    loadSubmissions();
  } else {
    if (errEl) {
      errEl.textContent = 'Incorrect Passcode! Hint: Default is technodiaz2026';
      errEl.style.display = 'block';
    }
  }
}

function handleLogout() {
  sessionStorage.removeItem('tdz_admin_auth');
  checkAdminAuth();
}

function loadSubmissions() {
  try {
    allSubmissions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (e) {
    allSubmissions = [];
  }
  renderDashboardMetrics();
  renderSubmissionsTable(allSubmissions);
}

function renderDashboardMetrics() {
  const totalEl = document.getElementById('stat-total-submissions');
  const correctEl = document.getElementById('stat-correct-answers');
  const accuracyEl = document.getElementById('stat-accuracy-rate');
  const topDeptEl = document.getElementById('stat-top-dept');

  const total = allSubmissions.length;
  const correct = allSubmissions.filter(s => s.isCorrect).length;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  // Compute top department
  const deptCounts = {};
  allSubmissions.forEach(s => {
    deptCounts[s.dept] = (deptCounts[s.dept] || 0) + 1;
  });
  let topDept = 'N/A';
  let maxCount = 0;
  for (const dept in deptCounts) {
    if (deptCounts[dept] > maxCount) {
      maxCount = deptCounts[dept];
      topDept = dept;
    }
  }

  if (totalEl) totalEl.textContent = total;
  if (correctEl) correctEl.textContent = correct;
  if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;
  if (topDeptEl) topDeptEl.textContent = topDept;
}

function renderSubmissionsTable(list) {
  const tbody = document.getElementById('submissions-tbody');
  const countBadge = document.getElementById('table-count-badge');
  if (!tbody) return;

  if (countBadge) countBadge.textContent = `${list.length} Records`;
  tbody.innerHTML = '';

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem; color: #94a3b8;">No submissions match current filters.</td></tr>`;
    return;
  }

  list.forEach(sub => {
    const tr = document.createElement('tr');
    const timeStr = new Date(sub.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date(sub.timestamp).toLocaleDateString();
    
    tr.innerHTML = `
      <td><span style="font-family: var(--font-code); color: var(--neon-green); font-weight: 700;">${sub.id}</span></td>
      <td><strong>${escapeHtml(sub.name)}</strong></td>
      <td><span style="font-family: var(--font-code);">${escapeHtml(sub.rollNo)}</span></td>
      <td>${escapeHtml(sub.dept)} (${escapeHtml(sub.year)})</td>
      <td>
        <span class="status-tag ${sub.isCorrect ? 'status-correct' : 'status-incorrect'}">
          ${sub.isCorrect ? '✓ Correct (' + sub.answer + ')' : '✗ ' + sub.answer}
        </span>
      </td>
      <td><span style="font-size: 0.8rem; color: var(--text-muted);">${timeStr}</span></td>
      <td>
        <button class="btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;" onclick="viewDetailModal('${sub.id}')">
          Details
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function setupAdminListeners() {
  const loginBtn = document.getElementById('btn-admin-login');
  const passInput = document.getElementById('admin-passcode');
  const searchInput = document.getElementById('search-participants');
  const filterDept = document.getElementById('filter-dept');
  const filterStatus = document.getElementById('filter-status');
  const exportBtn = document.getElementById('btn-export-csv');
  const raffleBtn = document.getElementById('btn-open-raffle');
  const clearBtn = document.getElementById('btn-clear-data');
  const logoutBtn = document.getElementById('btn-admin-logout');

  if (loginBtn) loginBtn.addEventListener('click', handleLogin);
  if (passInput) {
    passInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleLogin();
    });
  }
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

  // Search and Filtering
  const applyFilters = () => {
    const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const dept = filterDept ? filterDept.value : 'ALL';
    const status = filterStatus ? filterStatus.value : 'ALL';

    const filtered = allSubmissions.filter(sub => {
      const matchQuery = !q || sub.name.toLowerCase().includes(q) || sub.rollNo.toLowerCase().includes(q) || sub.id.toLowerCase().includes(q);
      const matchDept = dept === 'ALL' || sub.dept === dept;
      const matchStatus = status === 'ALL' || (status === 'CORRECT' && sub.isCorrect) || (status === 'INCORRECT' && !sub.isCorrect);
      return matchQuery && matchDept && matchStatus;
    });

    renderSubmissionsTable(filtered);
  };

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (filterDept) filterDept.addEventListener('change', applyFilters);
  if (filterStatus) filterStatus.addEventListener('change', applyFilters);

  // CSV Export
  if (exportBtn) {
    exportBtn.addEventListener('click', exportToCSV);
  }

  // Winner Raffle Wheel
  if (raffleBtn) {
    raffleBtn.addEventListener('click', openRaffleModal);
  }

  // Clear data
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all participant submission data?')) {
        localStorage.removeItem(STORAGE_KEY);
        loadSubmissions();
      }
    });
  }
}

function exportToCSV() {
  if (!allSubmissions.length) {
    alert('No submissions to export!');
    return;
  }

  const headers = ['Submission ID', 'Full Name', 'Roll Number', 'Department', 'Year', 'Phone/Contact', 'Answer', 'Is Correct', 'Explanation', 'Timestamp'];
  const rows = allSubmissions.map(s => [
    `"${s.id}"`,
    `"${s.name.replace(/"/g, '""')}"`,
    `"${s.rollNo.replace(/"/g, '""')}"`,
    `"${s.dept}"`,
    `"${s.year}"`,
    `"${(s.phone || '').replace(/"/g, '""')}"`,
    s.answer,
    s.isCorrect ? 'TRUE' : 'FALSE',
    `"${(s.explanation || '').replace(/"/g, '""')}"`,
    `"${s.timestamp}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `TECHNODIAZ_2K26_Submissions_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Lucky Winner Raffle Wheel
function openRaffleModal() {
  const modal = document.getElementById('raffle-modal');
  const correctEntries = allSubmissions.filter(s => s.isCorrect);
  const eligibleCountEl = document.getElementById('raffle-eligible-count');
  const rollerEl = document.getElementById('raffle-roller');
  const startBtn = document.getElementById('btn-spin-raffle');

  if (eligibleCountEl) eligibleCountEl.textContent = correctEntries.length;
  if (rollerEl) rollerEl.textContent = 'READY TO DRAW';
  if (modal) modal.classList.add('open');

  if (startBtn) {
    startBtn.onclick = () => {
      if (correctEntries.length === 0) {
        alert('No correct submissions found to pick a winner from!');
        return;
      }
      startBtn.disabled = true;
      let counter = 0;
      const interval = setInterval(() => {
        const randomSub = correctEntries[Math.floor(Math.random() * correctEntries.length)];
        rollerEl.innerHTML = `<span style="color:#60efff;">${escapeHtml(randomSub.name)}</span><br><small style="font-size:0.9rem; color:#d1fae5;">(${escapeHtml(randomSub.rollNo)} - ${randomSub.dept})</small>`;
        counter++;
        if (counter > 25) {
          clearInterval(interval);
          const finalWinner = correctEntries[Math.floor(Math.random() * correctEntries.length)];
          rollerEl.innerHTML = `🎉 <strong style="color:#ffb703; font-size:1.6rem;">${escapeHtml(finalWinner.name)}</strong> 🎉<br><span style="font-size:1rem; color:#fff;">Roll: ${escapeHtml(finalWinner.rollNo)} | Dept: ${escapeHtml(finalWinner.dept)}</span><br><small style="color:var(--neon-green);">Token: ${finalWinner.id}</small>`;
          startBtn.disabled = false;
          if (typeof window.launchConfetti === 'function') {
            window.launchConfetti();
          }
        }
      }, 80);
    };
  }
}

function closeRaffleModal() {
  const modal = document.getElementById('raffle-modal');
  if (modal) modal.classList.remove('open');
}

function viewDetailModal(id) {
  const sub = allSubmissions.find(s => s.id === id);
  if (!sub) return;

  const detailHtml = `
    <div style="text-align:left; color:#e2e8f0; font-size:0.95rem; line-height:1.8;">
      <p><strong>Submission Token:</strong> <span style="color:var(--neon-green);">${sub.id}</span></p>
      <p><strong>Full Name:</strong> ${escapeHtml(sub.name)}</p>
      <p><strong>Roll No:</strong> ${escapeHtml(sub.rollNo)}</p>
      <p><strong>Department & Year:</strong> ${escapeHtml(sub.dept)} (${escapeHtml(sub.year)})</p>
      <p><strong>Contact Phone:</strong> ${escapeHtml(sub.phone || 'Not provided')}</p>
      <p><strong>Submitted Answer:</strong> <span style="font-weight:700; color:${sub.isCorrect ? '#34d399' : '#f87171'};">${sub.answer} (${sub.isCorrect ? 'Correct' : 'Incorrect'})</span></p>
      <p><strong>Reasoning / Explanation:</strong><br>
        <span style="background:rgba(0,0,0,0.5); padding:8px 12px; border-radius:6px; display:block; margin-top:4px; font-family:var(--font-code);">${escapeHtml(sub.explanation || 'None')}</span>
      </p>
      <p><strong>Timestamp:</strong> ${new Date(sub.timestamp).toLocaleString()}</p>
    </div>
  `;

  const modalBody = document.getElementById('detail-modal-body');
  const modal = document.getElementById('detail-modal');
  if (modalBody && modal) {
    modalBody.innerHTML = detailHtml;
    modal.classList.add('open');
  }
}

function closeDetailModal() {
  const modal = document.getElementById('detail-modal');
  if (modal) modal.classList.remove('open');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

window.closeRaffleModal = closeRaffleModal;
window.viewDetailModal = viewDetailModal;
window.closeDetailModal = closeDetailModal;
