import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Replace with your API endpoint
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                throw new Error('Failed to send reset email');
            }
            setSubmitted(true);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            {submitted ? (
                <p>
                    If an account with that email exists, a password reset link has been sent.
                </p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <button type="submit">Send Reset Link</button>
                    {error && <div className="error">{error}</div>}
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;