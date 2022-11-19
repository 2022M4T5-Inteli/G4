// Required for accessing the database
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

// Required for route handling
const express = require("express");
const { MetricValidator } = require("../../utils/metrics");
const { Notificacao } = require("../../utils/notificacao");

// Router Controllers

const router = express.Router();

// controller

// GET requests
router.get("/list", async (request, response) => {
  // returns all the medidas that are in the database
  const medidas = await prisma.medidas.findMany();
  const responseObj = { data: medidas, error: false };
  return response.json(responseObj);
});

router.get("/list/dispositivo/:id", async (request, response) => {
  // returns the medidas from a dispositivo that are in the database
  const idDispositivo = Number(request.params.id);
  const medidas = await prisma.medidas.findMany({
    where: {
      dispositivoId: idDispositivo,
    },
  });
  const responseObj = { data: medidas, error: false };
  return response.json(responseObj);
});

// POST requests
router.post("/add", async (request, response) => {
  const dispositivoId = Number(request.body.dispositivoId);
  const medidasTemperatura = request.body.temperatura;
  const medidasUmidade = request.body.umidade;
  const medidasDatetime = request.body.datetime;

  // creates the medida
  const medidas = await prisma.medidas.create({
    data: {
      dispositivoId: dispositivoId,
      temperatura: medidasTemperatura,
      umidade: medidasUmidade,
      datetime: medidasDatetime,
    },
  });

  const validator = new MetricValidator(medidasTemperatura, medidasUmidade);
  const statusList = validator.verifyRules();

  statusList.forEach(async (statusCode) => {
    const notificacao = new Notificacao(dispositivoId, medidas.id, statusCode);
    const createNotification = await notificacao.createNotification();
    if (createNotification == true) {
      console.log("Notificação Gerada!!");
    }
  });

  // returns the newly created medidas
  response.statusCode = 200;
  return response.send({
    message: "Medidas Adicionadas com sucesso!",
    data: medidas,
    error: false,
  });
});

module.exports = router;
