import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../assets/home/logo.png";
import gear from "../../assets/Client/Gear.png";
import Vector from "../../assets/Client/Vector.png";
import pfp from "../../assets/Client/pfp.png";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";

const Contact = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };

  const handleNotification = () => {
    setShowNotification((toggle) => !toggle);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );
      if (response.data.success) {
        setSubmitStatus({
          success: true,
          message: "Message sent successfully!",
        });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message:
          error.response?.data?.error ||
          "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-between mx-20 mt-6">
        <img src={logo} alt="Logo" className="w-[219px] h-[57px]" />
        <div className="flex justify-between relative gap-4 items-center">
          <img
            src={Vector}
            onClick={handleNotification}
            className="w-5 h-5 hover:scale-120 duration-150 cursor-pointer active:scale-110"
            alt="Notifications"
          />
          {showNotification && (
            <div className="absolute top-12 flex border-[#62B9CB] -left-3 justify-between gap-6 font-semibold z-50 border-2 rounded-xl py-4 pb-7 w-70 flex-col items-center bg-white text-[#62B9CB]">
              <div className="flex justify-between px-6 bg-[#62B9CB] w-full py-4 -mt-[17px] border-0 rounded-t-xl">
                <div className="text-xl text-white">Notifications</div>
                <div className="text-white">
                  <IoMdNotificationsOutline size={30} />
                </div>
              </div>
              <div className="flex gap-4 justify-between items-center w-full px-6">
                <Link to="/appointments/completed">
                  <div className="text-lg underline underline-offset-6 hover:text-black">
                    Appointment Approved
                  </div>
                </Link>
                <div className="text-lg bg-[#62B9CB] px-3 text-white rounded-full">
                  2
                </div>
              </div>
              <div className="flex gap-4 justify-between items-center w-full px-6">
                <Link to="/messages">
                  <div className="text-lg underline underline-offset-6 hover:text-[#62B9CB]">
                    New Messages
                  </div>
                </Link>
                <div className="text-lg bg-[#62B9CB] px-3 text-white rounded-full">
                  7
                </div>
              </div>
              <div className="flex gap-4 justify-between items-center w-full px-6">
                <Link to="/appointments">
                  <div className="text-lg underline underline-offset-6 hover:text-[#62B9CB]">
                    Appointment Pendings
                  </div>
                </Link>
                <div className="text-lg bg-[#62B9CB] px-3 text-white rounded-full">
                  3
                </div>
              </div>
            </div>
          )}
          <img src={gear} className="w-5 h-5" alt="Settings" />
          <div className="flex gap-1.5 items-center">
            <img src={pfp} className="w-7 h-7 rounded-full" alt="Profile" />
            <p className="text-neutral-600 font-semibold">{user.name}</p>
          </div>
        </div>
      </div>
      <div id="Contact" className="min-h-screen overflow-x-hidden sm:px-12">
        {/* Form Contact */}
        <div className="flex pb-10 flex-col bg-stone-50 m-6 p-6 border-0 rounded-3xl py-14 gap-12 sm:px-14">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full max-w-xl mx-auto"
          >
            <h2 className="text-3xl font-semibold text-[#62B9CB]">
              Contact Us
            </h2>
            <hr className="w-full border-t-2 border-gray-300" />

            {submitStatus && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#62B9CB]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#62B9CB]"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message..."
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#62B9CB]"
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`border-2 border-[#62B9CB] text-[#62B9CB] hover:bg-[#62B9CB] hover:text-white transition-all rounded-3xl px-8 py-2 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>

            <hr className="w-full border-t border-gray-200" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
