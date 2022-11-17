// Required for accessing the database
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

// Required for route handling
const express = require("express");

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

router.get(
  "/graph/:idDispositivo/:rangeInMinutes",
  async (request, response) => {
    // returns all th e medidas that are in the database
    const dispositivoId = Number(request.params.idDispositivo);
    const minuteRange = Number(request.params.rangeInMinutes);
    const labels = [];
    const temperatureMedians = [];
    const humidityMedians = [];

    let maxCount = 0;

    const medidas = await prisma.medidas.findMany({
      take: minuteRange,
      where: {
        dispositivoId: dispositivoId,
      },
    });

    maxCount = Math.ceil(medidas.length / 5);

    // push the time labels
    for (let i = 1; i < maxCount + 1; i++) {
      labels.push(i * 5);
    }

    let auxCount = 0;
    let currentMedian = 0;
    for (let i = 0; i < medidas.length; i++) {
      
    }

    const responseObj = { data: medidas, error: false };
    return response.json(responseObj);
  }
);

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

  // returns the newly created medidas
  response.statusCode = 200;
  return response.send({
    message: "Medidas Adicionadas com sucesso!",
    data: medidas,
    error: false,
  });
});

module.exports = router;
