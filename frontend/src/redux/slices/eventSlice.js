import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  event: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 0,
    totalEvents: 0,
  },
  filters: {
    category: '',
    dateRange: null,
    location: '',
    searchText: '',
    sortBy: 'date',
  },
};

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    fetchEventsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess: (state, action) => {
      state.loading = false;
      state.events = action.payload.events;
      state.pagination = action.payload.pagination || state.pagination;
      state.error = null;
    },
    fetchEventsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchEventStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEventSuccess: (state, action) => {
      state.loading = false;
      state.event = action.payload;
      state.error = null;
    },
    fetchEventFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createEventStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createEventSuccess: (state, action) => {
      state.loading = false;
      state.events = [action.payload, ...state.events];
      state.error = null;
    },
    createEventFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateEventStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateEventSuccess: (state, action) => {
      state.loading = false;
      state.events = state.events.map((event) =>
        event._id === action.payload._id ? action.payload : event
      );
      if (state.event && state.event._id === action.payload._id) {
        state.event = action.payload;
      }
      state.error = null;
    },
    updateEventFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteEventStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteEventSuccess: (state, action) => {
      state.loading = false;
      state.events = state.events.filter(
        (event) => event._id !== action.payload
      );
      if (state.event && state.event._id === action.payload) {
        state.event = null;
      }
      state.error = null;
    },
    deleteEventFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerForEventStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerForEventSuccess: (state, action) => {
      state.loading = false;
      if (state.event && state.event._id === action.payload.eventId) {
        state.event = {
          ...state.event,
          isRegistered: true,
          attendees: [...(state.event.attendees || []), action.payload.registration],
        };
      }
      state.error = null;
    },
    registerForEventFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    clearEvent: (state) => {
      state.event = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsFailure,
  fetchEventStart,
  fetchEventSuccess,
  fetchEventFailure,
  createEventStart,
  createEventSuccess,
  createEventFailure,
  updateEventStart,
  updateEventSuccess,
  updateEventFailure,
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailure,
  registerForEventStart,
  registerForEventSuccess,
  registerForEventFailure,
  setFilters,
  setPage,
  clearEvent,
  clearError,
} = eventSlice.actions;

export default eventSlice.reducer;
