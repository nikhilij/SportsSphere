const redis = require('redis');
const { promisify } = require('util');

// Get Redis configuration from environment variables with fallbacks
const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';
const RETRY_MAX_ATTEMPTS = process.env.REDIS_RETRY_MAX_ATTEMPTS || 10;
const RETRY_DELAY_MS = process.env.REDIS_RETRY_DELAY_MS || 3000;

// Create Redis client with retry strategy
const client = redis.createClient({
    url: redisURL,
    retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            console.error('Redis connection refused. Retrying...');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            console.error('Redis retry time exhausted');
            return new Error('Redis retry time exhausted');
        }
        if (options.attempt > RETRY_MAX_ATTEMPTS) {
            console.error(`Redis max retry attempts (${RETRY_MAX_ATTEMPTS}) exceeded`);
            return new Error('Redis max retry attempts exceeded');
        }
        // Increase delay with each attempt with some randomization
        const delay = Math.min(options.attempt * RETRY_DELAY_MS, 30000);
        return delay;
    }
});

// Handle Redis connection events
client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('ready', () => {
    console.log('Redis client ready for use');
});

client.on('reconnecting', () => {
    console.log('Redis client reconnecting');
});

client.on('end', () => {
    console.log('Redis client connection closed');
});

client.on('error', (err) => {
    console.error('Redis client error:', err);
});

// Promisify Redis methods for easier async/await usage
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);
const expireAsync = promisify(client.expire).bind(client);
const existsAsync = promisify(client.exists).bind(client);
const flushdbAsync = promisify(client.flushdb).bind(client);

// Health check function
const isHealthy = async () => {
    try {
        const pingResult = await promisify(client.ping).bind(client)();
        return pingResult === 'PONG';
    } catch (error) {
        console.error('Redis health check failed:', error);
        return false;
    }
};

// Graceful shutdown helper
const shutdown = async () => {
    try {
        await promisify(client.quit).bind(client)();
        console.log('Redis connection closed gracefully');
        return true;
    } catch (error) {
        console.error('Error closing Redis connection:', error);
        return false;
    }
};

module.exports = {
    client,
    getAsync,
    setAsync,
    delAsync,
    expireAsync,
    existsAsync,
    flushdbAsync,
    isHealthy,
    shutdown,
};