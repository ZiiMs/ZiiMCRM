/*
  Warnings:

  - You are about to drop the `UserOnRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnRoles" DROP CONSTRAINT "UserOnRoles_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnRoles" DROP CONSTRAINT "UserOnRoles_userRolesId_fkey";

-- AlterTable
ALTER TABLE "UserRoles" ADD COLUMN     "userId" STRING;

-- DropTable
DROP TABLE "UserOnRoles";

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
