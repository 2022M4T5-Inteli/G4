// Para acessar o banco de dados
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

// Para o tratamento de rota
const express = require("express");
const { MetricValidator } = require("../../utils/metrics");
const { Notificacao } = require("../../utils/notificacao");

// Controladores da rota

const router = express.Router();

// criando os controladores

// requesição GET para a lista de medidas
router.get("/list", async (request, response) => {
  // retorna todas as medidas que estão no banco de dados
  const medidas = await prisma.medidas.findMany();
  const responseObj = { data: medidas, error: false };
  return response.json(responseObj);
});

router.get("/list/dispositivo/:id", async (request, response) => {
  // retorna as medidas de um dispositivo escolhido pelo id(:id) que estão no banco de dados
  const idDispositivo = Number(request.params.id);
  const medidas = await prisma.medidas.findMany({
    where: {
      dispositivoId: idDispositivo,
    },
  });
  const responseObj = { data: medidas, error: false };
  return response.json(responseObj);
});

// requesição POST para adicionar medidas
router.post("/add", async (request, response) => {
  const dispositivoId = Number(request.body.dispositivoId);
  const medidasTemperatura = request.body.temperatura;
  const medidasUmidade = request.body.umidade;
  const medidasDatetime = request.body.datetime;
  try {
    // cria a medida
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

    for (const statusCode of statusList) {
      const notificacao = new Notificacao(
        dispositivoId,
        medidas.id,
        statusCode
      );
      const createNotification = await notificacao.processNotification();
      if (createNotification == true) {
        console.log("Notificação Gerada!!");
      }
    }

    // retorna a medida criada
    response.statusCode = 200;
    return response.send({
      message: "Medidas Adicionadas com sucesso!",
      data: medidas,
      error: false,
    });
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    return response.send({
      message: `Erro ao adicionar medida! ${error.message}`,
      data: [],
      error: true,
    });
  }
});

module.exports = router;
