/**
 * Validate input based on type
 * @param {string} value - The value to validate
 * @param {string} type - The type of validation to perform
 * @param {object} options - Additional validation options
 * @returns {object} Validation result { isValid, error }
 */
export const validateInput = (value, type, options = {}) => {
  // Default result if no validation is performed
  const defaultResult = { isValid: true, error: null };

  // Return immediately if no value or type
  if (!type || value === undefined) return defaultResult;

  // Handle empty values based on required option
  if (value === '' || value === null) {
    return options.required
      ? { isValid: false, error: 'This field is required' }
      : defaultResult;
  }

  // Run the appropriate validation based on type
  switch (type) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value, options);
    case 'name':
      return validateName(value);
    case 'phone':
      return validatePhone(value);
    case 'url':
      return validateUrl(value);
    case 'number':
      return validateNumber(value, options);
    case 'date':
      return validateDate(value, options);
    case 'file':
      return validateFile(value, options);
    case 'match':
      return validateMatch(value, options.matchWith, options.matchLabel);
    default:
      return defaultResult;
  }
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {object} Validation result
 */
export const validateEmail = (email) => {
  // Simple email regex - not comprehensive but catches most errors
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  
  return {
    isValid,
    error: isValid ? null : 'Please enter a valid email address'
  };
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @param {object} options - Validation options
 * @returns {object} Validation result
 */
export const validatePassword = (password, options = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecial = true,
  } = options;

  // Check minimum length
  if (password.length < minLength) {
    return {
      isValid: false,
      error: `Password must be at least ${minLength} characters`
    };
  }

  // Check for uppercase letters
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must include at least one uppercase letter'
    };
  }

  // Check for lowercase letters
  if (requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must include at least one lowercase letter'
    };
  }

  // Check for numbers
  if (requireNumbers && !/\d/.test(password)) {
    return {
      isValid: false,
      error: 'Password must include at least one number'
    };
  }

  // Check for special characters
  if (requireSpecial && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must include at least one special character'
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate name format
 * @param {string} name - Name to validate
 * @returns {object} Validation result
 */
export const validateName = (name) => {
  if (name.length < 2) {
    return {
      isValid: false,
      error: 'Name must be at least 2 characters'
    };
  }

  // Check for invalid characters
  if (/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(name)) {
    return {
      isValid: false,
      error: 'Name cannot contain numbers or special characters'
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {object} Validation result
 */
export const validatePhone = (phone) => {
  // Remove common phone formatting characters
  const cleanPhone = phone.replace(/[-\s()+]/g, '');
  
  // Check if it's only digits and reasonable length
  if (!/^\d{10,15}$/.test(cleanPhone)) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number'
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {object} Validation result
 */
export const validateUrl = (url) => {
  try {
    // Check if URL is valid by trying to construct URL object
    new URL(url);
    return { isValid: true, error: null };
  } catch (err) {
    return {
      isValid: false,
      error: 'Please enter a valid URL (include https://)'
    };
  }
};

/**
 * Validate number within range
 * @param {string|number} value - Number to validate
 * @param {object} options - Validation options
 * @returns {object} Validation result
 */
export const validateNumber = (value, options = {}) => {
  const { min, max } = options;
  const numberValue = Number(value);

  if (isNaN(numberValue)) {
    return {
      isValid: false,
      error: 'Please enter a valid number'
    };
  }

  if (min !== undefined && numberValue < min) {
    return {
      isValid: false,
      error: `Value must be at least ${min}`
    };
  }

  if (max !== undefined && numberValue > max) {
    return {
      isValid: false,
      error: `Value must be at most ${max}`
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate date
 * @param {string|Date} value - Date to validate
 * @param {object} options - Validation options
 * @returns {object} Validation result
 */
export const validateDate = (value, options = {}) => {
  const { minDate, maxDate } = options;
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return {
      isValid: false,
      error: 'Please enter a valid date'
    };
  }

  if (minDate && date < new Date(minDate)) {
    return {
      isValid: false,
      error: `Date must be after ${new Date(minDate).toLocaleDateString()}`
    };
  }

  if (maxDate && date > new Date(maxDate)) {
    return {
      isValid: false,
      error: `Date must be before ${new Date(maxDate).toLocaleDateString()}`
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate file type and size
 * @param {File} file - File to validate
 * @param {object} options - Validation options
 * @returns {object} Validation result
 */
export const validateFile = (file, options = {}) => {
  const { 
    maxSizeMB = 5, 
    allowedTypes = [] 
  } = options;

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `File size exceeds the ${maxSizeMB}MB limit`
    };
  }

  // Check file type if types are restricted
  if (allowedTypes.length > 0) {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const mimeType = file.type;
    
    const isValidType = allowedTypes.some(type => {
      return mimeType.includes(type) || fileExtension === type;
    });
    
    if (!isValidType) {
      return {
        isValid: false,
        error: `File type not allowed. Supported types: ${allowedTypes.join(', ')}`
      };
    }
  }

  return { isValid: true, error: null };
};

/**
 * Validate that two values match (e.g., password confirmation)
 * @param {string} value - Value to validate
 * @param {string} matchWith - Value to match against
 * @param {string} matchLabel - Label of the field to match
 * @returns {object} Validation result
 */
export const validateMatch = (value, matchWith, matchLabel = 'fields') => {
  if (value !== matchWith) {
    return {
      isValid: false,
      error: `The ${matchLabel} do not match`
    };
  }
  return { isValid: true, error: null };
};

export default {
  validateInput,
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateUrl,
  validateNumber,
  validateDate,
  validateFile,
  validateMatch
};
