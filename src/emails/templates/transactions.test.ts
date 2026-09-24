import { describe, expect, it } from "vitest";
import { transactionDefinitions } from "./transactions";

const expectedIds = [
  "wallet-deposit-success",
  "wallet-withdrawal-success",
  "asset-received",
  "asset-sent",
  "asset-bought",
  "asset-sold",
  "asset-swapped",
  "deex-pay-success",
  "gift-card-bought",
  "gift-card-sold",
  "airtime-success",
  "data-success",
  "electricity-success",
  "betting-success",
  "reward-earned",
  "referral-joined",
  "referral-reward-paid",
  "reward-redeemed",
  "virtual-card-created",
  "virtual-card-funded",
] as const;

describe("successful transaction emails", () => {
  it("contains every successful transaction scenario", () => {
    expect(Object.keys(transactionDefinitions)).toEqual(expectedIds);
  });

  it.each(expectedIds)("renders %s as a successful receipt", (id) => {
    const definition = transactionDefinitions[id];
    const html = definition.render(definition.sample as never);

    expect(html).toContain("Successful");
    expect(html).toContain("Reference");
    expect(html).toContain("Date");
    expect(html).not.toContain("{{");
  });

  it("renders scenario-specific electricity and swap details", () => {
    const electricity = transactionDefinitions["electricity-success"].render(transactionDefinitions["electricity-success"].sample);
    const swap = transactionDefinitions["asset-swapped"].render(transactionDefinitions["asset-swapped"].sample);

    expect(electricity).toContain("Meter token");
    expect(electricity).toContain("IKEDC");
    expect(swap).toContain("From");
    expect(swap).toContain("To");
    expect(swap).toContain("Rate");
  });
});
