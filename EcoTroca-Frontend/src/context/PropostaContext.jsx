import { createContext, useState } from 'react';

export const PropostaContext = createContext();

function PropostaProvider({ children }) {
  const [propostas, setPropostas] = useState([]);

  const adicionarProposta = (novaProposta) => {
    setPropostas(prev => [...prev, novaProposta]);
  };

  return (
    <PropostaContext.Provider value={{ propostas, adicionarProposta }}>
      {children}
    </PropostaContext.Provider>
  );
}

export default PropostaProvider;