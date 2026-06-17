import type { LegalSection } from "@/components/legal/LegalDocument";

export const LEGAL_LAST_UPDATED = "June 17, 2026";

export const CONTACT_EMAIL = "contact@easytuner.org";

export const aboutSections: LegalSection[] = [
  {
    heading: "What EasyTuner Is",
    paragraphs: [
      "EasyTuner is a free online instrument tuning platform at [easytuner.org](https://easytuner.org). We build browser-based tuners that help musicians check and adjust open-string pitch using reference tones and, when you choose, your device microphone.",
      "Our tools are designed to load quickly, work without installing an app, and stay usable on phones, tablets, and desktop browsers.",
    ],
  },
  {
    heading: "What We Offer",
    paragraphs: [
      "Today, EasyTuner includes tuners and guides for:",
    ],
    list: [
      "Guitar — standard EADGBE and popular alternate tunings such as Drop D, Drop C, Open G, and DADGAD",
      "Bass — standard E-A-D-G four-string tuning",
      "Ukulele — standard re-entrant G-C-E-A tuning",
      "Educational guides on tuning technique, string frequencies, and common alternate setups",
    ],
  },
  {
    heading: "How Microphone Tuning Works",
    paragraphs: [
      "When you tap Tap to tune and allow microphone access, pitch detection runs locally in your browser via the Web Audio API. Audio is not uploaded to our servers for tuning analysis.",
      "Reference tones may be streamed from our content delivery network as MP3 files. You can also tune by ear using those tones without enabling the microphone.",
    ],
  },
  {
    heading: "Our Approach",
    paragraphs: [
      "We focus on clear targets (note names and cents), instrument-specific fretboard layouts, and practical guides — not generic filler content. EasyTuner is independent and supported by advertising on some pages.",
      "We do not sell accounts, subscriptions, or personal tuning data. For details on analytics and cookies, see our [Privacy Policy](/privacy).",
    ],
  },
];

export const privacySections: LegalSection[] = [
  {
    heading: "Overview",
    paragraphs: [
      "This Privacy Policy explains what information EasyTuner (“we”, “us”) collects when you visit [easytuner.org](https://easytuner.org), how we use it, and what choices you have. We aim to collect only what is needed to operate and improve the site.",
    ],
  },
  {
    heading: "Information We Collect",
    paragraphs: [
      "EasyTuner does not require registration. We do not ask for your name, postal address, or payment details to use the tuners.",
    ],
    list: [
      "Usage analytics — we use Google Analytics 4 to understand aggregated traffic (pages visited, device type, general region). Google may set cookies or use similar technologies. See [Google’s privacy documentation](https://policies.google.com/privacy).",
      "Server and CDN logs — our hosting and content delivery providers (including Cloudflare) may log IP addresses, user agents, and request timestamps for security and performance.",
      "Microphone audio — if you enable microphone tuning, audio is processed in your browser to estimate pitch. We do not receive or store your raw audio on our servers.",
      "Local storage — the site may store lightweight preferences (for example, onboarding state) in your browser’s local storage.",
    ],
  },
  {
    heading: "How We Use Information",
    paragraphs: [
      "We use the information above to operate the website, measure performance, fix errors, understand which pages are useful, and protect against abuse. We do not sell your personal information.",
    ],
  },
  {
    heading: "Cookies and Analytics",
    paragraphs: [
      "Google Analytics helps us see how visitors use EasyTuner (for example, which tuners are popular). You can limit analytics cookies through your browser settings, opt-out tools provided by Google, or ad-blocking extensions.",
      "Essential technical cookies or local storage may be used for basic site functionality.",
    ],
  },
  {
    heading: "Third-Party Services",
    paragraphs: [
      "We rely on third-party infrastructure to deliver the site and reference audio. Those providers process data under their own policies. Advertising partners (such as Google AdSense, when enabled) may use cookies to serve and measure ads in line with their program policies.",
    ],
  },
  {
    heading: "Children’s Privacy",
    paragraphs: [
      "EasyTuner is a general-audience music tool. We do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, please contact us and we will take reasonable steps to delete it.",
    ],
  },
  {
    heading: "Data Retention",
    paragraphs: [
      "Analytics data is retained according to Google Analytics settings. Server logs are retained for a limited period for security and troubleshooting. We do not maintain accounts or long-term profiles of individual tuners.",
    ],
  },
  {
    heading: "Your Rights",
    paragraphs: [
      "Depending on where you live, you may have rights to access, correct, or delete personal data, or to object to certain processing. Because we collect limited personal data, many requests may be satisfied by clearing browser cookies or disabling analytics.",
      "To make a privacy-related request, email us at [contact@easytuner.org](mailto:contact@easytuner.org).",
    ],
  },
  {
    heading: "International Visitors",
    paragraphs: [
      "EasyTuner is operated in English and available globally. If you access the site from outside your home country, your information may be processed in the United States or other regions where our service providers operate.",
    ],
  },
  {
    heading: "Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. The “Last updated” date at the top will change when we do. Continued use of the site after changes means you accept the revised policy.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "Agreement",
    paragraphs: [
      "By accessing or using EasyTuner at [easytuner.org](https://easytuner.org), you agree to these Terms of Service. If you do not agree, please do not use the site.",
    ],
  },
  {
    heading: "The Service",
    paragraphs: [
      "EasyTuner provides free online instrument tuners, reference tones, and educational content. Features may change, be added, or be removed without notice as we improve the product.",
      "Microphone tuning requires a compatible browser and your permission. You are responsible for granting or revoking microphone access on your device.",
    ],
  },
  {
    heading: "No Professional Advice",
    paragraphs: [
      "EasyTuner is a convenience tool for checking pitch. It is not a substitute for professional instrument setup, repair, or ear training with a qualified teacher. Always use your judgment when adjusting tuning pegs — overtightening strings can cause damage or injury.",
    ],
  },
  {
    heading: "Acceptable Use",
    paragraphs: [
      "You agree not to misuse the site. Prohibited conduct includes:",
    ],
    list: [
      "Attempting to disrupt, scrape, or overload our servers",
      "Reverse engineering or copying the site to misrepresent our brand",
      "Using the site in violation of applicable law",
      "Automated access that degrades service for other users",
    ],
  },
  {
    heading: "Intellectual Property",
    paragraphs: [
      "The EasyTuner name, logo, site design, text, and original reference materials are owned by us or our licensors. You may link to our pages for personal or editorial purposes. You may not republish substantial portions of the site as your own product without permission.",
    ],
  },
  {
    heading: "Disclaimer of Warranties",
    paragraphs: [
      "THE SITE IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
      "We do not guarantee uninterrupted access, error-free operation, or that readings will match every environment (background noise, phone microphones, and weak fundamentals can affect results).",
    ],
  },
  {
    heading: "Limitation of Liability",
    paragraphs: [
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, EASYTUNER AND ITS OPERATORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SITE.",
      "Our total liability for any claim related to the site shall not exceed the amount you paid us in the twelve months before the claim (typically zero, because the service is free).",
    ],
  },
  {
    heading: "Advertising",
    paragraphs: [
      "The site may display third-party advertisements. We are not responsible for the content of ads or external sites they link to. Your dealings with advertisers are solely between you and them.",
    ],
  },
  {
    heading: "Links to Other Sites",
    paragraphs: [
      "Our guides or footer may link to external websites. We do not control and are not responsible for their content or privacy practices.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "We may revise these Terms at any time. Material changes will be reflected by updating the date at the top of this page. Your continued use constitutes acceptance of the updated Terms.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about these Terms: [contact@easytuner.org](mailto:contact@easytuner.org).",
    ],
  },
];
