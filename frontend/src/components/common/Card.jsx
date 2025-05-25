import React from "react";
import { Link } from "react-router-dom";

const Card = ({
   image,
   title,
   description,
   badge,
   details = [],
   actionButton,
   className = "",
   imageHeight = "h-48",
}) => {
   return (
      <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
         {image && (
            <img
               src={image}
               alt={title}
               className={`w-full ${imageHeight} object-cover`}
               onError={(e) => {
                  e.target.src = "/assets/images/placeholder.png";
               }}
            />
         )}
         <div className="p-6">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
               {badge && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.className}`}>{badge.text}</span>
               )}
            </div>

            {description && <p className="text-gray-600 mb-4">{description}</p>}

            {details.length > 0 && (
               <div className="space-y-2 mb-4">
                  {details.map((detail, index) => (
                     <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{detail.label}:</span>
                        <span className={detail.className || ""}>{detail.value}</span>
                     </div>
                  ))}
               </div>
            )}

            {actionButton && (
               <div className="mt-4">
                  {actionButton.type === "link" ? (
                     <Link
                        to={actionButton.to}
                        className={`inline-block px-4 py-2 rounded-md transition-colors ${actionButton.className}`}
                     >
                        {actionButton.text}
                     </Link>
                  ) : (
                     <button
                        onClick={actionButton.onClick}
                        className={`w-full px-4 py-2 rounded-md transition-colors ${actionButton.className}`}
                     >
                        {actionButton.text}
                     </button>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default Card;
