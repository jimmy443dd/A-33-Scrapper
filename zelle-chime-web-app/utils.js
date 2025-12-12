const fs = require('fs');
const path = require('path');

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

function writeCSV(data, filename = 'results.csv') {
  const csv = 'email\n' + data.join('\n');
  const filePath = path.join(__dirname, filename);
  fs.writeFileSync(filePath, csv, 'utf8');
  log(`💾 CSV saved to ${filename}`);
}

module.exports = { wait, log, writeCSV };
