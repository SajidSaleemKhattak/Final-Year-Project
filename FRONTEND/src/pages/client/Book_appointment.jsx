import React from "react";
import logo from "../../assets/home/logo.png";
import gear from "../../assets/Client/Gear.png";
import Vector from "../../assets/Client/Vector.png";
import pfp from "../../assets/Client/pfp.png";
import { Link } from "react-router-dom";

const Book_appointment = () => {
  const active = "home";
  const reviews = [
    {
      img: pfp,
      name: "Danish",
      rating: 4,
      message: "Lorem ipsum dolor sit amet.",
      Date: "16th April",
    },
    {
      img: pfp,
      name: "Danish",
      rating: 4,
      message: "Lorem ipsum dolor sit amet.",
      Date: "16th April",
    },
    {
      img: pfp,
      name: "Danish",
      rating: 4,
      message: "Lorem ipsum dolor sit amet.",
      Date: "16th April",
    },
  ];

  const availableSlots = [
    "7PM - 8PM",
    "7PM - 8PM",
    "7PM - 8PM",
    "7PM - 8PM",
    "7PM - 8PM",
    "7PM - 8PM",
    "7PM - 8PM",
  ];

  return (
    <div className="relative bg-neutral-200 min-h-screen">
      {/* Modal */}
      <div className="absolute w-1/2 bg-white top-[10%] left-[25%] rounded-2xl px-10 py-6 z-10 shadow-lg">
        <p className="font-semibold">Date Today</p>
        <p className="mt-2 text-sm text-neutral-600">
          {new Date().toDateString()}
        </p>
        <hr className="my-4 border-neutral-300" />

        <p className="font-semibold">Available Dates</p>
        <div className="mt-3 flex flex-wrap gap-3 justify-center">
          {availableSlots.map((slot, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-blue-400 rounded-3xl text-white text-sm"
            >
              {slot}
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/payment_method">
            <button className="px-6 py-2 bg-blue-400 rounded-3xl text-white font-semibold">
              Book a Consultation
            </button>
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between mx-20 py-6">
        <img src={logo} alt="Logo" className="w-[219px] h-[57px]" />
        <div className="flex items-center gap-4">
          <img src={Vector} className="w-5 h-5" alt="Vector" />
          <img src={gear} className="w-5 h-5" alt="Gear" />
          <div className="flex items-center gap-1.5">
            <img src={pfp} className="w-7 h-7 rounded-full" alt="Profile" />
            <p className="text-neutral-600 font-semibold">Sajid Saleem</p>
          </div>
        </div>
      </div>
      <hr className="border-neutral-200" />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[20%] h-full border-r border-neutral-200 p-5 flex flex-col gap-3">
          {[
            { label: "Home", route: "/categories" },
            { label: "Messages", route: "/messages" },
            { label: "Appointments", route: "/appointments" },
            { label: "Transactions", route: "/transaction" },
            { label: "Profile", route: "/profile" },
          ].map(({ label, route }) => (
            <Link
              to={route}
              key={label}
              className={`flex items-center gap-3 px-5 py-2 rounded-xl w-full ${
                active.toLowerCase() === label.toLowerCase()
                  ? "bg-blue-400 text-white"
                  : ""
              }`}
            >
              <img src={gear} alt="icon" className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}

          <div className="mt-14 bg-blue-400 text-white rounded-2xl p-4 text-center">
            <p className="font-semibold">Help Center</p>
            <p className="text-sm mt-1">Contact us for More Questions</p>
            <button className="bg-white text-blue-400 px-3 py-1 rounded-xl mt-2 text-sm font-semibold">
              Go To Help Center
            </button>
          </div>

          <button className="bg-blue-400 text-white mt-6 px-4 py-2 rounded-xl">
            Logout
          </button>
        </div>

        {/* Profile and Reviews Section */}
        <div className="w-[80%] px-10 py-10">
          <p className="text-2xl font-semibold mb-6">Profile</p>

          <div className="flex gap-6">
            {/* Profile Card */}
            <div className="w-[40%] border border-neutral-200 rounded-xl p-4 flex flex-col items-center">
              <img src={pfp} className="w-20 h-20 rounded-full" alt="Profile" />
              <p className="font-semibold text-xl mt-2">Sajid Saleem</p>
              <p className="text-blue-400 text-sm">sajidsaleem707@gmail.com</p>
              <p className="text-blue-400 text-sm">Number</p>
              <p className="text-blue-400 text-sm">Location</p>

              <div className="w-full mt-4">
                <p className="bg-blue-400 text-white py-2 rounded text-center font-semibold">
                  Areas of Practice
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {Array(3)
                    .fill("Family Matters")
                    .map((item, idx) => (
                      <p
                        key={idx}
                        className="bg-blue-400 text-white px-3 py-1 rounded-xl text-sm"
                      >
                        {item}
                      </p>
                    ))}
                </div>
              </div>

              <hr className="w-full border-neutral-300 my-4" />

              <div className="w-full">
                <p className="font-semibold text-lg">About</p>
                <p className="text-sm text-neutral-600 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Explicabo illo maxime incidunt dolorum cum voluptates...
                </p>
              </div>
            </div>

            {/* Biography and Reviews */}
            <div className="w-[60%] flex flex-col gap-6">
              <div>
                <p className="text-xl font-semibold">Biography</p>
                <p className="text-sm text-neutral-500 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                  cum dolor error officiis illo soluta eius culpa qui...
                </p>
              </div>

              <div className="border border-neutral-200 rounded-2xl p-4">
                <p className="text-xl font-semibold mb-2">Reviews</p>
                {reviews.map((review, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.img}
                        className="w-10 h-10 rounded-full"
                        alt="Reviewer"
                      />
                      <p className="font-semibold">{review.name}</p>
                    </div>
                    <div className="flex justify-between text-sm text-neutral-500 mt-1">
                      <p>Rating: {review.rating}</p>
                      <p>{review.Date}</p>
                    </div>
                    <p className="text-sm mt-1">{review.message}</p>
                    <hr className="mt-2 border-neutral-200" />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4">
                <Link to="/categories">
                  <button className="px-6 py-2 border rounded-3xl text-sm">
                    Back
                  </button>
                </Link>
                <Link to="/payment_method">
                  <button className="px-6 py-2 bg-blue-400 text-white rounded-3xl text-sm">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book_appointment;
