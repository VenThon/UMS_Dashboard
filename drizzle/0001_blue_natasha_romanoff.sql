ALTER TABLE "users" ADD COLUMN "team" text DEFAULT 'development' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone_number" varchar(20);