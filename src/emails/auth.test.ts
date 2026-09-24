import { describe, it, expect } from "vitest";
import { welcomeEmail } from "./welcome";
import { passwordResetEmail } from "./password-reset";
import { verifyCodeEmail } from "./verify-code";

describe("verify-code", () => {
  it("renders the Figma verification layout and DeeX sign-off", () => {
    const html = verifyCodeEmail({
      name: "Olivia",
      email: "olivia@deex.com",
      d1: "3",
      d2: "0",
      d3: "6",
      d4: "6",
      verifyUrl: "https://deex.com/verify?c=3066",
      minutes: "5",
    });

    expect(html).toContain("HI OLIVIA,");
    expect(html).toContain("min-height:48px");
    expect(html).toContain("border-radius:10px");
    expect(html).toContain("width:280px");
    expect(html).toContain("Thanks,<br />The team");
  });
});

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
