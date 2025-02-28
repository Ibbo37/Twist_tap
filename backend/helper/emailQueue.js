// import Queue from 'bull';
// import nodemailer from 'nodemailer';

// import { Verification_email } from './emailTemplate.js';

// const emailQueue = new Queue('emailQueue', {
//   redis: {
//     host: '127.0.0.1',
//     port: 6379,
//   },
// });


// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.GMAIL,
//     pass: process.env.PASS,
//   },
// });


// emailQueue.process(async (job) => {
//   const { email, token } = job.data;

//   const mailOptions = {
//     from: 'Twist n Tape <no-reply@twistntape.com>',
//     to: email,
//     subject: 'Verification Email | Twist n Tape',
//     html: Verification_email.replace('verificationCode', token),
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Email sent successfully to ${email}: ${info.response}`);
//   } catch (error) {
//     console.error(`Failed to send email to ${email}:`, error.message);
//     throw error;
//   }
// });

// export default emailQueue;
