const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

class Notificacao {
  constructor(dispositivoId, gatilhoId, tipo) {
    this.dispositivoId = dispositivoId;
    this.gatilhoId = gatilhoId;
    this.tipo = tipo;
  }

  async _listPendingNotifications(tipo, dispositivoId) {
    const pendingNotifications = await prisma.notificacao.findMany({
      where: {
        tipo: tipo,
        dispositivoId: dispositivoId,
        status: 0,
      },
    });
    return pendingNotifications;
  }

  async _listRecentNotifications(tipo, dispositivoId) {
    let lastValidFilter = Date.now() - 60 * 1000 * 30;
    lastValidFilter = new Date(lastValidFilter).toISOString();

    const solvedNotifications = await prisma.notificacao.findMany({
      where: {
        AND: [
          {
            dispositivoId: dispositivoId,
            tipo: tipo,
            status: 1,
          },
          {
            updatedAt: {
              gte: lastValidFilter,
            },
          },
        ],
      },
    });
    return solvedNotifications;
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

  async _updateNotification(notificationId, gatilhoId) {
    const response = await prisma.notificacao.update({
      where: {
        id: notificationId,
      },
      data: {
        updatedAt: new Date(),
        gatilhoId: this.gatilhoId,
      },
    });
    return true;
  }

  async processNotification() {
    const recentNotifications = await this._listRecentNotifications(
      this.tipo,
      this.dispositivoId
    );

    if (recentNotifications.length > 0) {
      return true;
    }

    const pendingNotifications = await this._listPendingNotifications(
      this.tipo,
      this.dispositivoId
    );

    if (pendingNotifications.length > 0) {
      const pendingNotificationId = pendingNotifications[0].id;
      await this._updateNotification(pendingNotificationId, this.gatilhoId);
      return true;
    } else {
      return await this.createNotification();
    }
  }
}

module.exports = { Notificacao };
