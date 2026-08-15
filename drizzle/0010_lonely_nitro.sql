CREATE TABLE "password_reset_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"request_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX "password_reset_requests_email_idx";--> statement-breakpoint
DROP INDEX "password_reset_requests_user_id_idx";--> statement-breakpoint
ALTER TABLE "password_reset_requests" ADD COLUMN "attempts" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "password_reset_requests" ADD COLUMN "expires_at" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "password_reset_requests" ADD COLUMN "resend_available_at" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_request_id_password_reset_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."password_reset_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_reset_requests" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "password_reset_requests" DROP COLUMN "otp_expires_at";--> statement-breakpoint
ALTER TABLE "password_reset_requests" DROP COLUMN "failed_attempts";--> statement-breakpoint
ALTER TABLE "password_reset_requests" DROP COLUMN "resend_count";--> statement-breakpoint
ALTER TABLE "password_reset_requests" DROP COLUMN "last_sent_at";--> statement-breakpoint
ALTER TABLE "password_reset_requests" DROP COLUMN "reset_token_hash";--> statement-breakpoint
ALTER TABLE "password_reset_requests" DROP COLUMN "reset_token_expires_at";