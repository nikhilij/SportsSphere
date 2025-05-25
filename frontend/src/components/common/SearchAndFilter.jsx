import React from "react";

const SearchAndFilter = ({ searchTerm, onSearchChange, filters = [], className = "" }) => {
   return (
      <div className={`bg-white rounded-lg shadow mb-8 p-6 ${className}`}>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
               <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search
               </label>
               <input
                  type="text"
                  id="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
            </div>
            {filters.map((filter, index) => (
               <div key={index}>
                  <label htmlFor={filter.key} className="block text-sm font-medium text-gray-700 mb-2">
                     {filter.label}
                  </label>
                  <select
                     id={filter.key}
                     value={filter.value}
                     onChange={(e) => filter.onChange(e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                     <option value="">All {filter.label}</option>
                     {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                           {option.label}
                        </option>
                     ))}
                  </select>
               </div>
            ))}
         </div>
      </div>
   );
};

export default SearchAndFilter;
