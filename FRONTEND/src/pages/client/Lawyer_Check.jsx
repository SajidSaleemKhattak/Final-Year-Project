import React, { useState } from "react";
import logo from "../../assets/home/logo.png";
import gear from "../../assets/Client/Gear.png";
import Vector from "../../assets/Client/Vector.png";
import pfp from "../../assets/Client/pfp.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Chat from "../../components/Chat";
import io from "socket.io-client";

const Lawyer_Check = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };
  const location = useLocation();
  const { lawyer } = location.state || {};
  console.log("Received lawyer data:", lawyer);
  const [showChat, setShowChat] = useState(false);
  const socket = io("http://localhost:5000");
  const navigate = useNavigate();

  const handleBookNow = async (lawyerId, userName, userEmail) => {
    try {
      await axios.post("http://localhost:5000/api/bookings", {
        lawyerId,
        userName,
        userEmail,
      });
      alert("Booking request sent to the lawyer!");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. Please try again.");
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  let active = "home";

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
  console.log(lawyer, "from lawyer check");
  return (
    <div className="">
      {/* HEADER */}
      <div className="flex justify-between mx-20 mt-6">
        <img src={logo} alt="" className="w-[219px] h-[57px]" />
        <div className="flex justify-between gap-4 items-center">
          <img src={Vector} className="w-5 h-5" alt="" />
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
          <div className="flex flex-col justify-center items-center bg-amber-400 w-4/5 rounded-2xl px-6 py-6 text-white mt-14">
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
          <p className="text-2xl font-semibold">Lawyer Profile</p>
          <div className="flex mt-6 gap-2">
            <div className="flex flex-col border-1 border-neutral-200 rounded-xl w-4/10 px-3 py-4">
              <div className="flex flex-col gap-1 items-center justify-center">
                <img className="w-21 h-21 rounded-[500px]" src={pfp} alt="" />
                <p className="font-semibold text-xl">
                  {lawyer?.name || "Name Not Available"}
                </p>
                <p className="text-blue-300 text-[13px]">
                  {lawyer?.email || "Email Not Available"}
                </p>
                <p className="text-blue-300 text-[13px]">
                  {lawyer?.phone || "Phone Not Available"}
                </p>
                <p className="text-blue-300 text-[13px]">
                  {lawyer?.location || "Location Not Available"}
                </p>
              </div>
              <div>
                <p className="bg-blue-400 text-white px-2 py-2 rounded-xs font-semibold text-center">
                  Areas of Practice
                </p>
                <div className="flex items-center justify-center gap-4 mt-2 flex-wrap">
                  {lawyer?.areasOfPractice?.length > 0 ||
                  lawyer?.tags?.length > 0 ? (
                    (lawyer?.areasOfPractice || lawyer?.tags || []).map(
                      (tag, index) => (
                        <p
                          key={index}
                          className="bg-blue-400 text-white px-3 py-1 rounded-xl text-center"
                        >
                          {tag}
                        </p>
                      )
                    )
                  ) : (
                    <p className="bg-blue-400 text-white px-3 py-1 rounded-xl text-center">
                      No practice areas available
                    </p>
                  )}
                </div>
              </div>
              <hr className="text-neutral-300 border-1 mt-4" />
              <p className="font-semibold text-xl mt-4">About</p>
              <p className="text-neutral-600">
                {lawyer?.bio || "No description available for this lawyer."}
              </p>
            </div>
            <div className="flex flex-col w-fit border-1 border-neutral-200 rounded-2xl px-4 py-4">
              <div>
                <p className="text-xl font-semibold">Biography</p>
                <p className="text-[16px] text-neutral-500">
                  {lawyer?.biography || "No biography available."}
                </p>
              </div>
              <div>
                <div className="border-1 border-neutral-200 rounded-2xl px-4 py-4 mt-4">
                  <p className="text-xl font-semibold">Reviews</p>
                  {lawyer?.reviews ? (
                    lawyer.reviews.map((review, index) => (
                      <div
                        className="flex flex-col px-3 py-2 gap-1"
                        key={index}
                      >
                        <div className="flex gap-3 items-center">
                          <img
                            className="w-12 h-12 rounded-[500px]"
                            src={review.img || pfp}
                            alt="Reviewer's profile"
                          />
                          <p className="font-semibold">{review.name}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                          <p className="text-[13px] font-semibold text-blue-300">
                            Rating: {review.rating}
                          </p>
                          <p className="text-[13px] text-neutral-500">
                            {review.date}
                          </p>
                        </div>
                        <p className="text-[13px] text-neutral-500">
                          {review.message}
                        </p>
                        <hr className="mt-1 border-neutral-200" />
                      </div>
                    ))
                  ) : (
                    <p className="text-neutral-500 text-center py-4">
                      No reviews available yet.
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-5 mt-5">
                  <Link to="/categories">
                    <button className="px-16 py-2 border-1 rounded-3xl">
                      Back
                    </button>
                  </Link>
                  <button
                    onClick={toggleChat}
                    className="bg-blue-400 text-white px-8 py-2 rounded-xl hover:bg-blue-500 transition-colors"
                  >
                    Chat
                  </button>
                  <button
                    onClick={() =>
                      navigate("/book-appointment", { state: { lawyer, user } })
                    }
                    className="bg-[#62B9CB] text-white px-8 py-2 rounded-xl"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Component */}
      {showChat && (
        <Chat
          lawyer={lawyer}
          user={user}
          onClose={toggleChat}
          socket={socket}
        />
      )}
    </div>
  );
};

export default Lawyer_Check;
