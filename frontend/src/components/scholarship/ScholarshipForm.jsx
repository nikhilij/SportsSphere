import React, { useState } from 'react';

const ScholarshipForm = () => {
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        
        // Academic Information
        currentSchool: '',
        gradeLevel: '',
        gpa: '',
        graduationYear: '',
        
        // Sports Information
        sport: '',
        position: '',
        yearsPlaying: '',
        achievements: '',
        coachName: '',
        coachContact: '',
        
        // Scholarship Details
        scholarshipType: '',
        essayQuestion: '',
        essay: '',
        
        // Additional Information
        financialNeed: '',
        extracurriculars: '',
        references: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        
        // Required field validations
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.sport.trim()) newErrors.sport = 'Sport is required';
        if (!formData.essay.trim()) newErrors.essay = 'Essay is required';
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        // GPA validation
        if (formData.gpa && (isNaN(formData.gpa) || formData.gpa < 0 || formData.gpa > 4)) {
            newErrors.gpa = 'GPA must be between 0 and 4';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // API call to submit scholarship application
            const response = await fetch('/api/scholarships/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert('Scholarship application submitted successfully!');
                // Reset form
                setFormData({
                    firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '',
                    gender: '', currentSchool: '', gradeLevel: '', gpa: '', graduationYear: '',
                    sport: '', position: '', yearsPlaying: '', achievements: '', coachName: '',
                    coachContact: '', scholarshipType: '', essayQuestion: '', essay: '',
                    financialNeed: '', extracurriculars: '', references: ''
                });
            } else {
                throw new Error('Failed to submit application');
            }
        } catch (error) {
            alert('Error submitting application. Please try again.');
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
    const errorInputClasses = "w-full px-3 py-2 border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
    const errorMessageClasses = "text-red-500 text-sm mt-1";

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Scholarship Application</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Personal Information Section */}
                <section className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className={labelClasses}>First Name *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={errors.firstName ? errorInputClasses : inputClasses}
                            />
                            {errors.firstName && <span className={errorMessageClasses}>{errors.firstName}</span>}
                        </div>
                        
                        <div>
                            <label htmlFor="lastName" className={labelClasses}>Last Name *</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={errors.lastName ? errorInputClasses : inputClasses}
                            />
                            {errors.lastName && <span className={errorMessageClasses}>{errors.lastName}</span>}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label htmlFor="email" className={labelClasses}>Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={errors.email ? errorInputClasses : inputClasses}
                            />
                            {errors.email && <span className={errorMessageClasses}>{errors.email}</span>}
                        </div>
                        
                        <div>
                            <label htmlFor="phone" className={labelClasses}>Phone Number *</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={errors.phone ? errorInputClasses : inputClasses}
                            />
                            {errors.phone && <span className={errorMessageClasses}>{errors.phone}</span>}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label htmlFor="dateOfBirth" className={labelClasses}>Date of Birth</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className={inputClasses}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="gender" className={labelClasses}>Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className={inputClasses}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Academic Information Section */}
                <section className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Academic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="currentSchool" className={labelClasses}>Current School</label>
                            <input
                                type="text"
                                id="currentSchool"
                                name="currentSchool"
                                value={formData.currentSchool}
                                onChange={handleInputChange}
                                className={inputClasses}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="gradeLevel" className={labelClasses}>Grade Level</label>
                            <select
                                id="gradeLevel"
                                name="gradeLevel"
                                value={formData.gradeLevel}
                                onChange={handleInputChange}
                                className={inputClasses}
                            >
                                <option value="">Select Grade</option>
                                <option value="9">9th Grade</option>
                                <option value="10">10th Grade</option>
                                <option value="11">11th Grade</option>
                                <option value="12">12th Grade</option>
                                <option value="college-freshman">College Freshman</option>
                                <option value="college-sophomore">College Sophomore</option>
                                <option value="college-junior">College Junior</option>
                                <option value="college-senior">College Senior</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label htmlFor="gpa" className={labelClasses}>GPA (4.0 scale)</label>
                            <input
                                type="number"
                                id="gpa"
                                name="gpa"
                                step="0.01"
                                min="0"
                                max="4"
                                value={formData.gpa}
                                onChange={handleInputChange}
                                className={errors.gpa ? errorInputClasses : inputClasses}
                            />
                            {errors.gpa && <span className={errorMessageClasses}>{errors.gpa}</span>}
                        </div>
                        
                        <div>
                            <label htmlFor="graduationYear" className={labelClasses}>Expected Graduation Year</label>
                            <input
                                type="number"
                                id="graduationYear"
                                name="graduationYear"
                                min="2024"
                                max="2030"
                                value={formData.graduationYear}
                                onChange={handleInputChange}
                                className={inputClasses}
                            />
                        </div>
                    </div>
                </section>

                {/* Sports Information Section */}
                <section className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Sports Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="sport" className={labelClasses}>Sport *</label>
                            <select
                                id="sport"
                                name="sport"
                                value={formData.sport}
                                onChange={handleInputChange}
                                className={errors.sport ? errorInputClasses : inputClasses}
                            >
                                <option value="">Select Sport</option>
                                <option value="basketball">Basketball</option>
                                <option value="football">Football</option>
                                <option value="soccer">Soccer</option>
                                <option value="tennis">Tennis</option>
                                <option value="swimming">Swimming</option>
                                <option value="track-field">Track & Field</option>
                                <option value="baseball">Baseball</option>
                                <option value="volleyball">Volleyball</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.sport && <span className={errorMessageClasses}>{errors.sport}</span>}
                        </div>
                        
                        <div>
                            <label htmlFor="position" className={labelClasses}>Position</label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                value={formData.position}
                                onChange={handleInputChange}
                                className={inputClasses}
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label htmlFor="yearsPlaying" className={labelClasses}>Years Playing</label>
                            <input
                                type="number"
                                id="yearsPlaying"
                                name="yearsPlaying"
                                min="1"
                                max="20"
                                value={formData.yearsPlaying}
                                onChange={handleInputChange}
                                className={inputClasses}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="coachName" className={labelClasses}>Coach Name</label>
                            <input
                                type="text"
                                id="coachName"
                                name="coachName"
                                value={formData.coachName}
                                onChange={handleInputChange}
                                className={inputClasses}
                            />
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <label htmlFor="achievements" className={labelClasses}>Athletic Achievements</label>
                        <textarea
                            id="achievements"
                            name="achievements"
                            rows="3"
                            value={formData.achievements}
                            onChange={handleInputChange}
                            placeholder="List your athletic achievements, awards, records, etc."
                            className={inputClasses}
                        />
                    </div>
                </section>

                {/* Essay Section */}
                <section className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Essay</h3>
                    <div>
                        <label htmlFor="essay" className={labelClasses}>
                            Why do you deserve this scholarship? (500-1000 words) *
                        </label>
                        <textarea
                            id="essay"
                            name="essay"
                            rows="8"
                            value={formData.essay}
                            onChange={handleInputChange}
                            className={errors.essay ? errorInputClasses : inputClasses}
                            placeholder="Write your essay here..."
                        />
                        {errors.essay && <span className={errorMessageClasses}>{errors.essay}</span>}
                        <div className="text-sm text-gray-500 mt-2">
                            Words: {formData.essay.split(' ').filter(word => word.length > 0).length}
                        </div>
                    </div>
                </section>

                {/* Additional Information */}
                <section className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Additional Information</h3>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="extracurriculars" className={labelClasses}>Extracurricular Activities</label>
                            <textarea
                                id="extracurriculars"
                                name="extracurriculars"
                                rows="3"
                                value={formData.extracurriculars}
                                onChange={handleInputChange}
                                placeholder="List clubs, volunteer work, leadership roles, etc."
                                className={inputClasses}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="financialNeed" className={labelClasses}>Financial Need Statement</label>
                            <textarea
                                id="financialNeed"
                                name="financialNeed"
                                rows="3"
                                value={formData.financialNeed}
                                onChange={handleInputChange}
                                placeholder="Briefly describe your financial situation and need for assistance"
                                className={inputClasses}
                            />
                        </div>
                    </div>
                </section>

                <div className="flex justify-center pt-6">
                    <button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ScholarshipForm;