import styled from 'styled-components';
import { Drawer, Button } from '@material-ui/core';

export const SideBar = styled(Drawer)`
  && {
    .MuiPaper-root {
      background: var(--lightGreenBackground);
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  background-color: var(--primary);

  .Foto {
    margin: 0px 8px;
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    line-height: 37px;
    font-size: 1rem;
    margin: initial !important;
    color: var(--white);
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
