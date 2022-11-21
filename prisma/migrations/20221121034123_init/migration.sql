-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('tech', 'clothing', 'tools', 'legos');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('base', 'medium', 'high');

-- CreateTable
CREATE TABLE "Item" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "priceCents" INT4 NOT NULL,
    "category" "ItemCategory" NOT NULL,
    "type" "ItemType" NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
