/*
  Warnings:

  - The `status` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Application" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'SAVED';

-- AlterTable
ALTER TABLE "public"."Resume" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropEnum
DROP TYPE "public"."ApplicationStatus";
