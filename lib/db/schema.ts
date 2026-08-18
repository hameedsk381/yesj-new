import { mysqlTable, serial, varchar, text, int, boolean, timestamp, json, decimal, date } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
  isActive: boolean("is_active").default(true),
  isSuperuser: boolean("is_superuser").default(false),
});

export const contacts = mysqlTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message"),
  status: varchar("status", { length: 50 }).default("unread"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = mysqlTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  date: timestamp("date"),
  location: varchar("location", { length: 255 }),
  fee: varchar("fee", { length: 100 }),
  deadline: timestamp("deadline"),
  imagePath: varchar("image_path", { length: 512 }),
  type: varchar("type", { length: 100 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const galleries = mysqlTable("galleries", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imagePath: varchar("image_path", { length: 512 }).notNull(),
  category: varchar("category", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletters = mysqlTable("newsletters", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const nominations = mysqlTable("nominations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  unitName: varchar("unit_name", { length: 255 }).notNull(),
  contestingFor: varchar("contesting_for", { length: 255 }).notNull(),
  educationQualification: text("education_qualification"),
  nocFilePath: varchar("noc_file_path", { length: 512 }),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const registrations = mysqlTable("registrations", {
  id: serial("id").primaryKey(),
  applicationType: varchar("application_type", { length: 100 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  gender: varchar("gender", { length: 20 }),
  registrationId: varchar("registration_id", { length: 100 }),
  registrationNo: varchar("registration_no", { length: 100 }),
  course: varchar("course", { length: 100 }),
  age: int("age"),
  instagramId: varchar("instagram_id", { length: 100 }),
  mobileNo: varchar("mobile_no", { length: 20 }),
  whatsappNo: varchar("whatsapp_no", { length: 20 }),
  emailId: varchar("email_id", { length: 255 }).notNull(),
  religion: varchar("religion", { length: 50 }),
  address: text("address"),
  skills: json("skills"),
  otherSkills: text("other_skills"),
  eventExperience: text("event_experience"),
  justSocietyDefinition: text("just_society_definition"),
  communicationExample: text("communication_example"),
  aicufVision: text("aicuf_vision"),
  leadershipPosition: text("leadership_position"),
  hashedPassword: varchar("hashed_password", { length: 255 }),
  declaration: boolean("declaration").default(false),
  additionalMessage: text("additional_message"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const stories = mysqlTable("stories", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  author: varchar("author", { length: 100 }),
  category: varchar("category", { length: 100 }).default("General"),
  imagePath: varchar("image_path", { length: 512 }),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const teamMembers = mysqlTable("team_members", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  bio: text("bio"),
  imagePath: varchar("image_path", { length: 512 }),
  twitterUrl: varchar("twitter_url", { length: 512 }),
  linkedinUrl: varchar("linkedin_url", { length: 512 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const siteSettings = mysqlTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).unique().notNull(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const echoes = mysqlTable("echoes", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  edition: varchar("edition", { length: 100 }), // e.g. "Vol 1, Issue 2"
  releaseDate: timestamp("release_date"),
  filePath: varchar("file_path", { length: 512 }).notNull(), // PDF URL
  thumbnailPath: varchar("thumbnail_path", { length: 512 }), // Preview image
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const programs = mysqlTable("programs", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  shortTitle: varchar("short_title", { length: 100 }),
  badge: varchar("badge", { length: 255 }),
  tagline: varchar("tagline", { length: 512 }),
  imagePath: varchar("image_path", { length: 512 }),
  logoPath: varchar("logo_path", { length: 512 }),
  icon: varchar("icon", { length: 100 }),
  overviewDescription: text("overview_description"),
  order: int("order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const courses = mysqlTable("courses", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  shortDescription: varchar("short_description", { length: 500 }),
  imagePath: varchar("image_path", { length: 512 }),
  price: int("price"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  maxStudents: int("max_students"),
  isActive: boolean("is_active").default(true),
  registrationOpen: boolean("registration_open").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const courseRegistrations = mysqlTable("course_registrations", {
  id: serial("id").primaryKey(),
  courseId: int("course_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  fields: json("fields"),
  paymentMode: varchar("payment_mode", { length: 20 }),
  amount: int("amount"),
  razorpayOrderId: varchar("razorpay_order_id", { length: 255 }).unique(),
  razorpayPaymentId: varchar("razorpay_payment_id", { length: 255 }),
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
  status: varchar("status", { length: 50 }).default("confirmed"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const summerCourseRegistrations = mysqlTable("summer_course_registrations", {
  id: serial("id").primaryKey(),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  parentName: varchar("parent_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  age: int("age").notNull(),
  courseId: varchar("course_id", { length: 100 }).notNull(),
  courseTitle: varchar("course_title", { length: 255 }).notNull(),
  batch: varchar("batch", { length: 50 }).notNull(),
  paymentMode: varchar("payment_mode", { length: 20 }).notNull(), // 'full' or 'advance'
  amount: int("amount").notNull(),
  razorpayOrderId: varchar("razorpay_order_id", { length: 255 }).unique(),
  razorpayPaymentId: varchar("razorpay_payment_id", { length: 255 }),
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"), // 'pending', 'paid', 'failed'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const donors = mysqlTable("donors", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 30 }),
  address: text("address"),
  donorType: varchar("donor_type", { length: 50 }).default("individual"), // individual, corporate, trust, foundation
  panNumber: varchar("pan_number", { length: 30 }),
  source: varchar("source", { length: 100 }),
  notes: text("notes"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const donations = mysqlTable("donations", {
  id: serial("id").primaryKey(),
  donorId: int("donor_id").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("INR"),
  donationDate: date("donation_date").notNull(),
  mode: varchar("mode", { length: 50 }).default("bank"), // cash, bank, upi, cheque, online
  paymentReference: varchar("payment_reference", { length: 255 }),
  fund: varchar("fund", { length: 255 }).default("General"),
  receiptNumber: varchar("receipt_number", { length: 100 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const budgets = mysqlTable("budgets", {
  id: serial("id").primaryKey(),
  fiscalYear: varchar("fiscal_year", { length: 20 }).notNull(),
  fund: varchar("fund", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  allocated: decimal("allocated", { precision: 12, scale: 2 }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const expenses = mysqlTable("expenses", {
  id: serial("id").primaryKey(),
  budgetId: int("budget_id"),
  fund: varchar("fund", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  expenseDate: date("expense_date").notNull(),
  paidTo: varchar("paid_to", { length: 255 }),
  paymentMode: varchar("payment_mode", { length: 50 }),
  billNumber: varchar("bill_number", { length: 100 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const volunteers = mysqlTable("volunteers", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 30 }),
  address: text("address"),
  gender: varchar("gender", { length: 20 }),
  age: int("age"),
  occupation: varchar("occupation", { length: 255 }),
  skills: json("skills"),
  availability: varchar("availability", { length: 100 }),
  status: varchar("status", { length: 50 }).default("active"), // active, inactive
  joinedAt: date("joined_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const volunteerActivities = mysqlTable("volunteer_activities", {
  id: serial("id").primaryKey(),
  volunteerId: int("volunteer_id").notNull(),
  program: varchar("program", { length: 255 }),
  activityType: varchar("activity_type", { length: 100 }),
  description: varchar("description", { length: 255 }),
  hours: decimal("hours", { precision: 6, scale: 1 }).notNull(),
  activityDate: date("activity_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assets = mysqlTable("assets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  serialNumber: varchar("serial_number", { length: 255 }),
  condition: varchar("condition", { length: 50 }).default("good"), // new, good, fair, poor
  status: varchar("status", { length: 50 }).default("in-use"), // in-use, in-stock, maintenance, disposed
  location: varchar("location", { length: 255 }),
  assignedTo: varchar("assigned_to", { length: 255 }),
  purchaseDate: date("purchase_date"),
  purchaseCost: decimal("purchase_cost", { precision: 12, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const inventoryItems = mysqlTable("inventory_items", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }),
  quantity: decimal("quantity", { precision: 12, scale: 2 }).default("0"),
  unit: varchar("unit", { length: 50 }).default("pieces"),
  minQuantity: decimal("min_quantity", { precision: 12, scale: 2 }).default("0"),
  unitCost: decimal("unit_cost", { precision: 12, scale: 2 }),
  supplier: varchar("supplier", { length: 255 }),
  location: varchar("location", { length: 255 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const staff = mysqlTable("staff", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 30 }),
  role: varchar("role", { length: 255 }),
  department: varchar("department", { length: 255 }),
  designation: varchar("designation", { length: 255 }),
  joinDate: date("join_date"),
  employmentType: varchar("employment_type", { length: 50 }).default("full-time"), // full-time, part-time, contract, volunteer
  salary: decimal("salary", { precision: 12, scale: 2 }),
  bankAccount: varchar("bank_account", { length: 255 }),
  bankName: varchar("bank_name", { length: 255 }),
  ifscCode: varchar("ifsc_code", { length: 20 }),
  address: text("address"),
  status: varchar("status", { length: 50 }).default("active"), // active, on-leave, resigned
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const attendance = mysqlTable("attendance", {
  id: serial("id").primaryKey(),
  staffId: int("staff_id").notNull(),
  date: date("date").notNull(),
  status: varchar("status", { length: 50 }).default("present"), // present, absent, half-day, leave
  checkIn: varchar("check_in", { length: 20 }),
  checkOut: varchar("check_out", { length: 20 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leaveRequests = mysqlTable("leave_requests", {
  id: serial("id").primaryKey(),
  staffId: int("staff_id").notNull(),
  leaveType: varchar("leave_type", { length: 50 }).default("casual"), // casual, sick, annual, unpaid, other
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  reason: text("reason"),
  status: varchar("status", { length: 50 }).default("pending"), // pending, approved, rejected
  approvedBy: varchar("approved_by", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const beneficiaries = mysqlTable("beneficiaries", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  gender: varchar("gender", { length: 20 }),
  dateOfBirth: date("date_of_birth"),
  age: int("age"),
  phone: varchar("phone", { length: 30 }),
  email: varchar("email", { length: 255 }),
  address: text("address"),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  category: varchar("category", { length: 100 }), // student, child, elder, woman, differently-abled, family, youth
  program: varchar("program", { length: 255 }), // YESJ program they're enrolled in
  status: varchar("status", { length: 50 }).default("active"), // active, inactive, graduated, closed
  enrolledDate: date("enrolled_date"),
  guardianName: varchar("guardian_name", { length: 255 }),
  guardianPhone: varchar("guardian_phone", { length: 30 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const beneficiaryServices = mysqlTable("beneficiary_services", {
  id: serial("id").primaryKey(),
  beneficiaryId: int("beneficiary_id").notNull(),
  serviceType: varchar("service_type", { length: 100 }), // education, healthcare, nutrition, skill training, financial aid, material support, counseling, other
  description: varchar("description", { length: 255 }),
  amount: decimal("amount", { precision: 12, scale: 2 }),
  serviceDate: date("service_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

