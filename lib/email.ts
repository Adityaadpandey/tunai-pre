import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendCircleEmail(
  email: string,
  organizerName: string | null,
  eventFrequency: string | null,
  biggestPain: string | null
) {
  const firstName = organizerName ? organizerName.split(" ")[0] : null
  const greeting = firstName ? `Hey ${firstName} —` : "Hey —"

  const freqLine = eventFrequency
    ? `You organise events ${eventFrequency}. That's exactly who we built this for.`
    : "You're exactly who we built this for."

  const painLine = biggestPain
    ? `You mentioned ${biggestPain.toLowerCase().replace(/\.$/, "")} — that's one of the first things we're solving.`
    : "We're building this from the ground up with organisers like you."

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "Tunai <onboarding@resend.dev>",
    to: email,
    subject: "You're in the Founding Organisers Circle",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
        <div style="margin-bottom: 32px;">
          <img src="https://www.tunai.app/logo.png" alt="Tunai — The Operating System for Events" width="40" height="40" style="border-radius: 10px; display: block;" />
        </div>
        <p style="font-size: 15px; line-height: 1.7; color: #1a1a1a; margin: 0 0 16px;">
          ${greeting}
        </p>
        <p style="font-size: 15px; line-height: 1.7; color: #333; margin: 0 0 16px;">
          You're confirmed on the waitlist for the <strong>Founding Organisers Circle</strong>.
        </p>
        <p style="font-size: 15px; line-height: 1.7; color: #333; margin: 0 0 16px;">
          ${freqLine}
        </p>
        <p style="font-size: 15px; line-height: 1.7; color: #333; margin: 0 0 32px;">
          ${painLine}
        </p>
        <p style="font-size: 15px; line-height: 1.7; color: #333; margin: 0 0 8px;">
          We'll reach out directly with early access details. No spam, no newsletter — just us when it's ready.
        </p>
        <p style="font-size: 13px; color: #999; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
          — Tunai
        </p>
      </div>
    `,
  })

  if (error) {
    console.error("[sendCircleEmail] Failed to send:", error)
    return false
  }

  return true
}
