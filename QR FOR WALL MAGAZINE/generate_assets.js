const fs = require('fs');
const path = require('path');
const QRCode = require('./js/qrcode.min.js');

// 1. Generate QR Code for live website / deployment
const targetUrl = 'https://technodiaz-2k26-challenge.surge.sh';
console.log('Generating QR code for target URL:', targetUrl);

const qr = new QRCode(null, {
  text: targetUrl,
  width: 500,
  height: 500,
  colorDark: '#05120a',
  colorLight: '#ffffff',
  correctLevel: 2 // H
});

const svgContent = qr.getSvg();
const svgPath = path.join(__dirname, 'assets', 'technodiaz_qr_code.svg');
fs.writeFileSync(svgPath, svgContent, 'utf-8');
console.log('Successfully saved SVG QR code to:', svgPath);

// 2. Validate Challenge logic
function missing_num(nums) {
  const n = nums.length + 1;
  const total = Math.floor(n * (n + 1) / 2);
  const sum = nums.reduce((a, b) => a + b, 0);
  return total - sum;
}

const input = [1, 2, 4, 5, 6];
const result = missing_num(input);
console.log('Challenge test for nums = [1, 2, 4, 5, 6]:');
console.log('Returned output:', result);
console.log('Expected:', 3);
console.log('Validation:', result === 3 ? 'PASS (Correct Answer is 3)' : 'FAIL');
