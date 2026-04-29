import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"

export const metadata = {
  title: "Refund and Cancellation Policy - YESJ",
  description: "Refund and cancellation policy for YESJ programs and events",
}

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Refund and Cancellation Policy"
          description="Information regarding refunds and cancellations for our programs"
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="space-y-6 text-muted-foreground font-extralight">
              <div>
                <h2 className="text-2xl font-light text-primary mb-4">1. General Policy</h2>
                <p className="mb-4">
                  YESJ strives to provide high-quality educational programs and events. Due to the nature of our organizational planning, our general policy on refunds and cancellations is outlined below.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">2. Program Cancellations</h2>
                <p className="mb-4">
                  Registration fees for programs (including Summer Courses) are generally **non-refundable**. This is because seats are limited, and once a registration is processed, it prevents other students from joining.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">3. Exceptions</h2>
                <p className="mb-4">
                  Refunds may be considered in the following exceptional circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>If YESJ cancels the program or event entirely.</li>
                  <li>In cases of proven medical emergencies or extreme personal hardship (subject to review).</li>
                  <li>If a duplicate payment was made accidentally.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">4. Refund Process</h2>
                <p className="mb-4">
                  If a refund is approved, the amount will be credited back to the original payment source (bank account, card, or UPI) within **7-10 working days**.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">5. Modifications</h2>
                <p className="mb-4">
                  YESJ reserves the right to modify or reschedule programs. If a program is rescheduled and the participant cannot attend the new dates, a credit for a future program may be offered at the organization's discretion.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-light text-primary mb-4">6. Contact Us</h2>
                <p className="mb-4">
                  For any refund-related queries, please reach out to us:
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
