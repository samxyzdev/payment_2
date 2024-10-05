ALTER TABLE "on_ramp_transaction" ALTER COLUMN "type" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "on_ramp_transaction" ALTER COLUMN "type" SET NOT NULL;