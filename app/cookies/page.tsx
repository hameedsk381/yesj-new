import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"

export const metadata = {
  title: "Cookie Policy - APTSAICUF",
  description: "How APTSAICUF uses cookies and similar technologies",
}

export default function CookiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Cookie Policy"
          description="How we use cookies and similar technologies"
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="space-y-8 text-muted-foreground font-extralight">
              <div>
                <h2 className="text-2xl font-light text-maroon mb-4">What Are Cookies?</h2>
                <p className="mb-4">
                  Cookies are small text files that are placed on your device when you visit our website. They help us 
                  provide you with a better experience by remembering your preferences and understanding how you use our site.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-maroon mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-light text-primary mb-2">1. Essential Cookies</h3>
                    <p className="mb-2">
                      These cookies are necessary for the website to function properly. They enable basic features like 
                      page navigation and access to secure areas.
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Session management</li>
                      <li>Security features</li>
                      <li>Load balancing</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-light text-primary mb-2">2. Functional Cookies</h3>
                    <p className="mb-2">
                      These cookies allow the website to remember choices you make and provide enhanced features.
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Language preferences</li>
                      <li>Theme settings (light/dark mode)</li>
                      <li>Form data retention</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-light text-primary mb-2">3. Analytics Cookies</h3>
                    <p className="mb-2">
                      These cookies help us understand how visitors interact with our website by collecting and reporting 
                      information anonymously.
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Page visits and navigation patterns</li>
                      <li>Time spent on pages</li>
                      <li>Error messages encountered</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-light text-primary mb-2">4. Marketing Cookies</h3>
                    <p className="mb-2">
                      These cookies track your online activity to help us deliver more relevant content and advertisements.
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Social media integration</li>
                      <li>Targeted content delivery</li>
                      <li>Event promotion tracking</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-light text-maroon mb-4">Third-Party Cookies</h2>
                <p className="mb-4">
                  We may use third-party services that set their own cookies, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Google Analytics for website statistics</li>
                  <li>Social media platforms for sharing features</li>
                  <li>Video hosting services for embedded content</li>
                  <li>Payment processors for secure transactions</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-maroon mb-4">Managing Cookies</h2>
                <p className="mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Browser Settings:</strong> Most browsers allow you to refuse or accept cookies through their settings
                  </li>
                  <li>
                    <strong>Cookie Preferences:</strong> Use our cookie consent banner to manage your preferences
                  </li>
                  <li>
                    <strong>Opt-Out Tools:</strong> Use third-party opt-out tools for analytics and advertising cookies
                  </li>
                </ul>
                <p className="mt-4">
                  Please note that blocking certain cookies may affect the functionality of our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-maroon mb-4">Browser-Specific Instructions</h2>
                <p className="mb-4">
                  To manage cookies in your browser:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-maroon mb-4">Updates to This Policy</h2>
                <p className="mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in technology or legal requirements. 
                  Please check this page periodically for updates.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-maroon mb-4">Contact Us</h2>
                <p className="mb-4">
                  If you have questions about our use of cookies, please contact:
                </p>
                <p className="mb-2">Email: privacy@aptsaicuf.org</p>
                <p className="mb-2">Phone: +91 XXX XXX XXXX</p>
              </div>

              <div>
                <p className="text-sm italic">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
