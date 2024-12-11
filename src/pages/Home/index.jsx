import { useState } from "react";
import { Container, Logar, Title, InputWrapper, ButtonArea } from "./styles";
import ProcessList from "../../components/ProcessList";
import ReactInputMask from "react-input-mask";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";


export function Home() {
  const [cpf, setCpf] = useState("");
  const [casos, setCasos] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLoginClick = () => {
    if (user) {
      navigate("/gerenciador");
    } else {
      navigate("/login");
    }
  };
  const handleConsult = async () => {
    if (!cpf || cpf.trim().length !== 14) {
      alert("Por favor, insira um CPF válido.");
      return;
    }

    try {
      const response = await api.get(`/casos/${cpf}`);
      setCasos(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Nenhum caso encontrado para o CPF informado.");
      } else {
        console.error("Erro ao consultar casos:", error);
        alert("Erro ao consultar casos. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <Container>
      <Logar onClick={handleLoginClick}>Entrar</Logar>


      <Title>Consulte seus processos</Title>

      <InputWrapper>
        <ReactInputMask
          mask="999.999.999-99"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          name="cpf"
          placeholder="Digite seu CPF"
        />
      </InputWrapper>
      <ButtonArea>
        <Button
          title="Consultar"
          onClick={handleConsult}
        />
      </ButtonArea>

      <div className="processos">
        {casos.length > 0 ? (
          casos.map((processo) => (
            <ProcessList key={processo.id} processo={processo} />
          ))
        ) : (
          <p>Acompanhe as etapas das nossas últimas ações:</p>
        )}
      </div>
    </Container>
  );
}
