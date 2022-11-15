//const express = require("express");

const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();

// Router Controllers

//const router = express.Router();

// controller

// GET requests
router.get("/list/active", async (request, response) => {
  const notificacoes = await prisma.notificacao.findMany({
    where: {
      status: 0
    }
  });
  const responseObj = { data: notificacoes, error: false };
  return response.json(responseObj);
  //response.send({ message: "hello world! - list" });
});

// POST requests
router.post("/add", async (request, response) => {
  const dispositivoId = request.body.id;
  const notificacaoStatus = request.body.status;
  const notificacaoTipo = request.body.tipo;

  // creates the medida
  const notificacoes = await prisma.notificacao.create({
    data: {
    dispositivoId: dispositivoId,
    status: notificacaoStatus,
    tipo: notificacaoTipo,
    },
  });

  // returns the newly created medidas
  response.statusCode = 200;
  return response.send({
    message: "Notificação adicionada com sucesso!",
    data: notificacoes,
    error: false,
  });

});


router.post("/status", async (request, response) => {
  //response.send({ message: "hello world! - status" });
  const dispositivoId = request.body.id;
  const notificacaoName = request.body.nome;

  // checks if the current mac exists on the database
  const notificacaoExists = await prisma.notificacao.findUnique({
    where: {
      id: dispositivoId,
    },
  });

  // Returns an error if the medidas already exists
  if (notificacaoExists) {
    // updates the medidas by id
    const updateNotificacoes = await prisma.notificacao.update({
      where: {
        id: dispositivoId,
      },
      data: {
        notificacao: notificacaoName,
      },
    });

    response.statusCode = 200;
    return response.json({
      message: "Status editado com sucesso",
      data: updateNotificacoes,
      error: false,
    });
  }

  response.statusCode = 500;
  return response.json({ message: "Erro ao editar status", error: true });
});

module.exports = router;
