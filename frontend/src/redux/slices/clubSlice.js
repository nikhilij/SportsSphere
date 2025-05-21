import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clubs: [],
  club: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 0,
    totalClubs: 0,
  },
  filters: {
    category: '',
    location: '',
    searchText: '',
    sortBy: 'name',
  },
};

export const clubSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    fetchClubsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchClubsSuccess: (state, action) => {
      state.loading = false;
      state.clubs = action.payload.clubs;
      state.pagination = action.payload.pagination || state.pagination;
      state.error = null;
    },
    fetchClubsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchClubStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchClubSuccess: (state, action) => {
      state.loading = false;
      state.club = action.payload;
      state.error = null;
    },
    fetchClubFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createClubStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createClubSuccess: (state, action) => {
      state.loading = false;
      state.clubs = [action.payload, ...state.clubs];
      state.error = null;
    },
    createClubFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateClubStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateClubSuccess: (state, action) => {
      state.loading = false;
      state.clubs = state.clubs.map((club) =>
        club._id === action.payload._id ? action.payload : club
      );
      if (state.club && state.club._id === action.payload._id) {
        state.club = action.payload;
      }
      state.error = null;
    },
    updateClubFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteClubStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteClubSuccess: (state, action) => {
      state.loading = false;
      state.clubs = state.clubs.filter(
        (club) => club._id !== action.payload
      );
      if (state.club && state.club._id === action.payload) {
        state.club = null;
      }
      state.error = null;
    },
    deleteClubFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    joinClubStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    joinClubSuccess: (state, action) => {
      state.loading = false;
      if (state.club && state.club._id === action.payload.clubId) {
        state.club = {
          ...state.club,
          isMember: true,
          members: [...(state.club.members || []), action.payload.membership],
        };
      }
      state.error = null;
    },
    joinClubFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    leaveClubStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    leaveClubSuccess: (state, action) => {
      state.loading = false;
      if (state.club && state.club._id === action.payload) {
        state.club = {
          ...state.club,
          isMember: false,
          // To correctly update members array, we'd need the user ID
          // This simplified version just assumes API handles this
        };
      }
      state.error = null;
    },
    leaveClubFailure: (state, action) => {
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
    clearClub: (state) => {
      state.club = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchClubsStart,
  fetchClubsSuccess,
  fetchClubsFailure,
  fetchClubStart,
  fetchClubSuccess,
  fetchClubFailure,
  createClubStart,
  createClubSuccess,
  createClubFailure,
  updateClubStart,
  updateClubSuccess,
  updateClubFailure,
  deleteClubStart,
  deleteClubSuccess,
  deleteClubFailure,
  joinClubStart,
  joinClubSuccess,
  joinClubFailure,
  leaveClubStart,
  leaveClubSuccess,
  leaveClubFailure,
  setFilters,
  setPage,
  clearClub,
  clearError,
} = clubSlice.actions;

export default clubSlice.reducer;
