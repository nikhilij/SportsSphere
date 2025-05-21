import React, { useState } from 'react';

const scholarshipsData = [
    {
        id: 1,
        name: 'Athletic Excellence Scholarship',
        description: 'Awarded to student-athletes who demonstrate outstanding performance in their sport and academics.',
        amount: '$2,500',
        deadline: '2024-08-15',
        eligibility: 'High school seniors with a GPA of 3.0+ and varsity sports participation.',
    },
    {
        id: 2,
        name: 'Women in Sports Leadership Grant',
        description: 'Supports female athletes pursuing leadership roles in sports organizations.',
        amount: '$1,500',
        deadline: '2024-09-01',
        eligibility: 'Female students enrolled in undergraduate sports programs.',
    },
    {
        id: 3,
        name: 'Community Sports Volunteer Award',
        description: 'For students who have made significant contributions to community sports initiatives.',
        amount: '$1,000',
        deadline: '2024-07-20',
        eligibility: 'Open to all students with 50+ hours of community sports volunteering.',
    },
];

function ScholarshipCard({ scholarship }) {
    return (
        <div style={styles.card}>
            <h2>{scholarship.name}</h2>
            <p>{scholarship.description}</p>
            <ul>
                <li><strong>Amount:</strong> {scholarship.amount}</li>
                <li><strong>Deadline:</strong> {scholarship.deadline}</li>
                <li><strong>Eligibility:</strong> {scholarship.eligibility}</li>
            </ul>
            <button style={styles.button}>Apply Now</button>
        </div>
    );
}

export default function Scholarship() {
    const [search, setSearch] = useState('');

    const filteredScholarships = scholarshipsData.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <h1>Sports Scholarships</h1>
            <input
                type="text"
                placeholder="Search scholarships..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={styles.input}
            />
            <div style={styles.list}>
                {filteredScholarships.length === 0 ? (
                    <p>No scholarships found.</p>
                ) : (
                    filteredScholarships.map(scholarship => (
                        <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: 800,
        margin: '0 auto',
        padding: 24,
        fontFamily: 'Arial, sans-serif',
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 24,
        fontSize: 16,
        borderRadius: 4,
        border: '1px solid #ccc',
    },
    list: {
        display: 'grid',
        gap: 24,
    },
    card: {
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        padding: 20,
        background: '#fafafa',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    },
    button: {
        marginTop: 12,
        padding: '8px 16px',
        background: '#1976d2',
        color: '#fff',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
    },
};