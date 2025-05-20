import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/home/logo.png";
import gear from "./../../assets/Client/Gear.png";
import pfp from "../../assets/Client/pfp.png";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const lawyer = JSON.parse(localStorage.getItem("lawyer"));

  // Configure axios defaults
  const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        setIsDeleting(true);
        await api.delete(`/api/lawyers/${lawyer._id}`);
        localStorage.removeItem("lawyer");
        toast.success("Account deleted successfully");
        navigate("/loginlawyer");
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error("Failed to delete account");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <>
      <div className="">
        {/* HEADER */}
        <div className="flex justify-between mx-20 mt-6">
          <img src={logo} alt="" className="w-[219px] h-[57px]" />

          <div className="flex justify-between relative gap-4 items-center">
            <img src={gear} className="w-5 h-5" alt="" />
            <div className="flex justify-between gap-1.5">
              <img
                src={lawyer?.profilePicture || pfp}
                className="w-7 h-7 rounded-4xl"
                alt=""
              />
              <p className="text-neutral-600 font-semibold">{lawyer?.name}</p>
            </div>
          </div>
        </div>

        <hr className="border-1 border-gray-200 mt-3" />

        {/* MAIN CONTENT */}
        <div className="max-w-4xl mx-auto mt-8 px-4">
          <h1 className="text-2xl font-semibold mb-6">Settings</h1>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-2">Delete Account</h3>
                <p className="text-gray-600 mb-4">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Settings;
