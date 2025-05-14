import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/home/logo.png";
import gear from "../../../assets/Client/Gear.png";
import Vector from "../../../assets/Client/Vector.png";
import pfp from "../../../assets/Client/pfp.png";
import LSideBar from "../components/L-sidebar.jsx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const LawyerAppointmentsActive = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split("/")[2]; // 'active', 'request', 'completed'

  const array_appointments = [
    {
      img: pfp,
      name: "Client A",
      type: "Civil",
      Price: 5,
      Timing: "10:00",
    },
    {
      img: pfp,
      name: "Client B",
      type: "Criminal",
      Price: 6,
      Timing: "11:30",
    },
  ];
  let [showNotification, setshowNotification] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

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
            <p className="text-neutral-600 font-semibold">{user.name}</p>
          </div>
        </div>
      </div>

      <hr className="border-1 border-gray-200 mt-3" />

      {/* MAIN */}
      <div className="flex">
        {/* SIDEBAR */}
        <LSideBar />

        {/* ACTION AREA */}
        <div className="w-[80%] px-4 py-3">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold">Appointments</p>
            <select
              value={currentTab}
              onChange={(e) =>
                navigate(`/lawyerappointments/${e.target.value}`)
              }
              className="bg-neutral-200 text-black px-3 py-2  rounded-xl text-sm font-medium"
            >
              <option value="active">Active</option>
              <option value="request">Requests</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Clients List */}
          <div className="border-1 border-neutral-200 rounded-2xl py-6 px-10 mt-4">
            <div className="flex flex-col gap-5">
              {array_appointments.map((element, index) => (
                <div
                  className="flex border-1 border-neutral-200 rounded-2xl px-5 py-12 items-center justify-around gap-1"
                  key={index}
                >
                  <img
                    className="w-12 h-12 rounded-full"
                    src={element.img}
                    alt="client profile"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{element.name}</p>
                    <p className="text-[13px] font-semibold  text-[#62B9CB]">
                      Customer
                    </p>
                  </div>
                  <div>
                    <div className="font-bold text-center">Category</div>
                    <div className="text-center">{element.type}</div>
                  </div>

                  <div className="">
                    <p className="font-bold">Price</p>
                    <p className="text-[13px] font-semibold text-[#62B9CB]">
                      ${element.Price}
                    </p>
                  </div>
                  <div className="">
                    <p className="font-bold">Time</p>
                    <p className="text-[13px] font-semibold text-[#62B9CB]">
                      {element.Timing}
                    </p>
                  </div>
                  <div className=" flex ">
                    <button className="px-6 text-[14px] font-semibold py-2 bg-[#62B9CB] border-0 rounded-3xl text-white cursor-pointer">
                      Pending
                    </button>
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

export default LawyerAppointmentsActive;
