import axios from 'axios';

import Product from '../models/Product';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000'
})

const API = {
  products: {
    get: async (page: number, limit?: number) => {
      const result = await apiClient.get<Product[]>(
        `/grocery?_page=${page}&_limit=${limit || 20}`
      );
      return result.data;
    },
    getFavorites: async () => {
      const result = await axios.get<Product[]>(
        'http://localhost:3000/grocery?favorite=1',
      );
      return result.data;
    },
    update: async (productId: string, payload: any) => {
      await axios.patch<Product>(
        `http://localhost:3000/grocery/${productId}`,
        payload
      );
    }
  }
};

export default API;