/*
  Warnings:

  - A unique constraint covering the columns `[mac]` on the table `Dispositivo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dispositivo_mac_key" ON "Dispositivo"("mac");
