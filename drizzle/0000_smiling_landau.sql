CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(500) NOT NULL,
	"message" text NOT NULL,
	"status" varchar(20) DEFAULT 'unread' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletters" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"subscribed_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "newsletters_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "nominations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"unit_name" varchar(255) NOT NULL,
	"contesting_for" varchar(100) NOT NULL,
	"education_qualification" text NOT NULL,
	"noc_file_path" varchar(500) NOT NULL,
	"noc_file_name" varchar(255) NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "registrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"registration_id" varchar(255) NOT NULL,
	"application_type" varchar(50) NOT NULL,
	"name" varchar(255) NOT NULL,
	"gender" varchar(20) NOT NULL,
	"registration_no" varchar(100) NOT NULL,
	"course" varchar(255) NOT NULL,
	"age" varchar(10) NOT NULL,
	"instagram_id" varchar(100),
	"mobile_no" varchar(20) NOT NULL,
	"whatsapp_no" varchar(20) NOT NULL,
	"email_id" varchar(255) NOT NULL,
	"religion" varchar(100) NOT NULL,
	"address" text NOT NULL,
	"skills" text,
	"other_skills" text,
	"event_experience" text,
	"just_society_definition" text,
	"communication_example" text,
	"aicuf_vision" text,
	"leadership_position" text,
	"additional_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "registrations_registration_id_unique" UNIQUE("registration_id")
);
