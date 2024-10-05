DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('Debit', 'Credit');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "p2pTransfer" ALTER COLUMN "from_user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "p2pTransfer" ALTER COLUMN "to_user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "on_ramp_transaction" ADD COLUMN "type" "type";