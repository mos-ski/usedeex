import { describe, expect, it } from "vitest";
import { amountHero, detailTable, personalSignOff, successBadge } from "./primitives";

describe("email primitives", () => {
  it("escapes values rendered in receipt rows", () => {
    expect(detailTable([{ label: "Asset", value: "<b>USDT</b>" }])).toContain("&lt;b&gt;USDT&lt;/b&gt;");
  });

  it("renders the successful receipt treatment", () => {
    expect(amountHero("$1,250.00")).toContain("$1,250.00");
    expect(successBadge()).toContain("Successful");
  });

  it("renders the approved CEO signature", () => {
    const html = personalSignOff("Omojuwa Divine", "CEO, UseDeeX");
    expect(html).toContain("Omojuwa Divine");
    expect(html).toContain("CEO, UseDeeX");
  });
});
