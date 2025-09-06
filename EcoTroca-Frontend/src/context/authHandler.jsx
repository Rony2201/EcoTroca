// src/context/authHandler.jsx
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Adiciona estado de carregamento
  const [error, setError] = useState(null); // Adiciona estado de erro

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true); // Inicia o estado de carregamento
    setError(null); // Limpa erros anteriores

    try {
      // Faz a requisição POST para o seu backend
      const response = await api.post('/login', { email, password });

      const { token } = response.data;

      // Armazena o token no localStorage
      localStorage.setItem('token', token);

      // Atualiza o estado de login
      setIsLoggedIn(true);

      // Decodifica o token e salva os dados do usuário no estado
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);

      navigate('/perfil'); // Redireciona para a página de perfil
    } catch (err) {
      console.error('Erro no login:', err);
      // Pega a mensagem de erro do backend ou uma mensagem padrão
      setError(err.response?.data?.message || 'Usuário ou senha inválidos');
      setIsLoggedIn(false);
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token'); // Remove o token ao fazer logout
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, handleLogin, handleLogout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;