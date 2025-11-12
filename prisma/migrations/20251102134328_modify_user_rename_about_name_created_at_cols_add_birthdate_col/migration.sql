/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."User_phone_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "fullname" TEXT NOT NULL,
ADD COLUMN     "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
