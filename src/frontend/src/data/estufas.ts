import axios from "axios";

import * as API from "../constants";

export interface IMedida {
  id: number;
  dispositivoId: number;
  temperatura: number;
  umidade: number;
  datetime: string;
}

export interface IDispositivoDetailed {
  id: number;
  mac: string;
  estufa: string;
  Medidas: IMedida[];
}

export interface IDispositivosResponse {
  data: IDispositivoDetailed[];
}

export interface IDefaultResponse {
  message: string;
  error: boolean;
}

export async function listDispositivosDetailed() {
  const data = await axios.get<IDispositivosResponse>(
    `${API.DISPOSITIVO_ENDPOINT}/list/detailed`
  );
  return data.data;
}

export async function updateEstufaName(
  dispositivoId: number | string,
  dispositivoName: string
) {
  const response = await axios.post<IDefaultResponse>(
    `${API.DISPOSITIVO_ENDPOINT}/edit`,
    {
      id: dispositivoId,
      nome: dispositivoName,
    }
  );

  return response.data;
}

export interface Estufa {
  name: string;
  temperature: number;
  humidity: number;
  id: number | string;
}

export interface EstufaDetailed extends Estufa {
  zenitaisAbertura: number;
  lateraisAbertura: number;
}

const estufas: Estufa[] = [
  { name: "Estufa 1", temperature: 18.0, humidity: 74, id: 0 },
  { name: "Estufa 2", temperature: 20.0, humidity: 72, id: 1 },
  { name: "Estufa 3", temperature: 18.0, humidity: 64, id: 2 },
  { name: "Estufa 4", temperature: 18.0, humidity: 63, id: 3 },
];

const estufasDetailed: EstufaDetailed[] = [
  {
    name: "Estufa 1",
    temperature: 18.0,
    humidity: 74,
    id: 0,
    zenitaisAbertura: 20,
    lateraisAbertura: 50,
  },
  {
    name: "Estufa 2",
    temperature: 20.0,
    humidity: 72,
    id: 1,
    zenitaisAbertura: 100,
    lateraisAbertura: 0,
  },
  {
    name: "Estufa 3",
    temperature: 18.0,
    humidity: 64,
    id: 2,
    zenitaisAbertura: 75,
    lateraisAbertura: 20,
  },
  {
    name: "Estufa 4",
    temperature: 18.0,
    humidity: 63,
    id: 3,
    zenitaisAbertura: 50,
    lateraisAbertura: 50,
  },
];

export const getEstufas = () => estufas;

export const getEstufa = (id: number) =>
  estufasDetailed.find((m) => m.id === id);
