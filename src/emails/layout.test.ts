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

  it("shell wraps body in a responsive 720px table", () => {
    const html = emailShell("Verify", "<p>hi</p>");
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain('width="720"');
    expect(html).toContain("max-width:720px");
    expect(html).toContain('<td align="center" style="padding:0;">');
    expect(html).not.toContain("padding:24px 12px");
    expect(html).toContain("<p>hi</p>");
  });

  it("renders the full-height Figma hero with its wave and DeeX artwork", () => {
    const html = heroSection();

    expect(html).toContain("#D0EBFF");
    expect(html).toContain("height:215px");
    expect(html).toContain("wave.svg");
    expect(html).toContain('width="238"');
    expect(html).toContain('height="64"');
  });

  it("footer has unsubscribe text and social icons", () => {
    expect(footerSection()).toContain("unsubscribe");
    expect(footerSection()).toContain("instagram");
  });

  it("cta button renders label and url", () => {
    const html = ctaButton("Verify Email", "https://deex.com/v");
    expect(html).toContain("Verify Email");
    expect(html).toContain('<table role="presentation" align="center"');
  });

  it("escapes button label, url and shell title", () => {
    const btn = ctaButton('<b>"x"</b>', 'https://deex.com/?a=1&b=2"x');
    expect(btn).not.toContain("<b>");
    expect(btn).toContain("&lt;b&gt;");
    expect(btn).toContain("&amp;");
    expect(emailShell('<t>"hi"', "<p>x</p>")).toContain("&lt;t&gt;");
  });

  it("rejects unsafe button urls and escapes ampersands in https urls", () => {
    expect(() => ctaButton("x", "javascript:alert(1)")).toThrow("Unsafe email URL");
    const btn = ctaButton("x", "https://deex.com/?a=1&b=2");
    expect(btn).toContain("&amp;");
  });
});
