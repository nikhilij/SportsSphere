import { useState, useEffect, useCallback } from 'react';
import storeApi from '../api/storeApi';

export const useCart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the user's cart
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await storeApi.getCart();
      setCart(response.cart);
      return response.cart;
    } catch (err) {
      setError(err.message || 'Failed to fetch cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add item to cart
  const addToCart = useCallback(async (productId, quantity = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await storeApi.addToCart(productId, quantity);
      setCart(response.cart);
      return response.cart;
    } catch (err) {
      setError(err.message || 'Failed to add item to cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update cart item quantity
  const updateCartItem = useCallback(async (itemId, quantity) => {
    try {
      setLoading(true);
      setError(null);
      const response = await storeApi.updateCartItem(itemId, quantity);
      setCart(response.cart);
      return response.cart;
    } catch (err) {
      setError(err.message || 'Failed to update cart item');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback(async (itemId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await storeApi.removeFromCart(itemId);
      setCart(response.cart);
      return response.cart;
    } catch (err) {
      setError(err.message || 'Failed to remove item from cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Calculate cart total (in case we need to do it client-side)
  const calculateTotal = useCallback((items) => {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }, []);

  // Create an order from the cart
  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await storeApi.createOrder(orderData);
      // Clear local cart after successful order
      setCart({ items: [], total: 0 });
      return response.order;
    } catch (err) {
      setError(err.message || 'Failed to create order');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load cart on initial mount
  useEffect(() => {
    // Only fetch cart if user is authenticated (checking localStorage for token)
    if (localStorage.getItem('token')) {
      fetchCart().catch(err => {
        console.error('Initial cart loading failed:', err);
      });
    }
  }, [fetchCart]);

  return {
    cart,
    loading,
    error,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    createOrder,
    clearError,
    calculateTotal,
    totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0)
  };
};
