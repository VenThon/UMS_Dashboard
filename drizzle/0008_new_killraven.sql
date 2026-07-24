CREATE TYPE "public"."attendance_action" AS ENUM('CHECK_IN', 'CHECK_OUT', 'UPDATED', 'STATUS_CHANGED');--> statement-breakpoint
CREATE TYPE "public"."attendance_status" AS ENUM('PRESENT', 'LATE', 'ABSENT', 'ON_LEAVE', 'HALF_DAY', 'WORK_FROM_HOME');--> statement-breakpoint
CREATE TABLE "attendance_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"attendance_id" uuid NOT NULL,
	"action" "attendance_action" NOT NULL,
	"performed_by_id" uuid NOT NULL,
	"previous_data" jsonb,
	"new_data" jsonb,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attendances" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"attendance_date" date NOT NULL,
	"check_in_at" timestamp with time zone,
	"check_out_at" timestamp with time zone,
	"status" "attendance_status" DEFAULT 'PRESENT' NOT NULL,
	"late_minutes" integer DEFAULT 0 NOT NULL,
	"worked_minutes" integer,
	"note" varchar(1000),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attendance_history" ADD CONSTRAINT "attendance_history_attendance_id_attendances_id_fk" FOREIGN KEY ("attendance_id") REFERENCES "public"."attendances"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_history" ADD CONSTRAINT "attendance_history_performed_by_id_users_id_fk" FOREIGN KEY ("performed_by_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "attendance_history_attendance_id_idx" ON "attendance_history" USING btree ("attendance_id");--> statement-breakpoint
CREATE INDEX "attendance_history_performed_by_idx" ON "attendance_history" USING btree ("performed_by_id");--> statement-breakpoint
CREATE UNIQUE INDEX "attendances_user_date_unique" ON "attendances" USING btree ("user_id","attendance_date");--> statement-breakpoint
CREATE INDEX "attendances_user_id_idx" ON "attendances" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "attendances_date_idx" ON "attendances" USING btree ("attendance_date");--> statement-breakpoint
CREATE INDEX "attendances_status_idx" ON "attendances" USING btree ("status");