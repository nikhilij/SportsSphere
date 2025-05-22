import React, { useState } from 'react';
import {

FaShoppingCart,
FaTruck,
FaCreditCard,
FaListAlt,
FaUser,
FaEnvelope,
FaMapMarkerAlt,
FaCity,
FaHashtag, // Using FaHashtag for Postal Code, FaMailBulk could also work
FaGlobeAmericas,
FaUserCircle, // For Cardholder Name
FaCalendarAlt,
FaLock,
FaCheckCircle,
} from 'react-icons/fa';

const Checkout = () => {
const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
});

const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '', // Expected format MM/YY
    cvv: '',
});

const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
};

const handlePaymentChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation example (can be expanded)
    if (Object.values(shippingInfo).some(val => val === '') || Object.values(paymentInfo).some(val => val === '')) {
            alert('Please fill in all required fields.');
            return;
    }
    console.log('Order Submitted:', { shippingInfo, paymentInfo, orderItems, totalAmount });
    alert('Order placed successfully! (Check console for details)');
    // Here you would typically send data to a backend, clear cart, redirect, etc.
};

// Placeholder order data - in a real app, this would come from cart state
const orderItems = [
    { id: 1, name: 'SportSphere Pro T-Shirt', quantity: 2, price: 29.99 },
    { id: 2, name: 'Performance Running Shoes', quantity: 1, price: 120.00 },
    { id: 3, name: 'Yoga Mat Deluxe', quantity: 1, price: 45.50 },
];
const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const shippingCost = 10.00;
const taxRate = 0.08; // 8%
const taxAmount = subtotal * taxRate;
const totalAmount = subtotal + shippingCost + taxAmount;

const inputBaseClass = "mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm placeholder-gray-400";
const labelBaseClass = "block text-sm font-medium text-gray-700 flex items-center mb-1";

return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto"> {/* Increased max-width for two columns */}
            <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-10">
                <div className="text-center mb-10">
                    <FaShoppingCart className="mx-auto text-5xl text-purple-600 mb-3" />
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Secure Checkout</h1>
                    <p className="mt-2 text-lg text-gray-500">Complete your purchase for SportSphere</p>
                </div>

                <div className="lg:flex lg:gap-12"> {/* Main container for two-column layout */}
                    {/* Left Column: Forms */}
                    <div className="lg:w-2/3">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Shipping Information Section */}
                            <section className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                                    <FaTruck className="mr-3 text-purple-500 text-3xl" /> Shipping Details
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="fullName" className={labelBaseClass}>
                                            <FaUser className="mr-2 text-gray-400" /> Full Name
                                        </label>
                                        <input type="text" name="fullName" id="fullName" value={shippingInfo.fullName} onChange={handleShippingChange} className={inputBaseClass} placeholder="John Doe" required />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="email" className={labelBaseClass}>
                                            <FaEnvelope className="mr-2 text-gray-400" /> Email Address
                                        </label>
                                        <input type="email" name="email" id="email" value={shippingInfo.email} onChange={handleShippingChange} className={inputBaseClass} placeholder="you@example.com" required />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="address" className={labelBaseClass}>
                                            <FaMapMarkerAlt className="mr-2 text-gray-400" /> Street Address
                                        </label>
                                        <input type="text" name="address" id="address" value={shippingInfo.address} onChange={handleShippingChange} className={inputBaseClass} placeholder="123 Main St" required />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className={labelBaseClass}>
                                            <FaCity className="mr-2 text-gray-400" /> City
                                        </label>
                                        <input type="text" name="city" id="city" value={shippingInfo.city} onChange={handleShippingChange} className={inputBaseClass} placeholder="Anytown" required />
                                    </div>
                                    <div>
                                        <label htmlFor="postalCode" className={labelBaseClass}>
                                            <FaHashtag className="mr-2 text-gray-400" /> Postal Code
                                        </label>
                                        <input type="text" name="postalCode" id="postalCode" value={shippingInfo.postalCode} onChange={handleShippingChange} className={inputBaseClass} placeholder="12345" required />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="country" className={labelBaseClass}>
                                            <FaGlobeAmericas className="mr-2 text-gray-400" /> Country
                                        </label>
                                        <input type="text" name="country" id="country" value={shippingInfo.country} onChange={handleShippingChange} className={inputBaseClass} placeholder="United States" required />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Information Section */}
                            <section className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                                    <FaCreditCard className="mr-3 text-purple-500 text-3xl" /> Payment Information
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="cardholderName" className={labelBaseClass}>
                                            <FaUserCircle className="mr-2 text-gray-400" /> Cardholder Name
                                        </label>
                                        <input type="text" name="cardholderName" id="cardholderName" value={paymentInfo.cardholderName} onChange={handlePaymentChange} className={inputBaseClass} placeholder="Name on Card" required />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="cardNumber" className={labelBaseClass}>
                                            <FaCreditCard className="mr-2 text-gray-400" /> Card Number
                                        </label>
                                        <input type="text" name="cardNumber" id="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} className={inputBaseClass} placeholder="•••• •••• •••• ••••" required />
                                    </div>
                                    <div>
                                        <label htmlFor="expiryDate" className={labelBaseClass}>
                                            <FaCalendarAlt className="mr-2 text-gray-400" /> Expiry Date (MM/YY)
                                        </label>
                                        <input type="text" name="expiryDate" id="expiryDate" value={paymentInfo.expiryDate} onChange={handlePaymentChange} className={inputBaseClass} placeholder="MM/YY" required />
                                    </div>
                                    <div>
                                        <label htmlFor="cvv" className={labelBaseClass}>
                                            <FaLock className="mr-2 text-gray-400" /> CVV
                                        </label>
                                        <input type="text" name="cvv" id="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} className={inputBaseClass} placeholder="•••" required />
                                    </div>
                                </div>
                            </section>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-lg shadow-lg text-xl font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out transform hover:scale-105"
                            >
                                <FaCheckCircle className="mr-2" /> Place Your Order & Pay
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:w-1/3 mt-8 lg:mt-0">
                        <section className="p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50 lg:sticky lg:top-10"> {/* Added sticky positioning */}
                            <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                                <FaListAlt className="mr-3 text-purple-500 text-3xl" /> Order Summary
                            </h2>
                            <ul className="space-y-3 mb-6">
                                {orderItems.map(item => (
                                    <li key={item.id} className="flex justify-between items-center text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-colors">
                                        <div>
                                            <span className="font-medium">{item.name}</span>
                                            <span className="text-sm text-gray-500 ml-2">(x{item.quantity})</span>
                                        </div>
                                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-gray-200 pt-4 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>${shippingCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                                    <span>${taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-semibold text-gray-800 mt-3 pt-3 border-t-2 border-purple-200">
                                    <span>Total Amount</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
             <p className="mt-8 text-center text-sm text-white">
                    Powered by SportSphere Secure Payments
                </p>
        </div>
    </div>
);
};

export default Checkout;