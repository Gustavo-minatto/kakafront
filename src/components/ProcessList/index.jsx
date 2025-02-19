/* eslint-disable react/prop-types */
import { ProcessContainer, Title, Subtitle, Etapa, EtapaLabel, ProgressBar, Progress, Percent } from "./styles";

const ProcessList = ({ processo }) => {
  const etapas = [
    { nome: "Decisão Favorável", progresso: processo.decisao },
    { nome: "Protocolado nos órgãos", progresso: processo.protocolado },
    { nome: "Baixa SPC", progresso: processo.spc },
    { nome: "Baixa Boa Vista", progresso: processo.boa },
    { nome: "Baixa Serasa", progresso: processo.serasa },
    { nome: "Baixa CENPROT", progresso: processo.cenprot },
    { nome: "Baixa QUOD", progresso: processo.quod },
  ];

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };


  return (
    <ProcessContainer>
      <Title>Data do Processo: {getCurrentDate()}</Title>
      <Subtitle>Nome: {processo.nome}</Subtitle>
      {etapas.map((etapa, index) => (
        <Etapa key={index}>
          <EtapaLabel>{etapa.nome}</EtapaLabel>
          <ProgressBar>
            <Progress width={`${etapa.progresso}%`}
            />
            <Percent>{etapa.progresso}%</Percent>
          </ProgressBar>
        </Etapa>
      ))}
    </ProcessContainer>
  );
};

export default ProcessList;
