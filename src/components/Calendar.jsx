import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Calendar.css';

function Calendar({ onNameSelect }) {
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedName, setSelectedName] = useState('');
    const [otherName, setOtherName] = useState('');

    const friends = ['Nana', 'Bela', 'Maeva', 'Mala', 'Ana F', 'Sophia'];

    const handleNameChange = (e) => {
        const name = e.target.value;
        setSelectedName(name);

        // If "Other" is selected, pass the "otherName" state to parent
        if (name !== 'Other') {
            onNameSelect(name);
        }
    };

    const handleOtherNameChange = (e) => {
        const name = e.target.value;
        setOtherName(name);

        // Update the parent with "Other" name changes
        if (selectedName === 'Other') {
            onNameSelect(name);
        }
    };

    const handleDateClick = (info) => {
        const date = info.dateStr;
    
        setSelectedDates((prev) =>
            prev.includes(date)
                ? prev.filter((d) => d !== date)
                : [...prev, date]
        );
    
        // Add or remove visual highlight
        const dateCell = document.querySelector(`[data-date='${date}']`);
        if (dateCell) {
            dateCell.classList.toggle('fc-day-selected');
        }
    };
<div style={{ marginTop: '20px' }}>
    <h3>Your Selected Dates:</h3>
    <ul>
        {selectedDates.map((date) => (
            <li key={date}>{new Date(date).toDateString()}</li>
        ))}
    </ul>
</div>
    

    const handleSubmit = async () => {
        const name = selectedName === 'Other' ? otherName : selectedName;
        if (!name || selectedDates.length === 0) {
            alert('Please select your name and at least one date.');
            return;
        }

        // Submit data to backend
        const response = await fetch('https://your-backend-url/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                dates: selectedDates,
            }),
        });

        if (response.ok) {
            alert('Availability submitted successfully!');
            setSelectedDates([]);
            setSelectedName('');
            setOtherName('');
        } else {
            alert('Failed to submit. Please try again.');
        }
    };

    return (
        <section className="calendar">
            <h2>📅 Select Your Availability</h2>
            <label htmlFor="friend-select">Choose your name:</label>
            <select
                id="friend-select"
                value={selectedName}
                onChange={handleNameChange}
                style={{ margin: '10px 0', padding: '10px' }}
            >
                <option value="">-- Select your name --</option>
                {friends.map((friend) => (
                    <option key={friend} value={friend}>
                        {friend}
                    </option>
                ))}
                <option value="Other">Other</option>
            </select>
            {selectedName === 'Other' && (
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={otherName}
                    onChange={handleOtherNameChange}
                    style={{ margin: '10px 0', padding: '10px', display: 'block' }}
                />
            )}
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                events={selectedDates.map((date) => ({ title: "You're Available", date }))}
                height="auto"
            />
            <button
                onClick={handleSubmit}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Submit
            </button>
        </section>
    );
}

export default Calendar;
