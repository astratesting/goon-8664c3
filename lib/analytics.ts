export function track(_event: string, _props?: Record<string, unknown>): void {
  if (process.env.NEXT_PUBLIC_ANALYTICS === "true") {
    // Analytics hook — no-op by default.
    // Wire to Plausible, PostHog, or similar when ready.
  }
}
