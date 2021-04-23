import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 16px 0;
`;

export const SkeletonCard = styled(Skeleton)`
  && {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 10px;
    background-color: var(--lightGreenBackground);
    margin: 12px;
  }
`;

export const SkeletonRect = styled(Skeleton)`
  && {
    margin: 8px 4px;
    background-color: var(--primary);
  }
`;
