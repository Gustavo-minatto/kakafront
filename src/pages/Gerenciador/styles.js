import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;

  button{
      background: none;
      color: ${({ theme }) => theme.COLORS.GOLDEN};
      display: flex;
      align-items: center;
      font-size: 18px;
    }
    
`;