import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.COLORS.GRAY};
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
`;

export const ModalContent = styled.div`
  margin: 20px 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:nth-child(1) {
    background: #000;
    color: ${({ theme }) => theme.COLORS.WHITE};
  }

  button:nth-child(2) {
    background: ${({ theme }) => theme.COLORS.GREEN};
    color: ${({ theme }) => theme.COLORS.WHITE};
  }
`;
