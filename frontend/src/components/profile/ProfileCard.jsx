import React from 'react';
import { User, MapPin, Calendar, Edit3, Camera } from 'lucide-react';

const ProfileCard = ({ user, isCurrentUser = false, onEdit }) => {
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Handle image upload logic here
            console.log('Uploading image:', file);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-md mx-auto">
            {/* Cover Photo */}
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                {isCurrentUser && (
                    <button className="absolute top-3 right-3 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all">
                        <Camera size={16} />
                    </button>
                )}
            </div>

            {/* Profile Picture */}
            <div className="relative px-6 pb-6">
                <div className="flex justify-center -mt-16 mb-4">
                    <div className="relative">
                        <img
                            src={user?.profilePicture || '/api/placeholder/120/120'}
                            alt={user?.name || 'User'}
                            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                        {isCurrentUser && (
                            <label className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors">
                                <Camera size={14} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* User Info */}
                <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <h2 className="text-xl font-bold text-gray-800">
                            {user?.name || 'User Name'}
                        </h2>
                        {isCurrentUser && (
                            <button
                                onClick={onEdit}
                                className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                            >
                                <Edit3 size={16} />
                            </button>
                        )}
                    </div>
                    
                    <p className="text-gray-600 mb-3">
                        {user?.bio || 'Sports enthusiast and team player'}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                            <div className="font-bold text-lg text-gray-800">
                                {user?.stats?.matches || 0}
                            </div>
                            <div className="text-sm text-gray-500">Matches</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-lg text-gray-800">
                                {user?.stats?.wins || 0}
                            </div>
                            <div className="text-sm text-gray-500">Wins</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-lg text-gray-800">
                                {user?.stats?.achievements || 0}
                            </div>
                            <div className="text-sm text-gray-500">Awards</div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 text-sm text-gray-600">
                    {user?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-gray-400" />
                            <span>{user.location}</span>
                        </div>
                    )}
                    
                    {user?.sports && user.sports.length > 0 && (
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-gray-400" />
                            <span>{user.sports.join(', ')}</span>
                        </div>
                    )}
                    
                    {user?.joinedDate && (
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-400" />
                            <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                {!isCurrentUser && (
                    <div className="flex gap-2 mt-4">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Follow
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Message
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;