// Para acessar o banco de dados
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

// Para tratamento da rota
const express = require("express");
const router = express.Router();

// todas as rotas se encontram aqui:All Routes here (there should only be controllers) ----------------------------------------------------------------------------------------

// requesição [GET] para a lista de dispositivos que estão no banco de dados

router.get("/list", async (request, response) => {
  // retorna todos os dispositivos que estão no banco de dados
  const dispositivos = await prisma.dispositivo.findMany();
  const responseObj = { data: dispositivos, error: false };
  return response.json(responseObj);
});

router.get("/list/detailed", async (request, response) => {
  // retorna os dispositivos que estão no banco de dados com detalhes.
  const dispositivos = await prisma.dispositivo.findMany({
    include: {
      Medidas: {
        orderBy: {
          id: "desc",
        },
        take: 1,
      },
    },
  });
  const responseObj = { data: dispositivos, error: false };
  return response.json(responseObj);
});

//requesição [POST] para adicionar um novo dispositivo no banco de dados

router.post("/add", async (request, response) => {
  const dispositivoMac = request.body.mac;
  const dispositivoName = request.body.nome || dispositivoMac;
  // confere se o dispositivo ja existe no banco de dados
  const dispositivoExists = await prisma.dispositivo.findUnique({
    where: {
      mac: dispositivoMac,
    },
  });

  //caso o dispositivo ja exista retorna uma mensagem falando que o dispositivo já existe
  if (dispositivoExists) {
    response.statusCode = 200;
    return response.json({
      message: "O Dispositivo já existe. Retornando dados cadastrados.",
      data: dispositivoExists,
      error: false,
    });
  }

  // caso não exista o dispositivo é criado
  const dispositivo = await prisma.dispositivo.create({
    data: {
      estufa: dispositivoName,
      mac: dispositivoMac,
    },
  });

  // e retorna uma mensagem falando que o dispositivo foi adicionado com sucesso
  response.statusCode = 200;
  return response.send({
    message: "Dispositivo Adicionado com sucesso!",
    data: dispositivo,
    error: false,
  });
});

//requesição [POST] para editar um dispositivo no banco de dados

router.post("/edit", async (request, response) => {
  const dispositivoId = request.body.id;
  const dispositivoName = request.body.nome;

  // confere se o dispositivo ja existe no banco de dados
  const dispositivoExists = await prisma.dispositivo.findUnique({
    where: {
      id: dispositivoId,
    },
  });
  //confere se o dipositivo existe
  if (dispositivoExists) {
    // caso exista ele é atualizado pelo id
    const updateDispositivo = await prisma.dispositivo.update({
      where: {
        id: dispositivoId,
      },
      data: {
        estufa: dispositivoName,
      },
    });
    //retorna uma mensagem falando ao usuario que o dispositivo foi editado com sucesso
    response.statusCode = 200;
    return response.json({
      message: "Dispositivo editado com sucesso",
      data: updateDispositivo,
      error: false,
    });
  }
  //caso ocorra algum erro retorna uma mensagem falando que não foi possivel editar o dispositivo
  response.statusCode = 500;
  return response.json({ message: "Erro ao editar dispositivo", error: true });
});

module.exports = router;
