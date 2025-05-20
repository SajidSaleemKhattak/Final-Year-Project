import React from "react";
import { FaCreditCard } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
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
  const lawyer = JSON.parse(localStorage.getItem("lawyer"));

  const handleNotification = () => {
    {
      setshowNotification((toggle) => !toggle);
    }
  };

  // URLs for different provincial law websites
  const lawUrls = {
    federal: "https://na.gov.pk/en/",
    punjab: "https://punjablaws.gov.pk/",
    sindh: "https://sindhlaws.gov.pk/",
    balochistan: "https://balochistan.gov.pk/",
    kpk: "https://kp.gov.pk/",
  };

  return (
    <>
      <div className="">
        {/* HEADER */}
        <div className="flex justify-between mx-20 mt-6">
          <img src={logo} alt="" className="w-[219px] h-[57px]" />

          <div className="flex justify-between relative gap-4 items-center">
            <Link to="/lawyersettings">
              <img
                src={gear}
                className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
                alt="Settings"
              />
            </Link>
            <div className="flex justify-between gap-1.5">
              <img src={pfp} className="w-7 h-7 rounded-4xl" alt="" />
              <p className="text-neutral-600 font-semibold">{lawyer.name}</p>
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
                <a
                  href={lawUrls.federal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 rounded-lg py-1 text-[#62B9CB] border-1 border-[#62B9CB] cursor-pointer hover:bg-[#62B9CB] hover:text-white transition-colors duration-300 inline-block"
                >
                  Search
                </a>
              </div>
            </div>
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
                <a
                  href={lawUrls.punjab}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 rounded-lg py-1 text-[#62B9CB] border-1 border-[#62B9CB] cursor-pointer hover:bg-[#62B9CB] hover:text-white transition-colors duration-300 inline-block"
                >
                  Search
                </a>
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
                <a
                  href={lawUrls.balochistan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 rounded-lg py-1 text-[#62B9CB] border-1 border-[#62B9CB] cursor-pointer hover:bg-[#62B9CB] hover:text-white transition-colors duration-300 inline-block"
                >
                  Search
                </a>
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
                <a
                  href={lawUrls.sindh}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 rounded-lg py-1 text-[#62B9CB] border-1 border-[#62B9CB] cursor-pointer hover:bg-[#62B9CB] hover:text-white transition-colors duration-300 inline-block"
                >
                  Search
                </a>
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
                <a
                  href={lawUrls.kpk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 rounded-lg py-1 text-[#62B9CB] border-1 border-[#62B9CB] cursor-pointer hover:bg-[#62B9CB] hover:text-white transition-colors duration-300 inline-block"
                >
                  Search
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Law;
