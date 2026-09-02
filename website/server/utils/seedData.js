import { User } from '../models/User.js';
import { Challenge } from '../models/Challenge.js';
import { Submission } from '../models/Submission.js';
import { Event } from '../models/Event.js';
import { Announcement } from '../models/Announcement.js';
import { Project } from '../models/Project.js';
import { News } from '../models/News.js';
import { Achievement } from '../models/Achievement.js';

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('[Seed] Database already contains records. Skipping seed.');
      return;
    }

    console.log('[Seed] Seeding TECHNODIAZ 2K26 database with demo data...');

    // 1. Seed Admin
    const adminUser = await User.create({
      name: 'CSE Admin',
      email: 'admin@technodiaz.com',
      password: 'Admin@2026',
      mobile: '9876543210',
      college: 'PBCOE',
      branch: 'Computer Science & Engineering',
      year: 'Faculty',
      rollNumber: 'ADMIN-001',
      role: 'admin',
      score: 0,
      solvedCount: 0,
      attemptedCount: 0,
    });

    // 2. Seed Demo Students
    const studentData = [
      { name: 'Rahul Verma', email: 'rahul@pbcoe.edu', password: 'Password@123', mobile: '9823112233', college: 'PBCOE', branch: 'CSE', year: '3rd Year', rollNumber: 'CSE-2023-01', score: 180, solvedCount: 9, attemptedCount: 10 },
      { name: 'Aaditya Sharma', email: 'aaditya@pbcoe.edu', password: 'Password@123', mobile: '9823112234', college: 'PBCOE', branch: 'CSE', year: '3rd Year', rollNumber: 'CSE-2023-02', score: 160, solvedCount: 8, attemptedCount: 9 },
      { name: 'Sneha Patil', email: 'sneha@vnit.ac.in', password: 'Password@123', mobile: '9823112235', college: 'VNIT Nagpur', branch: 'CSE', year: '4th Year', rollNumber: 'VNIT-CS-14', score: 140, solvedCount: 7, attemptedCount: 8 },
      { name: 'Rohan Deshmukh', email: 'rohan@rcoem.edu', password: 'Password@123', mobile: '9823112236', college: 'RCOEM', branch: 'CSE', year: '3rd Year', rollNumber: 'RCO-CS-22', score: 120, solvedCount: 6, attemptedCount: 7 },
      { name: 'Priya Nair', email: 'priya@ycce.edu', password: 'Password@123', mobile: '9823112237', college: 'YCCE Nagpur', branch: 'CSE', year: '2nd Year', rollNumber: 'YCC-CS-35', score: 100, solvedCount: 5, attemptedCount: 6 },
      { name: 'Aniket Kulkarni', email: 'aniket@ghrce.edu', password: 'Password@123', mobile: '9823112238', college: 'GHRCE', branch: 'AI/DS', year: '3rd Year', rollNumber: 'GHR-AI-41', score: 90, solvedCount: 4, attemptedCount: 5 },
      { name: 'Tanvi Joshi', email: 'tanvi@pbcoe.edu', password: 'Password@123', mobile: '9823112239', college: 'PBCOE', branch: 'CSE', year: '3rd Year', rollNumber: 'CSE-2023-09', score: 80, solvedCount: 4, attemptedCount: 5 },
      { name: 'Yash Gupta', email: 'yash@iiitn.ac.in', password: 'Password@123', mobile: '9823112240', college: 'IIIT Nagpur', branch: 'CSE', year: '2nd Year', rollNumber: 'IIIT-CS-18', score: 70, solvedCount: 3, attemptedCount: 4 },
      { name: 'Neha Choudhary', email: 'neha@pbcoe.edu', password: 'Password@123', mobile: '9823112241', college: 'PBCOE', branch: 'CSE', year: '2nd Year', rollNumber: 'CSE-2023-52', score: 60, solvedCount: 3, attemptedCount: 4 },
      { name: 'Sameer Khan', email: 'sameer@gcoen.ac.in', password: 'Password@123', mobile: '9823112242', college: 'GCOEN', branch: 'CSE', year: '1st Year', rollNumber: 'GCO-CS-63', score: 40, solvedCount: 2, attemptedCount: 3 },
    ];

    const createdStudents = [];
    for (const s of studentData) {
      const student = await User.create(s);
      createdStudents.push(student);
    }

    // 3. Seed Challenges
    const challenges = [
      {
        challengeId: 'TDZ-CH-01',
        title: 'Missing Number in Nature Sensor Array',
        category: 'Logic',
        difficulty: 'Easy',
        points: 10,
        timeLimit: '20 mins',
        submissionType: 'CODE',
        description: 'Find the single missing environmental telemetry node ID from a contiguous sequence of sensor readings from 1 to N.',
        problemStatement: 'You are monitoring an eco-conservation IoT forest network where sensor nodes are sequentially numbered from 1 to n. Due to atmospheric interference, exactly one node packet was dropped. Given an array containing n-1 distinct integers in the range [1, n], return the missing node number.',
        inputFormat: 'A JSON string or comma-separated list of n-1 integers (e.g., "[3, 0, 1]" or "1,2,4,5").',
        outputFormat: 'Return the single missing integer.',
        constraints: 'n == array.length + 1\n1 <= n <= 10^4\nAll numbers in the array are unique.',
        examples: [
          {
            input: '[3, 0, 1]',
            output: '2',
            explanation: 'n = 3 since there are 3 numbers, so all numbers are in range [0,3]. 2 is missing.',
          },
          {
            input: '[1, 2, 4, 5, 6]',
            output: '3',
            explanation: 'The sequence from 1 to 6 is missing 3.',
          },
        ],
        testCases: [
          { input: '[3, 0, 1]', expectedOutput: '2', isHidden: false },
          { input: '[0, 1]', expectedOutput: '2', isHidden: false },
          { input: '[9, 6, 4, 2, 3, 5, 7, 0, 1]', expectedOutput: '8', isHidden: true },
        ],
        starterCode: {
          javascript: `// Missing Number Solution\nfunction solve(input) {\n    let arr;\n    try {\n        arr = typeof input === 'string' ? JSON.parse(input) : input;\n    } catch(e) {\n        arr = input.split(',').map(Number);\n    }\n    const n = arr.length;\n    let expectedSum = (n * (n + 1)) / 2;\n    let actualSum = arr.reduce((acc, curr) => acc + curr, 0);\n    return expectedSum - actualSum;\n}`,
          python: `import json\n\ndef solve(input_data):\n    arr = json.loads(input_data) if isinstance(input_data, str) else input_data\n    n = len(arr)\n    return (n * (n + 1)) // 2 - sum(arr)\n`,
          cpp: `#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\nint findMissingNumber(vector<int>& nums) {\n    int n = nums.size();\n    int expected = n * (n + 1) / 2;\n    int actual = 0;\n    for(int x : nums) actual += x;\n    return expected - actual;\n}\n\nint main() {\n    // Solution code\n    return 0;\n}`,
          c: `#include <stdio.h>\n\nint findMissing(int* nums, int numsSize) {\n    int expected = numsSize * (numsSize + 1) / 2;\n    int actual = 0;\n    for(int i = 0; i < numsSize; i++) actual += nums[i];\n    return expected - actual;\n}\n\nint main() {\n    return 0;\n}`,
          java: `import java.util.*;\n\npublic class Solution {\n    public static int missingNumber(int[] nums) {\n        int n = nums.length;\n        int expected = n * (n + 1) / 2;\n        int sum = 0;\n        for (int num : nums) sum += num;\n        return expected - sum;\n    }\n    public static void main(String[] args) {\n        System.out.println("Ready");\n    }\n}`,
        },
        order: 1,
        solveCount: 42,
        submissionCount: 58,
      },
      {
        challengeId: 'TDZ-CH-02',
        title: 'Array Frequency & Anomaly Detection',
        category: 'Arrays',
        difficulty: 'Medium',
        points: 20,
        timeLimit: '30 mins',
        submissionType: 'CODE',
        description: 'Analyze bio-metric frequency data packets and detect anomalous non-repeating frequency peaks in polynomial time.',
        problemStatement: 'Given an array of positive integers representing energy pulse frequencies, return the element that appears with the highest frequency. If multiple elements have the same maximum frequency, return the smallest of them.',
        inputFormat: 'JSON string of integer array (e.g. "[1, 2, 2, 3, 3, 3, 4]").',
        outputFormat: 'The single integer representing the modal frequency.',
        constraints: '1 <= array.length <= 10^5\n1 <= array[i] <= 10^9',
        examples: [
          {
            input: '[1, 2, 2, 3, 3, 3, 4]',
            output: '3',
            explanation: '3 occurs 3 times which is the highest frequency.',
          },
          {
            input: '[4, 4, 2, 2]',
            output: '2',
            explanation: 'Both 2 and 4 occur twice; 2 is the smaller value.',
          },
        ],
        testCases: [
          { input: '[1, 2, 2, 3, 3, 3, 4]', expectedOutput: '3', isHidden: false },
          { input: '[4, 4, 2, 2]', expectedOutput: '2', isHidden: false },
          { input: '[10, 20, 10, 30, 20, 10]', expectedOutput: '10', isHidden: true },
        ],
        starterCode: {
          javascript: `function solve(input) {\n    const arr = typeof input === 'string' ? JSON.parse(input) : input;\n    const map = {};\n    let maxFreq = 0;\n    let result = Infinity;\n    for(const num of arr) {\n        map[num] = (map[num] || 0) + 1;\n    }\n    for(const num in map) {\n        const val = Number(num);\n        const freq = map[num];\n        if (freq > maxFreq || (freq === maxFreq && val < result)) {\n            maxFreq = freq;\n            result = val;\n        }\n    }\n    return result;\n}`,
          python: `import json\nfrom collections import Counter\n\ndef solve(input_data):\n    arr = json.loads(input_data) if isinstance(input_data, str) else input_data\n    counts = Counter(arr)\n    max_freq = max(counts.values())\n    candidates = [num for num, freq in counts.items() if freq == max_freq]\n    return min(candidates)\n`,
          cpp: `#include <iostream>\n#include <vector>\n#include <map>\nusing namespace std;\n\nint mostFrequent(vector<int>& nums) {\n    map<int, int> count;\n    for(int x : nums) count[x]++;\n    int maxCount = 0, res = -1;\n    for(auto const& [val, freq] : count) {\n        if(freq > maxCount) {\n            maxCount = freq;\n            res = val;\n        }\n    }\n    return res;\n}\n\nint main() { return 0; }`,
          c: `#include <stdio.h>\nint main() { return 0; }`,
          java: `import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {}\n}`,
        },
        order: 2,
        solveCount: 28,
        submissionCount: 45,
      },
      {
        challengeId: 'TDZ-CH-03',
        title: 'Circuit Path: Minimum Energy Route',
        category: 'Algorithms',
        difficulty: 'Hard',
        points: 30,
        timeLimit: '45 mins',
        submissionType: 'CODE',
        description: 'Determine the minimal resistance / energy expenditure path across a 2D microchip circuit board from top-left to bottom-right.',
        problemStatement: 'Given a m x n grid filled with non-negative integers representing energy impedance at each transistor node, find a path from the top-left (0,0) to the bottom-right (m-1, n-1) which minimizes the total energy sum along its path. You can only move either down or right at any point in time.',
        inputFormat: 'JSON string of 2D array grid e.g. "[[1,3,1],[1,5,1],[4,2,1]]"',
        outputFormat: 'Single integer representing the minimum path sum.',
        constraints: 'm == grid.length\nn == grid[i].length\n1 <= m, n <= 200\n0 <= grid[i][j] <= 100',
        examples: [
          {
            input: '[[1,3,1],[1,5,1],[4,2,1]]',
            output: '7',
            explanation: 'Path: 1 → 3 → 1 → 1 → 1 minimizes sum to 7.',
          },
          {
            input: '[[1,2,3],[4,5,6]]',
            output: '12',
            explanation: 'Path: 1 → 2 → 3 → 6 has sum 12.',
          },
        ],
        testCases: [
          { input: '[[1,3,1],[1,5,1],[4,2,1]]', expectedOutput: '7', isHidden: false },
          { input: '[[1,2,3],[4,5,6]]', expectedOutput: '12', isHidden: false },
        ],
        starterCode: {
          javascript: `function solve(input) {\n    const grid = typeof input === 'string' ? JSON.parse(input) : input;\n    const m = grid.length;\n    const n = grid[0].length;\n    const dp = Array.from({ length: m }, () => Array(n).fill(0));\n    dp[0][0] = grid[0][0];\n    for(let j = 1; j < n; j++) dp[0][j] = dp[0][j-1] + grid[0][j];\n    for(let i = 1; i < m; i++) dp[i][0] = dp[i-1][0] + grid[i][0];\n    for(let i = 1; i < m; i++) {\n        for(let j = 1; j < n; j++) {\n            dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];\n        }\n    }\n    return dp[m-1][n-1];\n}`,
          python: `import json\n\ndef solve(input_data):\n    grid = json.loads(input_data) if isinstance(input_data, str) else input_data\n    m, n = len(grid), len(grid[0])\n    for i in range(m):\n        for j in range(n):\n            if i == 0 and j == 0: continue\n            elif i == 0: grid[i][j] += grid[i][j-1]\n            elif j == 0: grid[i][j] += grid[i-1][j]\n            else: grid[i][j] += min(grid[i-1][j], grid[i][j-1])\n    return grid[-1][-1]\n`,
          cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint minPathSum(vector<vector<int>>& grid) {\n    int m = grid.size(), n = grid[0].size();\n    for(int i = 0; i < m; i++) {\n        for(int j = 0; j < n; j++) {\n            if(i == 0 && j == 0) continue;\n            else if(i == 0) grid[i][j] += grid[i][j-1];\n            else if(j == 0) grid[i][j] += grid[i-1][j];\n            else grid[i][j] += min(grid[i-1][j], grid[i][j-1]);\n        }\n    }\n    return grid[m-1][n-1];\n}`,
          c: `#include <stdio.h>\nint main() { return 0; }`,
          java: `public class Solution { public static void main(String[] args) {} }`,
        },
        order: 3,
        solveCount: 14,
        submissionCount: 39,
      },
      {
        challengeId: 'TDZ-CH-04',
        title: 'Eco-Grid Carbon Balancing Algorithm',
        category: 'Green Tech',
        difficulty: 'Medium',
        points: 25,
        timeLimit: '35 mins',
        submissionType: 'TEXT',
        description: 'Propose an architectural optimization strategy or algorithm to minimize grid carbon emissions when scheduling distributed computational workloads across multiple solar and wind power nodes.',
        problemStatement: 'Describe in detail how you would design a Smart Workload Orchestration Algorithm that shifts batch AI inference jobs to data center nodes where renewable energy generation (Solar / Wind) is currently peaking. Your response must include:\n1. Mathematical objective function for carbon cost minimization.\n2. Proposed data structures for node priority ranking.\n3. Handling intermittent power drops without job failure.\n4. Time and space complexity analysis.',
        inputFormat: 'Text essay / Markdown architectural specification.',
        outputFormat: 'Structured technical proposal.',
        constraints: 'Detailed explanation between 150 to 500 words.',
        examples: [
          {
            input: 'Renewable energy availability vs Job queue latency requirements',
            output: 'A hybrid greedy-heuristic queue with fallback battery buffering.',
            explanation: 'Score is awarded based on technical clarity, mathematical rigor, and feasibility.',
          },
        ],
        order: 4,
        solveCount: 19,
        submissionCount: 24,
      },
      {
        challengeId: 'TDZ-CH-05',
        title: 'Green AI & Sustainable Edge Computing Paradigm',
        category: 'AI/ML',
        difficulty: 'Easy',
        points: 15,
        timeLimit: '15 mins',
        submissionType: 'MCQ',
        description: 'Test your understanding of model quantization, pruning, and low-power edge neural network architectures.',
        problemStatement: 'Which model compression technique replaces floating-point 32-bit (FP32) weights with lower bit-width representations (such as INT8 or INT4) to achieve significant memory reduction and inference energy efficiency on edge devices?',
        mcqQuestion: 'Which model compression technique replaces FP32 neural network weights with lower bit-width representations (e.g. INT8/INT4) for energy efficiency?',
        mcqOptions: [
          { key: 'A', text: 'Knowledge Distillation' },
          { key: 'B', text: 'Post-Training Quantization (PTQ)' },
          { key: 'C', text: 'Stochastic Gradient Descent' },
          { key: 'D', text: 'Dropout Regularization' },
        ],
        mcqCorrectAnswer: 'B',
        constraints: 'Select one valid option from A, B, C, D.',
        order: 5,
        solveCount: 37,
        submissionCount: 41,
      },
    ];

    const createdChallenges = [];
    for (const c of challenges) {
      const challenge = await Challenge.create(c);
      createdChallenges.push(challenge);
    }

    // 4. Seed Submissions for top demo students
    const sampleSubmissions = [
      {
        submissionId: 'TDZ-10021',
        user: createdStudents[0]._id, // Rahul
        challenge: createdChallenges[0]._id,
        submissionType: 'CODE',
        language: 'cpp',
        code: createdChallenges[0].starterCode.cpp,
        status: 'Accepted',
        score: 10,
        maxScore: 10,
        feedback: 'Clean O(N) mathematical solution. Well commented.',
        submittedAt: new Date(Date.now() - 3600000 * 24),
        evaluatedAt: new Date(Date.now() - 3600000 * 20),
        evaluatedBy: adminUser._id,
      },
      {
        submissionId: 'TDZ-10022',
        user: createdStudents[0]._id, // Rahul
        challenge: createdChallenges[1]._id,
        submissionType: 'CODE',
        language: 'cpp',
        code: createdChallenges[1].starterCode.cpp,
        status: 'Accepted',
        score: 20,
        maxScore: 20,
        feedback: 'Optimal hash map frequency count.',
        submittedAt: new Date(Date.now() - 3600000 * 18),
        evaluatedAt: new Date(Date.now() - 3600000 * 15),
        evaluatedBy: adminUser._id,
      },
      {
        submissionId: 'TDZ-10023',
        user: createdStudents[1]._id, // Aaditya
        challenge: createdChallenges[0]._id,
        submissionType: 'CODE',
        language: 'javascript',
        code: createdChallenges[0].starterCode.javascript,
        status: 'Accepted',
        score: 10,
        maxScore: 10,
        feedback: 'Great JavaScript array reduce implementation!',
        submittedAt: new Date(Date.now() - 3600000 * 12),
        evaluatedAt: new Date(Date.now() - 3600000 * 10),
        evaluatedBy: adminUser._id,
      },
      {
        submissionId: 'TDZ-10024',
        user: createdStudents[1]._id, // Aaditya
        challenge: createdChallenges[2]._id,
        submissionType: 'CODE',
        language: 'javascript',
        code: createdChallenges[2].starterCode.javascript,
        status: 'Accepted',
        score: 30,
        maxScore: 30,
        feedback: 'Dynamic programming matrix solution works perfectly.',
        submittedAt: new Date(Date.now() - 3600000 * 6),
        evaluatedAt: new Date(Date.now() - 3600000 * 4),
        evaluatedBy: adminUser._id,
      },
      {
        submissionId: 'TDZ-10025',
        user: createdStudents[2]._id, // Sneha
        challenge: createdChallenges[3]._id,
        submissionType: 'TEXT',
        answer: 'We propose a dynamic DAG scheduler that optimizes for min(Carbon Intensity * Compute Hours). Priority heaps maintain energy gradients from real-time solar inverter telemetry.',
        status: 'Accepted',
        score: 25,
        maxScore: 25,
        feedback: 'Exceptional system architectural design and mathematical formulation.',
        submittedAt: new Date(Date.now() - 3600000 * 2),
        evaluatedAt: new Date(Date.now() - 3600000 * 1),
        evaluatedBy: adminUser._id,
      },
    ];

    for (const sub of sampleSubmissions) {
      await Submission.create(sub);
    }

    // 5. Seed Announcements
    const announcements = [
      {
        title: '🚀 TECHNODIAZ 2K26 CODING CHALLENGE IS LIVE!',
        content: 'The official Department of CSE Coding Challenge has commenced. Solve algorithmic challenges, demonstrate innovation, and compete for top ranks on the live leaderboard.',
        priority: 'urgent',
        tag: 'CHALLENGE',
        deadline: '5 Sept 2026, 6:00 PM',
      },
      {
        title: '🌿 Theme: Where Nature Meets Innovation',
        content: 'Welcome to the digital edition of TECHNODIAZ 2K26. Explore our interactive Technology Tree and eco-computing exhibition sections.',
        priority: 'high',
        tag: 'EVENT',
        deadline: 'Festival Days: 4 - 6 Sept 2026',
      },
      {
        title: '🏆 Green Tech Project Expo Registrations Open',
        content: 'All undergraduate student teams can submit their IoT, AI, and Sustainable Hardware prototypes. Shortlisted projects will receive cash prizes and mentor mentorship.',
        priority: 'normal',
        tag: 'PROJECTS',
        deadline: 'Last date for synopsis: 4 Sept 2026',
      },
      {
        title: '💡 Workshop on Edge AI & Neuromorphic Computing',
        content: 'Join CSE faculty & industry guests for a 2-hour hands-on workshop on deploying ultra-low power neural networks to microcontrollers.',
        priority: 'normal',
        tag: 'WORKSHOP',
        deadline: 'Venue: CSE Lab 3 (2:00 PM)',
      },
      {
        title: '📢 Evaluation Updates & Leaderboard Recalculation',
        content: 'Manual evaluations for architectural & code submissions are updated hourly by the faculty judging committee.',
        priority: 'low',
        tag: 'NOTICE',
        deadline: 'Real-time updates',
      },
    ];
    await Announcement.insertMany(announcements);

    // 6. Seed Events
    const events = [
      {
        title: 'CodeRelay 2.0 Hackathon',
        category: 'Coding & Algorithms',
        description: 'Fast-paced collaborative coding tournament where teams tackle algorithms and optimization under energy budget constraints.',
        date: 'September 5, 2026',
        time: '10:00 AM - 4:00 PM',
        venue: 'Computer Center - Lab 1 & 2',
        coordinator: 'Prof. S. R. Deshmukh & CSE Council',
        prizePool: '₹15,000 + Tech Gadgets',
        registrationLink: '/coding-challenge',
        status: 'upcoming',
      },
      {
        title: 'GreenTech Project Expo & Innovation Showcase',
        category: 'Project Exhibition',
        description: 'Display your working software and hardware prototypes merging nature, renewable energy, and computational efficiency.',
        date: 'September 5, 2026',
        time: '11:30 AM - 3:30 PM',
        venue: 'Main Auditorium & Exhibition Hall',
        coordinator: 'Dr. V. K. Patil (HOD CSE)',
        prizePool: '₹20,000 + Incubation Support',
        registrationLink: '#',
        status: 'upcoming',
      },
      {
        title: 'AI For Good: Generative AI & Sustainability Seminar',
        category: 'Keynote & Panel',
        description: 'Distinguished speakers discuss how deep learning models are deployed to combat deforestation, model weather patterns, and optimize energy grids.',
        date: 'September 6, 2026',
        time: '10:30 AM - 12:30 PM',
        venue: 'Seminar Hall 4',
        coordinator: 'Prof. M. A. Joshi',
        prizePool: 'Certificates of Participation',
        registrationLink: '#',
        status: 'upcoming',
      },
      {
        title: 'CyberShield: Capture The Flag (CTF) Challenge',
        category: 'Cyber Security',
        description: 'Penetrate vulnerable mock ecosystems, reverse engineer firmware, and uncover digital cryptographic flags.',
        date: 'September 6, 2026',
        time: '1:30 PM - 5:00 PM',
        venue: 'Network Security Lab',
        coordinator: 'Cyber Club CSE',
        prizePool: '₹10,000 + Security Vouchers',
        registrationLink: '#',
        status: 'upcoming',
      },
      {
        title: 'Tech Quiz & Logic Master 2026',
        category: 'Brain Teasers',
        description: 'Rapid-fire quiz on CSE fundamentals, tech history, green computing developments, and algorithmic puzzles.',
        date: 'September 6, 2026',
        time: '3:30 PM - 5:30 PM',
        venue: 'Auditorium Hall B',
        coordinator: 'Student Forum Technodiaz',
        prizePool: '₹5,000 + Goodies',
        registrationLink: '#',
        status: 'upcoming',
      },
    ];
    await Event.insertMany(events);

    // 7. Seed Projects
    const projects = [
      {
        title: 'Smart Solar Irrigation & Soil Telemetry Mesh',
        students: 'Aaditya Sharma, Rahul Verma (3rd Year CSE)',
        guide: 'Dr. V. K. Patil',
        category: 'IoT & Agriculture',
        description: 'LoRa-based soil moisture and mineral nutrient telemetry with automated drip irrigation powered completely by miniature solar collectors.',
        technologies: ['ESP32', 'LoRa', 'Node.js', 'React', 'MongoDB'],
        demoUrl: 'https://github.com',
        githubUrl: 'https://github.com',
        featured: true,
      },
      {
        title: 'Plant Leaf Pathology Detector via Edge Vision',
        students: 'Sneha Patil, Tanvi Joshi (4th Year CSE)',
        guide: 'Prof. S. R. Deshmukh',
        category: 'AI & Agriculture',
        description: 'Quantized MobileNet model deployed to edge Raspberry Pi running real-time crop disease diagnosis with 96.8% field accuracy.',
        technologies: ['TensorFlow Lite', 'OpenCV', 'Python', 'FastAPI'],
        demoUrl: 'https://github.com',
        githubUrl: 'https://github.com',
        featured: true,
      },
      {
        title: 'Eco-Smart Autonomous Waste Segregator',
        students: 'Rohan Deshmukh, Sameer Khan (3rd Year CSE)',
        guide: 'Prof. M. A. Joshi',
        category: 'Robotics & Sustainability',
        description: 'Computer vision camera integrated with servo actuators to automatically categorize plastic, bio-organic, and electronic e-waste.',
        technologies: ['YOLOv8', 'Arduino', 'Python', 'React Dashboard'],
        demoUrl: 'https://github.com',
        githubUrl: 'https://github.com',
        featured: true,
      },
      {
        title: 'Low-Power Forest Fire Acoustic Early Warning Node',
        students: 'Priya Nair, Aniket Kulkarni (2nd & 3rd Year CSE)',
        guide: 'Prof. A. N. Roy',
        category: 'Green Tech & Audio AI',
        description: 'Ultra low-power acoustic spectrogram analyzer that identifies chainsaw noises and thermal anomalies deep within forest canopies.',
        technologies: ['C++', 'MicroPython', 'Signal Processing', 'Zigbee'],
        demoUrl: 'https://github.com',
        githubUrl: 'https://github.com',
        featured: true,
      },
      {
        title: 'Campus Microgrid Intelligent Energy Balancer',
        students: 'Yash Gupta, Neha Choudhary (3rd Year CSE)',
        guide: 'Prof. R. T. Wankhede',
        category: 'Smart Energy & Web',
        description: 'Predictive neural network forecasting classroom power consumption vs rooftop solar generation to shave peak demand loads.',
        technologies: ['LSTM', 'Python', 'Express', 'TailwindCSS'],
        demoUrl: 'https://github.com',
        githubUrl: 'https://github.com',
        featured: true,
      },
    ];
    await Project.insertMany(projects);

    // 8. Seed News
    const newsItems = [
      {
        title: 'Next-Gen Carbon-Neutral Data Centers: How AI is Cooling Server Farms',
        category: 'Cloud Computing',
        content: 'Deep learning reinforcement algorithms are regulating airflow and chiller valves, trimming data center cooling electricity expenditures by over 40% worldwide.',
        readTime: '4 min read',
        source: 'CSE Tech Bulletin',
      },
      {
        title: 'Neuromorphic Chips Mimicking Plant Neural Transmissions',
        category: 'Latest Technology',
        content: 'Researchers unveil ultra-dense memristor architectures that operate on micro-watts of electrical potential, inspired by biological vascular signals.',
        readTime: '3 min read',
        source: 'Nature Meets Tech Review',
      },
      {
        title: 'Green Web Design: How Clean Code Decreases Global Internet Emissions',
        category: 'Web Development',
        content: 'Optimized SVG graphics, dark mode by default, and leaner JavaScript bundles prevent millions of megawatt-hours of unnecessary rendering computations.',
        readTime: '5 min read',
        source: 'Sustainable Dev Digest',
      },
      {
        title: 'Zero-Knowledge Proofs in Decentralized Community Solar Grids',
        category: 'Cyber Security',
        content: 'Cryptographic ZK-SNARK protocols enable residential solar owners to trade excess kilowatt-hours peer-to-peer while preserving complete meter privacy.',
        readTime: '4 min read',
        source: 'Crypto & Energy Journal',
      },
      {
        title: 'Wildlife Conservation Using Edge Computer Vision & Satellite Data',
        category: 'AI News',
        content: 'Conservationists in central India deploy solar camera traps running real-time tiger and leopard identification models with zero human disturbance.',
        readTime: '3 min read',
        source: 'Eco-AI Frontiers',
      },
    ];
    await News.insertMany(newsItems);

    // 9. Seed Achievements
    const achievements = [
      { key: 'problems_solved', label: 'Problems Solved', value: '500+', icon: 'Code', order: 1 },
      { key: 'participants', label: 'Registered Participants', value: '150+', icon: 'Users', order: 2 },
      { key: 'projects', label: 'Innovation Projects', value: '25+', icon: 'Cpu', order: 3 },
      { key: 'events', label: 'Tech Fest Events', value: '12+', icon: 'Calendar', order: 4 },
    ];
    await Achievement.insertMany(achievements);

    console.log('[Seed] Database successfully seeded with rich TECHNODIAZ 2K26 dataset!');
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
  }
};
