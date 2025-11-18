CREATE TABLE "passkey_credentials" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"credential_id" varchar(255) NOT NULL,
	"public_key" varchar(1024) NOT NULL,
	"counter" integer DEFAULT 0 NOT NULL,
	"transports" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "passkey_credentials" ADD CONSTRAINT "passkey_credentials_user_id_registrations_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."registrations"("id") ON DELETE no action ON UPDATE no action;