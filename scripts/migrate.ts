import * as fs from 'fs';
import * as path from 'path';

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  console.error('Missing STRAPI_URL or STRAPI_API_TOKEN in environment');
  process.exit(1);
}

async function strapiPost(endpoint: string, data: any) {
  const url = `${STRAPI_URL}${endpoint}`;
  console.log(`POST ${url}...`);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
  
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (!res.ok) {
       console.error(`Error POSTing to ${endpoint}:`, json.error);
       return null;
    }
    return json;
  } catch (e) {
    console.error(`Raw response from ${endpoint}:`, text);
    return null;
  }
}

// Data from lib/data/programs.ts (shortened for brevity but keeping structure)
const programs = [
  {
    slug: "pep",
    shortTitle: "PEP",
    title: "Personality Enhancement Programme",
    badge: "Education & Youth Leadership",
    tagline: "Discover Yourself. Build Your Confidence. Lead Your World.",
    subheading: "Tailor-made orientations and workshops that help youth face life with confidence, meaning, and purpose.",
    icon: "sparkles",
    image: "/website/IMG_8159.JPG",
    cardBarClassName: "bg-primary",
    overviewDescription: "Soft skills, life skills, and personality development sessions in schools, colleges, and parishes.",
    megaMenuDescription: "Confidence-building, leadership, and personality development workshops.",
    categories: "Education & Skills, Youth Leadership",
    megaMenuGroup: "skill-education",
    heroActions: [
      { label: "Apply for PEP", href: "/contact?program=pep", tone: "primary" },
      { label: "Download Brochure", href: "/contact?program=pep&topic=brochure", tone: "secondary" },
    ],
    sections: [
      {
        title: "What PEP Does",
        paragraphs: ["PEP takes YES-J into schools, colleges, and parishes..."],
        bullets: ["Communication, teamwork..."],
      }
    ],
    bottomActions: [{ label: "Invite YES-J", href: "/contact?program=pep", tone: "primary" }]
  },
  {
    slug: "magic",
    shortTitle: "MAGIC",
    title: "MAGIC Youth",
    badge: "Student Youth Wing",
    tagline: "Men and Women Aiming at Greater Initiatives for Change",
    subheading: "A campus-based movement that forms young people as agents of conscience, compassion, and commitment.",
    icon: "wand-2",
    image: "/website/IMG_8174.JPG",
    cardBarClassName: "bg-secondary",
    overviewDescription: "Student-led campus chapters rooted in experience, reflection, involvement, and transformation.",
    megaMenuDescription: "Student youth chapters that organize leadership and social action.",
    categories: "Youth Leadership, Community Service",
    megaMenuGroup: "youth-community",
    heroActions: [{ label: "Join MAGIC", href: "/contact?program=magic", tone: "primary" }],
    sections: [
      {
        title: "What MAGIC Does",
        paragraphs: ["MAGIC is YES-J's student youth wing inside educational institutions."],
      }
    ]
  },
  {
    slug: "must",
    shortTitle: "MuST",
    title: "Multi-Skill Training Programme (MuST)",
    badge: "Vocational Training",
    tagline: "Your Hands. Your Future. Your Dignity.",
    subheading: "Free residential vocational training that converts dropouts into skilled professionals.",
    icon: "wrench",
    image: "/website/IMG_5986.JPG",
    cardBarClassName: "bg-accent",
    overviewDescription: "Residential vocational training in trades that lead to employment and self-employment.",
    megaMenuDescription: "Free residential vocational training in tailoring, ICT, driving, welding, and more.",
    categories: "Education & Skills, Employment",
    megaMenuGroup: "skill-education",
    heroActions: [{ label: "Apply for MuST", href: "/contact?program=must", tone: "primary" }],
    sections: [
      {
        title: "What MuST Offers",
        paragraphs: ["MuST equips school dropouts and unorganized youth..."],
      }
    ]
  }
];

