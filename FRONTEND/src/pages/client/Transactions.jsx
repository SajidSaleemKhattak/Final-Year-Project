import React, { useState } from "react";
import logo from "../../assets/home/logo.png";
import gear from "../../assets/Client/Gear.png";
import Vector from "../../assets/Client/Vector.png";
import pfp from "../../assets/Client/pfp.png";
import Sidebar from "../../pages/client/components/C-LSidebar"; // Sidebar imported
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";

const Appointments = () => {
  let [showNotification, setshowNotification] = useState(false);

  const handleNotification = () => {
    {
      setshowNotification((toggle) => !toggle);
    }
  };
  let active = "appointments";

  let array_appoitments = [
    {
      img: pfp,
      name: "Danish",

      Price: "Rs.1000/-",
      Timing: "8PM-9PM",
      Date: "12 Jan,2024",
    },
    {
      img: pfp,
      name: "Danish",

      Price: "Rs.1000/-",
      Timing: "8PM-9PM",
      Date: "12 Jan,2024",
    },
    {
      img: pfp,
      name: "Danish",
      Price: "Rs.1000/-",
      Timing: "8PM-9PM",
      Date: "12 Jan,2024",
    },
  ];
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="">
      {/* HEADER */}
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

      {/* MAIN */}
      <div className="flex">
        {/* SIDEBAR */}
        <Sidebar active={active} />

        {/* ACTION */}
        <div className="w-[80%] px-10 py-10">
          <p className="text-2xl font-semibold">Transactions</p>

          {/* Container Below Welcome Text */}
          <div className="border-1 border-neutral-200 rounded-2xl py-10 px-10 mt-10">
            {/* Type and Search Button Div  */}
            <div className="flex justify-between mb-5">
              <p className="text-xl">Civil Lawyers</p>
              <input
                className="border-1 border-neutral-200 rounded-xl px-6 py-2"
                type="search"
                placeholder="Search for Category"
              />
            </div>

            {/* Display of list of Lawyers Div */}
            <div className="flex flex-col gap-5 mb-10">
              {/* Table Headings */}
              <div className="flex -center px-5 bg-gray-100 py-4 font-semibold text-[15px] ">
                <div className="w-[20%]">Lawyer</div>
                <div className="w-[15%] ">Selected Time</div>
                <div className="w-[15%]">Date</div>
                <div className="w-[15%]">Amount</div>
                <div className="w-[20%] text-center">Status</div>
              </div>

              {/* Table Rows */}
              {array_appoitments.map((element, index) => (
                <div
                  key={index}
                  className="flex  items-center px-5 py-5 border-b-2 border-neutral-200"
                >
                  <div className="w-[20%] flex items-center gap-3">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={element.img}
                      alt="Lawyer Pfp"
                    />
                    <div>
                      <p className="font-semibold">{element.name}</p>
                    </div>
                  </div>

                  <div className="w-[15%]">
                    <p className="text-[13px] font-semibold text-[#62B9CB]">
                      {element.Timing}
                    </p>
                  </div>

                  <div className="w-[15%]">
                    <p className="text-[13px] font-semibold text-[#62B9CB]">
                      {element.Date || "—"}
                    </p>
                  </div>

                  <div className="w-[15%]">
                    <p className="text-[13px] font-semibold text-[#62B9CB]">
                      {element.Price}
                    </p>
                  </div>

                  <div className="w-[20%] text-center">
                    <button className="px-8 py-2 text-sm font-semibold bg-[#62B9CB] text-white rounded-md">
                      PAID
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

export default Appointments;
