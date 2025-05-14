import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/home/logo.png";
import gear from "../../../assets/Client/Gear.png";
import Vector from "../../../assets/Client/Vector.png";
import pfp from "../../../assets/Client/pfp.png";
import LSideBar from "../components/L-sidebar.jsx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";

const LawyerAppointmentsRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split("/")[2];

  const array_appointments = [
    {
      img: pfp,
      name: "Client A",
      type: "Civil",
      Price: 5000,
      Timing: "10:00",
    },
    {
      img: pfp,
      name: "Client B",
      type: "Criminal",
      Price: 6000,
      Timing: "11:30",
    },
    {
      img: pfp,
      name: "Client C",
      type: "Family",
      Price: 7000,
      Timing: "13:45",
    },
    {
      img: pfp,
      name: "Client D",
      type: "Corporate",
      Price: 8000,
      Timing: "15:00",
    },
  ];
  let [showNotification, setshowNotification] = useState(false);

  const handleNotification = () => {
    {
      setshowNotification((toggle) => !toggle);
    }
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
            <p className="text-2xl font-semibold">Appointments</p>
            <select
              value={currentTab}
              onChange={(e) =>
                navigate(`/lawyerappointments/${e.target.value}`)
              }
              className="bg-neutral-200 text-black px-3 py-2 rounded-xl text-sm font-medium"
            >
              <option value="active">Active</option>
              <option value="request">Requests</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Clients List */}
          <div className="border border-neutral-200 rounded-2xl py-10 px-10 mt-10">
            <div className="grid grid-cols-2 gap-6">
              {array_appointments.map((element, index) => (
                <div
                  key={index}
                  className="flex flex-col border border-neutral-200 rounded-2xl px-5 py-6"
                >
                  <div className="flex gap-3 items-start">
                    <img
                      src={element.img}
                      alt="client"
                      className="w-12 h-12 rounded-full"
                    />

                    <div>
                      <p className="font-semibold">{element.name}</p>

                      <div className="flex items-center gap-6 text-[#62B9CB] mt-2">
                        <p>Time</p>
                        <p className="text-sm font-semibold">
                          {element.Timing}
                        </p>
                      </div>
                      <div className="flex items-center text-{#62B9CB} gap-6 mt-1">
                        <p className="text-[#62B9CB]">Amount</p>
                        <p className="text-sm font-semibold text-#62B9CB]">
                          Rs. {element.Price}
                        </p>
                      </div>
                      <div className="flex -ml-16 mt-6 gap-2">
                        <button className="px-6 py-2 border-2 border-gray-400 text-sm font-semibold rounded-lg text-black">
                          Decline Appointment
                        </button>
                        <button className="px-6 py-2 bg-[#62B9CB] text-white text-sm font-semibold rounded-lg">
                          Accept Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerAppointmentsRequest;
