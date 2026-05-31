import type { APIRoute } from "astro";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const prerender = false;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let _ratelimit: Ratelimit | null = null;
function getRatelimit() {
  if (!_ratelimit) {
    _ratelimit = new Ratelimit({
      redis: new Redis({
        url: import.meta.env.UPSTASH_REDIS_REST_URL,
        token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
      }),
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      prefix: "contact",
    });
  }
  return _ratelimit;
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    },
  );
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const reason = String(body.reason ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.company ?? "").trim();
  const turnstileToken = String(body.turnstileToken ?? "").trim();

  // Honeypot: pretend success so bots don't learn they were caught.
  if (honeypot) return json({ ok: true }, 200);

  if (!turnstileToken) {
    return json({ ok: false, error: "Please complete the verification." }, 400);
  }

  const ip = clientAddress || "unknown";

  const human = await verifyTurnstile(turnstileToken, ip);
  if (!human) {
    return json(
      { ok: false, error: "Verification failed. Please try again." },
      400,
    );
  }

  const { success } = await getRatelimit().limit(ip);
  if (!success) {
    return json(
      { ok: false, error: "Too many messages. Please try again later." },
      429,
    );
  }

  if (!name || !email || !message) {
    return json({ ok: false, error: "Please fill in the required fields." }, 400);
  }
  if (!emailRe.test(email)) {
    return json({ ok: false, error: "Enter a valid email address." }, 400);
  }
  if (message.length < 12 || message.length > 2000) {
    return json({ ok: false, error: "Message must be 12–2000 characters." }, 400);
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  const subjectLine = subject || reason || "New message from arjunbasandrai.dev";

  const { error } = await resend.emails.send({
    from: import.meta.env.CONTACT_FROM_EMAIL,
    to: import.meta.env.CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `[Contact] ${subjectLine}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      reason ? `Reason: ${reason}` : null,
      subject ? `Subject: ${subject}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });

  if (error) {
    return json({ ok: false, error: "Couldn't send right now. Try again later." }, 502);
  }

  return json({ ok: true }, 200);
};
