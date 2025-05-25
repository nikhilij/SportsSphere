import React, { useState } from 'react';

const ForumPost = ({ post, onLike, onComment, currentUser }) => {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isLiked, setIsLiked] = useState(post?.likes?.includes(currentUser?.id) || false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        onLike?.(post.id);
    };

    const handleComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            onComment?.(post.id, newComment);
            setNewComment('');
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            {/* Post Header */}
            <div className="flex items-center mb-4">
                <img
                    src={post?.author?.avatar || '/default-avatar.png'}
                    alt={post?.author?.name}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                    <h4 className="font-semibold text-gray-900">{post?.author?.name}</h4>
                    <p className="text-sm text-gray-500">{formatDate(post?.createdAt)}</p>
                </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{post?.title}</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{post?.content}</p>
                {post?.image && (
                    <img
                        src={post.image}
                        alt="Post"
                        className="mt-3 rounded-lg max-w-full h-auto"
                    />
                )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center space-x-4 border-t pt-3">
                <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                        isLiked
                            ? 'text-red-600 bg-red-50 hover:bg-red-100'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    <svg
                        className="w-5 h-5"
                        fill={isLiked ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    <span>{post?.likes?.length || 0}</span>
                </button>

                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                    <span>{post?.comments?.length || 0}</span>
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="mt-4 border-t pt-4">
                    {/* Comment Form */}
                    <form onSubmit={handleComment} className="mb-4">
                        <div className="flex space-x-3">
                            <img
                                src={currentUser?.avatar || '/default-avatar.png'}
                                alt={currentUser?.name}
                                className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="w-full p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="2"
                                />
                                <button
                                    type="submit"
                                    disabled={!newComment.trim()}
                                    className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-3">
                        {post?.comments?.map((comment) => (
                            <div key={comment.id} className="flex space-x-3">
                                <img
                                    src={comment.author?.avatar || '/default-avatar.png'}
                                    alt={comment.author?.name}
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="flex-1">
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-semibold text-sm">{comment.author?.name}</span>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(comment.createdAt)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700">{comment.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForumPost;