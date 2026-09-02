import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import {
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Cpu,
  Layers,
  Sparkles,
  Check,
  AlertTriangle,
  X,
} from 'lucide-react';
import { apiRequest } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const MonacoCodeEditor = ({ challenge, onSubmissionSuccess }) => {
  const toast = useToast();
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [textAnswer, setTextAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  
  // Execution & Submission state
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Initialize starter code or user past submission
  useEffect(() => {
    if (!challenge) return;

    if (challenge.submissionType === 'CODE') {
      const defaultLang = challenge.allowedLanguages?.[0] || 'javascript';
      setLanguage(defaultLang);
      
      if (challenge.userLatestSubmission?.code) {
        setCode(challenge.userLatestSubmission.code);
        setLanguage(challenge.userLatestSubmission.language || defaultLang);
      } else {
        const starter = challenge.starterCode?.[defaultLang] || '// Write your code solution here\n';
        setCode(starter);
      }
    } else if (challenge.submissionType === 'TEXT') {
      setTextAnswer(challenge.userLatestSubmission?.answer || '');
    } else if (challenge.submissionType === 'MCQ') {
      setSelectedOption(challenge.userLatestSubmission?.selectedOption || '');
    }
  }, [challenge]);

  // Handle language switch
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    const starter = challenge.starterCode?.[newLang] || `// Write your ${newLang} solution here\n`;
    setCode(starter);
    setTestResult(null);
  };

  const handleResetCode = () => {
    const starter = challenge.starterCode?.[language] || '// Write your code solution here\n';
    setCode(starter);
    setTestResult(null);
    toast.info('Code reset to template.');
  };

  // Test Run Code
  const handleRunCode = async () => {
    if (challenge.submissionType !== 'CODE') return;
    setIsRunning(true);
    setTestResult(null);

    try {
      const data = await apiRequest(`/challenges/${challenge._id}/run`, {
        method: 'POST',
        body: { language, code },
      });

      if (data.success && data.result) {
        setTestResult(data.result);
        if (data.result.allPassed) {
          toast.success('All public test cases passed!');
        } else {
          toast.warning(`${data.result.passedCount}/${data.result.totalCount} test cases passed.`);
        }
      }
    } catch (err) {
      toast.error(err.message || 'Execution error during test run.');
    } finally {
      setIsRunning(false);
    }
  };

  // Final Submit
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    setShowConfirmModal(false);

    try {
      const payload = {
        challengeId: challenge._id,
        submissionType: challenge.submissionType,
        language: challenge.submissionType === 'CODE' ? language : undefined,
        code: challenge.submissionType === 'CODE' ? code : undefined,
        answer: challenge.submissionType === 'TEXT' ? textAnswer : undefined,
        selectedOption: challenge.submissionType === 'MCQ' ? selectedOption : undefined,
      };

      const data = await apiRequest('/submissions', {
        method: 'POST',
        body: payload,
      });

      if (data.success && data.submission) {
        setSubmissionResult(data.submission);
        toast.success(`Submission ${data.submission.submissionId} recorded successfully!`);
        if (onSubmissionSuccess) {
          onSubmissionSuccess(data.submission);
        }
      }
    } catch (err) {
      toast.error(err.message || 'Failed to submit solution.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* 1. CODE SUBMISSION INTERFACE */}
      {challenge.submissionType === 'CODE' && (
        <div className="flex flex-col flex-1 wood-board rounded-2xl border border-emerald-900/60 overflow-hidden shadow-2xl">
          {/* Top Editor Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#08100A] border-b border-emerald-950">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-mono">Language:</span>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-[#0D1A12] text-emerald-300 text-xs font-mono font-semibold py-1.5 px-3 rounded-lg border border-emerald-700/60 focus:outline-none focus:border-emerald-400 cursor-pointer"
              >
                <option value="javascript">JavaScript (ES6+)</option>
                <option value="cpp">C++ (GCC 13)</option>
                <option value="c">C (GCC 11)</option>
                <option value="python">Python (3.11)</option>
                <option value="java">Java (OpenJDK 17)</option>
              </select>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCode}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                title="Reset code to original starter template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Monaco Editor Canvas */}
          <div className="h-[420px] sm:h-[480px] w-full bg-[#0E1511]">
            <Editor
              height="100%"
              language={language === 'c' || language === 'cpp' ? 'cpp' : language}
              value={code}
              theme="vs-dark"
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize: 13,
                fontFamily: "'Fira Code', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                roundedSelection: true,
                automaticLayout: true,
                tabSize: 4,
                cursorBlinking: 'smooth',
                renderWhitespace: 'selection',
              }}
            />
          </div>

          {/* Editor Action Buttons */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#08100A] border-t border-emerald-950">
            <button
              onClick={handleRunCode}
              disabled={isRunning || isSubmitting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#14261B] hover:bg-[#1E3B29] text-emerald-300 border border-emerald-700/60 hover:border-emerald-500 transition-all disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Running Code...' : 'Run Code'}</span>
            </button>

            <button
              onClick={() => setShowConfirmModal(true)}
              disabled={isRunning || isSubmitting || !code.trim()}
              className="flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Answer'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. TEXT SUBMISSION INTERFACE */}
      {challenge.submissionType === 'TEXT' && (
        <div className="wood-board rounded-2xl p-6 border border-emerald-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Technical Proposal / Architecture Answer
            </h4>
            <span className="text-xs text-gray-400 font-mono">
              Word Count: {textAnswer.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <textarea
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            rows={14}
            placeholder="Type your structured solution, architectural explanation, mathematical models, and complexity analysis here..."
            className="w-full bg-[#08120B] border border-emerald-800/60 rounded-xl p-4 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-400 font-mono leading-relaxed resize-none"
          />

          <div className="flex justify-end">
            <button
              onClick={() => setShowConfirmModal(true)}
              disabled={isSubmitting || !textAnswer.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Answer'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. MCQ SUBMISSION INTERFACE */}
      {challenge.submissionType === 'MCQ' && (
        <div className="wood-board rounded-2xl p-6 border border-emerald-900/60 space-y-6">
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              Multiple Choice Challenge
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white mt-2 leading-snug">
              {challenge.mcqQuestion || challenge.problemStatement}
            </h4>
          </div>

          <div className="space-y-3">
            {challenge.mcqOptions?.map((opt) => {
              const isSelected = selectedOption === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSelectedOption(opt.key)}
                  className={`w-full text-left p-4 rounded-xl border flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-emerald-950/80 border-emerald-400 shadow-neon-green text-emerald-100'
                      : 'bg-[#08120B] border-emerald-900/60 hover:border-emerald-600 text-gray-300'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg font-mono font-bold flex items-center justify-center text-xs ${
                      isSelected
                        ? 'bg-emerald-500 text-black'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span className="text-xs sm:text-sm font-medium flex-1">{opt.text}</span>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setShowConfirmModal(true)}
              disabled={isSubmitting || !selectedOption}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit MCQ Answer'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. INTERACTIVE TEST EXECUTION RESULTS CONSOLE */}
      {testResult && (
        <div className="wood-board rounded-2xl p-5 border border-emerald-800/60 space-y-3 animate-slide-in">
          <div className="flex items-center justify-between border-b border-emerald-950 pb-2">
            <div className="flex items-center gap-2">
              {testResult.allPassed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <XCircle className="w-4 h-4 text-amber-400" />
              )}
              <span className="text-xs font-mono font-bold text-white uppercase">
                Execution Output ({testResult.passedCount}/{testResult.totalCount} Passed)
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-gray-400">
              <span>Time: {testResult.executionTime}</span>
              <span>Memory: {testResult.memoryUsed}</span>
            </div>
          </div>

          <div className="space-y-2">
            {testResult.results.map((r) => (
              <div
                key={r.testCaseIndex}
                className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${
                  r.passed
                    ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                    : 'bg-rose-950/30 border-rose-800/40 text-rose-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>Test Case #{r.testCaseIndex}</span>
                  <span>{r.passed ? '✓ PASSED' : '✗ FAILED'} ({r.executionTimeMs}ms)</span>
                </div>
                <div className="text-[11px] text-gray-300 pt-0.5">
                  Input: <code className="text-white">{r.input}</code>
                </div>
                <div className="text-[11px] text-gray-300">
                  Expected: <code className="text-emerald-400">{r.expectedOutput}</code> | Actual:{' '}
                  <code className={r.passed ? 'text-emerald-400' : 'text-rose-400'}>{r.actualOutput}</code>
                </div>
                {r.error && (
                  <div className="text-[11px] text-rose-400 font-bold">
                    Error: {r.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SUCCESS SUBMISSION BANNER */}
      {submissionResult && (
        <div className="wood-board rounded-2xl p-6 border-2 border-emerald-500/80 bg-[#08170E] space-y-3 animate-slide-in shadow-neon-green">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500 text-black">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">
                  ✓ Submission Successful!
                </h4>
                <span className="font-mono text-xs text-emerald-300 font-bold bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                  {submissionResult.submissionId}
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                Status: <span className="font-bold text-white">{submissionResult.status}</span>
                {submissionResult.score > 0 && ` | Score: ${submissionResult.score}/${submissionResult.maxScore} Pts`}
              </p>
              <p className="text-xs text-gray-300 pt-1">
                {submissionResult.feedback}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. SUBMISSION CONFIRMATION MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="wood-board max-w-md w-full rounded-2xl p-6 space-y-4 border border-emerald-500/50 shadow-2xl relative">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Confirm Final Submission
                </h3>
                <span className="text-xs font-mono text-emerald-400">
                  {challenge.title}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Are you sure you want to submit? Once submitted, your solution will be permanently logged in MongoDB and queued for CSE faculty evaluation.
            </p>

            <div className="p-3 rounded-xl bg-[#08120B] border border-emerald-950 text-xs font-mono text-gray-400 space-y-1">
              <div>Type: <span className="text-white">{challenge.submissionType}</span></div>
              {challenge.submissionType === 'CODE' && <div>Language: <span className="text-emerald-300 font-bold">{language}</span></div>}
              <div>Max Points: <span className="text-emerald-400 font-bold">{challenge.points} Pts</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="py-2.5 rounded-xl text-xs font-semibold bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-neon-green transition-all"
              >
                SUBMIT ANSWER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
