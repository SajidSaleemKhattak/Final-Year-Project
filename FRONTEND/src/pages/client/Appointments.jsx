import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/home/logo.png";
import gear from "../../assets/Client/Gear.png";
import Vector from "../../assets/Client/Vector.png";
import pfp from "../../assets/Client/pfp.png";
import Sidebar from "../../pages/client/components/C-LSidebar";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointments = () => {
  let [showNotification, setshowNotification] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState({});
  const [submittedReviews, setSubmittedReviews] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  // Configure axios defaults
  const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get(`/api/bookings?userEmail=${user.email}`);
      const appointmentsData = response.data;

      // Fetch lawyer names for each appointment
      const appointmentsWithLawyer = await Promise.all(
        appointmentsData.map(async (appointment) => {
          try {
            // Extract the lawyer ID properly
            const lawyerId =
              typeof appointment.lawyerId === "object"
                ? appointment.lawyerId._id
                : appointment.lawyerId;
            const lawyerRes = await api.get(`/api/lawyers/${lawyerId}`);
            console.log("Lawyer API response:", lawyerRes.data);
            return {
              ...appointment,
              lawyerName: lawyerRes.data.name,
            };
          } catch (err) {
            console.error("Error fetching lawyer details:", err);
            return {
              ...appointment,
              lawyerName: "Unknown Lawyer",
            };
          }
        })
      );

      setAppointments(appointmentsWithLawyer);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewChange = (appointmentId, review) => {
    setReviews((prev) => ({
      ...prev,
      [appointmentId]: review,
    }));
  };

  const handleSubmitReview = async (appointmentId, lawyerId) => {
    try {
      const review = reviews[appointmentId];
      if (!review) {
        toast.error("Please write a review before submitting");
        return;
      }

      await api.post("/api/reviews", {
        appointmentId,
        lawyerId,
        userId: user._id,
        userName: user.name,
        review,
      });

      // Store the submitted review
      setSubmittedReviews((prev) => ({
        ...prev,
        [appointmentId]: review,
      }));

      toast.success("Review submitted successfully!");
      setReviews((prev) => {
        const newReviews = { ...prev };
        delete newReviews[appointmentId];
        return newReviews;
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const handleNotification = () => {
    setshowNotification((toggle) => !toggle);
  };

  const navigate = useNavigate();

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mx-20 mt-6">
        <img src={logo} alt="" className="w-[219px] h-[57px]" />

        <div className="flex justify-between relative gap-4 items-center">
          <img
            src={Vector}
            onClick={handleNotification}
            className="w-5 h-5 hover:scale-120 duration-150 cursor-pointer active:scale-110"
            alt=""
          />
          {showNotification && (
            <div className="absolute top-12 flex border-[#62B9CB] -left-3 justify-between gap-6 font-semibold z-50 border-2 rounded-xl py-4 pb-7 w-70 flex-col items-center   bg-white text-[#62B9CB]">
              <div className="flex justify-between px-6 bg-[#62B9CB]  w-full py-4 -mt-[17px] border-0 rounded-t-xl">
                <div className="text-xl text-white">Notifcations</div>
                <div className="text-white">
                  <IoMdNotificationsOutline size={30} />
                </div>
              </div>

              <div className="flex gap-4 justify-between items-center w-full px-6 ">
                <div>
                  <Link to="/appointments/completed">
                    <div className="text-lg underline underline-offset-6 hover:text-[black]">
                      Appointment Approved
                    </div>
                  </Link>{" "}
                </div>
                <div className="text-lg border-0 rounded-full bg-[#62B9CB] px-3 text-white ">
                  2
                </div>
              </div>
              <div className="flex gap-4 justify-between items-center w-full px-6 ">
                <div>
                  <Link to="/messages">
                    <div className="text-lg underline underline-offset-6 hover:text-[#62B9CB]">
                      New Messages
                    </div>
                  </Link>{" "}
                </div>
                <div className="text-lg border-0 rounded-full bg-[#62B9CB] px-3 text-white">
                  7
                </div>
              </div>
              <div className="flex gap-4 justify-between items-center w-full px-6">
                <div>
                  <Link to="/appointments">
                    <div className="text-lg underline underline-offset-6 hover:text-[#62B9CB]">
                      Appointment Pendings
                    </div>
                  </Link>{" "}
                </div>
                <div className="text-lg border-0 rounded-full bg-[#62B9CB] px-3 text-white">
                  3
                </div>
              </div>
            </div>
          )}

          <img src={gear} className="w-5 h-5" alt="" />
          <div className="flex justify-between gap-1.5">
            <img src={pfp} className="w-7 h-7 rounded-4xl" alt="" />
            <p className="text-neutral-600 font-semibold">{user.name}</p>
          </div>
        </div>
      </div>
      <hr className="mt-4 border border-neutral-200" />

      {/* MAIN CONTENT */}
      <div className="flex">
        {/* SIDEBAR */}
        <Sidebar active="appointments" />

        {/* ACTION AREA */}
        <div className="w-[80%] px-10 py-10">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold">My Appointments</p>
          </div>

          {/* Appointment List */}
          <div className="border border-neutral-200 rounded-2xl py-6 px-10 mt-6">
            <div className="flex flex-col gap-5">
              {loading ? (
                <div className="text-center py-4">Loading appointments...</div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No appointments found
                </div>
              ) : (
                appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="flex flex-col bg-blue-50 border border-neutral-200 rounded-2xl px-5 py-7"
                  >
                    <div className="flex justify-around items-center">
                      <div className="flex justify-center items-center gap-4">
                        <img
                          src={pfp}
                          className="w-12 h-12 rounded-full"
                          alt="Lawyer Pfp"
                        />
                        <div>
                          <p className="font-bold">{appointment.lawyerName}</p>
                          <p className="text-[13px] font-semibold text-[#62B9CB]">
                            {appointment.paymentMethod}
                          </p>
                        </div>
                      </div>

                      <div className="">
                        <p className="font-bold">Date</p>
                        <p className="text-[13px] font-semibold text-[#62B9CB]">
                          {new Date(appointment.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="">
                        <p className="font-bold">Time</p>
                        <p className="text-[13px] font-semibold text-[#62B9CB]">
                          {appointment.time}
                        </p>
                      </div>
                      <div className="">
                        <button
                          className={`px-6 py-2 ${
                            appointment.status === "pending"
                              ? "bg-yellow-500"
                              : appointment.status === "confirmed"
                              ? "bg-green-500"
                              : "bg-red-500"
                          } text-white text-[14px] font-semibold rounded-3xl`}
                        >
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </button>
                      </div>
                    </div>

                    {/* Review Section for Completed Appointments */}
                    {appointment.status === "completed" && (
                      <div className="mt-4 border-t border-neutral-200 pt-4">
                        <div className="flex flex-col gap-2">
                          <textarea
                            className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#62B9CB]"
                            placeholder="Write your review about the lawyer..."
                            rows="3"
                            value={
                              submittedReviews[appointment._id] ||
                              reviews[appointment._id] ||
                              ""
                            }
                            onChange={(e) =>
                              handleReviewChange(
                                appointment._id,
                                e.target.value
                              )
                            }
                            disabled={!!submittedReviews[appointment._id]}
                          />
                          {!submittedReviews[appointment._id] && (
                            <button
                              onClick={() =>
                                handleSubmitReview(
                                  appointment._id,
                                  appointment.lawyerId
                                )
                              }
                              className="self-end bg-[#62B9CB] text-white px-4 py-2 rounded-lg hover:bg-[#4a9ba8] transition-colors"
                            >
                              Submit Review
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
