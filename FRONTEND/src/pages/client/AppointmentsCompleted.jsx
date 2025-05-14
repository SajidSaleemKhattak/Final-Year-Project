import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/home/logo.png";
import gear from "../../assets/Client/Gear.png";
import Vector from "../../assets/Client/Vector.png";
import pfp from "../../assets/Client/pfp.png";
import Sidebar from "../../pages/client/components/C-LSidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const AppointmentsCompleted = () => {
  let [showNotification, setshowNotification] = useState(false);

  const handleNotification = () => {
    {
      setshowNotification((toggle) => !toggle);
    }
  };
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split("/")[2]; // active, request, completed

  const completedAppointments = [
    {
      img: pfp,
      name: "Ali Khan",
      type: "Family Law",
      price: 7,
      timing: "09:00 AM",
    },
    {
      img: pfp,
      name: "Nida Bukhari",
      type: "Corporate",
      price: 9,
      timing: "2:15 PM",
    },
  ];

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
            <p className="text-neutral-600 font-semibold">Sajid Saleem</p>
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
            <p className="text-2xl font-semibold">Appointments</p>
            <select
              value={currentTab}
              onChange={(e) => navigate(`/appointments/${e.target.value}`)}
              className="bg-neutral-200 text-black px-3 py-2 rounded-xl text-sm font-medium"
            >
              <option value="active">Active</option>

              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Completed Appointments List */}
          <div className="border border-neutral-200 rounded-2xl py-6 px-10 mt-6">
            <div className="flex flex-col gap-5">
              {completedAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between w-full border border-neutral-200 rounded-2xl px-5 py-7 items-center"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.img}
                      className="w-12 h-12 rounded-full"
                      alt="Lawyer Pfp"
                    />
                    <div className="">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-[13px] font-semibold text-[#62B9CB]">
                        {item.type}
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <p className="font-bold">Price</p>
                    <p className="text-[13px] font-semibold text-[#62B9CB]">
                      ${item.price}
                    </p>
                  </div>
                  <div className="">
                    <p className="font-bold">Time</p>
                    <p className="text-[13px] font-semibold text-[#62B9CB]">
                      {item.timing}
                    </p>
                  </div>
                  <div className="">
                    <button className="px-6 py-2 bg-[#62B9CB] text-white text-[14px] font-semibold rounded-3xl cursor-default">
                      Completed
                    </button>
                  </div>
                </div>
              ))}
              {completedAppointments.length === 0 && (
                <p className="text-gray-500 text-sm">
                  No completed appointments.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsCompleted;
