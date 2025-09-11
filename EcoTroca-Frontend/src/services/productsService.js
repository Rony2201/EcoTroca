import axios from 'axios';

const productService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAllProducts = async () => {
  const response = await productService.get('/product');
  return response.data;
};
