import axiosInstance from './axiosInstance';

const scholarshipApi = {
  getAllScholarships: async (params = {}) => {
    const response = await axiosInstance.get('/scholarships', { params });
    return response.data;
  },
  
  getScholarship: async (id) => {
    const response = await axiosInstance.get(`/scholarships/${id}`);
    return response.data;
  },
  
  createScholarship: async (scholarshipData) => {
    const response = await axiosInstance.post('/scholarships', scholarshipData);
    return response.data;
  },
  
  updateScholarship: async (id, scholarshipData) => {
    const response = await axiosInstance.put(`/scholarships/${id}`, scholarshipData);
    return response.data;
  },
  
  deleteScholarship: async (id) => {
    const response = await axiosInstance.delete(`/scholarships/${id}`);
    return response.data;
  },
  
  applyForScholarship: async (id, applicationData) => {
    const response = await axiosInstance.post(`/scholarships/${id}/apply`, applicationData);
    return response.data;
  },
  
  // For admins
  reviewApplication: async (applicationId, reviewData) => {
    const response = await axiosInstance.put(`/scholarships/applications/${applicationId}/review`, reviewData);
    return response.data;
  },
  
  // Rewards
  getUserRewards: async () => {
    const response = await axiosInstance.get('/rewards');
    return response.data;
  },
  
  redeemReward: async (id) => {
    const response = await axiosInstance.post(`/rewards/${id}/redeem`);
    return response.data;
  },
};

export default scholarshipApi;
