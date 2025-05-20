import React, { useState, useEffect } from "react";
import { FaCreditCard } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";
import { IoReturnDownBackSharp } from "react-icons/io5";
import pfp from "../../assets/Client/pfp.png";
import bgImage from "../../assets/bg.jpg";
import axios from "axios";

import logo from "./../../assets/home/logo.png";
import gear from "./../../assets/Client/Gear.png";
import Vector from "./../../assets/Client/Vector.png";
import { IoMdNotificationsOutline } from "react-icons/io";

import { Link } from "react-router-dom";

import LSideBar from "./components/L-sidebar.jsx";

const LawyersDashboard = () => {
  let [showNotification, setshowNotification] = useState(false);
  const lawyer = JSON.parse(localStorage.getItem("lawyer"));
  const [appointmentStats, setAppointmentStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    cancelled: 0,
    today: 0,
  });
  const [lawyerBio, setLawyerBio] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Create axios instance outside useEffect to prevent recreation on each render
  const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    let isMounted = true; // Flag to prevent setting state after component unmounts

    const fetchLawyerData = async () => {
      if (!lawyer?._id) return; // Don't fetch if no lawyer ID

      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get(`/api/lawyers/dashboard/${lawyer._id}`);

        if (!isMounted) return; // Don't update state if component unmounted

        if (response.data) {
          setLawyerBio(response.data.bio || "No bio available");
          setAppointmentStats(
            response.data.stats || {
              total: 0,
              completed: 0,
              pending: 0,
              cancelled: 0,
              today: 0,
            }
          );
        }

        // Fetch bookings for the lawyer
        const bookingsRes = await api.get(
          `/api/bookings?lawyerId=${lawyer._id}`
        );
        if (isMounted) setBookings(bookingsRes.data || []);
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching lawyer data:", error);
        setError(error.message);
        setAppointmentStats({
          total: 0,
          completed: 0,
          pending: 0,
          cancelled: 0,
          today: 0,
        });
        setLawyerBio("No bio available");
        setBookings([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchLawyerData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [lawyer?._id]); // Only re-run if lawyer._id changes

  const handleNotification = () => {
    setshowNotification((toggle) => !toggle);
  };
  const array_transaction = [
    {
      img: pfp,
      customer: "Awais Raza",
      appointmentPurpose: "Family Matter",
      date: "2025-05-08",
      amount: "10000 PKR",
      status: "Paid",
    },
    {
      img: pfp,
      customer: "Ali Khan",
      appointmentPurpose: "Divorce Consultation",
      date: "2025-05-07",
      amount: "8000 PKR",
      status: "Paid",
    },
    {
      img: pfp,
      customer: "Sara Malik",
      appointmentPurpose: "Criminal Defense",
      date: "2025-05-06",
      amount: "12000 PKR",
      status: "Paid",
    },
  ];

  // Helper function for status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "cancelled":
        return "bg-red-500";
      case "completed":
        return "bg-green-500";
      case "confirmed":
        return "bg-yellow-400 text-black";
      case "pending":
        return "bg-blue-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <>
      <div className="">
        {/* HEADER */}
        <div className="flex justify-between mx-20 mt-6">
          <img src={logo} alt="" className="w-[219px] h-[57px]" />

          <div className="flex justify-between relative gap-4 items-center">
            <Link to="/lawyersettings">
              <img
                src={gear}
                className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
                alt="Settings"
              />
            </Link>
            <div className="flex justify-between gap-1.5">
              <img src={pfp} className="w-7 h-7 rounded-4xl" alt="" />
              <p className="text-neutral-600 font-semibold">{lawyer.name}</p>
            </div>
          </div>
        </div>
        <hr className="border-1 border-gray-200 mt-3" />
      </div>
      <div>
        {" "}
        <div className="flex">
          {" "}
          {/* Wrapper */}
          <LSideBar />
          <div className="px-4 py-3 w-full">
            {" "}
            {/* Main Content */}
            <p className="text-2xl font-bold mb-5">
              Welcome Back, {lawyer.name}
            </p>
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500">Error: {error}</div>
            ) : (
              <>
                <div
                  className="w-full h-[200px] bg-cover bg-center relative my-5 mx-auto rounded-md px-5 flex items-center text-white bg-blend-darken"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundColor: "rgba(0, 0, 0, 0.4)", // black overlay for blending
                  }}
                >
                  <p className="italic font-serif text-starts text-gray-200 text-2xl">
                    "There is but one law for all, namely, that law which
                    governs all law, the law of our Creator, the law of
                    humanity, justice, equity — the law of nature and of
                    nations."
                    <span className="block text-right text-xs mt-2 mr-4">
                      — EDMUND BURKE
                    </span>
                  </p>
                </div>
                <div className="flex gap-5 mb-10">
                  {" "}
                  {/* Revenue Summary */}
                  <div className="flex flex-col w-1/4  text-black bg-gray-100 rounded-xl p-5">
                    <div className="flex items-center justify-center mb-4 gap-3">
                      <FaRegStar size={25} />
                      <div className="text-md font-semibold">
                        Total Appointments
                      </div>
                    </div>
                    <p className="text-[26px] font-bold text-center">
                      {appointmentStats.total}
                    </p>

                    <div
                      className="mt-4 flex gap-4
                    items-center justify-center"
                    >
                      <p className="text-md text-center text-[#62B9CB]">
                        Your Total Appointments Since Joining
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col w-1/4  text-black bg-gray-100 rounded-xl p-5">
                    <div className="flex items-center justify-center mb-4 gap-3">
                      <IoReturnDownBackSharp size={25} />
                      <div className="text-md font-semibold">
                        Today's Appointment
                      </div>
                    </div>
                    <p className="text-[26px] font-bold text-center">
                      {appointmentStats.today}
                    </p>

                    <div
                      className="mt-4 flex gap-4
                    items-center justify-center"
                    >
                      <p className="text-[18px] text-[#62B9CB]">
                        {appointmentStats.pending} Pending
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col w-2/4  text-black bg-gray-100 rounded-xl p-5">
                    <div className="flex items-center gap-4">
                      <div className="text-md font-semibold">Bio</div>
                    </div>
                    <div className="mt-4 flex justify-between flex-col items-start gap-4">
                      <p className="text-sm">
                        {lawyerBio || "No bio available"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full border border-neutral-200 rounded-xl p-5 mt-10">
                  {" "}
                  {/* Transaction Table */}
                  <div className="flex font-semibold text-[15px] pb-3 border-b border-neutral-200 mb-3">
                    <div className="w-1/3">Customer</div>
                    <div className="w-1/3">Date</div>
                    <div className="w-1/3">Status</div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {" "}
                    {/* Rows */}
                    {bookings.length === 0 ? (
                      <div className="text-center text-gray-500 py-4">
                        No bookings found.
                      </div>
                    ) : (
                      bookings.map((element, index) => (
                        <div
                          key={index}
                          className="flex items-center w-full border border-neutral-200 rounded-xl px-5 py-3"
                        >
                          <div className="w-1/3 flex items-center gap-3">
                            <img
                              src={pfp}
                              alt="Customer"
                              className="w-12 h-12 rounded-full"
                            />
                            <p className="font-medium">{element.userName}</p>
                          </div>
                          <div className="w-1/3">
                            <p className="text-[13px] font-semibold text-[#62B9CB]">
                              {element.date
                                ? new Date(element.date)
                                    .toISOString()
                                    .split("T")[0]
                                : ""}
                            </p>
                          </div>
                          <div className="w-1/3">
                            <button
                              className={`px-8 py-2 text-sm font-semibold rounded-3xl ${
                                element.status === "confirmed"
                                  ? "text-black"
                                  : "text-white"
                              } ${getStatusColor(element.status)}`}
                            >
                              {element.status}
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex justify-end mr-4 mt-4 font-bold">
                    <button>View All</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyersDashboard;
