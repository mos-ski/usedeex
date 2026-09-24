import { describe, it, expect } from "vitest";
import { emailCatalog, emailCategories, renderEmail, type EmailName } from "./index";

describe("renderEmail", () => {
  it("renders every registered sample safely", () => {
    expect(Object.keys(emailCatalog)).toHaveLength(29);
    for (const [id, definition] of Object.entries(emailCatalog)) {
      const html = renderEmail(id as EmailName, definition.sample as never);
      expect(html, id).toContain("<!DOCTYPE html>");
      expect(html, id).not.toContain("{{");
    }
  });

  it("has unique labels inside every category", () => {
    for (const category of emailCategories) {
      const labels = category.templateIds.map((id) => emailCatalog[id].label);
      expect(new Set(labels).size).toBe(labels.length);
    }
  });

  it("throws on unknown template", () => {
    expect(() => renderEmail("nope" as never, {} as never)).toThrow("Unknown email template");
  });

  it("throws on missing data", () => {
    expect(() => renderEmail("welcome", { name: "Olivia" } as never)).toThrow("Missing email token");
  });
});
