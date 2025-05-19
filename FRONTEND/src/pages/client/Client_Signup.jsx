import React, { useState } from "react";
import logo from "../../assets/home/logo.png";
import tarazoImg from "../../assets/login/tarazo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Client_Signup = () => {
  const role = "client";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role,
      });

      // Redirect to additional info page or login
      navigate("/loginAs"); // or navigate("/additional_client");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left Section */}
      <div className="flex flex-col px-6 md:px-10 py-8 justify-top bg-white">
        <div className="flex flex-col md:flex-row gap-8 w-screen md:w-full md:gap-2 justify-between items-center mb-6">
          <img src={logo} className="w-40 md:w-[219px] h-auto" alt="logo" />
          <Link to="/">
            <button className="px-6 py-2 text-sm md:text-base bg-[#62B9CB] rounded-3xl text-white">
              Back to Website
            </button>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5 -ml-3 md:ml-0 md:w-full w-screen"
        >
          <p className="text-xl md:text-2xl font-semibold text-center text-[#62B9CB]">
            Welcome to Client's Portal
          </p>
          <p className="text-center text-gray-600 text-sm md:text-base max-w-md">
            Let’s get to know you a bit. Just the essentials to build better
            relation with you.
          </p>

          <input
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full max-w-md"
            type="text"
            placeholder="Enter Your Name"
            required
          />
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full max-w-md"
            type="email"
            placeholder="Enter Your Email"
            required
          />
          <input
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full max-w-md"
            type="password"
            placeholder="Enter Your Password"
            required
          />
          <input
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full max-w-md"
            type="password"
            placeholder="Confirm Password"
            required
          />

          <button
            type="submit"
            className="w-full max-w-md py-2 font-bold bg-[#62B9CB] rounded-3xl text-white"
          >
            Signup
          </button>
        </form>

        <div className="flex items-center gap-3 w-full max-w-md mt-4 mx-auto">
          <hr className="flex-grow border-gray-300" />
          <p className="text-sm text-gray-600">Or Login With</p>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center gap-6 text-xl mt-2">
          <FaFacebookF className="text-blue-600 cursor-pointer hover:scale-110 transition" />
          <FcGoogle className="cursor-pointer hover:scale-110 transition" />
          <FaTwitter className="text-sky-400 cursor-pointer hover:scale-110 transition" />
        </div>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Already Have an account?
          <Link to="/signup">
            <span className="text-[#62B9CB] ml-1 underline">Login</span>
          </Link>
        </p>
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

export default Client_Signup;
