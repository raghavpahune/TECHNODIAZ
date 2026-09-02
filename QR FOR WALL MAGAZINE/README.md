# 🌿 TECHNODIAZ 2K26 — Wall Magazine Coding Challenge & QR Portal
> **Department of Computer Science & Engineering**  
> *"Where Nature Meets Innovation — The future is DIGITAL but its roots are GREEN"*

---

## 📌 Project Overview
This project is the official web application and printable QR code badge system created for the **TECHNODIAZ 2K26** Wall Magazine board.

### 🧩 Wall Magazine Coding Challenge
```python
def missing_num(nums):
    n = len(nums) + 1
    total = n * (n + 1) // 2
    return total - sum(nums)

# Input from the Wall Magazine:
nums = [1, 2, 4, 5, 6]
# Output: 3
```

---

## 🚀 Key Features

1. **Cyber-Botanical Submission Portal (`index.html`)**:
   - Matches the glowing circuit-tree and wooden foliage aesthetics of the Wall Magazine board.
   - Interactive syntax-highlighted code editor with copy button.
   - Mathematical formula explanation accordion.
   - Participant submission form with instant validation (Correct Answer: `3`).
   - Dynamic **Digital Verification Pass** with a unique Token ID & QR code for prize claims at the CSE booth.
   - Celebratory confetti & audio effects on correct submission.

2. **Wall Magazine QR Generator & Printable Badge (`qr-generator.html`)**:
   - Interactive generator allowing custom URL updates.
   - Generates High-Resolution QR codes (SVG & PNG).
   - **Print-Ready Wooden Badge Card**: Formatted specifically to be printed and glued directly onto the *“CODING CHALLENGE”* QR space on your physical Wall Magazine board!

3. **Organizer & Faculty Admin Portal (`admin.html`)**:
   - Protected with coordinator passcode: `technodiaz2026`
   - Real-time submission metrics: Total entries, Correct entries, Accuracy rate, Top Branch.
   - Live search, department filtering, and status filtering.
   - **One-click CSV Export** to keep records for prize distribution.
   - **Lucky Winner Raffle Wheel**: Randomly selects winners among verified correct entries with confetti animations.

---

## 🌐 How to Deploy (Free & Instant)

### Option 1: Vercel (Recommended - 1 Minute)
1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New Project** and drag & drop this project folder or connect your GitHub repository.
3. Click **Deploy**. Your site will be live on `https://your-project.vercel.app`!
4. Open `qr-generator.html` on your site, enter your Vercel URL, and download/print your updated Wall Magazine QR code.

### Option 2: Netlify Drop (30 Seconds - No Account needed)
1. Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop the `QR FOR WALL MAGAZINE` folder.
3. Your web app goes live instantly with an HTTPS URL.

### Option 3: GitHub Pages
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Technodiaz 2k26 Wall Magazine Portal"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In GitHub, go to **Settings > Pages > Branch: main > Save**.
3. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## 📂 Project Structure
```text
QR FOR WALL MAGAZINE/
├── index.html              # Main participant submission portal
├── qr-generator.html       # QR code generator & printable wall badge
├── admin.html              # Faculty / Organizer dashboard & raffle wheel
├── vercel.json             # Vercel deployment configuration
├── netlify.toml            # Netlify deployment configuration
├── README.md               # Documentation & deployment guide
├── css/
│   └── styles.css          # Cyber-botanical responsive design system
├── js/
│   ├── app.js              # Submission logic & pass generator
│   ├── admin.js            # Admin analytics, CSV export, raffle wheel
│   ├── qrcode.min.js       # Standalone high-performance QR code generator
│   └── confetti.js         # Celebration particle engine
└── assets/
    ├── technodiaz_tree.jpg # Glowing circuit tree emblem
    └── technodiaz_qr_code.svg # Pre-generated vector QR code
```
