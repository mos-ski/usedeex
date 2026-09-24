import { describe, expect, it } from "vitest";
import { securityDefinitions } from "./security";

const ids = [
  "verify-code",
  "password-reset",
  "login-success",
  "password-changed",
  "pin-changed",
  "profile-updated",
  "kyc-approved",
  "statement-ready",
] as const;

describe("security and account emails", () => {
  it.each(ids)("renders %s without unresolved tokens", (id) => {
    const definition = securityDefinitions[id];
    expect(definition.render(definition.sample as never)).not.toContain("{{");
  });

  it("includes useful context in login, KYC and statement messages", () => {
    const login = securityDefinitions["login-success"].render(securityDefinitions["login-success"].sample);
    const kyc = securityDefinitions["kyc-approved"].render(securityDefinitions["kyc-approved"].sample);
    const statement = securityDefinitions["statement-ready"].render(securityDefinitions["statement-ready"].sample);

    expect(login).toContain("iPhone 15 Pro");
    expect(login).toContain("Lagos, Nigeria");
    expect(kyc).toContain("Level 2");
    expect(kyc).toContain("$10,000");
    expect(statement).toContain("September 2026");
    expect(statement).toContain("Download Statement");
  });
});
