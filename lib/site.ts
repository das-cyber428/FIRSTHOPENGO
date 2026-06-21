/**
 * Central content + configuration for FIRST HOPE NGO.
 * Edit copy, stats, programs, and media here — pages read from this file
 * so non-developers can update content in one place (or wire it to Supabase).
 */

export const site = {
  name: "First Hope NGO",
  shortName: "First Hope",
  tagline: "Hope Changes Everything",
  location: "Dhekiajuli, Sonitpur, Assam, India",
  email: "hello@firsthopengo.org",
  phone: "+91 99999 99999",
  whatsapp: "919999999999",
  mission:
    "Empowering communities through food distribution, education support, volunteer engagement, humanitarian outreach, and social welfare initiatives.",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/#programs" },
  { label: "Impact", href: "/#impact" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const heroStats = [
  { value: 5000, suffix: "+", label: "Lives Impacted" },
  { value: 500, suffix: "+", label: "Volunteers" },
  { value: 100, suffix: "+", label: "Community Events" },
  { value: 50, suffix: "+", label: "Villages Reached" },
];

export const impactStats = [
  { value: 128000, suffix: "+", label: "Meals Distributed", accent: "gold" },
  { value: 3200, suffix: "+", label: "Children Supported", accent: "brand" },
  { value: 500, suffix: "+", label: "Volunteers Registered", accent: "mint" },
  { value: 140, suffix: "+", label: "Community Projects", accent: "brand" },
  { value: 2400000, prefix: "₹", suffix: "+", label: "Funds Raised", accent: "gold" },
] as const;

export const storyChapters = [
  {
    id: "volunteer",
    kicker: "Chapter 01",
    title: "Volunteer Activity",
    body: "Hundreds of changemakers give their weekends to teach, feed, and uplift. Every hand raised becomes a life changed.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "food",
    kicker: "Chapter 02",
    title: "Food Distribution",
    body: "Warm meals reach families in the most remote corners of Sonitpur — because no child should learn on an empty stomach.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "community",
    kicker: "Chapter 03",
    title: "Community Service",
    body: "From clean-water drives to shelter rebuilds, we partner with villages to create change that lasts for generations.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "education",
    kicker: "Chapter 04",
    title: "Educational Support",
    body: "Books, kits, scholarships, and mentors. We open the doors of learning for children who were told they couldn't dream.",
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "health",
    kicker: "Chapter 05",
    title: "Health Awareness",
    body: "Free camps, screenings, and education bring dignity and care to communities far from the nearest hospital.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
  },
];

export type Program = {
  slug: string;
  title: string;
  story: string;
  image: string;
  stat: { value: string; label: string };
  accent: "brand" | "gold" | "mint";
};

export const programs: Program[] = [
  {
    slug: "food-distribution",
    title: "Food Distribution",
    story:
      "Daily nutrition drives and ration kits that keep families nourished through hardship and disaster.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    stat: { value: "128K+", label: "meals served" },
    accent: "gold",
  },
  {
    slug: "human-values",
    title: "Human Values & Community Outreach",
    story:
      "Workshops on compassion, dignity, and leadership that rebuild the social fabric of entire villages.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80",
    stat: { value: "50+", label: "villages reached" },
    accent: "brand",
  },
  {
    slug: "education-support",
    title: "Education Support",
    story:
      "Scholarships, learning kits, and after-school mentoring that turn first-generation learners into graduates.",
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1200&q=80",
    stat: { value: "3,200+", label: "children supported" },
    accent: "mint",
  },
  {
    slug: "volunteer-development",
    title: "Volunteer Development",
    story:
      "Training, certification, and leadership pathways that grow everyday people into community leaders.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    stat: { value: "500+", label: "volunteers trained" },
    accent: "brand",
  },
  {
    slug: "environmental-programs",
    title: "Environmental Programs",
    story:
      "Tree plantation, river clean-ups, and sustainability drives protecting Assam's fragile ecosystems.",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80",
    stat: { value: "20K+", label: "trees planted" },
    accent: "mint",
  },
  {
    slug: "health-awareness",
    title: "Health Awareness Campaigns",
    story:
      "Free medical camps, screenings, and hygiene education bringing care to underserved communities.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    stat: { value: "80+", label: "health camps" },
    accent: "gold",
  },
];

export type Story = {
  name: string;
  role: string;
  category: "Volunteer" | "Community" | "Student";
  quote: string;
  image: string;
};

export const successStories: Story[] = [
  {
    name: "Anjali Das",
    role: "Student, Class 10",
    category: "Student",
    quote:
      "First Hope gave me books and a mentor when my family couldn't. Today I top my class and dream of becoming a doctor.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Rofiqul Islam",
    role: "Volunteer since 2021",
    category: "Volunteer",
    quote:
      "I came to give a few hours. I found a family and a purpose. Watching a village transform is the greatest reward.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bhumika Village",
    role: "Sonitpur District",
    category: "Community",
    quote:
      "Clean water reached our homes for the first time. Our children no longer fall sick every monsoon.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",
  },
];

export const galleryCategories = [
  "All",
  "Food Distribution",
  "Volunteer Activities",
  "Education",
  "Health Camps",
  "Community Outreach",
] as const;

export const galleryImages = [
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80", category: "Food Distribution", h: "tall" },
  { src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80", category: "Volunteer Activities", h: "short" },
  { src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80", category: "Education", h: "mid" },
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80", category: "Health Camps", h: "tall" },
  { src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80", category: "Community Outreach", h: "mid" },
  { src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80", category: "Community Outreach", h: "short" },
  { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80", category: "Volunteer Activities", h: "tall" },
  { src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80", category: "Education", h: "mid" },
  { src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=80", category: "Food Distribution", h: "short" },
  { src: "https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?auto=format&fit=crop&w=900&q=80", category: "Health Camps", h: "mid" },
  { src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=80", category: "Community Outreach", h: "tall" },
  { src: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=900&q=80", category: "Education", h: "short" },
];

export type NgoEvent = {
  slug: string;
  title: string;
  date: string; // ISO
  location: string;
  category: string;
  image: string;
  excerpt: string;
};

export const events: NgoEvent[] = [
  {
    slug: "annual-food-drive-2026",
    title: "Annual Monsoon Food Drive",
    date: "2026-07-18T09:00:00+05:30",
    location: "Dhekiajuli Town Hall, Sonitpur",
    category: "Food Distribution",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Help us pack and distribute 10,000 meals to flood-affected families across Sonitpur.",
  },
  {
    slug: "education-fair-2026",
    title: "First Hope Education Fair",
    date: "2026-08-12T10:00:00+05:30",
    location: "Govt. High School, Dhekiajuli",
    category: "Education",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Scholarships, free books, and career mentoring for 500+ first-generation learners.",
  },
  {
    slug: "health-camp-2026",
    title: "Free Community Health Camp",
    date: "2026-09-05T08:30:00+05:30",
    location: "Borgang Village, Sonitpur",
    category: "Health",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Free check-ups, eye screenings, and medicines for 1,000 villagers.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  readingTime: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "feeding-hope-monsoon",
    title: "Feeding Hope: Inside Our Monsoon Relief Mission",
    category: "Impact Reports",
    excerpt: "When the floods came, so did our volunteers. A look back at 10,000 meals delivered in 14 days.",
    author: "First Hope Team",
    date: "2026-06-02",
    readingTime: "6 min",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "first-generation-learners",
    title: "The Children Who Are First to Read in Their Families",
    category: "Community Updates",
    excerpt: "Meet the first-generation learners rewriting their family stories, one chapter at a time.",
    author: "Priya Sharma",
    date: "2026-05-20",
    readingTime: "5 min",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "a-day-as-volunteer",
    title: "A Day in the Life of a First Hope Volunteer",
    category: "Volunteer Experiences",
    excerpt: "From sunrise meal-packing to sunset story-time — 24 hours of changing lives in Sonitpur.",
    author: "Rofiqul Islam",
    date: "2026-05-04",
    readingTime: "4 min",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
  },
];

export const indianStates = [
  "Assam", "Arunachal Pradesh", "Bihar", "Delhi", "Gujarat", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Tripura",
  "Uttar Pradesh", "West Bengal", "Other",
];
