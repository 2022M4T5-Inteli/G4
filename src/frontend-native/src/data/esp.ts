import axios from "axios";

import * as API from "../constants";

export interface IMedida {
  id: number;
  dispositivoId: number;
  temperatura: number;
  umidade: number;
  datetime: string;
}

export interface IWifiUpdateResponse {
  message: string;
}

export async function updateWifiCredentials(ssid: string, password: string) {
  const data = await axios.post<IWifiUpdateResponse>(
    `${API.API_BASE}/wifi-update`,
    {
      wifi_ssid: ssid,
      wifi_password: password,
    }
  );
  return data.data;
}
