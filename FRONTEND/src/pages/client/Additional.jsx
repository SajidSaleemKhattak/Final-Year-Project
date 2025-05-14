import React from "react";
import logo from "../../assets/home/logo.png";
import tarazoImg from "../../assets/login/tarazo.png";
import { Link } from "react-router-dom";

const Additional = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left Section */}
      <div className="flex flex-col px-6 md:px-10 py-8 justify-top bg-white">
        <div className="flex flex-col gap-6 w-screen md:flex-row md:gap-2 md:w-full justify-between items-center mb-6">
          <img src={logo} className="w-40 md:w-[219px] h-auto" alt="logo" />
          <Link to="/">
            <button className="px-6 py-2 text-sm md:text-base bg-[#62B9CB] rounded-3xl text-white">
              Back to Website
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-5 -ml-4 w-screen md:ml-0 md:w-full">
          <p className="text-xl md:text-2xl font-semibold text-center text-[#62B9CB]">
            Additional Information
          </p>

          <input
            className="border border-gray-300 rounded-xl px-4 py-2 w-full max-w-md"
            type="text"
            placeholder="Select Your Country"
          />
          <input
            className="border border-gray-300 rounded-xl px-4 py-2 w-full max-w-md"
            type="text"
            placeholder="Enter Your Phone Number"
          />
          <textarea
            className="border border-gray-300 rounded-xl px-4 py-2 w-full max-w-md resize-none"
            rows="4"
            placeholder="Your Bio"
          ></textarea>

          <Link to="/categories" className="w-full max-w-md">
            <button className="w-full py-2 font-bold bg-[#62B9CB] rounded-3xl text-white">
              Signup
            </button>
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:block bg-violet-200 h-full">
        <img
          src={tarazoImg}
          className="w-full h-full object-cover"
          alt="Tarazo"
        />
      </div>
    </div>
  );
};

export default Additional;
