import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/home/logo.png";
import tarazoImg from "../../../assets/login/tarazo.png";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Lawyer_Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 relative min-h-screen items-center justify-center">
      {/* Left Section */}
      <div className="w-full  px-10 py-8 flex flex-col justify-start bg-white h-full">
        <div className="flex justify-between items-center mb-8 flex-col gap-6 md:flex-row md:gap-2">
          <img
            src={logo}
            className="w-[219px] h-[57px]"
            alt="CounselHub Logo"
          />
          <Link to="/">
            <button className="px-8 py-2 bg-[#62B9CB] border-0 rounded-3xl text-white">
              Back to Website
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 mt-0">
          <p className="text-2xl font-semibold text-[#62B9CB]">
            Welcome to Lawyer's Portal
          </p>
          <p className=" md:text-center text-gray-600">
            Let’s get to know you a bit. Just the essentials to build better
            relation with you.
          </p>

          <input
            className="border border-gray-300 rounded-xl px-6 py-2 w-full max-w-md"
            type="text"
            placeholder="Enter Your Name"
          />
          <input
            className="border border-gray-300 rounded-xl px-6 py-2 w-full max-w-md"
            type="email"
            placeholder="Enter Your Email"
          />

          {/* Password Input with Show/Hide Feature */}
          <div className="relative w-full max-w-md">
            <input
              className="border border-gray-300 rounded-xl px-6 py-2 w-full"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password Input with Show/Hide Feature */}
          <div className="relative w-full max-w-md">
            <input
              className="border border-gray-300 rounded-xl px-6 py-2 w-full"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Your Password"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <Link to="/lawyerdashboard">
            <button className="px-24 py-2 font-bold bg-[#62B9CB] border-0 rounded-3xl text-white">
              Signup
            </button>
          </Link>

          <div className="flex w-full max-w-md items-center gap-5 mt-6">
            <hr className="flex-grow border-gray-300" />
            <p className="text-gray-600">Or Login With</p>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex justify-center gap-6 text-2xl mt-2">
            <FaFacebookF className="text-blue-600 cursor-pointer hover:scale-110 transition" />
            <FcGoogle className="cursor-pointer hover:scale-110 transition" />
            <FaTwitter className="text-sky-400 cursor-pointer hover:scale-110 transition" />
          </div>

          <p className="mt-4 text-gray-600">
            Already have an account?
            <Link to="/login">
              <span className="text-[#62B9CB] ml-1 underline">Login</span>
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="hidden md:flex items-center justify-center bg-violet-200 w-full h-full">
        <img
          src={tarazoImg}
          className="w-full h-full object-cover"
          alt="Tarazo"
        />
      </div>
    </div>
  );
};

export default Lawyer_Signup;
