# DeeX Marketing Channel Tracking Plan

> **Purpose:** Define UTM links, invite codes, and referral tracking for every acquisition channel.
> **Status:** Active
> **Website:** deexoptions.com
> **Invite Code System:** Already built (see invite-code-module-prd.md)

---

## Channels Overview

| # | Channel | Tracking Method | Owner |
|---|---------|-----------------|-------|
| 1 | DIVINE-Led | Invite Code | DIVINE |
| 2 | Digital Marketing (Ads) | UTM + Invite Code | Marketing |
| 3 | SEO | UTM + Invite Code | Marketing |
| 4 | Organic Signups | Default / None | — |
| 5 | Social Media (Bio + CTAs) | UTM + Invite Code | Social Media |
| 6 | UGC (User Generated Content) | Invite Code | Creator/Influencer |
| 7 | Motion Videos | Invite Code | Video Team |
| 8 | Special Campaigns (Monthly) | UTM + Invite Code | Marketing |

---

## 1. DIVINE-Led (WhatsApp Status / Contacts)

**Tracking:** Invite code only (no UTM needed - WhatsApp does not support UTMs natively)

| Field | Value |
|-------|-------|
| Code Format | `FOUNDER_XX` |
| Example | `FOUNDER_01` |
| Link | `deexoptions.com/download?invite=FOUNDER_01` |
| Tracking | Which contacts signed up under DIVINE's code |

**Setup:**
- DIVINE gets one master code or individual codes per contact
- Each code tracks: signups, deposits, trades
- Dashboard shows "Referrals by DIVINE" as a sub-tree

---

## 2. Digital Marketing (All Ad Platforms)

**Platforms:** TikTok, Meta (Facebook + Instagram), Google Ads, Twitter/X, Snapchat

**Tracking:** UTM parameters + invite code per campaign

### UTM Structure

```
utm_source   = platform (tiktok, meta, google, twitter, snapchat)
utm_medium   = ad
utm_campaign = campaign_name (crypto_traders, gift_cards, etc.)
utm_content  = creative_id (optional — for A/B testing)
```

### Ad Campaign Examples

| Campaign | Platform | Link |
|----------|----------|------|
| Crypto Traders | TikTok | `deexoptions.com/download?utm_source=tiktok&utm_medium=ad&utm_campaign=crypto_traders` |
| Gift Cards | Meta | `deexoptions.com/download?utm_source=meta&utm_medium=ad&utm_campaign=gift_cards` |
| Bill Payments | Google | `deexoptions.com/download?utm_source=google&utm_medium=ad&utm_campaign=bill_payments` |
| Virtual Cards | Twitter | `deexoptions.com/download?utm_source=twitter&utm_medium=ad&utm_campaign=virtual_cards` |
| General | Snapchat | `deexoptions.com/download?utm_source=snapchat&utm_medium=ad&utm_campaign=general` |

### Invite Code per Ad Set (Optional)

If you want to tie invite codes to specific ad sets:
- Format: `ADS_PLATFORM_XX` (e.g., `ADS_TIKTOK_01`)
- Link: `deexoptions.com/download?utm_source=tiktok&utm_medium=ad&utm_campaign=crypto_traders&invite=ADS_TIKTOK_01`

**Metrics to Track:** Cost per Install, Cost per Signup, Cost per KYC, Cost per First Trade

---

## 3. SEO Search

**Tracking:** UTM on CTA links in blog/content

### UTM Structure

```
utm_source   = google (or bing, etc.)
utm_medium   = organic
utm_campaign = article_slug
```

### Example

| Content | Link |
|---------|------|
| How to Sell Bitcoin in Nigeria | `deexoptions.com/download?utm_source=google&utm_medium=organic&utm_campaign=sell_bitcoin` |
| Best Gift Card Rates | `deexoptions.com/download?utm_source=google&utm_medium=organic&utm_campaign=gift_card_rates` |
| How to Pay PHCN Bill Online | `deexoptions.com/download?utm_source=google&utm_medium=organic&utm_campaign=pay_electricity` |

**Invite Code (Optional):** `SEO_BLOG_XX` if you want to track blog-driven signups separately

---

## 4. Organic Signups

**Tracking:** None / Default

| Field | Value |
|-------|-------|
| Definition | Direct app store search, word of mouth without code |
| Invite Code | None (or `ORGANIC` as placeholder) |
| UTM | None |

These are users who find the app on their own. No tracking needed unless you want a default code for analytics.

---

## 5. Social Media (Bio + CTAs)

**Platforms:** TikTok, Facebook, X (Twitter), Snapchat, Instagram

**Tracking:** UTM per platform + optional invite code

### Bio Links by Platform

