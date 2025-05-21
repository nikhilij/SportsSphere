import axiosInstance from './axiosInstance';

const eventApi = {
  getAllEvents: async (params = {}) => {
    const response = await axiosInstance.get('/events', { params });
    return response.data;
  },
  
  getEvent: async (id) => {
    const response = await axiosInstance.get(`/events/${id}`);
    return response.data;
  },
  
  createEvent: async (eventData) => {
    const response = await axiosInstance.post('/events', eventData);
    return response.data;
  },
  
  updateEvent: async (id, eventData) => {
    const response = await axiosInstance.put(`/events/${id}`, eventData);
    return response.data;
  },
  
  deleteEvent: async (id) => {
    const response = await axiosInstance.delete(`/events/${id}`);
    return response.data;
  },
  
  registerForEvent: async (id, registrationData) => {
    const response = await axiosInstance.post(`/events/${id}/register`, registrationData);
    return response.data;
  },
  
  cancelRegistration: async (id) => {
    const response = await axiosInstance.delete(`/events/${id}/register`);
    return response.data;
  },
  
  getTicket: async (id) => {
    const response = await axiosInstance.get(`/events/${id}/ticket`);
    return response.data;
  },
};

export default eventApi;
