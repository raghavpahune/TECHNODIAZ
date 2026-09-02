import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('================================================================');
console.log('🌿 LAUNCHING TECHNODIAZ 2K26 (PBCOE CSE TECH & SPORTS FEST) ⚡');
console.log('================================================================\n');

// 1. Start Backend Server
console.log('[Backend] Starting Node.js Express server on http://localhost:5000 ...');
const backend = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// 2. Start Frontend Dev Server
console.log('[Frontend] Starting Vite React server on http://localhost:5173 ...');
const frontend = spawn('npx', ['vite', '--host', 'localhost'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

process.on('SIGINT', () => {
  console.log('\nStopping servers...');
  backend.kill();
  frontend.kill();
  process.exit();
});
