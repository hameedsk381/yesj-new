import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import RegistrationForm from "@/components/registration/registration-form"

export const metadata = {
  title: "Register - APTSAICUF",
  description:
    "Apply for membership or leadership position with Andhra-Telangana All India Catholic University Federation.",
}

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Join APTSAICUF"
          description="Apply for membership or leadership position and be part of our movement for social change."
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <RegistrationForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
