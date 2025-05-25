import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        fetchEventDetails();
    }, [id]);

    const fetchEventDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/events/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch event details');
            }
            const data = await response.json();
            setEvent(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await fetch(`/api/events/${id}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.ok) {
                setIsRegistered(true);
                alert('Successfully registered for the event!');
            } else {
                throw new Error('Registration failed');
            }
        } catch (err) {
            alert('Failed to register for event',err.message);
            console.error(err);
        }
    };

    if (loading) return <div className="loading">Loading event details...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!event) return <div className="not-found">Event not found</div>;

    return (
        <div className="event-details">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>
            
            <div className="event-header">
                <img src={event.image} alt={event.title} className="event-image" />
                <div className="event-info">
                    <h1>{event.title}</h1>
                    <p className="event-sport">{event.sport}</p>
                    <div className="event-meta">
                        <span className="date">📅 {new Date(event.date).toLocaleDateString()}</span>
                        <span className="time">🕒 {event.time}</span>
                        <span className="location">📍 {event.location}</span>
                    </div>
                </div>
            </div>

            <div className="event-content">
                <div className="description">
                    <h2>About this Event</h2>
                    <p>{event.description}</p>
                </div>

                <div className="event-details-grid">
                    <div className="detail-item">
                        <h3>Organizer</h3>
                        <p>{event.organizer}</p>
                    </div>
                    <div className="detail-item">
                        <h3>Participants</h3>
                        <p>{event.participants || 0} registered</p>
                    </div>
                    <div className="detail-item">
                        <h3>Entry Fee</h3>
                        <p>{event.fee ? `$${event.fee}` : 'Free'}</p>
                    </div>
                    <div className="detail-item">
                        <h3>Status</h3>
                        <p className={`status ${event.status}`}>{event.status}</p>
                    </div>
                </div>

                <div className="registration-section">
                    {!isRegistered ? (
                        <button 
                            className="register-btn"
                            onClick={handleRegister}
                            disabled={event.status !== 'open'}
                        >
                            {event.status === 'open' ? 'Register for Event' : 'Registration Closed'}
                        </button>
                    ) : (
                        <div className="registered-message">
                            ✅ You are registered for this event!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;