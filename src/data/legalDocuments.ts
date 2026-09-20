/** Policy copy behind the About DeeX rows, keyed by route slug. */
export type LegalDocument = { slug: string; title: string; updated: string; sections: { heading: string; body: string }[] };

export const legalDocuments: LegalDocument[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    updated: "Last updated 1 September 2026",
    sections: [
      { heading: "Using DeeX", body: "By creating a DeeX account you agree to these terms. You must be at least 18 and provide accurate information during verification. Accounts are personal and may not be shared or sold." },
      { heading: "Trading and payouts", body: "Rates shown at the time of a trade apply to that trade. Payouts are settled to the bank account or wallet you nominate, subject to the limits unlocked by your verification level." },
      { heading: "Acceptable use", body: "You may not use DeeX for fraud, money laundering, or any activity prohibited by Nigerian law. We may suspend an account while we investigate suspicious activity." },
      { heading: "Ending your account", body: "You can close your account at any time once outstanding trades have settled. We may close an account that breaches these terms, and will tell you why where we are permitted to." },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "Last updated 1 September 2026",
    sections: [
      { heading: "What we collect", body: "We collect the details you give us during sign-up and verification, the transactions you make, and technical data such as device and session information." },
      { heading: "Why we use it", body: "We use your data to run your account, meet our legal and anti-money-laundering obligations, prevent fraud, and improve the app. We do not sell your data." },
      { heading: "Who we share it with", body: "We share data with identity and payment providers who help us deliver the service, and with regulators where the law requires it." },
      { heading: "Your rights", body: "You can request a copy of your data, ask us to correct it, or ask us to delete it where we are not required to keep it. Contact support to make a request." },
    ],
  },
  {
    slug: "aml",
    title: "AML Policy",
    updated: "Last updated 1 September 2026",
    sections: [
      { heading: "Our commitment", body: "DeeX operates an anti-money-laundering and counter-terrorist-financing programme in line with Nigerian regulation and international guidance." },
      { heading: "Verification", body: "We verify every customer before they transact, and re-verify when limits increase. Higher levels require government ID, proof of address and a liveness check." },
      { heading: "Monitoring", body: "Transactions are monitored for patterns consistent with financial crime. We may request the source of funds and hold a payout while we review it." },
      { heading: "Reporting", body: "Where we have reasonable grounds to suspect financial crime we report it to the relevant authority. We are not always permitted to tell you when we do." },
    ],
  },
];
