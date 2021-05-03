import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import {
  BsPersonFill,
  BsFillPlusCircleFill,
  BsJustify,
  BsFolderFill,
} from 'react-icons/bs';
import { FaThList, FaSignOutAlt } from 'react-icons/fa';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from 'react-router';

import { useSelector } from 'react-redux';
import {
  Top,
  Logo,
  Fill,
  SideBar,
  NameRating,
  RedirectBtn,
  ProfileImage,
  ImageContainer,
} from './styles';
import logo from '../../assets/logo-branca.png';
import { authenticationFailHandler } from '../../services/auth';
import { StoreState } from '../../store';

const TopBar: React.FC = () => {
  const history = useHistory();

  const { nickname, average, picture } = useSelector(
    (state: StoreState) => state.userState,
  );

  const [DrawerStatus, setDrawerStatus] = useState(false);

  const toggleDrawerStatus = () => {
    setDrawerStatus(!DrawerStatus);
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
          <ProfileImage src={picture.url}>
            {(nickname && nickname[0].toUpperCase()) || 'A'}
          </ProfileImage>

          <NameRating>
            <span className="user-name">{nickname}</span>
            <Rating readOnly value={average} style={{ marginLeft: '-3px' }} />
          </NameRating>
        </ImageContainer>

        <RedirectBtn
          style={{ marginTop: '32px' }}
          onClick={() => history.push('/')}
        >
          <FaThList />
          &nbsp; Feed
        </RedirectBtn>

        <RedirectBtn onClick={() => history.push('/oferta/cadastro')}>
          <BsFillPlusCircleFill />
          &nbsp; Adicionar oferta
        </RedirectBtn>

        <RedirectBtn onClick={() => history.push('/oferta/cadastro')}>
          <BsFolderFill />
          &nbsp; Minhas ofertas
        </RedirectBtn>

        <RedirectBtn onClick={() => history.push('/usuario/editar')}>
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
