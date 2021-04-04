import React from 'react';
import GlobalStyle from './styles';
import GlobalModal from './components/GlobalModal';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />

      <GlobalModal />
    </>
  );
};

export default App;
