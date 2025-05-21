import { useState, useEffect, useCallback } from 'react';
import eventApi from '../api/eventApi';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all events
  const fetchEvents = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await eventApi.getAllEvents(params);
      setEvents(data.events || []);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch events');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single event by id
  const fetchEvent = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await eventApi.getEvent(id);
      setEvent(data.event);
      return data.event;
    } catch (err) {
      setError(err.message || 'Failed to fetch event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new event
  const createEvent = useCallback(async (eventData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventApi.createEvent(eventData);
      setEvents((prevEvents) => [response.event, ...prevEvents]);
      return response;
    } catch (err) {
      setError(err.message || 'Failed to create event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an event
  const updateEvent = useCallback(async (id, eventData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventApi.updateEvent(id, eventData);
      setEvents((prevEvents) =>
        prevEvents.map((e) => (e._id === id ? response.event : e))
      );
      if (event && event._id === id) {
        setEvent(response.event);
      }
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [event]);

  // Delete an event
  const deleteEvent = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await eventApi.deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((e) => e._id !== id));
      if (event && event._id === id) {
        setEvent(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to delete event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [event]);

  // Register for an event
  const registerForEvent = useCallback(async (id, registrationData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventApi.registerForEvent(id, registrationData);
      
      // Update the event if it's the current one
      if (event && event._id === id) {
        setEvent({
          ...event,
          isRegistered: true,
          attendees: [...(event.attendees || []), response.registration]
        });
      }
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to register for event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [event]);

  // Cancel registration for an event
  const cancelRegistration = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await eventApi.cancelRegistration(id);
      
      // Update the event if it's the current one
      if (event && event._id === id) {
        setEvent({
          ...event,
          isRegistered: false,
          // We'd need to filter out the user's registration
          // but we don't have user info in this hook
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to cancel registration');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [event]);

  // Get event ticket
  const getTicket = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventApi.getTicket(id);
      return response.ticket;
    } catch (err) {
      setError(err.message || 'Failed to get ticket');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear single event from state
  const clearEvent = useCallback(() => {
    setEvent(null);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    events,
    event,
    loading,
    error,
    fetchEvents,
    fetchEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    cancelRegistration,
    getTicket,
    clearEvent,
    clearError
  };
};
