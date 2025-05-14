import React from "react";
import { FaUserAlt, FaStar } from "react-icons/fa"; // Add missing imports for FaUserAlt and FaStar
import pfp from "../../assets/Client/pfp.png";
import LSideBar from "../lawyer/components/L-sidebar.jsx";
import logo from "./../../assets/home/logo.png";
import gear from "./../../assets/Client/Gear.png";
import Vector from "./../../assets/Client/Vector.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";

const LawyerProfile = () => {
  let [showNotification, setshowNotification] = useState(false);

  const handleNotification = () => {
    {
      setshowNotification((toggle) => !toggle);
    }
  };
  let active = "profile";
  let current_appointments = [
    {
      name: "John Doe",
      type: "CivilCriminal",
      Price: "4000",
      Timing: "16:04",
    },
    {
      name: "Jane Smith",
      type: "Criminal",
      Price: "5000",
      Timing: "14:30",
    },
  ];
  let array_previousAppointments = [
    {
      name: "Mike Jordan",
      type: "Corporate",
      Price: "6000",
      Timing: "12:00",
    },
    {
      name: "Sarah Lee",
      type: "Family Law",
      Price: "4500",
      Timing: "10:15",
    },
  ];
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="">
        {/* HEADER */}
        <div className="flex justify-between mx-20 mt-6">
          <img src={logo} alt="" className="w-[219px] h-[57px]" />

          <div className="flex justify-between relative gap-4 items-center">
            <img
              src={Vector}
              onClick={handleNotification}
              className="w-5 h-5 hover:scale-120 duration-150 cursor-pointer active:scale-110"
              alt=""
            />
            {showNotification && (
              <div className="absolute top-12 flex border-[#62B9CB] -left-3 justify-between gap-6 font-semibold z-50 border-2 rounded-xl py-4 pb-7 w-70 flex-col items-center   bg-white text-[#62B9CB]">
                <div className="flex justify-between px-6 bg-[#62B9CB]  w-full py-4 -mt-[17px] border-0 rounded-t-xl">
                  <div className="text-xl text-white">Notifcations</div>
                  <div className="text-white">
                    <IoMdNotificationsOutline size={30} />
                  </div>
                </div>

                <div className="flex gap-4 justify-between items-center w-full px-6 ">
                  <div>
                    <Link to="/lawyerappointments/request">
                      <div className="text-lg underline underline-offset-6 hover:text-[black]">
                        Appointment Requests
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="text-lg border-0 rounded-full bg-[#62B9CB] px-3 text-white ">
                    2
                  </div>
                </div>
                <div className="flex gap-4 justify-between items-center w-full px-6 ">
                  <div>
                    <Link to="/lawyermessages">
                      <div className="text-lg underline underline-offset-6 hover:text-[#62B9CB]">
                        New Messages
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="text-lg border-0 rounded-full bg-[#62B9CB] px-3 text-white">
                    7
                  </div>
                </div>
                <div className="flex gap-4 justify-between items-center w-full px-6">
                  <div>
                    <Link to="/lawyerappointments/active">
                      <div className="text-lg underline underline-offset-6 hover:text-[#62B9CB]">
                        Appointment Pendings
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="text-lg border-0 rounded-full bg-[#62B9CB] px-3 text-white">
                    3
                  </div>
                </div>
              </div>
            )}

            <img src={gear} className="w-5 h-5" alt="" />
            <div className="flex justify-between gap-1.5">
              <img src={pfp} className="w-7 h-7 rounded-4xl" alt="" />
              <p className="text-neutral-600 font-semibold">{user.name}</p>
            </div>
          </div>
        </div>

        <hr className="border-1 border-gray-200 mt-3" />

        {/* MAIN */}
        <div className="flex">
          {/* SIDEBAR */}
          <LSideBar active={active} />{" "}
          {/* Use the imported LSidebar component */}
          {/* ACTION */}
          <div className="w-[80%] px-4 py-3">
            <p className="text-2xl font-semibold">Profile</p>
            <div className="flex mt-6 gap-2">
              <div className="flex flex-col border-1 border-neutral-200 rounded-xl w-3/10 px-3 py-4">
                <div className="flex flex-col gap-1 items-center justify-center">
                  <FaUserAlt className="text-5xl text-[#62B9CB]" />
                  <p className="font-semibold text-xl">John Lawyer</p>
                  <p className="text-[#62B9CB] text-[13px]">
                    Civil Pro, Criminal
                  </p>
                  <div className="flex gap-1 text-[#62B9CB] text-[13px] mt-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>
                  <div>
                    <button className="flex items-center bg-[#62B9CB] text-white py-2 px-14 border-0 rounded-lg mt-4">
                      Personal Information
                    </button>
                  </div>

                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Location</div>
                    <div>Islamabad, Pakistan</div>
                  </div>
                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Language</div>
                    <div>Urdu, English</div>
                  </div>
                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Member Since</div>
                    <div>January 2024</div>
                  </div>
                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Experience</div>
                    <div>20+ Years</div>
                  </div>
                  <div className="flex justify-between w-full px-4 mt-3">
                    <div className="font-medium">Rates/Fee</div>
                    <div>RS. 1000/Hour</div>
                  </div>
                  <div>
                    <button className="flex items-center bg-[#62B9CB] text-white py-2 px-20 border-0 rounded-lg mt-8">
                      Area of Practice
                    </button>
                    <div className="grid grid-cols-2 gap-2 ">
                      <button className="flex items-center bg-[#62B9CB] text-white text-center py-2 border-0  rounded-xl mt-4 px-2">
                        Family Matters
                      </button>
                      <button className="flex items-center bg-[#62B9CB] text-center text-white py-2 border-0 rounded-xl mt-4 px-2">
                        Corporates Business
                      </button>
                      <button className="flex items-center bg-[#62B9CB] text-white py-2  border-0 rounded-xl mt-4 px-2">
                        Immigration Case
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-fit border-1 border-neutral-200 rounded-2xl px-4 py-4">
                <div>
                  <div className="border-1 border-neutral-200 rounded-2xl px-4 py-4 mt-4">
                    <p className="font-semibold text-xl mt-4">About</p>
                    <p className="text-neutral-600 ">
                      Experienced lawyer specializing in Civil and Criminal law.
                      Known for providing expert legal advice and representing
                      clients in court effectively.
                    </p>
                  </div>

                  <div className="border-1 border-neutral-200 rounded-2xl px-4 py-4 mt-4 relative">
                    <p className="font-semibold text-xl mt-4 mb-6">Reviews</p>

                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="mb-6">
                        <div className="flex items-center gap-3">
                          <FaUserAlt className="text-2xl text-[#62B9CB]" />
                          <p className="font-semibold text-md">Jane Doe</p>
                        </div>

                        <div className="flex justify-start gap-2 items-center mt-2 mb-1">
                          <div className="flex gap-1 text-yellow-500 text-sm">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} />
                            ))}
                          </div>
                          <p className="text-sm text-neutral-400">
                            April 24, 2024
                          </p>
                        </div>

                        <p className="text-neutral-600 text-sm">
                          Experienced lawyer specializing in Civil and Criminal
                          law. Known for providing expert legal advice and
                          representing clients in court effectively.
                        </p>

                        {index < 2 && (
                          <hr className="mt-4 border-neutral-300" />
                        )}
                      </div>
                    ))}

                    <div className="flex justify-end mt-4">
                      <button className="bg-[#62B9CB] text-white px-4 py-2 rounded-xl font-semibold">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerProfile;
