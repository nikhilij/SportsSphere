import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventForm.css';

const EventForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        sport: '',
        date: '',
        time: '',
        location: '',
        description: '',
        organizer: '',
        fee: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    ...formData,
                    fee: formData.fee ? parseFloat(formData.fee) : 0,
                    status: 'open'
                })
            });

            if (response.ok) {
                navigate('/events');
            } else {
                throw new Error('Failed to create event');
            }
        } catch (err) {
            alert('Failed to create event: ' + err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const sportOptions = [
        'Football', 'Basketball', 'Tennis', 'Cricket', 'Volleyball',
        'Badminton', 'Swimming', 'Running', 'Cycling', 'Other'
    ];

    return (
        <div className="event-form-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>
            
            <div className="event-form">
                <h1>Create New Event</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Event Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter event title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sport">Sport *</label>
                        <select
                            id="sport"
                            name="sport"
                            value={formData.sport}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a sport</option>
                            {sportOptions.map(sport => (
                                <option key={sport} value={sport.toLowerCase()}>
                                    {sport}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="date">Date *</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="time">Time *</label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location *</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            placeholder="Event location"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="organizer">Organizer *</label>
                        <input
                            type="text"
                            id="organizer"
                            name="organizer"
                            value={formData.organizer}
                            onChange={handleChange}
                            required
                            placeholder="Event organizer"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fee">Entry Fee</label>
                        <input
                            type="number"
                            id="fee"
                            name="fee"
                            value={formData.fee}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            placeholder="0.00 (leave empty for free)"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Event Image URL</label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            placeholder="Describe your event..."
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventForm;