import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../common/Input';
import ErrorMessage from '../common/ErrorMessage';

const ClubForm = ({ onSubmit, initialData = {}, isEditing = false, isLoading = false }) => {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        description: initialData.description || '',
        sport: initialData.sport || '',
        location: initialData.location || '',
        meetingTime: initialData.meetingTime || '',
        memberLimit: initialData.memberLimit || '',
        image: initialData.image || '',
        requirements: initialData.requirements || '',
        ...initialData
    });

    const [errors, setErrors] = useState({});

    const sports = [
        'Soccer', 'Basketball', 'Tennis', 'Swimming', 'Running', 
        'Cycling', 'Volleyball', 'Baseball', 'Golf', 'Other'
    ];

    const handleChange = (e) => {
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

        if (!formData.name.trim()) {
            newErrors.name = 'Club name is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }

        if (!formData.sport) {
            newErrors.sport = 'Sport selection is required';
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        if (!formData.meetingTime.trim()) {
            newErrors.meetingTime = 'Meeting time is required';
        }

        if (formData.memberLimit && (isNaN(formData.memberLimit) || formData.memberLimit < 1)) {
            newErrors.memberLimit = 'Member limit must be a positive number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
        >
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {isEditing ? 'Edit Club' : 'Create New Club'}
                </h2>
                <p className="text-gray-600">
                    {isEditing ? 'Update your club information' : 'Fill in the details to create your sports club'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Club Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Club Name *
                    </label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter club name"
                        className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                        <ErrorMessage 
                            message={errors.name} 
                            type="error" 
                            className="mt-1"
                        />
                    )}
                </div>

                {/* Sport Selection */}
                <div>
                    <label htmlFor="sport" className="block text-sm font-medium text-gray-700 mb-2">
                        Sport *
                    </label>
                    <select
                        id="sport"
                        name="sport"
                        value={formData.sport}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.sport ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="">Select a sport</option>
                        {sports.map((sport) => (
                            <option key={sport} value={sport}>
                                {sport}
                            </option>
                        ))}
                    </select>
                    {errors.sport && (
                        <ErrorMessage 
                            message={errors.sport} 
                            type="error" 
                            className="mt-1"
                        />
                    )}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe your club, its goals, and what members can expect"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                            errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        {formData.description.length}/500 characters
                    </p>
                    {errors.description && (
                        <ErrorMessage 
                            message={errors.description} 
                            type="error" 
                            className="mt-1"
                        />
                    )}
                </div>

                {/* Location */}
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                    </label>
                    <Input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Where does your club meet?"
                        className={errors.location ? 'border-red-500' : ''}
                    />
                    {errors.location && (
                        <ErrorMessage 
                            message={errors.location} 
                            type="error" 
                            className="mt-1"
                        />
                    )}
                </div>

                {/* Meeting Time */}
                <div>
                    <label htmlFor="meetingTime" className="block text-sm font-medium text-gray-700 mb-2">
                        Meeting Time *
                    </label>
                    <Input
                        id="meetingTime"
                        name="meetingTime"
                        type="text"
                        value={formData.meetingTime}
                        onChange={handleChange}
                        placeholder="e.g., Mondays and Wednesdays 6:00 PM"
                        className={errors.meetingTime ? 'border-red-500' : ''}
                    />
                    {errors.meetingTime && (
                        <ErrorMessage 
                            message={errors.meetingTime} 
                            type="error" 
                            className="mt-1"
                        />
                    )}
                </div>

                {/* Member Limit */}
                <div>
                    <label htmlFor="memberLimit" className="block text-sm font-medium text-gray-700 mb-2">
                        Member Limit (Optional)
                    </label>
                    <Input
                        id="memberLimit"
                        name="memberLimit"
                        type="number"
                        value={formData.memberLimit}
                        onChange={handleChange}
                        placeholder="Maximum number of members"
                        min="1"
                        className={errors.memberLimit ? 'border-red-500' : ''}
                    />
                    {errors.memberLimit && (
                        <ErrorMessage 
                            message={errors.memberLimit} 
                            type="error" 
                            className="mt-1"
                        />
                    )}
                </div>

                {/* Club Image URL */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                        Club Image URL (Optional)
                    </label>
                    <Input
                        id="image"
                        name="image"
                        type="url"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/club-image.jpg"
                    />
                </div>

                {/* Requirements */}
                <div>
                    <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                        Requirements (Optional)
                    </label>
                    <textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Any specific requirements or equipment needed"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                {isEditing ? 'Updating...' : 'Creating...'}
                            </div>
                        ) : (
                            isEditing ? 'Update Club' : 'Create Club'
                        )}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default ClubForm;