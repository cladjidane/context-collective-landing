import nodemailer from "nodemailer";

// Configuration SMTP
const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
};

// Créer le transporter SMTP si configuré
const transporter =
    smtpConfig.host && smtpConfig.auth.user
        ? nodemailer.createTransport(smtpConfig)
        : null;

// Email expéditeur
const fromEmail = process.env.SMTP_FROM || "contact@context-collective.org";
const fromName = process.env.SMTP_FROM_NAME || "Context Collective";

interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
    // Si SMTP non configuré → log en console (mode dev)
    if (!transporter) {
        console.log("----------------------------------------");
        console.log(`[EMAIL] Mock sent to: ${to}`);
        console.log(`[EMAIL] Subject: ${subject}`);
        console.log("[EMAIL] ℹ️ Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD in .env to send real emails");
        console.log("----------------------------------------");
        return { success: true, mocked: true };
    }

    try {
        const info = await transporter.sendMail({
            from: `${fromName} <${fromEmail}>`,
            to,
            subject,
            html,
        });

        console.log(`[EMAIL] Sent via SMTP to ${to}: ${info.messageId}`);
        return { success: true, data: { id: info.messageId } };
    } catch (error) {
        console.error("[EMAIL] Error sending email:", error);
        return { success: false, error };
    }
}
