const API_BASE_URL = '/api';

export const api = {
  // Team Registration & Verification
  async registerTeam(teamData) {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamData),
    });
    return res.json();
  },

  async getTeams(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/teams?${query}`);
    return res.json();
  },

  async getTeamByRegId(regId) {
    const res = await fetch(`${API_BASE_URL}/teams/${regId}`);
    return res.json();
  },

  async verifyTeamQR(qrPayload, token, adminName) {
    const res = await fetch(`${API_BASE_URL}/verify-qr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ rawQrData: qrPayload, adminName }),
    });
    return res.json();
  },

  async toggleTeamVerify(teamId, token) {
    const res = await fetch(`${API_BASE_URL}/teams/${teamId}/toggle-verify`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return res.json();
  },

  // Notices
  async getNotices() {
    const res = await fetch(`${API_BASE_URL}/notices`);
    return res.json();
  },

  async createNotice(noticeData, token) {
    const res = await fetch(`${API_BASE_URL}/notices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(noticeData)
    });
    return res.json();
  },

  async deleteNotice(noticeId, token) {
    const res = await fetch(`${API_BASE_URL}/notices/${noticeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.json();
  },

  // Tech News
  async getTechNews() {
    const res = await fetch(`${API_BASE_URL}/tech-news`);
    return res.json();
  },

  // Daily Coding Challenge
  async getCodingChallenges() {
    const res = await fetch(`${API_BASE_URL}/coding-challenge`);
    return res.json();
  },

  async verifyChallenge(challengeId, selectedOption) {
    const res = await fetch(`${API_BASE_URL}/coding-challenge/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ challengeId, selectedOption })
    });
    return res.json();
  },

  // Admin Portal
  async adminLogin(username, password) {
    const res = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return res.json();
  },

  async getAdminStats(token) {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.json();
  },

  async getAdminList() {
    const res = await fetch(`${API_BASE_URL}/admin/list`);
    return res.json();
  }
};
