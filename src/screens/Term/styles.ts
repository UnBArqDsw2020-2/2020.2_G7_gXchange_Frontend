import { Paper } from '@material-ui/core';
import styled from 'styled-components';

export const StyledPaper = styled(Paper)`
  background-color: white;
  color: var(--black);
  width: 70%;
  margin: 8px 0px;
  padding: 0px 16px;
  box-shadow: 0 10px 1em var(--black), 2.5px 5px 0.75em var(--primary) !important;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;

  &.MuiTypography-h1 {
    margin-top: 0.9rem;
    font-size: 2.5rem;
  }

  &.MuiTypography-h2 {
    font-size: 1.25rem;
    font-weight: bold;
  }
  &.MuiTypography-h3 {
    margin-top: 1em;
    font-size: 1.25rem;
  }
`;

export const Paragraph = styled.p`
  text-indent: 24px;
  word-wrap: normal;
  text-align: justify;
  text-justify: auto;
  margin-top: 1em;
  margin-bottom: 1em;
  font-size: 1em;
`;

export const OrderList = styled.ol`
  margin: 8px 24px;

  li a {
    color: var(--primary);
    text-decoration: none;
  }
`;
