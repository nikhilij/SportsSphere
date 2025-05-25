import React, { useState } from 'react';
import { FiTrophy, FiAward, FiStar, FiTarget, FiCalendar, FiChevronRight } from 'react-icons/fi';
import { FaMedal, FaCrown, FaFire, FaGem } from 'react-icons/fa';

const AchievementList = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const achievements = [
        {
            id: 1,
            title: "First Victory",
            description: "Win your first match",
            icon: FiTrophy,
            category: "milestone",
            rarity: "common",
            progress: 100,
            maxProgress: 100,
            unlockedAt: "2024-01-15",
            points: 50,
            isUnlocked: true
        },
        {
            id: 2,
            title: "Hat Trick Hero",
            description: "Score 3 goals in a single match",
            icon: FaFire,
            category: "performance",
            rarity: "rare",
            progress: 100,
            maxProgress: 100,
            unlockedAt: "2024-02-20",
            points: 150,
            isUnlocked: true
        },
        {
            id: 3,
            title: "Team Captain",
            description: "Lead 10 matches as captain",
            icon: FaCrown,
            category: "leadership",
            rarity: "epic",
            progress: 7,
            maxProgress: 10,
            points: 200,
            isUnlocked: false
        },
        {
            id: 4,
            title: "Perfect Season",
            description: "Win all matches in a season",
            icon: FaGem,
            category: "milestone",
            rarity: "legendary",
            progress: 12,
            maxProgress: 15,
            points: 500,
            isUnlocked: false
        },
        {
            id: 5,
            title: "Goal Machine",
            description: "Score 50 goals in total",
            icon: FiTarget,
            category: "performance",
            rarity: "rare",
            progress: 43,
            maxProgress: 50,
            points: 300,
            isUnlocked: false
        },
        {
            id: 6,
            title: "Veteran Player",
            description: "Play for 2 years continuously",
            icon: FaMedal,
            category: "milestone",
            rarity: "epic",
            progress: 100,
            maxProgress: 100,
            unlockedAt: "2024-03-10",
            points: 400,
            isUnlocked: true
        }
    ];

    const categories = [
        { id: 'all', name: 'All Achievements', icon: FiAward },
        { id: 'milestone', name: 'Milestones', icon: FiTrophy },
        { id: 'performance', name: 'Performance', icon: FiTarget },
        { id: 'leadership', name: 'Leadership', icon: FaCrown }
    ];

    const rarityColors = {
        common: 'from-gray-400 to-gray-600',
        rare: 'from-blue-400 to-blue-600',
        epic: 'from-purple-400 to-purple-600',
        legendary: 'from-yellow-400 to-yellow-600'
    };

    const rarityBorders = {
        common: 'border-gray-300',
        rare: 'border-blue-300',
        epic: 'border-purple-300',
        legendary: 'border-yellow-300'
    };

    const filteredAchievements = selectedCategory === 'all' 
        ? achievements 
        : achievements.filter(achievement => achievement.category === selectedCategory);

    const totalPoints = achievements
        .filter(achievement => achievement.isUnlocked)
        .reduce((sum, achievement) => sum + achievement.points, 0);

    const unlockedCount = achievements.filter(achievement => achievement.isUnlocked).length;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header Stats */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Achievements</h1>
                        <p className="text-indigo-100">Track your progress and unlock rewards</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold">{unlockedCount}/{achievements.length}</div>
                        <div className="text-indigo-200">Unlocked</div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                            <FiTrophy className="text-yellow-300" size={24} />
                            <div>
                                <div className="text-2xl font-bold">{totalPoints}</div>
                                <div className="text-indigo-200 text-sm">Total Points</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                            <FaFire className="text-orange-300" size={24} />
                            <div>
                                <div className="text-2xl font-bold">
                                    {achievements.filter(a => a.rarity === 'rare' && a.isUnlocked).length}
                                </div>
                                <div className="text-indigo-200 text-sm">Rare Unlocked</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                            <FaGem className="text-purple-300" size={24} />
                            <div>
                                <div className="text-2xl font-bold">
                                    {achievements.filter(a => a.rarity === 'legendary' && a.isUnlocked).length}
                                </div>
                                <div className="text-indigo-200 text-sm">Legendary</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    selectedCategory === category.id
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <Icon size={16} />
                                <span>{category.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAchievements.map((achievement) => {
                    const Icon = achievement.icon;
                    const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
                    
                    return (
                        <div
                            key={achievement.id}
                            className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                                achievement.isUnlocked 
                                    ? `${rarityBorders[achievement.rarity]} bg-gradient-to-br from-white to-gray-50` 
                                    : 'border-gray-200 opacity-75'
                            }`}
                        >
                            {/* Achievement Header */}
                            <div className="p-6 pb-4">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${rarityColors[achievement.rarity]} text-white`}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        {achievement.isUnlocked && (
                                            <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                                                Unlocked
                                            </div>
                                        )}
                                        <div className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                                            achievement.rarity === 'common' ? 'bg-gray-100 text-gray-600' :
                                            achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-600' :
                                            achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-600' :
                                            'bg-yellow-100 text-yellow-600'
                                        }`}>
                                            {achievement.rarity}
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-800 mb-2">{achievement.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>

                                {/* Progress Bar */}
                                {!achievement.isUnlocked && (
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-600">Progress</span>
                                            <span className="text-sm text-gray-500">
                                                {achievement.progress}/{achievement.maxProgress}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full bg-gradient-to-r ${rarityColors[achievement.rarity]} transition-all duration-500`}
                                                style={{ width: `${progressPercentage}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center space-x-2">
                                        <FiStar className="text-yellow-500" size={16} />
                                        <span className="text-sm font-medium text-gray-600">{achievement.points} pts</span>
                                    </div>
                                    
                                    {achievement.isUnlocked && achievement.unlockedAt && (
                                        <div className="flex items-center space-x-1 text-green-600">
                                            <FiCalendar size={14} />
                                            <span className="text-xs">
                                                {new Date(achievement.unlockedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {!achievement.isUnlocked && (
                                        <FiChevronRight className="text-gray-400" size={16} />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredAchievements.length === 0 && (
                <div className="text-center py-12">
                    <FiTrophy className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No achievements found</h3>
                    <p className="text-gray-500">Try selecting a different category</p>
                </div>
            )}
        </div>
    );
};

export default AchievementList;