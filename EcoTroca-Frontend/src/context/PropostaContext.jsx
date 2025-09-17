import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { AuthContext } from "./authHandler.jsx";
import api from "../services/api";

export const PropostaContext = createContext();

export const PropostaProvider = ({ children }) => {
  const [propostas, setPropostas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchPropostas = useCallback(async () => {
    if (!user || !user.id) {
      setPropostas([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Busca propostas recebidas
      const receivedPromise = api.get(`/proposals/received/${user.id}`, config);

      // Busca propostas enviadas
      const sentPromise = api.get(`/proposals/sent/${user.id}`, config);

      // Executa as duas buscas em paralelo
      const [receivedResponse, sentResponse] = await Promise.all([
        receivedPromise,
        sentPromise,
      ]);

      // Combina os resultados e remove duplicatas (caso existam)
      const allPropostas = [...receivedResponse.data, ...sentResponse.data];
      const uniquePropostas = Array.from(
        new Map(allPropostas.map((p) => [p.id, p])).values()
      );

      setPropostas(uniquePropostas);
    } catch (err) {
      console.error("Erro ao buscar propostas:", err);
      setError("Não foi possível carregar as propostas.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPropostas();
  }, [fetchPropostas]);

  // Valor a ser provido pelo contexto
  const contextValue = {
    propostas,
    loading,
    error,
    refetchPropostas: fetchPropostas, // Função para recarregar as propostas
  };

  return (
    <PropostaContext.Provider value={contextValue}>
      {children}
    </PropostaContext.Provider>
  );
};
