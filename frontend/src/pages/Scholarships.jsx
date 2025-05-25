import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SearchAndFilter from "../components/common/SearchAndFilter";
import PageHeader from "../components/common/PageHeader";

const Scholarships = () => {
   const { user, isAuthenticated } = useAuth();
   const [scholarships, setScholarships] = useState([]);
   const [loading, setLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("");

   useEffect(() => {
      const mockScholarships = [
         {
            id: 1,
            title: "Excellence in Athletics Scholarship",
            description: "Merit-based scholarship for outstanding athletic performance",
            amount: "$5,000",
            deadline: "2024-06-30",
            category: "athletics",
            eligibility: "Undergraduate students with GPA 3.5+",
            provider: "SportsSphere Foundation",
         },
         {
            id: 2,
            title: "Academic Sports Scholar Award",
            description: "Scholarship combining academic excellence with sports participation",
            amount: "$3,000",
            deadline: "2024-07-15",
            category: "academic",
            eligibility: "Students maintaining 3.8 GPA while participating in sports",
            provider: "Education Sports Alliance",
         },
         {
            id: 3,
            title: "Emerging Athlete Grant",
            description: "Support for young athletes showing exceptional potential",
            amount: "$2,500",
            deadline: "2024-08-01",
            category: "emerging",
            eligibility: "Ages 16-22 with demonstrated athletic potential",
            provider: "Future Champions Fund",
         },
      ];

      setTimeout(() => {
         setScholarships(mockScholarships);
         setLoading(false);
      }, 1000);
   }, []);

   const filteredScholarships = scholarships.filter((scholarship) => {
      return (
         (searchTerm === "" ||
            scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
         (selectedCategory === "" || scholarship.category === selectedCategory)
      );
   });

   const handleApply = (scholarshipId) => {
      if (!isAuthenticated) {
         alert("Please log in to apply for scholarships");
         return;
      }
      alert(`Application submitted for scholarship ID: ${scholarshipId}`);
   };

   const filters = [
      {
         key: "category",
         label: "Category",
         value: selectedCategory,
         onChange: setSelectedCategory,
         options: [
            { value: "athletics", label: "Athletics" },
            { value: "academic", label: "Academic" },
            { value: "emerging", label: "Emerging Athletes" },
         ],
      },
   ];

   if (loading) {
      return <LoadingSpinner text="Loading scholarships..." />;
   }

   // Badge color helper
   const getBadgeStyle = (category) => {
      if (category === "athletics") return "bg-blue-100 text-blue-700";
      if (category === "academic") return "bg-green-100 text-green-700";
      return "bg-purple-100 text-purple-700";
   };

   return (
      <div className="min-h-screen bg-gray-50 py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageHeader
               title="Sports Scholarships"
               subtitle="Discover opportunities to fund your athletic and academic journey"
               icon="🎓"
            />

            <SearchAndFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} filters={filters} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {filteredScholarships.map((scholarship) => (
                  <div
                     key={scholarship.id}
                     className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 flex flex-col p-6"
                  >
                     <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-1">{scholarship.title}</h3>
                        <span
                           className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getBadgeStyle(
                              scholarship.category
                           )}`}
                        >
                           {scholarship.category.charAt(0).toUpperCase() + scholarship.category.slice(1)}
                        </span>
                     </div>
                     <p className="text-gray-700 mb-4 text-base">{scholarship.description}</p>
                     <div className="grid grid-cols-1 gap-2 text-sm mb-4">
                        <div className="flex items-center">
                           <span className="font-semibold text-gray-600 w-24">Amount:</span>
                           <span className="text-green-600 font-bold ml-2">{scholarship.amount}</span>
                        </div>
                        <div className="flex items-center">
                           <span className="font-semibold text-gray-600 w-24">Provider:</span>
                           <span className="ml-2">{scholarship.provider}</span>
                        </div>
                        <div className="flex items-center">
                           <span className="font-semibold text-gray-600 w-24">Deadline:</span>
                           <span className="ml-2">{new Date(scholarship.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-start">
                           <span className="font-semibold text-gray-600 w-24">Eligibility:</span>
                           <span className="ml-2">{scholarship.eligibility}</span>
                        </div>
                     </div>
                     <button
                        onClick={() => handleApply(scholarship.id)}
                        className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition-all text-lg"
                     >
                        Apply Now
                     </button>
                  </div>
               ))}
            </div>

            {filteredScholarships.length === 0 && (
               <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No scholarships found matching your criteria.</p>
               </div>
            )}
         </div>
      </div>
   );
};

export default Scholarships;
