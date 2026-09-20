import { describe, expect, it } from "vitest";
import {
  bankRecipients,
  bettingRecipients,
  cryptoDestinations,
  electricityRecipients,
  phoneRecipients,
} from "@/data/recipientData";

const expectBalanced = (items: { id: string; kind: "recent" | "beneficiary" }[], perTab: number) => {
  expect(items.filter((item) => item.kind === "recent")).toHaveLength(perTab);
  expect(items.filter((item) => item.kind === "beneficiary")).toHaveLength(perTab);
  expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
};

describe("recipient fixtures", () => {
  it("fills both bank recipient tabs", () => {
    expectBalanced(bankRecipients, 15);
    expect(bankRecipients.every((recipient) => /^\d{10}$/.test(recipient.account))).toBe(true);
  });

  it("fills both crypto destination tabs", () => {
    expectBalanced(cryptoDestinations, 15);
    expect(cryptoDestinations.filter((item) => item.kind === "beneficiary").every((item) => item.value.startsWith("@"))).toBe(true);
  });

  it("fills every bill-payment recipient tab", () => {
    expectBalanced(phoneRecipients, 12);
    expectBalanced(electricityRecipients, 10);
    expectBalanced(bettingRecipients, 10);
  });
});
