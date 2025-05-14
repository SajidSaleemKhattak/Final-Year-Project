import React, { useState } from "react";
import logo from "../../assets/home/logo.png";
import gear from "../../assets/Client/Gear.png";
import Vector from "../../assets/Client/Vector.png";
import pfp from "../../assets/Client/pfp.png";
import Sidebar from "../../pages/client/components/C-LSidebar"; // Sidebar imported
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";

const Profile = () => {
  let [showNotification, setshowNotification] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleNotification = () => {
    {
      setshowNotification((toggle) => !toggle);
    }
  };
  let active = "profile";
  let cuurent_appointments = [
    {
      img: pfp,
      name: "Danish",
      type: "CivilCriminal",
      Price: "4000",
      Timing: "16:04",
    },
    {
      img: pfp,
      name: "Danish",
      type: "CivilCriminal",
      Price: "4000",
      Timing: "16:04",
    },
  ];
  let array_previousAppointments = [
    {
      img: pfp,
      name: "Danish",
      type: "CivilCriminal",
      Price: "4000",
      Timing: "16:04",
    },
    {
      img: pfp,
      name: "Danish",
      type: "CivilCriminal",
      Price: "4000",
      Timing: "16:04",
    },
    {
      img: pfp,
      name: "Danish",
      type: "CivilCriminal",
      Price: "4000",
      Timing: "16:04",
    },
    {
      img: pfp,
      name: "Danish",
      type: "CivilCriminal",
      Price: "4000",
      Timing: "16:04",
    },
  ];

  return (
    <div className="">
      {/* HEADER */}
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
                  <Link to="/appointments/completed">
                    <div className="text-lg underline underline-offset-6 hover:text-[black]">
                      Appointment Approved
                    </div>
                  </Link>{" "}
                </div>
                <div className="text-lg border-0 rounded-full bg-[#62B9CB] px-3 text-white ">
                  2
                </div>
              </div>
              <div className="flex gap-4 justify-between items-center w-full px-6 ">
                <div>
                  <Link to="/messages">
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
                  <Link to="/appointments">
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
      <hr className="mt-4 text-neutral-200 border-1" />

      {/* MAIN */}
      <div className="flex">
        {/* SIDEBAR */}
        <Sidebar active={active} />

        {/* ACTION */}
        <div className="w-[80%] px-10 py-10">
          <p className="text-2xl font-semibold">Profile</p>
          <div className="flex mt-6 gap-2">
            <div className="flex flex-col border-1 border-neutral-200 rounded-xl w-3/10 px-3 py-4">
              <div className="flex flex-col gap-1 items-center justify-center">
                <img className="w-21 h-21 rounded-[500px]" src={pfp} alt="" />
                <p className="font-semibold text-xl">{user.name}</p>
                <p className="text-[#62B9CB] text-[13px]">
                  sajidsaleem707@gmail.com
                </p>
                <p className="text-[#62B9CB] text-[13px]">Number</p>
                <p className="text-[#62B9CB] text-[13px]">Location</p>
              </div>
              <hr className="text-neutral-300 border-1 mt-4" />
              <p className="font-semibold text-xl mt-4">About</p>
              <p className="text-neutral-600 ">
                I have professional experiance in treating with clients . I Have
                worked for 7 years in this field.
              </p>
            </div>

            {/* Right Section */}
            {/* <div className="flex flex-col w-2/3 border-1 border-neutral-200 rounded-2xl px-4 py-4">
              <div>
                <p className="text-xl font-semibold ">My Appointments</p>
                <div className=" border-t-1 flex flex-col border-neutral-200 rounded-2xl px-4  py-4 mt-4">
                  {cuurent_appointments.map((element, index) => (
                    <div
                      className="flex w-full h-15 border-1  justify-between border-neutral-200 rounded-2xl px-10 py-12 items-center gap-1 mt-3"
                      key={index}
                    >
                      <div className="flex">
                        <img
                          className="w-12 h-12 rounded-[500px]"
                          src={element.img}
                          alt="lawyers Pfp"
                        />
                        <div className="ml-4">
                          <p className="font-bold">{element.name}</p>
                          <p className="text-[13px] font-semibold text-[#62B9CB]">
                            {element.type}
                          </p>
                        </div>
                      </div>

                      <div className="ml-12">
                        <p className="font-bold">Price</p>
                        <p className="text-[13px] font-semibold text-[#62B9CB]">
                          {element.Price}
                        </p>
                      </div>
                      <div className="ml-12">
                        <p className="font-bold">Time</p>
                        <p className="text-[13px] font-semibold text-[#62B9CB]">
                          {element.Timing}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xl font-semibold mt-6">
                  My Previous Appointments
                </p>
                <div className="border-1 border-neutral-200 rounded-2xl px-4 py-4 mt-4">
                  {array_previousAppointments.map((element, index) => (
                    <div
                      className="flex w-full h-15 border-1 border-neutral-200 rounded-2xl  py-14 items-center justify-around gap-1 mt-3"
                      key={index}
                    >
                      <div className="flex gap-4">
                        <img
                          className="w-12 h-12 rounded-[500px]"
                          src={element.img}
                          alt="lawyers Pfp"
                        />
                        <div className="">
                          <p className="font-bold">{element.name}</p>
                          <p className="text-[13px] font-semibold text-[#62B9CB]">
                            {element.type}
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="font-bold">Price</p>
                        <p className="text-[13px] font-semibold text-[#62B9CB]">
                          {element.Price}
                        </p>
                      </div>
                      <div className="">
                        <p className="font-bold">Time</p>
                        <p className="text-[13px] font-semibold text-[#62B9CB]">
                          {element.Timing}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-4 mr-12 font-bold">
                View All
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
