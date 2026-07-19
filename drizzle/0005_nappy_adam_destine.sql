CREATE TABLE "request_leave" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"leave_type" text DEFAULT 'annual_leave' NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"duration_type" text DEFAULT 'full_day' NOT NULL,
	"reason" text NOT NULL,
	"status" varchar(30) DEFAULT 'pending_first_approval' NOT NULL,
	"approved_by_id" uuid,
	"approver_comment" text,
	"reviewed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "request_leave_date_range_check" CHECK ("request_leave"."end_date" >= "request_leave"."start_date")
);
--> statement-breakpoint
CREATE TABLE "request_leave_approval" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_leave_id" uuid NOT NULL,
	"reviewer_id" uuid NOT NULL,
	"approval_level" integer NOT NULL,
	"status" varchar(20) NOT NULL,
	"comment" text,
	"reviewed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "daily_report_reviews" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "daily_report_reviews" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "daily_report_reviews" ALTER COLUMN "daily_report_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "daily_report_reviews" ALTER COLUMN "reviewer_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "request_leave" ADD CONSTRAINT "request_leave_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request_leave" ADD CONSTRAINT "request_leave_approved_by_id_users_id_fk" FOREIGN KEY ("approved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request_leave_approval" ADD CONSTRAINT "request_leave_approval_request_leave_id_request_leave_id_fk" FOREIGN KEY ("request_leave_id") REFERENCES "public"."request_leave"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request_leave_approval" ADD CONSTRAINT "request_leave_approval_reviewer_id_users_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "request_leave_user_id_idx" ON "request_leave" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "request_leave_status_idx" ON "request_leave" USING btree ("status");--> statement-breakpoint
CREATE INDEX "request_leave_start_date_idx" ON "request_leave" USING btree ("start_date");--> statement-breakpoint
CREATE INDEX "request_leave_approval_request_idx" ON "request_leave_approval" USING btree ("request_leave_id");--> statement-breakpoint
CREATE INDEX "request_leave_approval_reviewer_idx" ON "request_leave_approval" USING btree ("reviewer_id");--> statement-breakpoint
CREATE UNIQUE INDEX "request_leave_approval_level_unique_idx" ON "request_leave_approval" USING btree ("request_leave_id","approval_level");

