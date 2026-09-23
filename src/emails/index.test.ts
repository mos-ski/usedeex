import { describe, it, expect } from "vitest";
import { renderEmail, emailSamples, type EmailName } from "./index";

describe("renderEmail", () => {
  const names: EmailName[] = ["verify-code", "welcome", "password-reset", "receipt"];

  it("renders every template from samples with no leftover tokens", () => {
    for (const name of names) {
      const html = renderEmail(name, emailSamples[name] as never);
      expect(html).toContain("<!DOCTYPE html>");
      expect(html).not.toContain("{{");
    }
  });

  it("throws on unknown template", () => {
    expect(() => renderEmail("nope" as never, {} as never)).toThrow("Unknown email template");
  });

  it("throws on missing data", () => {
    expect(() => renderEmail("welcome", { name: "Olivia" } as never)).toThrow("Missing email token");
  });
});
