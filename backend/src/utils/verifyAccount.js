const crypto = require('crypto');

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function hashCode(code) {
  return crypto.createHash('sha256').update(code).digest('hex');
}

module.exports = { generateVerificationCode, hashCode };