/*
  Warnings:

  - A unique constraint covering the columns `[boardId,userId]` on the table `UserRoles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserRoles_boardId_userId_key" ON "UserRoles"("boardId", "userId");
