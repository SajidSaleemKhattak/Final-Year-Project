import React from "react";
import { FaCreditCard } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import pfp from "../../assets/Client/pfp.png";
import LSideBar from "../lawyer/components/L-sidebar.jsx";
import logo from "./../../assets/home/logo.png";
import gear from "./../../assets/Client/Gear.png";
import Vector from "./../../assets/Client/Vector.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";

const LawyerEarnings = () => {
  let [showNotification, setshowNotification] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleNotification = () => {
    {
      setshowNotification((toggle) => !toggle);
    }
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

  return (
    <>
      <div className="">
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
      </div>
      <div></div>
      <div className="flex">
        {" "}
        {/* Wrapper */}
        <LSideBar />
        <div className="px-4 py-3 w-full">
          {" "}
          {/* Main Content */}
          <p className="text-2xl font-semibold mb-5">Earnings</p>
          <div className="flex gap-5 mb-10">
            {" "}
            {/* Revenue Summary */}
            <div className="flex flex-col w-1/4 border border-neutral-200 rounded-xl p-5 bg-[#62B9CB] text-white">
              <div className="flex items-center gap-2">
                <GiMoneyStack size={30} />
                <p className="text-xl font-semibold">Total Revenue</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-[26px] font-semibold">272798.07 PKR</p>
              </div>
              <div className="mt-4">Total Revenue generated since joining</div>
            </div>
            <div className="flex flex-col w-1/4  text-black bg-gray-100 rounded-xl p-5">
              <div className="flex items-center gap-4">
                <FaCreditCard size={30} />
                <div className="text-xl font-semibold">
                  Available for Withdrawal
                </div>
              </div>
              <div className="mt-4 flex justify-between flex-col items-start gap-4">
                <p className="text-[26px]">278787878 PKR</p>
                <p className="text-[18px]">Amount in PKR</p>
              </div>
            </div>
          </div>
          <div className="w-full border border-neutral-200 rounded-xl p-5 mt-10">
            {" "}
            {/* Transaction Table */}
            <div className="flex font-semibold text-[15px] pb-3 border-b border-neutral-200 mb-3">
              <div className="w-1/5">Customer</div>
              <div className="w-1/5">Appointment Purpose</div>
              <div className="w-1/5">Date</div>
              <div className="w-1/5">Amount</div>
              <div className="w-1/5">Status</div>
            </div>
            <div className="flex flex-col gap-3">
              {" "}
              {/* Rows */}
              {array_transaction.map((element, index) => (
                <div
                  key={index}
                  className="flex items-center w-full border border-neutral-200 rounded-xl px-5 py-3"
                >
                  <div className="w-1/5 flex items-center gap-3">
                    <img
                      src={element.img}
                      alt="Customer"
                      className="w-12 h-12 rounded-full"
                    />
                    <p className="font-medium">{element.customer}</p>
                  </div>

                  <div className="w-1/5">
                    <p className="text-[13px] font-semibold text-[#62B9CB]">
                      {element.appointmentPurpose}
                    </p>
                  </div>

                  <div className="w-1/5">
                    <p className="text-[13px] font-semibold text-[#62B9CB]">
                      {element.date}
                    </p>
                  </div>

                  <div className="w-1/5">
                    <p className="text-[13px] font-semibold text-[#62B9CB]">
                      {element.amount}
                    </p>
                  </div>

                  <div className="w-1/5">
                    <button className="px-8 py-2 text-sm font-semibold rounded-3xl bg-[#62B9CB] text-white">
                      {element.status}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerEarnings;
