import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  // Mock events data (in a real app, you would fetch from API)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Summer Basketball Tournament",
      date: "June 25, 2025",
      location: "Central Stadium, Mumbai",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Basketball",
      registrationFee: "₹500",
    },
    {
      id: 2,
      title: "Regional Cricket League",
      date: "July 10, 2025",
      location: "Sports Complex, Delhi",
      image:
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Cricket",
      registrationFee: "₹800",
    },
    {
      id: 3,
      title: "Tennis Championship",
      date: "July 28, 2025",
      location: "Tennis Academy, Chennai",
      image:
        "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Tennis",
      registrationFee: "₹1000",
    },
    {
      id: 4,
      title: "City Marathon",
      date: "August 5, 2025",
      location: "City Center, Bangalore",
      image:
        "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Running",
      registrationFee: "₹600",
    },
  ]);

  const [filters, setFilters] = useState({
    category: "",
    date: "",
  });

  const filteredEvents = events.filter((event) => {
    return (
      (filters.category === "" || event.category === filters.category) &&
      (filters.date === "" || event.date.includes(filters.date))
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <select
          className="px-4 py-2 border rounded-md"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="Basketball">Basketball</option>
          <option value="Cricket">Cricket</option>
          <option value="Tennis">Tennis</option>
          <option value="Running">Running</option>
          <option value="Football">Football</option>
        </select>

        <input
          type="text"
          placeholder="Filter by date..."
          className="px-4 py-2 border rounded-md"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <div key={event.id} className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-2">
                <strong>Date:</strong> {event.date}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Category:</strong> {event.category}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Registration Fee:</strong> {event.registrationFee}
              </p>
              <Link
                to={`/events/${event.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <p className="text-center text-gray-500 my-10">No events found matching your filters.</p>
      )}
    </div>
  );
};

export default Events;
