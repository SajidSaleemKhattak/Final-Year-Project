import React, { useState } from "react";
import logo from "../../assets/home/logo.png";
import gear from "../../assets/Client/Gear.png";
import Vector from "../../assets/Client/Vector.png";
import pfp from "../../assets/Client/pfp.png";
import Sidebar from "../../pages/client/components/C-LSidebar"; //  Sidebar imported
import { Link } from "react-router-dom";
import { VscSend } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";

const Messages = () => {
  let [showNotification, setshowNotification] = useState(false);

  const handleNotification = () => {
    {
      setshowNotification((toggle) => !toggle);
    }
  };
  const [data, setData] = useState("");
  const active = "messages";

  const messages_array = [
    { img: pfp, name: "sajidSaleem", message: "CivilCriminal", time: "4:09" },
  ];

  const handleDataCollection = (e) => {
    console.log(e);
  };
  const user = JSON.parse(localStorage.getItem("user"));
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
      <hr className="mt-4 text-neutral-200 border-1" />

      {/* MAIN CONTENT */}
      <div className="flex flex-grow overflow-hidden">
        {/* SIDEBAR */}
        <Sidebar active={active} />

        {/* MAIN CONTENT AREA */}
        <div className="w-[80%] flex px-6 py-4 gap-6">
          {/* LEFT: Messages List */}
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
                    className="w-12 h-10 rounded-[800px] object-center"
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

          {/* RIGHT: Chat Box */}
          <div className="w-3/5 flex flex-col border border-gray-200 rounded-xl overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center px-6 py-4 border-b border-gray-200">
              <img src={pfp} alt="profile" className="w-10 h-10 rounded-full" />
              <div className="ml-4">
                <p className="font-semibold text-gray-800">Danish</p>
                <p className="text-sm text-gray-400">CivilCriminal</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-white">
              <div className="self-start bg-gray-100 text-gray-700 px-4 py-2 rounded-xl max-w-[75%]">
                Email Sent
              </div>
            </div>

            {/* Input Field */}
            <div className="border-t border-gray-200 p-4 flex items-center gap-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
              />
              <button className="bg-[#62B9CB] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#51a4b7] transition">
                <VscSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
