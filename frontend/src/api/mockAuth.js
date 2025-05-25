// Mock Authentication Service for development/testing

const USERS_STORAGE_KEY = "sportssphere_users";
const CURRENT_USER_KEY = "sportssphere_current_user";
const TOKEN_KEY = "sportssphere_token";

// Generate mock JWT token
const generateMockToken = (userId) => {
   const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
   const payload = btoa(
      JSON.stringify({
         id: userId,
         iat: Math.floor(Date.now() / 1000),
         exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
      })
   );
   const signature = btoa("mock-signature");
   return `${header}.${payload}.${signature}`;
};

// Initialize mock data if needed
const initializeMockData = () => {
   if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
   }
};

// Helper to get users array
const getUsers = () => {
   return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]");
};

// Helper to save users array
const saveUsers = (users) => {
   localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Register a new user
export const register = async (userData) => {
   initializeMockData();
   const users = getUsers();

   // Check if email already exists
   if (users.some((user) => user.email === userData.email)) {
      throw new Error("Email already registered");
   }

   // Create new user with ID
   const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      sportsPreferences: userData.sportsPreferences || [],
      role: userData.role || "user",
      isVerified: false,
      isActive: true,
      createdAt: new Date().toISOString(),
   };

   // Save to "database"
   users.push(newUser);
   saveUsers(users);

   // Generate token
   const token = generateMockToken(newUser.id);

   // Return success without password
   const { password, ...userWithoutPassword } = newUser;
   return {
      success: true,
      user: userWithoutPassword,
      token,
      status: "success",
      data: { user: userWithoutPassword },
   };
};

// Login user
export const login = async (email, password) => {
   initializeMockData();
   const users = getUsers();

   const user = users.find((u) => u.email === email && u.password === password);

   if (!user) {
      throw new Error("Invalid credentials");
   }

   // Generate token
   const token = generateMockToken(user.id);

   // Store current user and token
   const { password: _, ...userWithoutPassword } = user;
   localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
   localStorage.setItem(TOKEN_KEY, token);

   return {
      success: true,
      user: userWithoutPassword,
      token,
      status: "success",
      data: { user: userWithoutPassword },
   };
};

// Logout user
export const logout = () => {
   localStorage.removeItem(CURRENT_USER_KEY);
   localStorage.removeItem(TOKEN_KEY);
   return { success: true };
};

// Get current logged in user
export const getCurrentUser = () => {
   const userJson = localStorage.getItem(CURRENT_USER_KEY);
   return userJson ? JSON.parse(userJson) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
   return !!getCurrentUser();
};

// Update user profile
export const updateUserProfile = (userData) => {
   const currentUser = getCurrentUser();
   if (!currentUser) {
      return { success: false, message: "Not authenticated" };
   }

   const users = getUsers();
   const userIndex = users.findIndex((u) => u.id === currentUser.id);

   if (userIndex === -1) {
      return { success: false, message: "User not found" };
   }

   // Update user data
   users[userIndex] = { ...users[userIndex], ...userData };
   saveUsers(users);

   // Update current user in localStorage
   const { password, ...userWithoutPassword } = users[userIndex];
   localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

   return { success: true, user: userWithoutPassword };
};
