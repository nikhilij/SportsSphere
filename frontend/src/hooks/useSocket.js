import { useEffect, useRef, useState, useCallback } from 'react';
import io from 'socket.io-client';

export const useSocket = (url) => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Create socket connection
    const socket = io(url, {
      auth: {
        token: localStorage.getItem('token')
      },
      transports: ['websocket'],
      withCredentials: true
    });

    // Setup event listeners
    socket.on('connect', () => {
      console.log('Socket connected');
      setConnected(true);
      setError(null);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setError(`Connection error: ${err.message}`);
      setConnected(false);
    });

    // Set socket ref
    socketRef.current = socket;

    // Cleanup on unmount
    return () => {
      console.log('Cleaning up socket connection');
      socket.disconnect();
    };
  }, [url]);

  // Function to emit events
  const emit = useCallback((eventName, data, callback) => {
    if (socketRef.current && connected) {
      socketRef.current.emit(eventName, data, callback);
    } else {
      console.warn('Socket not connected, cannot emit event:', eventName);
    }
  }, [connected]);

  // Function to subscribe to events
  const on = useCallback((eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
      
      // Return unsubscribe function
      return () => {
        socketRef.current?.off(eventName, callback);
      };
    }
    
    return () => {}; // Noop if no socket
  }, []);

  // Function to unsubscribe from events
  const off = useCallback((eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.off(eventName, callback);
    }
  }, []);

  return {
    socket: socketRef.current,
    connected,
    error,
    emit,
    on,
    off
  };
};
