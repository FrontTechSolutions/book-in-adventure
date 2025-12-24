const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: 'b93cde149dddf1',
    pass: '5137d1fad4ff35',
  },
});

async function sendVerificationEmail(email, code) {
  await transporter.sendMail({
    from: '"Mon App" <no-reply@monapp.com>',
    to: email,
    subject: "Vérification de votre compte",
    text: `Votre code de vérification est : ${code}`,
  });
}

module.exports = { sendVerificationEmail };