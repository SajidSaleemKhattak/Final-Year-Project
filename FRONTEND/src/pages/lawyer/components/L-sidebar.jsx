import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCircleQuestion } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { LuMessageCircleMore } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { MdGavel } from "react-icons/md"; // For Laws

const LSideBar = () => {
  const location = useLocation();
  const active = location.pathname;

  return (
    <div className="flex flex-col w-[20%] border-r-1 border-r-neutral-200 h-screen items-center py-5 gap-1">
      <Link
        to="/lawyerdashboard"
        className={`flex gap-3 items-center border-1 border-neutral-200 pr-26 pl-5 py-2 rounded-xl w-4/5 ${
          active === "/lawyerdashboard" ? "bg-[#62B9CB] text-white" : ""
        }`}
      >
        <GoHome size={24} className="min-w-[24px]" />
        <button>Dashboard</button>
      </Link>
      <Link
        to="/lawyermessages"
        className={`flex gap-3 items-center border-1 border-neutral-200 pr-26 pl-5 py-2 rounded-xl w-4/5 ${
          active === "/lawyermessages" ? "bg-[#62B9CB] text-white" : ""
        }`}
      >
        <LuMessageCircleMore size={24} className="min-w-[24px]" />
        <button>Messages</button>
      </Link>
      <Link
        to="/lawyerappointments/request"
        className={`flex gap-3 items-center border-1 border-neutral-200 pr-26 pl-5 py-2 rounded-xl w-4/5 ${
          active === "/lawyerappointments/request"
            ? "bg-[#62B9CB] text-white"
            : ""
        }`}
      >
        <SlCalender size={24} className="min-w-[24px]" />
        <button>Appointments</button>
      </Link>
      <Link
        to="/lawyerprofile"
        className={`flex gap-3 items-center border-1 border-neutral-200 pr-26 pl-5 py-2 rounded-xl w-4/5 ${
          active === "/lawyerprofile" ? "bg-[#62B9CB] text-white" : ""
        }`}
      >
        <CgProfile size={24} className="min-w-[24px]" />
        <button>Profile</button>
      </Link>
      <Link
        to="/law"
        className={`flex gap-3 items-center border-1 border-neutral-200 pr-26 pl-5 py-2 rounded-xl w-4/5 ${
          active === "/law" ? "bg-[#62B9CB] text-white" : ""
        }`}
      >
        <MdGavel size={24} className="min-w-[24px]" />
        <button>Laws</button>
      </Link>

      <div className="flex flex-col justify-center items-center bg-[#62B9CB] w-4/5 rounded-lg px-6 py-6 text-white mt-14 relative">
        <p className="font-semibold">Help Center</p>
        <p className="mt-2 text-[13px]">Contact us for More </p>
        <p className="text-[13px]">Questions</p>
        <button className="bg-white text-black px-2 py-2 rounded-xl mt-2 font-semibold w-full text-[13px] cursor-alias">
          Go To Help Center
        </button>
        <div className="absolute -top-5 text-[#62B9CB] bg-gray-100 border-0 rounded-3xl p-3">
          <FaCircleQuestion size={24} />
        </div>
      </div>

      <Link to="/">
        <button className="bg-[#62B9CB] text-white px-17 py-2 rounded-lg mt-8 cursor-pointer mb-4">
          Logout
        </button>
      </Link>
    </div>
  );
};

export default LSideBar;
