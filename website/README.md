# TECHNODIAZ 2K26 — Official Web Ecosystem & Coding Platform
**Department of Computer Science & Engineering**  
**Theme:** *"WHERE NATURE MEETS INNOVATION"*

---

## Overview

**TECHNODIAZ 2K26** is a responsive full-stack platform built for the annual national technical festival and coding challenge organized by the Department of Computer Science & Engineering.

The platform transforms the physical **TECHNODIAZ technology exhibition wall** into an intelligent digital ecosystem merging:
- 🌿 **Nature & Sustainability:** Carbon-aware algorithms, green computing, and bio-circuit aesthetics.
- 💻 **Core Technology:** Interactive Monaco Code Editor with multi-language execution (C, C++, Java, Python, JavaScript).
- 🧠 **Innovation & AI:** Interactive central Technology Tree, AI for Good showcase, and student project highlights.
- 🏆 **Competition:** Live leaderboard podium, real-time score calculation, and CSE faculty evaluation suite.

---

## Project Structure

```
technodiaz-2k26/
├── client/                     # React + Vite + Tailwind CSS Frontend
│   ├── public/                 # Favicons and SVGs
│   ├── src/
│   │   ├── components/
│   │   │   ├── challenge/      # ChallengeCard, MonacoCodeEditor
│   │   │   ├── common/         # Navbar, Footer, CircuitBackground
│   │   │   ├── home/           # TechnologyTree, TechNews, AIForGood, SustainableComputing, Projects, Events, Achievements, MemeCorner, QRCodeSection
│   │   ├── context/            # AuthContext, ToastContext
│   │   ├── pages/              # LandingPage, ChallengesPage, ChallengeDetailPage, LoginPage, RegisterPage, DashboardPage, SubmissionsPage, LeaderboardPage, AdminDashboardPage
│   │   ├── services/           # api.js API client helper
│   │   ├── App.jsx             # Main router
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Design tokens, circuit glow, and animations
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Node.js + Express.js + Mongoose Backend
│   ├── config/                 # db.js (Hybrid connection + in-memory fallback)
│   ├── controllers/            # authController, challengeController, submissionController, leaderboardController, contentController, adminController
│   ├── middleware/             # authMiddleware, adminMiddleware, errorMiddleware
│   ├── models/                 # User, Challenge, Submission, Event, Announcement, Project, News, Achievement
│   ├── routes/                 # authRoutes, challengeRoutes, submissionRoutes, leaderboardRoutes, contentRoutes, adminRoutes
│   ├── utils/                  # codeRunner.js (safe sandbox), seedData.js (realistic demo dataset)
│   ├── server.js               # Express server entry point
│   ├── package.json
│   └── .env
│
├── package.json                # Root package with helper scripts
└── README.md
```

---

## Pre-Configured Accounts

The database automatically seeds realistic accounts on the very first run:

| Role | Email | Password | Details |
|---|---|---|---|
| **CSE Administrator** | `admin@technodiaz.com` | `Admin@2026` | Full CRUD privileges, evaluation suite, student management |
| **Student (Rank 1)** | `rahul@pbcoe.edu` | `Password@123` | Rahul Verma (PBCOE, 180 Pts, 9 Solved) |
| **Student (Rank 2)** | `aaditya@pbcoe.edu` | `Password@123` | Aaditya Sharma (PBCOE, 160 Pts, 8 Solved) |
| **Student (Rank 3)** | `sneha@vnit.ac.in` | `Password@123` | Sneha Patil (VNIT Nagpur, 140 Pts, 7 Solved) |

*You can also register a brand new student account on `/register`!*

---

## Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### 1. Run the Backend Server
```bash
cd server
npm install
npm start
```
> **Zero-Setup Database:** The server automatically connects to local MongoDB if running. If local MongoDB is not found, it seamlessly launches an embedded in-memory MongoDB instance (`mongodb-memory-server`) and seeds all demo data automatically!

### 2. Run the Frontend Client
```bash
cd client
npm install
npm run dev
```
Open your browser at: **`http://localhost:5173`**

---

## Environment Variables (`server/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/technodiaz2k26
JWT_SECRET=technodiaz_nature_meets_innovation_super_secret_jwt_key_2026!
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## API Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register new student (Name, Email, Mobile, College, Branch, Year, Roll No, Password).
- `POST /api/auth/login` — Sign in and receive JWT token.
- `GET /api/auth/me` — Get current logged-in student profile and score.
- `POST /api/auth/logout` — Invalidate session.

### Coding Challenges (`/api/challenges`)
- `GET /api/challenges` — List challenges with category/difficulty filters and user solved status.
- `GET /api/challenges/:id` — Get single challenge details and test cases.
- `POST /api/challenges/:id/run` — Test-run code against public test cases.
- `POST /api/challenges` — Create new challenge *(Admin)*.
- `PUT /api/challenges/:id` — Update challenge *(Admin)*.
- `DELETE /api/challenges/:id` — Delete challenge *(Admin)*.
- `POST /api/challenges/:id/duplicate` — Duplicate challenge as draft *(Admin)*.

### Submissions & Grading (`/api/submissions`)
- `POST /api/submissions` — Submit solution (`CODE`, `TEXT`, or `MCQ`).
- `GET /api/submissions/my` — Get authenticated student's submission history.
- `GET /api/submissions/:id` — Get single submission details.
- `GET /api/submissions/admin/all` — Get all student submissions *(Admin)*.
- `PUT /api/submissions/admin/:id/evaluate` — Grade/score submission and provide feedback *(Admin)*.

### Live Leaderboard (`/api/leaderboard`)
- `GET /api/leaderboard` — Get live student rankings, scores, solve count, and accuracy percentages.

### Exhibition Content (`/api/content`)
- `GET /api/content/announcements` — Get active announcements ticker.
- `GET /api/content/events` — Get festival events schedule.
- `GET /api/content/projects` — Get student project spotlight.
- `GET /api/content/news` — Get tech news bulletin.
- `GET /api/content/achievements` — Get configurable metrics counter.

---

## Coding Challenge Workflow

1. **Student Registration:** Students sign up with roll number, college name, and department.
2. **Challenge Selection:** Choose algorithmic challenges from Easy, Medium, or Hard categories.
3. **Interactive Monaco IDE:** Code in C, C++, Java, Python, or JavaScript with syntax highlighting and instant public test runner.
4. **Permanent Logging:** Confirmation modal ensures student commits their final code to MongoDB.
5. **Evaluation & Recalculation:**
   - MCQs auto-evaluate with points.
   - Code & Architectural proposals queue for CSE judging evaluation.
   - Faculty can grade, award points, and add constructive feedback in the Admin Suite.
   - Student dashboard and Live Leaderboard recalculate automatically!
