/*
  Warnings:

  - Made the column `email` on table `tbcontato` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tbcontato" ALTER COLUMN "email" SET NOT NULL;
