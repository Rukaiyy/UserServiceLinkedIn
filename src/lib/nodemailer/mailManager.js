import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const transport = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
})
export const sendMail = async(to, subject, content) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: subject,
        text: content,
    }
    transport.sendMail(mailOptions, () => {
        console.log(`Mail sent successfully`);
    })
}
