"use client"

import { motion } from "framer-motion"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Bot, Monitor, Palette, Trophy, Clock, Users, MapPin, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Script from "next/script"
import { cn } from "@/lib/utils"

const registrationSchema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters"),
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 8 && Number(val) <= 20, "Age must be between 8 and 20"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Invalid email address"),
  course: z.string().min(1, "Please select a course"),
  batch: z.string().min(1, "Please select a batch"),
  paymentMode: z.enum(["full", "advance"]),
})

type RegistrationFormData = z.infer<typeof registrationSchema>

const courses = [
  {
    id: "english",
    title: "English Proficiency",
    price: 1500,
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    description: "Master spoken English and build confidence for a brighter future.",
    color: "blue"
  },
  {
    id: "ai",
    title: "AI for Kids",
    price: 2000,
    icon: <Bot className="w-6 h-6 text-secondary" />,
    description: "Explore the world of Artificial Intelligence and future-ready technology.",
    color: "purple"
  },
  {
    id: "basic-comp",
    title: "Basic Computers",
    price: 1500,
    icon: <Monitor className="w-6 h-6 text-tertiary" />,
    description: "Essential computer skills for the modern digital age.",
    color: "green"
  },
  {
    id: "graphics",
    title: "Graphic Designing",
    price: 2500,
    icon: <Palette className="w-6 h-6 text-orange-500" />,
    description: "Unleash creativity with professional graphic design tools and techniques.",
    color: "orange"
  },
  {
    id: "chess",
    title: "Chess Coaching",
    price: 2000,
    icon: <Trophy className="w-6 h-6 text-amber-500" />,
    description: "Sharpen critical thinking and strategy through professional chess coaching.",
    color: "amber"
  }
]

