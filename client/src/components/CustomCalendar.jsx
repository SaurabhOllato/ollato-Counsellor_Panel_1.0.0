import React from 'react';

function CustomCalendar({ date, onDateChange }) {
  // Your code to generate a calendar grid goes here.

  return (
    <div className="grid grid-cols-7 mt-4">
      {/* Render days in a week */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="font-medium text-indigo-600">{day}</div>
      ))}

      {/* Generate your date cells */}
      {/* Replace with your logic to display dates */}
      <div className="p-3 border border-indigo-200 hover:bg-indigo-100 cursor-pointer rounded-md">
        1
      </div>
      {/* Add cells for dates... */}
    </div>
  );
}

export default CustomCalendar;