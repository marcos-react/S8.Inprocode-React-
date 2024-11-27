import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

export default function CalendarContainer() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEventTitle, setNewEventTitle] = useState("");

  // Obtain API Events
  const fetchEvents = () => {
    axios
      .get("http://localhost:5000/events")
      .then((response) => setEvents(response.data))
      .catch((err) => console.error("Error fetching events:", err));
  };

  // Add new events
  const handleAddEvent = () => {
    if (!newEventTitle.trim()) {
      alert("Title event is empty.");
      return;
    }

    axios
      .post("http://localhost:5000/events", {
        title: newEventTitle,
        date: selectedDate.toISOString().split("T")[0],
      })
      .then(() => {
        fetchEvents();
        setNewEventTitle("");
      })
      .catch((err) => console.error("Error adding event:", err));
  };

  // Delete event
  const handleDeleteEvent = (id) => {
    axios
      .delete(`http://localhost:5000/events/${id}`)
      .then(() => fetchEvents())
      .catch((err) => console.error("Error deleting event:", err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // dates with events and titles.
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const event = events.find(
        (event) =>
          new Date(event.date).toLocaleDateString() ===
          date.toLocaleDateString()
      );
      return event ? (
        <div className="text-xs text-blue-600 font-bold">{event.title}</div>
      ) : null;
    }
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Calendar</h1>

      {/* Calendar */}
      <div className="w-full max-w-4xl bg-base-100 rounded-lg shadow-lg p-6 mb-6 flex justify-center">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Form to add events */}
      <div className="w-full max-w-4xl bg-base-100 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Add events</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Event title"
            className="input input-bordered w-full"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleAddEvent}>
            Add
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="w-full max-w-4xl bg-base-100 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Event List</h2>
        <ul className="space-y-2">
          {events.map((event) => (
            <li
              key={event.id}
              className="flex justify-between items-center bg-blue-500 p-2 rounded-md"
            >
              <span>
                <strong>{event.title}</strong> - {event.date}
              </span>
              <button
                className="btn btn-error btn-sm"
                onClick={() => handleDeleteEvent(event.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
