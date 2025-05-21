import React, { useState, useEffect } from "react";
import { FaFootballBall, FaBasketballBall, FaRunning, FaUserAlt } from "react-icons/fa";
import { MdSportsSoccer, MdSportsBaseball } from "react-icons/md";

const Home = () => {
  const [featuredEvents] = useState([
    {
      id: 1,
      title: "NBA Finals 2023",
      date: "June 15, 2023",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Basketball",
    },
    {
      id: 2,
      title: "FIFA World Cup Qualifiers",
      date: "July 10, 2023",
      image:
        "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Soccer",
    },
    {
      id: 3,
      title: "Wimbledon Championship",
      date: "July 3, 2023",
      image:
        "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Tennis",
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      // You can add scroll logic here if needed in the future
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <h1>Welcome to SportsSphere</h1>
      {/* Add your homepage content here */}
      <section>
        <h2>Featured Events</h2>
        <div>
          {featuredEvents.map((event) => (
            <div key={event.id}>
              <img
                src={event.image}
                alt={event.title}
                style={{ width: "200px", height: "120px", objectFit: "cover" }}
              />
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <span>{event.category}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
