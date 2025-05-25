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

const sendScholarshipDeadlineReminders = async () => {
    try {
        const now = dayjs();
        const upcomingDeadlines = await pool.query(
            'SELECT id, name, deadline FROM scholarships WHERE deadline > $1 AND deadline <= $2',
            [now.toISOString(), now.add(7, 'day').toISOString()]
        );

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your_email@gmail.com',
                pass: 'your_email_password',
            },
        });

        for (const scholarship of upcomingDeadlines.rows) {
            const applicants = await pool.query(
                'SELECT email FROM users WHERE id IN (SELECT user_id FROM scholarship_applications WHERE scholarship_id = $1)',
                [scholarship.id]
            );

            for (const applicant of applicants.rows) {
                const mailOptions = {
                    from: 'your_email@gmail.com',
                    to: applicant.email,
                    subject: `Reminder: Scholarship Deadline Approaching - ${scholarship.name}`,
                    text: `Hello, this is a reminder that the deadline for the scholarship "${scholarship.name}" is on ${scholarship.deadline}. Please ensure you complete your application before the deadline.`,
                };

                await transporter.sendMail(mailOptions);
                console.log(`Reminder sent to ${applicant.email} for scholarship "${scholarship.name}".`);
            }
        }
    } catch (error) {
        console.error('Error sending scholarship deadline reminders:', error);
    } finally {
        await pool.end();
    }
};

sendScholarshipDeadlineReminders();