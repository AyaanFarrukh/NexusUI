import type { AIModel } from "@/types/ai";

export const MONTHLY_TOKEN_QUOTA = 50000;

/** Rough token estimate (≈ 4 characters per token). */
export function estimateTokens(text: string): number {
  return Math.max(1, Math.round(text.length / 4));
}

interface CompletionOptions {
  model: AIModel;
  temperature: number;
  systemPrompt: string;
}

/**
 * ─────────────────────────────────────────────────────────────
 * DEMO AI ENGINE — responses are generated locally, no API calls.
 *
 * TO CONNECT A REAL PROVIDER (OpenAI, Anthropic, Groq, your backend):
 *   1. Create an API route (e.g. `app/api/chat/route.ts`) that calls
 *      the provider with your secret key (never expose keys client-side).
 *   2. Replace the body of `requestCompletion` with a `fetch()` to that
 *      route and return the completion text.
 *   Everything else in the UI (history, usage, settings) keeps working.
 * ─────────────────────────────────────────────────────────────
 */
export async function requestCompletion(
  prompt: string,
  options: CompletionOptions
): Promise<string> {
  // Simulated network + inference latency
  await new Promise((resolve) => setTimeout(resolve, 700 + Math.random() * 800));

  // Simulated failure so the error state can be demonstrated.
  // Tip: type the word "error" in a prompt to see it.
  if (/\berror\b/i.test(prompt)) {
    throw new Error(
      "The model could not process this request (simulated error). Adjust your prompt and retry."
    );
  }

  return buildMockResponse(prompt, options);
}

function buildMockResponse(prompt: string, options: CompletionOptions): string {
  const p = prompt.toLowerCase();
  const creative = options.temperature > 0.7;
  const modelTag = `— ${options.model.name} · temperature ${options.temperature.toFixed(1)} (demo response)`;

  if (p.includes("summar")) {
    return `Here's a concise summary:\n\n• Core idea — the text centers on one primary argument, supported by three examples.\n• Key evidence — quantitative results are used to justify the conclusion.\n• Open questions — the author flags two areas that need more data.\n\nWant a one-line version as well?\n${modelTag}`;
  }

  if (p.includes("email") || p.includes("follow-up")) {
    return `Subject: Quick follow-up on our Q2 proposal\n\nHi [Client name],\n\nThank you for taking the time to review our proposal last week. I wanted to check if any questions came up for your team, and offer a short call to walk through the pricing section in more detail.\n\nWould Thursday or Friday afternoon work for a 15-minute sync?\n\nBest regards,\n[Your name]\n${modelTag}`;
  }

  if (p.includes("idea") || p.includes("brainstorm") || p.includes("marketing")) {
    return `Here are 10 ideas to explore:\n\n1. Launch a "build in public" developer blog series.\n2. Ship a free tier with a generous limit to drive word of mouth.\n3. Create template galleries users can clone in one click.\n4. Host a monthly live-coding workshop.\n5. Partner with niche newsletters for sponsored issues.\n6. Open-source a small utility as a lead magnet.\n7. Run a hack weekend with prizes for the best integration.\n8. Publish a benchmark report comparing approaches.\n9. Add a referral program that rewards both sides.\n10. Build an interactive playground right on the landing page.${creative ? "\n\nWildcard: a CLI easter-egg that generates ASCII art of your logo." : ""}\n\nWant me to expand any of these into an execution plan?\n${modelTag}`;
  }

  if (p.includes("code") || p.includes("debounce") || p.includes("explain")) {
    return `A debounce function delays running a function until the user stops triggering it:\n\n1. Each call resets a timer (clearTimeout).\n2. Only when the timer finally completes does the real function run.\n3. Typical uses: search inputs, window resize handlers, autosave.\n\nIn short: "wait until the noise stops, then act once."\n\nWant a typed TypeScript implementation?\n${modelTag}`;
  }

  return `Here's my take on "${prompt.length > 80 ? prompt.slice(0, 80) + "…" : prompt}":\n\n1. Context — the request touches both strategy and execution, so I'd separate the two.\n2. Key considerations — time budget, quality bar, and who reviews the output.\n3. Recommendation — start with the smallest version that delivers value, then iterate.${creative ? "\n\nAnd a bolder angle: flip the assumption and try the opposite approach for one week." : ""}\n\nWant me to go deeper on any point?\n${modelTag}`;
}