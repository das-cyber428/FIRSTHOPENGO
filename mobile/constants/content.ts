/** All editable content for the First Hope NGO app, in one place. */

export const org = {
  name: "First Hope NGO",
  tagline: "Hope Changes Everything",
  location: "Dhekiajuli, Sonitpur, Assam, India",
  email: "hello@firsthopengo.org",
  phone: "+919999999999",
  whatsapp: "919999999999",
  mission:
    "Empowering communities through food distribution, education support, volunteer engagement, humanitarian outreach, and social welfare initiatives.",
};

export const heroStats = [
  { value: 5000, suffix: "+", label: "Lives Impacted" },
  { value: 500, suffix: "+", label: "Volunteers" },
  { value: 100, suffix: "+", label: "Events" },
  { value: 50, suffix: "+", label: "Villages" },
];

export const impactStats = [
  { value: 128000, suffix: "+", label: "Meals Distributed", accent: "gold" },
  { value: 3200, suffix: "+", label: "Children Supported", accent: "brand" },
  { value: 500, suffix: "+", label: "Volunteers", accent: "mint" },
  { value: 140, suffix: "+", label: "Projects", accent: "brand" },
] as const;

export type Program = {
  slug: string;
  title: string;
  story: string;
  image: string;
  stat: string;
  accent: "brand" | "gold" | "mint";
};

export const programs: Program[] = [
  {
    slug: "food-distribution",
    title: "Food Distribution",
    story: "Daily nutrition drives and ration kits keeping families nourished through hardship.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
    stat: "128K+ meals served",
    accent: "gold",
  },
  {
    slug: "human-values",
    title: "Human Values & Outreach",
    story: "Workshops on compassion, dignity, and leadership that rebuild community.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1000&q=80",
    stat: "50+ villages reached",
    accent: "brand",
  },
  {
    slug: "education-support",
    title: "Education Support",
    story: "Scholarships, learning kits, and mentoring for first-generation learners.",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1000&q=80",
    stat: "3,200+ children supported",
    accent: "mint",
  },
  {
    slug: "volunteer-development",
    title: "Volunteer Development",
    story: "Training, certification, and leadership pathways for everyday changemakers.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80",
    stat: "500+ volunteers trained",
    accent: "brand",
  },
  {
    slug: "environmental-programs",
    title: "Environmental Programs",
    story: "Tree plantation, river clean-ups, and sustainability drives across Assam.",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1000&q=80",
    stat: "20K+ trees planted",
    accent: "mint",
  },
  {
    slug: "health-awareness",
    title: "Health Awareness",
    story: "Free medical camps, screenings, and hygiene education for underserved areas.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80",
    stat: "80+ health camps",
    accent: "gold",
  },
];

export type NgoEvent = {
  slug: string;
  title: string;
  date: string;
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
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Help us pack and distribute 10,000 meals to flood-affected families across Sonitpur.",
  },
  {
    slug: "education-fair-2026",
    title: "First Hope Education Fair",
    date: "2026-08-12T10:00:00+05:30",
    location: "Govt. High School, Dhekiajuli",
    category: "Education",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Scholarships, free books, and career mentoring for 500+ first-generation learners.",
  },
  {
    slug: "health-camp-2026",
    title: "Free Community Health Camp",
    date: "2026-09-05T08:30:00+05:30",
    location: "Borgang Village, Sonitpur",
    category: "Health",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Free check-ups, eye screenings, and medicines for 1,000 villagers.",
  },
];

export type Story = {
  name: string;
  role: string;
  category: string;
  quote: string;
  image: string;
};

export const stories: Story[] = [
  {
    name: "Anjali Das",
    role: "Student, Class 10",
    category: "Student",
    quote: "First Hope gave me books and a mentor. Today I top my class and dream of becoming a doctor.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Rofiqul Islam",
    role: "Volunteer since 2021",
    category: "Volunteer",
    quote: "I came to give a few hours. I found a family and a purpose.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
];

export const galleryCategories = [
  "All", "Food Distribution", "Volunteer", "Education", "Health Camps",
];

export const galleryImages = [
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=700&q=80", category: "Food Distribution" },
  { src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=700&q=80", category: "Volunteer" },
  { src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=700&q=80", category: "Education" },
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80", category: "Health Camps" },
  { src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=700&q=80", category: "Volunteer" },
  { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=700&q=80", category: "Volunteer" },
  { src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=80", category: "Education" },
  { src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=700&q=80", category: "Food Distribution" },
];

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "feeding-hope-monsoon",
    title: "Feeding Hope: Inside Our Monsoon Relief Mission",
    category: "Impact Reports",
    excerpt: "When the floods came, so did our volunteers. 10,000 meals delivered in 14 days.",
    date: "2026-06-02",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    slug: "first-generation-learners",
    title: "The Children Who Are First to Read in Their Families",
    category: "Community Updates",
    excerpt: "Meet the first-generation learners rewriting their family stories.",
    date: "2026-05-20",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1000&q=80",
  },
  {
    slug: "a-day-as-volunteer",
    title: "A Day in the Life of a First Hope Volunteer",
    category: "Volunteer Stories",
    excerpt: "From sunrise meal-packing to sunset story-time — 24 hours of change.",
    date: "2026-05-04",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80",
  },
];

export const indianStates = [
  "Assam", "Arunachal Pradesh", "Bihar", "Delhi", "Gujarat", "Karnataka",
  "Kerala", "Maharashtra", "Manipur", "Meghalaya", "Nagaland", "Odisha",
  "Tamil Nadu", "Tripura", "Uttar Pradesh", "West Bengal", "Other",
];
