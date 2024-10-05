DO $$ BEGIN
 CREATE TYPE "public"."typeEnum" AS ENUM('Credit', 'Debit');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "onramp" ADD VALUE 'Success';--> statement-breakpoint
ALTER TYPE "onramp" ADD VALUE 'Failed';--> statement-breakpoint
ALTER TYPE "onramp" ADD VALUE 'Processing';--> statement-breakpoint
ALTER TABLE "on_ramp_transaction" ADD COLUMN "typeEnum" "typeEnum";--> statement-breakpoint
ALTER TABLE "on_ramp_transaction" DROP COLUMN IF EXISTS "type";