import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import SectionHeader from "@/components/shared/section-header"
import NewsletterSection from "@/components/home/newsletter-section"
import { ArrowRight, Calendar, MapPin, GraduationCap, Wrench, User, Wand2, School, Star, Globe, Briefcase, Users, Handshake, Network, Heart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Our Programs - YESJ | 10+ Pathways to Transformation",
  description: "Explore YESJ programs including Summer Shapes, Multi-Skill Training, Scholar Support Programme, and more. Comprehensive programs addressing every barrier youth face.",
  openGraph: {
    title: "Our Programs - YESJ | 10+ Pathways to Transformation",
    description: "Comprehensive programs addressing every barrier youth face",
    url: "https://yesj.org/programs",
    type: "website",
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: "YESJ Programs",
    url: "https://yesj.org/programs",
  },
}

export default function ProgramsPage() {
  const programs = [
    {
      id: "summer-shapes",
      title: "SUMMER SHAPES (SS)",
      tagline: "Break the English Barrier. Unlock Your Future.",
      icon: <GraduationCap className="h-12 w-12 text-primary" />,
      description: "English is no longer just a language in India - it opens a world of opportunities. Especially for marginalized communities, English language is proved to be a weapon to break their chains and be the leaders of tomorrow. In this cyber age where English is the deciding factor to get employed, sadly many young people have no access to quality English education. Even when taught, the methodology followed has been highly ineffective, leaving youth unable to form sentences. In addition, poor soft skills bar their socialization, adaptability, and problem-solving capacities.",
      highlights: [
        "Residential immersion in English-only environment",
        "Communicative focus, not just grammar",
        "Personality development and grooming",
        "Public speaking and interview skills",
        "Zero cost with food and lodging provided"
      ],
      stats: [
        { value: "40+", label: "Batches Completed" },
        { value: "1,200+", label: "Graduates" },
        { value: "90%", label: "Confidence Boost" },
        { value: "75%", label: "Improved Employment Prospects" }
      ],
      image: "/assets/slider-01.jpg"
    },
    {
      id: "must",
      title: "MULTI-SKILL TRAINING (MuST)",
      tagline: "From Dropout to Dignified Employment",
      icon: <Wrench className="h-12 w-12 text-primary" />,
      description: "Through MuST we work to enable, equip, and enhance the capacity of dropouts and unorganized youth to undertake self-employment as well as access employment with stable salary through skill training programs. We actively collaborate with governmental, non-governmental, and corporate institutions to provide vocational skill training to help youth stand on their legs for a decent salary enough to raise a family.",
      highlights: [
        "Free training, food & lodging",
        "Small batch sizes (15 per batch)",
        "Placement support through JoY Desk",
        "Industry certifications"
      ],
      programs: [
        {
          title: "TAILORING",
          description: "3-month residential course in professional tailoring, pattern making, garment construction, and small business management. Outcome: Boutique employment or self-employment (₹12,000-20,000/month)"
        },
        {
          title: "ICT (Information & Communication Technology)",
          description: "2-month residential course in computer fundamentals, MS Office, internet skills, and digital literacy. Outcome: Office assistant, data entry, computer operator roles (₹10,000-15,000/month)"
        },
        {
          title: "DRIVING & MECHANIC",
          description: "4-month split program covering commercial driving license and vehicle maintenance/repair. Outcome: Commercial driver or mechanic positions (₹15,000-25,000/month)"
        },
        {
          title: "INDUSTRIAL WELDING",
          description: "3-month residential intensive in MIG, TIG, arc welding with industry certifications. Outcome: Industrial welder in factories, fabrication shops (₹18,000-30,000/month)"
        }
      ],
      stats: [
        { value: "85%", label: "Employment within 6 Months" },
        { value: "400%", label: "Average Income Increase" },
        { value: "100%", label: "Breaking Intergenerational Poverty" }
      ],
      image: "/assets/slider-2.jpg"
    },
    {
      id: "ssp",
      title: "SCHOLAR SUPPORT PROGRAMME (SSP)",
      tagline: "Where Brilliance Meets Opportunity",
      icon: <GraduationCap className="h-12 w-12 text-primary" />,
      description: "SSP is aimed to accompany and financially support college-going students who are academically bright and financially poor, enabling them to pursue their desired tertiary education and fulfill their professional dreams.",
      highlights: [
        "Full tuition fees coverage",
        "Books and examination fees",
        "Living expenses support",
        "Academic mentoring",
        "Career counseling",
        "Psychological support",
        "Leadership development",
        "Lifelong mentorship and career guidance"
      ],
      selection: [
        "Rigorous merit-based assessment",
        "Written tests",
        "Oral interviews",
        "Comprehensive evaluation ensuring we support the most deserving students"
      ],
      stats: [
        { value: "100%", label: "College Completion Rate" },
        { value: "4+", label: "Years of Full Scholarship Support" },
        { value: "∞", label: "Lifelong Mentorship" }
      ],
      image: "/assets/slider-3.jpg"
    },
    {
      id: "pep",
      title: "PERSONALITY ENHANCEMENT PROGRAMMES (PEP)",
      tagline: "Say YES to Leadership",
      icon: <User className="h-12 w-12 text-primary" />,
      description: "Through PEP, tailor-made orientations, courses, seminars, and workshops are conducted in the areas of soft skills, life skills, personality development, etc., to help youth gain confidence to face the complexities of life and live a life of joy, meaning, and purpose. Thousands of students are trained so far to say YES to lead.",
      highlights: [
        "Customizable one-day or multi-day workshops",
        "Conducted at schools, colleges, and parishes",
        "Food provided during programs",
        "Free of cost for institutions",
        "Comprehensive soft skills training",
        "Life skills development",
        "Personality development sessions"
      ],
      stats: [
        { value: "25+", label: "Programs Conducted" },
        { value: "5,000+", label: "Participants" },
        { value: "85%", label: "Immediate Confidence Boost" }
      ],
      image: "/assets/p1.png"
    },
    {
      id: "magic",
      title: "MAGIC YOUTH",
      tagline: "Men & Women Aiming at Greater Initiatives for Change",
      icon: <Wand2 className="h-12 w-12 text-primary" />,
      description: "The Student Youth Wing of YESJ is a formal organization established in educational institutions to provide young people with the opportunity to become individuals of conscience, competence, compassion, and commitment, and to become agents of change for themselves and their communities.",
      highlights: [
        "Student-led leadership development",
        "Campus community transformation",
        "Social awareness programs",
        "Faith formation activities",
        "Life skills and social skills training",
        "Addressing social anomalies",
        "Experience-based learning"
      ],
      image: "/assets/team-1.jpg"
    },
    {
      id: "eott",
      title: "EACH ONE – TEACH TEN (EOTT)",
      tagline: "Pay Back to Society",
      icon: <School className="h-12 w-12 text-primary" />,
      description: "YESJ's Social Enterprise aims at improving literacy and numeracy skills. We set up centres of learning and tutoring in slums, rural and suburban areas with the help of local parishes, schools, colleges, and governmental bodies. With a motif to 'pay back to society', our Ignitors create a loving atmosphere for learning, making them read, lead, and thereby succeed in life. We also help the educated young support themselves for their stationery costs.",
      highlights: [
        "Children receive free tutoring in literacy and numeracy",
        "Educated youth gain teaching experience",
        "Ignitors receive stipend for their service",
        "Community-based learning centers",
        "Loving atmosphere for learning",
        "Support for educational materials"
      ],
      image: "/assets/eachone.png"
    },
    {
      id: "joy",
      title: "JoY (JOBS FOR YOUTH) DESK",
      tagline: "Connecting Talent with Opportunity",
      icon: <Briefcase className="h-12 w-12 text-primary" />,
      description: "Having potential is not enough; reaching out to the best possible opportunities is important. Especially in the case of jobs, the opportunities are wide, but the huge population makes it difficult to get on a common channel. Thus, individuals are not well-informed about resources and available jobs. They end up settling for less-paid jobs where their skills are not utilized to their best.",
      highlights: [
        "Job matching based on skills and interests",
        "Resume building and optimization",
        "Interview preparation and mock interviews",
        "Career counseling and guidance",
        "Quarterly job fairs (JoY Melas)",
        "Direct referrals to employers",
        "Follow-up support after placement"
      ],
      image: "/assets/joylogo.png"
    },
    {
      id: "ogod",
      title: "ORGANIZING GOD ORIENTED DAYS (O GOD)",
      tagline: "Strengthening Faith, Building Relationship",
      icon: <Heart className="h-12 w-12 text-primary" />,
      description: "The days are designed to help participants build a personal relationship with God and strengthen their faith so they can become true Children of God. A variety of methods such as studying Scripture, praying and meditating, inter-religious dialogues, messages, and visits are used to enrich their faith.",
      highlights: [
        "Scripture study and reflection",
        "Prayer and meditation sessions",
        "Inter-religious dialogues",
        "Spiritual messages and teachings",
        "Faith enrichment activities",
        "Building personal relationship with God"
      ],
      image: "/assets/Ogod_logo.png"
    },
    {
      id: "yuvotsavaalu",
      title: "YESJ YUVOTSAVAALU (YY)",
      tagline: "YESJ YOUTH CAN!",
      icon: <Star className="h-12 w-12 text-primary" />,
      description: "This is an annual/biannual event of Youth Festival Celebration. Youth take active part in great numbers. They aim at strengthening the Andhra Province Youth Congress. They offer youth a comprehensive platform and foreground to gain distinctive identity to collectively 'Express, Experience, and Enrich to Construct an ever-widening collective vision' to fight against and build a vibrant and just world which says 'YESJ YOUTH CAN'.",
      highlights: [
        "Annual/biannual celebration",
        "Large-scale youth participation",
        "Cultural performances and competitions",
        "Leadership development activities",
        "Networking opportunities",
        "Collective vision building",
        "Celebration of youth achievements"
      ],
      image: "/assets/Yuvotsavaalu.png"
    },
    {
      id: "vip",
      title: "VOLUNTARY IMMERSION PROGRAMME (VIP)",
      tagline: "Challenge Yourself. Experience Culture. Cultivate Gratitude.",
      icon: <Globe className="h-12 w-12 text-primary" />,
      description: "Volunteer placements are available to individuals from both local and international communities of all sizes, from rural villages to bustling metropolises. This opportunity provides a unique challenge to test yourself, experience a different culture, and cultivate an attitude of gratitude.",
      highlights: [
        "Duration: 2 weeks to 6 months",
        "Placements: Teaching, community development, program support",
        "Accommodation and meals provided",
        "Orientation and cultural training",
        "Both local and international volunteers welcome",
        "Immersive cultural experience",
        "Certificate of service provided"
      ],
      image: "/assets/volunteer.png"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="10+ Pathways to Transformation"
          description="Comprehensive programs addressing every barrier youth face"
        />

        {/* Program Finder */}
        <section className="w-full py-8 bg-white shadow-md">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <h2 className="text-center text-lg font-light text-primary mb-6">Quick Program Finder - I'm looking for:</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <button className="px-4 py-2 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors">
                All Programs
              </button>
              <button className="px-4 py-2 border-2 border-primary/30 text-primary/70 rounded-full hover:border-primary hover:text-primary transition-colors">
                Skill Training
              </button>
              <button className="px-4 py-2 border-2 border-primary/30 text-primary/70 rounded-full hover:border-primary hover:text-primary transition-colors">
                English Learning
              </button>
              <button className="px-4 py-2 border-2 border-primary/30 text-primary/70 rounded-full hover:border-primary hover:text-primary transition-colors">
                Scholarships
              </button>
              <button className="px-4 py-2 border-2 border-primary/30 text-primary/70 rounded-full hover:border-primary hover:text-primary transition-colors">
                Leadership
              </button>
              <button className="px-4 py-2 border-2 border-primary/30 text-primary/70 rounded-full hover:border-primary hover:text-primary transition-colors">
                Volunteering
              </button>
              <button className="px-4 py-2 border-2 border-primary/30 text-primary/70 rounded-full hover:border-primary hover:text-primary transition-colors">
                Placement Support
              </button>
            </div>
          </div>
        </section>

        {/* Programs */}
        {programs.map((program, index) => (
          <section key={program.id} id={program.id} className={`w-full py-12 md:py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
            <div className="container px-4 md:px-6 max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                  {program.icon}
                </div>
                <h2 className="text-3xl font-light tracking-tighter sm:text-4xl text-primary mb-2">
                  {program.title}
                </h2>
                <p className="text-xl text-blue-600 font-light italic mb-6">
                  {program.tagline}
                </p>
              </div>

              <div className="grid gap-10 lg:grid-cols-2 items-center">
                <div>
                  <div className="space-y-4 text-muted-foreground font-extralight mb-8">
                    {program.description.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {program.highlights && (
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-primary/10 mb-8">
                      <h3 className="text-xl font-light mb-4 text-primary">
                        {program.title.includes("MuST") ? "Common Features" : "Program Highlights"}
                      </h3>
                      <ul className="grid gap-2">
                        {program.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-primary mt-1" />
                            <span className="font-extralight">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {program.programs && (
                    <>
                      <h3 className="text-2xl font-light text-center text-primary my-8">
                        Four Tailored Programs
                      </h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        {program.programs.map((prog, idx) => (
                          <div key={idx} className="p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                            <h4 className="text-lg font-light text-primary mb-2">{prog.title}</h4>
                            <p className="text-muted-foreground font-extralight text-sm">
                              {prog.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {program.selection && (
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-primary/10 mb-8">
                      <h3 className="text-xl font-light mb-4 text-primary">
                        Selection Process
                      </h3>
                      <ul className="grid gap-2">
                        {program.selection.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-primary mt-1" />
                            <span className="font-extralight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {program.stats && (
                    <div className="bg-gradient-to-r from-primary to-blue-700 p-6 rounded-lg text-white">
                      <h3 className="text-xl font-light mb-6 text-center">
                        {program.title.includes("Alumni") ? "Annual Reach" : "Impact at a Glance"}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {program.stats.map((stat, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-2xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm opacity-90">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-6">
                      Apply Now
                    </Button>
                    <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/5 px-6">
                      Download Brochure
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src={program.image}
                    alt={`${program.title} Program`}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover shadow-lg w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Alumni Network */}
        <section className="w-full py-12 md:py-20 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light tracking-tighter sm:text-4xl mb-2">
                Program Alumni Network
              </h2>
              <p className="text-xl text-white/90 font-light italic mb-2">
                "Once YESJ, Always YESJ"
              </p>
              <p className="text-lg mb-6">Join 50,000+ alumni staying connected</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
              <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <Users className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-light mb-2">Alumni Association Events</h3>
                <p className="font-extralight opacity-90">Regular meetups and reunions</p>
              </div>
              <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <Handshake className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-light mb-2">Mentorship Opportunities</h3>
                <p className="font-extralight opacity-90">Guide the next generation</p>
              </div>
              <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <Network className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-light mb-2">Career Networking</h3>
                <p className="font-extralight opacity-90">Professional connections</p>
              </div>
              <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <GraduationCap className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-light mb-2">Continuing Education</h3>
                <p className="font-extralight opacity-90">Lifelong learning support</p>
              </div>
            </div>

            <div className="text-center">
              <Button className="rounded-full bg-accent hover:bg-accent/90 text-primary px-8 py-3 text-lg">
                Join Alumni Network
              </Button>
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
