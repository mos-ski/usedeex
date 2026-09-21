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
    slug: "compliance",
    title: "Compliance",
    updated: "Last updated 1 September 2026",
    sections: [
      { heading: "How we are regulated", body: "DeeX Technologies Ltd is registered in Nigeria and operates its payout and virtual asset services under the obligations set by the Nigerian Financial Intelligence Unit and the Securities and Exchange Commission." },
      { heading: "Verification", body: "Every account is verified before it can trade. Identity checks are tiered: a valid government ID and a liveness check unlock the first limits, and proof of address opens the higher ones." },
      { heading: "Monitoring", body: "Trades are screened for sanctions exposure and for patterns that suggest fraud or laundering. A flagged account is held while we review it, and we tell the holder where we are permitted to." },
      { heading: "Reporting and records", body: "We keep transaction records for the period the law requires and report what we are obliged to report. Records are available to a user on request through support." },
      { heading: "Raising a concern", body: "Compliance questions and reports go to compliance@deexoptions.com and are answered by the compliance team rather than general support." },
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
