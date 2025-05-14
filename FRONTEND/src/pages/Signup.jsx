import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/home/logo.png";
import tarazoImg from "../assets/login/tarazo.png";
import { IoBriefcaseOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import balance from "../assets/balance.png";

const Signup = () => {
  return (
    <div className="grid grid-cols-2 min-h-screen relative bg-white">
      {/* Left Section */}
      <div className="px-16 py-10 flex flex-col justify-start">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 justify-center md:gap-2 md:justify-between items-center w-screen md:w-full mb-8">
          <img src={logo} className="w-[219px] h-[57px]" alt="Logo" />
          <Link to="/">
            <button className="px-6 py-2 bg-[#62B9CB] rounded-3xl text-white font-medium">
              Back to Website
            </button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center gap-6 flex-grow w-screen md:w-full">
          <p className="text-2xl font-semibold text-[#62B9CB] text-center">
            What kind of account do you want to create?
          </p>
          <p className="text-sm text-gray-600 text-center">
            This is an important decision — choose wisely.
          </p>

          {/* Card Options */}
          <div className="flex flex-col md:flex-row gap-10 mt-4">
            {/* Client Card */}
            <Link to="/client_signup">
              <div className="w-[200px] h-[220px] border border-neutral-200 rounded-2xl px-6 py-4 flex flex-col items-center justify-center shadow hover:shadow-md transition-all">
                <div className="text-[#62B9CB]">
                  <CgProfile size={40} />
                </div>
                <p className="font-semibold text-[#62B9CB] mt-4">
                  Client Account
                </p>
                <p className="text-xs text-center text-[gray-500] mt-1">
                  Hire lawyers for your legal needs. Easy and reliable.
                </p>
              </div>
            </Link>

            {/* Lawyer Card */}
            <Link to="/lawyerprofileupdate1">
              <div className="w-[200px] h-[220px] border border-neutral-200 rounded-2xl px-6 py-4 flex flex-col items-center justify-center shadow hover:shadow-md transition-all">
                <div className="text-[#62B9CB]">
                  <img src={balance} alt="" className="w-10" />
                </div>
                <p className="font-semibold text-[#62B9CB] mt-4">
                  Lawyer Account
                </p>
                <p className="text-xs text-center text-gray-500 mt-1">
                  Offer your legal services to potential clients.
                </p>
              </div>
            </Link>
          </div>

          {/* Login Redirect */}
          <p className="text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#62B9CB] underline font-medium ml-1"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section with Image */}
      <div className="relative hidden md:block">
        <img
          src={tarazoImg}
          className="absolute top-0 right-0 h-full w-full object-cover"
          alt="Background"
        />
      </div>
    </div>
  );
};

export default Signup;
