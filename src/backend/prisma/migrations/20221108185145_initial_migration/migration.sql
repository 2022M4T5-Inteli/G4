-- CreateTable
CREATE TABLE "Dispositivo" (
    "id" SERIAL NOT NULL,
    "mac" TEXT NOT NULL,
    "estufa" TEXT NOT NULL,

    CONSTRAINT "Dispositivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medidas" (
    "id" SERIAL NOT NULL,
    "dispositivoId" INTEGER NOT NULL,
    "temperatura" DOUBLE PRECISION NOT NULL,
    "umidade" DOUBLE PRECISION NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" SERIAL NOT NULL,
    "dispositivoId" INTEGER NOT NULL,
    "gatilhoId" INTEGER NOT NULL,
    "tipo" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Medidas" ADD CONSTRAINT "Medidas_dispositivoId_fkey" FOREIGN KEY ("dispositivoId") REFERENCES "Dispositivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_dispositivoId_fkey" FOREIGN KEY ("dispositivoId") REFERENCES "Dispositivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_gatilhoId_fkey" FOREIGN KEY ("gatilhoId") REFERENCES "Medidas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
