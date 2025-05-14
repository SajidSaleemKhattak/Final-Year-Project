import React, { useState } from "react";
import logo from "./../../assets/home/logo.png";
import gear from "./../../assets/Client/Gear.png";
import Vector from "./../../assets/Client/Vector.png";
import pfp from "./../../assets/Client/pfp.png";
import LSideBar from "./components/L-sidebar.jsx";
import { FaPaperPlane } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const LawyerMessages = () => {
  let [showNotification, setshowNotification] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleNotification = () => {
    {
      setshowNotification((toggle) => !toggle);
    }
  };
  let active = "messages";
  let messages_array = [
    { img: pfp, name: "John Doe", message: "CivilCriminal", time: "4:09" },
    { img: pfp, name: "Jane Smith", message: "Family Law", time: "5:15" },
    {
      img: pfp,
      name: "Michael Black",
      message: "Criminal Defense",
      time: "6:20",
    },
    { img: pfp, name: "Sarah White", message: "Corporate Law", time: "7:45" },
  ];

  const handleDataCollection = (e) => {
    console.log(e);
  };

  return (
    <div className="min-h-screen flex flex-col">
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

      {/* MAIN BODY */}
      <div className="flex flex-grow overflow-hidden">
        <LSideBar active={active} />

        {/* MAIN CONTENT */}
        <div className="w-full flex px-6 py-4 gap-6">
          {/* LEFT - MESSAGES LIST */}
          <div className="w-2/5 flex flex-col">
            <p className="text-2xl font-semibold mb-6">Messages</p>
            <input
              type="text"
              className="border border-neutral-200 rounded-xl w-5/6 px-4 py-2 shadow"
              placeholder="Search For Messages"
            />
            <div className="mt-8 flex flex-col gap-4 overflow-auto">
              {messages_array.map((item, index) => (
                <div
                  key={index}
                  onClick={handleDataCollection}
                  className="flex justify-between items-center w-3/4 cursor-pointer"
                >
                  <img
                    className="w-12 h-12 rounded-full object-center"
                    src={item.img}
                    alt={item.name}
                  />
                  <div className="w-full pl-4">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-neutral-500">{item.message}</p>
                  </div>
                  <p className="text-neutral-500 text-sm">{item.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - CHAT WINDOW */}
          <div className="w-3/5 flex flex-col justify-between border border-gray-300 rounded-xl overflow-hidden">
            {/* HEADER of chat */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full object-center"
                  src={pfp}
                  alt="Profile"
                />
                <div className="ml-4">
                  <p className="font-semibold">Alex Johnson</p>
                  <p className="text-sm text-neutral-500">Contract Law</p>
                </div>
              </div>
              <IoCallOutline className="text-xl" />
            </div>

            {/* Message area (can fill later) */}
            <div className="flex-grow px-4 py-2 overflow-auto">
              {/* Chat messages would go here */}
            </div>

            {/* Input */}
            <div className="flex items-center gap-3 p-4 border-t border-gray-200">
              <input
                type="text"
                className="border border-neutral-300 rounded px-4 py-2 w-full"
                placeholder="Type your message"
              />
              <div className="bg-[#62B9CB] py-2 rounded-sm flex px-2 ">
                <input type="file" className="cursor-pointer" />
              </div>
              <FaPaperPlane className="text-[#62B9CB] text-2xl cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerMessages;
