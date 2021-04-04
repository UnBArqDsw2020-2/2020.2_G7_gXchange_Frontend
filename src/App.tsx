import React from 'react';
import GlobalStyle from './styles';
import Routes from './routes/index';
import GlobalModal from './components/GlobalModal';

const App: React.FC = () => {
  return (
    <>
      <Routes />

      <GlobalStyle />

      <GlobalModal />
    </>
  );
};

export default App;
