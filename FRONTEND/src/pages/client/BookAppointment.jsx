import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lawyer, user } = location.state || {};
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  // Generate time slots (9 AM to 5 PM)
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9;
    return `${hour}:00 ${hour >= 12 ? "PM" : "AM"}`;
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (!selectedTime) {
      alert("Please select a time slot");
      return;
    }

    navigate("/payment", {
      state: {
        lawyer,
        user,
        appointmentDetails: {
          date: selectedDate,
          time: selectedTime,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">
          Book Appointment with {lawyer?.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Select Date</h2>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={new Date()}
              className="border rounded-lg p-4"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Select Time</h2>
            <div className="grid grid-cols-2 gap-4">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`p-3 rounded-lg border ${
                    selectedTime === time
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleContinue}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
