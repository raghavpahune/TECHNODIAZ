/**
 * Technodiaz 2K26 - Participant Submission Portal Logic
 * Department of Computer Science & Engineering
 */

const STORAGE_KEY = 'technodiaz_2k26_submissions';
const CORRECT_ANSWER = 3;

// Initialize mock sample data if none exists
(function initStorage() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const sampleData = [
      {
        id: 'TDZ-2601',
        name: 'Aaditya Sharma',
        rollNo: '22CSE045',
        dept: 'CSE',
        year: '3rd Year',
        phone: '9876543210',
        answer: 3,
        isCorrect: true,
        explanation: 'n=6, sum of 1..6 = 21, sum of array = 18. 21 - 18 = 3 (Missing element)',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        id: 'TDZ-2602',
        name: 'Sneha Patel',
        rollNo: '23AIML012',
        dept: 'AI & ML',
        year: '2nd Year',
        phone: '9845123456',
        answer: 3,
        isCorrect: true,
        explanation: 'Mathematical formula n*(n+1)/2 gives total sum 21. Missing number is 3.',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'TDZ-2603',
        name: 'Rohan Verma',
        rollNo: '24IT089',
        dept: 'IT',
        year: '1st Year',
        phone: '9712345678',
        answer: 4,
        isCorrect: false,
        explanation: 'Calculated 21 - 17 = 4',
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
  }
})();

// Web Audio API for celebratory sound
function playSuccessSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + i * 0.1 + 0.35);
    });
  } catch (e) {
    console.log('Audio not allowed yet:', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('challenge-form');
  const answerInput = document.getElementById('ans-input');
  const quickAnswerBtns = document.querySelectorAll('.answer-btn');
  const passContainer = document.getElementById('result-pass-card');
  const formSection = document.getElementById('form-section');
  const liveCountEl = document.getElementById('live-submissions-count');

  // Update live counter badge
  updateSubmissionsCount();

  // Quick answer button selectors
  quickAnswerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      quickAnswerBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const val = btn.getAttribute('data-value');
      if (answerInput) {
        answerInput.value = val;
      }
    });
  });

  // If user types manually, sync button selection
  if (answerInput) {
    answerInput.addEventListener('input', () => {
      const val = answerInput.value.trim();
      quickAnswerBtns.forEach(btn => {
        if (btn.getAttribute('data-value') === val) {
          btn.classList.add('selected');
        } else {
          btn.classList.remove('selected');
        }
      });
    });
  }

  // Accordion toggles (Step-by-step breakdown & Hint)
  const toggles = document.querySelectorAll('.accordion-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      const content = toggle.nextElementSibling;
      if (content) {
        content.classList.toggle('open');
      }
    });
  });

  // Code Copy Button
  const copyBtn = document.getElementById('btn-copy-code');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = `def missing_num(nums):
    n = len(nums) + 1
    total = n*(n+1)//2
    return total - sum(nums)

# Input
nums = [1, 2, 4, 5, 6]
print(missing_num(nums))`;
      navigator.clipboard.writeText(code).then(() => {
        const oldText = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓ Copied!';
        setTimeout(() => copyBtn.innerHTML = oldText, 2000);
      });
    });
  }

  // Form Submission Handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('user-name').value.trim();
      const rollNo = document.getElementById('user-roll').value.trim();
      const dept = document.getElementById('user-dept').value;
      const year = document.getElementById('user-year').value;
      const phone = document.getElementById('user-phone').value.trim();
      const rawAns = answerInput ? answerInput.value.trim() : '';
      const explanation = document.getElementById('user-explanation') ? document.getElementById('user-explanation').value.trim() : '';

      if (!fullName || !rollNo || !rawAns) {
        alert('Please fill out your Name, Roll Number, and Answer!');
        return;
      }

      const numAns = parseInt(rawAns, 10);
      const isCorrect = (numAns === CORRECT_ANSWER);
      const uniqueId = 'TDZ-' + Math.floor(1000 + Math.random() * 9000);
      const timestamp = new Date().toISOString();

      const submission = {
        id: uniqueId,
        name: fullName,
        rollNo: rollNo,
        dept: dept,
        year: year,
        phone: phone,
        answer: numAns,
        isCorrect: isCorrect,
        explanation: explanation || 'Direct calculation',
        timestamp: timestamp
      };

      // Save to local storage
      saveSubmission(submission);
      updateSubmissionsCount();

      // Display Digital Pass
      displayDigitalPass(submission);

      if (isCorrect) {
        if (typeof window.launchConfetti === 'function') {
          window.launchConfetti();
        }
        playSuccessSound();
      }
    });
  }
});

function saveSubmission(sub) {
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    list.unshift(sub);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving submission:', e);
  }
}

function updateSubmissionsCount() {
  const el = document.getElementById('live-submissions-count');
  if (!el) return;
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    el.textContent = list.length;
  } catch (e) {
    el.textContent = '0';
  }
}

function displayDigitalPass(sub) {
  const formSection = document.getElementById('form-section');
  const passCard = document.getElementById('result-pass-card');
  if (!passCard) return;

  if (formSection) formSection.style.display = 'none';
  passCard.style.display = 'block';
  passCard.scrollIntoView({ behavior: 'smooth' });

  // Fill in pass elements
  const elId = document.getElementById('pass-token-id');
  const elName = document.getElementById('pass-student-name');
  const elRoll = document.getElementById('pass-roll-no');
  const elDept = document.getElementById('pass-dept-year');
  const elStatus = document.getElementById('pass-status-badge');
  const elTime = document.getElementById('pass-timestamp');
  const elAnswer = document.getElementById('pass-submitted-ans');

  if (elId) elId.textContent = sub.id;
  if (elName) elName.textContent = sub.name;
  if (elRoll) elRoll.textContent = sub.rollNo;
  if (elDept) elDept.textContent = `${sub.dept} • ${sub.year}`;
  if (elAnswer) elAnswer.textContent = sub.answer;
  if (elTime) elTime.textContent = new Date(sub.timestamp).toLocaleString();

  if (elStatus) {
    if (sub.isCorrect) {
      elStatus.textContent = '★ CORRECT ANSWER (VERIFIED) ★';
      elStatus.style.background = '#00ff87';
      elStatus.style.color = '#041208';
    } else {
      elStatus.textContent = 'SUBMITTED (INCORRECT ANSWER)';
      elStatus.style.background = '#f87171';
      elStatus.style.color = '#ffffff';
    }
  }

  // Generate QR Code on the Digital Pass for instant booth verification
  const qrBox = document.getElementById('pass-qr-code');
  if (qrBox && typeof QRCode !== 'undefined') {
    qrBox.innerHTML = '';
    const verifyData = `TECHNODIAZ 2K26 PASS\nID: ${sub.id}\nStudent: ${sub.name}\nRoll: ${sub.rollNo}\nStatus: ${sub.isCorrect ? 'WINNER-ELIGIBLE' : 'ATTEMPTED'}`;
    new QRCode(qrBox, {
      text: verifyData,
      width: 100,
      height: 100,
      colorDark: '#041208',
      colorLight: '#ffffff'
    });
  }

  // Button to submit another entry
  const resetBtn = document.getElementById('btn-submit-another');
  if (resetBtn) {
    resetBtn.onclick = () => {
      passCard.style.display = 'none';
      if (formSection) {
        formSection.style.display = 'block';
        document.getElementById('challenge-form').reset();
        document.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
      }
    };
  }

  // Button to print pass
  const printBtn = document.getElementById('btn-print-pass');
  if (printBtn) {
    printBtn.onclick = () => window.print();
  }
}
