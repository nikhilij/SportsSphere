import axiosInstance from './axiosInstance';

const clubApi = {
  getAllClubs: async (params = {}) => {
    const response = await axiosInstance.get('/clubs', { params });
    return response.data;
  },
  
  getClub: async (id) => {
    const response = await axiosInstance.get(`/clubs/${id}`);
    return response.data;
  },
  
  createClub: async (clubData) => {
    const response = await axiosInstance.post('/clubs', clubData);
    return response.data;
  },
  
  updateClub: async (id, clubData) => {
    const response = await axiosInstance.put(`/clubs/${id}`, clubData);
    return response.data;
  },
  
  deleteClub: async (id) => {
    const response = await axiosInstance.delete(`/clubs/${id}`);
    return response.data;
  },
  
  joinClub: async (id, membershipData) => {
    const response = await axiosInstance.post(`/clubs/${id}/join`, membershipData);
    return response.data;
  },
  
  leaveClub: async (id) => {
    const response = await axiosInstance.delete(`/clubs/${id}/leave`);
    return response.data;
  },
  
  getMembers: async (id) => {
    const response = await axiosInstance.get(`/clubs/${id}/members`);
    return response.data;
  },
  
  getClubEvents: async (id) => {
    const response = await axiosInstance.get(`/clubs/${id}/events`);
    return response.data;
  },
};

export default clubApi;
