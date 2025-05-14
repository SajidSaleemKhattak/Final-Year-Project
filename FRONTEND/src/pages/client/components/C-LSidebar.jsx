import React from "react";
import { Link, useLocation } from "react-router-dom";
import gear from "../../../assets/Client/Gear.png";
import { FaCircleQuestion } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { LuMessageCircleMore } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { CiDollar } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const CLSidebar = () => {
  const location = useLocation();
  const active = location.pathname;

  return (
    <div className="flex flex-col w-[20%] border-r-1 border-r-neutral-200 h-screen items-center py-5 gap-1">
      {/* Home */}
      <Link
        to="/categories"
        className={`flex gap-3 items-center border-1 border-neutral-200 pr-26 pl-5 py-2 rounded-xl w-4/5 ${
          active === "/categories" ? "bg-[#62B9CB] text-white" : ""
        }`}
      >
        <GoHome size={25} />

        <button>Home</button>
      </Link>

      {/* Messages */}
      <Link
        to="/messages"
        className={`flex gap-3 items-center border-1 border-neutral-200 pr-26 pl-5 py-2 rounded-xl w-4/5 ${
          active === "/messages" ? "bg-[#62B9CB] text-white" : ""
        }`}
      >
        <LuMessageCircleMore size={25} />

        <button>Messages</button>
      </Link>

      {/* Appointments */}
      <Link
        to="/appointments"
        className={`flex gap-3 items-center border-1 border-neutral-200 pr-26 pl-5 py-2 rounded-xl w-4/5 ${
          active === "/appointments" ? "bg-[#62B9CB] text-white" : ""
        }`}
      >
        <SlCalender size={22} />
        <button>Appointments</button>
      </Link>

      {/* Transactions */}
      <Link
        to="/transaction"
        className={`flex gap-3 items-center border-1 border-neutral-200 pr-26 pl-5 py-2 rounded-xl w-4/5 ${
          active === "/transaction" ? "bg-[#62B9CB] text-white" : ""
        }`}
      >
        <CiDollar size={25} className="-ml-[2px]" />
        <button>Transactions</button>
      </Link>

      {/* Profile */}
      <Link
        to="/profile"
        className={`flex gap-3 items-center border-1 border-neutral-200 pr-26 pl-5 py-2 rounded-xl w-4/5 ${
          active === "/profile" ? "bg-[#62B9CB] text-white" : ""
        }`}
      >
        <CgProfile size={25} />
        <button>Profile</button>
      </Link>

      {/* Help Center */}
      <div className="flex flex-col justify-center items-center bg-[#62B9CB] w-4/5 rounded-2xl px-6 py-6 text-white mt-14 relative">
        <p className="font-semibold">Help Center</p>
        <p className="mt-2 text-[13px]">Contact us for More </p>
        <p className="text-[13px]">Questions</p>
        <button className="bg-white text-[#62B9CB] px-2 py-2 rounded-xl mt-2 font-semibold w-full text-[13px] cursor-alias">
          Go To Help Center
        </button>
        <div className="absolute -top-5 text-[#62B9CB] bg-gray-100 border-0 rounded-3xl p-3">
          <FaCircleQuestion />
        </div>
      </div>

      {/* Logout */}
      <Link to="/">
        <button className="bg-[#62B9CB] text-white  px-21 py-2 rounded-xl mt-8 cursor-pointer">
          Logout
        </button>
      </Link>
    </div>
  );
};

export default CLSidebar;
