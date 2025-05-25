import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Trophy, FileText, AlertCircle } from 'lucide-react';

const MembershipForm = ({ 
    onSubmit, 
    initialData = {}, 
    isEditing = false, 
    isLoading = false,
    clubName = ''
}) => {
    const [formData, setFormData] = useState({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        dateOfBirth: initialData.dateOfBirth || '',
        experience: initialData.experience || 'beginner',
        previousClubs: initialData.previousClubs || '',
        motivation: initialData.motivation || '',
        availability: initialData.availability || [],
        emergencyContact: initialData.emergencyContact || '',
        medicalConditions: initialData.medicalConditions || '',
        ...initialData
    });

    const [errors, setErrors] = useState({});

    const experienceLevels = [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
        { value: 'professional', label: 'Professional' }
    ];

    const availabilityOptions = [
        'Monday Morning', 'Monday Evening',
        'Tuesday Morning', 'Tuesday Evening',
        'Wednesday Morning', 'Wednesday Evening',
        'Thursday Morning', 'Thursday Evening',
        'Friday Morning', 'Friday Evening',
        'Saturday Morning', 'Saturday Evening',
        'Sunday Morning', 'Sunday Evening'
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of birth is required';
        }

        if (!formData.motivation.trim()) {
            newErrors.motivation = 'Please share why you want to join';
        }

        if (formData.availability.length === 0) {
            newErrors.availability = 'Please select at least one availability option';
        }

        if (!formData.emergencyContact.trim()) {
            newErrors.emergencyContact = 'Emergency contact is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleAvailabilityChange = (option) => {
        setFormData(prev => ({
            ...prev,
            availability: prev.availability.includes(option)
                ? prev.availability.filter(item => item !== option)
                : [...prev.availability, option]
        }));

        if (errors.availability) {
            setErrors(prev => ({
                ...prev,
                availability: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const InputField = ({ icon: Icon, label, error, ...props }) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    {...props}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                        error 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                />
            </div>
            {error && (
                <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200"
        >
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                    {isEditing ? 'Update Membership' : `Join ${clubName || 'Sports Club'}`}
                </h2>
                <p className="text-gray-600 mt-1">
                    Please fill out the form below to apply for membership
                </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                        <User className="h-5 w-5 text-blue-600" />
                        <span>Personal Information</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            icon={User}
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            error={errors.fullName}
                            placeholder="Enter your full name"
                        />

                        <InputField
                            icon={Mail}
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            error={errors.email}
                            placeholder="Enter your email"
                        />

                        <InputField
                            icon={Phone}
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            error={errors.phone}
                            placeholder="Enter your phone number"
                        />

                        <InputField
                            icon={Calendar}
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            error={errors.dateOfBirth}
                        />
                    </div>
                </div>

                {/* Sports Experience */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                        <Trophy className="h-5 w-5 text-blue-600" />
                        <span>Sports Experience</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Experience Level
                            </label>
                            <select
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            >
                                {experienceLevels.map(level => (
                                    <option key={level.value} value={level.value}>
                                        {level.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Previous Clubs (Optional)
                            </label>
                            <input
                                name="previousClubs"
                                value={formData.previousClubs}
                                onChange={handleInputChange}
                                placeholder="List any previous sports clubs"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Availability */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Availability
                    </h3>
                    <p className="text-sm text-gray-600">
                        Select all time slots when you're available to participate
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {availabilityOptions.map(option => (
                            <label
                                key={option}
                                className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.availability.includes(option)}
                                    onChange={() => handleAvailabilityChange(option)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{option}</span>
                            </label>
                        ))}
                    </div>
                    {errors.availability && (
                        <div className="flex items-center space-x-1 text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.availability}</span>
                        </div>
                    )}
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <span>Additional Information</span>
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Why do you want to join this club? *
                            </label>
                            <textarea
                                name="motivation"
                                value={formData.motivation}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Tell us about your motivation and goals..."
                                className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                                    errors.motivation 
                                        ? 'border-red-300 bg-red-50' 
                                        : 'border-gray-300'
                                }`}
                            />
                            {errors.motivation && (
                                <div className="flex items-center space-x-1 text-red-600 text-sm">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>{errors.motivation}</span>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Emergency Contact *
                                </label>
                                <input
                                    name="emergencyContact"
                                    value={formData.emergencyContact}
                                    onChange={handleInputChange}
                                    placeholder="Name and phone number"
                                    className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.emergencyContact 
                                            ? 'border-red-300 bg-red-50' 
                                            : 'border-gray-300'
                                    }`}
                                />
                                {errors.emergencyContact && (
                                    <div className="flex items-center space-x-1 text-red-600 text-sm">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>{errors.emergencyContact}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Medical Conditions (Optional)
                                </label>
                                <input
                                    name="medicalConditions"
                                    value={formData.medicalConditions}
                                    onChange={handleInputChange}
                                    placeholder="Any relevant medical information"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                    >
                        {isLoading && (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        <span>{isEditing ? 'Update Application' : 'Submit Application'}</span>
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default MembershipForm;