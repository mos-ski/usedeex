export type SurveyQuestion = {
  id: string;
  prompt: string;
  /** `multi` stores its answer as a comma-separated list. */
  type: "single" | "multi" | "text" | "nps";
  options?: string[];
  placeholder?: string;
  /** Tappable starting points under a free-text field. */
  suggestions?: string[];
};

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "primary_use",
    prompt: "What do you mainly use DeeX for?",
    type: "single",
    options: ["Buy/sell crypto", "Swap", "Withdraw to bank", "Gift cards", "Other"],
  },
  {
    id: "frequency",
    prompt: "How often do you use DeeX?",
    type: "single",
    options: ["Daily", "Weekly", "Monthly", "Occasionally"],
  },
  {
    id: "biggest_problem",
    prompt: "What’s the biggest problem you experience when using DeeX?",
    type: "text",
    placeholder: "Tell us what gets in your way...",
    suggestions: [
      "Rates are not competitive",
      "Transactions take too long",
      "Verification was difficult",
      "The coin I want is missing",
      "Support was slow to reply",
      "The app is confusing",
    ],
  },
  {
    id: "use_more",
    prompt: "What would make you use DeeX more frequently?",
    type: "single",
    options: ["Better rates", "Faster transactions", "More assets", "More payment options", "Better rewards", "Virtual card", "Better support", "Other"],
  },
  {
    id: "next_feature",
    prompt: "Which feature would you most like us to add or improve next?",
    type: "text",
    placeholder: "Share the feature you want most...",
    suggestions: [
      "Better rates",
      "Faster payouts",
      "More coins",
      "Recurring buys",
      "Price alerts",
      "Referral bonuses",
    ],
  },
  {
    id: "other_apps",
    prompt: "What other crypto or financial apps do you use alongside DeeX, and why?",
    type: "text",
    placeholder: "Name the apps and what you use them for...",
    suggestions: ["Binance", "Bybit", "Luno", "Quidax", "Opay", "Kuda", "PalmPay"],
  },
  {
    id: "wanted_features",
    prompt: "Which of these would you want us to launch first?",
    type: "multi",
    options: [
      "Buy crypto",
      "Buy gift cards",
      "Naira wallet",
      "Betting top-up",
      "More coins",
      "Virtual card",
    ],
  },
  {
    id: "recommendation",
    prompt: "On a scale of 0–10, how likely are you to recommend DeeX?",
    type: "nps",
  },
];
