import { Container } from "./styles";
import { Button } from '../../components/Button';
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function Gerenciador() {
  const navigate = useNavigate();

  function Clientes() {
    navigate("/clientes");
  }

  function Voltar() {
    navigate("/")
  }

  function Causas() {
    navigate("/causas");
  }

  return (
    <Container>
      <button onClick={Voltar}>
        <FiArrowLeft />
        Voltar
      </button>

      <Button title={"Administre seus Clientes"} onClick={Clientes} />
      <Button title={"Administre suas Causas"} onClick={Causas} />
    </Container >
  );
}
