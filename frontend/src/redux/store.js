import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import eventReducer from './slices/eventSlice';
import cartReducer from './slices/cartSlice';
import clubReducer from './slices/clubSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    cart: cartReducer,
    clubs: clubReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['register/uploadImage', 'profile/uploadImage'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.file'],
        // Ignore these paths in the state
        ignoredPaths: [],
      },
    }),
});

export default store;
