import React, { useState, useEffect } from 'react';

const ForumThread = ({ threadId, currentUser }) => {
    const [thread, setThread] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchThread();
        fetchPosts();
    }, [threadId]);

    const fetchThread = async () => {
        try {
            const response = await fetch(`/api/threads/${threadId}`);
            if (!response.ok) throw new Error('Failed to fetch thread');
            const threadData = await response.json();
            setThread(threadData);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await fetch(`/api/threads/${threadId}/posts`);
            if (!response.ok) throw new Error('Failed to fetch posts');
            const postsData = await response.json();
            setPosts(postsData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        try {
            const response = await fetch(`/api/threads/${threadId}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: newPost,
                    userId: currentUser.id,
                }),
            });

            if (!response.ok) throw new Error('Failed to create post');
            
            const createdPost = await response.json();
            setPosts([...posts, createdPost]);
            setNewPost('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLike = async (postId) => {
        try {
            const response = await fetch(`/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: currentUser.id }),
            });

            if (!response.ok) throw new Error('Failed to like post');
            
            setPosts(posts.map(post => 
                post.id === postId 
                    ? { ...post, likes: post.likes + 1, isLiked: true }
                    : post
            ));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="loading">Loading thread...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!thread) return <div className="error">Thread not found</div>;

    return (
        <div className="forum-thread">
            <div className="thread-header">
                <h1 className="thread-title">{thread.title}</h1>
                <div className="thread-meta">
                    <span className="author">by {thread.author.username}</span>
                    <span className="date">{new Date(thread.createdAt).toLocaleDateString()}</span>
                    <span className="category">{thread.category}</span>
                </div>
            </div>

            <div className="thread-content">
                <p>{thread.content}</p>
            </div>

            <div className="posts-section">
                <h3 className="posts-header">Replies ({posts.length})</h3>
                
                <div className="posts-list">
                    {posts.map(post => (
                        <div key={post.id} className="post-item">
                            <div className="post-author">
                                <img 
                                    src={post.author.avatar || '/default-avatar.png'} 
                                    alt={post.author.username}
                                    className="author-avatar"
                                />
                                <span className="author-name">{post.author.username}</span>
                            </div>
                            <div className="post-content">
                                <p>{post.content}</p>
                                <div className="post-actions">
                                    <button 
                                        onClick={() => handleLike(post.id)}
                                        className={`like-btn ${post.isLiked ? 'liked' : ''}`}
                                        disabled={post.isLiked}
                                    >
                                        👍 {post.likes || 0}
                                    </button>
                                    <span className="post-date">
                                        {new Date(post.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {currentUser && (
                    <form onSubmit={handleSubmitPost} className="new-post-form">
                        <h4>Add a reply</h4>
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="Write your reply..."
                            className="post-textarea"
                            rows="4"
                            required
                        />
                        <button type="submit" className="submit-btn">
                            Post Reply
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForumThread;</button>