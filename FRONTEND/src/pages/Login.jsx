import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import logo from "../assets/home/logo.png";
import tarazoImg from "../assets/login/tarazo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("Login response:", response.data);

      alert("Login successful");

      // Redirect based on role (optional)
      const tokenPayload = JSON.parse(atob(response.data.token.split(".")[1]));
      if (tokenPayload.role === "lawyer") {
        navigate("/lawyerdashboard");
      } else {
        navigate("/categories");
      }
    } catch (err) {
      console.error(err);
      alert(
        "Login failed: " + (err.response?.data?.error || "Something went wrong")
      );
    }
  };

  return (
    <div className="grid grid-cols-2 min-h-screen relative bg-white">
      {/* Left Section */}
      <div className="px-16 py-10 flex flex-col justify-start">
        <div className="flex flex-col md:flex-row gap-8 md:gap-2 justify-center md:justify-between items-center mb-8 w-screen md:w-full">
          <img src={logo} className="w-[219px] h-[57px]" alt="Logo" />
          <Link to="/">
            <button className="px-6 py-2 bg-[#62B9CB] rounded-3xl text-white font-medium ">
              Back to Website
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 flex-grow w-screen md:w-full">
          <p className="text-2xl font-semibold text-gray-800 text-center">
            Welcome to Counsel Hubs
          </p>
          <p className="text-sm text-gray-600 text-center">
            Please enter your email and password
          </p>

          <input
            className="w-[60%] border border-gray-300 rounded-xl px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#62B9CB]"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-[60%] border border-gray-300 rounded-xl px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#62B9CB]"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-[60%] py-3 bg-[#62B9CB] text-white rounded-3xl font-semibold hover:bg-[#62B9CB] transition"
            onClick={handleLogin}
          >
            Login
          </button>

          <div className="flex items-center justify-center w-[60%] gap-4 my-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-500">or login with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex gap-6 text-2xl">
            <FaFacebookF className="text-blue-500 hover:scale-110 transition cursor-pointer" />
            <FcGoogle className="hover:scale-110 transition cursor-pointer" />
            <FaXTwitter className="text-black hover:scale-110 transition cursor-pointer" />
          </div>

          <p className="text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#62B9CB] font-medium ml-1">
              Signup
            </Link>
          </p>
        </div>
      </div>

      <div className="relative">
        <img
          src={tarazoImg}
          className="absolute top-0 right-0 h-full w-full object-cover md:block hidden"
          alt="Background"
        />
      </div>
    </div>
  );
};

export default Login;
