import React from 'react';

const Loader = ({ size = 'medium', fullScreen = false, text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  const spinnerClasses = `
    inline-block rounded-full border-blue-600 border-solid 
    animate-spin border-t-transparent ${sizeClasses[size]}
  `;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75 z-50">
        <div className={spinnerClasses}></div>
        {text && <p className="mt-4 text-gray-700">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className={spinnerClasses}></div>
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
};

export default Loader;
