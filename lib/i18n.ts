/**
 * Lightweight i18n for First Hope NGO.
 *
 * Dictionaries are keyed by the English source string, so components simply
 * wrap visible text in `t("...")`. Any string without a translation falls
 * back gracefully to English — nothing ever breaks or shows a blank.
 *
 * Translations cover the navigation, hero, section headings, program names,
 * CTA, and footer. Long-form content (blog articles, testimonials, program
 * descriptions) falls back to English until added here.
 */

export type Lang = "en" | "hi" | "as";

export const languages: { code: Lang; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "hi", label: "हिं", name: "हिंदी" },
  { code: "as", label: "অস", name: "অসমীয়া" },
];

type Dict = Record<string, string>;

const hi: Dict = {
  // Nav
  Home: "होम",
  Programs: "कार्यक्रम",
  Impact: "प्रभाव",
  Gallery: "गैलरी",
  Events: "आयोजन",
  Blog: "ब्लॉग",
  Contact: "संपर्क",
  // Common
  "Become a Volunteer": "स्वयंसेवक बनें",
  Volunteer: "स्वयंसेवक",
  "Get Involved": "जुड़ें",
  "Watch our story": "हमारी कहानी देखें",
  "Learn more": "और जानें",
  // Hero
  "Hope Changes Everything": "आशा सब कुछ बदल देती है",
  "Creating Hope.": "आशा का निर्माण।",
  "Transforming Lives.": "जीवन में बदलाव।",
  "First Hope NGO is dedicated to empowering communities through education, food security, volunteerism, and sustainable development.":
    "फर्स्ट होप एनजीओ शिक्षा, खाद्य सुरक्षा, स्वयंसेवा और सतत विकास के माध्यम से समुदायों को सशक्त बनाने के लिए समर्पित है।",
  "Lives Impacted": "प्रभावित जीवन",
  "Community Events": "सामुदायिक आयोजन",
  "Villages Reached": "गाँवों तक पहुँच",
  // Impact
  "Impact Dashboard": "प्रभाव डैशबोर्ड",
  "Numbers that carry stories": "आँकड़े जो कहानियाँ कहते हैं",
  "Real, measurable change — tracked transparently and updated as we grow.":
    "वास्तविक, मापने योग्य बदलाव — पारदर्शी ढंग से दर्ज और जैसे-जैसे हम बढ़ते हैं, अद्यतन।",
  "Every hour you give creates lasting change.": "आपका दिया हर घंटा स्थायी बदलाव लाता है।",
  "Join as a volunteer": "स्वयंसेवक के रूप में जुड़ें",
  "Meals Distributed": "वितरित भोजन",
  "Children Supported": "सहायता प्राप्त बच्चे",
  "Volunteers Registered": "पंजीकृत स्वयंसेवक",
  "Community Projects": "सामुदायिक परियोजनाएँ",
  "Funds Raised": "जुटाई गई धनराशि",
  // Programs
  "What We Do": "हम क्या करते हैं",
  "Programs built around real needs": "वास्तविक जरूरतों के इर्द-गिर्द बने कार्यक्रम",
  "Six focused initiatives, one shared belief — that every community deserves dignity, opportunity, and hope.":
    "छह केंद्रित पहल, एक साझा विश्वास — कि हर समुदाय गरिमा, अवसर और आशा का हकदार है।",
  "Food Distribution": "भोजन वितरण",
  "Human Values & Community Outreach": "मानवीय मूल्य एवं सामुदायिक सेवा",
  "Education Support": "शिक्षा सहायता",
  "Volunteer Development": "स्वयंसेवक विकास",
  "Environmental Programs": "पर्यावरण कार्यक्रम",
  "Health Awareness Campaigns": "स्वास्थ्य जागरूकता अभियान",
  // Storytelling
  "Our Story": "हमारी कहानी",
  "Every Act of Kindness Creates Hope": "दयालुता का हर कार्य आशा जगाता है",
  "Be the next chapter.": "अगला अध्याय बनें।",
  // Success stories
  "Success Stories": "सफलता की कहानियाँ",
  "Lives changed, in their words": "बदले हुए जीवन, उन्हीं के शब्दों में",
  // CTA
  "Join the movement": "इस आंदोलन से जुड़ें",
  "Hope is a verb.": "आशा एक क्रिया है।",
  "Let's act on it.": "आइए इस पर कार्य करें।",
  "Whether you give an hour or a gift, you become part of a story that ends with a child fed, a student dreaming, a village rising.":
    "चाहे आप एक घंटा दें या कोई उपहार, आप एक ऐसी कहानी का हिस्सा बनते हैं जो एक बच्चे के पेट भरने, एक छात्र के सपने देखने और एक गाँव के उठ खड़े होने पर पूरी होती है।",
  // Footer
  "Quick Links": "त्वरित लिंक",
  Explore: "अन्वेषण करें",
  "Get in Touch": "संपर्क करें",
  "Visit Us": "हमसे मिलें",
  Email: "ईमेल",
  Call: "कॉल",
  Subscribe: "सब्सक्राइब करें",
  "Monthly impact reports, stories, and ways to help — straight to your inbox.":
    "मासिक प्रभाव रिपोर्ट, कहानियाँ और मदद के तरीके — सीधे आपके इनबॉक्स में।",
  "Privacy Policy": "गोपनीयता नीति",
  Terms: "शर्तें",
};

