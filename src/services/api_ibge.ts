import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const CONFIG: AxiosRequestConfig = {
  timeout: parseInt(process.env.REACT_APP_GXCHANGE_TIMEOUT || '5000', 10),
  baseURL: `${
    process.env.NODE_ENV === 'production' ? 'https' : 'http'
  }://viacep.com.br/ws`,
  headers: {
    Accept: 'application/json',
  },
};

export default class APIIBGE {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create(CONFIG);
  }

  async get(path: string) {
    const res = await this.instance.get(`${path}/json/`);

    return res.data.results || res.data;
  }
}
