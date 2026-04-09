import { mysqlTable, serial, varchar, text, int, boolean, timestamp, json } from "drizzle-orm/mysql-core";
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