export default function SummerCoursesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      paymentMode: "full"
    }
  })

  const paymentMode = watch("paymentMode")
  const watchedCourseId = watch("course")
  const selectedCourse = courses.find(c => c.id === watchedCourseId)
  
  const getBaseAmount = () => {
    if (!selectedCourse) return 0
    return paymentMode === "full" ? selectedCourse.price : selectedCourse.price / 2
  }

  const getTransactionFee = (base: number) => {
    return Number((base * 0.0236).toFixed(2))
  }

  const getTotalAmount = () => {
    const base = getBaseAmount()
    const fee = getTransactionFee(base)
    return Math.round(base + fee)
  }

  const handlePayment = async (data: RegistrationFormData) => {
    const amount = getTotalAmount()
    
    try {
      const response = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          currency: "INR",
          receipt: `reg_${Date.now()}`,
          registrationData: {
            ...data,
            courseTitle: selectedCourse?.title
          }
        }),
      })

      const order = await response.json()
      if (!response.ok) throw new Error(order.error || "Failed to create order")

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_XXXXXXXXXXXXXX",
        amount: order.amount,
        currency: order.currency,
        name: "YESJ - Summer Courses",
        description: `${selectedCourse?.title} Registration (${paymentMode === "full" ? "Full" : "Advance"})`,
        order_id: order.id,
        handler: async function (response: any) {
          const regResponse = await fetch("/api/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.studentName,
              email: data.email,
              subject: `Summer Course Registration: ${selectedCourse?.title}`,
              message: `Student: ${data.studentName}\nParent: ${data.parentName}\nAge: ${data.age}\nPhone: ${data.phone}\nCourse: ${selectedCourse?.title}\nBatch: ${data.batch}\nPayment Mode: ${data.paymentMode}\nRazorpay Payment ID: ${response.razorpay_payment_id}\nRazorpay Order ID: ${response.razorpay_order_id}`
            }),
          })

          if (regResponse.ok) {
            setIsSuccess(true)
            reset()
          } else {
            alert("Payment successful but registration failed. Please contact us.")
          }
        },
        prefill: {
          name: data.studentName,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#C05C00",
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (error: any) {
      console.error("Payment error:", error)
      alert(error.message || "Something went wrong with the payment.")
    }
  }

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    await handlePayment(data)
    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background pt-32 pb-20 lg:pt-40 lg:pb-32 border-b border-border/70">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-4 py-1 text-xs font-bold uppercase tracking-widest">
                    Limited Seats Available
                  </Badge>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl lg:text-6xl font-semibold tracking-[-0.04em] text-foreground leading-[1.1]"
                >
                  Hot Summer <br />
                  <span className="text-primary italic">Cool Courses</span> are here!
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-muted-foreground leading-relaxed max-w-xl"
                >
                  Transform your summer into a journey of learning and growth. 
                  Choose from our specially curated courses designed for students aged 8-20.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  {[
                    { icon: <Clock className="w-4 h-4" />, label: "2 Batches Daily" },
                    { icon: <Users className="w-4 h-4" />, label: "40 Seats Only" },
                    { icon: <MapPin className="w-4 h-4" />, label: "AC Classrooms" }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-muted-foreground bg-card border border-border px-4 py-2 rounded-md shadow-sm">
                      <span className="text-primary">{item.icon}</span>
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="lg:w-1/2 relative"
              >
                <div className="relative aspect-[16/10] rounded-md overflow-hidden border border-border shadow-2xl bg-card">
                  <Image 
                    src="https://storage.googleapis.com/yesj/assets/summer-courses-promo.png" 
                    alt="Hot Summer Cool Courses" 
                    fill 
                    className="object-contain"
                  />
                </div>
                {/* Subtle Decorative Elements */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-24 container mx-auto px-6 border-b border-border/70">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-medium text-primary uppercase tracking-widest">Our Offerings</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Choose Your <span className="text-primary italic">Learning Path</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Discover our range of affordable, high-quality courses tailored for your success.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-md border border-border bg-card transition-colors duration-300 hover:border-primary/25"
              >
                <div className={cn(
                  "h-1 w-full",
                  course.color === 'blue' ? "bg-blue-500" : 
                  course.color === 'purple' ? "bg-purple-500" : 
                  course.color === 'green' ? "bg-tertiary" : 
                  course.color === 'orange' ? "bg-orange-500" : "bg-amber-500"
                )} />
                
                <div className="p-8 flex flex-1 flex-col">
                  <div className="w-12 h-12 rounded-md bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {course.icon}
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground mb-3">{course.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground mb-8 flex-1">{course.description}</p>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-border/50">
                    <div className="text-2xl font-black text-foreground">₹{course.price}</div>
                        <Button 
                          variant="outline" 
                          className="h-10 px-5 text-xs font-semibold hover:bg-primary hover:text-white"
                          onClick={() => {
                            const formElement = document.getElementById('registration-form');
                            formElement?.scrollIntoView({ behavior: 'smooth' });
                            setValue('course', course.id);
                          }}
                        >
                          Register Now
                        </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Registration Form */}
        <section id="registration-form" className="py-24 bg-card/30 scroll-mt-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-card rounded-md border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row">
              {/* Form Sidebar */}
              <div className="md:w-1/3 bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-3xl font-semibold tracking-[-0.03em] mb-6 leading-tight">Join the <br />Summer <br />Elite.</h3>
                  <p className="text-white/80 font-light leading-relaxed">Secure your spot in our upcoming batches and start your journey towards excellence.</p>
                </div>
                
                <div className="space-y-6 pt-12 relative z-10">
                  {[
                    { icon: <Clock className="w-5 h-5" />, title: "Timings", text: "9 AM - 10 AM / 4 PM - 5 PM" },
                    { icon: <Users className="w-5 h-5" />, title: "Capacity", text: "40 Seats per Course" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/60">{item.title}</p>
                        <p className="text-sm font-medium">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Abstract Background Shapes */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
              </div>
              
              <div className="md:w-2/3 p-8 md:p-12">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                  >
                    <div className="w-20 h-20 bg-green-50 border border-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">Payment Successful!</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">Thank you for joining. We have received your registration and payment. Our team will contact you shortly.</p>
                    </div>
                    <Button onClick={() => setIsSuccess(false)} variant="outline" className="font-semibold">Register Another Student</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="studentName" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Student Full Name</Label>
                        <Input id="studentName" {...register("studentName")} placeholder="John Doe" className="bg-background" />
                        {errors.studentName && <p className="text-xs text-red-500">{errors.studentName.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parentName" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Parent Name</Label>
                        <Input id="parentName" {...register("parentName")} placeholder="Jane Doe" className="bg-background" />
                        {errors.parentName && <p className="text-xs text-red-500">{errors.parentName.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Age (8-20)</Label>
                        <Input id="age" {...register("age")} placeholder="12" className="bg-background" />
                        {errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                        <Input id="phone" {...register("phone")} placeholder="9876543210" className="bg-background" />
                        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Address</Label>
                      <Input id="email" type="email" {...register("email")} placeholder="hello@example.com" className="bg-background" />
                      {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Course</Label>
                        <Select onValueChange={(v) => {
                          setValue("course", v);
                        }} value={watchedCourseId || undefined}>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Choose course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map(c => (
                              <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.course && <p className="text-xs text-red-500">{errors.course.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Batch</Label>
                        <Select onValueChange={(v) => setValue("batch", v)}>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Choose batch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="batch1">9 AM - 10 AM</SelectItem>
                            <SelectItem value="batch2">4 PM - 5 PM</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.batch && <p className="text-xs text-red-500">{errors.batch.message}</p>}
                      </div>
                    </div>

                    {watchedCourseId && (
                      <div className="space-y-4 p-6 bg-background rounded-md border border-border/50">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Payment Mode</Label>
                        <RadioGroup 
                          defaultValue="full" 
                          onValueChange={(v) => setValue("paymentMode", v as "full" | "advance")}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
                        >
                          <Label 
                            htmlFor="payment-full" 
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-md border transition-all cursor-pointer",
                              paymentMode === 'full' ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:bg-muted"
                            )}
                          >
                            <RadioGroupItem value="full" id="payment-full" className="sr-only" />
                            <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", paymentMode === 'full' ? "border-primary" : "border-muted-foreground")}>
                              {paymentMode === 'full' && <div className="w-2 h-2 rounded-full bg-primary" />}
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Full Fee</p>
                              <p className="text-xs text-muted-foreground">₹{selectedCourse?.price || 0}</p>
                            </div>
                          </Label>

                          <Label 
                            htmlFor="payment-advance" 
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-md border transition-all cursor-pointer",
                              paymentMode === 'advance' ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:bg-muted"
                            )}
                          >
                            <RadioGroupItem value="advance" id="payment-advance" className="sr-only" />
                            <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", paymentMode === 'advance' ? "border-primary" : "border-muted-foreground")}>
                              {paymentMode === 'advance' && <div className="w-2 h-2 rounded-full bg-primary" />}
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Advance 50%</p>
                              <p className="text-xs text-muted-foreground">₹{(selectedCourse?.price || 0) / 2}</p>
                            </div>
                          </Label>
                        </RadioGroup>
                        
                        <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Course Fee</span>
                            <span className="font-medium">₹{getBaseAmount()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1">
                              Platform Fee <span className="text-[10px]">(2.36%)</span>
                            </span>
                            <span className="font-medium">₹{getTransactionFee(getBaseAmount())}</span>
                          </div>
                          <div className="flex justify-between text-base font-bold pt-2 border-t border-border/50">
                            <span>Total Payable</span>
                            <span className="text-primary">₹{getTotalAmount()}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                        disabled={isSubmitting || !watchedCourseId}
                      >
                        {isSubmitting ? "Processing..." : `Complete Registration ${selectedCourse ? `• ₹${getTotalAmount()}` : ""}`}
                      </Button>
                      <p className="text-center text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] mt-4">
                        Secure SSL Payment Powered by Razorpay
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
