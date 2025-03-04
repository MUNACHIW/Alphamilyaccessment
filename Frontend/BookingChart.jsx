// src/components/BookingChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // Import the Line component instead of Pie
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const BookingChart = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('https://backendbookingsystem-3.onrender.com/bookings');
        const data = await response.json();
        setBookings(data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const bookingsByDay = bookings.reduce((acc, booking) => {
    acc[booking.day] = (acc[booking.day] || 0) + 1; // Counting the number of bookings per day
    return acc;
  }, {});

  const bookingsByMonth = bookings.reduce((acc, booking) => {
    const month = booking.month;
    acc[month] = (acc[month] || 0) + 1; // Counting the number of bookings per month
    return acc;
  }, {});

  const dataByDay = {
    labels: Object.keys(bookingsByDay),
    datasets: [
      {
        label: 'Bookings by Day',
        data: Object.values(bookingsByDay),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false, // Ensure the area under the line is not filled
        tension: 0.1, // Adjust the tension for a smooth, curved line
      },
    ],
  };

  const dataByMonth = {
    labels: Object.keys(bookingsByMonth),
    datasets: [
      {
        label: 'Bookings by Month',
        data: Object.values(bookingsByMonth),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className='canvasholder'>
      <h2>Bookings by Day</h2>
      <Line data={dataByDay} />
      <h2>Bookings by Month</h2>
      <Line data={dataByMonth} />
    </div>
  );
};

export default BookingChart;





