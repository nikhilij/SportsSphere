import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Forums = () => {
   const [categories, setCategories] = useState([]);
   const [recentPosts, setRecentPosts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [searchTerm, setSearchTerm] = useState("");
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   // Mock data - replace with actual API calls
   useEffect(() => {
      setTimeout(() => {
         setCategories([
            {
               id: 1,
               name: "Football",
               postCount: 123,
               description: "Discuss all things football, from local leagues to World Cup",
               icon: "⚽",
               color: "bg-green-100 text-green-700 border-green-200",
            },
            {
               id: 2,
               name: "Basketball",
               postCount: 87,
               description: "NBA, college basketball, streetball and more",
               icon: "🏀",
               color: "bg-orange-100 text-orange-700 border-orange-200",
            },
            {
               id: 3,
               name: "Tennis",
               postCount: 45,
               description: "Grand Slams, tournaments, and tennis techniques",
               icon: "🎾",
               color: "bg-yellow-100 text-yellow-700 border-yellow-200",
            },
            {
               id: 4,
               name: "Cricket",
               postCount: 92,
               description: "Cricket matches, teams, and player discussions",
               icon: "🏏",
               color: "bg-blue-100 text-blue-700 border-blue-200",
            },
            {
               id: 5,
               name: "Swimming",
               postCount: 34,
               description: "Techniques, competitions, and aquatic sports",
               icon: "🏊‍♂️",
               color: "bg-cyan-100 text-cyan-700 border-cyan-200",
            },
            {
               id: 6,
               name: "General Sports",
               postCount: 156,
               description: "All other sports and general discussions",
               icon: "🏆",
               color: "bg-purple-100 text-purple-700 border-purple-200",
            },
         ]);

         setRecentPosts([
            {
               id: 1,
               title: "World Cup Predictions: Who Will Take the Crown?",
               author: "soccerfan",
               category: "Football",
               replies: 24,
               views: 342,
               date: "2 hours ago",
               avatar: "SF",
               isHot: true,
            },
            {
               id: 2,
               title: "NBA Draft Analysis: Top Prospects 2024",
               author: "basketballguru",
               category: "Basketball",
               replies: 18,
               views: 289,
               date: "5 hours ago",
               avatar: "BG",
               isHot: false,
            },
            {
               id: 3,
               title: "Wimbledon 2024: Best Matches So Far",
               author: "tennislover",
               category: "Tennis",
               replies: 7,
               views: 156,
               date: "1 day ago",
               avatar: "TL",
               isHot: false,
            },
            {
               id: 4,
               title: "Cricket World Cup: India vs Australia Preview",
               author: "cricketfan99",
               category: "Cricket",
               replies: 31,
               views: 445,
               date: "3 hours ago",
               avatar: "CF",
               isHot: true,
            },
         ]);

         setLoading(false);
      }, 1000);

      const checkAuth = () => {
         const token = localStorage.getItem("token");
         setIsAuthenticated(!!token);
      };

      checkAuth();
   }, []);

   const handleSearch = (e) => {
      e.preventDefault();
      console.log("Searching for:", searchTerm);
   };

   const filteredCategories = categories.filter(
      (category) =>
         category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         category.description.toLowerCase().includes(searchTerm.toLowerCase())
   );

   if (loading) {
      return <LoadingSpinner text="Loading forums..." />;
   }

   if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
         <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header Section */}
            <div className="text-center mb-12">
               <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
                  <span className="text-3xl">💬</span>
               </div>
               <h1 className="text-5xl font-bold text-gray-900 mb-4">Sports Forums</h1>
               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Connect with fellow sports enthusiasts, share insights, and join passionate discussions
               </p>
            </div>

            {/* Search and Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
               <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <form onSubmit={handleSearch} className="flex-1 max-w-md">
                     <div className="relative">
                        <input
                           type="text"
                           placeholder="Search discussions, topics, users..."
                           className="w-full px-6 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                           <span className="text-gray-400">🔍</span>
                        </div>
                     </div>
                  </form>

                  <div className="flex gap-3">
                     {isAuthenticated ? (
                        <Link
                           to="/create-post"
                           className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center gap-2 font-semibold"
                        >
                           <span>✏️</span>
                           Create New Post
                        </Link>
                     ) : (
                        <Link
                           to="/login"
                           className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors shadow-lg flex items-center gap-2 font-semibold"
                        >
                           <span>🔐</span>
                           Log in to Post
                        </Link>
                     )}
                  </div>
               </div>
            </div>

            {/* Categories Grid */}
            <div className="mb-12">
               <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Forum Categories</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCategories.length > 0 ? (
                     filteredCategories.map((category) => (
                        <Link key={category.id} to={`/forums/${category.id}`} className="group">
                           <div
                              className={`border-2 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${category.color}`}
                           >
                              <div className="flex items-start gap-4">
                                 <div className="text-4xl">{category.icon}</div>
                                 <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                                       {category.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{category.description}</p>
                                    <div className="flex items-center gap-2">
                                       <span className="text-xs font-semibold bg-white bg-opacity-70 px-3 py-1 rounded-full">
                                          {category.postCount} posts
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </Link>
                     ))
                  ) : (
                     <div className="col-span-full text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-gray-500 text-lg">No categories match your search.</p>
                     </div>
                  )}
               </div>
            </div>

            {/* Recent Discussions */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
               <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                     <span>🔥</span>
                     Recent Discussions
                  </h2>
               </div>

               <div className="divide-y divide-gray-100">
                  {recentPosts.map((post) => (
                     <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-4">
                           <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {post.avatar}
                           </div>

                           <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                 <div className="flex-1">
                                    <Link
                                       to={`/post/${post.id}`}
                                       className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors block mb-1"
                                    >
                                       {post.title}
                                       {post.isHot && <span className="ml-2 text-red-500">🔥</span>}
                                    </Link>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                       <span className="flex items-center gap-1">
                                          <span>👤</span>
                                          {post.author}
                                       </span>
                                       <span className="flex items-center gap-1">
                                          <span>📂</span>
                                          {post.category}
                                       </span>
                                       <span className="flex items-center gap-1">
                                          <span>🕒</span>
                                          {post.date}
                                       </span>
                                    </div>
                                 </div>
                              </div>

                              <div className="flex items-center gap-6 text-sm">
                                 <span className="flex items-center gap-1 text-blue-600 font-medium">
                                    <span>💬</span>
                                    {post.replies} replies
                                 </span>
                                 <span className="flex items-center gap-1 text-gray-500">
                                    <span>👁️</span>
                                    {post.views} views
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="px-8 py-4 bg-gray-50 border-t">
                  <Link
                     to="/forums/all"
                     className="text-blue-600 hover:text-blue-700 font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                     View All Discussions
                     <span>→</span>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Forums;
