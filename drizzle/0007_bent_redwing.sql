CREATE TABLE "general_request" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"request_type" varchar(50) NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"reason" text NOT NULL,
	"expected_benefit" text NOT NULL,
	"priority" varchar(20) NOT NULL,
	"required_date" date,
	"estimated_cost" numeric(15, 2),
	"currency" varchar(3),
	"attachments" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"status" varchar(40) DEFAULT 'pending_first_approval' NOT NULL,
	"revision" integer DEFAULT 1 NOT NULL,
	"reviewed_by_id" uuid,
	"reviewer_comment" text,
	"reviewed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "general_request_approval" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"general_request_id" uuid NOT NULL,
	"reviewer_id" uuid NOT NULL,
	"approval_level" integer NOT NULL,
	"revision" integer NOT NULL,
	"status" varchar(20) NOT NULL,
	"comment" text,
	"reviewed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "general_request" ADD CONSTRAINT "general_request_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "general_request" ADD CONSTRAINT "general_request_reviewed_by_id_users_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "general_request_approval" ADD CONSTRAINT "general_request_approval_general_request_id_general_request_id_fk" FOREIGN KEY ("general_request_id") REFERENCES "public"."general_request"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "general_request_approval" ADD CONSTRAINT "general_request_approval_reviewer_id_users_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "general_request_user_idx" ON "general_request" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "general_request_status_idx" ON "general_request" USING btree ("status");--> statement-breakpoint
CREATE INDEX "general_request_priority_idx" ON "general_request" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "general_request_created_at_idx" ON "general_request" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "general_request_approval_request_idx" ON "general_request_approval" USING btree ("general_request_id");--> statement-breakpoint
CREATE INDEX "general_request_approval_reviewer_idx" ON "general_request_approval" USING btree ("reviewer_id");--> statement-breakpoint
CREATE UNIQUE INDEX "general_request_approval_request_revision_level_unique" ON "general_request_approval" USING btree ("general_request_id","revision","approval_level");