import { describe, expect, it } from "vitest";
import { activityTransactions, type ActivityCategory } from "@/data/activityTransactions";

describe("activity transaction fixtures", () => {
  it("provides 30 transactions in every category", () => {
    const categories: ActivityCategory[] = ["crypto", "giftcards", "bills", "payouts"];
    expect(activityTransactions).toHaveLength(120);
    categories.forEach((category) => {
      expect(activityTransactions.filter((transaction) => transaction.category === category)).toHaveLength(30);
    });
  });

  it("uses unique IDs and complete receipt metadata", () => {
    expect(new Set(activityTransactions.map((transaction) => transaction.id)).size).toBe(120);
    activityTransactions.forEach((transaction) => {
      expect(transaction.occurredAt).toMatch(/^2026-\d{2}-\d{2}$/);
      expect(transaction.month).toMatch(/2026$/);
      expect(transaction.receiptType).not.toBe("");
      expect(transaction.ngn).toBeGreaterThan(0);
    });
  });
});
