import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import SectionHeader from "@/components/shared/section-header"
import NewsletterSection from "@/components/home/newsletter-section"
import Image from "next/image"

export const metadata = {
  title: "About Us - YESJ | A Jesuit Mission Born from Radical Love",
  description: "Learn about the history and mission of Youth Empowering Service Jesuits. A movement of hope and transformation since 2015, empowering 50,000+ youth across Telugu states.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="A Jesuit Mission Born from Radical Love"
          description="Reimagining youth empowerment in the Telugu heartland since 2015"
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <SectionHeader
                  title="Our Story"
                  description="In the Telugu-speaking states of Andhra Pradesh and Telangana, home to nearly 85 million people, countless young lives encounter harsh realities daily—poverty, lack of education, unemployment, casteism, gender discrimination, and social inequality."
                  align="left"
                  subtitle="Who We Are"
                />
                <div className="space-y-4 text-muted-foreground font-extralight">
                  <p>
                    The poverty is not self-incurred. These sections of society have been pushed to the margins. Youth dropping out of school at tender ages to work as child labor, teenagers abandoning high school to toil as cheap labor where their blood and sweat are exploited, girl children married young instead of educated—these are the intersectional injustices we confront daily.
                  </p>
                  <p>
                    <strong className="text-primary">But YESJ is convinced to spread a YES in the lives of youth by giving a helping hand to dream and realize their dreams.</strong>
                  </p>
                  <p>
                    Since 2015, we've been a beacon of light and a ray of hope for those who are last, lost, and least, those who lack resources and guidance for a better life. We walk alongside young people, regardless of their educational, social, religious, and economic backgrounds, unleashing their potential to lead meaningful and fulfilling lives.
                  </p>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <Image
                  src="/assets/YESJ_Logo_Black.png"
                  alt="YESJ Logo"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-light tracking-tighter sm:text-4xl mb-6">
                The YES Philosophy
              </h2>
              <p className="text-xl mb-8">
                We believe that instilling hope and courage in young people and creating a support system will empower them to shout to the world:
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold text-accent mb-2">YES</div>
                  <p className="font-light">I have Dreams.</p>
                </div>
                <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold text-accent mb-2">YES</div>
                  <p className="font-light">I am capable of fulfilling my Dreams.</p>
                </div>
                <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold text-accent mb-2">YES</div>
                  <p className="font-light">I Can and I Will be the Dream I want to be if only I am given an opportunity.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-blue-50">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Our Theological Foundation"
              description="More Than a Program - A Sacred Calling"
              subtitle="Ignatian Spirituality meets Radical Social Transformation"
            />
            <div className="grid gap-10 lg:grid-cols-2 mt-12">
              <div>
                <h3 className="text-2xl font-light mb-6 text-primary">Ignatian Pillars</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                    <h4 className="text-xl font-light text-primary mb-2">Contemplatio Ad Amorem (Contemplation in Action)</h4>
                    <p className="text-muted-foreground font-extralight">
                      Finding God in the broken dreams of marginalized youth and responding with radical solidarity.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                    <h4 className="text-xl font-light text-primary mb-2">Imago Dei (Image of God)</h4>
                    <p className="text-muted-foreground font-extralight">
                      Every young person is created in God's image, carrying infinite dignity and worth.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                    <h4 className="text-xl font-light text-primary mb-2">Cura Personalis (Care for the Whole Person)</h4>
                    <p className="text-muted-foreground font-extralight">
                      Holistic formation: intellectual, emotional, social, spiritual, physical.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                    <h4 className="text-xl font-light text-primary mb-2">Magis (The More)</h4>
                    <p className="text-muted-foreground font-extralight">
                      Always seeking greater justice, deeper transformation, not just incremental change.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                    <h4 className="text-xl font-light text-primary mb-2">Men and Women for Others</h4>
                    <p className="text-muted-foreground font-extralight">
                      Forming leaders who serve, not just succeed.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-6 text-primary">Our Commitment</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                    <p className="text-muted-foreground font-extralight mb-4">
                      We see poverty not as personal failure but as structural sin demanding prophetic response.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                    <p className="text-muted-foreground font-extralight mb-4">
                      We approach youth not as beneficiaries but as protagonists of their own liberation.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                    <p className="text-muted-foreground font-extralight mb-4">
                      We don't offer charity; we accompany transformation through long-term relationships.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                    <p className="text-muted-foreground font-extralight mb-4">
                      We believe empowerment is kingdom-building—establishing justice and peace on earth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Universal Apostolic Preferences"
              description="Aligned with Global Jesuit Mission"
              subtitle="Our Global Connection"
            />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-primary/5 rounded-lg border border-primary/10">
                <div className="text-4xl font-bold text-primary mb-2">01</div>
                <h3 className="text-xl font-light text-primary mb-3">Showing the Way to God</h3>
                <p className="text-muted-foreground font-extralight">
                  Our O GOD programs and faith-justice integration help youth build personal relationships with God.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-primary/5 rounded-lg border border-primary/10">
                <div className="text-4xl font-bold text-primary mb-2">02</div>
                <h3 className="text-xl font-light text-primary mb-3">Walking with the Excluded</h3>
                <p className="text-muted-foreground font-extralight">
                  Preferential option for English-excluded rural youth and marginalized communities.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-primary/5 rounded-lg border border-primary/10">
                <div className="text-4xl font-bold text-primary mb-2">03</div>
                <h3 className="text-xl font-light text-primary mb-3">Journeying with Youth</h3>
                <p className="text-muted-foreground font-extralight">
                  Youth as protagonists through PEP & MAGIC Youth programs.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-primary/5 rounded-lg border border-primary/10">
                <div className="text-4xl font-bold text-primary mb-2">04</div>
                <h3 className="text-xl font-light text-primary mb-3">Caring for Our Common Home</h3>
                <p className="text-muted-foreground font-extralight">
                  Each One-Teach Ten model fostering community ownership and sustainable development.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-light tracking-tighter sm:text-4xl mb-6">
                The YESJ Way: Our 5 Ps Framework
              </h2>
              <p className="text-xl mb-12">
                How we transform lives and build futures
              </p>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-4xl mb-4">PURPOSE</div>
                  <h3 className="text-xl font-light mb-3">Building a Just World</h3>
                  <p className="font-extralight">
                    Our purpose is to assist in building a just world by transforming the lives of young people. We educate and encourage them to understand and analyze the socio-economic, cultural, and political aspects of society, stimulating their conscience to bring social commitment to build the Kingdom of God in India and the globalized world.
                  </p>
                </div>
                <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-4xl mb-4">PROCESS</div>
                  <h3 className="text-xl font-light mb-3">Transformation Through Integration</h3>
                  <p className="font-extralight">
                    With the right resources, support, and training, people can be enabled to solve their own problems. Rather than random and impulsive approaches, we follow a long-term systematic approach with spiritual, social, psychological, contextual, intellectual, and creative integration.
                  </p>
                </div>
                <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-4xl mb-4">PROGRAMMES</div>
                  <h3 className="text-xl font-light mb-3">Comprehensive Empowerment</h3>
                  <p className="font-extralight">
                    Through our 10+ comprehensive programmes, we empower young people attending schools and colleges, as well as those who have dropped out. From English communication training to vocational skills, from personality development to spiritual formation, from job placement to leadership development.
                  </p>
                </div>
                <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-4xl mb-4">PARTNERSHIPS</div>
                  <h3 className="text-xl font-light mb-3">Together We Do More</h3>
                  <p className="font-extralight">
                    "Alone we can do so little; together we can do so much" – Helen Keller. True to this belief, we sincerely welcome opportunities to foster a culture of collaboration, cooperation, and partnership with all like-minded individuals, organizations, business houses, and governments.
                  </p>
                </div>
                <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-4xl mb-4">PERSEVERANCE</div>
                  <h3 className="text-xl font-light mb-3">Never-Ending Commitment</h3>
                  <p className="font-extralight">
                    Empowering youth is a never-ending job. There is always another young person to begin our journey with. We are deeply convinced that this mission of empowering youth is tough and challenging. We are aware that persevering this effort well, through the strain of youth ministry, is a serious responsibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-blue-50">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Who We Serve"
              description="Our Preferential Option for Youth"
              subtitle="Our Focus Areas"
            />
            <div className="grid gap-8 md:grid-cols-2 mt-12">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                <h3 className="text-xl font-light mb-4 text-primary">Target Demographics</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground font-extralight">Geography: Telugu-speaking states (AP & Telangana)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground font-extralight">Age Group: 15-45 years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground font-extralight">Focus: Rural (60%), Semi-urban (25%), Urban slums (15%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground font-extralight">Economic: Below poverty line, marginalized communities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground font-extralight">Inclusivity: All castes, religions, backgrounds</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border border-primary/10">
                <h3 className="text-xl font-light mb-4 text-primary">Special Focus</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground font-extralight">SC/ST communities (40% of participants)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground font-extralight">First-generation learners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground font-extralight">Female youth (45% participation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground font-extralight">School dropouts seeking second chances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground font-extralight">Academically brilliant but financially poor students</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-light tracking-tighter sm:text-4xl text-primary mb-6">
                The Harvest Is Plentiful. Will You Labor With Us?
              </h2>
              <div className="grid gap-6 md:grid-cols-3 mt-12">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-primary/5 rounded-lg border border-primary/10">
                  <div className="text-4xl text-primary mb-4">🎓</div>
                  <h3 className="text-xl font-light mb-3 text-primary">For Youth</h3>
                  <p className="text-muted-foreground font-extralight mb-4">Start your transformation journey</p>
                  <a href="/programs" className="inline-block px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                    Explore Programs
                  </a>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-primary/5 rounded-lg border border-primary/10">
                  <div className="text-4xl text-primary mb-4">🤝</div>
                  <h3 className="text-xl font-light mb-3 text-primary">For Volunteers</h3>
                  <p className="text-muted-foreground font-extralight mb-4">Give your time and talent</p>
                  <a href="/volunteer" className="inline-block px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                    Join Us
                  </a>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-primary/5 rounded-lg border border-primary/10">
                  <div className="text-4xl text-primary mb-4">❤️</div>
                  <h3 className="text-xl font-light mb-3 text-primary">For Donors</h3>
                  <p className="text-muted-foreground font-extralight mb-4">Invest in futures</p>
                  <a href="/donate" className="inline-block px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                    Donate Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}