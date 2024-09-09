ALTER TABLE "balance" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "balance" ALTER COLUMN "createdAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "on_ramp_transaction" ALTER COLUMN "token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "on_ramp_transaction" ALTER COLUMN "provider" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "on_ramp_transaction" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "p2pTransfer" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "createdAt" SET NOT NULL;