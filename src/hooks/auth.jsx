import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [data, setData] = useState(() => {
    const user = localStorage.getItem("@avance:user");
    const token = localStorage.getItem("@avance:token");

    if (user && token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { user: JSON.parse(user), token };
    }

    return {};
  });

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@avance:user", JSON.stringify(user));
      localStorage.setItem("@avance:token", token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@avance:user");
    localStorage.removeItem("@avance:token");

    setData({});
  }

  useEffect(() => {
    const user = localStorage.getItem("@avance:user");
    const token = localStorage.getItem("@avance:token");

    if (user && token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ user: JSON.parse(user), token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user: data.user
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
