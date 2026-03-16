import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {

    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagelink.com"
        }
    });

    const emailTextual = mailGenerator.generatePlaintext(options.mailGenerator);
    const emailHtml = mailGenerator.generate(options.mailGenerator);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: Number(process.env.MAILTRAP_SMTP_PORT),
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    });

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error("Email service failed silently. Make sure MAILTRAP credentials are correct.");
        console.error("Error:", error);
    }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! We're excited to have you on board.",
            action: {
                instructions: "To verify your email please click the button below:",
                button: {
                    color: "#22BC66",
                    text: "Verify your email",
                    link: verificationUrl
                }
            },
            outro: "Need help? Just reply to this email."
        }
    };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We received a request to reset your password.",
            action: {
                instructions: "Click the button below to reset your password:",
                button: {
                    color: "#22BC66",
                    text: "Reset password",
                    link: passwordResetUrl
                }
            },
            outro: "Need help? Just reply to this email."
        }
    };
};

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
};