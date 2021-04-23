export const TOKEN = '@gXchange-token';

export const isAuthenticated = () => localStorage.getItem(TOKEN) !== null;

export const getToken = () => localStorage.getItem(TOKEN);

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN);
};
