import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const EventDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch event details from API
    // For now, we'll use mock data
    setTimeout(() => {
      setEvent({
        id: parseInt(id),
        title:
          id == 1
            ? "Summer Basketball Tournament"
            : id == 2
              ? "Regional Cricket League"
              : id == 3
                ? "Tennis Championship"
                : "City Marathon",
        date: id == 1 ? "June 25, 2025" : id == 2 ? "July 10, 2025" : id == 3 ? "July 28, 2025" : "August 5, 2025",
        location:
          id == 1
            ? "Central Stadium, Mumbai"
            : id == 2
              ? "Sports Complex, Delhi"
              : id == 3
                ? "Tennis Academy, Chennai"
                : "City Center, Bangalore",
        image:
          id == 1
            ? "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            : id == 2
              ? "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              : id == 3
                ? "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                : "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: id == 1 ? "Basketball" : id == 2 ? "Cricket" : id == 3 ? "Tennis" : "Running",
        registrationFee: id == 1 ? "₹500" : id == 2 ? "₹800" : id == 3 ? "₹1000" : "₹600",
        description:
          "This is a detailed description of the event. The event will feature participants from across the country competing for the championship title. Don't miss this exciting opportunity to witness incredible athletic performances!",
        organizer: "SportsSphere Association",
        startTime: "9:00 AM",
        endTime: "5:00 PM",
        maxParticipants: 100,
        currentParticipants: 65,
        rules: [
          "Participants must arrive 30 minutes before the event starts",
          "All participants must bring valid ID",
          "Follow all referee decisions",
          "Sportsman spirit is expected from all participants",
        ],
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-red-500">Event Not Found</h1>
        <p className="mt-4">The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/events" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-md">
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/events" className="flex items-center text-blue-600 mb-6 hover:underline">
        &larr; Back to Events
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img src={event.image} alt={event.title} className="w-full h-64 md:h-80 object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{event.title}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-blue-600 text-white px-3 py-1 text-sm rounded-full">{event.category}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Date</h3>
              <p className="text-lg">{event.date}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Time</h3>
              <p className="text-lg">
                {event.startTime} - {event.endTime}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Location</h3>
              <p className="text-lg">{event.location}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
            <p className="text-gray-700">{event.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Event Rules</h2>
            <ul className="list-disc pl-5 space-y-2">
              {event.rules.map((rule, index) => (
                <li key={index} className="text-gray-700">
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Registration</h2>
            <div className="bg-gray-100 rounded-lg p-4 flex flex-wrap justify-between items-center">
              <div>
                <p className="text-gray-700 mb-1">
                  Registration Fee: <span className="font-semibold">{event.registrationFee}</span>
                </p>
                <p className="text-gray-700">
                  Spots Left: <span className="font-semibold">{event.maxParticipants - event.currentParticipants}</span>
                </p>
              </div>
              {isAuthenticated ? (
                <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-2 rounded-md">
                  Register Now
                </button>
              ) : (
                <div>
                  <p className="text-gray-500 mb-2">Sign in to register for this event</p>
                  <Link
                    to="/login"
                    className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-2 rounded-md"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Organizer</h2>
            <p className="text-gray-700">{event.organizer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
