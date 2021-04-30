import store from '../store';
import { changeIsLogged } from '../store/User';

export const TOKEN = '@gXchange-token';

export const hasToken = () => {
  const token = localStorage.getItem(TOKEN);

  return token !== null && token !== '' && token !== undefined;
};

export const getToken = () => localStorage.getItem(TOKEN);

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN);
};

export const authenticationSuccessHandler = (token?: string) => {
  if (token) setToken(token);
  store.dispatch(changeIsLogged(true));
};

export const authenticationFailHandler = () => {
  clearToken();
  store.dispatch(changeIsLogged(false));
};
