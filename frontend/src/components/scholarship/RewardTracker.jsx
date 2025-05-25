import React, { useState, useEffect } from 'react';
import './RewardTracker.css';

const RewardTracker = () => {
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchRewards();
    }, []);

    const fetchRewards = async () => {
        try {
            setLoading(true);
            // Mock data - replace with actual API call
            const mockRewards = [
                {
                    id: 1,
                    title: 'Academic Excellence Award',
                    amount: 5000,
                    type: 'scholarship',
                    status: 'awarded',
                    dateAwarded: '2024-01-15',
                    description: 'Outstanding academic performance in sports science'
                },
                {
                    id: 2,
                    title: 'Sports Achievement Bonus',
                    amount: 2500,
                    type: 'bonus',
                    status: 'pending',
                    dateAwarded: '2024-02-01',
                    description: 'Recognition for winning regional championship'
                },
                {
                    id: 3,
                    title: 'Leadership Grant',
                    amount: 3000,
                    type: 'grant',
                    status: 'processing',
                    dateAwarded: '2024-02-10',
                    description: 'Leadership role in student athletics committee'
                }
            ];
            setRewards(mockRewards);
        } catch (error) {
            console.error('Error fetching rewards:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredRewards = rewards.filter(reward => 
        filter === 'all' || reward.status === filter
    );

    const totalEarned = rewards
        .filter(reward => reward.status === 'awarded')
        .reduce((sum, reward) => sum + reward.amount, 0);

    const pendingAmount = rewards
        .filter(reward => reward.status === 'pending' || reward.status === 'processing')
        .reduce((sum, reward) => sum + reward.amount, 0);

    const getStatusBadge = (status) => {
        const badges = {
            awarded: 'status-awarded',
            pending: 'status-pending',
            processing: 'status-processing',
            rejected: 'status-rejected'
        };
        return badges[status] || 'status-default';
    };

    if (loading) {
        return (
            <div className="reward-tracker">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading rewards...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="reward-tracker">
            <div className="reward-header">
                <h2>Reward Tracker</h2>
                <p>Track your scholarships, grants, and achievements</p>
            </div>

            <div className="reward-summary">
                <div className="summary-card total-earned">
                    <div className="summary-icon">💰</div>
                    <div className="summary-content">
                        <h3>${totalEarned.toLocaleString()}</h3>
                        <p>Total Earned</p>
                    </div>
                </div>
                <div className="summary-card pending-amount">
                    <div className="summary-icon">⏳</div>
                    <div className="summary-content">
                        <h3>${pendingAmount.toLocaleString()}</h3>
                        <p>Pending Amount</p>
                    </div>
                </div>
                <div className="summary-card total-rewards">
                    <div className="summary-icon">🏆</div>
                    <div className="summary-content">
                        <h3>{rewards.length}</h3>
                        <p>Total Rewards</p>
                    </div>
                </div>
            </div>

            <div className="reward-filters">
                <button 
                    className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFilter('all')}
                >
                    All Rewards
                </button>
                <button 
                    className={filter === 'awarded' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFilter('awarded')}
                >
                    Awarded
                </button>
                <button 
                    className={filter === 'pending' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFilter('pending')}
                >
                    Pending
                </button>
                <button 
                    className={filter === 'processing' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFilter('processing')}
                >
                    Processing
                </button>
            </div>

            <div className="rewards-list">
                {filteredRewards.length === 0 ? (
                    <div className="no-rewards">
                        <div className="no-rewards-icon">🎁</div>
                        <h3>No rewards found</h3>
                        <p>No rewards match your current filter selection.</p>
                    </div>
                ) : (
                    filteredRewards.map(reward => (
                        <div key={reward.id} className="reward-card">
                            <div className="reward-main">
                                <div className="reward-info">
                                    <h3 className="reward-title">{reward.title}</h3>
                                    <p className="reward-description">{reward.description}</p>
                                    <div className="reward-meta">
                                        <span className="reward-type">{reward.type}</span>
                                        <span className="reward-date">
                                            {new Date(reward.dateAwarded).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="reward-amount">
                                    <span className="amount">${reward.amount.toLocaleString()}</span>
                                    <span className={`status ${getStatusBadge(reward.status)}`}>
                                        {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                            {reward.status === 'awarded' && (
                                <div className="reward-actions">
                                    <button className="btn-secondary">View Certificate</button>
                                    <button className="btn-primary">Download Receipt</button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className="reward-footer">
                <button className="btn-outline">Export Report</button>
                <button className="btn-primary">Apply for New Reward</button>
            </div>
        </div>
    );
};

export default RewardTracker;