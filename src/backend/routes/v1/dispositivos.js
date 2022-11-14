// Required for accessing the database
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

// Required for route handling
const express = require("express");
const router = express.Router();

// All Routes here (there should only be controllers) ----------------------------------------------------------------------------------------

// [GET] requests

router.get("/list", async (request, response) => {
  // returns all the dispositivos that are in the database
  const dispositivos = await prisma.dispositivo.findMany();
  const responseObj = { data: dispositivos, error: false };
  return response.json(responseObj);
});

// [POST] requests

router.post("/add", async (request, response) => {
  const dispositivoMac = request.body.mac;
  const dispositivoName = request.body.nome || dispositivoMac;
  // checks if the current mac exists on the database
  const dispositivoExists = await prisma.dispositivo.findUnique({
    where: {
      mac: dispositivoMac,
    },
  });

  // Returns an error if the dispositivo already exists
  if (dispositivoExists) {
    response.statusCode = 500;
    return response.json({
      message: "O Dispositivo já existe",
      data: {},
      error: true,
    });
  }

  // creates the dispositivo
  const dispositivo = await prisma.dispositivo.create({
    data: {
      estufa: dispositivoName,
      mac: dispositivoMac,
    },
  });

  // returns the newly created dispositivo
  response.statusCode = 200;
  return response.send({
    message: "Dispositivo Adicionado com sucesso!",
    data: dispositivo,
    error: false,
  });
});

router.post("/edit", async (request, response) => {
  const dispositivoId = request.body.id;
  const dispositivoName = request.body.nome;

  // checks if the current mac exists on the database
  const dispositivoExists = await prisma.dispositivo.findUnique({
    where: {
      id: dispositivoId,
    },
  });

  // Returns an error if the dispositivo already exists
  if (dispositivoExists) {
    // updates the dispositivo by id
    const updateDispositivo = await prisma.dispositivo.update({
      where: {
        id: dispositivoId,
      },
      data: {
        estufa: dispositivoName,
      },
    });

    response.statusCode = 200;
    return response.json({
      message: "Dispositivo editado com sucesso",
      data: updateDispositivo,
      error: false,
    });
  }

  response.statusCode = 500;
  return response.json({ message: "Erro ao editar dispositivo", error: true });
});

module.exports = router;
