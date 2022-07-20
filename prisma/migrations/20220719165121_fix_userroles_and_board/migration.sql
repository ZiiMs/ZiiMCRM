/*
  Warnings:

  - You are about to drop the column `userId` on the `UserRoles` table. All the data in the column will be lost.
  - Added the required column `type` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "type" STRING NOT NULL;

-- AlterTable
ALTER TABLE "UserRoles" DROP COLUMN "userId";
