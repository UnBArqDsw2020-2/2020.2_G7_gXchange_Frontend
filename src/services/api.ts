/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const CONFIG: AxiosRequestConfig = {
  timeout: parseInt(process.env.REACT_APP_GXCHANGE_TIMEOUT || '5000', 10),
  baseURL: `${process.env.REACT_APP_GXCHANGE_API_URL}/app/`,
  headers: {
    Accept: 'application/json',
  },
};

export default class APIAdapter {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create(CONFIG);
  }

  async get(path: string, config?: AxiosRequestConfig) {
    const res = await this.instance.get(path, config);

    return res.data ? res.data : res;
  }

  async post(
    path: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig,
  ) {
    const res = await this.instance.post(path, data, config);

    return res.data ? res.data : res;
  }

  async patch(
    path: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig,
  ) {
    const res = await this.instance.patch(path, data, config);

    return res.data ? res.data : res;
  }

  async delete(path: string, config?: AxiosRequestConfig) {
    const res = await this.instance.delete(path, config);

    return res.data ? res.data : res;
  }
}
