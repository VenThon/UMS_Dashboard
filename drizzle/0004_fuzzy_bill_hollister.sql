ALTER TABLE "daily_reports" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "daily_reports" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "daily_reports" ALTER COLUMN "reviewed_by_id" SET DATA TYPE uuid;