import axios from 'axios';
import api from './api';

const productService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAllProducts = async () => {
  const response = await productService.get('/product');
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const token = localStorage.getItem("token"); // 1. Pega o token do localStorage
  try {
    const response = await api.put(
      `/product/${productId}`, 
      productData,
      { // 2. Adiciona o cabeçalho de autorização na requisição
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    ); 
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error);
    throw error;
  }
};