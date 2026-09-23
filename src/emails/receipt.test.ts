import { describe, it, expect } from "vitest";
import { receiptEmail } from "./receipt";

const data = { name: "Olivia", email: "olivia@deex.com", amount: "₦50,000.00", type: "Wallet top-up", reference: "DX-2026-000123", date: "23 Sep 2026", receiptUrl: "https://deex.com/receipt/DX-2026-000123" };

describe("receipt", () => {
  it("renders summary rows and cta", () => {
    const html = receiptEmail(data);
    expect(html).toContain("₦50,000.00");
    expect(html).toContain("Wallet top-up");
    expect(html).toContain("DX-2026-000123");
    expect(html).toContain("23 Sep 2026");
    expect(html).toContain("View Receipt");
    expect(html).not.toContain("{{");
  });

  it("escapes user content", () => {
    const html = receiptEmail({ ...data, type: "<script>alert(1)</script>" });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
});
