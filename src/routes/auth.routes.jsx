import { Routes, Route } from 'react-router-dom';
import { SignIn } from '../pages/SignIn';
import { Home } from '../pages/Home';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
