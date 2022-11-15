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

// POST requests
router.post("/add", async (request, response) => {
  const dispositivoId = request.body.id;
  const medidasTemperatura = request.body.temperatura;
  const medidasUmidade = request.body.umidade;
  const medidasDatetime = request.body.datetime;

  // creates the medida
  const medidas = await prisma.medidas.create({
    data: {
    dispositivoId: dispositivoId,
    temperatura: medidasTemperatura,
    umidade: medidasUmidade,
    datetime: Datetime,

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

router.post("/edit", async (request, response) => {
  const dispositivoId = request.body.id;
  const medidasName = request.body.nome;

  // checks if the current mac exists on the database
  const medidasExists = await prisma.medidas.findUnique({
    where: {
      id: dispositivoId,
    },
  });

  // Returns an error if the medidas already exists
  if (medidasExists) {
    // updates the medidas by id
    const updateMedidas = await prisma.medidas.update({
      where: {
        id: dispositivoId,
      },
      data: {
        estufa: medidasName,
      },
    });

    response.statusCode = 200;
    return response.json({
      message: "Medidas editada com sucesso",
      data: updateMedidas,
      error: false,
    });
  }

  response.statusCode = 500;
  return response.json({ message: "Erro ao editar medidas", error: true });
});

module.exports = router;
