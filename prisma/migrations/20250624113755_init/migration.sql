-- CreateEnum
CREATE TYPE "AcessLevel" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "acessLevel" "AcessLevel" NOT NULL DEFAULT 'USER';
