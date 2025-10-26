// import { text } from 'express';
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// console.log('SMTP Config:', {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_SECRETCODE ? '****' : undefined,
// });

// export const createTransport = () => {
//     return nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_SECRETCODE,
//         },
//         connectionTimeout: 30000, // 10 seconds
//         greetingTimeout: 30000, // 10 seconds
//         socketTimeout: 30000, // 10 seconds
//         logger: true, // Enable logging
//         debug: true, // Enable debug output
//     });
// };

// export const sendOtpEmail = async (toEmail, otp) => {
//     try {
//         const transporter = createTransport();
//         const mailOptions = {
//             from: `QuizTech <${process.env.EMAIL_USER}>`,
//             to: toEmail,
//             subject: "🔑 Your QuizTech OTP code",
//             text: `Your login OTP is ${otp}. It expires in 15minutes.`,
//             html: `
//                 <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; color: #333;">
//                     <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
//                         <h2 style="color: #4CAF50; text-align: center; margin-bottom: 20px;">QuizTech Login</h2>
//                         <p style="font-size: 16px;">Hello,</p>
//                         <p style="font-size: 16px;">
//                             You requested to log in to your <b>QuizTech</b> account. 
//                             Please use the OTP below to complete your login.
//                         </p>
//                         <div style="text-align: center; margin: 30px 0;">
//                             <span style="display: inline-block; font-size: 24px; font-weight: bold; background: #f3f4f6; color: #111827; padding: 12px 24px; border-radius: 6px; letter-spacing: 4px;">
//                                 ${otp}
//                             </span>
//                         </div>
//                         <p style="font-size: 15px; color: #555;">
//                             ⚠️ This code will expire in <b>15 minutes</b>. 
//                             If you did not request this, you can ignore this email.
//                         </p>
//                         <p style="font-size: 14px; color: #999; margin-top: 30px; text-align: center;">
//                             &copy; ${new Date().getFullYear()} QuizTech. All rights reserved.
//                         </p>
//                     </div>
//                 </div>
//             `,
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log("OTP email sent:", info.messageId);
//         return info;
//     } catch (error) {
//         console.error("Failed to send OTP email:", error);
//         throw new Error(`Failed to send OTP email: ${error.message}`);
//     }
// };

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('SMTP Config:', {
    user: process.env.EMAIL_USER,
    sendgridApiKey: process.env.SENDGRID_API_KEY ? '****' : undefined,
});

export const createTransport = () => {
    return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
            user: 'apikey',  // Always 'apikey' for SendGrid
            pass: process.env.SENDGRID_API_KEY,
        },
    });
};

export const sendOtpEmail = async (toEmail, otp) => {
    try {
        const transporter = createTransport();
        const mailOptions = {
            from: `QuizTech <${process.env.EMAIL_USER}>`,  // Use verified sender/domain
            to: toEmail,
            subject: "🔑 Your QuizTech OTP code",
            text: `Your login OTP is ${otp}. It expires in 15 minutes.`,
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; color: #333;">
                    <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                        <h2 style="color: #4CAF50; text-align: center; margin-bottom: 20px;">QuizTech Login</h2>
                        <p style="font-size: 16px;">Hello,</p>
                        <p style="font-size: 16px;">
                            You requested to log in to your <b>QuizTech</b> account. 
                            Please use the OTP below to complete your login.
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <span style="display: inline-block; font-size: 24px; font-weight: bold; background: #f3f4f6; color: #111827; padding: 12px 24px; border-radius: 6px; letter-spacing: 4px;">
                                ${otp}
                            </span>
                        </div>
                        <p style="font-size: 15px; color: #555;">
                            ⚠️ This code will expire in <b>15 minutes</b>. 
                            If you did not request this, you can ignore this email.
                        </p>
                        <p style="font-size: 14px; color: #999; margin-top: 30px; text-align: center;">
                            &copy; ${new Date().getFullYear()} QuizTech. All rights reserved.
                        </p>
                    </div>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("OTP email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Failed to send OTP email:", error);
        throw new Error(`Failed to send OTP email: ${error.message}`);
    }
};