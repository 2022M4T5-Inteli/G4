//const express = require("express");

// Para acessar o banco de dados
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();

// Controlador de rotas

//const router = express.Router();

// controladores:

// requesição GET  para notificações
router.get("/list/active", async (request, response) => {
  const notificacoes = await prisma.notificacao.findMany({
    where: {
      status: 0,
    },
    include: {
      dispositivo: {
        select: {
          estufa: true,
        },
      },
      gatilho: {
        select: {
          temperatura: true,
          umidade: true,
        },
      },
    },
  });
  const responseObj = { data: notificacoes, error: false };
  return response.json(responseObj);
  //response.send({ message: "hello world! - list" });
});

// requesição POST para adicionar uma notificação
router.post("/add", async (request, response) => {
  //definindo as constantes pelo banco de dados (CONFERIR)
  const notificacaoDispositivoId = request.body.id;
  const notificacaoStatus = request.body.status;
  const notificacaoTipo = request.body.tipo;
  const notificacaoGatilho = request.body.gatilho;

  // criando a notificação
  const notificacoes = await prisma.notificacao.create({
    data: {
      dispositivoId: notificacaoDispositivoId,
      status: notificacaoStatus,
      gatilhoId: notificacaoGatilho,
      tipo: notificacaoTipo,
    },
  });

  // retorna a nova notificação com uma mensagem informando que a notificação foi adicionada com sucesso
  response.statusCode = 200;
  return response.send({
    message: "Notificação adicionada com sucesso!",
    data: notificacoes,
    error: false,
  });
});
//requesição POST para atualizar o status das notificações (VER SE é isso mesmo)
router.post("/status", async (request, response) => {
  //response.send({ message: "hello world! - status" });
  const notificacaoId = request.body.id;
  const notificacaoName = request.body.status;

  // confere se a notificação ja existe
  const notificacaoExists = await prisma.notificacao.findUnique({
    where: {
      id: notificacaoId,
    },
  });

  if (notificacaoExists) {
    // atualiza a notificação pelo id dela
    const updateNotificacoes = await prisma.notificacao.update({
      where: {
        id: notificacaoId,
      },
      data: {
        status: notificacaoName,
      },
    });
    //caso a notificação seja alterada com sucesso
    response.statusCode = 200;
    return response.json({
      message: "Status editado com sucesso",
      data: updateNotificacoes,
      error: false,
    });
  }
  //caso não consiga alterar o status da notificação uma mensagem aparecerá.
  response.statusCode = 500;
  return response.json({ message: "Erro ao editar status", error: true });
});

module.exports = router;
