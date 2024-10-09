CREATE TABLE IF NOT EXISTS "transactionHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"onramp" "onramp",
	"type" "type",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"amount" integer NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactionHistory" ADD CONSTRAINT "transactionHistory_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
