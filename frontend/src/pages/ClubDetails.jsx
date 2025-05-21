import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ClubDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    // In a real app, fetch club details from API
    // For now, we'll use mock data
    setTimeout(() => {
      setClub({
        id: parseInt(id),
        name:
          id == 1
            ? "Mumbai Tigers Cricket Club"
            : id == 2
              ? "Delhi Warriors Basketball"
              : id == 3
                ? "Chennai Tennis Academy"
                : "Bangalore Football League",
        description:
          "This club was established to promote sports excellence and community engagement. We offer state-of-the-art facilities, professional coaching, and a vibrant community of sports enthusiasts. Our mission is to develop athletes of all ages and skill levels while fostering a love for the game.",
        logo:
          id == 1
            ? "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            : id == 2
              ? "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              : id == 3
                ? "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                : "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coverImage:
          "https://images.unsplash.com/photo-1511300636408-a63a89df3482?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        sportType: id == 1 ? "Cricket" : id == 2 ? "Basketball" : id == 3 ? "Tennis" : "Football",
        location:
          id == 1
            ? "Mumbai, Maharashtra"
            : id == 2
              ? "Delhi"
              : id == 3
                ? "Chennai, Tamil Nadu"
                : "Bangalore, Karnataka",
        members: id == 1 ? 120 : id == 2 ? 85 : id == 3 ? 150 : 200,
        established: id == 1 ? 2010 : id == 2 ? 2015 : id == 3 ? 2008 : 2012,
        contactEmail: "info@sportsclub.com",
        contactPhone: "+91 98765 43210",
        website: "www.sportsclub.com",
        membershipFee: id == 1 ? "₹5,000/year" : id == 2 ? "₹4,500/year" : id == 3 ? "₹6,000/year" : "₹4,000/year",
        facilities: [
          "Professional playing courts/fields",
          "Training equipment",
          "Locker rooms",
          "Fitness center",
          "Club house with refreshments",
        ],
        coaches: [
          {
            name: "Rajesh Kumar",
            position: "Head Coach",
            experience: "15 years",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            name: "Priya Singh",
            position: "Assistant Coach",
            experience: "8 years",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
          },
        ],
        upcomingEvents: [
          {
            id: 101,
            title: "Summer Training Camp",
            date: "June 10-20, 2025",
          },
          {
            id: 102,
            title: "Club Championship",
            date: "July 15-18, 2025",
          },
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

  if (!club) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-red-500">Club Not Found</h1>
        <p className="mt-4">The club you're looking for doesn't exist or has been removed.</p>
        <Link to="/clubs" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-md">
          Back to Clubs
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Club Header with Cover Image */}
      <div className="relative h-64 md:h-80 bg-gray-300">
        <img src={club.coverImage} alt={`${club.name} cover`} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
          <div className="container mx-auto flex items-center">
            <img
              src={club.logo}
              alt={club.name}
              className="w-20 h-20 rounded-full border-4 border-white object-cover mr-4"
            />
            <div className="text-white">
              <h1 className="text-3xl font-bold">{club.name}</h1>
              <p>{club.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto">
            <button
              className={`px-4 py-3 font-medium text-sm border-b-2 ${
                activeTab === "about" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm border-b-2 ${
                activeTab === "facilities" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600"
              }`}
              onClick={() => setActiveTab("facilities")}
            >
              Facilities
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm border-b-2 ${
                activeTab === "coaches" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600"
              }`}
              onClick={() => setActiveTab("coaches")}
            >
              Coaches
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm border-b-2 ${
                activeTab === "events" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600"
              }`}
              onClick={() => setActiveTab("events")}
            >
              Events
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm border-b-2 ${
                activeTab === "membership" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600"
              }`}
              onClick={() => setActiveTab("membership")}
            >
              Membership
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "about" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">About {club.name}</h2>
            <p className="text-gray-700 mb-6">{club.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Club Details</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Sport:</span>
                    <span>{club.sportType}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Established:</span>
                    <span>{club.established}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Members:</span>
                    <span>{club.members}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span>{club.contactEmail}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span>{club.contactPhone}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Website:</span>
                    <span>{club.website}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "facilities" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Our Facilities</h2>
            <ul className="space-y-4">
              {club.facilities.map((facility, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-4 h-4 bg-blue-600 rounded-full mr-3"></span>
                  <span>{facility}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "coaches" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Our Coaches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {club.coaches.map((coach, index) => (
                <div key={index} className="flex items-center p-4 border rounded-lg">
                  <img src={coach.image} alt={coach.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                  <div>
                    <h3 className="font-semibold text-lg">{coach.name}</h3>
                    <p className="text-gray-600">{coach.position}</p>
                    <p className="text-sm text-gray-500">{coach.experience} experience</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
            {club.upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {club.upcomingEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-gray-600">{event.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No upcoming events at this time.</p>
            )}
          </div>
        )}

        {activeTab === "membership" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Membership Information</h2>
            <div className="bg-gray-50 border rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-lg mb-2">Membership Fee</h3>
              <p className="text-2xl font-bold text-blue-600">{club.membershipFee}</p>
              <p className="text-gray-600 mt-2">Includes access to all facilities and basic coaching.</p>
            </div>

            <h3 className="font-semibold text-lg mb-3">Benefits of Membership</h3>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Access to all club facilities during operating hours</li>
              <li>Regular training sessions with qualified coaches</li>
              <li>Priority registration for club events and tournaments</li>
              <li>Discounts on club merchandise and equipment</li>
              <li>Community of fellow sports enthusiasts</li>
            </ul>

            {isAuthenticated ? (
              <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-3 rounded-md">
                Apply for Membership
              </button>
            ) : (
              <div>
                <p className="text-gray-500 mb-3">Sign in to apply for membership</p>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-3 rounded-md"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubDetails;
