import styled from 'styled-components';
import { Avatar, Drawer, Button } from '@material-ui/core';

export const SideBar = styled(Drawer)`
  && {
    .MuiPaper-root {
      width: 250px;
      background: var(--lightGreenBackground);

      button {
        margin: 8px 16px;
      }

      @media (max-width: 400px) {
        width: 70%;
        max-width: 100%;
      }
    }

    .MuiPaper-root p {
      margin: 16px 16px 0px 16px;
    }
  }
`;

export const Top = styled.div`
  display: flex;
  padding: 4px;
  height: 48px;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0px;
  width: 100%;
  background: var(--primary);
`;

export const Fill = styled.div`
  padding: 20px;
  background: transparent;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
`;

export const NameRating = styled.div`
  display: flex;
  margin-top: -4px;
  margin-left: 8px;
  flex-direction: column;

  .user-name {
    font-size: 1rem;
    line-height: 36px;
    color: var(--white);
  }
`;

export const ProfileImage = styled(Avatar)`
  && {
    width: 64px;
    height: 64px;
  }
`;

export const Logo = styled.div`
  img {
    width: 100px;

    @media (max-width: 550px) {
      height: 100%;
    }
  }
`;

export const RedirectBtn = styled(Button)`
  && {
    text-transform: none;
    .MuiButton-label {
      justify-content: start;
    }
  }
`;
