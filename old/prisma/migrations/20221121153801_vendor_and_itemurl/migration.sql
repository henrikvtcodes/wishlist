/*
  Warnings:

  - Added the required column `itemUrl` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendor` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemVendor" AS ENUM ('Amazon', 'HomeDepot', 'Lego', 'BHPhoto');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "itemUrl" STRING NOT NULL;
ALTER TABLE "Item" ADD COLUMN     "vendor" "ItemVendor" NOT NULL;
