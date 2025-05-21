# SportsSphere Backend Folder Structure

This document outlines the folder structure for the SportsSphere backend, built with Node.js and Express.js. The structure is designed to be modular, scalable, and aligned with the Software Requirements Specification (SRS) for features like authentication, event management, club management, online store, government support, AI recommendations, and community forums. It uses PostgreSQL for structured data, MongoDB for dynamic content, Redis for caching, and integrates with third-party services like Stripe/Razorpay, AWS S3, and government APIs. The architecture follows the MVC pattern with separate layers for controllers, services, and data access objects (DAOs).

## Folder Structure

```
sports-sphere-backend/
├── config/                          # Configuration files
│   ├── database.js                  # Database connections (PostgreSQL, MongoDB)
│   ├── redis.js                     # Redis connection setup
│   ├── aws.js                       # AWS S3 configuration
│   ├── stripe.js                    # Stripe/Razorpay configuration
│   ├── socket.js                    # Socket.IO setup for real-time
│   └── constants.js                 # App-wide constants (e.g., roles, statuses)
├── controllers/                     # Request handlers (business logic entry points)
│   ├── authController.js            # Authentication (register, login, profile)
│   ├── eventController.js           # Event CRUD and registration
│   ├── clubController.js            # Club and membership management
│   ├── storeController.js           # Store product and checkout operations
│   ├── scholarshipController.js     # Scholarship and rewards management
│   ├── recommendationController.js  # AI-driven recommendations
│   └── communityController.js       # Forum and chat management
├── middlewares/                     # Express middlewares
│   ├── jwtAuth.js                   # JWT authentication middleware
│   ├── errorHandler.js              # Global error handling
│   ├── rateLimiter.js               # Rate limiting with Redis
│   ├── cors.js                      # CORS configuration
│   ├── inputValidation.js           # Input sanitization and validation
│   └── roleBasedAccess.js           # Role-based access control
├── models/                          # Database schemas/models
│   ├── postgres/                    # PostgreSQL models (Sequelize/Prisma)
│   │   ├── User.js                  # User schema (athletes, admins, etc.)
│   │   ├── Event.js                 # Event schema
│   │   ├── Club.js                  # Club schema
│   │   ├── Order.js                 # Order schema for store
│   │   ├── Scholarship.js           # Scholarship schema
│   │   └── Reward.js                # Reward schema
│   ├── mongo/                       # MongoDB models (Mongoose)
│   │   ├── Chat.js                  # Chat logs schema
│   │   └── Forum.js                 # Forum posts schema
├── routes/                          # API route definitions
│   ├── authRoutes.js                # Authentication routes (/api/auth)
│   ├── eventRoutes.js               # Event routes (/api/events)
│   ├── clubRoutes.js                # Club routes (/api/clubs)
│   ├── storeRoutes.js               # Store routes (/api/store)
│   ├── scholarshipRoutes.js         # Scholarship routes (/api/scholarships)
│   ├── recommendationRoutes.js      # Recommendation routes (/api/recommendations)
│   ├── communityRoutes.js           # Community routes (/api/community)
│   └── index.js                     # Main router to combine all routes
├── services/                        # Business logic layer
│   ├── authService.js               # Authentication logic (JWT, OAuth)
│   ├── eventService.js              # Event creation, registration, updates
│   ├── clubService.js               # Club and membership management
│   ├── storeService.js              # Store product and payment processing
│   ├── scholarshipService.js        # Scholarship and reward processing
│   ├── recommendationService.js     # AI recommendation logic (AWS SageMaker)
│   ├── communityService.js          # Chat and forum logic
│   └── notificationService.js       # Email and push notifications
├── daos/                            # Data Access Objects (database queries)
│   ├── postgres/                    # PostgreSQL query logic
│   │   ├── userDao.js               # User queries
│   │   ├── eventDao.js              # Event queries
│   │   ├── clubDao.js               # Club queries
│   │   ├── orderDao.js              # Order queries
│   │   ├── scholarshipDao.js        # Scholarship queries
│   │   └── rewardDao.js             # Reward queries
│   ├── mongo/                       # MongoDB query logic
│   │   ├── chatDao.js               # Chat queries
│   │   └── forumDao.js              # Forum queries
├── jobs/                            # Cron jobs (using Node-Cron)
│   ├── eventReminder.js             # Send event reminders
│   ├── scholarshipDeadline.js       # Notify scholarship deadlines
│   └── cleanupExpiredSessions.js    # Clear expired Redis sessions
├── utils/                           # Utility functions
│   ├── logger.js                    # Logging with Winston
│   ├── error.js                     # Custom error classes
│   ├── s3Upload.js                  # AWS S3 upload utility
│   ├── validate.js                  # Input validation helpers
│   ├── jwt.js                       # JWT token generation/verification
│   └── socketEvents.js              # Socket.IO event handlers
├── tests/                           # Automated tests
│   ├── unit/                        # Unit tests (Jest/Mocha)
│   │   ├── auth.test.js             # Authentication tests
│   │   ├── event.test.js            # Event tests
│   │   └── store.test.js            # Store tests
│   ├── integration/                 # Integration tests
│   │   ├── authIntegration.test.js  # Authentication integration tests
│   │   └── eventIntegration.test.js # Event integration tests
├── docs/                            # Documentation
│   ├── swagger.yaml                 # Swagger/OpenAPI spec
│   └── postman_collection.json      # Postman collection for API testing
├── .env                             # Environment variables
├── .gitignore                       # Git ignore file
├── package.json                     # Project dependencies and scripts
├── server.js                        # Main entry point
├── pm2.config.js                    # PM2 configuration for process management
└── README.md                        # Project setup instructions
```

