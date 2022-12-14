import axios from "axios";

import * as API from "../constants";

export interface IMedida {
  id: number;
  dispositivoId: number;
  temperatura: number;
  umidade: number;
  datetime: string;
}

export interface IResponse {
  message: string;
}

export interface IDispositiveInfo {
  data: {
    dispositiveId: string;
    connected: boolean;
    mac: string;
    apIp: string;
    networkIp: string;
  };
}

export interface IDispositiveSetting {
  serverName: string;
  ntpServer1: string;
  ntpServer2: string;
  tempMin: number;
  tempMax: number;
  tempHigh: number;
  tempExtreme: number;
  minHumidity: number;
  maxHumidity: number;
}
export interface IDispositiveSettings {
  settings: IDispositiveSetting;
}

export async function updateWifiCredentials(ssid: string, password: string) {
  const data = await axios.post<IResponse>(`${API.API_BASE}/wifi-update`, {
    wifi_ssid: ssid,
    wifi_password: password,
  });
  return data.data;
}

export async function updateDispositiveSettings(settings: IDispositiveSetting) {
  const data = await axios.post<IResponse>(
    `${API.API_BASE}/settings`,
    settings
  );
  return data.data;
}

export async function getDispositiveInfo() {
  const data = await axios.get<IDispositiveInfo>(`${API.API_BASE}/info`);
  return data.data;
}

export async function getDispositiveSettings() {
  const data = await axios.get<IDispositiveSettings>(
    `${API.API_BASE}/settings`
  );
  return data.data;
}
