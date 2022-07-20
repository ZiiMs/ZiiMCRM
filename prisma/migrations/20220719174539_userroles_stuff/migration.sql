-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userRolesId" INT8;

-- AlterTable
ALTER TABLE "UserRoles" ADD COLUMN     "userId" STRING;