## Explanation of Key Directories and Files

- **config/**: Stores configuration for databases (PostgreSQL, MongoDB), Redis, AWS S3, Stripe/Razorpay, and Socket.IO. The `constants.js` file defines app-wide constants like user roles and event statuses.
- **controllers/**: Handles HTTP requests and responses, delegating business logic to services. Each controller corresponds to a feature (e.g., `authController.js` for authentication).
- **middlewares/**: Includes Express middlewares for authentication (`jwtAuth.js`), error handling, rate limiting, CORS, input validation, and role-based access control, as required by the SRS.
- **models/**: Defines database schemas. PostgreSQL models (using Sequelize or Prisma) handle structured data (users, events, orders), while MongoDB models (using Mongoose) handle dynamic content (chats, forums).
- **routes/**: Defines RESTful API endpoints for each feature, with `index.js` combining all routes under `/api`.
- **services/**: Contains business logic for each feature, interacting with DAOs and external APIs (e.g., Stripe, AWS SageMaker, government APIs).
- **daos/**: Encapsulates database queries, separating data access from business logic for maintainability.
- **jobs/**: Implements cron jobs using Node-Cron for tasks like event reminders and scholarship deadline notifications.
- **utils/**: Provides reusable utilities for logging (Winston), error handling, S3 uploads, input validation, JWT management, and Socket.IO event handling.
- **tests/**: Includes unit and integration tests using Jest or Mocha, covering key features like authentication, events, and store operations.
- **docs/**: Contains Swagger/OpenAPI documentation and a Postman collection for API testing, as specified in the SRS.
- **Root files**: Includes `server.js` (main entry point), `pm2.config.js` (for process management), `.env` (environment variables), and `README.md` (setup instructions).

## Setup Instructions

1. Initialize the project:
   ```bash
   mkdir sports-sphere-backend
   cd sports-sphere-backend
   npm init -y
   ```

2. Install dependencies:
   ```bash
   npm install express sequelize mongoose redis node-cron aws-sdk stripe razorpay socket.io winston sentry cors jsonwebtoken express-rate-limit dotenv jest mocha
   ```

3. Create the `.env` file in the root:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/sportssphere
   POSTGRES_URI=postgres://user:password@localhost:5432/sportssphere
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET=your_stripe_secret_key
   RAZORPAY_KEY=your_razorpay_key
   AWS_S3_ACCESS_KEY=your_aws_access_key
   AWS_S3_SECRET_KEY=your_aws_secret_key
   GOVERNMENT_API_URL=your_government_api_url
   SENTRY_DSN=your_sentry_dsn
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. For production, use PM2:
   ```bash
   npm install -g pm2
   pm2 start pm2.config.js
   ```

## Sample `pm2.config.js`
```javascript
module.exports = {
  apps: [
    {
      name: 'sports-sphere-backend',
      script: 'server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
```

## Notes
- The structure adheres to the MVC architecture, with clear separation of concerns (controllers, services, DAOs).
- Middlewares ensure security (JWT, rate limiting, input validation) and compliance with GDPR and PCI DSS, as per the SRS.
- PostgreSQL handles structured data (users, events, orders), while MongoDB manages dynamic content (chats, forums).
- Redis is used for caching and session management to meet the <2s response time requirement for 95% of requests.
- Socket.IO is integrated for real-time event updates and live chat, as specified.
- Cron jobs handle scheduled tasks like reminders and session cleanup.
- The structure supports horizontal scaling with AWS Elastic Load Balancer and database sharding, as required.
- Logging with Winston and Sentry ensures comprehensive monitoring, and tests with Jest/Mocha ensure maintainability.
- The Swagger documentation and Postman collection in `docs/` align with the SRS for API testing.

This folder structure provides a robust, modular foundation for the SportsSphere backend, meeting all functional and non-functional requirements outlined in the SRS.