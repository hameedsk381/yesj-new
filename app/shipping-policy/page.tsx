import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import { siteConfig } from "@/lib/config"

export const metadata = {
  title: "Shipping and Delivery Policy - YESJ",
  description: "Information regarding the delivery of services and programs by YESJ",
  alternates: { canonical: `${siteConfig.url}/shipping-policy` },
}

export default function ShippingPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Shipping and Delivery Policy"
          description="How we deliver our programs and services to you"
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="space-y-6 text-muted-foreground font-extralight">
              <div>
                <h2 className="text-2xl font-light text-primary mb-4">1. Delivery of Services</h2>
                <p className="mb-4">
                  YESJ primarily provides educational services, training programs, and social service events. As these are service-based offerings, there is no physical shipping of products.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">2. Program Access</h2>
                <p className="mb-4">
                  Upon successful registration and payment for a program (e.g., Summer Courses):
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You will receive a confirmation email within 24 hours of successful payment.</li>
                  <li>Course details, including venue (if offline) or access links (if online), will be shared at least 3 days before the program start date.</li>
                  <li>Course materials (if any) will be delivered digitally or provided physically at the venue during the program sessions.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">3. Timelines</h2>
                <p className="mb-4">
                  The delivery timeline for our programs is dictated by the specific dates mentioned in the program schedule on our website. 
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">4. Digital Delivery</h2>
                <p className="mb-4">
                  For online workshops or digital certificates, these will be delivered via the email address provided during registration. Please ensure your email information is accurate.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">5. Contact Us</h2>
                <p className="mb-4">
                  If you have not received your registration confirmation within 48 hours, please contact us:
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
