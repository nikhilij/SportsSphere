import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState({
        name: "Alex Johnson",
        username: "alexj88",
        email: "alex.johnson@example.com",
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
        bio: "Sports enthusiast with a passion for basketball and soccer. Always looking for pickup games in the area!",
        joinDate: "January 2023",
        favoriteSports: ["Basketball", "Soccer", "Tennis"],
        stats: {
            posts: 24,
            forums: 8,
            friends: 56
        }
    });
    
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("posts");

    useEffect(() => {
        // Simulate API call to fetch user data
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
        
        // In a real app: fetch user profile data from backend
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-800 to-blue-500 h-40"></div>
                    <div className="px-6 py-4 relative">
                        <div className="absolute -top-16 left-6">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover"
                            />
                        </div>
                        <div className="mt-16 flex flex-col md:flex-row md:justify-between md:items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                                <p className="text-gray-600">@{user.username}</p>
                                <p className="text-sm text-gray-500 mt-1">Joined {user.joinDate}</p>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-4 md:mt-0">
                                Edit Profile
                            </button>
                        </div>
                        <p className="mt-4 text-gray-700">{user.bio}</p>
                        
                        <div className="mt-4">
                            <h3 className="text-gray-700 font-semibold">Favorite Sports</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {user.favoriteSports.map((sport, index) => (
                                    <span 
                                        key={index} 
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                    >
                                        {sport}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <div className="text-2xl font-bold text-blue-600">{user.stats.posts}</div>
                        <div className="text-gray-600">Posts</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <div className="text-2xl font-bold text-blue-600">{user.stats.forums}</div>
                        <div className="text-gray-600">Forums</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <div className="text-2xl font-bold text-blue-600">{user.stats.friends}</div>
                        <div className="text-gray-600">Friends</div>
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex border-b">
                        <button 
                            className={`px-4 py-3 font-medium ${activeTab === 'posts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('posts')}
                        >
                            Posts
                        </button>
                        <button 
                            className={`px-4 py-3 font-medium ${activeTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('activity')}
                        >
                            Activity
                        </button>
                        <button 
                            className={`px-4 py-3 font-medium ${activeTab === 'teams' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('teams')}
                        >
                            Teams
                        </button>
                    </div>
                    
                    <div className="p-4">
                        {activeTab === 'posts' && (
                            <div>
                                <p className="text-gray-600 text-center py-8">No posts yet. Start sharing your sports experiences!</p>
                            </div>
                        )}
                        
                        {activeTab === 'activity' && (
                            <div>
                                <p className="text-gray-600 text-center py-8">Your recent activities will appear here.</p>
                            </div>
                        )}
                        
                        {activeTab === 'teams' && (
                            <div>
                                <p className="text-gray-600 text-center py-8">You haven't joined any teams yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;