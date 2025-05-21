import React from 'react';
import { Link } from 'react-router-dom';

const ClubCard = ({ club, onJoin }) => {
    // Destructure club properties with defaults
    const { 
        id, 
        name = 'Club Name', 
        description = 'No description available', 
        category = 'General', 
        memberCount = 0,
        location = 'Unknown location',
        imageUrl = '/default-club-image.jpg' 
    } = club || {};

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <div className="h-48 overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 truncate">{name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{category}</span>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                    {description}
                </p>
                
                <div className="text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>{memberCount} {memberCount === 1 ? 'member' : 'members'}</span>
                    </div>
                </div>
                
                <div className="flex gap-2 mt-auto">
                    <Link 
                        to={`/clubs/${id}`} 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex-1 py-2 px-4 border border-blue-600 rounded-md text-center hover:bg-blue-50 transition-colors"
                    >
                        View Details
                    </Link>
                    <button
                        onClick={() => onJoin && onJoin(id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex-1 py-2 px-4 rounded-md transition-colors"
                    >
                        Join Club
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClubCard;