DROP INDEX "request_leave_approval_level_unique_idx";--> statement-breakpoint
ALTER TABLE "request_leave" ADD COLUMN "revision" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "request_leave_approval" ADD COLUMN "revision" integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "request_leave_approval_level_revision_unique_idx" ON "request_leave_approval" USING btree ("request_leave_id","revision","approval_level");