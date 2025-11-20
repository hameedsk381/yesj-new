import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"

export const metadata = {
  title: "Privacy Policy - APTSAICUF",
  description: "Privacy Policy for Andhra-Telangana All India Catholic University Federation",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Privacy Policy"
          description="How we collect, use, and protect your personal information"
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="space-y-8 text-muted-foreground font-extralight">
              <div>
                <h2 className="text-2xl font-light text-primary mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                  When you register for APTSAICUF membership or events, we collect personal information including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Full name, age, and gender</li>
                  <li>Contact information (email, mobile number, WhatsApp number)</li>
                  <li>Educational details (registration number, course)</li>
                  <li>Address information</li>
                  <li>Religion and social media handles (optional)</li>
                  <li>Skills and experience information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Processing membership and leadership applications</li>
                  <li>Communicating about events, programs, and activities</li>
                  <li>Sending newsletters and updates</li>
                  <li>Organizing leadership training and social service programs</li>
                  <li>Maintaining records of our members and participants</li>
                  <li>Improving our services and programs</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">3. Data Protection</h2>
                <p className="mb-4">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Secure data storage and transmission</li>
                  <li>Limited access to authorized personnel only</li>
                  <li>Regular security audits and updates</li>
                  <li>Compliance with applicable data protection laws</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">4. Information Sharing</h2>
                <p className="mb-4">
                  We do not sell or rent your personal information to third parties. We may share information with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>National AICUF organization for coordination purposes</li>
                  <li>Event organizers for program logistics</li>
                  <li>Service providers who assist with our operations (under strict confidentiality agreements)</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">5. Your Rights</h2>
                <p className="mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Request corrections to inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">6. Cookies and Tracking</h2>
                <p className="mb-4">
                  Our website uses cookies and similar technologies to enhance user experience. See our Cookie Policy for more details.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">7. Contact Us</h2>
                <p className="mb-4">
                  If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at:
                </p>
                <p className="mb-2">Email: privacy@yesj.org</p>
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
