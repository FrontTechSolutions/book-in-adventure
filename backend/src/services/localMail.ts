import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: 'b93cde149dddf1',
    pass: '5137d1fad4ff35',
  },
});


export async function sendVerificationEmail(email: string, code: string): Promise<void> {
  await transporter.sendMail({
    from: '"Mon App" <no-reply@monapp.com>',
    to: email,
    subject: "Vérification de votre compte",
    text: `Votre code de vérification est : ${code}`,
  });
}

