import bcrypt from 'bcryptjs';

export const getSeedData = () => {
  const salt = bcrypt.genSaltSync(10);
  const adminPasswordHash = bcrypt.hashSync('admin2026', salt);

  const admins = [
    {
      id: 'admin_1',
      username: 'aditya.president',
      passwordHash: adminPasswordHash,
      name: 'Mr. Aditya Bandhanwar',
      designation: 'President - TECHNODIAZ 2k26',
      role: 'SuperAdmin',
      avatar: '👨‍💼',
    },
    {
      id: 'admin_2',
      username: 'aditya.events',
      passwordHash: adminPasswordHash,
      name: 'Aditya Giradkar',
      designation: 'Event Head',
      role: 'Admin',
      avatar: '🎯',
    },
    {
      id: 'admin_3',
      username: 'hansika.tech',
      passwordHash: adminPasswordHash,
      name: 'Hansika Kakpure',
      designation: 'Technical Head',
      role: 'Admin',
      avatar: '💻',
    },
    {
      id: 'admin_4',
      username: 'aryan.discipline',
      passwordHash: adminPasswordHash,
      name: 'Aryan Thawale',
      designation: 'Discipline Head',
      role: 'Verifier',
      avatar: '🛡️',
    }
  ];

  const notices = [
    {
      id: 'notice_1',
      title: '🌿 Welcome to TECHNODIAZ 2k26 - "Where Nature Meets Innovation"',
      content: 'The Department of Computer Science & Engineering at PBCOE welcomes all students to the grand annual fest on Sept 1 (Technical) & Sept 2 (Sports). Registration is open!',
      category: 'General',
      isUrgent: true,
      author: 'Mr. Aditya Bandhanwar (President)',
      createdAt: new Date('2026-08-30T10:00:00Z'),
    },
    {
      id: 'notice_2',
      title: '⚡ Flagship Hackathons: IdeaStorm & TechCanvas Registration Deadlines',
      content: 'IdeaStorm (Innovation Pitching) & TechCanvas (Web/UI Hackathon) slots are filling up quickly. Ensure your team registers to secure your spot.',
      category: 'Technical',
      isUrgent: false,
      author: 'Aditya Giradkar (Event Head)',
      createdAt: new Date('2026-08-30T14:30:00Z'),
    },
    {
      id: 'notice_3',
      title: '🏆 Mega College Quiz Quest: Live Prelims Round Details',
      content: 'Prelims for the Mega College Quiz Quest will commence at 11:00 AM on Sept 1st in the CSE Main Auditorium. Exciting cash prizes and trophies await!',
      category: 'Technical',
      isUrgent: false,
      author: 'Hansika Kakpure (Technical Head)',
      createdAt: new Date('2026-08-31T09:00:00Z'),
    },
    {
      id: 'notice_4',
      title: '⚽ Sports Day Regulations - September 2nd, 2026',
      content: 'All sports participants (Box Cricket, Futsal, Chess, Tug of War, LAN Battle) must report by 8:30 AM at PBCOE Sports Ground with verified digital QR passes.',
      category: 'Sports',
      isUrgent: false,
      author: 'Aryan Thawale (Discipline Head)',
      createdAt: new Date('2026-08-31T11:00:00Z'),
    },
    {
      id: 'notice_5',
      title: '🌱 Eco-Tech Initiative: Zero Paper Entry System',
      content: 'In line with our sustainable computing theme, carry your downloadable digital QR code pass on your smartphone for zero-contact entry verification.',
      category: 'Urgent',
      isUrgent: true,
      author: 'Sharayu Bhute (Secretary)',
      createdAt: new Date('2026-08-31T15:00:00Z'),
    }
  ];

  const challenges = [
    {
      id: 'challenge_1',
      title: 'Board Puzzle: Find the Missing Number',
      difficulty: 'Easy',
      language: 'Python',
      questionText: 'Analyze the mathematical formula and determine the exact return value for nums = [1, 2, 4, 5, 6].',
      codeSnippet: `def missing_num(nums):
    n = len(nums) + 1
    total = n * (n + 1) // 2
    return total - sum(nums)

# Input Array:
nums = [1, 2, 4, 5, 6]
result = missing_num(nums)
print(result)`,
      options: [
        { label: '3', isCorrect: true },
        { label: '4', isCorrect: false },
        { label: '7', isCorrect: false },
        { label: '0', isCorrect: false }
      ],
      explanation: 'n = 5 + 1 = 6. Total sum from 1 to 6 is (6 * 7) // 2 = 21. Sum of given nums is 1+2+4+5+6 = 18. Missing number is 21 - 18 = 3.',
      rewardPoints: 100
    },
    {
      id: 'challenge_2',
      title: 'Bioluminescent Tree: Maximum Branch Energy',
      difficulty: 'Medium',
      language: 'JavaScript',
      questionText: 'What is the output of the recursive branch energy accumulator when evaluating the circuit node depths?',
      codeSnippet: `const calculateLeafPower = (nodes) => {
  return nodes.reduce((acc, curr) => {
    return curr % 2 === 0 ? acc + (curr * 2) : acc + curr;
  }, 0);
};

const treeBranches = [2, 3, 4, 5, 6];
console.log(calculateLeafPower(treeBranches));`,
      options: [
        { label: '32', isCorrect: true },
        { label: '20', isCorrect: false },
        { label: '28', isCorrect: false },
        { label: '40', isCorrect: false }
      ],
      explanation: 'For even numbers (2, 4, 6), energy is doubled: (2*2 = 4, 4*2 = 8, 6*2 = 12). For odd (3, 5), normal: 3 + 5 = 8. Total = 4 + 8 + 12 + 8 = 32.',
      rewardPoints: 150
    },
    {
      id: 'challenge_3',
      title: 'Green Matrix: Asymptotic Complexity Optimization',
      difficulty: 'Hard',
      language: 'Python',
      questionText: 'What is the time complexity of searching a target in an N x M matrix where every row and column is sorted in ascending order?',
      codeSnippet: `# Searching in row-wise and column-wise sorted grid
# Optimal staircase search starting at matrix[0][M-1]`,
      options: [
        { label: 'O(N + M)', isCorrect: true },
        { label: 'O(N * M)', isCorrect: false },
        { label: 'O(log(N * M))', isCorrect: false },
        { label: 'O(N log M)', isCorrect: false }
      ],
      explanation: 'Starting at top-right corner, we move left if element > target and down if element < target, taking at most N + M steps.',
      rewardPoints: 250
    }
  ];

  const teams = [
    {
      id: 'team_1',
      registrationId: 'TECH-2026-9081',
      teamName: 'CyberSprouts',
      eventCategory: 'IdeaStorm (Innovation Pitching)',
      eventType: 'Technical',
      leaderName: 'Rohan Sharma',
      leaderEmail: 'rohan.sharma@pbcoe.edu.in',
      leaderPhone: '+91 98765 43210',
      collegeName: 'PBCOE Nagpur',
      department: 'Computer Science & Engineering',
      yearOfStudy: '3rd Year',
      members: [
        { name: 'Rohan Sharma', role: 'Team Leader', email: 'rohan.sharma@pbcoe.edu.in', phone: '+91 98765 43210' },
        { name: 'Neha Deshmukh', role: 'Presenter', email: 'neha.d@pbcoe.edu.in', phone: '+91 98765 43211' },
        { name: 'Amit Kulkarni', role: 'Researcher', email: 'amit.k@pbcoe.edu.in', phone: '+91 98765 43212' }
      ],
      verified: true,
      verifiedAt: new Date('2026-08-31T08:15:00Z'),
      verifiedBy: 'Mr. Aditya Bandhanwar',
      qrCodeData: JSON.stringify({
        regId: 'TECH-2026-9081',
        team: 'CyberSprouts',
        event: 'IdeaStorm (Innovation Pitching)',
        leader: 'Rohan Sharma',
        college: 'PBCOE Nagpur'
      }),
      registeredAt: new Date('2026-08-29T11:20:00Z')
    },
    {
      id: 'team_2',
      registrationId: 'TECH-2026-4412',
      teamName: 'NeonRoots Devs',
      eventCategory: 'TechCanvas (Web & UI/UX Hackathon)',
      eventType: 'Technical',
      leaderName: 'Tanvi Joshi',
      leaderEmail: 'tanvi.joshi@pbcoe.edu.in',
      leaderPhone: '+91 98231 11223',
      collegeName: 'PBCOE Nagpur',
      department: 'Computer Science & Engineering',
      yearOfStudy: 'Final Year',
      members: [
        { name: 'Tanvi Joshi', role: 'UI/UX Lead', email: 'tanvi.joshi@pbcoe.edu.in', phone: '+91 98231 11223' },
        { name: 'Siddharth Patil', role: 'Full Stack Dev', email: 'sid.p@pbcoe.edu.in', phone: '+91 98231 11224' }
      ],
      verified: false,
      verifiedAt: null,
      verifiedBy: null,
      qrCodeData: JSON.stringify({
        regId: 'TECH-2026-4412',
        team: 'NeonRoots Devs',
        event: 'TechCanvas (Web & UI/UX Hackathon)',
        leader: 'Tanvi Joshi',
        college: 'PBCOE Nagpur'
      }),
      registeredAt: new Date('2026-08-30T16:45:00Z')
    },
    {
      id: 'team_3',
      registrationId: 'TECH-2026-7734',
      teamName: 'CircuitStrikers',
      eventCategory: 'Box Cricket Championship',
      eventType: 'Sports',
      leaderName: 'Kunal Raut',
      leaderEmail: 'kunal.raut@pbcoe.edu.in',
      leaderPhone: '+91 94050 99887',
      collegeName: 'PBCOE Nagpur',
      department: 'Information Technology',
      yearOfStudy: '2nd Year',
      members: [
        { name: 'Kunal Raut', role: 'Captain', email: 'kunal.raut@pbcoe.edu.in', phone: '+91 94050 99887' },
        { name: 'Pratik Bisen', role: 'All-Rounder', email: 'pratik.b@pbcoe.edu.in', phone: '+91 94050 99888' },
        { name: 'Harsh Meshram', role: 'Bowler', email: 'harsh.m@pbcoe.edu.in', phone: '+91 94050 99889' },
        { name: 'Sameer Sheikh', role: 'Batsman', email: 'sameer.s@pbcoe.edu.in', phone: '+91 94050 99890' }
      ],
      verified: false,
      verifiedAt: null,
      verifiedBy: null,
      qrCodeData: JSON.stringify({
        regId: 'TECH-2026-7734',
        team: 'CircuitStrikers',
        event: 'Box Cricket Championship',
        leader: 'Kunal Raut',
        college: 'PBCOE Nagpur'
      }),
      registeredAt: new Date('2026-08-30T19:10:00Z')
    }
  ];

  return { admins, notices, challenges, teams };
};
