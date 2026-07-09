CREATE TABLE "daily_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"project_name" varchar(150) NOT NULL,
	"report_date" date NOT NULL,
	"previous_tasks" text NOT NULL,
	"completed_tasks" text NOT NULL,
	"in_progress_tasks" text NOT NULL,
	"blockers" text,
	"tomorrow_plan" text NOT NULL,
	"remarks" text,
	"status" varchar(30) DEFAULT 'pending' NOT NULL,
	"reviewed_by_id" integer,
	"reviewer_comment" text,
	"reviewed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "daily_report_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"daily_report_id" integer NOT NULL,
	"reviewer_id" integer NOT NULL,
	"status" varchar(20) NOT NULL,
	"comment" text,
	"reviewed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_reviewed_by_id_users_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_report_reviews" ADD CONSTRAINT "daily_report_reviews_daily_report_id_daily_reports_id_fk" FOREIGN KEY ("daily_report_id") REFERENCES "public"."daily_reports"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_report_reviews" ADD CONSTRAINT "daily_report_reviews_reviewer_id_users_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "daily_reports_user_id_idx" ON "daily_reports" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "daily_reports_report_date_idx" ON "daily_reports" USING btree ("report_date");--> statement-breakpoint
CREATE INDEX "daily_reports_status_idx" ON "daily_reports" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "daily_reports_user_date_unique" ON "daily_reports" USING btree ("user_id","report_date");--> statement-breakpoint
CREATE INDEX "daily_report_reviews_report_id_idx" ON "daily_report_reviews" USING btree ("daily_report_id");--> statement-breakpoint
CREATE INDEX "daily_report_reviews_reviewer_id_idx" ON "daily_report_reviews" USING btree ("reviewer_id");--> statement-breakpoint
CREATE INDEX "daily_report_reviews_status_idx" ON "daily_report_reviews" USING btree ("status");