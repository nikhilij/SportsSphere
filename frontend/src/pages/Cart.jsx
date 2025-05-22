import React, { useState } from "react";
import { Trash2, Plus, Minus } from "react-feather";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";

const Cart = () => {
   const [cartItems, setCartItems] = useState([
      {
         id: 1,
         name: "Sports Jersey",
         price: 49.99,
         quantity: 1,
         image: "https://placeholder.com/150",
      },
      {
         id: 2,
         name: "Training Equipment Set",
         price: 129.99,
         quantity: 1,
         image: "https://placeholder.com/150",
      },
   ]);

   const updateQuantity = (id, change) => {
      setCartItems(
         cartItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item))
      );
   };

   const removeItem = (id) => {
      setCartItems(cartItems.filter((item) => item.id !== id));
   };

   const calculateTotal = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
   };

   if (cartItems.length === 0) {
      return (
         <MainLayout>
            <div className="min-h-screen bg-gray-50 p-8">
               <div className="max-w-2xl mx-auto text-center">
                  <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                  <p className="text-gray-600">Your cart is currently empty.</p>
                  <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                     Continue Shopping
                  </button>
               </div>
            </div>
         </MainLayout>
      );
   }

   return (
      <MainLayout>
         <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Cart Items */}
                  <div className="lg:col-span-2">
                     <div className="bg-white rounded-lg shadow-md">
                        {cartItems.map((item) => (
                           <motion.div key={item.id} layout className="p-6 border-b border-gray-200 last:border-b-0">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                       <h3 className="font-medium">{item.name}</h3>
                                       <p className="text-gray-600">${item.price}</p>
                                    </div>
                                 </div>

                                 <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                       <button
                                          onClick={() => updateQuantity(item.id, -1)}
                                          className="p-1 rounded-full hover:bg-gray-100"
                                       >
                                          <Minus size={16} />
                                       </button>
                                       <span className="w-8 text-center">{item.quantity}</span>
                                       <button
                                          onClick={() => updateQuantity(item.id, 1)}
                                          className="p-1 rounded-full hover:bg-gray-100"
                                       >
                                          <Plus size={16} />
                                       </button>
                                    </div>

                                    <button
                                       onClick={() => removeItem(item.id)}
                                       className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                                    >
                                       <Trash2 size={18} />
                                    </button>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </div>

                  {/* Order Summary */}
                  <div className="lg:col-span-1">
                     <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                           <div className="flex justify-between">
                              <span className="text-gray-600">Subtotal</span>
                              <span>${calculateTotal()}</span>
                           </div>
                           <div className="flex justify-between">
                              <span className="text-gray-600">Shipping</span>
                              <span>Free</span>
                           </div>
                           <div className="border-t pt-3">
                              <div className="flex justify-between font-semibold">
                                 <span>Total</span>
                                 <span>${calculateTotal()}</span>
                              </div>
                           </div>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
                           Proceed to Checkout
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </MainLayout>
   );
};

export default Cart;
