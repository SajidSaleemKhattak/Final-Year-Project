import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../assets/home/logo.png";
import gear from "../../assets/Client/Gear.png";
import Vector from "../../assets/Client/Vector.png";
import pfp from "../../assets/Client/pfp.png";
import Sidebar from "../../pages/client/components/C-LSidebar";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";

const Categories = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };

  const handleNotification = () => {
    setShowNotification((toggle) => !toggle);
  };

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/lawyers");
        if (Array.isArray(res.data)) {
          setLawyers(res.data);
        } else {
          console.error("Unexpected response:", res.data);
          setLawyers([]);
        }
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
        setLawyers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  const active = "home";

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between mx-20 mt-6">
        <img src={logo} alt="Logo" className="w-[219px] h-[57px]" />
        <div className="flex justify-between relative gap-4 items-center">
          <img
            src={Vector}
            onClick={handleNotification}
            className="w-5 h-5 hover:scale-120 duration-150 cursor-pointer active:scale-110"
            alt="Notifications"
          />
          {showNotification && (
            <div className="absolute top-12 flex border-[#62B9CB] -left-3 justify-between gap-6 font-semibold z-50 border-2 rounded-xl py-4 pb-7 w-70 flex-col items-center bg-white text-[#62B9CB]">
              <div className="flex justify-between px-6 bg-[#62B9CB] w-full py-4 -mt-[17px] border-0 rounded-t-xl">
                <div className="text-xl text-white">Notifications</div>
                <div className="text-white">
                  <IoMdNotificationsOutline size={30} />
                </div>
              </div>
              <div className="flex gap-4 justify-between items-center w-full px-6">
                <Link to="/appointments/completed">
                  <div className="text-lg underline underline-offset-6 hover:text-black">
                    Appointment Approved
                  </div>
                </Link>
                <div className="text-lg bg-[#62B9CB] px-3 text-white rounded-full">
                  2
                </div>
              </div>
              <div className="flex gap-4 justify-between items-center w-full px-6">
                <Link to="/messages">
                  <div className="text-lg underline underline-offset-6 hover:text-[#62B9CB]">
                    New Messages
                  </div>
                </Link>
                <div className="text-lg bg-[#62B9CB] px-3 text-white rounded-full">
                  7
                </div>
              </div>
              <div className="flex gap-4 justify-between items-center w-full px-6">
                <Link to="/appointments">
                  <div className="text-lg underline underline-offset-6 hover:text-[#62B9CB]">
                    Appointment Pendings
                  </div>
                </Link>
                <div className="text-lg bg-[#62B9CB] px-3 text-white rounded-full">
                  3
                </div>
              </div>
            </div>
          )}
          <img src={gear} className="w-5 h-5" alt="Settings" />
          <div className="flex gap-1.5 items-center">
            <img src={pfp} className="w-7 h-7 rounded-full" alt="Profile" />
            <p className="text-neutral-600 font-semibold">{user.name}</p>
          </div>
        </div>
      </div>

      <hr className="mt-4 border-neutral-200 border" />

      {/* MAIN CONTENT */}
      <div className="flex flex-grow">
        <Sidebar active={active} />

        <div className="w-full px-10 py-10">
          <p className="text-2xl font-semibold">
            Welcome Back, <span>{user.name}</span>
          </p>

          <div className="border border-neutral-200 rounded-2xl py-10 px-10 mt-10">
            <div className="flex justify-between mb-5">
              <p className="text-xl">Civil Lawyers</p>
              <input
                className="border border-neutral-200 rounded-xl px-6 py-2"
                type="search"
                placeholder="Search for Category"
              />
            </div>

            {loading ? (
              <p>Loading lawyers...</p>
            ) : (
              <div className="grid grid-cols-4 gap-6">
                {lawyers.map((lawyer, index) => (
                  <div
                    key={index}
                    className="flex flex-col border border-neutral-200 rounded-2xl px-4 py-4 items-center gap-2"
                  >
                    <img
                      className="w-[45%] h-[45%] rounded-full object-cover"
                      src={pfp}
                      alt="Lawyer"
                    />
                    <p className="font-semibold">{lawyer.name}</p>
                    <p className="text-[13px] font-semibold text-[#62B9CB]">
                      {lawyer.specialization || "CivilCriminal"}
                    </p>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`h-4 w-4 ${
                            i < (lawyer.rating || 4)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <Link to="/lawyer_check">
                      <button className="px-10 py-2 text-sm font-semibold bg-[#62B9CB] text-white rounded-lg">
                        Book Now
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
