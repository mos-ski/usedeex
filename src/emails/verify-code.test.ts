import { describe, it, expect } from "vitest";
import { verifyCodeEmail } from "./verify-code";

const data = { name: "Olivia", email: "olivia@deex.com", d1: "3", d2: "0", d3: "6", d4: "6", verifyUrl: "https://deex.com/verify?c=3066", minutes: "5" };

describe("verify-code", () => {
  it("renders greeting, digits, expiry and button", () => {
    const html = verifyCodeEmail(data);
    expect(html).toContain("HI OLIVIA,");
    expect(html).toContain("#2C98E0");
    expect(html).toContain("next 5 minutes");
    expect(html).toContain("Verify Email");
    expect(html).toContain("https://deex.com/verify?c=3066");
  });

  it("leaves no unreplaced tokens", () => {
    expect(verifyCodeEmail(data)).not.toContain("{{");
  });

  it("throws when a digit is missing", () => {
    // @ts-expect-error intentionally incomplete
    expect(() => verifyCodeEmail({ ...data, d4: undefined })).toThrow("Missing email token");
  });
});
