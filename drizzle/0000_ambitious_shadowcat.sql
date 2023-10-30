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
CREATE TABLE IF NOT EXISTS "wishlist_account" (
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
	"session_state" text,
	CONSTRAINT wishlist_account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wishlist_Item" (
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
CREATE TABLE IF NOT EXISTS "wishlist_Referrers" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"ref" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wishlist_session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wishlist_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wishlist_verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT wishlist_verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Referrers_ref_key" ON "wishlist_Referrers" ("ref");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Referrers_ref_idx" ON "wishlist_Referrers" ("ref");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishlist_account" ADD CONSTRAINT "wishlist_account_userId_wishlist_user_id_fk" FOREIGN KEY ("userId") REFERENCES "wishlist_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishlist_Item" ADD CONSTRAINT "wishlist_Item_claimerId_wishlist_Referrers_id_fk" FOREIGN KEY ("claimerId") REFERENCES "wishlist_Referrers"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishlist_session" ADD CONSTRAINT "wishlist_session_userId_wishlist_user_id_fk" FOREIGN KEY ("userId") REFERENCES "wishlist_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
