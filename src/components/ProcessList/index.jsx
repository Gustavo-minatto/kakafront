/* eslint-disable react/prop-types */
import { ProcessContainer, Title, Subtitle, Etapa, EtapaLabel, ProgressBar, Progress, Percent } from "./styles";

const ProcessList = ({ processo }) => {
  const etapas = [
    { nome: "Decisão Favorável", progresso: processo.decisao },
    { nome: "Protocolado nos órgãos", progresso: processo.protocolado },
    { nome: "Baixa SPC", progresso: processo.spc },
    { nome: "Baixa Boa Vista", progresso: processo.boaVista },
    { nome: "Baixa Serasa", progresso: processo.serasa },
    { nome: "Baixa CENPROT", progresso: processo.cenprot },
    { nome: "Baixa QUOD", progresso: processo.quod },
  ];

  return (
    <ProcessContainer>
      <Title>Data do Processo: {processo.data}</Title>
      <Subtitle>ID: {processo.id}</Subtitle>
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
