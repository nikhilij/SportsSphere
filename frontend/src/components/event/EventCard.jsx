import React from 'react';
import './EventCard.css';

const EventCard = ({ event, onJoin, onLeave, currentUser }) => {
    const isUserJoined = event.participants?.some(participant => 
        participant.userId === currentUser?.id
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        const time = new Date(`2000-01-01T${timeString}`);
        return time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleJoinEvent = () => {
        if (onJoin && !isUserJoined) {
            onJoin(event.id);
        }
    };

    const handleLeaveEvent = () => {
        if (onLeave && isUserJoined) {
            onLeave(event.id);
        }
    };

    return (
        <div className="event-card">
            <div className="event-header">
                <h3 className="event-title">{event.title}</h3>
                <span className={`event-status ${event.status?.toLowerCase()}`}>
                    {event.status || 'Active'}
                </span>
            </div>
            
            <div className="event-details">
                <div className="event-sport">
                    <span className="sport-tag">{event.sport}</span>
                </div>
                
                <div className="event-datetime">
                    <div className="event-date">
                        <i className="icon-calendar"></i>
                        {formatDate(event.date)}
                    </div>
                    <div className="event-time">
                        <i className="icon-clock"></i>
                        {formatTime(event.time)}
                    </div>
                </div>
                
                <div className="event-location">
                    <i className="icon-location"></i>
                    {event.location}
                </div>
                
                {event.description && (
                    <div className="event-description">
                        {event.description}
                    </div>
                )}
                
                <div className="event-participants">
                    <span className="participant-count">
                        {event.participants?.length || 0} / {event.maxParticipants} participants
                    </span>
                    <div className="participants-progress">
                        <div 
                            className="progress-bar" 
                            style={{ 
                                width: `${((event.participants?.length || 0) / event.maxParticipants) * 100}%` 
                            }}
                        ></div>
                    </div>
                </div>
            </div>
            
            <div className="event-footer">
                <div className="event-organizer">
                    Organized by {event.organizer?.name || 'Unknown'}
                </div>
                
                <div className="event-actions">
                    {currentUser && (
                        <>
                            {isUserJoined ? (
                                <button 
                                    className="btn btn-secondary"
                                    onClick={handleLeaveEvent}
                                    disabled={event.status === 'completed'}
                                >
                                    Leave Event
                                </button>
                            ) : (
                                <button 
                                    className="btn btn-primary"
                                    onClick={handleJoinEvent}
                                    disabled={
                                        event.participants?.length >= event.maxParticipants ||
                                        event.status === 'completed' ||
                                        event.status === 'cancelled'
                                    }
                                >
                                    {event.participants?.length >= event.maxParticipants ? 'Full' : 'Join Event'}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCard;