import { describe, it, expect } from "vitest";
import { welcomeEmail } from "./welcome";
import { passwordResetEmail } from "./password-reset";

describe("welcome", () => {
  it("renders greeting and dashboard cta", () => {
    const html = welcomeEmail({ name: "Olivia", email: "olivia@deex.com", dashboardUrl: "https://deex.com/dashboard" });
    expect(html).toContain("WELCOME TO DEEX, OLIVIA");
    expect(html).toContain("Open DeeX");
    expect(html).toContain("https://deex.com/dashboard");
    expect(html).not.toContain("{{");
  });

  it("escapes html in name and uppercases heading", () => {
    const html = welcomeEmail({ name: "<b>Ada</b>", email: "olivia@deex.com", dashboardUrl: "https://deex.com/dashboard" });
    expect(html).not.toContain("<b>");
    expect(html).toContain("&lt;B&gt;ADA&lt;/B&gt;");
  });
});

describe("password-reset", () => {
  it("renders reset link with expiry", () => {
    const html = passwordResetEmail({ name: "Olivia", email: "olivia@deex.com", resetUrl: "https://deex.com/reset?t=abc", minutes: "15" });
    expect(html).toContain("RESET YOUR PASSWORD");
    expect(html).toContain("next 15 minutes");
    expect(html).toContain("https://deex.com/reset?t=abc");
    expect(html).not.toContain("{{");
  });

  it("throws Unsafe email URL when resetUrl is missing", () => {
    expect(() => passwordResetEmail({ name: "Olivia", email: "olivia@deex.com", resetUrl: undefined, minutes: "15" } as never)).toThrow("Unsafe email URL");
  });
});
