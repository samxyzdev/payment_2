DO $$ BEGIN
 CREATE TYPE "public"."onramp" AS ENUM('success', 'failed', 'processing');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "balance" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" integer,
	"locked" integer,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "on_ramp_transaction" (
	"id" serial PRIMARY KEY NOT NULL,
	"onramp" "onramp",
	"token" varchar(256),
	"provider" varchar(256),
	"amount" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "p2pTransfer" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"from_user_id" integer,
	"to_user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "balance" ADD CONSTRAINT "balance_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "p2pTransfer" ADD CONSTRAINT "p2pTransfer_from_user_id_user_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "p2pTransfer" ADD CONSTRAINT "p2pTransfer_to_user_id_user_id_fk" FOREIGN KEY ("to_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "user" USING btree ("email");