/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import env from 'react-dotenv';

const getConfig = () => ({
  timeout: 5000,
  baseURL: `${env.API_URL}/app/`,
  headers: {
    Accept: 'application/json',
  },
});

export default class APIAdapter {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create(getConfig());
  }

  get(path: string, config?: AxiosRequestConfig) {
    return this.instance.get(path, config);
  }

  post(path: string, data?: Record<string, any>, config?: AxiosRequestConfig) {
    return this.instance.post(path, data, config);
  }

  patch(path: string, data?: Record<string, any>, config?: AxiosRequestConfig) {
    return this.instance.patch(path, data, config);
  }

  delete(path: string, config?: AxiosRequestConfig) {
    return this.instance.delete(path, config);
  }
}
