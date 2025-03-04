// src/components/BookingForm.js
import React, { useState, useEffect } from 'react';

const BookingForm = ({ onCreateOrUpdate, editingBooking }) => {
  const [booking, setBooking] = useState({
    id: null,
    name: '',
    email: '',
    month: '',
    day: '',
    time: '',
  });

  useEffect(() => {
    if (editingBooking) {
      setBooking(editingBooking);
    }
  }, [editingBooking]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateOrUpdate(booking);
    setBooking({
      id: null,
      name: '',
      email: '',
      month: '',
      day: '',
      time: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2 className='h2'>{booking.id ? 'Edit Booking' : 'Create Booking'}</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={booking.name}
        onChange={handleChange}
        required
        className='input'
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={booking.email}
        onChange={handleChange}
        required
        className='input'
      />
      <input
        type="month"
        name="month"
        placeholder="Month"
        value={booking.month}
        onChange={handleChange}
        required
        className='input'
      />
      <input
        list='days'
        name="day"
        placeholder="Day"
        value={booking.day}
        onChange={handleChange}
        required
        className='input'
      />
       <datalist id='days'>
          <option value="Sunday"></option>
          <option value="Monday"></option>
          <option value="Tuesday"></option>
          <option value="Wednesday"></option>
          <option value="Thursday"></option>
          <option value="Friday"></option>
          <option value="Saturday"></option>
        </datalist>
      <input
        type="time"
        name="time"
        placeholder="Time"
        value={booking.time}
        onChange={handleChange}
        required
        className='input'
      />
      <button type="submit" className='button'>{booking.id ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default BookingForm;