const as: Dict = {
  // Nav
  Home: "মূল পৃষ্ঠা",
  Programs: "কাৰ্যসূচী",
  Impact: "প্ৰভাৱ",
  Gallery: "গেলেৰী",
  Events: "অনুষ্ঠান",
  Blog: "ব্লগ",
  Contact: "যোগাযোগ",
  // Common
  "Become a Volunteer": "স্বেচ্ছাসেৱক হওক",
  Volunteer: "স্বেচ্ছাসেৱক",
  "Get Involved": "জড়িত হওক",
  "Watch our story": "আমাৰ কাহিনী চাওক",
  "Learn more": "অধিক জানক",
  // Hero
  "Hope Changes Everything": "আশাই সকলো সলনি কৰে",
  "Creating Hope.": "আশা সৃষ্টি কৰা।",
  "Transforming Lives.": "জীৱন সলনি কৰা।",
  "First Hope NGO is dedicated to empowering communities through education, food security, volunteerism, and sustainable development.":
    "ফাৰ্ষ্ট হোপ এন.জি.অ’ শিক্ষা, খাদ্য সুৰক্ষা, স্বেচ্ছাসেৱা আৰু বহনক্ষম উন্নয়নৰ জৰিয়তে সমাজসমূহক সবল কৰিবলৈ প্ৰতিশ্ৰুতিবদ্ধ।",
  "Lives Impacted": "প্ৰভাৱিত জীৱন",
  "Community Events": "সামূহিক অনুষ্ঠান",
  "Villages Reached": "পোৱা গাঁৱ",
  // Impact
  "Impact Dashboard": "প্ৰভাৱ ডেছবৰ্ড",
  "Numbers that carry stories": "সংখ্যা, যিয়ে কাহিনী কয়",
  "Real, measurable change — tracked transparently and updated as we grow.":
    "প্ৰকৃত, জোখিব পৰা পৰিৱৰ্তন — স্বচ্ছতাৰে নথিভুক্ত আৰু আমাৰ বৃদ্ধিৰ লগে লগে আপডেট কৰা।",
  "Every hour you give creates lasting change.": "আপুনি দিয়া প্ৰতিটো ঘণ্টাই স্থায়ী পৰিৱৰ্তন আনে।",
  "Join as a volunteer": "স্বেচ্ছাসেৱক হিচাপে যোগদান কৰক",
  "Meals Distributed": "বিতৰণ কৰা আহাৰ",
  "Children Supported": "সহায় পোৱা শিশু",
  "Volunteers Registered": "পঞ্জীয়নভুক্ত স্বেচ্ছাসেৱক",
  "Community Projects": "সামূহিক প্ৰকল্প",
  "Funds Raised": "সংগৃহীত পুঁজি",
  // Programs
  "What We Do": "আমি কি কৰোঁ",
  "Programs built around real needs": "প্ৰকৃত প্ৰয়োজনৰ ওপৰত গঢ়ি তোলা কাৰ্যসূচী",
  "Six focused initiatives, one shared belief — that every community deserves dignity, opportunity, and hope.":
    "ছটা কেন্দ্ৰীভূত পদক্ষেপ, এটা অভিন্ন বিশ্বাস — প্ৰতিখন সমাজে মৰ্যাদা, সুযোগ আৰু আশাৰ অধিকাৰী।",
  "Food Distribution": "খাদ্য বিতৰণ",
  "Human Values & Community Outreach": "মানৱীয় মূল্যবোধ আৰু সমাজ সেৱা",
  "Education Support": "শিক্ষা সহায়",
  "Volunteer Development": "স্বেচ্ছাসেৱক বিকাশ",
  "Environmental Programs": "পৰিৱেশ কাৰ্যসূচী",
  "Health Awareness Campaigns": "স্বাস্থ্য সজাগতা অভিযান",
  // Storytelling
  "Our Story": "আমাৰ কাহিনী",
  "Every Act of Kindness Creates Hope": "প্ৰতিটো দয়াৰ কাৰ্যই আশা সৃষ্টি কৰে",
  "Be the next chapter.": "পৰৱৰ্তী অধ্যায় হওক।",
  // Success stories
  "Success Stories": "সফলতাৰ কাহিনী",
  "Lives changed, in their words": "সলনি হোৱা জীৱন, তেওঁলোকৰ ভাষাত",
  // CTA
  "Join the movement": "এই আন্দোলনত যোগদান কৰক",
  "Hope is a verb.": "আশা এটা ক্ৰিয়া।",
  "Let's act on it.": "আহক, কাৰ্যত পৰিণত কৰোঁ।",
  "Whether you give an hour or a gift, you become part of a story that ends with a child fed, a student dreaming, a village rising.":
    "আপুনি এঘণ্টা সময় দিয়ক বা এটা উপহাৰ — আপুনি এনে এক কাহিনীৰ অংশ হৈ পৰে, যাৰ অন্তত থাকে এটি শিশুৰ আহাৰ, এজন ছাত্ৰৰ সপোন আৰু এখন গাঁৱৰ উত্থান।",
  // Footer
  "Quick Links": "দ্ৰুত লিংক",
  Explore: "অন্বেষণ কৰক",
  "Get in Touch": "যোগাযোগ কৰক",
  "Visit Us": "আমাক লগ ধৰক",
  Email: "ইমেইল",
  Call: "কল",
  Subscribe: "চাবস্ক্ৰাইব কৰক",
  "Monthly impact reports, stories, and ways to help — straight to your inbox.":
    "মাহিলী প্ৰভাৱ প্ৰতিবেদন, কাহিনী আৰু সহায়ৰ উপায় — পোনপটীয়াকৈ আপোনাৰ ইনবক্সলৈ।",
  "Privacy Policy": "গোপনীয়তা নীতি",
  Terms: "চৰ্তাৱলী",
};

export const dictionaries: Record<Lang, Dict> = { en: {}, hi, as };
