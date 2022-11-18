const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

class Notificacao {
  constructor(dispositivoId, gatilhoId, tipo) {
    this.dispositivoId = dispositivoId;
    this.gatilhoId = gatilhoId;
    this.tipo = tipo;
  }

  async createNotification() {
    if (this.tipo < 0) {
      return false;
    }
    const response = await prisma.notificacao.create({
      data: {
        dispositivoId: this.dispositivoId,
        gatilhoId: this.gatilhoId,
        tipo: this.tipo,
        status: 0,
      },
    });

    return true;
  }
}

module.exports = { Notificacao };
