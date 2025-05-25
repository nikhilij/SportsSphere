import React, { useState } from "react";

const AdminReview = ({ application }) => {
   const [showDetails, setShowDetails] = useState(false);

   const getStatusColor = (status) => {
      const colors = {
         pending: "from-yellow-400 to-orange-400",
         approved: "from-green-400 to-emerald-500",
         rejected: "from-red-400 to-rose-500",
      };
      return colors[status] || colors.pending;
   };

   return (
      <div className="max-w-4xl mx-auto p-4">
         <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
               <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                     <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                        <span className="text-2xl text-white font-bold">
                           {application?.studentName?.charAt(0) || "A"}
                        </span>
                     </div>
                     <div>
                        <h2 className="text-xl font-bold text-gray-800">
                           {application?.studentName || "Applicant Name"}
                        </h2>
                        <p className="text-gray-600">Application ID: {application?.id || "#12345"}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <span
                        className={`px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getStatusColor(application?.status)}`}
                     >
                        {application?.status || "Pending"}
                     </span>
                  </div>
               </div>
            </div>

            {/* Main Content */}
            <div className="p-6 space-y-6">
               {/* Quick Info */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                     <p className="text-sm text-gray-600">Sport Category</p>
                     <p className="text-lg font-semibold text-gray-800">{application?.sportCategory || "Basketball"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                     <p className="text-sm text-gray-600">Requested Amount</p>
                     <p className="text-lg font-semibold text-gray-800">${application?.amount || "5,000"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                     <p className="text-sm text-gray-600">Application Date</p>
                     <p className="text-lg font-semibold text-gray-800">{application?.date || "2024-01-20"}</p>
                  </div>
               </div>

               {/* Detailed Information */}
               <div className="mt-6">
                  <button
                     onClick={() => setShowDetails(!showDetails)}
                     className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                     <span>{showDetails ? "Hide" : "Show"} Details</span>
                     <svg
                        className={`w-5 h-5 transition-transform duration-300 ${showDetails ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                     </svg>
                  </button>

                  {showDetails && (
                     <div className="mt-4 space-y-4 animate-fadeIn">
                        <div className="bg-gray-50 rounded-xl p-6">
                           <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                 <p className="text-sm text-gray-600">Current GPA</p>
                                 <p className="text-md font-medium text-gray-800">{application?.gpa || "3.8"}</p>
                              </div>
                              <div>
                                 <p className="text-sm text-gray-600">Institution</p>
                                 <p className="text-md font-medium text-gray-800">
                                    {application?.institution || "Sports University"}
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                           <h3 className="text-lg font-semibold text-gray-800 mb-4">Sports Achievements</h3>
                           <ul className="space-y-2">
                              {(
                                 application?.achievements || ["State Championship - 1st Place", "National Youth Team"]
                              ).map((achievement, index) => (
                                 <li key={index} className="flex items-center gap-2">
                                    <svg
                                       className="w-5 h-5 text-green-500"
                                       fill="none"
                                       stroke="currentColor"
                                       viewBox="0 0 24 24"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M5 13l4 4L19 7"
                                       />
                                    </svg>
                                    <span className="text-gray-700">{achievement}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  )}
               </div>

               {/* Action Buttons */}
               <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium shadow-lg hover:shadow-xl">
                     Approve
                  </button>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium shadow-lg hover:shadow-xl">
                     Reject
                  </button>
                  <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium">
                     Request More Info
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdminReview;
