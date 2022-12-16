/*
  Warnings:

  - Added the required column `updatedAt` to the `Dispositivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Notificacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dispositivo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Notificacao" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
