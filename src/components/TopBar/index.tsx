import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import {
  BsPersonFill,
  BsFillPlusCircleFill,
  BsListUl,
  BsJustify,
  BsFolderFill,
} from 'react-icons/bs';
import { useHistory } from 'react-router';
import { FaSignOutAlt } from 'react-icons/fa';
import {
  ImageContainer,
  Fill,
  SideBar,
  Top,
  Logo,
  RedirectBtn,
} from './styles';
import logo from '../../assets/logo-branca.png';
import { authenticationFailHandler } from '../../services/auth';

const TopBar: React.FC = () => {
  const history = useHistory();
  const [DrawerStatus, setDrawerStatus] = useState(false);

  const toggleDrawerStatus = () => {
    setDrawerStatus(!DrawerStatus);
  };

  const Redirect = (path: string) => {
    history.push(path);
  };

  const LogOut = () => {
    authenticationFailHandler();
  };

  return (
    <Fill>
      <Top>
        <IconButton onClick={toggleDrawerStatus}>
          <BsJustify size="24" style={{ color: 'var(--white)' }} />
        </IconButton>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
        <div />
      </Top>

      <SideBar
        variant="temporary"
        open={DrawerStatus}
        ModalProps={{ onBackdropClick: toggleDrawerStatus }}
      >
        <ImageContainer>
          <div className="Foto">M</div>
          <div>
            <p>Milene Serrano</p>
          </div>
        </ImageContainer>
        <RedirectBtn onClick={() => Redirect('/')}>
          <BsListUl />
          &nbsp; Feed
        </RedirectBtn>

        <RedirectBtn onClick={() => Redirect('/oferta/cadastro')}>
          <BsFillPlusCircleFill />
          &nbsp; Adicionar nova oferta
        </RedirectBtn>

        <RedirectBtn onClick={() => Redirect('/oferta/cadastro')}>
          <BsFolderFill />
          &nbsp; Minhas ofertas
        </RedirectBtn>

        <RedirectBtn onClick={() => Redirect('/usuario/editar')}>
          <BsPersonFill />
          &nbsp; Editar perfil
        </RedirectBtn>

        <RedirectBtn onClick={LogOut}>
          <FaSignOutAlt />
          &nbsp; Sair
        </RedirectBtn>
      </SideBar>
    </Fill>
  );
};

export default TopBar;
