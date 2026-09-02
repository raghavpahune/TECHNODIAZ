import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Shield, Lock, UserCheck, Search, QrCode, CheckCircle, XCircle, AlertTriangle, Download, Plus, Bell, RefreshCw, X, LogOut, Sparkles, BarChart3, Users } from 'lucide-react';
import { api } from '../services/api';
import { sound } from '../utils/audio';

export const AdminPortal = ({ isOpen, onClose }) => {
  const [token, setToken] = useState(localStorage.getItem('technodiaz_admin_token') || '');
  const [adminUser, setAdminUser] = useState(JSON.parse(localStorage.getItem('technodiaz_admin_user') || 'null'));
  
  // Login credentials state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('admin2026');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState('scanner'); // scanner, teams, stats, notices
  const [stats, setStats] = useState(null);
  const [teams, setTeams] = useState([]);
  const [teamsLoading, setTeamsLoading] = useState(false);
  const [searchTeam, setSearchTeam] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Scanner state
  const [scannerActive, setScannerActive] = useState(false);
  const [manualRegId, setManualRegId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // New Notice state
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('General');
  const [noticeUrgent, setNoticeUrgent] = useState(false);
  const [noticeSuccess, setNoticeSuccess] = useState(null);

  const scannerRef = useRef(null);

  // Predefined quick admin login accounts
  const quickAdmins = [
    { username: 'aditya.president', name: 'Mr. Aditya Bandhanwar', role: 'President' },
    { username: 'aditya.events', name: 'Aditya Giradkar', role: 'Event Head' },
    { username: 'hansika.tech', name: 'Hansika Kakpure', role: 'Technical Head' },
    { username: 'aryan.discipline', name: 'Aryan Thawale', role: 'Discipline Head' }
  ];

  const handleLogin = async (e, customUser, customPass) => {
    if (e) e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      sound.playClick();
      const u = customUser || username;
      const p = customPass || password;
      const res = await api.adminLogin(u, p);
      if (res.success && res.token) {
        sound.playSuccess();
        setToken(res.token);
        setAdminUser(res.admin);
        localStorage.setItem('technodiaz_admin_token', res.token);
        localStorage.setItem('technodiaz_admin_user', JSON.stringify(res.admin));
      } else {
        sound.playError();
        setLoginError(res.message || 'Invalid credentials.');
      }
    } catch (err) {
      sound.playError();
      setLoginError('Server connection failed. Please ensure backend is running.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sound.playClick();
    setToken('');
    setAdminUser(null);
    localStorage.removeItem('technodiaz_admin_token');
    localStorage.removeItem('technodiaz_admin_user');
  };

  // Fetch Dashboard Data
  const loadDashboardData = async () => {
    if (!token) return;
    setTeamsLoading(true);
    try {
      const [statsRes, teamsRes] = await Promise.all([
        api.getAdminStats(token),
        api.getTeams()
      ]);
      if (statsRes.success) setStats(statsRes.stats);
      if (teamsRes.success) setTeams(teamsRes.teams);
    } catch (err) {
      console.warn('Dashboard fetch error', err);
    } finally {
      setTeamsLoading(false);
    }
  };

  useEffect(() => {
    if (token && isOpen) {
      loadDashboardData();
    }
  }, [token, isOpen]);

  // Handle Camera QR Scanner
  useEffect(() => {
    if (token && isOpen && activeTab === 'scanner' && scannerActive) {
      let scanner = null;
      try {
        scanner = new Html5QrcodeScanner(
          'qr-reader',
          { fps: 10, qrbox: { width: 250, height: 250 } },
          false
        );

        scanner.render(
          async (decodedText) => {
            scanner.clear();
            setScannerActive(false);
            await verifyScannedData(decodedText);
          },
          (error) => {
            // scan frame ignore
          }
        );
      } catch (err) {
        console.warn('Scanner init error', err);
      }

      return () => {
        if (scanner) {
          try {
            scanner.clear();
          } catch (e) {}
        }
      };
    }
  }, [token, isOpen, activeTab, scannerActive]);

  const verifyScannedData = async (rawCode) => {
    setVerifyLoading(true);
    try {
      sound.playClick();
      const res = await api.verifyTeamQR(rawCode, token, adminUser?.name);
      setVerificationResult(res);
      if (res.status === 'VERIFIED_SUCCESS') {
        sound.playVerifySuccess();
      } else if (res.status === 'ALREADY_VERIFIED') {
        sound.playClick();
      } else {
        sound.playError();
      }
      loadDashboardData();
    } catch (err) {
      sound.playError();
      setVerificationResult({
        success: false,
        status: 'ERROR',
        message: 'Network verification failed.'
      });
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleManualVerify = (e) => {
    e.preventDefault();
    if (!manualRegId.trim()) return;
    verifyScannedData(manualRegId.trim());
  };

  const handleToggleStatus = async (teamId) => {
    try {
      sound.playClick();
      await api.toggleTeamVerify(teamId, token);
      loadDashboardData();
    } catch (err) {
      sound.playError();
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) return;
    try {
      sound.playClick();
      const res = await api.createNotice({
        title: noticeTitle,
        content: noticeContent,
        category: noticeCategory,
        isUrgent: noticeUrgent,
        author: adminUser?.name || 'Admin Desk'
      }, token);

      if (res.success) {
        sound.playSuccess();
        setNoticeSuccess('Notice broadcasted to live ticker and notice board!');
        setNoticeTitle('');
        setNoticeContent('');
        setTimeout(() => setNoticeSuccess(null), 4000);
      }
    } catch (err) {
      sound.playError();
    }
  };

  const exportToCSV = () => {
    sound.playClick();
    if (teams.length === 0) return;
    const headers = ['RegistrationID', 'TeamName', 'Event', 'Type', 'Leader', 'Email', 'Phone', 'College', 'Department', 'Verified', 'VerifiedBy'];
    const rows = teams.map(t => [
      t.registrationId,
      `"${t.teamName}"`,
      `"${t.eventCategory}"`,
      t.eventType,
      `"${t.leaderName}"`,
      t.leaderEmail,
      t.leaderPhone,
      `"${t.collegeName}"`,
      `"${t.department}"`,
      t.verified ? 'YES' : 'NO',
      `"${t.verifiedBy || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TECHNODIAZ_2K26_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-4xl max-h-[92vh]" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#2a1810] border border-[#633c21] text-[#fcd34d]">
              <Shield className="w-6 h-6 text-[#00ff88]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-heading">
                  Admin Verification Portal
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40">
                  PBCOE CSE 2k26
                </span>
              </div>
              <p className="text-xs text-emerald-300 font-mono">
                {adminUser ? `Logged in: ${adminUser.name} (${adminUser.designation})` : 'Authorized PBCOE Committee Access Only'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Logged In: Login Form */}
        {!token ? (
          <div className="py-6 space-y-6">
            <div className="p-4 rounded-xl bg-[#081e11] border border-emerald-800 text-xs text-emerald-200 space-y-2">
              <p className="font-bold text-white flex items-center gap-1.5 text-sm">
                <Lock className="w-4 h-4 text-[#00ff88]" />
                <span>Committee Sign In</span>
              </p>
              <p className="text-emerald-300/90">
                Sign in with your designated admin profile to verify student teams with the live QR scanner, view analytics, and broadcast urgent notices.
              </p>
            </div>

            {/* Quick Login Profiles */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Select Admin Profile:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {quickAdmins.map((adm) => (
                  <button
                    key={adm.username}
                    type="button"
                    onClick={() => {
                      setUsername(adm.username);
                      setPassword('admin2026');
                      handleLogin(null, adm.username, 'admin2026');
                    }}
                    className="p-3 rounded-xl bg-[#092213] hover:bg-[#0e351d] border border-emerald-700/60 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="font-bold text-white text-xs block group-hover:text-[#00ff88]">
                        {adm.name}
                      </span>
                      <span className="text-[11px] text-[#fcd34d] font-mono">{adm.role}</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                      Login ➔
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Login Inputs */}
            <form onSubmit={handleLogin} className="space-y-4 pt-2 border-t border-emerald-800/60">
              {loginError && (
                <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/60 text-xs text-red-200">
                  {loginError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-emerald-300 block mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="aditya.president"
                    className="w-full px-3 py-2 rounded-lg bg-[#040e08] border border-emerald-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs text-emerald-300 block mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#040e08] border border-emerald-800 text-white text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full btn-nature-primary text-xs py-2.5 justify-center cursor-pointer"
              >
                <span>{loginLoading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="py-4 space-y-5">
            {/* Nav Tabs */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-emerald-800/60">
              {[
                { id: 'scanner', label: '📷 QR Code Scanner', icon: QrCode },
                { id: 'teams', label: `👥 Teams (${teams.length})`, icon: Users },
                { id: 'stats', label: '📊 Fest Analytics', icon: BarChart3 },
                { id: 'notices', label: '📢 Broadcast Notice', icon: Bell }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { sound.playClick(); setActiveTab(tab.id); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#00ff88] text-[#031409] shadow-[0_0_15px_rgba(0,255,136,0.5)]'
                      : 'bg-[#081e11] text-emerald-300 hover:bg-[#0e2c1a] border border-emerald-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: QR CODE SCANNER */}
            {activeTab === 'scanner' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left: Camera Scanner Box */}
                  <div className="md:col-span-6 space-y-3">
                    <div className="p-4 rounded-xl bg-[#081a0e] border border-emerald-700/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#00ff88] uppercase tracking-wider flex items-center gap-1.5">
                          <QrCode className="w-4 h-4" />
                          <span>Live Camera Gate Scanner</span>
                        </span>
                        <button
                          onClick={() => setScannerActive(!scannerActive)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            scannerActive
                              ? 'bg-red-600 text-white'
                              : 'bg-[#00ff88] text-black hover:bg-emerald-400'
                          }`}
                        >
                          {scannerActive ? 'Stop Camera' : 'Start Camera Scan'}
                        </button>
                      </div>

                      {scannerActive ? (
                        <div id="qr-reader" className="w-full rounded-xl overflow-hidden min-h-[260px] bg-black" />
                      ) : (
                        <div className="h-48 rounded-xl bg-[#040e07] border border-dashed border-emerald-800 flex flex-col items-center justify-center text-center p-4 text-emerald-400/80 space-y-2">
                          <QrCode className="w-10 h-10 text-emerald-600" />
                          <p className="text-xs">Click "Start Camera Scan" to activate the real-time webcam/mobile scanner.</p>
                        </div>
                      )}
                    </div>

                    {/* Manual Code Input Form */}
                    <form onSubmit={handleManualVerify} className="p-4 rounded-xl bg-[#081a0e] border border-emerald-800 space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                        Manual Registration ID Lookup
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. TECH-2026-9081"
                          value={manualRegId}
                          onChange={(e) => setManualRegId(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg bg-[#040d07] border border-emerald-800 text-white text-xs font-mono uppercase focus:outline-none focus:border-[#00ff88]"
                        />
                        <button
                          type="submit"
                          disabled={verifyLoading}
                          className="btn-nature-primary text-xs px-4 py-2 cursor-pointer"
                        >
                          <span>{verifyLoading ? 'Verifying...' : 'Verify'}</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Right: Verification Result Preview */}
                  <div className="md:col-span-6 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                      Verification Status & Team Details
                    </span>

                    {verificationResult ? (
                      <div
                        className={`p-5 rounded-2xl border space-y-3 animate-in fade-in ${
                          verificationResult.status === 'VERIFIED_SUCCESS'
                            ? 'bg-[#082816] border-[#00ff88] shadow-[0_0_25px_rgba(0,255,136,0.3)]'
                            : verificationResult.status === 'ALREADY_VERIFIED'
                            ? 'bg-[#261e0b] border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                            : 'bg-[#290d0d] border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {verificationResult.status === 'VERIFIED_SUCCESS' && (
                            <CheckCircle className="w-6 h-6 text-[#00ff88]" />
                          )}
                          {verificationResult.status === 'ALREADY_VERIFIED' && (
                            <AlertTriangle className="w-6 h-6 text-amber-400" />
                          )}
                          {verificationResult.status !== 'VERIFIED_SUCCESS' && verificationResult.status !== 'ALREADY_VERIFIED' && (
                            <XCircle className="w-6 h-6 text-red-400" />
                          )}
                          <h4 className="font-bold text-white text-base">
                            {verificationResult.message}
                          </h4>
                        </div>

                        {verificationResult.team && (
                          <div className="p-3 rounded-xl bg-[#040f08] border border-emerald-800/80 text-xs space-y-2 text-emerald-100 font-mono">
                            <div className="flex justify-between border-b border-emerald-900 pb-1">
                              <span className="text-emerald-400">Reg ID:</span>
                              <span className="font-bold text-[#fcd34d]">{verificationResult.team.registrationId}</span>
                            </div>
                            <div className="flex justify-between border-b border-emerald-900 pb-1">
                              <span className="text-emerald-400">Team:</span>
                              <span className="font-bold text-white">{verificationResult.team.teamName}</span>
                            </div>
                            <div className="flex justify-between border-b border-emerald-900 pb-1">
                              <span className="text-emerald-400">Event:</span>
                              <span className="text-emerald-200">{verificationResult.team.eventCategory}</span>
                            </div>
                            <div className="flex justify-between border-b border-emerald-900 pb-1">
                              <span className="text-emerald-400">Leader:</span>
                              <span className="text-white">{verificationResult.team.leaderName} ({verificationResult.team.leaderPhone})</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-emerald-400">College:</span>
                              <span className="text-emerald-200">{verificationResult.team.collegeName}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-8 rounded-2xl bg-[#08180e] border border-dashed border-emerald-800/60 text-center text-emerald-400/70 text-xs space-y-2">
                        <UserCheck className="w-8 h-8 text-emerald-600 mx-auto" />
                        <p>Scan a student's QR pass or enter their Registration ID to verify entry into the festival.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TEAMS DIRECTORY */}
            {activeTab === 'teams' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search team, reg ID, or leader..."
                      value={searchTeam}
                      onChange={(e) => setSearchTeam(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#040e08] border border-emerald-800 text-white text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={exportToCSV}
                      className="px-3 py-1.5 rounded-lg bg-[#1a3824] hover:bg-[#254f34] text-emerald-200 border border-emerald-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#00ff88]" />
                      <span>Export CSV</span>
                    </button>
                    <button
                      onClick={loadDashboardData}
                      className="p-1.5 rounded-lg bg-[#040e08] border border-emerald-800 text-emerald-300 hover:text-white"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Table Container */}
                <div className="rounded-xl border border-emerald-800/80 overflow-x-auto max-h-96">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#05160b] text-emerald-300 font-mono border-b border-emerald-800">
                      <tr>
                        <th className="p-3">Reg ID</th>
                        <th className="p-3">Team Name</th>
                        <th className="p-3">Event Category</th>
                        <th className="p-3">Leader</th>
                        <th className="p-3">College</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-900/40 bg-[#081a0e]/90 text-emerald-100">
                      {teams
                        .filter(t => 
                          !searchTeam ||
                          t.teamName?.toLowerCase().includes(searchTeam.toLowerCase()) ||
                          t.registrationId?.toLowerCase().includes(searchTeam.toLowerCase()) ||
                          t.leaderName?.toLowerCase().includes(searchTeam.toLowerCase())
                        )
                        .map((team) => (
                          <tr key={team.registrationId} className="hover:bg-[#0d2a17] transition-colors">
                            <td className="p-3 font-mono font-bold text-[#fcd34d]">{team.registrationId}</td>
                            <td className="p-3 font-bold text-white">{team.teamName}</td>
                            <td className="p-3 text-emerald-200">{team.eventCategory}</td>
                            <td className="p-3">{team.leaderName}</td>
                            <td className="p-3 text-emerald-300/80">{team.collegeName}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                team.verified
                                  ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              }`}>
                                {team.verified ? 'Verified' : 'Pending'}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleToggleStatus(team.id || team._id || team.registrationId)}
                                className="px-2.5 py-1 rounded bg-[#041108] hover:bg-[#00ff88] hover:text-black border border-emerald-700 text-[11px] font-semibold transition-colors cursor-pointer"
                              >
                                {team.verified ? 'Unverify' : 'Verify Entry'}
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: FEST ANALYTICS */}
            {activeTab === 'stats' && stats && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-[#081e11] border border-emerald-800">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold block">Total Registrations</span>
                    <span className="text-2xl font-extrabold text-white font-mono">{stats.totalRegistered}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#082a17] border border-[#00ff88]/50">
                    <span className="text-[10px] text-[#00ff88] uppercase font-bold block">Gate Verified</span>
                    <span className="text-2xl font-extrabold text-[#00ff88] font-mono">{stats.totalVerified}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#261d0b] border border-amber-600/50">
                    <span className="text-[10px] text-amber-300 uppercase font-bold block">Pending Entry</span>
                    <span className="text-2xl font-extrabold text-amber-300 font-mono">{stats.pendingVerification}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#091f1a] border border-cyan-700/50">
                    <span className="text-[10px] text-cyan-300 uppercase font-bold block">Check-in Rate</span>
                    <span className="text-2xl font-extrabold text-cyan-200 font-mono">{stats.verificationRate}%</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#081a0e] border border-emerald-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00ff88]">
                    Event Track Distribution
                  </h4>
                  <div className="space-y-2 text-xs">
                    {stats.categoryStats && Object.entries(stats.categoryStats).map(([cat, count]) => (
                      <div key={cat} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-white">{cat}</span>
                          <span className="text-emerald-300 font-mono">{count} teams</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#040e07] overflow-hidden">
                          <div
                            className="h-full bg-[#00ff88]"
                            style={{ width: `${Math.min(100, (count / Math.max(1, stats.totalRegistered)) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: BROADCAST NOTICE */}
            {activeTab === 'notices' && (
              <form onSubmit={handleCreateNotice} className="space-y-4 max-w-2xl">
                {noticeSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-950 border border-[#00ff88] text-xs text-[#00ff88] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{noticeSuccess}</span>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    Announcement Headline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ⚡ TechCanvas Hackathon Round 1 shortlisted teams announced!"
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#040e08] border border-emerald-800 text-white text-xs focus:outline-none focus:border-[#00ff88]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                      Category
                    </label>
                    <select
                      value={noticeCategory}
                      onChange={(e) => setNoticeCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#040e08] border border-emerald-800 text-white text-xs"
                    >
                      <option value="General">General Announcement</option>
                      <option value="Technical">Technical Fest</option>
                      <option value="Sports">Sports Fest</option>
                      <option value="Urgent">Urgent Alert</option>
                      <option value="Results">Results & Winners</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="urgentCheckbox"
                      checked={noticeUrgent}
                      onChange={(e) => setNoticeUrgent(e.target.checked)}
                      className="rounded border-emerald-800 text-[#00ff88]"
                    />
                    <label htmlFor="urgentCheckbox" className="text-xs text-amber-300 font-bold cursor-pointer">
                      Mark as Urgent Alert (Flashing Ticker)
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    Notice Content Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter full notice description..."
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#040e08] border border-emerald-800 text-white text-xs focus:outline-none focus:border-[#00ff88]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-nature-primary text-xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Broadcast to Live Fest Ticker</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
