const Joi = require('joi');

// Common validation schemas
const commonSchemas = {
    id: Joi.string().uuid().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]')).required(),
    phone: Joi.string().pattern(new RegExp('^[+]?[1-9]\\d{1,14}$')).optional(),
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(1000).optional(),
    date: Joi.date().iso().optional(),
    boolean: Joi.boolean().optional(),
    url: Joi.string().uri().optional(),
    number: Joi.number().optional(),
    positiveNumber: Joi.number().positive().optional(),
    integer: Joi.number().integer().optional(),
    positiveInteger: Joi.number().integer().positive().optional()
};

// User validation schemas
const userSchemas = {
    register: Joi.object({
        firstName: commonSchemas.name,
        lastName: commonSchemas.name,
        email: commonSchemas.email,
        password: commonSchemas.password,
        phone: commonSchemas.phone,
        dateOfBirth: commonSchemas.date,
        gender: Joi.string().valid('male', 'female', 'other').optional(),
        location: Joi.string().max(100).optional(),
        profilePicture: commonSchemas.url
    }),

    login: Joi.object({
        email: commonSchemas.email,
        password: Joi.string().required()
    }),

    updateProfile: Joi.object({
        firstName: Joi.string().min(2).max(50).optional(),
        lastName: Joi.string().min(2).max(50).optional(),
        phone: commonSchemas.phone,
        dateOfBirth: commonSchemas.date,
        gender: Joi.string().valid('male', 'female', 'other').optional(),
        location: Joi.string().max(100).optional(),
        profilePicture: commonSchemas.url,
        bio: Joi.string().max(500).optional()
    }),

    changePassword: Joi.object({
        currentPassword: Joi.string().required(),
        newPassword: commonSchemas.password
    })
};

// Event validation schemas
const eventSchemas = {
    create: Joi.object({
        title: commonSchemas.name,
        description: commonSchemas.description,
        eventType: Joi.string().valid('tournament', 'practice', 'match', 'training').required(),
        sport: Joi.string().required(),
        location: Joi.string().required(),
        startDate: Joi.date().iso().greater('now').required(),
        endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
        maxParticipants: commonSchemas.positiveInteger,
        registrationFee: commonSchemas.positiveNumber,
        prizes: Joi.array().items(Joi.string()).optional(),
        rules: Joi.array().items(Joi.string()).optional(),
        image: commonSchemas.url
    }),

    update: Joi.object({
        title: Joi.string().min(2).max(50).optional(),
        description: commonSchemas.description,
        location: Joi.string().optional(),
        startDate: Joi.date().iso().optional(),
        endDate: Joi.date().iso().optional(),
        maxParticipants: commonSchemas.positiveInteger,
        registrationFee: commonSchemas.positiveNumber,
        prizes: Joi.array().items(Joi.string()).optional(),
        rules: Joi.array().items(Joi.string()).optional(),
        image: commonSchemas.url,
        status: Joi.string().valid('upcoming', 'ongoing', 'completed', 'cancelled').optional()
    })
};

// Chat validation schemas
const chatSchemas = {
    sendMessage: Joi.object({
        chatId: commonSchemas.id,
        content: Joi.string().min(1).max(1000).required(),
        messageType: Joi.string().valid('text', 'image', 'file').default('text')
    }),

    createGroup: Joi.object({
        name: commonSchemas.name,
        description: commonSchemas.description,
        participants: Joi.array().items(commonSchemas.id).min(2).required()
    })
};

// Order validation schemas
const orderSchemas = {
    create: Joi.object({
        items: Joi.array().items(Joi.object({
            productId: commonSchemas.id,
            quantity: commonSchemas.positiveInteger.required(),
            price: commonSchemas.positiveNumber.required()
        })).min(1).required(),
        shippingAddress: Joi.object({
            street: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            zipCode: Joi.string().required(),
            country: Joi.string().required()
        }).required(),
        paymentMethod: Joi.string().valid('card', 'paypal', 'bank_transfer').required()
    })
};

// Reward validation schemas
const rewardSchemas = {
    create: Joi.object({
        name: commonSchemas.name,
        description: commonSchemas.description,
        type: Joi.string().valid('discount', 'freebie', 'points', 'badge', 'achievement').required(),
        value: commonSchemas.positiveNumber,
        image: commonSchemas.url,
        pointsRequired: commonSchemas.positiveInteger,
        expiryDate: commonSchemas.date
    }),

    redeem: Joi.object({
        rewardId: commonSchemas.id
    })
};

// Generic validation middleware
const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors
            });
        }

        req[property] = value;
        next();
    };
};

// ID parameter validation
const validateId = (paramName = 'id') => {
    return validateRequest(
        Joi.object({ [paramName]: commonSchemas.id }),
        'params'
    );
};

// Query parameter validation
const validateQuery = (schema) => {
    return validateRequest(schema, 'query');
};

// Pagination query validation
const paginationQuery = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string().optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc')
});

module.exports = {
    commonSchemas,
    userSchemas,
    eventSchemas,
    chatSchemas,
    orderSchemas,
    rewardSchemas,
    validateRequest,
    validateId,
    validateQuery,
    paginationQuery
};