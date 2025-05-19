import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/home/logo.png";
import gear from "../../../assets/Client/Gear.png";
import Vector from "../../../assets/Client/Vector.png";
import pfp from "../../../assets/Client/pfp.png";
import LSideBar from "../components/L-sidebar.jsx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";

const LawyerAppointmentsCompleted = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split("/")[2];
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const lawyer = JSON.parse(localStorage.getItem("lawyer"));
  const [statusFilter, setStatusFilter] = useState("completed");

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
  }, [statusFilter]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/bookings?lawyerId=${lawyer._id}&status=${statusFilter}`
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  let [showNotification, setshowNotification] = useState(false);

  const handleNotification = () => {
    setshowNotification((toggle) => !toggle);
  };

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
                  <Link to="/lawyerappointments/request">
                    <div className="text-lg underline underline-offset-6 hover:text-[black]">
                      Appointment Requests
                    </div>
                  </Link>{" "}
                </div>
                <div className="text-lg border-0 rounded-full bg-[#62B9CB] px-3 text-white ">
                  2
                </div>
              </div>
              <div className="flex gap-4 justify-between items-center w-full px-6 ">
                <div>
                  <Link to="/lawyermessages">
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
                  <Link to="/lawyerappointments/active">
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
            <p className="text-neutral-600 font-semibold">Sajid Saleem</p>
          </div>
        </div>
      </div>

      <hr className="border-1 border-gray-200 mt-3" />

      {/* MAIN */}
      <div className="flex">
        {/* SIDEBAR */}
        <LSideBar active="appointments" />

        {/* ACTION AREA */}
        <div className="w-[80%] px-4 py-3">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold">Completed Appointments</p>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-neutral-200 text-black px-3 py-2 rounded-xl text-sm font-medium"
            >
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Clients List */}
          <div className="border border-neutral-200 rounded-2xl py-10 px-10 mt-10">
            <div className="grid grid-cols-2 gap-6">
              {loading ? (
                <div className="col-span-2 text-center py-4">
                  Loading appointments...
                </div>
              ) : appointments.length === 0 ? (
                <div className="col-span-2 text-center py-4 text-gray-500">
                  No completed appointments found
                </div>
              ) : (
                appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="flex flex-col border border-neutral-200 rounded-2xl px-5 py-6"
                  >
                    <div className="flex gap-3 items-start">
                      <img
                        src={pfp}
                        alt="client"
                        className="w-12 h-12 rounded-full"
                      />

                      <div>
                        <p className="font-semibold">{appointment.userName}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.userEmail}
                        </p>

                        <div className="flex items-center gap-6 text-[#62B9CB] mt-2">
                          <p>Time</p>
                          <p className="text-sm font-semibold">
                            {appointment.time}
                          </p>
                        </div>
                        <div className="flex items-center text-[#62B9CB] gap-6 mt-1">
                          <p className="text-[#62B9CB]">Date</p>
                          <p className="text-sm font-semibold">
                            {new Date(appointment.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
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

export default LawyerAppointmentsCompleted;
