import axiosInstance from './axiosInstance';

const storeApi = {
  getAllProducts: async (params = {}) => {
    const response = await axiosInstance.get('/products', { params });
    return response.data;
  },
  
  getProduct: async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },
  
  createProduct: async (productData) => {
    const response = await axiosInstance.post('/products', productData);
    return response.data;
  },
  
  updateProduct: async (id, productData) => {
    const response = await axiosInstance.put(`/products/${id}`, productData);
    return response.data;
  },
  
  deleteProduct: async (id) => {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  },
  
  // Cart operations
  getCart: async () => {
    const response = await axiosInstance.get('/cart');
    return response.data;
  },
  
  addToCart: async (productId, quantity) => {
    const response = await axiosInstance.post('/cart/items', { productId, quantity });
    return response.data;
  },
  
  updateCartItem: async (itemId, quantity) => {
    const response = await axiosInstance.put(`/cart/items/${itemId}`, { quantity });
    return response.data;
  },
  
  removeFromCart: async (itemId) => {
    const response = await axiosInstance.delete(`/cart/items/${itemId}`);
    return response.data;
  },
  
  // Order operations
  createOrder: async (orderData) => {
    const response = await axiosInstance.post('/orders', orderData);
    return response.data;
  },
  
  getUserOrders: async () => {
    const response = await axiosInstance.get('/orders');
    return response.data;
  },
  
  getOrder: async (id) => {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  },
};

export default storeApi;
