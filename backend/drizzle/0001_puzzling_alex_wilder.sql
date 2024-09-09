ALTER TABLE "balance" ADD COLUMN "createdAt" timestamp (6) with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "on_ramp_transaction" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "createdAt" timestamp (6) with time zone DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "on_ramp_transaction" ADD CONSTRAINT "on_ramp_transaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
