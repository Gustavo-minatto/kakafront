import styled from "styled-components";

export const ProcessContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  color: ${({ theme }) => theme.COLORS.GREEN};
  font-family: Arial, sans-serif;
  margin-bottom: 10px;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.COLORS.GREEN};
  align-items: center;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.COLORS.GRAY};
`;

export const Etapa = styled.div`
  margin-bottom: 15px;
`;

export const EtapaLabel = styled.span`
  display: block;
`;

export const ProgressBar = styled.div`
  background-color: #2A3440;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  margin-top: 5px;
  height: 30px;
`;

export const Progress = styled.div`
  background-color: ${({ theme }) => theme.COLORS.GREEN};
  height: 100%;
  transition: width 0.3s ease-in-out;
  width: ${(props) => props.width || "0%"};
  position: relative;
  display: flex;
  align-items: center; /* Centraliza o conteúdo verticalmente */
  justify-content: flex-end; /* Alinha o texto ao final da barra */
  padding-right: 10px; /* Espaço para o texto dentro da barra */
`;

export const Percent = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  z-index: 1;
  position: relative;
`;
