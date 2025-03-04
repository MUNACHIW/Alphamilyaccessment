// src/components/BookingList.js
import React from 'react';

const BookingList = ({ bookings, onEdit, onDelete }) => {
  return (
    <div className='dataholder'>
                <h2>Booking List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Month</th>
            <th>Day</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.month}</td>
              <td>{booking.day}</td>
              <td>{booking.time}</td>
              <td className='actions'>
                <button onClick={() => onEdit(booking)}>Edit</button>
                <button onClick={() => onDelete(booking.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
