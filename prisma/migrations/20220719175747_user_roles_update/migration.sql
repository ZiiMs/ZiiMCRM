/*
  Warnings:

  - You are about to drop the column `userRolesId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserRoles` table. All the data in the column will be lost.
  - You are about to drop the `_UserToUserRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserToUserRoles" DROP CONSTRAINT "_UserToUserRoles_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToUserRoles" DROP CONSTRAINT "_UserToUserRoles_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userRolesId";

-- AlterTable
ALTER TABLE "UserRoles" DROP COLUMN "userId";

-- DropTable
DROP TABLE "_UserToUserRoles";

-- CreateTable
CREATE TABLE "UserOnRoles" (
    "userRolesId" INT8 NOT NULL,
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOnRoles_userRolesId_userId_key" ON "UserOnRoles"("userRolesId", "userId");

-- AddForeignKey
ALTER TABLE "UserOnRoles" ADD CONSTRAINT "UserOnRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnRoles" ADD CONSTRAINT "UserOnRoles_userRolesId_fkey" FOREIGN KEY ("userRolesId") REFERENCES "UserRoles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