async function main() {
  // 1. Site Settings
  await strapiPost('/api/site-setting', {
    siteName: 'YESJ',
    siteDescription: 'Youth Empowering Service - Jesuits',
    email: 'yesjinfo@gmail.com',
    phone: '+91 94403 14141',
    whatsapp: '+91 94403 14141',
    instagram: 'https://instagram.com/yesj_india',
    facebook: 'https://facebook.com/yesjindia',
    youtube: 'https://youtube.com/@yesjindia',
    linkedin: 'https://linkedin.com/company/yesj-india'
  });

  // 2. Homepage Content
  await strapiPost('/api/homepage', {
    welcomeTitle: 'Young people need more than access. They need accompaniment.',
    welcomeSubtitle: 'YES-J was born in 2016 at Andhra Loyola College, Vijayawada, as a response to the growing gap between youth potential and social exclusion.',
    welcomeDescription: 'We are not just about delivering programs. We are about walking with young people as they move from exclusion toward dignity. Our work is rooted in the Jesuit tradition of "cura personalis" - care for the whole person.',
    welcomeFocusText: 'In the heart of the Telugu states, many young people are still blocked by poverty, discrimination, weak schooling, and low confidence in spoken English. Those barriers are not small setbacks. They shape who gets to dream safely and who is told to settle.',
    impactTitle: 'The scale of the work is measurable. The dignity behind it matters more.',
    impactSubtitle: 'YESJ works across education, employability, youth formation, and direct community response. These numbers offer a grounded view of that reach.',
    storiesTitle: 'Voices of Resilience: Finding a Way Forward',
    storiesSubtitle: 'Transformation is not just a statistical goal; it\'s a personal journey of rediscovering dignity and purpose.',
    hero: [
      {
        title: 'Accompaniment that stays with young people',
        description: 'YESJ builds confidence, community, and concrete pathways for youth who are often left out of opportunity.',
        image: '/website/IMG_8159.JPG'
      },
      {
        title: 'Formation rooted in dignity and access',
        description: 'From English immersion to leadership and scholarships, each program responds to a barrier that shapes real lives.',
        image: '/website/IMG_6787.JPG'
      },
      {
        title: 'Practical support across Andhra and Telangana',
        description: 'Residential training, mentoring, volunteering, and community outreach help young people move with confidence into work and leadership.',
        image: '/website/IMG_5986.JPG'
      }
    ],
    welcomeBlocks: [
      { title: "What blocks youth", description: "Economic insecurity, social exclusion, fragile education systems, and a lack of mentors." },
      { title: "What YESJ does", description: "The organisation connects skill development, scholarships, youth formation, and community life." }
    ],
    impactCounters: [
      { label: "Lives Touched", value: 50000, suffix: "+", description: "Through direct accompaniment, training, and community programmes." },
      { label: "Events Conducted", value: 243, suffix: "+", description: "Workshops, camps, festivals, and youth formation spaces." },
      { label: "Active Programs", value: 12, description: "Education, employability, and spiritual formation." }
    ],
    transformationStories: [
       { name: "Lakshmi", age: 22, programTag: "Summer Shapes", content: "I could not speak a single English sentence. Summer Shapes did not only teach me English. It taught me to believe that I deserve success.", image: "/website/IMG_6787.JPG" }
    ]
  });

  // 3. About Page
  await strapiPost('/api/about-page', {
    heroTitle: "About YES-J",
    heroSubtitle: "A Jesuit ministry. A movement. A YES to every young person.",
    storyTitle: "Walking with young people who have been pushed aside",
    storyContent: "The Telugu-speaking states of Andhra Pradesh and Telangana are home to nearly 85 million people, most of them young...\n\nIn these spaces, young people are often pushed to the margins by structures they did not create...\n\nYES-J was born from a conviction that every young person has the capacity to live a meaningful life.",
    mission: "To accompany, serve, and advocate for young people on the margins.",
    vision: "A society where every young person stands in dignity and justice.",
    philosophyTitle: "The Power of Three YESes",
    philosophyContent: "YES to Your Potential. YES to Your Community. YES to Your Future."
  });

  // 4. Programs
  for (const prog of programs) {
    await strapiPost('/api/programs', prog);
  }

  console.log('Migration finished!');
}

main();
