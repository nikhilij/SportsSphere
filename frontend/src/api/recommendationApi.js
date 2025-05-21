import axiosInstance from './axiosInstance';

const recommendationApi = {
  getEventRecommendations: async () => {
    const response = await axiosInstance.get('/recommendations/events');
    return response.data;
  },
  
  getClubRecommendations: async () => {
    const response = await axiosInstance.get('/recommendations/clubs');
    return response.data;
  },
  
  getProductRecommendations: async () => {
    const response = await axiosInstance.get('/recommendations/products');
    return response.data;
  },
  
  getScholarshipRecommendations: async () => {
    const response = await axiosInstance.get('/recommendations/scholarships');
    return response.data;
  },
  
  // Provide user preferences to improve recommendations
  updateUserPreferences: async (preferencesData) => {
    const response = await axiosInstance.post('/recommendations/preferences', preferencesData);
    return response.data;
  },
  
  // For content-based recommendations
  getRelatedEvents: async (eventId) => {
    const response = await axiosInstance.get(`/recommendations/events/related/${eventId}`);
    return response.data;
  },
  
  getRelatedClubs: async (clubId) => {
    const response = await axiosInstance.get(`/recommendations/clubs/related/${clubId}`);
    return response.data;
  },
  
  getRelatedProducts: async (productId) => {
    const response = await axiosInstance.get(`/recommendations/products/related/${productId}`);
    return response.data;
  },
};

export default recommendationApi;
