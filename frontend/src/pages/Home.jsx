import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFootballBall, FaBasketballBall, FaRunning, FaUserAlt } from "react-icons/fa";
import { MdSportsSoccer, MdSportsBaseball } from "react-icons/md";

const Home = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [featuredEvents, setFeaturedEvents] = useState([
        {
            id: 1,
            title: "NBA Finals 2023",
            date: "June 15, 2023",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Basketball"
        },
        {
            id: 2,
            title: "FIFA World Cup Qualifiers",
            date: "July 10, 2023",
            image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Soccer"
        },
        {
            id: 3,
            title: "Wimbledon Championship",
            date: "July 3, 2023",
            image: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "Tennis"
        }
    ]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);