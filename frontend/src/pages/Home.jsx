import React, { useState, useEffect } from "react";
import {
  FaFootballBall,
  FaBasketballBall,
  FaRunning,
  FaUserAlt,
  FaCalendarAlt,
  FaTags,
  FaUsers,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import { MdSportsSoccer, MdSportsBaseball, MdEmojiEvents } from "react-icons/md";

import MainLayout from "../components/layout/MainLayout";

const Home = () => {
  const [featuredEvents] = useState([
    {
      id: 1,
      title: "NBA Finals 2023",
      date: "June 15, 2023",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Basketball",
      description: "Witness the thrilling conclusion to the NBA season.",
    },
    {
      id: 2,
      title: "FIFA World Cup Qualifiers",
      date: "July 10, 2023",
      image:
        "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Soccer",
      description: "Nations battle for a spot in the prestigious World Cup.",
    },
    {
      id: 3,
      title: "Wimbledon Championship",
      date: "July 3, 2023",
      image:
        "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Tennis",
      description: "Experience the tradition and excitement of grass-court tennis.",
    },
  ]);

  const sportCategories = [
    {
      name: "Football",
      icon: <FaFootballBall className="w-10 h-10 mx-auto text-indigo-500" />,
      color: "bg-indigo-100",
      textColor: "text-indigo-700",
    },
    {
      name: "Basketball",
      icon: <FaBasketballBall className="w-10 h-10 mx-auto text-orange-500" />,
      color: "bg-orange-100",
      textColor: "text-orange-700",
    },
    {
      name: "Soccer",
      icon: <MdSportsSoccer className="w-10 h-10 mx-auto text-green-500" />,
      color: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      name: "Baseball",
      icon: <MdSportsBaseball className="w-10 h-10 mx-auto text-red-500" />,
      color: "bg-red-100",
      textColor: "text-red-700",
    },
    {
      name: "Running",
      icon: <FaRunning className="w-10 h-10 mx-auto text-yellow-500" />,
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
    },
    {
      name: "More Sports",
      icon: <MdEmojiEvents className="w-10 h-10 mx-auto text-purple-500" />,
      color: "bg-purple-100",
      textColor: "text-purple-700",
    },
  ];

  const features = [
    {
      title: "Vast Event Coverage",
      description: "From local games to international championships, find it all.",
      icon: <FaCalendarAlt className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Community Focused",
      description: "Connect with fellow fans and athletes.",
      icon: <FaUsers className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Easy Navigation",
      description: "Find your favorite sports and events effortlessly.",
      icon: <FaStar className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Secure & Reliable",
      description: "A platform you can trust for all your sports needs.",
      icon: <FaShieldAlt className="w-8 h-8 text-blue-500" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Scroll logic can be added here
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to SportsSphere</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Your ultimate destination for discovering, following, and engaging with sports events worldwide.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
            Explore Events
          </button>
        </div>
      </section>
      {/* Featured Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img src={event.image} alt={event.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold ${sportCategories.find((sc) => sc.name === event.category)?.textColor || "text-gray-700"} ${sportCategories.find((sc) => sc.name === event.category)?.color || "bg-gray-200"} rounded-full mb-2`}
                  >
                    {event.category}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">
                    <FaCalendarAlt className="inline mr-2" />
                    {event.date}
                  </p>
                  <p className="text-gray-700 mb-4 text-sm">{event.description}</p>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">
                    Learn More &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Browse by Sport Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Sport</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {sportCategories.map((category) => (
              <div
                key={category.name}
                className={`p-6 ${category.color} rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer`}
              >
                <div className="mb-3">{category.icon}</div>
                <h3 className={`text-lg font-semibold ${category.textColor}`}>{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why SportsSphere Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SportsSphere?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <FaUserAlt className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
          <h2 className="text-3xl font-bold mb-4">Join the SportsSphere Community!</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Sign up today to personalize your experience, follow your favorite teams, and get event updates.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
            Sign Up Now
          </button>
        </div>
      </section>{" "}
    </MainLayout>
  );
};

export default Home;
