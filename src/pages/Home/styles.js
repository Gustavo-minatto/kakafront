import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  .processos{
    max-width: 100%;
    width: 67rem;
  }
`;

export const ButtonArea = styled.button`
    width: 40rem;
    background-color: transparent;
    margin-top: 10px;
    max-width: 100%;
`;

export const Logar = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.COLORS.YELLOW};
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY};
    border-radius: 4px;
    font-size: 16px;
    color: ${({ theme }) => theme.COLORS.LIGHT_GRAY};
    background-color: ${({ theme }) => theme.COLORS.DARK_GRAY};
  }

`;
