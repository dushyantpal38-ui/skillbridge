// Lightweight, no-backend verification: an industry account is "verified"
// only if the email they sign up with belongs to the same domain as their
// company website, and isn't a free/personal email provider.
//
// This is a demo-grade check, not real KYB (know-your-business) verification.
// A production version would add: OTP sent to the official email, a manual
// admin review queue for edge cases, and document upload (GST/incorporation
// certificate) for companies without a public website.

const FREE_EMAIL_PROVIDERS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "protonmail.com",
  "aol.com",
  "rediffmail.com",
];

function normalizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];
}

export function verifyIndustryDomain(email: string, website: string): boolean {
  const emailDomain = email.trim().toLowerCase().split("@")[1];
  if (!emailDomain) return false;
  if (FREE_EMAIL_PROVIDERS.includes(emailDomain)) return false;

  const siteDomain = normalizeDomain(website);
  if (!siteDomain) return false;

  return (
    emailDomain === siteDomain ||
    emailDomain.endsWith(`.${siteDomain}`) ||
    siteDomain.endsWith(`.${emailDomain}`)
  );
}
