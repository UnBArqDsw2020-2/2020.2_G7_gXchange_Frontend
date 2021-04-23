import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import GlobalStyle from './globalStyle';
import Routes, { BeforeLoginRoutes } from './routes/index';
import {
  getToken,
  hasToken,
  authenticationFailHandler,
  authenticationSuccessHandler,
} from './services/auth';
import GlobalModal from './components/GlobalModal';
import APIAdapter from './services/api';
import { StoreState } from './store';

const App: React.FC = () => {
  const { isLogged }: { isLogged: boolean } = useSelector(
    (store: StoreState) => store.userState,
  );

  const verifyToken = useCallback(async () => {
    try {
      const apiAdapter = new APIAdapter();

      await apiAdapter.post('/token/verify', { token: getToken() });

      authenticationSuccessHandler();
    } catch {
      authenticationFailHandler();
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    if (hasToken()) verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyToken]);

  useLayoutEffect(() => {
    const body = document.getElementById('gxchange-body');

    if (body && isLogged && hasToken()) {
      body.style.background = '';
    } else if (body && !hasToken()) {
      body.style.background = 'var(--purpleBackground)';
    }
  }, [isLogged]);

  return (
    <>
      {isLogged || hasToken() ? <Routes /> : <BeforeLoginRoutes />}

      <GlobalStyle />

      <GlobalModal />
    </>
  );
};

export default App;
