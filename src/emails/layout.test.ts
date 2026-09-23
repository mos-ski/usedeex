import { describe, it, expect } from "vitest";
import { escapeHtml, fillTokens, emailShell, heroSection, footerSection, ctaButton } from "./layout";

describe("layout", () => {
  it("escapes html", () => {
    expect(escapeHtml('<b>Olivia & "Co"</b>')).toBe("&lt;b&gt;Olivia &amp; &quot;Co&quot;&lt;/b&gt;");
  });

  it("fills tokens and throws on missing", () => {
    expect(fillTokens("Hi {{name}}", { name: "Olivia" })).toBe("Hi Olivia");
    expect(() => fillTokens("Hi {{name}}", {})).toThrow("Missing email token: name");
  });

  it("shell wraps body in a 640px table", () => {
    const html = emailShell("Verify", "<p>hi</p>");
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("max-width:640px");
    expect(html).toContain("<p>hi</p>");
  });

  it("hero uses brand blue banner and logo", () => {
    expect(heroSection()).toContain("#D0EBFF");
    expect(heroSection()).toContain("logo");
  });

  it("footer has unsubscribe text and social icons", () => {
    expect(footerSection()).toContain("unsubscribe");
    expect(footerSection()).toContain("instagram");
  });

  it("cta button renders label and url", () => {
    expect(ctaButton("Verify Email", "https://deex.com/v")).toContain("Verify Email");
  });

  it("escapes button label, url and shell title", () => {
    const btn = ctaButton('<b>"x"</b>', 'https://deex.com/?a=1&b=2"x');
    expect(btn).not.toContain("<b>");
    expect(btn).toContain("&lt;b&gt;");
    expect(btn).toContain("&amp;");
    expect(emailShell('<t>"hi"', "<p>x</p>")).toContain("&lt;t&gt;");
  });
});
