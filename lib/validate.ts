const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LEN = 254;

const EXPERIENCE_VALUES = ["beginner", "some", "active", "unknown"] as const;
export type Experience = (typeof EXPERIENCE_VALUES)[number];

const MARKET_VALUES = ["stocks", "etfs", "crypto", "options"] as const;
export type Market = (typeof MARKET_VALUES)[number];

export interface WaitlistPayload {
  email: string;
  experience?: Experience;
  markets?: Market[];
  source?: string;
}

export function validateEmail(email: unknown): string | null {
  if (typeof email !== "string") return null;
  const trimmed = email.trim().toLowerCase();
  if (trimmed.length === 0 || trimmed.length > MAX_EMAIL_LEN) return null;
  if (!EMAIL_RE.test(trimmed)) return null;
  return trimmed;
}

export function validateExperience(val: unknown): Experience | undefined {
  if (typeof val !== "string") return undefined;
  const lower = val.toLowerCase();
  if (EXPERIENCE_VALUES.includes(lower as Experience)) return lower as Experience;
  return undefined;
}

export function validateMarkets(val: unknown): Market[] | undefined {
  if (!Array.isArray(val)) return undefined;
  const valid = val
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.toLowerCase())
    .filter((v): v is Market => MARKET_VALUES.includes(v as Market));
  return valid.length > 0 ? valid : undefined;
}
