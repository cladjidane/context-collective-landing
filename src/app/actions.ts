"use server";

import { sendEmail } from "@/lib/email";

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
        await sendEmail({
            to: process.env.NEWSLETTER_RECIPIENT || "contact@context-collective.org",
            subject: "🔔 Nouvelle inscription newsletter",
            html: `<p>Nouvel inscrit : <strong>${email}</strong></p>`,
        });

        return { success: true };
    } catch (error) {
        console.error("Newsletter error:", error);
        return { success: false, message: "Erreur technique" };
    }
}
