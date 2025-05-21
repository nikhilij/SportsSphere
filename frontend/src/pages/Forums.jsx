import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const Forums = () => {
    const [categories, setCategories] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual auth check
    
    // Mock data - replace with actual API calls
    useEffect(() => {
        // Simulating API fetch
        setTimeout(() => {
            setCategories([
                { id: 1, name: 'Football', postCount: 123, description: 'Discuss all things football' },
                { id: 2, name: 'Basketball', postCount: 87, description: 'NBA, college basketball and more' },
                { id: 3, name: 'Tennis', postCount: 45, description: 'Tennis tournaments and players' },
                { id: 4, name: 'Cricket', postCount: 92, description: 'Cricket matches and teams' },
            ]);
            
            setRecentPosts([
                { id: 1, title: 'World Cup Predictions', author: 'soccerfan', category: 'Football', replies: 24, date: '2 hours ago' },
                { id: 2, title: 'NBA Draft Analysis', author: 'basketballguru', category: 'Basketball', replies: 18, date: '5 hours ago' },
                { id: 3, title: 'Wimbledon Discussion', author: 'tennislover', category: 'Tennis', replies: 7, date: '1 day ago' },
            ]);
            
            setLoading(false);
        }, 1000);
        
        // Check if user is authenticated
        const checkAuth = () => {
            // Replace with actual auth logic
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
        };
        
        checkAuth();
    }, []);
    
    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality here
        console.log('Searching for:', searchTerm);
    };
    
    // Filter categories based on search term
    const filteredCategories = categories.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (loading) return <div className="text-center p-10">Loading forums...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    
    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Sports Forums</h1>
                <p className="text-gray-600">Join the conversation about your favorite sports</p>
            </div>
            
            {/* Search and create post */}
            <div className="flex justify-between items-center mb-6">
                <form onSubmit={handleSearch} className="flex">
                    <input
                        type="text"
                        placeholder="Search forums..."
                        className="px-4 py-2 border rounded-l"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button 
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                    >
                        Search
                    </button>
                </form>
                
                {isAuthenticated ? (
                    <Link 
                        to="/create-post" 
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Create New Post
                    </Link>
                ) : (
                    <Link 
                        to="/login" 
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Log in to Post
                    </Link>
                )}
            </div>
            
            {/* Categories */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Forum Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map(category => (
                            <div key={category.id} className="border p-4 rounded hover:shadow-md transition">
                                <Link to={`/forums/${category.id}`} className="block">
                                    <h3 className="text-xl font-medium">{category.name}</h3>
                                    <p className="text-gray-600 mb-2">{category.description}</p>
                                    <p className="text-sm text-gray-500">{category.postCount} posts</p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No categories match your search.</p>
                    )}
                </div>
            </div>
            
            {/* Recent posts */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Recent Discussions</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 text-left">Topic</th>
                                <th className="py-2 px-4 text-left">Category</th>
                                <th className="py-2 px-4 text-left">Author</th>
                                <th className="py-2 px-4 text-left">Replies</th>
                                <th className="py-2 px-4 text-left">Last Post</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentPosts.map(post => (
                                <tr key={post.id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <Link to={`/post/${post.id}`} className="text-blue-600 hover:underline">
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td className="py-3 px-4">{post.category}</td>
                                    <td className="py-3 px-4">{post.author}</td>
                                    <td className="py-3 px-4">{post.replies}</td>
                                    <td className="py-3 px-4">{post.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Forums;