import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const VerifyEmail = () => {
    const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, success, error
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [isResending, setIsResending] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    useEffect(() => {
        if (token) {
            verifyEmailToken();
        } else {
            setIsLoading(false);
            setVerificationStatus('error');
            setMessage('Verification token not found');
        }
    }, [token]);

    const verifyEmailToken = async () => {
        try {
            setIsLoading(true);
            // Replace with actual API call
            // const response = await authApi.verifyEmail(token);
            
            // Mock verification
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setVerificationStatus('success');
            setMessage('Your email has been successfully verified!');
            
            // Redirect to login after success
            setTimeout(() => {
                navigate('/login', { 
                    state: { message: 'Email verified successfully! Please log in.' }
                });
            }, 3000);
            
        } catch (error) {
            setVerificationStatus('error');
            setMessage(error.response?.data?.message || 'Verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const resendVerification = async () => {
        if (!email) {
            setMessage('Email address not found. Please request a new verification link.');
            return;
        }

        try {
            setIsResending(true);
            // Replace with actual API call
            // await authApi.resendVerification(email);
            
            // Mock resend
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setMessage('Verification email sent! Please check your inbox.');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to resend verification email.');
        } finally {
            setIsResending(false);
        }
    };

    const getStatusIcon = () => {
        if (isLoading) {
            return <ArrowPathIcon className="w-16 h-16 text-blue-500 animate-spin" />;
        }
        
        switch (verificationStatus) {
            case 'success':
                return <CheckCircleIcon className="w-16 h-16 text-green-500" />;
            case 'error':
                return <XCircleIcon className="w-16 h-16 text-red-500" />;
            default:
                return <ArrowPathIcon className="w-16 h-16 text-blue-500" />;
        }
    };

    const getStatusColor = () => {
        switch (verificationStatus) {
            case 'success':
                return 'text-green-600';
            case 'error':
                return 'text-red-600';
            default:
                return 'text-blue-600';
        }
    };

    const getStatusTitle = () => {
        if (isLoading) return 'Verifying your email...';
        
        switch (verificationStatus) {
            case 'success':
                return 'Email Verified Successfully!';
            case 'error':
                return 'Verification Failed';
            default:
                return 'Verifying Email';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Sports<span className="text-blue-600">Sphere</span>
                    </h1>
                    <p className="text-gray-600">Verify your email address</p>
                </div>

                {/* Verification Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {/* Status Icon */}
                    <div className="flex justify-center mb-6">
                        {getStatusIcon()}
                    </div>

                    {/* Status Title */}
                    <h2 className={`text-2xl font-bold text-center mb-4 ${getStatusColor()}`}>
                        {getStatusTitle()}
                    </h2>

                    {/* Status Message */}
                    <div className="text-center mb-6">
                        <p className="text-gray-600 leading-relaxed">
                            {message || (isLoading ? 'Please wait while we verify your email address.' : '')}
                        </p>
                        
                        {email && (
                            <p className="text-sm text-gray-500 mt-2">
                                Verifying: <span className="font-medium">{email}</span>
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {verificationStatus === 'error' && (
                            <button
                                onClick={resendVerification}
                                disabled={isResending}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                {isResending ? (
                                    <>
                                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                        Resending...
                                    </>
                                ) : (
                                    'Resend Verification Email'
                                )}
                            </button>
                        )}

                        {verificationStatus === 'success' && (
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                            >
                                Continue to Login
                            </button>
                        )}

                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                        >
                            Back to Login
                        </button>
                    </div>

                    {/* Help Text */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-xs text-gray-500 text-center">
                            Didn't receive the email? Check your spam folder or{' '}
                            <button
                                onClick={resendVerification}
                                disabled={isResending || !email}
                                className="text-blue-600 hover:text-blue-700 underline disabled:opacity-50 disabled:no-underline"
                            >
                                request a new one
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        Need help?{' '}
                        <button 
                            onClick={() => navigate('/contact')}
                            className="text-blue-600 hover:text-blue-700 underline"
                        >
                            Contact Support
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;