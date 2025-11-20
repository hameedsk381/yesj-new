import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"

export const metadata = {
  title: "Terms of Service - APTSAICUF",
  description: "Terms and conditions for using APTSAICUF services",
}

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Terms of Service"
          description="Terms and conditions governing your use of our services"
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="space-y-8 text-muted-foreground font-extralight">
              <div>
                <h2 className="text-2xl font-light text-primary mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using the APTSAICUF website and services, you agree to be bound by these Terms of Service. 
                  If you do not agree with any part of these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">2. Membership</h2>
                <p className="mb-4">
                  Membership in APTSAICUF is subject to the following conditions:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Applicants must be university or college students in Andhra Pradesh or Telangana</li>
                  <li>All information provided in applications must be accurate and truthful</li>
                  <li>Members must uphold the values and mission of AICUF</li>
                  <li>Membership may be revoked for violations of organizational policies</li>
                  <li>Leadership positions are open to second-year students and above</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">3. Events and Programs</h2>
                <p className="mb-4">
                  Participation in APTSAICUF events and programs is governed by:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Registration fees are non-refundable unless the event is cancelled by APTSAICUF</li>
                  <li>Participants must adhere to event rules and code of conduct</li>
                  <li>APTSAICUF reserves the right to cancel or modify events due to unforeseen circumstances</li>
                  <li>Participants are responsible for their own travel and accommodation arrangements unless specified</li>
                  <li>Photography and videography may occur at events for promotional purposes</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">4. Code of Conduct</h2>
                <p className="mb-4">
                  All members and participants are expected to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Treat all individuals with respect and dignity</li>
                  <li>Promote social justice and equality</li>
                  <li>Refrain from discriminatory or harmful behavior</li>
                  <li>Maintain confidentiality when required</li>
                  <li>Represent APTSAICUF positively in all activities</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">5. Intellectual Property</h2>
                <p className="mb-4">
                  All content on this website, including text, images, logos, and materials, is the property of APTSAICUF 
                  and protected by copyright laws. Unauthorized use or reproduction is prohibited.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">6. Limitation of Liability</h2>
                <p className="mb-4">
                  APTSAICUF is not liable for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal injury or loss during events (participants attend at their own risk)</li>
                  <li>Technical issues or website downtime</li>
                  <li>Third-party content or external links</li>
                  <li>Loss of data or unauthorized access to user accounts</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">7. Privacy</h2>
                <p className="mb-4">
                  Your use of our services is also governed by our Privacy Policy. Please review it to understand how we 
                  collect and use your information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">8. Modifications</h2>
                <p className="mb-4">
                  APTSAICUF reserves the right to modify these Terms of Service at any time. Changes will be effective 
                  immediately upon posting to the website. Continued use of our services constitutes acceptance of modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">9. Governing Law</h2>
                <p className="mb-4">
                  These Terms of Service are governed by the laws of India. Any disputes will be subject to the jurisdiction 
                  of courts in Hyderabad, Telangana.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">10. Contact Information</h2>
                <p className="mb-4">
                  For questions about these Terms of Service, please contact:
                </p>
                <p className="mb-2">Email: info@yesj.org</p>
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
