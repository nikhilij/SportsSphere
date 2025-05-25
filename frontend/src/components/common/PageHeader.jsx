import React from "react";

const PageHeader = ({ title, subtitle, icon, className = "", centerAlign = true }) => {
   return (
      <div className={`mb-12 ${centerAlign ? "text-center" : ""} ${className}`}>
         {icon && (
            <span role="img" aria-label={title} className="text-6xl mb-4 block">
               {icon}
            </span>
         )}
         <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
         {subtitle && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
   );
};

export default PageHeader;
