const { Pool } = require('pg');
const dayjs = require('dayjs');
const nodemailer = require('nodemailer');

const pool = new Pool({
    user: 'your_database_user',
    host: 'your_database_host',
    database: 'your_database_name',
    password: 'your_database_password',
    port: 5432,
});

const sendEventReminders = async () => {
    try {
        const now = dayjs().toISOString();
        const upcomingEvents = await pool.query(
            'SELECT * FROM events WHERE event_date > $1 AND event_date <= $2',
            [now, dayjs().add(1, 'day').toISOString()]
        );

        if (upcomingEvents.rowCount === 0) {
            console.log('No upcoming events to send reminders for.');
            return;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your_email@gmail.com',
                pass: 'your_email_password',
            },
        });

        for (const event of upcomingEvents.rows) {
            const participants = await pool.query(
                'SELECT email FROM users WHERE id = ANY($1)',
                [event.participant_ids]
            );

            for (const participant of participants.rows) {
                const mailOptions = {
                    from: 'your_email@gmail.com',
                    to: participant.email,
                    subject: `Reminder: Upcoming Event - ${event.name}`,
                    text: `Hello, this is a reminder for the upcoming event "${event.name}" scheduled on ${event.event_date}.`,
                };

                await transporter.sendMail(mailOptions);
                console.log(`Reminder sent to ${participant.email} for event "${event.name}".`);
            }
        }
    } catch (error) {
        console.error('Error sending event reminders:', error);
    } finally {
        await pool.end();
    }
};

sendEventReminders();