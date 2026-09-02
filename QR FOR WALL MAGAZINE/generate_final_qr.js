const fs = require('fs');
const path = require('path');
const QRCode = require('./js/qrcode.min.js');

const liveUrl = 'https://18164671727d34.lhr.life';
console.log('Generating Single Final QR Code for Live Deployed URL:', liveUrl);

// Generate QR Code with high resolution
const qr = new QRCode(null, {
  text: liveUrl,
  width: 600,
  height: 600,
  colorDark: '#05120a',
  colorLight: '#ffffff',
  correctLevel: 2 // H
});

const svgContent = qr.getSvg();

// Save SVG in workspace assets
const workspaceSvg = path.join(__dirname, 'assets', 'final_coding_challenge_qr.svg');
fs.writeFileSync(workspaceSvg, svgContent, 'utf-8');

// Also save in brain artifacts directory
const brainDir = 'C:\\Users\\aadit\\.gemini\\antigravity-ide\\brain\\7a1a4a94-5aba-446f-8f42-a02f202bd6d3';
const brainSvg = path.join(brainDir, 'final_coding_challenge_qr.svg');
fs.writeFileSync(brainSvg, svgContent, 'utf-8');

console.log('Saved SVG to workspace & brain artifacts directory.');
