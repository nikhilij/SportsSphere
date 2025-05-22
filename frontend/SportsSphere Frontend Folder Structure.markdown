# SportsSphere Frontend Folder Structure

This document outlines the folder structure for the SportsSphere frontend, built with Vite and React. The structure is designed to be modular, maintainable, and aligned with the Software Requirements Specification (SRS) for features like authentication, event management, club management, online store, government support, AI recommendations, and community forums. It uses Tailwind CSS for styling, React Router for navigation, and Redux Toolkit/Context API for state management.

## Folder Structure

```
sports-sphere-frontend/
├── public/                          # Static assets
│   ├── favicon.ico                  # Favicon for the app
│   ├── logo.png                     # App logo
│   └── assets/                      # Static images, fonts, etc.
│       ├── images/                  # Images for events, products, etc.
│       └── fonts/                   # Custom fonts (if any)
├── src/                             # Source code
│   ├── api/                         # API integration
│   │   ├── axiosInstance.js         # Axios setup with JWT interceptors
│   │   ├── authApi.js               # Authentication API calls (register, login, profile)
│   │   ├── eventApi.js              # Event-related API calls
│   │   ├── clubApi.js               # Club-related API calls
│   │   ├── storeApi.js              # Store-related API calls
│   │   ├── scholarshipApi.js        # Scholarship and rewards API calls
│   │   └── recommendationApi.js      # AI recommendation API calls
│   ├── assets/                      # Non-static assets (e.g., SVGs)
│   │   ├── icons/                   # SVG icons for components
│   │   └── images/                  # Reusable images
│   ├── components/                  # Reusable UI components
│   │   ├── common/                  # Shared components
│   │   │   ├── Button.jsx           # Reusable button component
│   │   │   ├── Input.jsx            # Reusable input component
│   │   │   ├── Modal.jsx            # Reusable modal component
│   │   │   ├── Loader.jsx           # Loading spinner
│   │   │   └── ErrorMessage.jsx     # Error message display
│   │   ├── layout/                  # Layout components
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── Footer.jsx           # Footer
│   │   │   └── Sidebar.jsx          # Sidebar for admin/club dashboards
│   │   ├── auth/                    # Authentication components
│   │   │   ├── LoginForm.jsx        # Login form
│   │   │   ├── RegisterForm.jsx     # Registration form
│   │   │   ├── ForgotPassword.jsx   # Password reset form
│   │   │   └── VerifyEmail.jsx      # Email verification UI
│   │   ├── event/                   # Event-related components
│   │   │   ├── EventCard.jsx        # Event card for listings
│   │   │   ├── EventForm.jsx        # Form for creating/editing events
│   │   │   ├── EventDetails.jsx     # Event detail view
│   │   │   └── QRCodeTicket.jsx     # QR code ticket display
│   │   ├── club/                    # Club-related components
│   │   │   ├── ClubCard.jsx         # Club card for listings
│   │   │   ├── ClubForm.jsx         # Form for creating/editing clubs
│   │   │   ├── MembershipForm.jsx   # Membership application form
│   │   │   └── ClubDashboard.jsx    # Club admin dashboard
│   │   ├── store/                   # Store-related components
│   │   │   ├── ProductCard.jsx      # Product card for listings
│   │   │   ├── ProductFilter.jsx    # Filter/sort for products
│   │   │   ├── Cart.jsx             # Shopping cart UI
│   │   │   └── CheckoutForm.jsx     # Checkout form with payment integration
│   │   ├── scholarship/             # Scholarship and rewards components
│   │   │   ├── ScholarshipForm.jsx  # Scholarship application form
│   │   │   ├── RewardTracker.jsx    # Reward tracking UI
│   │   │   └── AdminReview.jsx      # Admin dashboard for scholarship review
│   │   ├── community/               # Community and forum components
│   │   │   ├── ChatBox.jsx          # Live chat UI with Socket.IO
│   │   │   ├── ForumPost.jsx        # Forum post component
│   │   │   └── ForumThread.jsx      # Forum thread view
│   │   └── profile/                 # Profile-related components
│   │       ├── ProfileCard.jsx      # User/club profile summary
│   │       ├── ProfileForm.jsx      # Form for editing profile
│   │       └── AchievementList.jsx  # Display user achievements
│   ├── contexts/                    # Context API for state management (if not using Redux)
│   │   ├── AuthContext.js          # Authentication state
│   │   └── ThemeContext.js          # Theme management (e.g., dark mode)
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAuth.js              # Authentication hook
│   │   ├── useEvents.js             # Event fetching/management hook
│   │   ├── useCart.js               # Cart management hook
│   │   └── useSocket.js             # Socket.IO real-time hook
│   ├── pages/                       # Page components
│   │   ├── Home.jsx                # Homepage
│   │   ├── Events.jsx               # Events listing page
│   │   ├── EventDetails.jsx         # Single event page
│   │   ├── Clubs.jsx                # Clubs listing page
│   │   ├── ClubDetails.jsx          # Single club page
│   │   ├── Store.jsx                # Store page
│   │   ├── Cart.jsx                 # Cart page
│   │   ├── Checkout.jsx             # Checkout page
│   │   ├── Scholarship.jsx          # Scholarship application page
│   │   ├── Rewards.jsx              # Rewards tracking page
│   │   ├── Profile.jsx              # User profile page
│   │   ├── AdminDashboard.jsx       # Admin dashboard
│   │   ├── ClubDashboard.jsx        # Club admin dashboard
│   │   ├── Forums.jsx               # Forums page
│   │   ├── Login.jsx                # Login page
│   │   ├── Register.jsx             # Registration page
│   │   └── NotFound.jsx             # 404 page
│   ├── redux/                       # Redux Toolkit setup (optional)
│   │   ├── slices/                  # Redux slices
│   │   │   ├── authSlice.js         # Authentication state
│   │   │   ├── eventSlice.js        # Event state
│   │   │   ├── cartSlice.js         # Cart state
│   │   │   └── clubSlice.js         # Club state
│   │   └── store.js                 # Redux store configuration
│   ├── routes/                      # Route configuration
│   │   ├── AppRoutes.jsx            # Main router with React Router
│   │   └── ProtectedRoute.jsx       # Route guard for authenticated users
│   ├── styles/                      # Styling files
│   │   ├── tailwind.css             # Tailwind CSS imports
│   │   └── global.css               # Global styles (if needed)
│   ├── utils/                       # Utility functions
│   │   ├── formatDate.js            # Date formatting for events
│   │   ├── validateInput.js         # Input validation for forms
│   │   ├── uploadToS3.js            # AWS S3 upload utility
│   │   └── constants.js             # Constants (e.g., API URLs, roles)
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # Entry point for Vite
│   └── index.html                   # HTML template
├── .env                             # Environment variables (e.g., API base URL)
├── .gitignore                       # Git ignore file
├── package.json                     # Project dependencies and scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration for Tailwind
└── README.md                        # Project setup instructions
```

