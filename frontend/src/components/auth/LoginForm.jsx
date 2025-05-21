import { useState } from "react";

const LoginForm = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        if (!form.email || !form.password) {
            setError("Please fill in all fields.");
            return;
        }
        // Simulate login
        alert("Logged in!");
    };

    const handleSocialLogin = (provider) => {
        // Add your social login logic here
        alert(`Login with ${provider}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Sign in to SportsSphere</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Sign In
                    </button>
                </form>
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-200"></div>
                    <span className="mx-3 text-gray-400 text-sm">or</span>
                    <div className="flex-grow h-px bg-gray-200"></div>
                </div>
                <div className="space-y-3">
                    <button
                        onClick={() => handleSocialLogin("Google")}
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.6 32.9 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4c-7.2 0-13.3 4.1-16.7 10.7z"/><path fill="#FBBC05" d="M24 44c5.6 0 10.5-1.9 14.3-5.2l-6.6-5.4C29.9 35.7 27.1 36.7 24 36.7c-6.1 0-10.6-3.1-12.7-7.7l-7 5.4C7.7 39.9 15.2 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.2-7.7 5.2-2.2 0-4.2-.7-5.7-2l-7 5.4C15.2 39.9 19.4 44 24 44c5.6 0 10.5-1.9 14.3-5.2l-6.6-5.4C29.9 35.7 27.1 36.7 24 36.7c-6.1 0-10.6-3.1-12.7-7.7l-7 5.4C7.7 39.9 15.2 44 24 44z"/></g></svg>
                        Continue with Google
                    </button>
                    <button
                        onClick={() => handleSocialLogin("Facebook")}
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#1877F3" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 10.995 10.125 11.854v-8.385H7.078v-3.47h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.953.926-1.953 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.068 24 18.092 24 12.073z"/></svg>
                        Continue with Facebook
                    </button>
                    <button
                        onClick={() => handleSocialLogin("Apple")}
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#000" d="M16.365 1.43c0 1.14-.93 2.06-2.07 2.06-.02-1.18.95-2.06 2.07-2.06zm4.53 16.38c-.06-3.36 2.74-4.96 2.86-5.04-1.56-2.28-3.98-2.6-4.83-2.63-2.06-.21-4.03 1.21-5.08 1.21-1.06 0-2.7-1.18-4.45-1.15-2.29.03-4.41 1.33-5.59 3.38-2.39 4.13-.61 10.23 1.71 13.58 1.13 1.62 2.47 3.44 4.23 3.37 1.7-.07 2.34-1.09 4.39-1.09 2.05 0 2.62 1.09 4.41 1.06 1.83-.03 2.98-1.65 4.09-3.28 1.29-1.89 1.82-3.72 1.84-3.81-.04-.02-3.53-1.36-3.59-5.4zm-6.08-13.1c.38-.46.64-1.1.57-1.74-.55.02-1.21.37-1.6.83-.35.41-.67 1.07-.55 1.7.59.05 1.2-.3 1.58-.79z"/></svg>
                        Continue with Apple
                    </button>
                </div>
                <div className="mt-6 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="text-indigo-600 hover:underline font-medium">
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;