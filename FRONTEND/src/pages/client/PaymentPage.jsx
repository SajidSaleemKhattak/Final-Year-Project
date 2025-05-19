import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lawyer, user, appointmentDetails } = location.state || {};
  const [loading, setLoading] = useState(false);

  // Configure axios defaults
  axios.defaults.withCredentials = true;
  const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const handleExternalPayment = async () => {
    try {
      setLoading(true);
      // Create a pending booking first
      const bookingResponse = await api.post("/api/bookings", {
        lawyerId: lawyer._id,
        userName: user.name,
        userEmail: user.email,
        date: appointmentDetails.date,
        time: appointmentDetails.time,
        status: "pending",
        paymentMethod: "external",
        paymentStatus: "pending",
      });

      // Instead of redirecting immediately, show a modal or message
      // that the appointment request has been sent to the lawyer
      alert(
        "Your appointment request has been sent to the lawyer. You will be notified once the lawyer confirms your appointment."
      );

      // Navigate back to appointments page
      navigate("/appointments");
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate appointment request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStripePayment = async () => {
    try {
      setLoading(true);
      // Create a pending booking
      const bookingResponse = await api.post("/api/bookings", {
        lawyerId: lawyer._id,
        userName: user.name,
        userEmail: user.email,
        date: appointmentDetails.date,
        time: appointmentDetails.time,
        status: "pending",
        paymentMethod: "stripe",
      });

      // Create Stripe payment intent
      const {
        data: { clientSecret },
      } = await api.post("/api/create-payment-intent", {
        bookingId: bookingResponse.data._id,
        amount: 1000, // Amount in cents (e.g., $10.00)
        currency: "usd",
      });

      // Redirect to Stripe payment page
      window.location.href = `http://localhost:5000/payment?client_secret=${clientSecret}`;
    } catch (error) {
      console.error("Stripe payment failed:", error);
      alert("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Payment Details</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Appointment Summary</h2>
          <p>Lawyer: {lawyer?.name}</p>
          <p>Date: {appointmentDetails?.date?.toLocaleDateString()}</p>
          <p>Time: {appointmentDetails?.time}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

          <button
            onClick={handleExternalPayment}
            disabled={loading}
            className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
          >
            <span>Pay through External Payment</span>
            <span>→</span>
          </button>

          <button
            onClick={handleStripePayment}
            disabled={loading}
            className="w-full p-4 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
          >
            <span>Pay with Stripe</span>
            <span>→</span>
          </button>
        </div>

        {loading && (
          <div className="mt-4 text-center text-gray-600">
            Processing payment...
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
