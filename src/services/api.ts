/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './auth';

const CONFIG: AxiosRequestConfig = {
  timeout: parseInt(process.env.REACT_APP_GXCHANGE_TIMEOUT || '5000', 10),
  baseURL: `${process.env.REACT_APP_GXCHANGE_API_URL}/app/`,
  headers: {
    Accept: 'application/json',
  },
};

const addTokenToRequest = (config: AxiosRequestConfig = CONFIG) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${getToken()}`,
  },
});

export default class APIAdapter {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create(CONFIG);
  }

  async get(path: string, config?: AxiosRequestConfig) {
    const res = await this.instance.get(path, addTokenToRequest(config));

    return res.data.results || res.data;
  }

  async post(
    path: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig,
  ) {
    const res = await this.instance.post(path, data, addTokenToRequest(config));
    return res.data.results || res;
  }

  async patch(
    path: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig,
  ) {
    const res = await this.instance.patch(
      path,
      data,
      addTokenToRequest(config),
    );

    return res.data.results || res;
  }

  async delete(path: string, config?: AxiosRequestConfig) {
    const res = await this.instance.delete(path, addTokenToRequest(config));

    return res.data.results || res;
  }
}
