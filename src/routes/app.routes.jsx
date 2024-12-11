import { Routes, Route } from 'react-router-dom';
import { Causas } from '../pages/Causas';
import { Clientes } from '../pages/Clientes';
import { Gerenciador } from '../pages/Gerenciador';
import { Home } from '../pages/Home';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/causas" element={<Causas />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/gerenciador" element={<Gerenciador />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
