import { SITE, whatsappLink } from "@/config/site";

export type SubmitResult = "sent" | "whatsapp";

/** Turns form fields into a readable message for email or WhatsApp. */
export function summarise(title: string, fields: Record<string, string | undefined>): string {
  const lines = Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`);
  return [`${title} (via autotecnix.com)`, "", ...lines].join("\n");
}

export function hasFormBackend(): boolean {
  return Boolean(SITE.web3formsKey);
}

/** Opens WhatsApp with the message pre-filled. Must run inside a click/submit handler. */
export function openWhatsApp(message: string) {
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
}

/**
 * Sends an enquiry through Web3Forms. If no access key is configured yet,
 * hands off to WhatsApp instead so leads are never lost.
 * Throws if the form service rejects the submission.
 */
export async function submitEnquiry(opts: {
  subject: string;
  fields: Record<string, string | undefined>;
  replyTo?: string;
  honeypot?: boolean;
}): Promise<SubmitResult> {
  const message = summarise(opts.subject, opts.fields);

  if (!hasFormBackend()) {
    openWhatsApp(message);
    return "whatsapp";
  }

  const payload: Record<string, unknown> = {
    access_key: SITE.web3formsKey,
    subject: `${opts.subject} · ${SITE.name}`,
    from_name: `${SITE.name} website`,
    botcheck: opts.honeypot ?? false,
    ...Object.fromEntries(Object.entries(opts.fields).filter(([, v]) => v && v.trim())),
  };
  if (opts.replyTo) payload.replyto = opts.replyTo;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
  if (!res.ok || !json.success) {
    throw new Error(json.message || "The form service didn't accept the request.");
  }
  return "sent";
}

/** Uppercases and tidies a UK registration, e.g. "ab12cde" → "AB12 CDE". */
export function normaliseReg(input: string): string {
  const compact = input
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);
  // Current-style plates (two letters, two numbers, three letters) get the standard space.
  if (/^[A-Z]{2}\d{2}[A-Z]{3}$/.test(compact)) return `${compact.slice(0, 4)} ${compact.slice(4)}`;
  return compact;
}
