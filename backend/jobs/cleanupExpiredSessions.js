const { Pool } = require('pg');
const dayjs = require('dayjs');

const pool = new Pool({
    user: 'your_database_user',
    host: 'your_database_host',
    database: 'your_database_name',
    password: 'your_database_password',
    port: 5432,
});

const cleanupExpiredSessions = async () => {
    try {
        const now = dayjs().toISOString();
        const result = await pool.query(
            'DELETE FROM sessions WHERE expiry_date < $1 RETURNING *',
            [now]
        );

        console.log(`Deleted ${result.rowCount} expired sessions.`);
    } catch (error) {
        console.error('Error cleaning up expired sessions:', error);
    } finally {
        await pool.end();
    }
};

cleanupExpiredSessions();