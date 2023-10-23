-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "ItemCategory" AS ENUM('legos', 'tools', 'clothing', 'tech');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ItemType" AS ENUM('high', 'medium', 'base');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ItemVendor" AS ENUM('Other', 'HarborFreight', 'BHPhoto', 'Lego', 'HomeDepot', 'Amazon');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VerificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp(3),
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Session" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionToken" text NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Referrers" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"ref" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Item" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"imgUrl" text NOT NULL,
	"itemUrl" text NOT NULL,
	"vendor" "ItemVendor" NOT NULL,
	"priceCents" integer NOT NULL,
	"createdAt" timestamp(3) NOT NULL,
	"category" "ItemCategory" NOT NULL,
	"type" "ItemType" NOT NULL,
	"isClaimable" boolean DEFAULT true NOT NULL,
	"isClaimed" boolean DEFAULT false NOT NULL,
	"claimedAt" timestamp(3),
	"claimerId" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken" ("token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "VerificationToken" ("identifier","token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account" ("provider","providerAccountId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session" ("sessionToken");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Referrers_ref_key" ON "Referrers" ("ref");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Referrers_ref_idx" ON "Referrers" ("ref");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Item" ADD CONSTRAINT "Item_claimerId_fkey" FOREIGN KEY ("claimerId") REFERENCES "Referrers"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/