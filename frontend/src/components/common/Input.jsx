import React, { forwardRef } from 'react';

const Input = forwardRef(({
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors';
  const validClass = 'border-gray-300 focus:border-blue-500 focus:ring-blue-200';
  const errorClass = 'border-red-300 focus:border-red-500 focus:ring-red-200';
  const disabledClass = disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '';

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          ${baseClasses}
          ${error ? errorClass : validClass}
          ${disabledClass}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
