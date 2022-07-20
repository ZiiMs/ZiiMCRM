/*
  Warnings:

  - You are about to drop the column `userRolesId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userRolesId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userRolesId";

-- CreateTable
CREATE TABLE "_UserToUserRoles" (
    "A" STRING NOT NULL,
    "B" INT8 NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToUserRoles_AB_unique" ON "_UserToUserRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToUserRoles_B_index" ON "_UserToUserRoles"("B");

-- AddForeignKey
ALTER TABLE "_UserToUserRoles" ADD CONSTRAINT "_UserToUserRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUserRoles" ADD CONSTRAINT "_UserToUserRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "UserRoles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
