import React, { useState } from "react";

const ProfileForm = ({ user, onSave, onCancel }) => {
   const [formData, setFormData] = useState({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      dateOfBirth: user?.dateOfBirth || "",
      gender: user?.gender || "",
      location: user?.location || "",
      bio: user?.bio || "",
      favoritesSports: user?.favoritesSports || [],
      skillLevel: user?.skillLevel || "beginner",
   });

   const [errors, setErrors] = useState({});

   const sportsOptions = [
      "Football",
      "Basketball",
      "Tennis",
      "Cricket",
      "Swimming",
      "Running",
      "Cycling",
      "Volleyball",
      "Badminton",
      "Golf",
   ];

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
         setErrors((prev) => ({
            ...prev,
            [name]: "",
         }));
      }
   };

   const handleSportToggle = (sport) => {
      setFormData((prev) => ({
         ...prev,
         favoritesSports: prev.favoritesSports.includes(sport)
            ? prev.favoritesSports.filter((s) => s !== sport)
            : [...prev.favoritesSports, sport],
      }));
   };

   const validateForm = () => {
      const newErrors = {};

      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
         onSave(formData);
      }
   };

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
         <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
               <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
               <button
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                  onClick={onCancel}
               >
                  ×
               </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
               {/* Name Row */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                           errors.firstName ? "border-red-500 bg-red-50" : "border-gray-300"
                        }`}
                     />
                     {errors.firstName && <span className="text-sm text-red-600">{errors.firstName}</span>}
                  </div>

                  <div className="space-y-1">
                     <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name <span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                           errors.lastName ? "border-red-500 bg-red-50" : "border-gray-300"
                        }`}
                     />
                     {errors.lastName && <span className="text-sm text-red-600">{errors.lastName}</span>}
                  </div>
               </div>

               {/* Email */}
               <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                     Email <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                     }`}
                  />
                  {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
               </div>

               {/* Phone and Date Row */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                     </label>
                     <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                     />
                  </div>

                  <div className="space-y-1">
                     <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                        Date of Birth
                     </label>
                     <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                     />
                  </div>
               </div>

               {/* Gender and Location Row */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Gender
                     </label>
                     <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                     >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                     </select>
                  </div>

                  <div className="space-y-1">
                     <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                     </label>
                     <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, Country"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                     />
                  </div>
               </div>

               {/* Skill Level */}
               <div className="space-y-1">
                  <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700">
                     Skill Level
                  </label>
                  <select
                     id="skillLevel"
                     name="skillLevel"
                     value={formData.skillLevel}
                     onChange={handleInputChange}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                     <option value="beginner">Beginner</option>
                     <option value="intermediate">Intermediate</option>
                     <option value="advanced">Advanced</option>
                     <option value="professional">Professional</option>
                  </select>
               </div>

               {/* Favorite Sports */}
               <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Favorite Sports</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                     {sportsOptions.map((sport) => (
                        <label key={sport} className="flex items-center space-x-2 cursor-pointer group">
                           <input
                              type="checkbox"
                              checked={formData.favoritesSports.includes(sport)}
                              onChange={() => handleSportToggle(sport)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                           />
                           <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                              {sport}
                           </span>
                        </label>
                     ))}
                  </div>
               </div>

               {/* Bio */}
               <div className="space-y-1">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                     Bio
                  </label>
                  <textarea
                     id="bio"
                     name="bio"
                     value={formData.bio}
                     onChange={handleInputChange}
                     placeholder="Tell us about yourself and your sports interests..."
                     rows={4}
                     maxLength={500}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 resize-none"
                  />
                  <div className="text-right">
                     <small className="text-sm text-gray-500">{formData.bio.length}/500</small>
                  </div>
               </div>

               {/* Action Buttons */}
               <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                     type="button"
                     className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium"
                     onClick={onCancel}
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium shadow-lg hover:shadow-xl"
                  >
                     Save Changes
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ProfileForm;
