// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingList from './BookingList.jsx';
import BookingForm from './Bookingform.jsx';
import BookingChart from './BookingChart.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if bookings data exists in local storage
    const cachedBookings = localStorage.getItem('bookings');
    if (cachedBookings) {
      setBookings(JSON.parse(cachedBookings));
      setLoading(false);
    } else {
      fetchBookings();
    }
  }, []);

  const fetchBookings = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await axios.get('https://backendbookingsystem-3.onrender.com/bookings');
      setBookings(response.data.bookings);
      // Cache the bookings data in local storage
      localStorage.setItem('bookings', JSON.stringify(response.data.bookings));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  };

  const handleCreateOrUpdateBooking = async (booking) => {
    try {
      if (booking.id) {
        await axios.put(`https://backendbookingsystem-3.onrender.com/book/${booking.id}`, booking);
      } else {
        await axios.post('https://backendbookingsystem-3.onrender.com/book', booking);
      }
      fetchBookings();
      setEditingBooking(null);
      // Clear the cached bookings data
      localStorage.removeItem('bookings');
    } catch (error) {
      console.error('Error creating/updating booking:', error);
    }
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
  };

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`https://backendbookingsystem-3.onrender.com/book/${id}`);
      fetchBookings();
      // Clear the cached bookings data
      localStorage.removeItem('bookings');
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <div className="chart-container">
            <BookingChart bookings={bookings} />
          </div>
          <div className="form-container">
            <BookingForm onCreateOrUpdate={handleCreateOrUpdateBooking} editingBooking={editingBooking} />
          </div>
          <div className="list-container">
            <BookingList bookings={bookings} onEdit={handleEditBooking} onDelete={handleDeleteBooking} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;


