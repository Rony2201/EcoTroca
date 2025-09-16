import api from './api'; 

export const enviarProposta = async ({ proposerId, productId, mensagem }) => {
  const response = await api.post(`/proposta/${proposerId}`, {
    productId,
    mensagem
  });
  return response.data;
};