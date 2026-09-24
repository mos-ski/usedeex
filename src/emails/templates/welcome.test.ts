import { describe, expect, it } from "vitest";
import { welcomeDefinition } from "./welcome";

describe("welcome email", () => {
  it("renders a personal welcome letter from the CEO", () => {
    const html = welcomeDefinition.render(welcomeDefinition.sample);

    expect(html).toContain("OLIVIA, YOUR MONEY MOVES DIFFERENTLY NOW.");
    expect(html).toContain("Omojuwa Divine");
    expect(html).toContain("CEO, UseDeeX");
    expect(html).not.toContain("seamless");
  });

  it("escapes the recipient name", () => {
    const html = welcomeDefinition.render({ ...welcomeDefinition.sample, name: "<b>Ada</b>" });
    expect(html).not.toContain("<b>Ada</b>");
    expect(html).toContain("&lt;B&gt;ADA&lt;/B&gt;");
  });
});
