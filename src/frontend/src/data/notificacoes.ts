import axios from "axios";

import * as API from "../constants";

export const notificationStatusMap = [
  "Alerta de temperatura baixa",
  "Temperatura acima do normal. Abra as janelas laterais em 50%",
  "Temperatura acima do normal. Abra as janelas laterais em 100%",
  "Temperatura acima do normal. Abra as janelas laterais e zenitais em 100%",
  "Alerta de umidade baixa",
  "Alerta de umidade alta",
];

export interface INotificacao {
  id: number;
  gatilhoId: number;
  dispositivoId: number;
  tipo: number;
  status: number;
  dispositivo: {
    estufa: string;
  };
  gatilho: {
    temperatura: number;
    umidade: number;
  };
}

export interface INotificacaoResponse {
  data: INotificacao[];
}

export async function listNotificacoesPendentes() {
  const data = await axios.get<INotificacaoResponse>(
    `${API.NOTIFICACOES_ENDPOINT}/list/active`
  );
  return data.data;
}
