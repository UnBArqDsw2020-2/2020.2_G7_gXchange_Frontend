import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyle from './globalStyle';
import Routes, { BeforeLoginRoutes } from './routes/index';
import {
  getToken,
  hasToken,
  authenticationFailHandler,
  authenticationSuccessHandler,
} from './services/auth';
import GlobalModal from './components/GlobalModal';
import { openModal } from './store/GlobalModal';
import { changeUserData } from './store/User';
import APIAdapter from './services/api';
import { StoreState } from './store';
import TopBar from './components/TopBar';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isLogged }: { isLogged: boolean } = useSelector(
    (store: StoreState) => store.userState,
  );

  const verifyToken = useCallback(async () => {
    try {
      const apiAdapter = new APIAdapter();
      const response = await apiAdapter.post('/token/verify', {
        token: getToken(),
      });

      authenticationSuccessHandler();
      dispatch(changeUserData(response.data));
    } catch {
      authenticationFailHandler();
      dispatch(
        openModal({
          title: 'Sessão expirada',
          type: 'error',
          content: 'Sua sessão expirou. Por favor logue novamente',
        }),
      );
      window.history.pushState({}, '', '/login');
    }
  }, [dispatch]);

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
      {isLogged || hasToken() ? (
        <>
          <TopBar />
          <Routes />
        </>
      ) : (
        <BeforeLoginRoutes />
      )}
      <GlobalStyle />
      <GlobalModal />
    </>
  );
};

export default App;
