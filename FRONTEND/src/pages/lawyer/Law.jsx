import React from "react";
import { FaCreditCard } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import pfp from "../../assets/Client/pfp.png";
import LSideBar from "../lawyer/components/L-sidebar.jsx";
import logo from "./../../assets/home/logo.png";
import gear from "./../../assets/Client/Gear.png";
import Vector from "./../../assets/Client/Vector.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";

const Law = () => {
  let [showNotification, setshowNotification] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleNotification = () => {
    {
      setshowNotification((toggle) => !toggle);
    }
  };
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
      </div>
      <div></div>
      <div className="flex ">
        <LSideBar />
        <div className=" px-4 py-3">
          <div className="flex flex-col">
            <div className="font-bold text-2xl">
              Look Up Provincial Statutes
            </div>
            <div className="">
              Searching for Provincial laws has never been easier, Simply select
              a province and search for laws with a single click!
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-6">
            <div
              className="border-1 border-gray-200
          rounded-lg px-4 py-4 flex flex-col gap-2"
            >
              <div className="font-bold text-lg">Federal</div>
              <div>
                Look up Federal laws in an extensive database from 1880 til
                date.
              </div>
              <div>
                <button className="px-5 rounded-lg py-1  text-[#62B9CB] border-1 border-[#62B9CB] cursor-pointer">
                  Search
                </button>
              </div>
            </div>
            {/* End of 1 item of Grid */}
            <div
              className="border-1 border-gray-200
          rounded-lg px-4 py-4 flex flex-col gap-2"
            >
              <div className="font-bold text-lg">Punjab</div>
              <div>
                Look up Federal laws in an extensive database from 1880 til
                date.
              </div>
              <div>
                <button className="px-5 rounded-lg py-1  text-[#62B9CB] border-1 border-[#62B9CB] cursor-pointer">
                  Search
                </button>
              </div>
            </div>
            <div
              className="border-1 border-gray-200
          rounded-lg px-4 py-4 flex flex-col gap-2"
            >
              <div className="font-bold text-lg">Balochistan</div>
              <div>
                Look up Federal laws in an extensive database from 1880 til
                date.
              </div>
              <div>
                <button className="px-5 rounded-lg py-1  text-[#62B9CB] border-1 border-[#62B9CB] cursor-pointer">
                  Search
                </button>
              </div>
            </div>
            <div
              className="border-1 border-gray-200
          rounded-lg px-4 py-4 flex flex-col gap-2"
            >
              <div className="font-bold text-lg">Sindh</div>
              <div>
                Look up Federal laws in an extensive database from 1880 til
                date.
              </div>
              <div>
                <button className="px-5 rounded-lg py-1  text-[#62B9CB] border-1 border-[#62B9CB] cursor-pointer">
                  Search
                </button>
              </div>
            </div>
            <div
              className="border-1 border-gray-200
          rounded-lg px-4 py-4 flex flex-col gap-2"
            >
              <div className="font-bold text-lg">Khyber Pakhtunkhwa</div>
              <div>
                Look up Federal laws in an extensive database from 1880 til
                date.
              </div>
              <div>
                <button className="px-5 rounded-lg py-1  text-[#62B9CB] border-1 border-[#62B9CB] cursor-pointer">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Law;
