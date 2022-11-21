/*
  Warnings:

  - Added the required column `claimedAt` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "claimedAt" TIMESTAMP(3) NOT NULL;
ALTER TABLE "Item" ADD COLUMN     "claimerId" STRING;
ALTER TABLE "Item" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
ALTER TABLE "Item" ADD COLUMN     "imgUrl" STRING NOT NULL;
ALTER TABLE "Item" ADD COLUMN     "isClaimed" BOOL NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_claimerId_fkey" FOREIGN KEY ("claimerId") REFERENCES "Referrers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
