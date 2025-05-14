import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/home/logo.png";
import tarazoImg from "../../../assets/login/tarazo.png";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Lawyer_Signup = () => {
  const role = "lawyer";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

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
        bio: formData.bio,
        role: role,
      });

      // Redirect to additional info step (or login)
      navigate("/login");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left Section */}
      <div className="flex flex-col px-6 md:px-10 py-8 justify-start bg-white">
        <div className="flex justify-between items-center mb-6 flex-col gap-6 md:gap-2 md:flex-row md:w-full">
          <img
            src={logo}
            className="w-40 md:w-[219px] h-auto"
            alt="CounselHub Logo"
          />
          <Link to="/">
            <button className="px-6 py-2 text-sm md:text-base bg-[#62B9CB] rounded-3xl text-white">
              Back to Website
            </button>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5"
        >
          <p className="text-xl md:text-2xl font-semibold text-center text-[#62B9CB]">
            Welcome to Lawyer's Portal
          </p>
          <p className="text-center text-gray-600 text-sm md:text-base max-w-md">
            Let's get to know you a bit. Just the essentials to build a better
            relation with you.
          </p>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full max-w-md"
            type="text"
            placeholder="Enter Your Name"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full max-w-md"
            type="email"
            placeholder="Enter Your Email"
            required
          />

          {/* Password */}
          <div className="relative w-full max-w-md">
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 w-full"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative w-full max-w-md">
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 w-full"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Your Password"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Bio Field */}
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full max-w-md"
            placeholder="Enter Your Professional Bio"
            rows="4"
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
          Already have an account?
          <Link to="/login">
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

export default Lawyer_Signup;
