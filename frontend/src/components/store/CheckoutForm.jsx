import React, { useState } from 'react';

const CheckoutForm = ({ cartItems, totalAmount, onOrderComplete }) => {
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        
        // Shipping Address
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        
        // Payment Information
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolder: '',
    });

    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Required fields validation
        const requiredFields = [
            'firstName', 'lastName', 'email', 'phone',
            'address', 'city', 'state', 'zipCode',
            'cardNumber', 'expiryDate', 'cvv', 'cardHolder'
        ];
        
        requiredFields.forEach(field => {
            if (!formData[field].trim()) {
                newErrors[field] = 'This field is required';
            }
        });

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        const phoneRegex = /^\d{10}$/;
        if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        // Card number validation (basic)
        if (formData.cardNumber && formData.cardNumber.replace(/\s/g, '').length !== 16) {
            newErrors.cardNumber = 'Card number must be 16 digits';
        }

        // CVV validation
        if (formData.cvv && formData.cvv.length !== 3) {
            newErrors.cvv = 'CVV must be 3 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);
        
        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const orderData = {
                ...formData,
                items: cartItems,
                total: totalAmount,
                orderDate: new Date().toISOString(),
                orderId: Math.random().toString(36).substr(2, 9).toUpperCase()
            };
            
            onOrderComplete(orderData);
        } catch (error) {
            console.error('Payment processing failed:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Form Fields */}
                <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="John"
                                />
                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Doe"
                                />
                                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="1234567890"
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="123 Main Street"
                                />
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="New York"
                                    />
                                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 border rounded-md ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="NY"
                                    />
                                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">ZIP Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 border rounded-md ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="10001"
                                    />
                                    {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Country</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Select Country</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="IN">India</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Card Holder Name</label>
                                <input
                                    type="text"
                                    name="cardHolder"
                                    value={formData.cardHolder}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 border rounded-md ${errors.cardHolder ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="John Doe"
                                />
                                {errors.cardHolder && <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Card Number</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 border rounded-md ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                />
                                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 border rounded-md ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="MM/YY"
                                        maxLength="5"
                                    />
                                    {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        className={`w-full p-3 border rounded-md ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="123"
                                        maxLength="3"
                                    />
                                    {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-3">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b">
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <div className="pt-4 border-t">
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>Total:</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full mt-6 py-3 px-4 rounded-md font-medium ${
                            isProcessing
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    >
                        {isProcessing ? 'Processing...' : `Place Order - $${totalAmount.toFixed(2)}`}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;