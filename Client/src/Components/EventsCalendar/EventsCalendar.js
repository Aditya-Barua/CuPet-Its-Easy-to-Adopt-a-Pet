// src/Components/EventsCalendar/EventsCalendar.js
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./EventsCalendar.css";

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const eventsOnSelectedDate = events.filter(
      (event) => event.date === formattedDate
    );
    setSelectedDateEvents(eventsOnSelectedDate);
  };

  const highlightEventDates = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    return events.some((event) => event.date === formattedDate) ? (
      <div className="event-highlight"></div>
    ) : null;
  };

  return (
    <div className="events-calendar">
      <h2>Events Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={highlightEventDates}
      />
      <div className="events-list">
        <h3>Events on {date.toDateString()}</h3>
        {selectedDateEvents.length > 0 ? (
          selectedDateEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h4>{event.title}</h4>
              <p>{event.description}</p>
            </div>
          ))
        ) : (
          <p>No events for this date.</p>
        )}
      </div>
    </div>
  );
};

export default EventsCalendar;
