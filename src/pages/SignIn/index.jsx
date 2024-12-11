import { Container } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSignIn() {
    setError(null);
    try {
      await signIn({ email, password });
      navigate('/gerenciador');
    } catch (err) {
      setError(err.message || 'E-mail ou senha incorretos');
      navigate('/login');
    }
  }

  return (
    <Container>
      <img src="/avance.png" alt="Logo do Avance" />

      <label>Email</label>
      <Input
        placeholder="E-mail"
        type="text"
        onChange={e => setEmail(e.target.value)}
      />

      <label>Senha</label>
      <Input
        placeholder="Senha"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Button title="Entrar" onClick={handleSignIn} />
    </Container>
  );
}
