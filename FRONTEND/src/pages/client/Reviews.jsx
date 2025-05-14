import React, { useState } from "react";
import logo from "../../assets/home/logo.png";
import gear from "../../assets/Client/Gear.png";
import Vector from "../../assets/Client/Vector.png";
import pfp from "../../assets/Client/pfp.png";
import { Link } from "react-router-dom";
const Reviews = () => {
  let active = "home";
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
  let reviews = [
    {
      img: pfp,
      name: "Danish",
      rating: 4,
      message: "lorem4",
      Date: "16th April",
    },
    {
      img: pfp,
      name: "Danish",
      rating: 4,
      message: "lorem4",
      Date: "16th April",
    },
    {
      img: pfp,
      name: "Danish",
      rating: 4,
      message: "lorem4",
      Date: "16th April",
    },
  ];
  return (
    <div className=" relative bg-neutral-200 z-2 mt-0 py-0">
      <div className="absolute w-2/4 h-2/4 z-10 bg-white top-[10%] left-[25%] rounded-2xl px-10 py-3">
        <p className="font-semibold mt-5">Date Today</p>
        <p className="mt-3">{Date.now()}</p>
        <hr className="border-1 border-neutral-300" />
        <p className="font-semibold mt-5">Available Dates</p>
        <div className="mt-3 flex items-center justify-center gap-3 flex-wrap">
          <button className="px-4 py-2 bg-blue-400 border-0 rounded-3xl text-white ">
            7PM - 8PM
          </button>
          <button className="px-4 py-2 bg-blue-400 border-0 rounded-3xl text-white ">
            7PM - 8PM
          </button>
          <button className="px-4 py-2 bg-blue-400 border-0 rounded-3xl text-white ">
            7PM - 8PM
          </button>
          <button className="px-4 py-2 bg-blue-400 border-0 rounded-3xl text-white ">
            7PM - 8PM
          </button>
          <button className="px-4 py-2 bg-blue-400 border-0 rounded-3xl text-white ">
            7PM - 8PM
          </button>
          <button className="px-4 py-2 bg-blue-400 border-0 rounded-3xl text-white ">
            7PM - 8PM
          </button>
          <button className="px-4 py-2 bg-blue-400 border-0 rounded-3xl text-white ">
            7PM - 8PM
          </button>
        </div>
        <div className="flex items-center justify-center mt-20">
          <button className="px-4 mt-5 py-2 bg-blue-400 border-0 rounded-3xl text-white ">
            Book a Consultation
          </button>
        </div>
      </div>
      {/* HEADER */}
      <div className="flex justify-between mx-20 mt-6">
        <img src={logo} alt="" className="w-[219px] h-[57px]" />
        <div className="flex justify-between gap-4 items-center">
          <img src={Vector} className="w-5 h-5" alt="" />
          <img src={gear} className="w-5 h-5" alt="" />
          <div className="flex justify-between gap-1.5">
            <img src={pfp} className="w-7 h-7 rounded-4xl" alt="" />
            <p className="text-neutral-600 font-semibold">Sajid Saleem</p>
          </div>
        </div>
      </div>
      <hr className="mt-4 text-neutral-200 border-1" />
      {/* MAIN */}
      <div className="flex">
        {/* SIDEBAR */}
        <div className="flex flex-col w-[20%] border-r-1 border-r-neutral-200 h-screen items-center py-5 gap-1">
          <Link
            to="/categories"
            className={`flex gap-3 items-center border-1  border-neutral-200  pr-26 pl-5 py-2 rounded-xl w-4/5 ${
              active === "home" ? "bg-blue-400 text-white" : ""
            }`}
          >
            <img src={gear} className="w-5 h-5 text-white" alt="" />
            <button>Home</button>
          </Link>
          <Link
            to="/messages"
            className={`flex gap-3 items-center border-1  border-neutral-200  pr-26 pl-5 py-2 rounded-xl w-4/5 ${
              active === "messages" ? "bg-blue-400 text-white" : ""
            }`}
          >
            <img src={gear} className="w-5 h-5" alt="" />
            <button>Messages</button>
          </Link>

          <Link
            to="/appointments"
            className={`flex gap-3 items-center border-1  border-neutral-200  pr-26 pl-5 py-2 rounded-xl w-4/5 ${
              active === "appointments" ? "bg-blue-400 text-white" : ""
            }`}
          >
            <img src={gear} className="w-5 h-5" alt="" />
            <button>Appointments</button>
          </Link>
          <Link
            to="/transaction"
            className={`flex gap-3 items-center border-1  border-neutral-200  pr-26 pl-5 py-2 rounded-xl w-4/5 ${
              active === "transaction" ? "bg-blue-400 text-white" : ""
            }`}
          >
            <img src={gear} className="w-5 h-5" alt="" />
            <button>Transactions</button>
          </Link>
          <Link
            to="/profile"
            className={`flex gap-3 items-center border-1 border-neutral-200 pr-26 pl-5 py-2 rounded-xl w-4/5 ${
              active === "profile" ? "bg-blue-400 text-white" : ""
            }`}
          >
            <img src={gear} className="w-5 h-5" alt="" />
            <button>Profile</button>
          </Link>
          <div className="flex flex-col justify-center items-center bg-blue-400 w-4/5 rounded-2xl px-6 py-6 text-white mt-14">
            <p className="font-semibold">Help Center</p>
            <p className="mt-2 text-[13px]">Contact us for More </p>
            <p className="text-[13px]">Questions</p>
            <button className="bg-white text-blue-400 px-2 py-2 rounded-xl mt-2 font-semibold w-full text-[13px] cursor-alias">
              Go To Help Center
            </button>
          </div>
          <button className=" bg-blue-400 text-white w-4/5  px-2 py-2 rounded-xl mt-8 cursor-pointer">
            Logout
          </button>
        </div>
        {/* ACTION */}
        <div className="w-[80%] px-10 py-10">
          <p className="text-2xl font-semibold">Profile</p>
          <div className="flex mt-6 gap-2">
            <div className="flex flex-col border-1 border-neutral-200 rounded-xl w-4/10 px-3 py-4">
              <div className="flex flex-col gap-1 items-center justify-center">
                <img className="w-21 h-21 rounded-[500px]" src={pfp} alt="" />
                <p className="font-semibold text-xl">Sajid Saleem</p>
                <p className="text-blue-300 text-[13px]">
                  sajidsaleem707@gmail.com
                </p>
                <p className="text-blue-300 text-[13px]">Number</p>
                <p className="text-blue-300 text-[13px]">Location</p>
              </div>
              <div>
                <p className="bg-blue-400 text-white px-2 py-2 rounded-xs font-semibold text-center">
                  Areas of Practice
                </p>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <p className="bg-blue-400 text-white  rounded-xl text-center">
                    Family Matters
                  </p>
                  <p className="bg-blue-400 text-white  rounded-xl text-center">
                    Family Matters
                  </p>
                  <p className="bg-blue-400 text-white rounded-xl text-center">
                    Family Matters
                  </p>
                </div>
              </div>
              <hr className="text-neutral-300 border-1 mt-4" />
              <p className="font-semibold text-xl mt-4">About</p>
              <p className="text-neutral-600 ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Explicabo illo maxime incidunt dolorum cum voluptates, quia
                dolor sint, eius harum hic, illum iste ea sapiente sit atque
                officia temporibus ullam!
              </p>
            </div>
            <div className="flex flex-col w-fit border-1 border-neutral-200 rounded-2xl px-4 py-4">
              <div>
                <p className="text-xl font-semibold">Biography</p>
                <p className="text-[16px] text-neutral-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                  cum dolor error officiis illo soluta eius culpa qui. Quis
                  consectetur ut ea velit, molestiae reprehenderit maxime
                  perspiciatis veritatis ipsum necessitatibus placeat. Quas
                  ducimus quisquam cupiditate voluptate placeat quod asperiores
                  natus minus. Omnis fugiat molestias corporis temporibus quidem
                  doloribus quaerat voluptate!
                </p>
              </div>
              <div>
                <div className="border-1 border-neutral-200 rounded-2xl px-4 py-4 mt-4">
                  <p className="text-xl font-semibold">Reviews</p>
                  {reviews.map((element, index) => (
                    <div
                      className="flex flex-col  px-3 py-2 gap-1 "
                      key={index}
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          className="w-12 h-12 rounded-[500px]"
                          src={element.img}
                          alt="lawyers Pfp"
                          srcset=""
                        />
                        <p className="font-semibold">{element.name}</p>
                      </div>
                      <div className=" flex gap-3 items-center">
                        <p className="text-[13px] font-semibold text-blue-300">
                          Rating: {element.rating}
                        </p>
                        <p className="text-[13px] text-neutral-500">
                          {element.Date}
                        </p>
                      </div>
                      <p className="text-[13px] text-neutral-500">
                        {element.message}
                      </p>
                      <hr className="mt-1 border-neutral-200" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-5 mt-5">
                  <Link to="/categories">
                    <button className="px-16 py-2 border-1 rounded-3xl">
                      Back
                    </button>
                  </Link>
                  <Link to="">
                    <button className="px-10 py-2 bg-blue-400 border-0 rounded-3xl text-white">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