## Explanation of Key Directories and Files

- **public/**: Stores static assets like favicon, logos, and images used in the app.
- **src/api/**: Contains Axios setup with interceptors for JWT and API call modules for each feature (auth, events, clubs, store, scholarships, recommendations).
- **src/assets/**: Holds reusable assets like SVGs and images that are imported in the code.
- **src/components/**: Organized by feature (auth, event, club, store, scholarship, community, profile) with reusable components like cards, forms, and modals.
- **src/contexts/**: Manages global state using Context API (e.g., for auth and theme) if Redux is not used.
- **src/hooks/**: Custom hooks for managing authentication, events, cart, and real-time Socket.IO connections.
- **src/pages/**: Page components corresponding to routes, covering all major views like Home, Events, Store, and dashboards.
- **src/redux/**: Optional Redux Toolkit setup for state management if preferred over Context API.
- **src/routes/**: Configures React Router with protected routes for authenticated users.
- **src/styles/**: Tailwind CSS setup and any global styles.
- **src/utils/**: Utility functions for formatting, validation, and S3 uploads.
- **Root files**: Standard Vite files (`main.jsx`, `index.html`), configuration files (`vite.config.js`, `tailwind.config.js`), and environment setup (`.env`).

## Setup Instructions

1. Initialize the project:
   ```bash
   npm create vite@latest sports-sphere-frontend -- --template react
   cd sports-sphere-frontend
   npm install
   ```

2. Install dependencies:
   ```bash
   npm install react-router-dom axios tailwindcss postcss autoprefixer @tailwindcss/vite redux-toolkit react-icons socket.io-client
   ```

3. Set up Tailwind CSS:
   ```bash
   npx tailwindcss init -p
   ```

4. Create the `.env` file in the root:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   VITE_RAZORPAY_KEY=your_razorpay_key
   VITE_AWS_S3_BUCKET=your_s3_bucket
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Notes
- The structure is modular, with components grouped by feature to align with the SRS modules (e.g., event, club, store).
- Use Tailwind CSS for styling to ensure consistency and responsiveness, as specified in the SRS.
- The `axiosInstance.js` includes interceptors for JWT headers to handle authentication.
- The `useSocket.js` hook integrates Socket.IO for real-time features like event updates and live chat.
- Protected routes (`washere
- This structure avoids unnecessary files, focusing only on what's required for SportsSphere's functionality.
- For scalability, components are reusable, and the structure supports microservices architecture by isolating API calls per feature.

This folder structure provides a clean, organized foundation for building the SportsSphere frontend, ensuring maintainability and alignment with the SRS requirements.