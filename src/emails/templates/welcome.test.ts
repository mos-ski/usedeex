import { describe, expect, it } from "vitest";
import { welcomeDefinition } from "./welcome";

describe("welcome email", () => {
  it("renders a personal welcome letter from the CEO", () => {
    const html = welcomeDefinition.render(welcomeDefinition.sample);

    expect(html).toContain("WELCOME TO DEEX, OLIVIA.");
    expect(html).toContain("I’m Omojuwa Divine, CEO of UseDeeX");
    expect(html).toContain("Thank you for choosing DeeX");
    expect(html).toContain("Welcome aboard");
    expect(html).toContain("Explore DeeX");
    expect(html).toContain("Omojuwa Divine");
    expect(html).toContain("CEO, UseDeeX");
    expect(html).not.toContain("text-align:left");
    expect(html).not.toContain("YOUR MONEY MOVES DIFFERENTLY NOW");
    expect(html).not.toContain("#000000");
  });

  it("escapes the recipient name", () => {
    const html = welcomeDefinition.render({ ...welcomeDefinition.sample, name: "<b>Ada</b>" });
    expect(html).not.toContain("<b>Ada</b>");
    expect(html).toContain("&lt;B&gt;ADA&lt;/B&gt;");
  });
});