| Platform | Bio Link |
|----------|----------|
| TikTok | `deexoptions.com/download?utm_source=tiktok&utm_medium=bio` |
| Facebook | `deexoptions.com/download?utm_source=facebook&utm_medium=bio` |
| X (Twitter) | `deexoptions.com/download?utm_source=twitter&utm_medium=bio` |
| Snapchat | `deexoptions.com/download?utm_source=snapchat&utm_medium=bio` |
| Instagram | `deexoptions.com/download?utm_source=instagram&utm_medium=bio` |

### Post CTA Links (Per Post)

```
deexoptions.com/download?utm_source=instagram&utm_medium=post&utm_campaign=july_giveaway
```

**Invite Code (Optional):** `IG_DEEXOFFICIAL`, `TIKTOK_DEEX`, etc.

---

## 6. UGC (User Generated Content)

**Tracking:** Invite code per creator

| Field | Value |
|-------|-------|
| Code Format | `UGC_CREATORNAME` |
| Example | `UGC_JOHNNY` |
| Link | `deexoptions.com/download?invite=UGC_JOHNNY` |
| CTA | App Store / Play Store (direct install with invite code) |

**Setup:**
- Each creator gets a unique invite code
- Code is entered during signup (pre-filled via deep link)
- Track: signups, deposits, trades per creator

---

## 7. Motion Videos

**Tracking:** Invite code per video

| Field | Value |
|-------|-------|
| Code Format | `VID_VIDEOTITLE` |
| Example | `VID_CRYPTO_EXPLAINER` |
| Link | `deexoptions.com/download?invite=VID_CRYPTO_EXPLAINER` |
| CTA | App Store / Play Store or Landing Page |

**Publish Platforms:** TikTok, YouTube, Instagram Reels, Facebook

---

## 8. Special Campaigns (Monthly)

**Tracking:** UTM + unique invite code per campaign

| Field | Value |
|-------|-------|
| Frequency | Once a month |
| Code Format | `PROMO_MONYY` |
| Example | `PROMO_JUL26`, `PROMO_AUG26` |
| Link | `deexoptions.com/download?utm_source=campaign&utm_campaign=july2026&invite=PROMO_JUL26` |

### Campaign Link Structure

```
deexoptions.com/download?utm_source=campaign&utm_campaign={month}{year}&invite=PROMO_{MONTH}{YEAR}
```

**Examples:**

| Month | Campaign | Link |
|-------|----------|------|
| July 2026 | July Promo | `deexoptions.com/download?utm_source=campaign&utm_campaign=july2026&invite=PROMO_JUL26` |
| August 2026 | August Promo | `deexoptions.com/download?utm_source=campaign&utm_campaign=august2026&invite=PROMO_AUG26` |
| September 2026 | September Promo | `deexoptions.com/download?utm_source=campaign&utm_campaign=september2026&invite=PROMO_SEP26` |

---

## Master UTM Reference

| Parameter | Values |
|-----------|--------|
| `utm_source` | `tiktok`, `meta`, `google`, `twitter`, `snapchat`, `instagram`, `facebook`, `campaign` |
| `utm_medium` | `ad`, `bio`, `post`, `organic`, `status`, `video` |
| `utm_campaign` | `crypto_traders`, `gift_cards`, `bill_payments`, `virtual_cards`, `july2026`, `sell_bitcoin`, etc. |
| `utm_content` | creative ID or post identifier (optional) |

---

## Master Invite Code Reference

| Channel | Format | Example |
|---------|--------|---------|
| DIVINE | `FOUNDER_XX` | `FOUNDER_01` |
| Ads | `ADS_PLATFORM_XX` | `ADS_TIKTOK_01` |
| SEO | `SEO_BLOG_XX` | `SEO_BLOG_01` |
| Social Media | `PLATFORM_HANDLE` | `IG_DEEXOFFICIAL` |
| UGC | `UGC_CREATORNAME` | `UGC_JOHNNY` |
| Motion Videos | `VID_VIDEOTITLE` | `VID_CRYPTO_EXPLAINER` |
| Campaigns | `PROMO_MONYY` | `PROMO_JUL26` |

---

## Implementation Checklist

- [ ] Set up UTM builder template (spreadsheet or tool)
- [ ] Generate invite codes for each channel (use existing admin panel)
- [ ] Set up landing page redirects on deexoptions.com
- [ ] Configure analytics dashboard to capture UTM + invite code on signup
- [ ] Map events: Install → Signup → KYC → First Trade
- [ ] Create tracking spreadsheet for monthly campaign codes
- [ ] Brief DIVINE on how to share his invite code

---

## Open Questions

1. Does DIVINE want one master code or individual codes per contact?
2. Do you want invite codes for every ad set, or just UTMs?
3. Should UGC creators be paid per install, per signup, or per trade?
4. Do you want a landing page per campaign or just the download page with UTMs?

---

*Document created for DeeX Marketing Team*
*Last Updated: July 2026*
