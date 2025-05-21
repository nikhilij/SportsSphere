import React, { useState } from "react";
import { Link } from "react-router-dom";

const Clubs = () => {
  // Mock clubs data (in a real app, you would fetch from API)
  const [clubs] = useState([
    {
      id: 1,
      name: "Mumbai Tigers Cricket Club",
      description: "A premier cricket club in Mumbai with state-of-the-art facilities.",
      logo: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      sportType: "Cricket",
      location: "Mumbai, Maharashtra",
      members: 120,
      established: 2010,
    },
    {
      id: 2,
      name: "Delhi Warriors Basketball",
      description: "Professional basketball club with training programs for all ages.",
      logo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      sportType: "Basketball",
      location: "Delhi",
      members: 85,
      established: 2015,
    },
    {
      id: 3,
      name: "Chennai Tennis Academy",
      description: "Leading tennis academy offering world-class coaching and facilities.",
      logo: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      sportType: "Tennis",
      location: "Chennai, Tamil Nadu",
      members: 150,
      established: 2008,
    },
    {
      id: 4,
      name: "Bangalore Football League",
      description: "Top football club with youth development programs and senior teams.",
      logo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      sportType: "Football",
      location: "Bangalore, Karnataka",
      members: 200,
      established: 2012,
    },
  ]);

  const [filters, setFilters] = useState({
    sportType: "",
    location: "",
    searchTerm: "",
  });

  const filteredClubs = clubs.filter((club) => {
    return (
      (filters.sportType === "" || club.sportType === filters.sportType) &&
      (filters.location === "" || club.location.includes(filters.location)) &&
      (filters.searchTerm === "" ||
        club.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(filters.searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sports Clubs</h1>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search clubs..."
            className="px-4 py-2 border rounded-md flex-grow"
            value={filters.searchTerm}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
          />

          <select
            className="px-4 py-2 border rounded-md"
            value={filters.sportType}
            onChange={(e) => setFilters({ ...filters, sportType: e.target.value })}
          >
            <option value="">All Sports</option>
            <option value="Cricket">Cricket</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
            <option value="Football">Football</option>
          </select>

          <select
            className="px-4 py-2 border rounded-md"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          >
            <option value="">All Locations</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
          </select>
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClubs.map((club) => (
          <div key={club.id} className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={club.logo} alt={club.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{club.name}</h2>
              <p className="text-gray-600 mb-3 line-clamp-2">{club.description}</p>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Sport:</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{club.sportType}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Location:</span>
                  <span>{club.location}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Members:</span>
                  <span>{club.members}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Established:</span>
                  <span>{club.established}</span>
                </div>
              </div>
              <Link
                to={`/clubs/${club.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                View Club
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredClubs.length === 0 && (
        <p className="text-center text-gray-500 my-10">No clubs found matching your filters.</p>
      )}
    </div>
  );
};

export default Clubs;
