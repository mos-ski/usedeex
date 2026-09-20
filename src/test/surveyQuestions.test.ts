import { describe, expect, it } from "vitest";
import { surveyQuestions } from "@/data/surveyQuestions";

describe("survey question configuration", () => {
  it("contains the seven requested questions in unique steps", () => {
    expect(surveyQuestions).toHaveLength(7);
    expect(new Set(surveyQuestions.map((question) => question.id)).size).toBe(7);
    expect(surveyQuestions.map((question) => question.type)).toEqual(["single", "single", "text", "single", "text", "text", "nps"]);
  });

  it("includes all requested choice options", () => {
    expect(surveyQuestions[0].options).toEqual(["Buy/sell crypto", "Swap", "Withdraw to bank", "Gift cards", "Other"]);
    expect(surveyQuestions[3].options).toContain("Virtual card");
    expect(surveyQuestions[3].options).toContain("Other");
  });
});
