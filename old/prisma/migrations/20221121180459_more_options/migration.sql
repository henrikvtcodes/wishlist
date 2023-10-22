-- AlterEnum
ALTER TYPE "ItemVendor" ADD VALUE 'Other';

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "claimedAt" DROP NOT NULL;
