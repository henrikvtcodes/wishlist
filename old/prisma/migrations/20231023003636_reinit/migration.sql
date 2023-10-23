-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('tech', 'clothing', 'tools', 'legos');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('base', 'medium', 'high');

-- CreateEnum
CREATE TYPE "ItemVendor" AS ENUM ('Amazon', 'HomeDepot', 'Lego', 'BHPhoto', 'HarborFreight', 'Other');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "itemUrl" TEXT NOT NULL,
    "vendor" "ItemVendor" NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "category" "ItemCategory" NOT NULL,
    "type" "ItemType" NOT NULL,
    "isClaimable" BOOLEAN NOT NULL DEFAULT true,
    "isClaimed" BOOLEAN NOT NULL DEFAULT false,
    "claimedAt" TIMESTAMP(3),
    "claimerId" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referrers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ref" TEXT NOT NULL,

    CONSTRAINT "Referrers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Referrers_ref_key" ON "Referrers"("ref");

-- CreateIndex
CREATE INDEX "Referrers_ref_idx" ON "Referrers"("ref");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_claimerId_fkey" FOREIGN KEY ("claimerId") REFERENCES "Referrers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
