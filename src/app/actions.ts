"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeToNewsletter(formData: FormData) {
    const email = formData.get("email") as string;
    const hp = formData.get("hp"); // Honeypot hidden field

    if (hp) {
        // Silent fail for bots
        return { success: true };
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { success: false, message: "Email invalide" };
    }

    try {
        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: "Context Article <onboarding@resend.dev>", // Change to your domain when verified
                to: "contact@context-collective.org", // Target email
                subject: "🔔 Nouvelle inscription newsletter",
                html: `<p>Nouvel inscrit : <strong>${email}</strong></p>`,
            });
        } else {
            console.log("----------------------------------------");
            console.log("📧 NEW NEWSLETTER SUBSCRIBER:", email);
            console.log("ℹ️ To send real emails, set RESEND_API_KEY in .env");
            console.log("----------------------------------------");
        }

        return { success: true };
    } catch (error) {
        console.error("Newsletter error:", error);
        return { success: false, message: "Erreur technique" };
    }
}
