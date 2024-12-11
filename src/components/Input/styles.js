import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 8px;

  input{
    height: 56px;
    width: 100%;

    padding: 1rem;
    background-color: ${({ theme }) => theme.COLORS.GRAY_100};
    
    padding: 12px;

    color: ${({ theme }) => theme.COLORS.WHITE};
    border: 0;
  }
`;