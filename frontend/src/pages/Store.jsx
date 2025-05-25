import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { useCart } from "../hooks/useCart";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Store = () => {
   const navigate = useNavigate();
   const { addToCart } = useCart();
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const mockProducts = [
         {
            id: 1,
            name: "Pro Soccer Ball",
            description: "Official size and weight. Perfect for matches and training.",
            price: 29.99,
            image: "/assets/images/soccer-ball.jpg",
         },
         {
            id: 2,
            name: "Running Shoes",
            description: "Lightweight, durable, and comfortable for all runners.",
            price: 79.99,
            image: "/assets/images/running-shoes.jpg",
         },
         {
            id: 3,
            name: "Sports Jersey",
            description: "Breathable fabric, available in all sizes and colors.",
            price: 39.99,
            image: "/assets/images/sports-jersey.jpg",
         },
         {
            id: 4,
            name: "Fitness Tracker",
            description: "Track your workouts, heart rate, and more.",
            price: 59.99,
            image: "/assets/images/fitness-tracker.jpg",
         },
      ];

      setTimeout(() => {
         setProducts(mockProducts);
         setLoading(false);
      }, 1000);
   }, []);

   const handleAddToCart = async (product) => {
      try {
         await addToCart(product.id, 1);
         toast.success(`${product.name} added to cart!`);
      } catch (error) {
         const cart = JSON.parse(localStorage.getItem("sportsphere-cart") || "[]");
         const existingItem = cart.find((item) => item.id === product.id);

         if (existingItem) {
            existingItem.quantity += 1;
         } else {
            cart.push({ ...product, quantity: 1 });
         }

         localStorage.setItem("sportsphere-cart", JSON.stringify(cart));
         toast.success(`${product.name} added to cart!`);
      }
   };

   if (loading) {
      return <LoadingSpinner text="Loading store products..." />;
   }

   return (
      <MainLayout>
         <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-screen-xl">
               {/* Header section */}
               <div className="text-center mb-12">
                  <span role="img" aria-label="soccer ball" className="text-6xl">
                     ⚽
                  </span>
                  <h1 className="mt-4 text-5xl font-extrabold text-slate-900">SportsSphere Store</h1>
                  <p className="mt-4 text-xl text-slate-700 max-w-2xl mx-auto">
                     Gear up with the best sports equipment and apparel!
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {products.map((product) => (
                     <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col group transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2"
                     >
                        <div className="relative h-56 w-full overflow-hidden">
                           <img
                              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                              src={product.image}
                              alt={product.name}
                              onError={(e) => {
                                 e.target.src = "/assets/images/placeholder.png";
                              }}
                           />
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                           <h3 className="text-xl font-semibold text-slate-800 mb-2 truncate">{product.name}</h3>
                           <p className="text-sm text-slate-600 mb-4 flex-grow">{product.description}</p>
                           <p className="text-2xl font-bold text-sky-600 mt-auto pt-3">${product.price}</p>
                        </div>

                        <div className="p-6 pt-2">
                           <button
                              type="button"
                              onClick={() => handleAddToCart(product)}
                              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
                           >
                              <span role="img" aria-label="shopping cart" className="text-xl">
                                 🛒
                              </span>
                              Add to Cart
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </MainLayout>
   );
};

export default Store;
