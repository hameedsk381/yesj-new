import { type LucideIcon } from "lucide-react"

export type ProgramActionTone = "primary" | "secondary" | "accent"

export type ProgramAction = {
  label: string
  href: string
  tone: ProgramActionTone
}

export type ProgramSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  cards?: Array<{ title: string; description: string }>
  image?: string
  gallery?: string[]
  actions?: Array<{ label: string; href: string; external?: boolean }>
}

export type ProgramData = {
  slug: string
  shortTitle: string
  title: string
  badge: string
  tagline: string
  subheading?: string
  icon: string
  logo?: string
  image: string
  cardBarClassName: string
  overviewDescription: string
  megaMenuDescription: string
  categories: string[]
  megaMenuGroup: "skill-education" | "youth-community" | "spiritual-celebration"
  heroActions: ProgramAction[]
  sections: ProgramSection[]
  bottomActions?: ProgramAction[]
}

export const programFilters = [
  "All Programs",
  "Education & Skills",
  "Employment",
  "Spiritual Formation",
  "Community Service",
  "Women Empowerment",
  "Youth Leadership",
  "Volunteering",
] as const

export const programsData: ProgramData[] = [
  {
    slug: "pep",
    shortTitle: "PEP",
    title: "Personality Enhancement Programme",
    badge: "Education & Youth Leadership",
    tagline: "Discover Yourself. Build Your Confidence. Lead Your World.",
    subheading: "Tailor-made orientations and workshops that help youth face life with confidence, meaning, and purpose.",
    icon: "sparkles",
    logo: "https://storage.googleapis.com/yesj/assets/PEP.webp",
    image: "/programs/PEP/WhatsApp Image 2021-12-19 at 1.35.52 PM (2).jpeg",
    cardBarClassName: "bg-primary",
    overviewDescription: "Soft skills, life skills, and personality development sessions in schools, colleges, and parishes.",
    megaMenuDescription: "Confidence-building, leadership, and personality development workshops.",
    categories: ["Education & Skills", "Youth Leadership"],
    megaMenuGroup: "skill-education",
    heroActions: [
      { label: "Apply for PEP", href: "/contact?program=pep", tone: "primary" },
      { label: "Download Brochure", href: "/contact?program=pep&topic=brochure", tone: "secondary" },
    ],
    sections: [
      {
        title: "What PEP Does",
        paragraphs: [
          "PEP takes YES-J into schools, colleges, and parishes to conduct seminars, camps, and workshops in soft skills, life skills, and personality development.",
          "It is designed as a space of self-discovery where young people learn to lead with confidence and social awareness.",
        ],
        bullets: [
          "Communication, teamwork, adaptability, and conflict resolution.",
          "Goal-setting, time management, emotional intelligence, and stress management.",
          "Career guidance, servant leadership, identity formation, and values.",
        ],
      },
      {
        title: "Who It Serves",
        bullets: [
          "Students from Class 8 through postgraduate level.",
          "Teachers, parish youth groups, and community organizations.",
          "Rural and semi-urban youth needing practical confidence-building support.",
        ],
      },
    ],
    bottomActions: [{ label: "Invite YES-J for a PEP Session", href: "/contact?program=pep&type=invite", tone: "primary" }],
  },
  {
    slug: "magic",
    shortTitle: "MAGIC",
    title: "MAGIC Youth",
    badge: "Student Youth Wing",
    tagline: "Men and Women Aiming at Greater Initiatives for Change",
    subheading: "A campus-based movement that forms young people as agents of conscience, compassion, and commitment.",
    icon: "wand-2",
    logo: "https://storage.googleapis.com/yesj/assets/MAGIC YOUTH.webp",
    image: "/programs/MAGIC/WhatsApp Image 2021-12-19 at 1.36.05 PM.jpeg",
    cardBarClassName: "bg-secondary",
    overviewDescription: "Student-led campus chapters rooted in experience, reflection, involvement, and transformation.",
    megaMenuDescription: "Student youth chapters that organize leadership and social action.",
    categories: ["Youth Leadership", "Community Service"],
    megaMenuGroup: "youth-community",
    heroActions: [{ label: "Join MAGIC", href: "/contact?program=magic", tone: "primary" }],
    sections: [
      {
        title: "What MAGIC Does",
        paragraphs: [
          "MAGIC is YES-J's student youth wing inside educational institutions. It helps students become agents of change for themselves, their campuses, and their communities.",
        ],
        cards: [
          { title: "Experience", description: "Exposure visits and social encounters that ground learning in reality." },
          { title: "Reflection", description: "Structured personal and group reflection on what was seen and what must change." },
          { title: "Involvement", description: "Students design and run initiatives on campus and in local communities." },
          { title: "Transformation", description: "Long-term change in self, campus culture, and social commitment." },
        ],
      },
      {
        title: "What Chapters Organize",
        bullets: [
          "Campus awareness campaigns on caste, gender, environment, and poverty.",
          "Community service initiatives and YES-J mobilisation drives.",
          "Leadership sessions, youth forums, and district-level participation.",
        ],
      },
    ],
    bottomActions: [{ label: "Start a MAGIC Chapter", href: "/contact?program=magic&type=chapter", tone: "accent" }],
  },
  {
    slug: "must",
    shortTitle: "MuST",
    title: "Multi-Skill Training Programme (MuST)",
    badge: "Vocational Training",
    tagline: "Your Hands. Your Future. Your Dignity.",
    subheading: "Free residential vocational training that converts dropouts into skilled professionals.",
    icon: "wrench",
    logo: "https://storage.googleapis.com/yesj/assets/MUST.webp",
    image: "/programs/MUST/must (22).jpg",
    cardBarClassName: "bg-accent",
    overviewDescription: "Residential vocational training in trades that lead to employment and self-employment.",
    megaMenuDescription: "Free residential vocational training in tailoring, ICT, driving, welding, and more.",
    categories: ["Education & Skills", "Employment"],
    megaMenuGroup: "skill-education",
    heroActions: [{ label: "Apply for MuST", href: "/contact?program=must", tone: "primary" }],
    sections: [
      {
        title: "What MuST Offers",
        paragraphs: [
          "MuST equips school dropouts and unorganized youth with practical trade skills through fully residential training.",
          "Participants receive food, accommodation, certification support, and referral pathways through JoY Desk.",
        ],
        cards: [
          { title: "Tailoring", description: "Training for garment making and self-employment." },
          { title: "ICT", description: "Office tools, internet skills, and computer-based job readiness." },
          { title: "Driving", description: "Road safety, maintenance basics, and licensing support." },
          { title: "Welding", description: "Fabrication skills for industrial and workshop employment." },
        ],
      },
      {
        title: "Why It Matters",
        bullets: [
          "Builds dignified pathways beyond daily wage labour.",
          "Targets youth aged 15-25 from economically disadvantaged backgrounds.",
          "Creates direct links from training to placement and income generation.",
        ],
      },
    ],
    bottomActions: [
      { label: "Apply Now for MuST", href: "/contact?program=must", tone: "primary" },
      { label: "Sponsor a Trainee", href: "/donate?cause=must", tone: "accent" },
    ],
  },
  {
    slug: "summer-shapes",
    shortTitle: "Summer Shapes",
    title: "Summer Shapes",
    badge: "Applications Open - Summer 2026",
    tagline: "Speak English. Speak Confidence. Speak Your Future.",
    subheading: "A free 30-day residential program in English communication and life skills for rural and disadvantaged youth.",
    icon: "book-open",
    logo: "https://storage.googleapis.com/yesj/assets/summer-shapes.webp",
    image: "/programs/SS/ss (28).jpg",
    cardBarClassName: "bg-accent",
    overviewDescription: "A free English communication and life-skills camp built for youth locked out of social mobility.",
    megaMenuDescription: "A free 30-day residential English communication and life-skills programme.",
    categories: ["Education & Skills"],
    megaMenuGroup: "skill-education",
    heroActions: [
      { label: "Apply for Summer Shapes 2026", href: "/contact?program=summer-shapes&type=apply", tone: "accent" },
      { label: "Download Brochure", href: "/contact?program=summer-shapes&topic=brochure", tone: "secondary" },
    ],
    sections: [
      {
        title: "What Summer Shapes Solves",
        paragraphs: [
          "English remains a gateway to employment, higher education, and social mobility, but many rural and marginalized youth never get usable instruction.",
          "Summer Shapes responds with a high-intensity residential format that combines spoken English, confidence-building, and life-skills formation.",
        ],
        bullets: [
          "30 days residential with food, accommodation, and training fully free.",
          "Spoken English, public speaking, teamwork, and self-confidence training.",
          "Experiential learning through debates, role plays, storytelling, and peer learning.",
        ],
      },
      {
        title: "Who Can Apply",
        bullets: [
          "Youth aged 16-25 from rural, semi-urban, or slum communities.",
          "Applicants who have completed at least Class 8.",
          "Economically disadvantaged participants willing to commit to the full residential schedule.",
        ],
      },
    ],
    bottomActions: [{ label: "Apply Now - Summer Shapes 2026", href: "/contact?program=summer-shapes", tone: "primary" }],
  },
  {
    slug: "ssp",
    shortTitle: "SSP",
    title: "Scholar Support Programme",
    badge: "Higher Education",
    tagline: "Brilliant Minds. Limited Resources. Unlimited Potential.",
    subheading: "Financial and mentoring support for academically outstanding youth from poor backgrounds.",
    icon: "users",
    logo: "https://storage.googleapis.com/yesj/assets/scholar-support-programme.webp",
    image: "/programs/SSP/ssp (1).jpg",
    cardBarClassName: "bg-primary",
    overviewDescription: "Scholarships, mentoring, and accompaniment that bridge the gap between talent and opportunity.",
    megaMenuDescription: "Scholarships and mentoring for academically outstanding youth.",
    categories: ["Education & Skills"],
    megaMenuGroup: "skill-education",
    heroActions: [{ label: "Apply for SSP", href: "/contact?program=ssp", tone: "primary" }],
    sections: [
      {
        title: "What SSP Provides",
        paragraphs: [
          "SSP supports tertiary students who are academically strong but financially constrained.",
          "The program combines fee support with mentoring, follow-up, and personal accompaniment.",
        ],
        bullets: [
          "Support for tuition, books, and academic expenses.",
          "Written test, interview, and ongoing mentoring process.",
          "Access to life-skills inputs and the YES-J scholar community.",
        ],
      },
      {
        title: "Eligibility",
        bullets: [
          "Students in college or university in Andhra Pradesh or Telangana.",
          "Strong academic record and economic need.",
          "Motivation, commitment, and openness to guidance.",
        ],
      },
      {
        title: "Our Partner",
        image: "/images/tcu-logo.png",
        paragraphs: [
          "The Scholar Support Programme is run in active partnership with Talitha Cumi Unnati (TCU), an organisation based in Andhra Pradesh committed to empowering young people — especially girl children — through tertiary education. Through education, mentorship, and family engagement, TCU creates safe spaces where marginalised girls can grow and thrive, working closely with parents and caregivers so that each girl has the guidance, encouragement, and resources she needs to pursue her dreams.",
          "Together, we accompany academically outstanding students from poor backgrounds through college and university — pairing fee support with mentoring, follow-up, and a community that believes in their potential.",
        ],
        gallery: ["/talitacumi-1.webp", "/talitacumi-2.webp", "/talitacumi-3.webp", "/talitacumi-4.webp", "/talitacumi-5.webp"],
        actions: [{ label: "Visit Talitha Cumi Unnati →", href: "https://www.tcuindia.org/", external: true }],
      },
    ],
    bottomActions: [{ label: "Support an SSP Scholar", href: "/donate?cause=ssp", tone: "accent" }],
  },
  {
    slug: "joy-desk",
    shortTitle: "JoY Desk",
    title: "JoY Desk - Jobs for Youth",
    badge: "Employment",
    tagline: "Your Potential Deserves the Right Opportunity.",
    subheading: "YES-J connects unemployed youth to real opportunities through guidance, training, and employer networks.",
    icon: "briefcase",
    logo: "https://storage.googleapis.com/yesj/assets/Jobs-for-youth-desk.webp",
    image: "/website/IMG_9052.JPG",
    cardBarClassName: "bg-secondary",
    overviewDescription: "Job-readiness training, employer referrals, and JoY Mela job fair connections.",
    megaMenuDescription: "Employment guidance, referrals, and JoY Mela connections.",
    categories: ["Employment"],
    megaMenuGroup: "youth-community",
    heroActions: [{ label: "Register for JoY Desk", href: "/contact?program=joy-desk", tone: "primary" }],
    sections: [
      {
        title: "What JoY Desk Does",
        paragraphs: [
          "JoY Desk helps struggling unemployed youth move from uncertainty to placement through practical preparation and verified employer connections.",
        ],
        bullets: [
          "Resume writing, interview skills, and workplace etiquette training.",
          "Referral support and partnerships with businesses and institutions.",
          "JoY Mela job fairs that connect trained youth with employers.",
        ],
      },
      {
        title: "Employer Partnerships",
        bullets: [
          "Employers can join JoY Mela as hiring partners.",
          "YES-J helps match candidates to verified openings.",
          "Placed youth receive short-term follow-up after joining work.",
        ],
      },
    ],
    bottomActions: [{ label: "Register as Employer for JoY Mela", href: "/contact?program=joy-desk&type=employer", tone: "accent" }],
  },
  {
    slug: "vip",
    shortTitle: "VIP",
    title: "Voluntary Immersion Programme",
    badge: "Volunteering",
    tagline: "Immerse Yourself. Serve. Be Transformed.",
    subheading: "Volunteer with YES-J in villages, slums, campuses, and urban margins.",
    icon: "globe-2",
    logo: "https://storage.googleapis.com/yesj/assets/VIP.webp",
    image: "/programs/VIP/vip (21) (1).jpg",
    cardBarClassName: "bg-primary",
    overviewDescription: "Local, national, international, and remote volunteering pathways through YES-J.",
    megaMenuDescription: "Volunteer immersion in villages, slums, and YES-J program spaces.",
    categories: ["Volunteering", "Community Service"],
    megaMenuGroup: "youth-community",
    heroActions: [{ label: "Apply as a Volunteer", href: "/contact?program=vip", tone: "primary" }],
    sections: [
      {
        title: "How VIP Works",
        paragraphs: [
          "VIP invites students, professionals, and service-minded people to step out of comfort and into direct exposure to social realities.",
        ],
        cards: [
          { title: "Local Volunteers", description: "Part-time or full-time engagement within Andhra Pradesh and Telangana." },
          { title: "National Volunteers", description: "Service placements for people joining from other parts of India." },
          { title: "International Volunteers", description: "Cross-cultural immersion for volunteers from abroad." },
          { title: "Remote Volunteers", description: "Support in design, media, research, administration, and content." },
        ],
      },
      {
        title: "Where Volunteers Serve",
        bullets: [
          "YES-J Centre for Excellence in Vijayawada.",
          "Village outreach and slum community tutoring centers.",
          "Compassion Connect relief work and digital media support.",
          "MAGIC campus chapters and other YES-J initiatives.",
        ],
      },
    ],
    bottomActions: [{ label: "Volunteer Now", href: "/contact?program=vip", tone: "primary" }],
  },
  {
    slug: "compassion-connect",
    shortTitle: "Compassion Connect",
    title: "Compassion Connect",
    badge: "Direct Community Care",
    tagline: "It Does Not Wait to Be Asked. It Shows Up.",
    subheading: "YES-J's direct humanitarian response to food insecurity, destitution, and disaster.",
    icon: "hand-heart",
    logo: "https://storage.googleapis.com/yesj/assets/compassion-connect.webp",
    image: "https://storage.googleapis.com/yesj/website/IMG_5899.JPG",
    cardBarClassName: "bg-accent",
    overviewDescription: "Immediate response for urgent human need in streets, crises, and disaster situations.",
    megaMenuDescription: "Direct relief through food support, rescue work, and disaster response.",
    categories: ["Community Service"],
    megaMenuGroup: "youth-community",
    heroActions: [{ label: "Donate to Compassion Connect", href: "/donate?cause=compassion-connect", tone: "accent" }],
    sections: [
      {
        title: "What Compassion Connect Does",
        paragraphs: [
          "Compassion Connect is YES-J's rapid response arm. It acts when suffering is immediate and waiting is not acceptable.",
        ],
        cards: [
          { title: "Food Distribution", description: "Cooked meals and dry rations for destitutes, migrants, and families in crisis." },
          { title: "Destitute Rescue", description: "Street rescue, rehabilitation, and follow-up for people abandoned in public spaces." },
          { title: "Disaster Relief", description: "Rapid response during floods, cyclones, and other emergencies." },
          { title: "Medical Aid", description: "Emergency referrals and support for urgent health needs." },
        ],
      },
    ],
    bottomActions: [
      { label: "Donate to Compassion Connect", href: "/donate?cause=compassion-connect", tone: "accent" },
      { label: "Volunteer in Relief Ops", href: "/contact?program=vip&area=compassion-connect", tone: "primary" },
    ],
  },
  {
    slug: "sthri",
    shortTitle: "STHRI",
    title: "STHRI",
    badge: "Women Empowerment",
    tagline: "Stand for Holistic Resilience and Independence",
    subheading: "A women empowerment initiative focused on agency, resilience, and leadership.",
    icon: "heart",
    logo: "https://storage.googleapis.com/yesj/assets/YESJ-ECHOES.webp",
    image: "https://storage.googleapis.com/yesj/website/IMG_8989.JPG",
    cardBarClassName: "bg-secondary",
    overviewDescription: "Women's empowerment through leadership, financial literacy, and rights awareness.",
    megaMenuDescription: "Holistic resilience and financial independence support for women.",
    categories: ["Women Empowerment"],
    megaMenuGroup: "youth-community",
    heroActions: [{ label: "Contact STHRI Program", href: "/contact?program=sthri", tone: "primary" }],
    sections: [
      {
        title: "What STHRI Builds",
        paragraphs: [
          "STHRI goes beyond welfare support to help women grow in financial independence, leadership, and social resilience.",
        ],
        bullets: [
          "Financial literacy and income generation support.",
          "Leadership, self-advocacy, and legal rights awareness.",
          "Health, hygiene, community organizing, and access to government entitlements.",
        ],
      },
    ],
  },
  {
    slug: "ogod",
    shortTitle: "O GOD",
    title: "O GOD - Organising God-Oriented Days",
    badge: "Spiritual Formation",
    tagline: "Transformation Begins in the Soul.",
    subheading: "Spaces for Scripture, prayer, meditation, and inter-religious dialogue.",
    icon: "hand-heart",
    logo: "https://storage.googleapis.com/yesj/assets/O-GOD.webp",
    image: "https://storage.googleapis.com/yesj/website/IMG_5999.JPG",
    cardBarClassName: "bg-primary",
    overviewDescription: "Spiritual formation that helps youth build an inner compass rooted in faith and values.",
    megaMenuDescription: "Spiritual formation through Scripture, prayer, retreats, and dialogue.",
    categories: ["Spiritual Formation"],
    megaMenuGroup: "spiritual-celebration",
    heroActions: [{ label: "Contact O GOD", href: "/contact?program=ogod", tone: "secondary" }],
    sections: [
      {
        title: "What O GOD Includes",
        paragraphs: [
          "O GOD helps youth encounter God, reflect on life, and grow in spiritual depth while remaining open and respectful to people of all backgrounds.",
        ],
        bullets: [
          "Scripture study, prayer, and meditation sessions.",
          "Retreats, recollections, and inspirational talks.",
          "Inter-religious dialogue open to youth from every faith background.",
        ],
      },
    ],
  },
  {
    slug: "magis",
    shortTitle: "MAGIS / Yuvotsavaalu",
    title: "MAGIS - YES-J Yuvotsavaalu",
    badge: "Youth Festival",
    tagline: "Express. Experience. Enrich.",
    subheading: "YES-J's annual youth festival for celebration, reflection, and collective vision.",
    icon: "star",
    logo: "https://storage.googleapis.com/yesj/assets/YUVOTSTAVAALU.webp",
    image: "/programs/YUVOTSAVAALU/yuvotshavalu (1).jpg",
    cardBarClassName: "bg-accent",
    overviewDescription: "A large youth festival that combines arts, expression, solidarity, and Jesuit imagination.",
    megaMenuDescription: "Annual youth festivals built around expression, community, and leadership.",
    categories: ["Youth Leadership", "Spiritual Formation"],
    megaMenuGroup: "spiritual-celebration",
    heroActions: [{ label: "Register for MAGIS 2026", href: "/contact?program=magis", tone: "accent" }],
    sections: [
      {
        title: "What MAGIS Brings Together",
        paragraphs: [
          "MAGIS - YES-J Yuvotsavaalu gathers thousands of young people to express talent, build solidarity, and imagine a more just world together.",
        ],
        bullets: [
          "Drama, music, dance, art, poetry, and cultural competitions.",
          "Social awareness campaigns, keynote talks, and youth declarations.",
          "Recognition for outstanding YES-J youth and MAGIC chapter showcases.",
        ],
      },
    ],
  },
  {
    slug: "eott",
    shortTitle: "Each One Teach Ten",
    title: "Each One - Teach Ten",
    badge: "Community Education",
    tagline: "Read. Lead. Succeed. Generation by Generation.",
    subheading: "Community learning centers in slums and rural communities staffed by student tutors.",
    icon: "school",
    logo: "https://storage.googleapis.com/yesj/assets/each-one-teach-ten.webp",
    image: "https://storage.googleapis.com/yesj/website/IMG_6800.JPG",
    cardBarClassName: "bg-secondary",
    overviewDescription: "Student-led tutoring centers that strengthen literacy, numeracy, and community learning.",
    megaMenuDescription: "Student-run tutoring centers in slums and rural communities.",
    categories: ["Education & Skills", "Community Service"],
    megaMenuGroup: "skill-education",
    heroActions: [{ label: "Volunteer as a Tutor", href: "/contact?program=eott&type=tutor", tone: "primary" }],
    sections: [
      {
        title: "How EOTT Works",
        paragraphs: [
          "YES-J sets up community learning centers with local partners and trains student tutors to support children who need literacy and numeracy reinforcement.",
        ],
        cards: [
          { title: "YES-J", description: "Identifies locations, trains tutors, and monitors progress." },
          { title: "Partners", description: "Parishes, schools, colleges, and public bodies provide support and local access." },
          { title: "Student Tutors", description: "Final-year students teach while gaining experience and paying learning forward." },
          { title: "Community Children", description: "Children receive free tutoring and learning support close to home." },
        ],
      },
      {
        title: "Outcomes",
        bullets: [
          "Improved literacy and numeracy in underserved communities.",
          "Teaching experience for student interns.",
          "Stronger ties between campuses and surrounding communities.",
        ],
      },
    ],
    bottomActions: [
      { label: "Volunteer as a Tutor", href: "/contact?program=eott&type=tutor", tone: "primary" },
      { label: "Host a Center", href: "/contact?program=eott&type=host", tone: "secondary" },
    ],
  },
  {
    slug: "y-hub",
    shortTitle: "Y HUB",
    title: "Y HUB - Why to WOW",
    badge: "Entrepreneurship",
    tagline: "Why Changes to WOW.",
    subheading: "A community for young entrepreneurs that sharpens ideas, expands creativity, and stands behind their vision.",
    icon: "lightbulb",
    logo: "",
    image: "",
    cardBarClassName: "bg-accent",
    overviewDescription: "An entrepreneurship incubation space for youth to turn ideas into impact.",
    megaMenuDescription: "Entrepreneurship incubation and innovation hub for young founders.",
    categories: ["Education & Skills", "Employment"],
    megaMenuGroup: "skill-education",
    heroActions: [{ label: "Join Y HUB", href: "/contact?program=y-hub", tone: "primary" }],
    sections: [
      {
        title: "What Y HUB Offers",
        paragraphs: [
          "At YES-J, young entrepreneurs find a community that sharpens their ideas, expands their creativity, challenges their thinking, and stands behind their vision. Y HUB is the answer to every young mind that dares to ask Why—where Why changes to WOW.",
        ],
        bullets: [
          "Mentorship and guidance from experienced entrepreneurs and industry experts.",
          "Workspace, resources, and networking opportunities to build and test ideas.",
          "Pitch events, incubation support, and pathways to funding.",
        ],
      },
      {
        title: "Who It Is For",
        bullets: [
          "Young people aged 18-30 with a business idea or entrepreneurial mindset.",
          "First-time founders, aspiring innovators, and community problem-solvers.",
          "Anyone ready to move from Why to WOW.",
        ],
      },
    ],
    bottomActions: [{ label: "Pitch Your Idea", href: "/contact?program=y-hub&type=pitch", tone: "accent" }],
  },
]

export const programGroups = [
  { title: "Skill & Education", items: programsData.filter((program) => program.megaMenuGroup === "skill-education") },
  { title: "Youth & Community", items: programsData.filter((program) => program.megaMenuGroup === "youth-community") },
  { title: "Spiritual & Celebration", items: programsData.filter((program) => program.megaMenuGroup === "spiritual-celebration") },
]

export function getProgramBySlug(slug: string) {
  return programsData.find((program) => program.slug === slug)
}
