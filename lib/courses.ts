// Server-authoritative summer course catalog. Prices here are the source of
// truth — never trust client-supplied amounts when creating Razorpay orders.

export type PaymentMode = "full" | "advance"

export interface SummerCourse {
  id: string
  title: string
  price: number // INR
}

export const SUMMER_COURSES: readonly SummerCourse[] = [
  { id: "english", title: "English Proficiency", price: 1500 },
  { id: "ai", title: "AI for Kids", price: 1800 },
  { id: "basic-comp", title: "Basic Computers", price: 1500 },
  { id: "graphics", title: "Graphic Designing", price: 2000 },
  { id: "chess", title: "Chess Coaching", price: 1500 },
] as const

const TRANSACTION_FEE_RATE = 0.0236

export function getCourse(id: string): SummerCourse | undefined {
  return SUMMER_COURSES.find((c) => c.id === id)
}

export function computeServerAmount(
  courseId: string,
  paymentMode: PaymentMode
): { course: SummerCourse; amount: number } | null {
  const course = getCourse(courseId)
  if (!course) return null
  const base = paymentMode === "full" ? course.price : course.price / 2
  const fee = Number((base * TRANSACTION_FEE_RATE).toFixed(2))
  const amount = Math.round(base + fee)
  return { course, amount }
}
