import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  email: text("email").unique().notNull(),
  hashedPassword: text("hashed_password").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  isSuperuser: integer("is_superuser", { mode: "boolean" }).default(false),
});

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email"),
  subject: text("subject"),
  message: text("message"),
  status: text("status").default("unread"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  date: integer("date", { mode: "timestamp" }),
  location: text("location"),
  fee: text("fee"),
  deadline: integer("deadline", { mode: "timestamp" }),
  imagePath: text("image_path"),
  type: text("type"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const galleries = sqliteTable("galleries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  imagePath: text("image_path").notNull(),
  category: text("category"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const newsletters = sqliteTable("newsletters", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").unique().notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const nominations = sqliteTable("nominations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  unitName: text("unit_name").notNull(),
  contestingFor: text("contesting_for").notNull(),
  educationQualification: text("education_qualification"),
  nocFilePath: text("noc_file_path"),
  status: text("status").default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const registrations = sqliteTable("registrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  applicationType: text("application_type").notNull(),
  name: text("name").notNull(),
  gender: text("gender"),
  registrationId: text("registration_id"),
  registrationNo: text("registration_no"),
  course: text("course"),
  age: integer("age"),
  instagramId: text("instagram_id"),
  mobileNo: text("mobile_no"),
  whatsappNo: text("whatsapp_no"),
  emailId: text("email_id").notNull(),
  religion: text("religion"),
  address: text("address"),
  skills: text("skills", { mode: "json" }),
  otherSkills: text("other_skills"),
  eventExperience: text("event_experience"),
  justSocietyDefinition: text("just_society_definition"),
  communicationExample: text("communication_example"),
  aicufVision: text("aicuf_vision"),
  leadershipPosition: text("leadership_position"),
  hashedPassword: text("hashed_password"),
  declaration: integer("declaration", { mode: "boolean" }).default(false),
  additionalMessage: text("additional_message"),
  status: text("status").default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const stories = sqliteTable("stories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  author: text("author"),
  category: text("category").default("General"),
  imagePath: text("image_path"),
  featured: integer("featured", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const teamMembers = sqliteTable("team_members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio"),
  imagePath: text("image_path"),
  twitterUrl: text("twitter_url"),
  linkedinUrl: text("linkedin_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});
