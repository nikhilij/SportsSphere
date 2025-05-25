import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load cart from localStorage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem('sportsphere-cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever cartItems change
    useEffect(() => {
        localStorage.setItem('sportsphere-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <div className="relative">
            {/* Cart Icon Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
                <ShoppingCart size={24} />
                {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getTotalItems()}
                    </span>
                )}
            </button>

            {/* Cart Dropdown */}
            {isOpen && (
                <div className="absolute right-0 top-12 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Shopping Cart</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {cartItems.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <ShoppingCart className="mx-auto mb-4 text-gray-300" size={48} />
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <div className="p-4 space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                                        <img
                                            src={item.image || '/api/placeholder/60/60'}
                                            alt={item.name}
                                            className="w-15 h-15 object-cover rounded-md"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                                            <p className="text-blue-600 font-semibold">${item.price}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:bg-gray-200 rounded"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="px-2 py-1 bg-white border rounded text-sm">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:bg-gray-200 rounded"
                                            >
                                                <Plus size={16} />
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-1 text-red-500 hover:bg-red-50 rounded ml-2"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold text-gray-800">Total: ${getTotalPrice().toFixed(2)}</span>
                                <button
                                    onClick={clearCart}
                                    className="text-sm text-red-500 hover:text-red-700"
                                >
                                    Clear Cart
                                </button>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;